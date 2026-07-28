import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useData } from '../context/DataContext';
import { FileText, ExternalLink } from 'lucide-react';

export default function Certificates() {
  const { data, loading } = useData();
  const certificates = data?.certificates || [];
  const [pdfModal, setPdfModal] = useState<{ url: string; title: string } | null>(null);

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
            <div className="flex-1 h-px bg-zinc-200 dark:bg-white/10" />
          </div>

          {loading ? (
            <div className="animate-pulse grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-64 bg-zinc-200 dark:bg-white/5 rounded-xl" />
              ))}
            </div>
          ) : certificates.length === 0 ? (
            <div className="text-center py-16">
              <FileText size={40} className="mx-auto mb-3 text-zinc-400 dark:text-zinc-600" />
              <p className="text-zinc-500 dark:text-zinc-500">Hozircha sertifikatlar qo'shilmagan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert: any) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group relative overflow-hidden rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-midnight/40 backdrop-blur-md hover:border-indigo-500/50 dark:hover:border-icy-cyan/50 transition-colors shadow-sm dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
                >
                  {/* Image */}
                  <div className="aspect-video w-full overflow-hidden relative bg-zinc-100 dark:bg-zinc-900">
                    <div className="absolute inset-0 bg-midnight/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                    {cert.image ? (
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FileText size={40} className="text-zinc-300 dark:text-zinc-700" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-5 relative z-20 bg-white/90 dark:bg-transparent">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-1 leading-tight">
                      {cert.title}
                    </h3>
                    <div className="flex items-center justify-between font-mono text-xs text-zinc-500 mb-3">
                      <span>{cert.issuer}</span>
                      <span className="text-indigo-600 dark:text-icy-cyan">{cert.date}</span>
                    </div>

                    {/* PDF button */}
                    {cert.pdfUrl && (
                      <button
                        onClick={() => setPdfModal({ url: cert.pdfUrl, title: cert.title })}
                        className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium transition-colors border border-red-500/20 hover:border-red-500/40"
                      >
                        <FileText size={13} />
                        PDF ko'rish
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* PDF Modal */}
      {pdfModal && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center p-4"
          onClick={e => e.target === e.currentTarget && setPdfModal(null)}
        >
          <div className="bg-white dark:bg-[#111] rounded-xl overflow-hidden w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl border border-zinc-200 dark:border-zinc-800">
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-red-500" />
                <span className="font-medium text-zinc-900 dark:text-zinc-100 text-sm truncate max-w-sm">
                  {pdfModal.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={pdfModal.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs rounded-lg transition-colors"
                >
                  <ExternalLink size={12} /> Yangi tabda ochish
                </a>
                <button
                  onClick={() => setPdfModal(null)}
                  className="p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors text-sm font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* PDF iframe */}
            <iframe
              src={`${pdfModal.url}#toolbar=1&navpanes=0`}
              className="flex-1 w-full"
              title={pdfModal.title}
            />
          </div>
        </div>
      )}
    </section>
  );
}
