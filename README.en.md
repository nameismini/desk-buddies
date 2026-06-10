<div align="center">

# 🧑‍💻 DeskBuddies 👩‍💻

[한국어](README.md) · **English**

**A desktop character launcher, just for fun**

A little buddy floats at the bottom-center of your desktop. Leave it alone and it breathes/sways;
ignore it too long and it complains it's bored. Click it and a small panel pops up.

<img src="assets/screenshot.png" width="640" alt="DeskBuddies running on the desktop" />

![platform](https://img.shields.io/badge/platform-Windows-blue)
![release](https://img.shields.io/github/v/release/nameismini/desk-buddies)
![license](https://img.shields.io/github/license/nameismini/desk-buddies)
![electron](https://img.shields.io/badge/Electron-31-47848F?logo=electron&logoColor=white)

</div>

---

## 🐣 What is this?

A lightweight, toy-like app that puts a **mascot character** on your desktop.
It isn't trying to do anything serious — I just wanted **a cute friend sitting on my desk**, so I made this launcher.

- 🪟 Floats on the desktop **transparently**, no frame or background
- ✨ Gently **sways/breathes** even while idle; shows a speech bubble on hover
- 💬 If there's no input for a while, it **blurts out a random line** about being bored
- 🖱️ **Drag** the character to move it; ⚙ settings / ✕ quit at the top-right

> The **Trader 🧑 and Analyst 👩 here are just sample characters.**
> They're a demo to show "clicking a character could open a panel like this" — not serious features.
> Swap them out and make your own buddy. 🙂

---

## ⬇️ Just download & run (no install)

1. Grab `DeskBuddies.x.x.x.exe` from [**Releases**](https://github.com/nameismini/desk-buddies/releases/latest)
2. Double-click. **No Node.js, no installer.** (portable exe)

> On first run, if Windows SmartScreen shows the blue *"Windows protected your PC"* warning, click **More info → Run anyway**.
> It's an unsigned personal build — expected, and it works fine.

---

## 🎨 Make it your own

The fun is in **customizing it**.

- **Swap characters**: replace `assets/male_2.png` / `assets/female_2.png` with any transparent PNG.
- **Lines & banter**: edit the dialogue arrays in `overlay.html` to make it say whatever you want.
- **Click-to-open panels**: edit `dashboard.html` / `trader.html` for your own purposes.

### What do the sample panels do? (just examples)
| Sample character | On click (demo) |
|---|---|
| 🧑 Trader | A button that runs an external program you configured (e.g. a Python script) |
| 👩 Analyst | Shows public Upbit prices + econ news, plus LLM chat if you add a key |

These are only "here's something you *could* wire up to a character" examples. Ignore them if you like.

---

## 🛠 Run from source / build (developers)

Install [Node.js LTS](https://nodejs.org), then in this folder:

```bash
npm install   # first time only (downloads Electron)
npm start     # run the app

npm run dist  # creates a portable exe in dist/
```

---

## 🗂 Project structure

| File | Role |
|---|---|
| `main.js` | Electron main — windows, idle detection, (sample) external launch/news/LLM calls |
| `preload.js` | Safe renderer ↔ main bridge |
| `overlay.html` | The on-desktop character + animation + banter |
| `dashboard.html` · `trader.html` | **Sample panels** that open on click |
| `assets/` | Character images (swap them out) |

---

## ⚠️ Note

The sample Trader panel is a "run an external program" demo, so if you actually wire up a real
auto-trading script, it really will run it. That's entirely **your own responsibility** — this launcher
just shows a character and presses a button.

## 📄 License

[MIT](LICENSE) — use it, hack it, and build your own desk buddy. 🐥
