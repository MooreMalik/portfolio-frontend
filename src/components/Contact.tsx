import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Instagram, Send, Linkedin, Bot, User, Sparkles } from 'lucide-react';
import Markdown from 'react-markdown';
import { useData } from '../context/DataContext';

export default function Contact() {
  const { data } = useData();
  const contact = data?.contact || {
    email: "bozorovilxomjon22@gmail.com",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    instagram: "https://instagram.com/",
    telegram: "https://t.me/"
  };

  const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([
    { role: 'ai', text: "Hi there! I am Ilxomjon's personal AI assistant. What would you like to know about him?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, history: messages })
      });
      const resData = await res.json();
      
      if (!res.ok) throw new Error(resData.error);

      setMessages(prev => [...prev, { role: 'ai', text: resData.text }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'ai', text: `Error: ${err.message}.` }]);
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { name: 'Email', icon: <Mail size={24} />, href: `mailto:${contact.email}`, color: 'hover:text-red-500' },
    { name: 'GitHub', icon: <Github size={24} />, href: contact.github, color: 'hover:text-zinc-600 dark:hover:text-white' },
    { name: 'LinkedIn', icon: <Linkedin size={24} />, href: contact.linkedin, color: 'hover:text-blue-500' },
    { name: 'Instagram', icon: <Instagram size={24} />, href: contact.instagram, color: 'hover:text-pink-500' },
    { name: 'Telegram', icon: <Send size={24} className="-rotate-45 ml-1" />, href: contact.telegram, color: 'hover:text-blue-400' },
  ];

  return (
    <section className="py-24 px-6 min-h-[calc(100vh-160px)] relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
              <Mail className="text-indigo-600 dark:text-icy-cyan" />
              Get In Touch
            </h2>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-white/10"></div>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl">
            Whether you have a question, want to collaborate, or just want to chat, feel free to reach out. You can also ask my AI assistant anything about my background!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Connect Directly</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-4 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-midnight/40 backdrop-blur-md transition-all ${link.color} hover:border-zinc-300 dark:hover:border-icy-cyan/50 hover:shadow-sm dark:hover:shadow-[0_4px_24px_rgba(0,0,0,0.2)] group`}
                >
                  <div className="p-3 rounded-lg bg-zinc-50 dark:bg-white/5 group-hover:scale-110 transition-transform">
                    {link.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">{link.name}</h4>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Message me</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* AI Chat */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col h-[500px] bg-white dark:bg-midnight/40 backdrop-blur-xl rounded-2xl border border-zinc-200 dark:border-white/10 overflow-hidden shadow-sm dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
          >
            <div className="p-4 border-b border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5 flex items-center gap-3">
              <Sparkles className="text-indigo-600 dark:text-icy-cyan" size={20} />
              <div>
                <h3 className="font-bold text-zinc-900 dark:text-zinc-100">Personal AI</h3>
                <p className="text-xs text-zinc-500">Ask about my experience, skills, or projects</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-icy-cyan/10 flex items-center justify-center flex-shrink-0">
                      <Bot size={16} className="text-indigo-600 dark:text-icy-cyan" />
                    </div>
                  )}
                  <div 
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.role === 'user' 
                        ? 'bg-charcoal dark:bg-icy-cyan/20 text-white dark:text-icy-cyan border dark:border-icy-cyan/30 rounded-br-none' 
                        : 'bg-zinc-100 dark:bg-white/5 text-zinc-800 dark:text-zinc-200 rounded-bl-none border dark:border-white/5'
                    }`}
                  >
                    {msg.role === 'ai' ? (
                      <div className="markdown-body prose prose-sm dark:prose-invert max-w-none">
                        <Markdown>{msg.text}</Markdown>
                      </div>
                    ) : (
                      <p>{msg.text}</p>
                    )}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                      <User size={16} className="text-zinc-600 dark:text-zinc-300" />
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-icy-cyan/10 flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-indigo-600 dark:text-icy-cyan" />
                  </div>
                  <div className="bg-zinc-100 dark:bg-white/5 border dark:border-white/5 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1">
                    <div className="w-2 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t border-zinc-200 dark:border-white/10 bg-white dark:bg-transparent">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask something..."
                  className="w-full bg-zinc-100 dark:bg-white/5 border-none text-zinc-900 dark:text-zinc-100 rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-1 focus:ring-icy-cyan/50 placeholder-zinc-500"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-zinc-400 hover:text-indigo-600 dark:hover:text-icy-cyan disabled:opacity-50 disabled:hover:text-zinc-400 transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
