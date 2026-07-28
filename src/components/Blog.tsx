import React from 'react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { ArrowRight, Send } from 'lucide-react';

export default function Blog() {
  const { data, loading } = useData();

  // Combine manual blogs + visible Telegram posts, sorted by date desc
  const manualBlogs: any[] = (data?.blogs || []).map((b: any) => ({ ...b, _source: 'manual' }));
  const telegramPosts: any[] = (data?.telegramPosts || [])
    .filter((p: any) => !p.hidden)
    .map((p: any) => ({ ...p, _source: 'telegram' }));

  const allPosts = [...manualBlogs, ...telegramPosts].sort((a, b) => {
    const da = a.date ? new Date(a.date).getTime() : 0;
    const db = b.date ? new Date(b.date).getTime() : 0;
    return db - da;
  });

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString('uz-UZ', {
        year: 'numeric', month: 'long', day: 'numeric',
      });
    } catch {
      return iso;
    }
  };

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
            <div className="flex-1 h-px bg-zinc-200 dark:bg-white/10" />
          </div>

          {loading ? (
            <div className="animate-pulse space-y-6">
              {[1, 2].map(i => (
                <div key={i} className="h-32 bg-zinc-200 dark:bg-white/5 rounded-xl" />
              ))}
            </div>
          ) : allPosts.length === 0 ? (
            <div className="text-center py-16">
              <Send size={40} className="mx-auto mb-3 text-zinc-400 dark:text-zinc-600" />
              <p className="text-zinc-500 dark:text-zinc-500">Hozircha maqolalar yo'q.</p>
              <p className="text-zinc-400 dark:text-zinc-600 text-sm mt-1">
                Telegram kanaldan postlar avtomatik ko'rinadi.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {allPosts.map((post: any) => {
                const isTelegram = post._source === 'telegram';
                const title = post.editedTitle || post.title || (post.text?.split('\n')[0]?.slice(0, 80)) || 'Telegram Post';
                const excerpt = post.editedText || post.excerpt || post.text || '';
                const date = formatDate(post.date);
                const href = isTelegram ? (post.channelUrl || '#') : '#';

                return (
                  <motion.a
                    key={post.id}
                    href={href}
                    target={isTelegram ? '_blank' : '_self'}
                    rel={isTelegram ? 'noreferrer' : undefined}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="block p-6 border border-zinc-200 dark:border-white/10 rounded-xl bg-white dark:bg-midnight/40 backdrop-blur-md hover:border-indigo-500/50 dark:hover:border-icy-cyan/50 transition-all shadow-sm dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)] group hover:-translate-y-0.5"
                  >
                    <div className="flex gap-4 items-start">
                      {/* Telegram media thumbnail */}
                      {isTelegram && post.mediaUrl && (
                        <img
                          src={post.mediaUrl}
                          alt=""
                          className="w-20 h-20 rounded-lg object-cover shrink-0 opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                      )}

                      <div className="flex-1 min-w-0">
                        {/* Meta row */}
                        <div className="flex items-center gap-3 text-xs font-mono text-zinc-500 mb-2">
                          {isTelegram ? (
                            <span className="flex items-center gap-1 text-[#2AABEE]">
                              <Send size={11} />
                              Telegram
                            </span>
                          ) : (
                            <span className="text-indigo-600 dark:text-icy-cyan">Blog</span>
                          )}
                          <span>•</span>
                          <span>{date}</span>
                          {!isTelegram && post.readTime && (
                            <><span>•</span><span>{post.readTime}</span></>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1.5 group-hover:text-indigo-600 dark:group-hover:text-icy-cyan transition-colors line-clamp-2">
                          {title}
                        </h3>

                        {/* Excerpt */}
                        {excerpt && (
                          <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-2">
                            {excerpt !== title ? excerpt : ''}
                          </p>
                        )}
                      </div>

                      {/* Arrow */}
                      <div className="text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-icy-cyan transition-transform transform group-hover:translate-x-1 shrink-0 mt-1">
                        <ArrowRight size={20} />
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
