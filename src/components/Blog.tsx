import React from 'react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { ArrowRight } from 'lucide-react';

export default function Blog() {
  const { data, loading } = useData();
  const blogs = data?.blogs;

  return (
    <section className="py-24 px-6 bg-zinc-50 dark:bg-transparent min-h-[calc(100vh-160px)] relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-zinc-100">Latest Writings</h2>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-white/10"></div>
          </div>

          {loading ? (
             <div className="animate-pulse space-y-6">
               <div className="h-32 bg-zinc-200 dark:bg-white/5 rounded-xl"></div>
               <div className="h-32 bg-zinc-200 dark:bg-white/5 rounded-xl"></div>
             </div>
          ) : (
            <div className="space-y-6">
               {blogs?.map((blog) => (
                 <a 
                   key={blog.id} 
                   href="#" 
                   className="block p-8 border border-zinc-200 dark:border-white/10 rounded-xl bg-white dark:bg-midnight/40 backdrop-blur-md hover:border-indigo-500/50 dark:hover:border-icy-cyan/50 transition-all shadow-sm dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)] group hover:-translate-y-1"
                 >
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                     <div>
                       <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 mb-3">
                         <span className="text-indigo-600 dark:text-icy-cyan">{blog.date}</span>
                         <span>•</span>
                         <span>{blog.readTime}</span>
                       </div>
                       <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-indigo-600 dark:group-hover:text-icy-cyan transition-colors">
                         {blog.title}
                       </h3>
                       <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                         {blog.excerpt}
                       </p>
                     </div>
                     <div className="text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-icy-cyan transition-transform transform group-hover:translate-x-2 shrink-0">
                       <ArrowRight size={24} />
                     </div>
                   </div>
                 </a>
               ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
