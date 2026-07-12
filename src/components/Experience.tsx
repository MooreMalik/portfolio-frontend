import React from 'react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';

export default function Experience() {
  const { data, loading } = useData();
  const experience = data?.experience;

  return (
    <section className="py-24 px-6 bg-zinc-50 dark:bg-transparent relative z-10">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-zinc-100">Where I've Worked</h2>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-white/10"></div>
          </div>

          {loading ? (
             <div className="animate-pulse space-y-8">
               <div className="h-24 bg-zinc-200 dark:bg-white/5 rounded"></div>
               <div className="h-24 bg-zinc-200 dark:bg-white/5 rounded"></div>
             </div>
          ) : (
            <div className="space-y-12">
              {experience?.map((exp, index) => (
                <div key={index} className="relative pl-8 border-l border-zinc-200 dark:border-white/10">
                  <div className="absolute w-4 h-4 bg-white dark:bg-[#050914] border-2 border-indigo-600 dark:border-icy-cyan rounded-full -left-[9px] top-1 shadow-[0_0_8px_rgba(34,211,238,0.4)]"></div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{exp.role}</h3>
                  <p className="font-mono text-indigo-600 dark:text-icy-cyan text-sm mb-4">
                    {exp.company} <span className="text-zinc-400 mx-2">•</span> {exp.period}
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed bg-white/50 dark:bg-midnight/30 backdrop-blur-md p-6 rounded-xl border border-zinc-200 dark:border-white/5 shadow-sm dark:shadow-none">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
