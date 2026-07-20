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
    <section id="features" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold gradient-text">
            {t.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((key, i) => {
            const Icon = ICONS[key];
            const f = t[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -8, scale: 1.02 }}
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