import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, GraduationCap, X, Globe, Calendar, ExternalLink } from 'lucide-react';
import { UNIVERSITIES } from '../data/universities';
import { TRANSLATIONS } from '../data/i18n';

const SPECIALTIES_AR = [
  'الطب', 'طب الأسنان', 'الصيدلة', 'التمريض', 'العلوم الصحية', 'الطب البيطري',
  'هندسة البترول', 'الهندسة الكيميائية', 'الهندسة الكهربائية', 'الهندسة الميكانيكية',
  'الهندسة المدنية', 'العمارة', 'علوم الحاسب', 'الأمن السيبراني', 'الذكاء الاصطناعي',
  'علم البيانات', 'الشريعة', 'الفقه', 'القانون', 'إدارة الأعمال', 'المحاسبة', 'التسويق',
  'العلوم', 'الرياضيات', 'الفيزياء', 'الكيمياء', 'الأحياء', 'التصميم الجرافيكي', 'الفنون',
  'الإعلام', 'اللغة العربية', 'الأدب', 'التاريخ', 'الجغرافيا', 'علم النفس', 'علم الاجتماع',
  'التربية', 'التعليم', 'الزراعة', 'علوم الأغذية', 'الأرصاد', 'علوم البحار', 'علوم البيئة',
  'السياسة', 'الخدمة الاجتماعية', 'نظم المعلومات', 'التمويل', 'الإدارة', 'التجارة',
];

const SPECIALTIES_EN = [
  'Medicine', 'Dentistry', 'Pharmacy', 'Nursing', 'Health Sciences', 'Veterinary',
  'Petroleum Engineering', 'Chemical Engineering', 'Electrical Engineering', 'Mechanical Engineering',
  'Civil Engineering', 'Architecture', 'Computer Science', 'Cybersecurity', 'Artificial Intelligence',
  'Data Science', 'Islamic Law (Sharia)', 'Jurisprudence', 'Law', 'Business Administration', 'Accounting', 'Marketing',
  'Sciences', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Graphic Design', 'Arts',
  'Media', 'Arabic Language', 'Literature', 'History', 'Geography', 'Psychology', 'Sociology',
  'Education', 'Teaching', 'Agriculture', 'Food Sciences', 'Meteorology', 'Marine Sciences', 'Environmental Sciences',
  'Political Science', 'Social Work', 'Information Systems', 'Finance', 'Management', 'Commerce',
];

