<div align="center">

# 🧑‍💻 DeskBuddies 👩‍💻

**한국어** · [English](README.en.md)

**그냥 재미로 만든 바탕화면 캐릭터 런처**

바탕화면 가운데 아래에 캐릭터가 떠 있어요. 가만히 두면 숨쉬듯 움직이고,
한참 안 만지면 심심하다고 말도 겁니다. 클릭하면 작은 패널이 열려요.

<img src="assets/screenshot.png" width="640" alt="DeskBuddies 실행 화면" />

![platform](https://img.shields.io/badge/platform-Windows-blue)
![release](https://img.shields.io/github/v/release/nameismini/desk-buddies)
![license](https://img.shields.io/github/license/nameismini/desk-buddies)
![electron](https://img.shields.io/badge/Electron-31-47848F?logo=electron&logoColor=white)

</div>

---

## 🐣 이게 뭐예요?

바탕화면에 **마스코트 캐릭터**를 띄워두는 가벼운 장난감 같은 앱이에요.
별 대단한 기능을 하려고 만든 게 아니라, **그냥 책상 위에 귀여운 친구를 둬보고 싶어서** 만든 런처입니다.

- 🪟 프레임·배경 없이 **투명하게** 바탕화면에 떠 있음
- ✨ 가만히 있을 때도 **숨쉬듯 살짝 흔들림**, 마우스 올리면 말풍선
- 💬 한동안 입력이 없으면 **심심하다고 랜덤으로 한마디** 던짐
- 🖱️ 캐릭터를 **드래그해서 위치 이동**, 우측 위 ⚙ 설정 / ✕ 종료

> 지금 들어있는 **트레이더🧑 · 애널리스트👩 는 그냥 샘플 캐릭터**예요.
> "캐릭터를 클릭하면 이런 패널을 띄울 수도 있다"는 걸 보여주려고 넣어둔 데모일 뿐,
> 진지한 기능을 의도한 게 아닙니다. 마음대로 바꿔서 본인만의 친구로 만들면 돼요. 🙂

---

## ⬇️ 그냥 받아서 쓰기 (설치 불필요)

1. [**Releases**](https://github.com/nameismini/desk-buddies/releases/latest) 에서 `DeskBuddies.x.x.x.exe` 다운로드
2. 더블클릭 → 끝. **Node.js도, 설치 과정도 필요 없어요.** (포터블 exe)

> 처음 실행 시 *"Windows의 PC 보호"* 파란 경고가 뜨면 **추가 정보 → 실행**을 누르세요.
> 서명 안 한 개인 빌드라 그런 거고, 동작엔 문제 없습니다.

---

## 🎨 내 맘대로 바꾸기

이 런처의 재미는 **직접 꾸미는 것**에 있어요.

- **캐릭터 교체**: `assets/male_2.png`, `assets/female_2.png` 를 원하는 PNG(배경 투명)로 바꾸면 끝.
- **말풍선 대사 / 잡담**: `overlay.html` 안의 대사 배열만 고치면 캐릭터가 다른 말을 합니다.
- **클릭하면 열리는 패널**: `dashboard.html` · `trader.html` 내용을 본인 용도로 자유롭게 수정.

### 샘플 패널은 뭘 하나요? (그냥 예시예요)
| 샘플 캐릭터 | 클릭하면 (데모) |
|---|---|
| 🧑 트레이더 | 설정해둔 외부 프로그램(예: 파이썬 스크립트)을 실행해보는 버튼 |
| 👩 애널리스트 | 업비트 공개 시세 + 경제뉴스를 보여주고, (키 넣으면) LLM 챗도 되는 패널 |

이건 "캐릭터에 이런 걸 연결할 수도 있구나" 정도의 예시일 뿐이에요. 안 써도 그만입니다.

---

## 🛠 소스에서 실행 / 빌드 (개발자용)

[Node.js LTS](https://nodejs.org) 설치 후, 이 폴더에서:

```bash
npm install   # 처음 한 번만 (Electron 내려받기)
npm start     # 앱 실행

npm run dist  # dist/ 폴더에 포터블 exe 생성
```

---

## 🗂 파일 구조

| 파일 | 역할 |
|---|---|
| `main.js` | Electron 메인 — 창 생성, 유휴 감지, (샘플) 외부 실행/뉴스/LLM 호출 |
| `preload.js` | 렌더러 ↔ 메인 안전한 통신 브릿지 |
| `overlay.html` | 바탕화면에 떠 있는 캐릭터 + 애니메이션 + 잡담 |
| `dashboard.html` · `trader.html` | 클릭 시 열리는 **샘플 패널** |
| `assets/` | 캐릭터 이미지 (교체해서 쓰세요) |

---

## ⚠️ 참고

샘플 트레이더 패널은 "외부 프로그램 실행" 데모라서, 만약 진짜 자동매매 스크립트를 연결하면 실제로 실행됩니다.
그건 어디까지나 **본인 책임**이고, 이 런처는 그저 캐릭터를 띄우고 버튼을 눌러줄 뿐이에요.

## 📄 라이선스

[MIT](LICENSE) — 자유롭게 가져다 쓰고, 고치고, 자기만의 데스크 친구를 만들어보세요. 🐥
