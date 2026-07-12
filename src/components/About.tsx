import React from 'react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const { data, loading } = useData();
  const about = data?.about;

  return (
    <section id="about" className="py-24 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-zinc-100">About Me</h2>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-white/10"></div>
          </div>
          
          {loading ? (
             <div className="animate-pulse space-y-4">
                <div className="h-4 bg-zinc-200 dark:bg-white/5 rounded w-full"></div>
                <div className="h-4 bg-zinc-200 dark:bg-white/5 rounded w-full"></div>
                <div className="h-4 bg-zinc-200 dark:bg-white/5 rounded w-3/4"></div>
             </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg flex flex-col justify-between">
                <div>
                  <p className="mb-4">
                    Hello! My name is {about?.name?.split(' ')[0] || 'Ilxomjon'} and I enjoy creating things that live on the internet. My interest in web development started back in 2018 when I decided to try editing custom Tumblr themes — turns out hacking together HTML & CSS taught me a lot about about layout and design!
                  </p>
                  <p className="mb-4">
                    Fast-forward to today, and I've had the privilege of working at an advertising agency, a start-up, a huge corporation, and a student-led design studio. 
                  </p>
                  <p className="mb-8">
                    My main focus these days is building accessible, inclusive products and digital experiences for a variety of clients.
                  </p>
                </div>
                
                <a 
                  href={about?.resumeUrl || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-charcoal text-zinc-100 dark:bg-white/10 dark:hover:bg-white/20 dark:text-zinc-100 font-medium rounded-lg transition-colors border border-transparent dark:border-white/10 w-max backdrop-blur-md"
                >
                  <FileText size={18} />
                  View Full Resume
                </a>
              </div>
              
              <div>
                <h3 className="font-mono text-zinc-700 dark:text-zinc-300 mb-6 flex items-center gap-2">
                  <span className="text-indigo-600 dark:text-icy-cyan">{'/*'}</span>
                  Here are a few technologies I've been working with recently
                  <span className="text-indigo-600 dark:text-icy-cyan">{'*/'}</span>
                </h3>
                <ul className="grid grid-cols-2 gap-3 font-mono text-sm border border-zinc-200 dark:border-white/10 p-6 rounded-xl bg-white dark:bg-midnight/40 backdrop-blur-md shadow-sm dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
                  {about?.skills?.map((skill: string, index: number) => (
                    <li key={index} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                      <span className="text-indigo-600 dark:text-icy-cyan">▹</span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
