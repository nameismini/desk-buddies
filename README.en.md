<div align="center">

# 🧑‍💻 DeskBuddies 👩‍💻

[한국어](README.md) · **English**

**Desktop character launcher for Windows**

Two characters stand at the bottom-center of your desktop. Click one to open its panel.
When the market moves sharply — or when you've been idle for a while — they speak up first.

<img src="assets/screenshot.png" width="640" alt="DeskBuddies running on the desktop" />

![platform](https://img.shields.io/badge/platform-Windows-blue)
![release](https://img.shields.io/github/v/release/nameismini/desk-buddies)
![license](https://img.shields.io/github/license/nameismini/desk-buddies)
![electron](https://img.shields.io/badge/Electron-31-47848F?logo=electron&logoColor=white)

</div>

---

## ✨ At a glance

| Character | What it opens |
|---|---|
| 🧑 **Trader** | A button that **launches your own Python auto-trading project** |
| 👩 **Analyst** | A dashboard: **live prices (Upbit) + economic news + LLM chat** |

- ⚡ **Price-spike alerts** — when a coin you track moves sharply in a short window, the Analyst tells you **first** via a speech bubble + OS notification.
- 💬 **Idle banter** — when there's no mouse/keyboard input for a while, a character throws out a random one-liner.
- 🪟 **Transparent background + lively animation** — frameless on the desktop, gently swaying/breathing even while idle.
- 🔒 **API keys stay on your PC** — keys are saved only to a local config file and sent only to your chosen provider's API. No keys live in this repo.

---

## ⬇️ Just download & run (no install)

1. Grab `DeskBuddies.x.x.x.exe` from [**Releases**](https://github.com/nameismini/desk-buddies/releases/latest)
2. Double-click. **No Node.js, no installer.** (portable exe)

> On first run, if Windows SmartScreen shows a blue *"Windows protected your PC"* warning, click **More info → Run anyway**.
> It's an unsigned personal build — that's expected and it works fine.

---

## 🛠 Run from source (developers)

Install [Node.js LTS](https://nodejs.org), then in this folder:

```bash
npm install   # first time only (downloads Electron)
npm start     # run the app
```

Build your own portable exe:

```bash
npm run dist  # creates a single exe in dist/
```

---

## ⚙️ Configuration

### 👩 Analyst (market chat)
Click the female character → ⚙ (top-right) →

- Enter **LLM provider / model / API key**, then save to enable chat.
  - Anthropic example: model `claude-haiku-4-5-20251001`
  - OpenAI example: model `gpt-4o-mini`
- **Markets**: Upbit codes (`KRW-BTC,KRW-ETH,KRW-SOL` …) — shown via the public API, no key needed.
- **Alert sensitivity (%)**: if a coin moves more than this within 15s, the character alerts you (default 0.8%).

### 🧑 Trader (auto-trading launcher)
Click the male character →

- **Python executable**: usually `python` or `py`
- **Entry script path**: e.g. `C:\projects\autotrade\main.py`
- **Arguments** (optional): e.g. `--mode live`
- Save, then hit **▶ Run** to spawn that Python project as a new process.

> This launcher only **starts** the process. Trading logic, exchange keys, and risk management all live in your Python project.

---

## 🗂 Project structure

| File | Role |
|---|---|
| `main.js` | Electron main — windows, Python spawn, news fetch, LLM calls, idle detection |
| `preload.js` | Safe renderer ↔ main bridge (`contextIsolation`) |
| `overlay.html` | The on-desktop characters + animation + spike/idle banter |
| `dashboard.html` | Analyst (prices · news · chat) panel |
| `trader.html` | Trader (auto-trading launcher) panel |
| `assets/` | Character images (`male_2.png`, `female_2.png` — swap freely) |

---

## ⚠️ Disclaimer

Real-money auto-trading can lose money from a single line of buggy code.
This launcher only runs an external Python program and takes **no responsibility** for trading outcomes.
Validate thoroughly (**paper trading → small live trades**) before relying on it.

## 📄 License

[MIT](LICENSE) — use, modify, and distribute freely.
