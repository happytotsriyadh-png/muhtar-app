import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Footer from './components/Footer';
import ChatFlow from './components/ChatFlow';
import Results from './components/Results';
import LoadingAnimation from './components/LoadingAnimation';
import UniversitiesExplorer from './components/UniversitiesExplorer';
import UniversitiesPage from './pages/UniversitiesPage';
import AboutPage from './pages/AboutPage';
import ParticleBackground from './components/ParticleBackground';

function HomePage({ lang, onStart }) {
  const navigate = useNavigate();
  return (
    <div className="relative z-10">
      <Navbar lang={lang} setLang={setLang => {}} onStart={onStart} onNavigate={navigate} />
      <Hero lang={lang} onStart={onStart} />
      <HowItWorks lang={lang} />
      <Features lang={lang} />
      <div id="universities">
        <UniversitiesExplorer lang={lang} />
      </div>
      <Footer lang={lang} />
    </div>
  );
}

function AppContent() {
  const [lang, setLang] = useState('ar');
  const [view, setView] = useState('home'); // home | chat | loading | results
  const [answers, setAnswers] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Sync HTML lang/dir attribute with state
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const startChat = () => {
    setView('chat');
    navigate('/chat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleComplete = (newAnswers) => {
    setAnswers(newAnswers);
    setView('loading');
    navigate('/loading');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadingDone = () => {
    setView('results');
    navigate('/results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const restart = () => {
    setAnswers(null);
    setView('home');
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => navigate('/');
  const goUniversities = () => navigate('/universities');
  const goAbout = () => navigate('/about');

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'transparent' }}>
      <ParticleBackground />

      {/* Show nav on all views except full-screen chat/loading */}
      {view !== 'chat' && view !== 'loading' && (
        <Navbar
          lang={lang}
          setLang={setLang}
          onStart={startChat}
          currentPath={location.pathname}
          goHome={goHome}
          goUniversities={goUniversities}
          goAbout={goAbout}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            view === 'results' ? (
              <Results lang={lang} answers={answers} onRestart={restart} />
            ) : view === 'loading' ? (
              <LoadingAnimation lang={lang} onComplete={handleLoadingDone} />
            ) : view === 'chat' ? (
              <ChatFlow lang={lang} onComplete={handleComplete} onSkip={() => handleComplete({})} />
            ) : (
              <div className="relative z-10">
                <Hero lang={lang} onStart={startChat} />
                <HowItWorks lang={lang} />
                <Features lang={lang} />
                <div id="universities"><UniversitiesExplorer lang={lang} /></div>
                <Footer lang={lang} />
              </div>
            )
          }
        />
        <Route
          path="/universities"
          element={
            <UniversitiesPage lang={lang} onStart={startChat} />
          }
        />
        <Route
          path="/about"
          element={
            <AboutPage lang={lang} onStart={startChat} />
          }
        />
        <Route
          path="/chat"
          element={
            view === 'chat' ? (
              <ChatFlow lang={lang} onComplete={handleComplete} onSkip={() => handleComplete({})} />
            ) : (
              <div className="relative z-10 min-h-screen pt-32 pb-20 text-center">
                <p className="text-primary text-2xl">{lang === 'ar' ? 'جارٍ التحميل...' : 'Loading...'}</p>
              </div>
            )
          }
        />
        <Route
          path="/loading"
          element={<LoadingAnimation lang={lang} onComplete={handleLoadingDone} />}
        />
        <Route
          path="/results"
          element={<Results lang={lang} answers={answers} onRestart={restart} />}
        />
        <Route path="*" element={<div className="relative z-10 pt-32 text-center"><h1 className="text-4xl font-bold text-primary">404</h1></div>} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
