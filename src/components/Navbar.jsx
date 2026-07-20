import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, GraduationCap } from 'lucide-react';
import { TRANSLATIONS } from '../data/i18n';

export default function Navbar({ lang, setLang, onStart }) {
  const t = TRANSLATIONS[lang].nav;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { key: 'home', href: '#hero' },
    { key: 'howItWorks', href: '#how' },
    { key: 'features', href: '#features' },
    { key: 'about', href: '#about' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo — Real PNG (muhtar logo.png) */}
          <motion.a
            href="#hero"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div className="relative group">
              {/* Outer glow on hover */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-gold-400/40 via-primary-500/30 to-primary-700/40 blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Real logo PNG */}
              <img
                src="/logo.png"
                alt="محتار"
                className="relative w-11 h-11 md:w-14 md:h-14 rounded-2xl shadow-xl ring-1 ring-gold-400/30 object-contain bg-white/50 backdrop-blur-sm"
              />
            </div>
            {/* Brand name removed — only icon shown */}
          </motion.a>

          {/* Desktop Nav — frosted glass pill behind links (wider + more spacing) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden md:flex items-center gap-12 lg:gap-16 px-10 lg:px-14 py-3 rounded-full bg-white/70 backdrop-blur-xl border border-white/60 shadow-md ring-1 ring-primary/5"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.key}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                whileHover={{ y: -2 }}
                className="px-2 py-1.5 rounded-full text-primary/80 hover:text-primary hover:bg-primary/5 font-medium transition-colors whitespace-nowrap"
              >
                {t[link.key]}
              </motion.a>
            ))}
          </motion.div>

          {/* Right side: language + CTA */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-primary/5 hover:bg-primary/10 text-primary font-medium text-sm transition-colors"
            >
              <Globe className="w-4 h-4" />
              {t.languageToggle}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStart}
              className="hidden md:flex btn-gold items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              {lang === 'ar' ? 'ابدأ الآن' : 'Start Now'}
            </motion.button>

            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-primary/5"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 text-primary/80 hover:text-primary font-medium"
                >
                  {t[link.key]}
                </a>
              ))}
              <button
                onClick={() => { onStart(); setMobileOpen(false); }}
                className="w-full btn-gold mt-3"
              >
                {lang === 'ar' ? 'ابدأ الآن' : 'Start Now'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}