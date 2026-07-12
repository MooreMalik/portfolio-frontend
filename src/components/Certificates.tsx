import React from 'react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';

export default function Certificates() {
  const { data, loading } = useData();
  const certificates = data?.certificates;

  return (
    <section className="py-24 px-6 min-h-[calc(100vh-160px)] relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-zinc-100">Certificates</h2>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-white/10"></div>
          </div>

          {loading ? (
             <div className="animate-pulse grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="h-64 bg-zinc-200 dark:bg-white/5 rounded-xl"></div>
               <div className="h-64 bg-zinc-200 dark:bg-white/5 rounded-xl"></div>
               <div className="h-64 bg-zinc-200 dark:bg-white/5 rounded-xl"></div>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates?.map((cert) => (
                <div key={cert.id} className="group relative overflow-hidden rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-midnight/40 backdrop-blur-md hover:border-indigo-500/50 dark:hover:border-icy-cyan/50 transition-colors shadow-sm dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
                  <div className="aspect-video w-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-midnight/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 relative z-20 bg-white/90 dark:bg-transparent">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">{cert.title}</h3>
                    <div className="flex items-center justify-between font-mono text-xs text-zinc-500">
                      <span>{cert.issuer}</span>
                      <span className="text-indigo-600 dark:text-icy-cyan">{cert.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
