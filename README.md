<div align="center">

# 🧑‍💻 DeskBuddies 👩‍💻

**한국어** · [English](README.en.md)

**윈도우 바탕화면에 떠 있는 캐릭터 런처**

두 캐릭터가 화면 가운데 아래에 서 있고, 클릭하면 각자의 기능이 열립니다.
시세가 급변하거나 한동안 가만히 있으면 캐릭터가 먼저 말을 걸어요.

<img src="assets/screenshot.png" width="640" alt="DeskBuddies 실행 화면" />

![platform](https://img.shields.io/badge/platform-Windows-blue)
![release](https://img.shields.io/github/v/release/nameismini/desk-buddies)
![license](https://img.shields.io/github/license/nameismini/desk-buddies)
![electron](https://img.shields.io/badge/Electron-31-47848F?logo=electron&logoColor=white)

</div>

---

## ✨ 한눈에 보기

| 캐릭터 | 클릭하면 |
|---|---|
| 🧑 **트레이더** | 따로 만든 **파이썬 자동매매 프로젝트를 실행**하는 버튼 |
| 👩 **애널리스트** | **업비트 실시간 시세 + 경제뉴스 + LLM 챗** 대시보드 |

- ⚡ **시세 급변 알림** — 설정한 코인이 짧은 시간에 크게 움직이면 애널리스트가 말풍선 + OS 알림으로 **먼저** 알려줍니다.
- 💬 **유휴 잡담** — 마우스·키보드 입력이 한동안 없으면 캐릭터가 랜덤으로 한마디 던집니다.
- 🪟 **투명 배경 + 살아있는 애니메이션** — 프레임 없이 바탕화면에 떠 있고, 가만히 있을 때도 숨쉬듯 살짝 흔들립니다.
- 🔒 **API 키는 이 PC에만** — 키는 로컬 설정 파일에만 저장되고, 챗 사용 시 선택한 제공자 API로만 전송됩니다. 저장소에는 어떤 키도 들어있지 않습니다.

---

## ⬇️ 그냥 받아서 쓰기 (설치 불필요)

1. [**Releases**](https://github.com/nameismini/desk-buddies/releases/latest) 에서 `DeskBuddies.x.x.x.exe` 다운로드
2. 더블클릭 → 끝. **Node.js도, 설치 과정도 필요 없습니다.** (포터블 exe)

> 처음 실행 시 *"Windows의 PC 보호"* 파란 경고가 뜨면 **추가 정보 → 실행**을 누르세요.
> 코드 서명 인증서가 없는 개인 빌드라서 그렇고, 동작에는 문제가 없습니다.

---

## 🛠 소스에서 실행하기 (개발자용)

[Node.js LTS](https://nodejs.org) 설치 후, 이 폴더에서:

```bash
npm install   # 처음 한 번만 (Electron 내려받기)
npm start     # 앱 실행
```

직접 포터블 exe로 만들고 싶다면:

```bash
npm run dist  # dist/ 폴더에 단일 exe 생성
```

---

## ⚙️ 설정

### 👩 애널리스트 (시황 챗)
여자 캐릭터 클릭 → 우측 상단 ⚙ →

- **LLM 제공자 / 모델 / API 키** 입력 후 저장하면 챗이 동작합니다.
  - Anthropic 예: 모델 `claude-haiku-4-5-20251001`
  - OpenAI 예: 모델 `gpt-4o-mini`
- **시세 마켓**: 업비트 코드(`KRW-BTC,KRW-ETH,KRW-SOL` …) — 키 없이 공개 API로 바로 나옵니다.
- **급변 알림 민감도(%)**: 15초 사이 이 폭 이상 움직이면 캐릭터가 알립니다(기본 0.8%).

### 🧑 트레이더 (자동매매 실행)
남자 캐릭터 클릭 →

- **파이썬 실행 파일**: 보통 `python` 또는 `py`
- **자동매매 진입 스크립트 경로**: 예) `C:\projects\autotrade\main.py`
- **실행 인자**(선택): 예) `--mode live`
- 저장 후 **▶ 자동매매 실행** → 그 파이썬 프로젝트를 새 프로세스로 띄웁니다.

> 이 런처는 **실행만** 담당합니다. 매매 로직·거래소 키·리스크 관리는 그 파이썬 프로젝트 안에서 처리하세요.

---

## 🗂 파일 구조

| 파일 | 역할 |
|---|---|
| `main.js` | Electron 메인 — 창 생성, 파이썬 실행, 뉴스 수집, LLM 호출, 유휴 감지 |
| `preload.js` | 렌더러 ↔ 메인 안전한 통신 브릿지 (`contextIsolation`) |
| `overlay.html` | 바탕화면에 떠 있는 캐릭터 + 애니메이션 + 급변/유휴 잡담 |
| `dashboard.html` | 애널리스트(시황·뉴스·챗) 패널 |
| `trader.html` | 트레이더(자동매매 실행) 패널 |
| `assets/` | 캐릭터 이미지 (`male_2.png`, `female_2.png` 교체 가능) |

---

## ⚠️ 면책

실제 돈이 오가는 자동매매는 버그 한 줄로 손실이 날 수 있습니다.
이 런처는 외부 파이썬 프로그램을 실행만 하며, 매매 결과에 대해 어떤 책임도 지지 않습니다.
**모의매매 → 소액 실거래** 순으로 충분히 검증한 뒤 사용하세요.

## 📄 라이선스

[MIT](LICENSE) — 자유롭게 가져다 쓰고, 고치고, 배포하세요.
