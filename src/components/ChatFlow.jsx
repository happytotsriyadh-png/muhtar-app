import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';
import { QUESTIONS, TRANSLATIONS } from '../data/i18n';

// Acknowledgment generator — emoji + warm reply based on what the user picked
function getAcknowledgment(qId, value, lang) {
  if (!value) return null;

  const isAr = lang === 'ar';

  // Passion (free text)
  if (qId === 'passion') {
    const v = value.toLowerCase();
    if (/برمجة|كود|python|code|ماث|رياضيات|تحليل|علم/.test(v)) {
      return isAr ? 'تحليل عميق وعقل رياضي — أحب هالطاقة! 🔬' : 'Deep analytical mind — love the energy! 🔬';
    }
    if (/رسم|تصميم|إبداع|فن|كتابة/.test(v)) {
      return isAr ? 'روح إبداعية حلوة! ما بنخليها تروح 🎨' : 'Such creative spirit! We\'ll honor that 🎨';
    }
    if (/مساعدة|تعليم|ناس|خدمة|علاج/.test(v)) {
      return isAr ? 'قلب كبير وعقل عطوف — نادر 🤝' : 'Big heart + caring mind — rare combo 🤝';
    }
    if (/بناء|هندسة|يدوي|قيادة/.test(v)) {
      return isAr ? 'عقل بنّاء عملي — ممتاز! 🔧' : 'Practical builder mindset — excellent! 🔧';
    }
    if (/تجارة|بيع|قيادة|شروع|ريادة|استثمار/.test(v)) {
      return isAr ? 'ريادي من الطراز الأول 🚀' : 'Born entrepreneur energy 🚀';
    }
    return isAr ? 'حلو! خلي نشوف وين يوجهك ✨' : 'Nice! Let\'s see where this leads ✨';
  }

  // Problem style
  if (qId === 'problem_style') {
    const map = {
      ar: { analytical: 'عقل تحليلي 👌', action: 'تتحرك بسرعة، عملي ⚡', social: 'تبني على فريقك 👥', creative: 'تفكر خارج الصندوق 🎨' },
      en: { analytical: 'Analytical mind 👌', action: 'Quick action-taker ⚡', social: 'You build on the team 👥', creative: 'Out-of-the-box thinker 🎨' },
    };
    return map[lang]?.[value] || null;
  }

  // Values
  if (qId === 'values') {
    const map = {
      ar: { income: 'الفلوس مهمة — من حقك 💰', balance: 'التوازن مع الحياة — حكمة ⚖️', impact: 'تبي تغيير حقيقي — هذا جوهر المهنة 🌟', freedom: 'حرية المكان والزمان 🌍', security: 'تبي أساس ثابت — ذكي 🛡️' },
      en: { income: 'Money matters — fair 💰', balance: 'Life balance = wisdom ⚖️', impact: 'You want real change — that\'s the heart of work 🌟', freedom: 'Place & time freedom 🌍', security: 'Want a solid base — smart 🛡️' },
    };
    return map[lang]?.[value] || null;
  }

  // Environment
  if (qId === 'environment') {
    const map = {
      ar: { lab: 'بحث وعلم — الطريق أقوى 🔬', hands: 'في الميدان! 🔥 قلبك معماري 👷', office: 'بي مكتب منظم — هيكل واضح 💼', hospital: 'تخدم الناس مباشرة — مهن نبيلة 🏥', creative_studio: 'استوديو مرن! 🎨', classroom: 'تعليم وتدريب 📚' },
      en: { lab: 'Research & science — powerful 🔬', hands: 'In the field! Field-ready energy 🔥', office: 'Structured office — clear framework 💼', hospital: 'Direct service — noble work 🏥', creative_studio: 'Flexible creative space 🎨', classroom: 'Teaching & training 📚' },
    };
    return map[lang]?.[value] || null;
  }

  // Interaction
  if (qId === 'interaction') {
    const map = {
      ar: { solo: 'تركيز فردي — كذا يصلح لبحث وأشياء دقيقة 🎯', team: 'ضمن فريق — متوازن 👥', clients: 'تواجه الناس وجهاً لوجه — قيادة 🤝', data: 'أرقام وتحليل — كل الشركات تحتاجك 📊' },
      en: { solo: 'Solo focus — perfect for research & precision 🎯', team: 'Within a team — balanced 👥', clients: 'Face-to-face — leadership 🤝', data: 'Numbers & analysis — every company needs you 📊' },
    };
    return map[lang]?.[value] || null;
  }

  // Grade
  if (qId === 'grade') {
    if (value >= 95) return isAr ? 'ممتاز! 🌟 النخبة مفتوحة لك' : 'Excellent! 🌟 Top-tier open to you';
    if (value >= 90) return isAr ? 'ممتاز! 💪 كل الجامعات قريبة' : 'Strong! 💪 Most unis are in reach';
    if (value >= 85) return isAr ? 'جيد جداً 👌 خياراتك كثيرة' : 'Very good 👌 Many options open';
    if (value >= 80) return isAr ? 'جيد 👍 خيارات ذكية متاحة' : 'Good 👍 Smart picks available';
    return isAr ? 'لا تقلق — نشوف خيارات واقعية لامتيازك' : 'No worries — we\'ll find realistic fits';
  }

  // Qudrat
  if (qId === 'qudrat') {
    if (value >= 90) return isAr ? '🔥 قدرات عالية — الهندسة والطب والإدارة بانتظارك' : '🔥 Top Qudrat — engineering, med, business await';
    if (value >= 80) return isAr ? 'قدرات ممتازة — تخصصات كثيرة تنفتح' : 'Solid Qudrat — many majors open up';
    if (value >= 70) return isAr ? 'قدرات جيدة — نشوف خيارات واقعية' : 'Decent — we\'ll find realistic options';
    if (value >= 60) return isAr ? 'لا بأس — الخيارات الأذكى تناسبك' : 'Decent — smarter picks fit you';
    return isAr ? 'نركز على تخصصات أقل اعتماداً على القدرات' : 'We focus on majors less dependent on Qudrat';
  }

  // Tahsili
  if (qId === 'tahsili') {
    if (value >= 90) return isAr ? 'تحصيلي ذهبي ✨ — الطب وطب الأسنان والعلوم تناديك' : 'Golden Tahsili ✨ — medical & sciences await';
    if (value >= 80) return isAr ? 'تحصيلي ممتاز — تخصصات علمية قوية' : 'Strong Tahsili — rigorous majors available';
    if (value >= 70) return isAr ? 'جيد — خيارات متنوعة' : 'Good — diverse options';
    if (value >= 60) return isAr ? 'مقبول — نرشدك للأذكى' : 'Decent — we point to smarter ones';
    return isAr ? 'نركز على التخصصات الأقل اعتماداً على التحصيلي' : 'We focus on majors less dependent on Tahsili';
  }

  return isAr ? 'تمام، سجّلت إجابتك ✨' : 'Got it, noted ✨';
}

