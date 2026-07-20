import { motion } from 'framer-motion';
import { TRANSLATIONS } from '../data/i18n';

export default function HowItWorks({ lang }) {
  const t = TRANSLATIONS[lang].howItWorks;
  return (
    <section id="how" className="py-16 md:py-20 bg-gradient-to-br from-primary-50/50 to-gold-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-12"
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

        <div className="grid md:grid-cols-5 gap-4">
          {t.steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              whileHover={{ y: -6, scale: 1.02 }}
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