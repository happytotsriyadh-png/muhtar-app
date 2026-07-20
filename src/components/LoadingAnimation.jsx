import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MESSAGES_AR = [
  '🔍 أفهم شخصيتك...',
  '📚 أبحث في 18 تخصص...',
  '🎯 أحسب نسب القبول...',
  '💼 أطابقك مع سوق العمل...',
  '✨ جاهز النتيجة!',
];

const MESSAGES_EN = [
  '🔍 Analyzing your personality...',
  '📚 Searching 18+ majors...',
  '🎯 Calculating acceptance rates...',
  '💼 Matching with job market...',
  '✨ Results ready!',
];

export default function LoadingAnimation({ lang, onComplete }) {
  const [msgIndex, setMsgIndex] = useState(0);
  const messages = lang === 'ar' ? MESSAGES_AR : MESSAGES_EN;

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => {
        if (i >= messages.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return i;
        }
        return i + 1;
      });
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-primary-50 via-white to-gold-50">
      <div className="text-center max-w-md">
        {/* Animated wordmark badge */}
        <motion.div
          animate={{
            rotate: [0, -15, 15, -15, 15, 0],
            scale: [1, 1.05, 1, 1.05, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative w-32 h-32 mx-auto mb-8"
        >
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-gold-400/50 via-primary-500/40 to-primary-700/50 blur-2xl" />
          <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-primary via-primary-700 to-primary-900 flex items-center justify-center shadow-2xl ring-2 ring-gold-400/40 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
            <span
              className="relative font-extrabold text-white text-5xl tracking-tight leading-none"
              style={{
                fontFamily: 'Tajawal, system-ui',
                letterSpacing: '-0.04em',
                textShadow: '0 2px 4px rgba(0,0,0,0.3), 0 0 20px rgba(212,175,55,0.4)',
              }}
            >
              محتار
            </span>
            <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-gold-400 shadow-[0_0_8px_rgba(212,175,55,0.9)]" />
          </div>
        </motion.div>

        {/* Spinner */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-gold-500"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-2 rounded-full border-4 border-transparent border-t-gold-400 border-l-primary-300"
          />
        </div>

        {/* Messages */}
        <motion.p
          key={msgIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold text-primary arabic-heading"
        >
          {messages[msgIndex]}
        </motion.p>

        {/* Progress bar */}
        <div className="mt-6 h-1.5 bg-primary/10 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${((msgIndex + 1) / messages.length) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-primary to-gold-500"
          />
        </div>
      </div>
    </section>
  );
}