import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Github, Linkedin, Twitter, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Experience', href: '/experience' },
  { label: 'Projects', href: '/projects' },
  { label: 'Certificates', href: '/certificates' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/70 dark:bg-[#050914]/40 backdrop-blur-xl border-b border-zinc-200 dark:border-white/10 py-4 shadow-sm' 
          : 'bg-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link onClick={() => window.scrollTo(0, 0)} to="/" className="font-display text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-1">
          <span className="text-indigo-600 dark:text-icy-cyan opacity-80">{'//'}</span>
          Ilxomjon
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.label} 
              to={link.href}
              onClick={() => window.scrollTo(0, 0)}
              className={`text-sm font-medium transition-all duration-300 relative group ${
                location.pathname === link.href 
                  ? 'text-indigo-600 dark:text-icy-cyan' 
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-indigo-600 dark:bg-icy-cyan rounded-full transition-transform duration-300 ${
                location.pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 opacity-50'
              }`} />
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            className="p-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-white/90 dark:bg-[#050914]/90 backdrop-blur-xl border-b border-zinc-200 dark:border-white/10 p-6 flex flex-col gap-4 shadow-xl"
        >
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.label} 
              to={link.href}
              onClick={() => {
                window.scrollTo(0, 0);
                setIsMobileMenuOpen(false);
              }}
              className={`text-base font-medium transition-colors block py-2 border-b border-zinc-100 dark:border-white/5 last:border-0 ${
                location.pathname === link.href 
                  ? 'text-indigo-600 dark:text-icy-cyan' 
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      )}
    </header>
  );
}
