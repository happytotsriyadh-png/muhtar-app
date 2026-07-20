# Muhtar Demo Video v2 — Storyboard (Apple-tier Walkthrough)

**Target:** 120s · 1920×1080 · 24fps · 7-15 MB final · landscape 16:9
**Tone:** Conflicted → Curious → Empowered → Relieved
**Structure:** 9 scenes · 3 acts
**Method:** Headless Chromium recording + smooth ffmpeg post

---

## ACT 1 — Hook + Hero (0:00-0:20) — 20s

### Scene 01: Cold Open · "One problem" (0:00-0:05) — 5s
- **Visual**: Black → fade in to **logo + tagline card** (`brand-reveal-v1.mp4` source, but I'll re-render it cleaner).
- **Text on screen**: "محتار؟ عندك مرشد ومستشار" — white on dark.
- **Audio**: Quiet ambient pad begins + soft click SFX.
- **Music**: Soft piano/ambient pad fade-in.

### Scene 02: The Hook · "What every Saudi student faces" (0:05-0:13) — 8s
- **Visual**: Slow scroll-down on a DARK-mode mockup of "100 confused students / 60K high-schoolers / wrong majors" — a TEXT OVERLAY card with stats: **60,000 طالب ثانوي · 1 تخصص عشوائي · 4 سنوات ضائعة**.
- **Why**: Kanz judges see this as "real Saudi problem" — visual storytelling instead of feature slideshow.
- **Audio**: Whisper SFX + minor piano tension.

### Scene 03: Meet Muhtar (0:13-0:20) — 7s
- **Visual**: Click into https://muhtar-app.vercel.app (real site). Scroll-on from black to hero.
- **Camera**: Slow scroll reveal 0→100vh over 5s.
- **What appears**: wordmark logo → "محتار؟ عندك مرشد ومستشار" (white, free-floating) → search bar → stats appear.
- **Audio**: UI chime + music swells gently.

---

## ACT 2 — The Wizard (0:20-1:25) — 65s · THE CORE

### Scene 04: Click "يلا نبدأ" → chat welcome (0:20-0:30) — 10s
- **Visual**: Click → smooth fade to chat welcome card.
- **Hero image of welcome**: official logo PNG top-center, "أهلاً بك في محتار!" in big Tajawal, "يلا، ييلا نبدأ الرحلة" gold CTA.
- **Camera**: Slow drift on welcome card.
- **Audio**: UI click SFX.

### Scene 05: Wizard Q1 (0:30-0:42) — 12s
- **Visual**: Click "يلا، ييلا نبدأ الرحلة" → wizard opens.
- **Bot avatar**: logo.png at left + chat bubble "وش أكثر شي يسليك وتشتغل عليه بسعادة؟".
- **Type**: "البرمجة وتحليل البيانات والذكاء الاصطناعي" (text appears as if typed by user).
- **Send**: gold arrow click → bot acknowledgment appears.
- **Camera**: Medium shot of the wizard.

### Scene 06: Speedrun Q2-Q5 (0:42-0:62) — 20s
- **Visual**: Quick cuts, ~4s per question:
  - Q2 "تحليل وبحث" → next
  - Q3 "تأثير حقيقي" → next
  - Q4 "مختبر أو مكتبة" → next
  - Q5 "فريق صغير" → next
- **Each cut**: smooth fade-to-white between questions.
- **Style**: Speed-ramp feel — each tap feels impactful.
- **Audio**: Quick clicking UI SFXs, beat-matched.

### Scene 07: Loading → Results (0:62-1:18) — 16s
- **Visual**: Click "اعرض النتيجة" → loading dual-ring spinner with staged messages. Then smooth **zoom-in** to results section.
- **Camera**: Slow push through the loading state, then reframes on results.
- **What appears**: Archetype badge "أنت من نوع الباحِث التطبيقي" + RIASEC bars (animated).
- **Audio**: Music swells to major chord on results reveal.

### Scene 08: 3 Career Path Cards (1:18-1:25) — 7s
- **Visual**: Slow scroll through 3 PathCards (gold/silver/bronze).
- **Each card**: ~2s dwell — title + 4 stat boxes + AI explanation highlights.
- **Audio**: Music continues with subtle uplift.

---

## ACT 3 — Universities + Brand Reveal (1:25-2:00) — 35s

### Scene 09: Universities Explorer (1:25-1:42) — 17s
- **Visual**: Smooth scroll down to Universities Explorer. Type "الرياض" in city filter. Show 7 results.
- **Style**: Show ALL the official Saudi MoE sources at once.
- **Audio**: Music continues + click SFX.

### Scene 10: Mentor Voice + Tagline (1:42-1:55) — 13s
- **Visual**: Slow fade to cream/pearl background with **animated text reveal**:
  - "محتار… اختيار الشطار" (kinetic typography entrance: fade-up)
- **Audio**: **Mentor voice line plays** ("ليش محتار... عندك مرشد ومستشار يرشدك باختصار ويوضحلك المسار") with subtle cinematic reverb.
- **Music**: Music softens during the voice, swells back to resolve.

### Scene 11: Brand Reveal + End Card (1:55-2:00) — 5s
- **Visual**: Pearl/black background with:
  - Logo (large)
  - "محتار · مرشدك الجامعي"
  - URL: **muhtar-app.vercel.app**
  - "Built with Hermes · Kanz AI Hackathon 2026"
- **Audio**: Music resolves and fades to silence.

---

## Audio Bus Plan

| Track | Source | Volume |
|-------|--------|--------|
| BGM ambient | Pixabay "Cinematic Ambient" (free) | -20dB throughout |
| Mentor voice | `audio/voiceover/mentor-line.mp3` (already prepared) | 0dB on Scene 10 only |
| UI click SFX | Freesound.org "soft click" | -10dB on every tap |
| Cinematic boom | Freesound | -15dB on reveals |

## Color Grade (apply in ffmpeg)

```
-eq brightness=-0.02:saturation=1.05
-vignette
```

## Transitions

- **Fade to black** (0.5s): between acts (Act 1 → Act 2, Act 2 → Act 3)
- **Cross-fade** (0.3s): between wizard questions
- **Smooth scroll** (no cut): within scenes

## Final duration target

- Min: 110s (1:50)
- Max: 140s (2:20) — within Kanz 1-3 min ideal range

## Export settings (final)

- Codec: H.264 (libx264)
- Profile: high
- CRF: 22 (visually lossless)
- Preset: medium
- Audio: AAC 192kbps stereo
- Container: MP4 with faststart enabled

## Output paths

- Local: `~/Desktop/محتار-screenshots/muhtar-demo.mp4`
- Vercel backup: `~/Desktop/محتار/public/demo.mp4`
- Repo: `~/Desktop/محتar/public/demo.mp4`
