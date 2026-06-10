const { app, BrowserWindow, ipcMain, screen, shell, Notification, powerMonitor } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

// ---------- 설정 저장 (userData/config.json) ----------
const CONFIG_PATH = () => path.join(app.getPath('userData'), 'config.json');

function loadConfig() {
  try {
    return JSON.parse(fs.readFileSync(CONFIG_PATH(), 'utf-8'));
  } catch {
    return {
      // 남자 캐릭터 트레이딩 연동
      pythonPath: 'python',               // 파이썬 실행 파일 (예: python, py, C:\\...\\python.exe)
      tradingScript: '',                  // 본인 자동매매 프로젝트 진입 스크립트 경로 (예: C:\\trade\\main.py)
      tradingArgs: '',                    // 추가 인자 (공백 구분)
      // 여자 캐릭터 대시보드 챗 (LLM)
      llmProvider: 'anthropic',           // 'anthropic' | 'openai'
      llmModel: 'claude-haiku-4-5-20251001',
      llmApiKey: '',                      // 본인 API 키 (로컬에만 저장)
      // 대시보드 시세
      markets: ['KRW-BTC', 'KRW-ETH', 'KRW-XRP', 'KRW-SOL', 'KRW-DOGE'],
      // 시세 급변 알림: 15초 사이 절대 변동률(%)이 이 값 이상이면 캐릭터가 먼저 알림
      alertThreshold: 0.8
    };
  }
}

function saveConfig(cfg) {
  fs.writeFileSync(CONFIG_PATH(), JSON.stringify(cfg, null, 2), 'utf-8');
  return true;
}

let overlayWin;
const panelWins = {};   // which -> BrowserWindow

const PANELS = {
  dashboard: { file: 'dashboard.html', width: 460, height: 640, title: '시황 대시보드' },
  trader:    { file: 'trader.html',    width: 420, height: 420, title: '트레이딩' }
};

