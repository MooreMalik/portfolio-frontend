import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Github, Linkedin, Sparkles, Send, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

export default function Hero() {
  const { data, loading } = useData();
  const about = data?.about;
  const contact = data?.contact || {
    email: "bozorovilxomjon22@gmail.com",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    instagram: "https://instagram.com/",
    telegram: "https://t.me/"
  };

  return (
    <section id="hero" className="min-h-[calc(100vh-100px)] flex flex-col md:flex-row items-center justify-center px-6 relative overflow-hidden gap-12 md:gap-24 w-full max-w-7xl mx-auto py-20">
      
      {/* Background decorations - subtle atmospheric glows instead of solid blobs */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-icy-cyan/5 dark:bg-icy-cyan/5 rounded-full blur-[120px] -z-[1] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-deep-teal/10 dark:bg-deep-teal/10 rounded-full blur-[100px] -z-[1] pointer-events-none mix-blend-screen" />

      {loading ? (
        <div className="w-full flex justify-center">
          <div className="animate-pulse flex flex-col items-center gap-6 w-full max-w-2xl">
             <div className="h-40 w-40 bg-zinc-200 dark:bg-white/5 rounded-full"></div>
             <div className="h-10 bg-zinc-200 dark:bg-white/5 rounded w-3/4"></div>
             <div className="h-6 bg-zinc-200 dark:bg-white/5 rounded w-1/2"></div>
          </div>
        </div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col order-2 md:order-1 items-center md:items-start text-center md:text-left z-10"
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 dark:bg-midnight/40 backdrop-blur-md border border-zinc-200/50 dark:border-white/10 mb-8 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-icy-cyan animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.6)]"></span>
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300 font-mono tracking-tight">System Online / Ready for impact</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-zinc-900 dark:text-white mb-6 leading-[1.1]">
              Hello, I'm <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-icy-cyan to-blue-400 drop-shadow-sm">
                {about?.name || "Ilxomjon"}
              </span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-zinc-600 dark:text-zinc-300 mb-6 font-sans">
              {about?.role || "Data / Python Student"}
            </h2>
            
            <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mb-10 leading-relaxed font-sans">
              {about?.bio || "I build digital experiences that combine functional excellence with beautiful aesthetics."}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link 
                to="/projects" 
                className="w-full sm:w-auto px-8 py-4 bg-charcoal text-white dark:bg-white dark:text-charcoal font-semibold rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xl shadow-zinc-900/10 dark:shadow-white/10"
              >
                View my work
                <ArrowRight size={18} />
              </Link>

              <Link 
                to="/contact" 
                className="w-full sm:w-auto px-8 py-4 bg-white/50 dark:bg-midnight/40 backdrop-blur-md text-zinc-900 dark:text-zinc-100 border border-zinc-200/50 dark:border-white/10 font-semibold rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Sparkles size={18} className="text-electric-blue dark:text-icy-cyan" />
                Ask AI about me
              </Link>
              
              <div className="flex items-center justify-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/50 dark:bg-midnight/40 backdrop-blur-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 dark:hover:bg-white/5 rounded-2xl transition-all border border-zinc-200/50 dark:border-white/10 shadow-sm hover:shadow-md">
                  <Github size={20} />
                </a>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/50 dark:bg-midnight/40 backdrop-blur-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 dark:hover:bg-white/5 rounded-2xl transition-all border border-zinc-200/50 dark:border-white/10 shadow-sm hover:shadow-md">
                  <Linkedin size={20} />
                </a>
                <a href={contact.telegram} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/50 dark:bg-midnight/40 backdrop-blur-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 dark:hover:bg-white/5 rounded-2xl transition-all border border-zinc-200/50 dark:border-white/10 shadow-sm hover:shadow-md">
                  <Send size={20} className="-rotate-45 ml-1" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex-1 order-1 md:order-2 flex justify-center md:justify-end w-full relative"
          >
            <div className="relative w-64 h-64 md:w-[400px] md:h-[400px]">
              {/* Outer atmospheric glow */}
              <div className="absolute inset-0 bg-icy-cyan/10 rounded-[2rem] md:rounded-[3rem] blur-2xl transform scale-110" />
              
              {/* Glass container */}
              <div className="relative h-full w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl bg-white/50 dark:bg-midnight/40 backdrop-blur-xl border border-zinc-200/50 dark:border-white/10 group">
                <img 
                  src={about?.heroImage || "https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=2000&auto=format&fit=crop"} 
                  alt={about?.name || "Profile"} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 mix-blend-luminosity hover:mix-blend-normal"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/10 rounded-[2rem] md:rounded-[3rem] pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </section>
  );
}
