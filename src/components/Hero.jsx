import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { TRANSLATIONS } from '../data/i18n';

export default function Hero({ lang, onStart }) {
  const t = TRANSLATIONS[lang].hero;

  // Trust indicators — single horizontal strip
  const trust = [
    { value: '29', label: lang === 'ar' ? 'جامعة حكومية' : 'Gov Universities' },
    { value: '9', label: lang === 'ar' ? 'أسئلة فقط' : 'Questions' },
    { value: '3min', label: lang === 'ar' ? 'للنتيجة' : 'To Result' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700"
      style={{ background: 'transparent' }}
    >
      {/* Soft floating orbs in teal — gentler than before */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-32 right-10 w-72 h-72 bg-primary-200/35 rounded-full blur-3xl -z-[5] pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-10 w-96 h-96 bg-primary-100/45 rounded-full blur-3xl -z-[5] pointer-events-none"
      />

      <div className="absolute inset-0 bg-mesh opacity-50 pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow — subtle badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 shadow-sm mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-300" />
          <span className="text-xs md:text-sm font-semibold text-white arabic-heading">
            {lang === 'ar' ? 'مستشار القبول الجامعي الأول في السعودية' : 'Saudi Arabia\'s first AI university counselor'}
          </span>
        </motion.div>

        {/* Headline — large, bold, tight, white text on dark gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="arabic-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.15] tracking-tight text-white px-2 drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]"
        >
          <span className="block">{lang === 'ar' ? 'محتار؟' : 'Confused?'}</span>
          <span className="block mt-2 md:mt-3 text-white/95 text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            {lang === 'ar' ? (
              <>عندك <span className="text-gold-400 border-b-4 border-gold-400/80 pb-1">مرشد</span> و<span className="text-gold-400 border-b-4 border-gold-400/80 pb-1">مستشار</span></>
            ) : (
              <>You have a <span className="text-gold-400">guide</span></>
            )}
          </span>
        </motion.h1>

        {/* Subtitle — single line, soft */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="arabic-heading mt-6 md:mt-8 text-lg md:text-2xl text-white/85 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
        >
          {t.subtitle}
        </motion.p>

        {/* Secondary CTA — discover how it works */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="mt-4 flex items-center justify-center"
        >
          <a
            href="#how"
            className="inline-flex items-center gap-1.5 text-sm md:text-base font-semibold text-gold-300 hover:text-gold-200 transition-colors arabic-heading drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
          >
            <span>{t.ctaSecondary}</span>
            <span className={lang === 'ar' ? 'rotate-180' : ''}>→</span>
          </a>
        </motion.div>

        {/* Search bar — single elegant input */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="max-w-2xl mx-auto mt-10 md:mt-12 px-2"
        >
          <div className="relative group">
            {/* Soft glow on hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-300 via-primary-400 to-primary-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="relative bg-white rounded-2xl shadow-xl shadow-primary-900/5 p-1.5 flex items-center gap-2 border border-primary-900/5">
              <input
                type="text"
                placeholder={t.placeholder}
                className="flex-1 min-w-0 px-3 md:px-4 py-3 md:py-3.5 bg-transparent outline-none text-primary-900 placeholder-primary-400 font-medium text-sm md:text-base"
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onStart}
                className="shrink-0 flex items-center gap-1.5 md:gap-2 bg-primary-800 hover:bg-primary-900 text-white px-4 md:px-6 py-3 rounded-xl font-bold text-sm md:text-base transition-colors shadow-md"
              >
                {t.cta}
                <ArrowLeft className={`w-4 h-4 ${lang === 'ar' ? '' : 'rotate-180'}`} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Trust indicators — single horizontal strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mt-10 md:mt-14 flex flex-wrap justify-center items-center gap-x-8 md:gap-x-12 gap-y-3"
        >
          {trust.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="text-2xl md:text-3xl font-black text-gold-600 arabic-heading tabular-nums">
                {item.value}
              </div>
              <div className="text-sm md:text-base font-semibold text-primary-800 arabic-heading">
                {item.label}
              </div>
              {i < trust.length - 1 && (
                <div className="hidden md:block w-px h-5 bg-primary-300/60 ms-6" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
