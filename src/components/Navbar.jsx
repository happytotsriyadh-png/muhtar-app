import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, GraduationCap } from 'lucide-react';
import { TRANSLATIONS } from '../data/i18n';

export default function Navbar({ lang, setLang, onStart, currentPath, goHome, goUniversities, goAbout }) {
  const t = TRANSLATIONS[lang].nav;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { key: 'home', path: '/', navigate: goHome },
    { key: 'universities', path: '/universities', navigate: goUniversities },
    { key: 'howItWorks', path: '/#how', navigate: () => { goHome(); setTimeout(() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' }), 50); } },
    { key: 'features', path: '/#features', navigate: () => { goHome(); setTimeout(() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }), 50); } },
    { key: 'about', path: '/about', navigate: goAbout },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/10 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-3">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 shrink-0">
            <Link to="/" onClick={() => setMobileOpen(false)}>
              <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-gold-400/40 via-primary-500/30 to-primary-700/40 blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src="/logo.png"
                  alt="محتار"
                  className="relative w-11 h-11 md:w-14 md:h-14 rounded-2xl shadow-xl ring-1 ring-gold-400/30 object-contain bg-white/50 backdrop-blur-sm"
                />
              </div>
            </Link>
          </motion.div>

          {/* Desktop Nav — transparent glass pill behind links */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden md:flex items-center gap-6 lg:gap-8 px-6 lg:px-8 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-md"
          >
            {navLinks.map((link, i) => {
              const active = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <motion.button
                  key={link.key}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  whileHover={{ y: -2 }}
                  onClick={() => link.navigate()}
                  className={`px-2 py-1.5 rounded-full font-medium transition-colors whitespace-nowrap text-sm ${
                    active ? 'text-white bg-white/15' : 'text-white/85 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {t[link.key]}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Right side */}
          <div className="flex items-center gap-2 shrink-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-colors backdrop-blur-sm border border-white/20"
            >
              <Globe className="w-4 h-4" />
              {t.languageToggle}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStart}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all bg-gold-400 hover:bg-gold-500 text-primary shadow-lg shadow-gold-500/30"
            >
              <GraduationCap className="w-4 h-4" />
              {lang === 'ar' ? 'ابدأ الآن' : 'Start Now'}
            </motion.button>

            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-primary/5"
              aria-label="menu"
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
                <button
                  key={link.key}
                  onClick={() => { link.navigate(); setMobileOpen(false); }}
                  className="block w-full text-start py-2 text-primary/80 hover:text-primary font-medium"
                >
                  {t[link.key]}
                </button>
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
