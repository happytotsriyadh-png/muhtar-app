import { motion } from 'framer-motion';
import { TRANSLATIONS } from '../data/i18n';

export default function HowItWorks({ lang }) {
  const t = TRANSLATIONS[lang].howItWorks;
  return (
    <section id="how" className="py-20 bg-gradient-to-br from-primary-50/50 to-gold-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl md:text-5xl font-black text-primary mb-3"
            style={{
              textShadow: '0 0 1px rgba(15, 66, 57, 0.6), 0 1px 2px rgba(15, 66, 57, 0.3)',
              letterSpacing: '-0.02em',
              fontFamily: 'Cairo, IBM Plex Sans Arabic, Tajawal, sans-serif',
            }}
          >
            {t.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-4">
          {t.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="relative"
            >
              <div className="glass rounded-2xl p-6 h-full card-hover border-2 border-transparent hover:border-gold-300">
                <div className="absolute -top-4 -start-4 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-gold-500 text-white font-bold flex items-center justify-center shadow-lg">
                  {i + 1}
                </div>
                <p className="text-primary/80 font-medium pt-3 leading-relaxed">
                  {step}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}