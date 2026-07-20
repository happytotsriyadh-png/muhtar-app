import { motion } from 'framer-motion';
import { Brain, Database, Volume2, Globe, Target, Shield } from 'lucide-react';
import { TRANSLATIONS } from '../data/i18n';

const ICONS = {
  smart: Brain,
  data: Database,
  voice: Volume2,
  bilingual: Globe,
  vision: Target,
  privacy: Shield,
};

export default function Features({ lang }) {
  const t = TRANSLATIONS[lang].features;
  const features = Object.keys(ICONS);

  return (
    <section id="features" className="py-16 md:py-20 bg-white relative overflow-hidden">
      {/* subtle background pattern */}
      <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-14"
        >
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
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map((key, i) => {
            const Icon = ICONS[key];
            const f = t[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                whileHover={{ y: -6, scale: 1.015 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold-300/20 to-primary-200/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative glass rounded-3xl p-6 h-full border-2 border-transparent hover:border-gold-300 transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-gold-400" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">{f.title}</h3>
                  <p className="text-primary/60 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}