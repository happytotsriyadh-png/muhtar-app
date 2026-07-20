import { motion } from 'framer-motion';
import { Volume2, FileText, TrendingUp, Award, MapPin, Sparkles, Target } from 'lucide-react';
import { TRANSLATIONS } from '../data/i18n';

function StatBox({ icon, label, value, color, lang }) {
  const colors = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    gold: 'bg-gold-50 text-gold-700 border-gold-200',
    primary: 'bg-primary-50 text-primary-700 border-primary-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  };
  return (
    <div className={`p-3 rounded-xl border-2 ${colors[color]} transition-all hover:scale-105`}>
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-xs opacity-70 font-medium">{label}</div>
      <div className="text-sm md:text-base font-bold mt-1">{value}</div>
    </div>
  );
}

export default function PathCard({ path, lang, index }) {
  const t = TRANSLATIONS[lang].results;
  // brain returns: { major, fit, acceptance, overall, explanation }
  const major = path.major || path; // backwards compat
  const fitScore = path.fit ?? path.overall ?? 0;
  const acceptScore = path.acceptance ?? path.acceptanceScore ?? 75;
  const explanation = path.explanation || major.why_ar || '';

  const isAmbitious = index === 0;
  const isSafe = index === 2;

  const gradient = isAmbitious
    ? 'from-gold-400 via-gold-500 to-gold-600'
    : isSafe
    ? 'from-primary-300 via-primary-500 to-primary-700'
    : 'from-primary-400 via-primary-500 to-primary-600';

  const rankEmoji = ['🥇', '🥈', '🥉'];
  const tierLabel = isAmbitious ? t.ambitious : isSafe ? t.safe : t.realistic;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, type: 'spring' }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-gold-400 to-primary rounded-3xl blur opacity-20 group-hover:opacity-40 transition" />
      <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-transparent hover:border-gold-300 transition-all">
        {/* Top gradient bar */}
        <div className={`h-2 bg-gradient-to-r ${gradient}`} />

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-5xl">{major.emoji}</div>
              <div>
                <div className="text-sm font-bold text-gold-600 uppercase tracking-wider">
                  {rankEmoji[index]} {tierLabel}
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-primary">
                  {lang === 'ar' ? major.title_ar : major.title_en}
                </h3>
              </div>
            </div>
            {major.vision2030 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + index * 0.15 }}
                className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full bg-gold-100 text-gold-700 text-xs font-bold"
              >
                <Award className="w-3 h-3" />
                Vision 2030
              </motion.div>
            )}
          </div>

          {/* Major */}
          <p className="text-primary/60 mb-4 text-sm md:text-base">
            {lang === 'ar' ? '📚 التخصص: ' : '📚 Major: '}
            <span className="font-bold text-primary">
              {lang === 'ar' ? major.major_ar : major.major_en}
            </span>
          </p>

          {/* AI Explanation */}
          {explanation && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.15 }}
              className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-primary-50 to-gold-50 border-2 border-gold-200/60"
            >
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm md:text-base text-primary/90 leading-relaxed italic">
                  {explanation}
                </p>
              </div>
            </motion.div>
          )}

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <StatBox
              icon="🎯"
              label={lang === 'ar' ? 'توافق شخصي' : 'Personal Fit'}
              value={`${fitScore}%`}
              color="emerald"
              lang={lang}
            />
            <StatBox
              icon="📈"
              label={t.acceptance}
              value={`${acceptScore}%`}
              color="gold"
              lang={lang}
            />
            <StatBox
              icon="💰"
              label={t.salary}
              value={lang === 'ar' ? major.salary + ' ريال' : major.salary_en}
              color="primary"
              lang={lang}
            />
            <StatBox
              icon="📊"
              label={t.growth}
              value={major.growth}
              color="indigo"
              lang={lang}
            />
          </div>

          {/* Admission breakdown — shows the role of grade / qudrat / tahsili */}
          {major.qudratWeight != null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 + index * 0.15 }}
              className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-primary-50/50 to-white border border-primary/10"
            >
              <div className="text-xs font-bold text-primary/70 mb-3 uppercase tracking-wider">
                {lang === 'ar' ? '🧮 كيف حسبنا نسبة القبول' : '🧮 How we calculated admission'}
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-lg bg-white border border-primary/10">
                  <div className="text-[10px] text-primary/60 font-semibold uppercase">
                    {lang === 'ar' ? 'المعدل' : 'Grade'}
                  </div>
                  <div className="text-lg font-extrabold text-primary">
                    {Math.max(0, 100 - major.qudratWeight - major.tahsiliWeight)}%
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-white border border-gold-200">
                  <div className="text-[10px] text-gold-700 font-semibold uppercase">
                    {lang === 'ar' ? 'القدرات' : 'Qudrat'}
                  </div>
                  <div className="text-lg font-extrabold text-gold-700">
                    {major.qudratWeight}%
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-white border border-rose-200">
                  <div className="text-[10px] text-rose-700 font-semibold uppercase">
                    {lang === 'ar' ? 'التحصيلي' : 'Tahsili'}
                  </div>
                  <div className="text-lg font-extrabold text-rose-700">
                    {major.tahsiliWeight}%
                  </div>
                </div>
              </div>
              <p className="text-xs text-primary/60 mt-3 leading-relaxed">
                {lang === 'ar' ? (
                  <>
                    ⚖️ أوزان القبول تختلف حسب التخصص. مثلاً:{' '}
                    <span className="font-bold">الطب البشري</span> يعتمد التحصيلي أكثر من{' '}
                    <span className="font-bold">إدارة الأعمال</span>. ندخلها كلها عشان نسبة قبولك تكون واقعية.
                  </>
                ) : (
                  <>
                    ⚖️ Admission weights differ by major. E.g. <span className="font-bold">Medicine</span>{' '}
                    weighs Tahsili more than <span className="font-bold">Business</span>. We factor all three for realistic admission odds.
                  </>
                )}
              </p>
            </motion.div>
          )}

          {/* Strengths (NEW — lists what user needs to be strong in) */}
          {major.strengths_ar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.15 }}
              className="mb-6"
            >
              <div className="text-xs font-bold text-primary/70 mb-2 uppercase tracking-wider">
                {lang === 'ar' ? '🎯 نقاط القوة المطلوبة' : '🎯 Required Strengths'}
              </div>
              <div className="flex flex-wrap gap-2">
                {(lang === 'ar' ? major.strengths_ar : major.strengths_en).map((s, j) => (
                  <span
                    key={j}
                    className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Universities */}
          <div className="mb-4">
            <div className="flex items-center gap-1 text-xs text-primary/60 mb-2">
              <MapPin className="w-3 h-3" />
              <span className="font-semibold">
                {lang === 'ar' ? 'أفضل الجامعات المتاحة:' : 'Top Universities:'}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(major.universities || []).map((u, j) => (
                <span
                  key={j}
                  className="px-2.5 py-1 rounded-md bg-gold-50 text-gold-800 text-xs font-bold"
                >
                  {u}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-primary/80 text-sm leading-relaxed mb-4">
            {lang === 'ar' ? major.description_ar : major.description_en}
          </p>

          {/* Why */}
          <div className="p-3 rounded-xl bg-gold-50/60 border border-gold-200">
            <p className="text-sm text-gold-900 font-medium">
              💡 {lang === 'ar' ? major.why_ar : major.why_en}
            </p>
          </div>

          {/* Years */}
          <div className="mt-4 flex items-center justify-between text-xs text-primary/50">
            <span>📅 {major.years} {lang === 'ar' ? 'سنوات' : 'years'}</span>
            {major.vision2030 && (
              <span className="flex items-center gap-1 font-bold text-gold-600">
                <Award className="w-3 h-3" />
                {lang === 'ar' ? 'مطلوب رؤية 2030' : 'Vision 2030 Demand'}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
