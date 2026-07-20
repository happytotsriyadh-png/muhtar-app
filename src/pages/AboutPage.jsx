import { Sparkles, Brain, Database, Globe, Heart, Target, Zap, Award, BookOpen, Users } from 'lucide-react';
import { TRANSLATIONS } from '../data/i18n';

export default function AboutPage({ lang, onStart }) {
  const t = TRANSLATIONS[lang].about || {};
  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/5 border border-primary/10 mb-6">
            <Heart className="w-4 h-4 text-gold-500" />
            <span className="text-sm font-semibold text-primary">
              {lang === 'ar' ? 'من نحن' : 'About Us'}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-6 leading-tight">
            {lang === 'ar' ? 'ليش محتار؟' : 'Why Muhtar?'}
          </h1>
          <p className="text-lg md:text-xl text-primary/70 max-w-3xl mx-auto leading-relaxed">
            {lang === 'ar'
              ? 'كل سنة 60 ألف طالب سعودي يدخل جامعة بتخصص يختاره بناءً على تخمين أو نصيحة صديق. نحن بنينا محتار لأنه لازم يكون عندهم مرشد ذكي يساعدهم يختارون بثقة — ببيانات حقيقية، وبشخصية الطالب نفسه.'
              : "Every year, 60,000 Saudi students enroll in a university major they picked on a hunch or a friend's tip. We built Muhtar because they deserve a smart counselor — one that uses real data, real labor-market signals, and the student's own personality."}
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-xl border border-white/60 mb-12">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center shrink-0">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
                {lang === 'ar' ? 'مهمتنا' : 'Our Mission'}
              </h2>
              <p className="text-primary/75 text-lg leading-relaxed">
                {lang === 'ar'
                  ? 'نربط قرار الطالب الجامعي بشخصيته الحقيقية (RIASEC)، معدله، واحتياجات سوق العمل السعودي الموثّقة — بدل التخمين. كل طالب يستاهل مسار واعي، ماشي مجرد تخصص.'
                  : "We tie each student's major decision to their real personality (RIASEC profile), their grade, and the documented needs of the Saudi labor market — replacing guesswork with insight. Every student deserves a chosen path, not just a chosen major."}
              </p>
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-xl border border-white/60 mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary">
              {lang === 'ar' ? 'القصة' : 'The Story'}
            </h2>
          </div>
          <div className="space-y-4 text-primary/75 text-lg leading-relaxed">
            <p>
              {lang === 'ar'
                ? 'محتار وُلِد في هاكاثون Kanz AI 2026 — أول هاكاثون عربي يسعى لدخول موسوعة غينيس لأكبر عدد مستفيدين. بنيناه في 4 أيام من الصفر: تصميم، برمجة، بيانات، إطلاق.'
                : 'Muhtar was born inside Kanz AI Hackathon 2026 — the first Arabic AI hackathon seeking a Guinness record for the largest number of beneficiaries. We built it from scratch in 4 days: design, code, data, ship.'}
            </p>
            <p>
              {lang === 'ar'
                ? 'استوحينا الاسم من كلمة "محتار" العربية الشائعة — اللي يقف بين خيارين ولا يعرف. بنينا أداة تحوّل هذا الحيرة إلى وضوح في 3 دقائق.'
                : 'The name comes from the Arabic word محتار — the person standing between two choices, unsure. We built a tool that turns that hesitation into clarity in 3 minutes.'}
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Brain, title_ar: 'ذكاء حقيقي', title_en: 'Real Intelligence', desc_ar: 'مبني على نظرية RIASEC العلمية — مش تخمين.', desc_en: 'Built on John Holland\'s peer-reviewed RIASEC theory — not vibes.', color: 'from-primary to-primary-700' },
            { icon: Database, title_ar: 'بيانات رسمية', title_en: 'Official Data', desc_ar: '29 جامعة حكومية من وزارة التعليم السعودية مباشرة.', desc_en: '29 government universities straight from the Saudi MoE.', color: 'from-gold-400 to-gold-600' },
            { icon: Globe, title_ar: 'عربية أولاً', title_en: 'Arabic-First', desc_ar: 'واجهة كاملة RTL، صوت طبيعي، تجربة ثقافية حقيقية.', desc_en: 'Full RTL UI, natural Arabic voice, culturally native.', color: 'from-primary-500 to-gold-500' },
          ].map((v, i) => (
            <div key={i} className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/60 text-center">
              <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-4 shadow-lg`}>
                <v.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">
                {lang === 'ar' ? v.title_ar : v.title_en}
              </h3>
              <p className="text-primary/70">
                {lang === 'ar' ? v.desc_ar : v.desc_en}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-br from-primary to-primary-800 rounded-3xl p-8 md:p-12 shadow-2xl text-white mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10">
            {lang === 'ar' ? 'الأرقام تتكلم' : 'The Numbers Speak'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: '29', label_ar: 'جامعة حكومية', label_en: 'gov. universities' },
              { num: '18+', label_ar: 'تخصص مدروس', label_en: 'studied majors' },
              { num: '7', label_ar: 'أسئلة ذكية', label_en: 'smart questions' },
              { num: '3min', label_ar: 'للنتيجة', label_en: 'to results' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold text-gold-400 mb-1">{s.num}</div>
                <div className="text-sm md:text-base text-white/70">
                  {lang === 'ar' ? s.label_ar : s.label_en}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Built with care */}
        <div className="text-center bg-white/70 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-xl border border-white/60">
          <Award className="w-10 h-10 text-gold-500 mx-auto mb-4" />
          <p className="text-primary/80 leading-relaxed max-w-2xl mx-auto">
            {lang === 'ar'
              ? 'بُني محتار بـ 100% أدوات ذكاء اصطناعي (Hermes AI) تحت إشراف بشري كامل، وصُدر كمشروع مفتوح المصدر — لأن مستقبل التعليم السعودي يستاهل أدوات مفتوحة للجميع.'
              : 'Muhtar was built 100% with AI tools (Hermes AI) under full human direction, and shipped as an open project — because the future of Saudi education deserves open tools for everyone.'}
          </p>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={onStart}
            className="btn-gold text-lg px-10 py-5 inline-flex items-center gap-3 shadow-2xl"
          >
            <Zap className="w-5 h-5" />
            {lang === 'ar' ? 'جرب محتار الآن' : 'Try Muhtar Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
