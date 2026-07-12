import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useData } from './context/DataContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Blog from './components/Blog';
import PersonalAI from './components/PersonalAI';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './admin/frontend/pages/AdminPanel';
import RainBackground from './components/RainBackground';

function ScrollToTop() {
  const { pathname } = useLocation();
  const { loading } = useData();

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }, 50);
    }
  }, [pathname, loading]);
  
  return null;
}

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const { takingLongTime } = useData();

  if (isAdmin) {
    return (
      <main className="min-h-screen w-full bg-[#0a0a0a] text-zinc-100 relative">
        {takingLongTime && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-amber-600 text-white text-xs px-4 py-2 rounded-full font-medium shadow-lg animate-pulse flex items-center gap-2">
            <span>⚠️</span> Server uyg'onmoqda, biroz kuting (bepul tarif)...
          </div>
        )}
        {children}
      </main>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative z-0">
      <RainBackground />
      {takingLongTime && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-indigo-600 text-white text-xs px-4 py-2 rounded-full font-medium shadow-lg animate-pulse flex items-center gap-2">
          <span>⚡</span> Server uyg'onmoqda, biroz kuting (Render bepul tarifi)...
        </div>
      )}
      <Navbar />
      <main className="flex-grow pt-24">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Certificates />
      <Blog />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/ai" element={<PersonalAI />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Layout>
    </Router>
  );
}
