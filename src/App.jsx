import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Footer from './components/Footer';
import ChatFlow from './components/ChatFlow';
import Results from './components/Results';
import LoadingAnimation from './components/LoadingAnimation';
import UniversitiesExplorer from './components/UniversitiesExplorer';
import ParticleBackground from './components/ParticleBackground';

export default function App() {
  const [lang, setLang] = useState('ar');
  const [view, setView] = useState('home'); // home | chat | loading | results
  const [answers, setAnswers] = useState(null);

  // Sync HTML lang/dir attribute with state
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const startChat = () => {
    setView('chat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleComplete = (newAnswers) => {
    setAnswers(newAnswers);
    setView('loading');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadingDone = () => {
    setView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const restart = () => {
    setAnswers(null);
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'transparent' }}>
      {/* Particles fixed behind everything */}
      <ParticleBackground />

      {view === 'home' && (
        <div className="relative z-10">
          <Navbar lang={lang} setLang={setLang} onStart={startChat} />
          <Hero lang={lang} onStart={startChat} />
          <HowItWorks lang={lang} />
          <Features lang={lang} />
          <UniversitiesExplorer lang={lang} />
          <Footer lang={lang} />
        </div>
      )}

      {view === 'chat' && (
        <div className="relative z-10 min-h-screen">
          <ChatFlow
            lang={lang}
            onComplete={handleComplete}
            onSkip={() => handleComplete({})}
          />
        </div>
      )}

      {view === 'loading' && (
        <div className="relative z-10 min-h-screen">
          <LoadingAnimation lang={lang} onComplete={handleLoadingDone} />
        </div>
      )}

      {view === 'results' && (
        <div className="relative z-10">
          <Navbar lang={lang} setLang={setLang} onStart={startChat} />
          <Results lang={lang} answers={answers} onRestart={restart} />
          <Footer lang={lang} />
        </div>
      )}
    </div>
  );
}