export default function ChatFlow({ lang, onComplete, onSkip }) {
  const t = TRANSLATIONS[lang].chat;
  const [step, setStep] = useState(-1); // -1 = welcome
  const [answers, setAnswers] = useState({});
  const [textInput, setTextInput] = useState('');
  const [lastAck, setLastAck] = useState(''); // acknowledgment of previous answer
  const [isTyping, setIsTyping] = useState(false); // bot is "thinking"

  const question = step >= 0 ? QUESTIONS[step] : null;
  const progress = step >= 0 ? ((step + 1) / QUESTIONS.length) * 100 : 0;

  const startChat = () => {
    setStep(0);
  };

  const advance = (qId, value) => {
    setLastAck(getAcknowledgment(qId, value, lang));
    setIsTyping(true);
    setTimeout(() => {
      if (step < QUESTIONS.length - 1) {
        setStep(step + 1);
        setIsTyping(false);
      } else {
        onComplete({ ...answers, [qId]: value });
      }
    }, 700); // brief pause for personality
  };

  const handleAnswer = (value) => {
    if (!question) return;
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);
    setTextInput('');
    advance(question.id, value);
  };

  const handleSkipOptional = () => {
    if (!question || !question.optional) return;
    const newAnswers = { ...answers, [question.id]: null };
    setAnswers(newAnswers);
    setTextInput('');
    setLastAck(
      lang === 'ar'
        ? 'ماشي، نكمل بدونها — نقدر نعدّلها لاحقاً 🤷'
        : 'No worries, skipping — we can adjust later 🤷'
    );
    setIsTyping(true);
    setTimeout(() => {
      if (step < QUESTIONS.length - 1) {
        setStep(step + 1);
        setIsTyping(false);
      } else {
        onComplete({ ...answers, [question.id]: null });
      }
    }, 500);
  };

  // Welcome screen
  if (step === -1) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-primary-50 via-white to-gold-50"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="max-w-2xl w-full"
        >
          <div className="relative glass rounded-3xl p-8 md:p-12 shadow-2xl text-center">
            {/* Brand logo — real PNG with glow halo */}
            <motion.div
              animate={{ rotate: [0, -3, 3, -3, 0] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
              className="mx-auto mb-6 relative w-28 h-28 md:w-32 md:h-32"
            >
              <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-gold-400/50 via-primary-500/40 to-primary-700/50 blur-2xl opacity-90" />
              <div className="relative w-full h-full rounded-[24px] bg-white shadow-2xl ring-2 ring-gold-400/40 overflow-hidden flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="محتار"
                  className="w-full h-full object-contain p-2"
                />
              </div>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-3">
              {t.welcome}
            </h2>
            <p className="text-primary/70 mb-8 text-lg">{t.welcomeDesc}</p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={startChat}
                className="btn-gold flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                {t.start}
              </motion.button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-primary/60">
              <span>🔒</span>
              <span>{lang === 'ar' ? 'بياناتك خاصة وآمنة' : 'Your data is private & secure'}</span>
            </div>
          </div>
        </motion.div>
      </motion.section>
    );
  }

  // Question screens
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-primary-50 via-white to-gold-50">
      <div className="max-w-2xl w-full">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-primary/60 mb-2">
            <span>
              {t.questionsLeft}: {QUESTIONS.length - step}
            </span>
            <span>
              {t.of} {QUESTIONS.length}
            </span>
          </div>
          <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-primary to-gold-500"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isTyping ? (
            // Bot typing indicator
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass rounded-3xl p-6 md:p-10 shadow-2xl"
            >
              <div className="flex items-start gap-3">
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-lg ring-1 ring-gold-400/30 overflow-hidden">
                    <img src="/logo.png" alt="محتار" className="w-full h-full object-contain" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white shadow" />
                </div>
                <div className="flex-1">
                  {lastAck && (
                    <p className="text-sm text-gold-700 italic mb-3 animate-pulse">✨ {lastAck}</p>
                  )}
                  <div className="flex items-center gap-1.5 text-primary/70">
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 rounded-full bg-primary"
                    />
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 rounded-full bg-primary"
                    />
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 rounded-full bg-primary"
                    />
                    <span className="ml-2 text-xs">
                      {lang === 'ar' ? 'محتار يفكر...' : 'Muhtar thinking...'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : question ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: lang === 'ar' ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: lang === 'ar' ? 30 : -30 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-3xl p-6 md:p-10 shadow-2xl"
            >
              {/* Bot avatar + question */}
              <div className="flex items-start gap-3 mb-6">
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-lg ring-1 ring-gold-400/30 overflow-hidden">
                    <img src="/logo.png" alt="محتار" className="w-full h-full object-contain" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white shadow" />
                </div>
                <div className="flex-1 bg-primary/5 rounded-2xl rounded-ss-none p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-primary/70">محتار · مرشدك</span>
                  </div>
                  <p className="text-primary font-bold text-lg">
                    {lang === 'ar' ? question.text_ar : question.text_en}
                  </p>
                  {/* Echo previous answer if any */}
                  {step > 0 && lastAck && (
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-gold-700 mt-2 italic"
                    >
                      ✨ {lastAck}
                    </motion.p>
                  )}
                  {/* Optional marker */}
                  {question.optional && (
                    <p className="text-xs text-primary/50 mt-2 italic">
                      {lang === 'ar' ? '💡 اختياري — تقدر تتخطى إذا ما اختبرت بعد' : '💡 Optional — you can skip if you haven\'t tested yet'}
                    </p>
                  )}
                </div>
              </div>

              {/* Answer input */}
              <div className="space-y-3">
                {question.type === 'text' && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && textInput && handleAnswer(textInput)}
                      placeholder={lang === 'ar' ? question.placeholder_ar : question.placeholder_en}
                      className="flex-1 px-4 py-3 rounded-xl border-2 border-primary/10 focus:border-gold-400 outline-none bg-white text-primary"
                      dir={lang === 'ar' ? 'rtl' : 'ltr'}
                      autoFocus
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => textInput && handleAnswer(textInput)}
                      className="btn-gold"
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>
                )}

                {question.type === 'choice' && (
                  <div className="grid gap-2">
                    {question.options.map((opt) => (
                      <motion.button
                        key={opt.value}
                        whileHover={{ scale: 1.02, x: lang === 'ar' ? -4 : 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(opt.value)}
                        className="w-full text-start p-4 rounded-2xl bg-white border-2 border-primary/10 hover:border-gold-400 hover:bg-gold-50 transition-all font-medium text-primary"
                      >
                        {lang === 'ar' ? opt.label_ar : opt.label_en}
                      </motion.button>
                    ))}
                  </div>
                )}

                {question.type === 'number' && (
                  <div>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min={question.min ?? 0}
                        max={question.max ?? 100}
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            if (question.optional && !textInput) handleSkipOptional();
                            else if (textInput) handleAnswer(parseInt(textInput));
                          }
                        }}
                        placeholder={lang === 'ar' ? question.placeholder_ar : question.placeholder_en}
                        className="flex-1 px-4 py-3 rounded-xl border-2 border-primary/10 focus:border-gold-400 outline-none bg-white text-primary text-2xl font-bold text-center"
                        autoFocus
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => textInput ? handleAnswer(parseInt(textInput)) : (question.optional ? handleSkipOptional() : null)}
                        className="btn-gold"
                      >
                        <Send className="w-5 h-5" />
                      </motion.button>
                    </div>
                    {question.optional && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        onClick={handleSkipOptional}
                        className="mt-3 w-full text-center py-2 rounded-lg text-sm text-primary/60 hover:text-primary hover:bg-primary/5 transition"
                      >
                        {lang === 'ar' ? '⏭️ تخطي هذي (ما اختبرت بعد)' : '⏭️ Skip this (haven\'t tested yet)'}
                      </motion.button>
                    )}
                  </div>
                )}
              </div>

              {/* Skip to results button */}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