// ---------- 오버레이(바탕화면에 떠 있는 캐릭터) ----------
function createOverlay() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const w = 460, h = 340;
  overlayWin = new BrowserWindow({
    width: w,
    height: h,
    x: Math.round((width - w) / 2),   // 화면 가운데
    y: height - h,                    // 하단에 붙임
    fullscreenable: false,
    frame: false,
    transparent: true,
    resizable: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    hasShadow: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  overlayWin.setAlwaysOnTop(true, 'screen-saver');
  overlayWin.loadFile('overlay.html');
  // overlayWin.webContents.openDevTools({ mode: 'detach' });
}

// ---------- 패널 창 ----------
function openPanel(which) {
  const conf = PANELS[which];
  if (!conf) return;
  const ref = panelWins[which];
  if (ref && !ref.isDestroyed()) { ref.show(); ref.focus(); return; }

  const win = new BrowserWindow({
    width: conf.width,
    height: conf.height,
    title: conf.title,
    frame: true,
    resizable: true,
    skipTaskbar: false,
    backgroundColor: '#0f1115',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  win.setMenuBarVisibility(false);
  win.loadFile(conf.file);
  panelWins[which] = win;
}

// ---------- IPC ----------
ipcMain.handle('open-panel', (e, which) => openPanel(which));
ipcMain.handle('get-config', () => loadConfig());
ipcMain.handle('save-config', (e, cfg) => saveConfig(cfg));
ipcMain.handle('quit-app', () => app.quit());

// 남자 캐릭터: 파이썬 자동매매 프로젝트 실행
ipcMain.handle('launch-trading', () => {
  const cfg = loadConfig();
  if (!cfg.tradingScript) {
    return { ok: false, msg: '먼저 자동매매 스크립트 경로를 설정하세요.' };
  }
  if (!fs.existsSync(cfg.tradingScript)) {
    return { ok: false, msg: '스크립트 파일을 찾을 수 없습니다: ' + cfg.tradingScript };
  }
  try {
    const args = [cfg.tradingScript, ...(cfg.tradingArgs ? cfg.tradingArgs.split(' ').filter(Boolean) : [])];
    const child = spawn(cfg.pythonPath || 'python', args, {
      cwd: path.dirname(cfg.tradingScript),
      detached: true,
      stdio: 'ignore',
      shell: false
    });
    child.unref();
    return { ok: true, msg: '자동매매 프로젝트를 실행했습니다 (PID ' + child.pid + ').' };
  } catch (err) {
    return { ok: false, msg: '실행 실패: ' + err.message };
  }
});

// 경제뉴스: 메인 프로세스에서 RSS 수집(렌더러 CORS 회피)
ipcMain.handle('get-news', async () => {
  const feeds = [
    'https://www.yna.co.kr/rss/economy.xml',
    'https://fs.jtbc.co.kr/RSS/economy.xml'
  ];
  const items = [];
  for (const url of feeds) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const xml = await res.text();
      const re = /<item>([\s\S]*?)<\/item>/g;
      let m;
      while ((m = re.exec(xml)) && items.length < 30) {
        const block = m[1];
        const pick = (tag) => {
          const r = new RegExp('<' + tag + '>([\\s\\S]*?)<\\/' + tag + '>').exec(block);
          if (!r) return '';
          return r[1].replace(/<!\[CDATA\[|\]\]>/g, '').trim();
        };
        items.push({ title: pick('title'), link: pick('link'), date: pick('pubDate') });
      }
    } catch { /* 피드 실패는 무시 */ }
  }
  return items.slice(0, 20);
});

// 외부 링크는 기본 브라우저로
ipcMain.handle('open-external', (e, url) => shell.openExternal(url));

// 시스템 유휴 시간(초) — 마우스/키보드 입력이 없는 시간. 캐릭터 잡담 트리거에 사용
ipcMain.handle('get-idle', () => {
  try { return powerMonitor.getSystemIdleTime(); } catch { return 0; }
});

// 시세 급변 OS 알림 (캐릭터 말풍선과 함께 화면 밖에서도 알려줌)
ipcMain.handle('notify', (e, { title, body }) => {
  try {
    if (Notification.isSupported()) {
      new Notification({ title: title || 'DeskBuddies', body: body || '' }).show();
    }
  } catch { /* 알림 실패는 무시 */ }
  return true;
});

// LLM 챗: 메인 프로세스에서 호출
ipcMain.handle('chat', async (e, { messages, context }) => {
  const cfg = loadConfig();
  if (!cfg.llmApiKey) return { ok: false, text: 'API 키가 설정되지 않았습니다. 설정에서 키를 입력하세요.' };
  const sys = '너는 사용자의 개인 시황 비서야. 아래 실시간 시세/뉴스 데이터를 참고해서 한국어로 간결하게 답해. 투자 권유나 단정적 매매 조언은 피하고, 판단에 필요한 사실과 맥락을 제공해.\n\n[참고 데이터]\n' + (context || '');
  try {
    if (cfg.llmProvider === 'openai') {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + cfg.llmApiKey },
        body: JSON.stringify({
          model: cfg.llmModel || 'gpt-4o-mini',
          messages: [{ role: 'system', content: sys }, ...messages]
        })
      });
      const j = await res.json();
      if (j.error) return { ok: false, text: 'OpenAI 오류: ' + j.error.message };
      return { ok: true, text: j.choices?.[0]?.message?.content || '(응답 없음)' };
    } else {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': cfg.llmApiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: cfg.llmModel || 'claude-haiku-4-5-20251001',
          max_tokens: 1024,
          system: sys,
          messages
        })
      });
      const j = await res.json();
      if (j.error) return { ok: false, text: 'Anthropic 오류: ' + j.error.message };
      return { ok: true, text: j.content?.[0]?.text || '(응답 없음)' };
    }
  } catch (err) {
    return { ok: false, text: '요청 실패: ' + err.message };
  }
});

app.whenReady().then(() => {
  createOverlay();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createOverlay();
  });
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
