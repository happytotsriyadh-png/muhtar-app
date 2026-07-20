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
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-2xl shadow-[0_8px_32px_rgba(10,37,64,0.08)] border-b border-primary-900/5'
          : 'bg-white/70 backdrop-blur-xl border-b border-white/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-3">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.04 }} className="flex items-center gap-2.5 shrink-0">
            <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5">
              <img
                src="/logo.png"
                alt="محتار"
                className="w-10 h-10 md:w-11 md:h-11 rounded-xl shadow-md ring-1 ring-primary-900/10 object-contain bg-white"
              />
              <span className="hidden sm:block text-lg md:text-xl font-extrabold text-primary-900 arabic-heading">
                محتار
              </span>
            </Link>
          </motion.div>

          {/* Desktop Nav — clean text links on white pill */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => {
              const active = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              return (
                <button
                  key={link.key}
                  onClick={() => link.navigate()}
                  className={`px-4 py-2 rounded-full font-semibold transition-all whitespace-nowrap text-sm ${
                    active
                      ? 'text-primary-900 bg-primary-100/70'
                      : 'text-primary-700 hover:text-primary-900 hover:bg-primary-50'
                  }`}
                >
                  {t[link.key]}
                </button>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-primary-700 hover:text-primary-900 hover:bg-primary-50 font-semibold text-sm transition-colors"
            >
              <Globe className="w-4 h-4" />
              {t.languageToggle}
            </button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onStart}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-primary-900 shadow-md shadow-gold-500/25"
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
