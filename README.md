# محتار — Muhtar

> **محتار؟ عندك مرشد ومستشار**
> أول مستشار ذكي سعودي للقبول الجامعي.
> Built during Kanz AI Hackathon 2026 (July 18–20, 2026).

[![Live](https://img.shields.io/badge/Live-muhtar--app.vercel.app-2FAB99)](https://muhtar-app.vercel.app)
[![Stack](https://img.shields.io/badge/Stack-React%20%2B%20Vite-61DAFB)](https://github.com/happytotsriyadh-png/muhtar-app)
[![Status](https://img.shields.io/badge/Status-Submitted%20to%20Kanz-success)](https://try.ka.nz/hack)

---

## 🎯 The Problem

Every year, 60,000+ Saudi high-school graduates make a single decision that costs them 4 years and a career: their university major. They pick based on family pressure, a friend's tip, or social-media trends — never on real data. The result: **30% of Saudi students change majors within their first year**, costing **SAR 4.2B annually** in retakes, lost productivity, and career-path mismatches.

## 💡 The Solution

**Muhtar** is the first Saudi AI university-admission counselor — a fully-bilingual (AR/EN) Progressive Web App that turns a **9-question, 3-minute chat** into a ranked, evidence-based career plan. The brain runs **John Holland's peer-reviewed RIASEC model (1959)** with cosine-similarity matching against 18 Saudi-contextualized majors, factoring grade, Qudrat, Tahsili, and city. It returns 3 ranked paths with **Vision 2030 alignment badges**, salary ranges, growth %, and live admission odds across **29 government universities**.

## ✨ Features

- 🎯 **9-question wizard** — 3 minutes to results
- 🧠 **RIASEC peer-reviewed model** — John Holland (1959)
- 🇸🇦 **29 Saudi government universities** — sourced from MoE
- 📊 **3 ranked career paths** with Vision 2030 badges
- 📱 **PWA installable** — works offline
- 🌐 **Bilingual AR/EN** — full RTL support
- 🎨 **Apple-tier design** — Three.js particle background + Framer Motion
- 📍 **University explorer** — search + filter by city/major
- 🔤 **Arabic diacritics fix** — ث/ش/ت preserved

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + Vite 5 |
| **Styling** | TailwindCSS 3 (custom design system) |
| **Animation** | Framer Motion |
| **3D Background** | Three.js (custom particle system) |
| **Routing** | React Router DOM 7 |
| **Icons** | Lucide React |
| **PWA** | Custom service worker + manifest |
| **Hosting** | Vercel |

## 📁 Project Structure

```
محتار/
├── src/
│   ├── App.jsx              # Main app + routing
│   ├── main.jsx             # React mount point
│   ├── index.css            # Global styles + .arabic-heading class
│   ├── components/
│   │   ├── Navbar.jsx       # Apple-tier sticky pill
│   │   ├── Hero.jsx         # Large display typography
│   │   ├── HowItWorks.jsx   # 5-step explanation
│   │   ├── Features.jsx     # 6-card grid
│   │   ├── ChatFlow.jsx     # 9-question wizard
│   │   ├── LoadingAnimation.jsx
│   │   ├── Results.jsx      # RIASEC profile + 3 paths
│   │   ├── PathCard.jsx     # Single career path card
│   │   ├── UniversitiesExplorer.jsx
│   │   ├── Footer.jsx
│   │   └── ParticleBackground.jsx
│   ├── pages/
│   │   ├── AboutPage.jsx
│   │   └── UniversitiesPage.jsx
│   ├── data/
│   │   ├── universities.js  # 29 MoE universities
│   │   ├── majors.js        # 18 RIASEC-tagged majors
│   │   └── i18n.js          # Full AR/EN translation
│   └── lib/
│       └── brain.js         # RIASEC engine + cosine similarity
├── public/
│   ├── demo.mp4             # Final demo with voice + music (21 MB)
│   ├── manifest.webmanifest
│   ├── sw.js
│   ├── logo.png
│   ├── og-image.png
│   ├── cairo-900.woff2      # Self-hosted Arabic font
│   └── icons (16, 32, 192, 512, apple-touch)
├── docs/
│   ├── SUBMISSION-TEXT.md
│   └── demo-video-storyboard.md
├── vercel.json
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## 🚀 Local Development

```bash
# Clone
git clone https://github.com/happytotsriyadh-png/muhtar-app.git
cd muhtar-app

# Install
npm install

# Dev server
npm run dev   # → http://localhost:5173

# Build
npm run build

# Deploy (Vercel)
vercel deploy --prod
```

## 📊 Submission Stats (Kanz AI Hackathon 2026)

| Metric | Value |
|--------|-------|
| Submission date | July 20, 2026 |
| Live URL | https://muhtar-app.vercel.app |
| Custom domain | muhtar.amk.ink (pending DNS) |
| Screenshots | 13 (1080p retina) |
| Demo video | 1:57 with Arabic voice + ambient music |
| Bundle size | 260 KB gzipped |
| Lighthouse | (to be measured) |
| Universities in data | 29 (all MoE government) |
| Career paths | 18 (RIASEC-tagged) |
| Languages | Arabic (RTL) + English (LTR) |

## 🏆 Tech Highlights

### RIASEC Brain (`src/lib/brain.js`)
- Typed TypeScript-style vector engine (JS with JSDoc)
- Cosine similarity matching against 18 majors
- Deterministic + explainable scoring
- Grade + Qudrat + Tahsili weighting per major

### Arabic Diacritics Fix
- Self-hosted Cairo-900 woff2 (Google Fonts subsetting strips ث/ش/ت)
- `.arabic-heading` CSS class with `font-feature-settings: 'kern','liga','calt','ccmp','mark','mkmk'`
- Weight 900 essential for visible three-dots

### Apple-tier Hero
- Eyebrow badge with sparkles
- Massive display typography (`text-7xl/8xl`)
- Gold underline on key brand words
- Trust indicators strip (29 / 9 / 3min)
- Particle background (Three.js) with z-index -1

### Mobile Responsive
- Hero title fits on 2 lines max (iPhone 13)
- Navbar shows visible "ابدأ" gold pill on mobile
- Search bar uses `min-w-0` + `shrink-0` to prevent overflow
- Trust indicators stack on small screens

## 📜 License

This project was built for Kanz AI Hackathon 2026.
© 2026 Abdulrahman Alkhunayn. All rights reserved.

---

**Built with ❤️ by Abdulrahman Alkhunayn during Kanz AI Hackathon 2026**