export default function UniversitiesExplorer({ lang }) {
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedUni, setSelectedUni] = useState(null);

  const t = lang === 'ar'
    ? {
        title: 'الجامعات الحكومية السعودية',
        subtitle: 'استكشف 29 جامعة حكومية رسمية من وزارة التعليم السعودية',
        searchPlaceholder: 'ابحث عن جامعة...',
        allCities: 'كل المدن',
        allSpecialties: 'كل التخصصات',
        results: 'نتيجة',
        city: 'المدينة',
        founded: 'تأسست',
        specialties: 'التخصصات',
        visitWebsite: 'زيارة الموقع الرسمي',
        close: 'إغلاق',
        showing: 'عرض',
        of: 'من',
        universities: 'جامعة',
      }
    : {
        title: 'Saudi Government Universities',
        subtitle: 'Explore 29 official government universities from the Saudi MoE',
        searchPlaceholder: 'Search universities...',
        allCities: 'All Cities',
        allSpecialties: 'All Specialties',
        results: 'results',
        city: 'City',
        founded: 'Founded',
        specialties: 'Specialties',
        visitWebsite: 'Visit Official Website',
        close: 'Close',
        showing: 'Showing',
        of: 'of',
        universities: 'universities',
      };

  // Get unique cities
  const cities = useMemo(() => {
    const unique = [...new Set(UNIVERSITIES.map((u) => lang === 'ar' ? u.city_ar : u.city_en))];
    return unique.sort();
  }, [lang]);

  // Filter universities
  const filtered = useMemo(() => {
    return UNIVERSITIES.filter((uni) => {
      const matchesSearch = search === '' ||
        uni.name_ar.toLowerCase().includes(search.toLowerCase()) ||
        uni.name_en.toLowerCase().includes(search.toLowerCase());

      const matchesCity = selectedCity === 'all' ||
        (lang === 'ar' ? uni.city_ar : uni.city_en) === selectedCity;

      const matchesSpecialty = selectedSpecialty === 'all' ||
        uni.specialties.some((s) => {
          const specialtyAr = SPECIALTIES_AR[SPECIALTIES_EN.indexOf(s)] || s;
          const specialtyEn = SPECIALTIES_EN[SPECIALTIES_AR.indexOf(s)] || s;
          return (lang === 'ar' ? specialtyAr : specialtyEn).toLowerCase().includes(selectedSpecialty.toLowerCase());
        });

      return matchesSearch && matchesCity && matchesSpecialty;
    });
  }, [search, selectedCity, selectedSpecialty, lang]);

  const specialties = lang === 'ar' ? SPECIALTIES_AR : SPECIALTIES_EN;

  return (
    <section id="universities" className="relative py-20 bg-gradient-to-br from-primary-50/40 via-white to-gold-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-100 text-gold-700 text-sm font-bold mb-4">
            <GraduationCap className="w-4 h-4" />
            {lang === 'ar' ? 'بيانات رسمية' : 'Official Data'}
          </div>
          <h2
            className="text-3xl md:text-5xl arabic-heading text-primary mb-3"
            style={{
              textShadow: '0 0 1px rgba(15, 66, 57, 0.6), 0 1px 2px rgba(15, 66, 57, 0.3)',
              letterSpacing: '-0.02em',
              fontFamily: 'Cairo, IBM Plex Sans Arabic, Tajawal, sans-serif',
            }}
          >
            {t.title}
          </h2>
          <p className="text-primary/70 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
          <p className="text-sm text-primary/50 mt-2">
            {lang === 'ar' ? 'المصدر: وزارة التعليم السعودية (moe.gov.sa)' : 'Source: Saudi MoE (moe.gov.sa)'}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-4 md:p-6 mb-8 shadow-xl"
        >
          <div className="grid md:grid-cols-3 gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute top-1/2 -translate-y-1/2 start-3 w-5 h-5 text-primary/40" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full ps-10 pe-4 py-3 rounded-xl border-2 border-primary/10 focus:border-gold-400 outline-none bg-white text-primary"
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
              />
            </div>

            {/* City filter */}
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-3 rounded-xl border-2 border-primary/10 focus:border-gold-400 outline-none bg-white text-primary font-medium"
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
            >
              <option value="all">🌍 {t.allCities}</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            {/* Specialty filter */}
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-4 py-3 rounded-xl border-2 border-primary/10 focus:border-gold-400 outline-none bg-white text-primary font-medium"
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
            >
              <option value="all">📚 {t.allSpecialties}</option>
              {specialties.map((s, i) => (
                <option key={i} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-primary/60 flex items-center gap-2">
            <span className="font-bold text-gold-600">{t.showing}: {filtered.length}</span>
            <span>{t.of}</span>
            <span className="font-bold">{UNIVERSITIES.length}</span>
            <span>{t.universities}</span>
          </div>
        </motion.div>

        {/* Universities grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence>
            {filtered.map((uni, i) => (
              <motion.button
                key={uni.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => setSelectedUni(uni)}
                className="group relative text-start"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold-300/20 to-primary-200/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative glass rounded-3xl p-5 h-full border-2 border-transparent hover:border-gold-300 transition-all">
                  {/* Logo placeholder */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-7 h-7 text-gold-400" />
                  </div>

                  <h3 className="text-lg font-bold text-primary mb-2 leading-tight">
                    {lang === 'ar' ? uni.name_ar : uni.name_en}
                  </h3>

                  <div className="flex items-center gap-1.5 text-sm text-primary/60 mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? uni.city_ar : uni.city_en}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-primary/50 mb-3">
                    <Calendar className="w-3 h-3" />
                    <span>{uni.founded}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {uni.specialties.slice(0, 3).map((spec, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-full bg-primary/5 text-primary text-xs"
                      >
                        {spec}
                      </span>
                    ))}
                    {uni.specialties.length > 3 && (
                      <span className="px-2 py-0.5 rounded-full bg-gold-100 text-gold-700 text-xs font-bold">
                        +{uni.specialties.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-primary/60">
              {lang === 'ar' ? 'لا توجد نتائج. جرب بحث آخر.' : 'No results. Try another search.'}
            </p>
          </motion.div>
        )}
      </div>

      {/* University detail modal */}
      <AnimatePresence>
        {selectedUni && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedUni(null)}
            className="fixed inset-0 bg-primary/80 backdrop-blur-xl z-[100] flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Header with gradient */}
              <div className="relative h-32 bg-gradient-to-br from-primary to-gold-500 rounded-t-3xl">
                <button
                  onClick={() => setSelectedUni(null)}
                  className="absolute top-4 end-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute -bottom-8 start-6">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-primary" />
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 pt-12">
                <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-2">
                  {lang === 'ar' ? selectedUni.name_ar : selectedUni.name_en}
                </h2>
                <p className="text-primary/60 mb-6" dir="ltr" style={{textAlign: lang === 'ar' ? 'right' : 'left'}}>
                  {lang === 'ar' ? selectedUni.name_en : selectedUni.name_ar}
                </p>

                {/* Info grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <InfoBox
                    icon="📍"
                    label={t.city}
                    value={lang === 'ar' ? selectedUni.city_ar : selectedUni.city_en}
                  />
                  <InfoBox
                    icon="📅"
                    label={t.founded}
                    value={selectedUni.founded}
                  />
                </div>

                {/* Specialties */}
                <div className="mb-6">
                  <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    {t.specialties} ({selectedUni.specialties.length})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedUni.specialties.map((spec, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/5 to-gold-50 text-primary text-sm font-medium border border-primary/10"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Visit button */}
                <a
                  href={`https://${selectedUni.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-gold flex items-center justify-center gap-2"
                >
                  <Globe className="w-4 h-4" />
                  {t.visitWebsite}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function InfoBox({ icon, label, value }) {
  return (
    <div className="p-3 rounded-2xl bg-gradient-to-br from-primary-50 to-gold-50 border border-primary/10">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-xs text-primary/60 mb-1">{label}</div>
      <div className="font-bold text-primary">{value}</div>
    </div>
  );
}