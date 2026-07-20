import { motion } from 'framer-motion';
import { ArrowLeft, Brain, Database, Volume2 } from 'lucide-react';
import { TRANSLATIONS } from '../data/i18n';

export default function Hero({ lang, onStart }) {
  const t = TRANSLATIONS[lang].hero;

  const features = [
    { icon: Brain, key: 'smart' },
    { icon: Database, key: 'data' },
    { icon: Volume2, key: 'voice' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10"
      style={{ background: 'transparent' }}
    >
      {/* Subtle floating orbs in teal */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 right-20 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl -z-[5] pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl -z-[5] pointer-events-none"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Tagline — Hero logo removed; small icon lives in Navbar only */}

        {/* Tagline — smaller & in a frosted glass card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-block mt-16 md:mt-24 lg:mt-32 mb-12 md:mb-16"
        >
          <div className="relative px-6 py-3 md:px-8 md:py-4 rounded-2xl bg-white/55 backdrop-blur-xl border border-white/60 shadow-xl">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-gold-400/10 pointer-events-none" />
            <h1 className="relative text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-primary via-primary-700 to-primary bg-clip-text text-transparent">
                {lang === 'ar' ? 'محتار؟' : 'Confused?'}
              </span>
              <span className="mx-2 text-gold-500">·</span>
              <span className="text-primary/85 font-bold">
                {lang === 'ar' ? 'عندك مرشد ومستشار' : 'You have a guide'}
              </span>
            </h1>
          </div>
        </motion.div>

        {/* Subtitle — frosted glass card so it reads as part of the background */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8 max-w-3xl mx-auto px-4"
        >
          <div className="relative inline-block px-6 py-3 rounded-2xl bg-white/55 backdrop-blur-xl border border-white/60 shadow-lg">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-gold-400/10 pointer-events-none" />
            <p className="relative text-base md:text-lg text-primary/80 font-medium leading-relaxed">
              {t.subtitle}
            </p>
          </div>
        </motion.div>

        {/* Animated input bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition" />
            <div className="relative bg-white rounded-2xl shadow-xl p-2 flex items-center gap-2 border border-gray-100">
              <input
                type="text"
                placeholder={t.placeholder}
                className="flex-1 px-4 py-3 bg-transparent outline-none text-primary placeholder-primary/40 font-medium"
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onStart}
                className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-600 hover:shadow-xl transition-all"
              >
                {t.cta}
                <ArrowLeft className={`w-4 h-4 ${lang === 'ar' ? '' : 'rotate-180'}`} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Quick features row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
        >
          {features.map((feature, i) => {
            const f = TRANSLATIONS[lang].features[feature.key];
            return (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white/70 backdrop-blur-md rounded-2xl p-5 text-start card-hover shadow-lg border border-primary/10"
              >
                <feature.icon className="w-8 h-8 text-primary mb-2" />
                <h3 className="font-bold text-primary mb-1">{f.title}</h3>
                <p className="text-sm text-primary/60">{f.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-center"
        >
          {[
            { n: '29', label: lang === 'ar' ? 'جامعة حكومية' : 'Gov Universities' },
            { n: '18+', label: lang === 'ar' ? 'تخصص' : 'Majors' },
            { n: '60K+', label: lang === 'ar' ? 'طالب سعودي' : 'Saudi Students' },
            { n: '3min', label: lang === 'ar' ? 'للنتيجة' : 'To Results' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="text-center bg-white/70 backdrop-blur-md px-4 py-2 rounded-xl border border-primary/10 shadow-sm"
            >
              <div className="text-3xl md:text-4xl font-extrabold text-primary">
                {stat.n}
              </div>
              <div className="text-sm text-primary/70 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}