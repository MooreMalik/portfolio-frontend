import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, Folder } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Projects() {
  const { data, loading } = useData();
  const projects = data?.projects;
  const error = null;

  return (
    <section className="py-24 px-6 bg-zinc-50 dark:bg-transparent">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-zinc-100">Some Things I've Built</h2>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-white/10"></div>
          </div>
          
          {loading && <p className="text-zinc-500">Loading projects...</p>}
          {error && <p className="text-red-500">Failed to load projects</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects?.map((project, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-midnight/40 backdrop-blur-md border border-zinc-200 dark:border-white/10 rounded-xl p-6 flex flex-col h-full hover:border-zinc-300 dark:hover:border-icy-cyan/50 transition-colors group shadow-sm dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
              >
                <div className="flex justify-between items-center mb-6 text-zinc-500 dark:text-zinc-400">
                  <Folder size={32} className="text-indigo-600 dark:text-icy-cyan" />
                  <div className="flex gap-3">
                    <a href={project.github} className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                      <Github size={20} />
                    </a>
                    <a href={project.link} className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-indigo-600 dark:group-hover:text-icy-cyan transition-colors break-words">
                  {project.title}
                </h3>
                
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed flex-1 mb-6 break-words whitespace-pre-wrap">
                  {project.description}
                </p>
                
                <ul className="flex flex-wrap gap-3 font-mono text-xs text-zinc-500 dark:text-zinc-500 mt-auto">
                  {project.tech.map((tech: string, i: number) => (
                    <li key={i}>{tech}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
