import { motion } from 'framer-motion';
import { RotateCcw, Share2, Sparkles, GraduationCap, Briefcase, TrendingUp, Target } from 'lucide-react';
import { TRANSLATIONS } from '../data/i18n';
import PathCard from './PathCard';
import { analyzeAnswers, getArchetype } from '../lib/brain';

export default function Results({ lang, answers, onRestart }) {
  const t = TRANSLATIONS[lang].results;
  const result = analyzeAnswers(answers || {}, lang);
  const paths = result.recommendations;
  const archetype = getArchetype(result.userRIASEC, lang);

  // Get archetype title display
  const archetypeAr = `أنت من نوع "${archetype}"`;
  const archetypeEn = `You are a "${archetype}"`;
  const archetypeDisplay = lang === 'ar' ? archetypeAr : archetypeEn;

  return (
    <section className="min-h-screen py-20 px-4 bg-gradient-to-br from-primary-50 via-white to-gold-50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 1, repeat: 2 }}
            className="text-7xl mb-4"
          >
            🎉
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-extrabold gradient-text mb-3">
            {t.title}
          </h1>
          <p className="text-primary/70 text-lg mb-2">{t.subtitle}</p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-block mt-3 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-gold-200/40 text-primary font-semibold text-sm md:text-base"
          >
            {archetypeDisplay}
          </motion.p>
        </motion.div>

        {/* RIASEC Profile Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-gold-500" />
            <h2 className="text-lg font-bold text-primary">
              {lang === 'ar' ? 'ملفك المهني (RIASEC)' : 'Your Career Profile'}
            </h2>
          </div>
          <div className="space-y-2">
            {result.riasecProfile.map((d) => (
              <div key={d.dim} className="flex items-center gap-3">
                <div className="w-20 md:w-28 text-xs md:text-sm font-medium text-primary/80">
                  {d.label}
                </div>
                <div className="flex-1 h-3 bg-primary/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${d.score}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full ${
                      d.top
                        ? 'bg-gradient-to-r from-gold-400 to-gold-600'
                        : 'bg-gradient-to-r from-primary-300 to-primary-500'
                    } rounded-full`}
                  />
                </div>
                <div className="w-10 text-right text-xs md:text-sm font-bold text-primary">
                  {d.score}%
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-primary/60 leading-relaxed">
            {lang === 'ar'
              ? '📊 مبني على نموذج هولاند المهني (RIASEC) — معتمد علمياً منذ 1959. الأبعاد الذهبية = نقاط قوتك الأساسية.'
              : '📊 Based on Holland\'s vocational model (RIASEC) — peer-reviewed since 1959. Gold bars = your top strengths.'}
          </p>
        </motion.div>

        {/* Paths */}
        <div className="space-y-6 mb-12">
          {paths.map((path, i) => (
            <PathCard key={path.major.id} path={path} lang={lang} index={i} />
          ))}
        </div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRestart}
            className="btn-primary flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            {t.restart}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'محتار - Muhtar',
                  text: lang === 'ar' ? 'جربت محتار وطلعت نتيجتي!' : 'I tried Muhtar and got my result!',
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert(lang === 'ar' ? 'تم نسخ الرابط!' : 'Link copied!');
              }
            }}
            className="btn-gold flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            {t.share}
          </motion.button>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-sm text-primary/50 mt-8 max-w-2xl mx-auto"
        >
          {lang === 'ar'
            ? '⚠️ تنبيه: محتار أداة مساعدة. القرار النهائي لك. تحقق من بيانات القبول من موقع الجامعة الرسمي.'
            : '⚠️ Note: Muhtar is a guidance tool. Final decision is yours. Verify admission data from official university websites.'}
        </motion.p>
      </div>
    </section>
  );
}
