import { motion } from 'framer-motion';
import { Heart, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { TRANSLATIONS } from '../data/i18n';

export default function Footer({ lang }) {
  const t = TRANSLATIONS[lang].footer;
  return (
    <footer className="relative bg-gradient-to-br from-primary to-primary-800 text-white py-16 overflow-hidden">
      <div className="absolute inset-0 bg-mesh-dark opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <img
              src="/logo-white.png"
              alt="محتار"
              className="relative w-28 h-28 rounded-2xl object-contain mb-4"
            />
            <p className="text-white/70 leading-relaxed">{t.about}</p>
            <div className="mt-4 flex items-center gap-2 text-gold-400">
              <Heart className="w-4 h-4 fill-current" />
              <span className="text-sm">{t.builtWith}</span>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-lg font-bold text-gold-400 mb-4">{t.poweredBy}</h3>
            <ul className="space-y-2 text-white/70">
              <li>⚡ React + Vite</li>
              <li>🎨 Tailwind CSS</li>
              <li>🌀 Framer Motion</li>
              <li>🤖 Claude AI</li>
              <li>🗣️ ElevenLabs</li>
              <li>🚀 Vercel</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-bold text-gold-400 mb-4">
              {lang === 'ar' ? 'تواصل معنا' : 'Connect'}
            </h3>
            <div className="flex gap-3">
              {[
                { Icon: Twitter, href: '#' },
                { Icon: Linkedin, href: '#' },
                { Icon: Github, href: '#' },
                { Icon: Mail, href: '#' },
              ].map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-gold-400/20 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <p className="text-sm text-white/50 mt-6">{t.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}