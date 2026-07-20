import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Building2, MapPin, GraduationCap, Globe, X } from 'lucide-react';
import { TRANSLATIONS } from '../data/i18n';
import { UNIVERSITIES } from '../data/universities';
import { MAJORS } from '../data/majors';

export default function UniversitiesPage({ lang, onStart }) {
  const t = TRANSLATIONS[lang];
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [majorFilter, setMajorFilter] = useState('all');
  const [selected, setSelected] = useState(null);

  // ESC closes modal
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setSelected(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Derive options
  const cities = ['all', ...new Set(UNIVERSITIES.map(u => u.city))];
  const majorKeys = ['all', ...new Set(MAJORS.map(m => m.id))];

  // Filter
  const filtered = UNIVERSITIES.filter(u => {
    const nameMatch = lang === 'ar' ? u.name : (u.nameEn || u.name);
    if (search && !nameMatch.toLowerCase().includes(search.toLowerCase()) && !u.city.toLowerCase().includes(search.toLowerCase())) return false;
    if (cityFilter !== 'all' && u.city !== cityFilter) return false;
    if (majorFilter !== 'all' && !(u.majors || []).some(m => m.id === majorFilter || m.name_ar === majorFilter)) return false;
    return true;
  });

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/5 border border-primary/10 mb-5">
            <Building2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              {lang === 'ar' ? 'الجامعات الحكومية السعودية' : 'Saudi Government Universities'}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 leading-tight arabic-heading">
            {lang === 'ar' ? '29 جامعة حكومية في متناولك' : '29 Government Universities in Your Reach'}
          </h1>
          <p className="text-lg text-primary/70 max-w-2xl mx-auto">
            {lang === 'ar'
              ? 'بيانات رسمية من وزارة التعليم السعودية. فلتر حسب المدينة أو التخصص وشوف التفاصيل الكاملة.'
              : 'Official data from the Saudi Ministry of Education. Filter by city or major and view full details.'}
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-primary/50 mt-3">
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'المصدر: وزارة التعليم السعودية (moe.gov.sa)' : 'Source: Saudi MoE (moe.gov.sa)'}</span>
          </div>
        </div>

        {/* Search + filters */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-5 shadow-lg border border-white/60 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-primary/40" />
              <input
                type="text"
                placeholder={lang === 'ar' ? 'ابحث عن جامعة...' : 'Search a university...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full ps-12 pe-4 py-3 rounded-xl border border-primary/10 focus:border-primary/30 focus:ring-2 focus:ring-primary/20 outline-none bg-white/80 text-primary placeholder:text-primary/40"
              />
            </div>
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:border-primary/30 focus:ring-2 focus:ring-primary/20 outline-none bg-white/80 text-primary"
            >
              {cities.map(c => (
                <option key={c} value={c}>
                  {c === 'all' ? (lang === 'ar' ? '🌍 كل المدن' : '🌍 All Cities') : c}
                </option>
              ))}
            </select>
            <select
              value={majorFilter}
              onChange={(e) => setMajorFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-primary/10 focus:border-primary/30 focus:ring-2 focus:ring-primary/20 outline-none bg-white/80 text-primary"
            >
              {majorKeys.map(m => (
                <option key={m} value={m}>
                  {m === 'all' ? (lang === 'ar' ? '📚 كل التخصصات' : '📚 All Majors') : (MAJORS.find(x => x.id === m)?.name_ar || m)}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 text-sm text-primary/60">
            {lang === 'ar' ? `عرض ${filtered.length} من ${UNIVERSITIES.length} جامعة` : `Showing ${filtered.length} of ${UNIVERSITIES.length} universities`}
          </div>
        </div>

        {/* Cards — with AnimatePresence for smooth filter transitions */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((u, i) => {
              const displayName = lang === 'ar' ? u.name : (u.nameEn || u.name);
              return (
                <motion.button
                  key={u.id || u.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: Math.min(i * 0.02, 0.4), type: 'spring', stiffness: 200, damping: 25 }}
                  whileHover={{ y: -4, scale: 1.015 }}
                  onClick={() => setSelected(u)}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-md hover:shadow-2xl border border-white/60 text-start transition-shadow"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center shrink-0 shadow-md">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-primary line-clamp-2 mb-1 arabic-heading">{displayName}</h3>
                      <div className="flex items-center gap-1 text-xs text-primary/60">
                        <MapPin className="w-3 h-3" />
                        <span>{u.city}</span>
                        <span>·</span>
                        <span>{u.founded}</span>
                      </div>
                    </div>
                  </div>
                  {u.majors && u.majors.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {u.majors.slice(0, 4).map((m, j) => (
                        <span key={j} className="px-2 py-0.5 rounded-md text-xs bg-primary/5 text-primary/70 border border-primary/10">
                          {lang === 'ar' ? (m.name_ar || m.name) : (m.name_en || m.name)}
                        </span>
                      ))}
                      {u.majors.length > 4 && (
                        <span className="px-2 py-0.5 rounded-md text-xs bg-gold-50 text-gold-700 border border-gold-200">
                          +{u.majors.length - 4}
                        </span>
                      )}
                    </div>
                  )}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-primary/60 text-lg">
              {lang === 'ar' ? 'ما لقينا نتائج. جرّب فلتر ثاني.' : 'No results. Try a different filter.'}
            </p>
          </div>
        )}

        {/* Modal — with Escape key + close button + better animation */}
        <AnimatePresence>
          {selected && (
            <motion.div
              key="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                key="modal-card"
                initial={{ scale: 0.92, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl relative"
              >
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="absolute top-4 end-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center shrink-0 shadow-lg">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-extrabold text-primary mb-1 arabic-heading">
                      {lang === 'ar' ? selected.name : (selected.nameEn || selected.name)}
                    </h2>
                    <div className="flex items-center gap-3 text-sm text-primary/60">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {selected.city}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5" /> {selected.founded}
                      </span>
                    </div>
                  </div>
                </div>
                {selected.majors && selected.majors.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-semibold text-primary mb-3 arabic-heading">
                      {lang === 'ar' ? 'التخصصات المتاحة' : 'Available Majors'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selected.majors.map((m, j) => (
                        <span key={j} className="px-3 py-1 rounded-full bg-primary/5 text-primary text-sm border border-primary/10">
                          {lang === 'ar' ? (m.name_ar || m.name) : (m.name_en || m.name)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {selected.description && (
                  <p className="text-primary/70 leading-relaxed mb-4">{selected.description}</p>
                )}
                <div className="flex flex-wrap gap-3">
                  {selected.website && (
                    <a
                      href={selected.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold"
                    >
                      {lang === 'ar' ? 'زيارة الموقع' : 'Visit Website'}
                    </a>
                  )}
                  <button onClick={onStart} className="px-5 py-3 rounded-xl bg-primary/5 text-primary font-semibold hover:bg-primary/10 transition-colors">
                    {lang === 'ar' ? 'احصل على نصيحة' : 'Get advice'}
                  </button>
                  <button onClick={() => setSelected(null)} className="px-5 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors">
                    {lang === 'ar' ? 'إغلاق' : 'Close'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
