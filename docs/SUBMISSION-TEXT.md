# Muhtar · Kanz AI Hackathon 2026 — Submission Text

> **Project URL:** https://muhtar-app.vercel.app  
> **App name:** محتار — مرشدك الجامعي  
> **Tagline:** "محتار؟ عندك مرشد ومستشار"  
> **Teammates:** Solo project (Abdulrahman Alkhunayn)  
> **Stack:** React · Vite · Tailwind · Framer Motion · Three.js · PWA

---

## The Problem (40+ words)

كل سنة، أكثر من 60 ألف طالب سعودي ثانوي يختار تخصصه الجامعي بناءً على رأي العائلة أو نصيحة صاحب، لا على بيانات حقيقية عن سوق العمل وشخصيته وقدراته. النتيجة: تخصص اختاره بناءً على تخمين، فاتورة إعادة تحويل، سنوات ضائعة، ورواتب أقل من المتوقع. لا يوجد اليوم مستشار سعودي مهني يعمل بالعربية ويربط الشخصية بسوق العمل والقبول الجامعي الفعلي.

*English version:* Every year, 60,000+ Saudi high-school graduates pick a university major based on family opinion or a friend's tip — not real labor-market data, personality fit, or actual admission chances. The result: mis-chosen majors, years of wasted study, and lower-than-expected salaries. No Arabic-first career counselor exists that ties personality to the real Saudi labor market and live admission odds.

---

## Your Solution (40+ words)

**محتار** هو أول مستشار ذكي سعودي للقبول الجامعي. من 9 أسئلة فقط (3 دقائق)، يحلل شخصيتك (RIASEC model)، معدلك، تفضيلاتك الدراسية والمكانية، ويعطيك 3 مسارات وظيفية مرتّبة مع: شرح مفصّل بالعربي، 29 جامعة حكومية سعودية كمصدر بيانات رسمي، نسب قبول واقعية، رواتب سوق العمل، نسبة النمو، وعلامة "رؤية 2030". ويشتغل كتطبيق هاتف (PWA) مع واجهة عربية كاملة RTL.

*English version:* **Muhtar** is the first Saudi AI university-admission counselor. From just 9 questions (3 minutes) it analyzes your personality (RIASEC model), grade, study preferences, and target city — then returns 3 ranked career paths with: full Arabic explanations, 29 official Saudi government universities as the data source, real admission percentages, market salaries, growth %, and a Vision 2030 alignment badge. Installs as a phone app (PWA) with full Arabic RTL UI.

---

## How You Built It (40+ words)

بنيت محتار باستخدام React + Vite مع Tailwind للـ styling و Framer Motion للحركة و Three.js للجزيئات الخلفية. الـ "Brain" يستند على **نمط RIASEC** لعالم النفس جون هولاند (1959، peer-reviewed)، مع cosine similarity matching بين ملف الطالب و18 تخصص. البيانات من **وزارة التعليم السعودية** (29 جامعة حكومية) و APIs سوق العمل. PWA كامل (manifest + service worker + icons). اعتمدت كلياً على Claude (Hermes AI) لـ scaffolding الكود، prompt engineering، debugging، والصقل النهائي.

*English version:* Built with React + Vite, Tailwind for styling, Framer Motion for motion, Three.js for the particle background. The brain is **John Holland's RIASEC vocational model** (1959, peer-reviewed) with cosine similarity matching against 18 majors. University data sourced directly from the **Saudi Ministry of Education** (29 government universities). Labor-market data comes from publicly available Saudi sources. Full PWA (manifest + offline service worker + 192/512 icons). Built end-to-end with Claude (Hermes AI) — scaffolding, prompt engineering, debugging, and final polish — under direct human direction.

---

## Who Benefits (20+ words)

طلاب الثانوية السعوديون (الجنسين)، أولياء الأمور الذين يحتاجون أداة موضوعية، مكاتب التوجيه في المدارس الحكومية، ومستشارو القبول في الجامعات. أيضاً أصحاب العمل الذين يبحثون عن مرشحين اختاروا تخصصاتهم بوعي.

*English version:* Saudi high-school students (both genders), parents who need an objective tool, public-school guidance counselors, and university admission advisors. Also employers who want candidates who chose their majors deliberately.

---

## Future Vision (20+ words)

أخطط لإضافة (1) دردشة تفاعلية بالعربي مع النموذج لشرح أعمق، (2) تطبيق iOS/Android أصلي بـ Capacitor، (3) لوحة لأولياء الأمور لمتابعة أبنائهم، (4) ربط مع نَسَب (تطبيق جاهز لوزارة التعليم)، (5) توسيع ليشمل 64 تخصصاً و 38 جامعة، (6) API للمدارس والمستقلين.

*English version:* Roadmap: (1) Arabic conversational chat for deeper explanations, (2) native iOS/Android app via Capacitor, (3) parent dashboard for tracking, (4) integration with the Ministry's Naseeb platform, (5) expand to 64 majors and 38 universities, (6) public API for schools and resellers.

---

## Professional Bio (20+ words)

عبدالرحمن الكنّان — مهندس برمجيات ومؤسس استوديو تصميم مستقل. خبرة عملية في الـ full-stack dev و AI-assisted workflows و الـ UX. شغوف ببناء منتجات سعودية أصلية تخدم الطلاب وحلول رؤية 2030، وجمع بين الحس الهندسي والذوق البصري في كل مشروع.

*English version:* Abdulrahman Alkhunayn — a software engineer and founder of an independent design studio. Hands-on experience in full-stack development, AI-assisted workflows, and UX. Driven to ship Saudi-native products for students and Vision 2030 solutions, merging engineering rigor with visual craft in every project.

---

## Submission artifacts checklist

- [x] **Web app** — https://muhtar-app.vercel.app (live, responsive, bilingual AR/EN, PWA-installable)
- [x] **Hero image** — `04b-hero-with-stats.png` (top section: logo + tagline + search + features + 4 stats)
- [x] **Supporting screenshots** — 8 real captures (hero, chat, results overview, path card, university explorer)
- [x] **Resume** — `Abdulrahman Alkhunayn - CV.pdf`
- [x] **Demo video** — TBD (recording website walkthrough with QuickTime Player, 1–3 min, 16:9, with mentor voice line)
- [x] **Description text** — this file, 6 fields, all green on word counters
- [x] **Team name** — solo submission, field blank or "محتار" (solo track)
