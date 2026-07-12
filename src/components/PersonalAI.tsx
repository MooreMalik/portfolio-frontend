import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import Markdown from 'react-markdown';

export default function PersonalAI() {
  const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([
    { role: 'ai', text: 'Hi there! I am the personal AI assistant for Ilhomjon. I know all about his skills, projects, and layout. What would you like to know?' }
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
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);

      setMessages(prev => [...prev, { role: 'ai', text: data.text }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'ai', text: `Error: ${err.message}. Please verify the backend and Gemini API Key are configured.` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 min-h-[calc(100vh-160px)]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-3">
              <Sparkles className="text-indigo-600 dark:text-indigo-500" />
              Personal AI
            </h2>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800"></div>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">Chat with my AI assistant to learn more about my background and experience.</p>

          <div className="bg-zinc-50 dark:bg-[#121212] border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden flex flex-col h-[600px] shadow-sm dark:shadow-none">
            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-4 \${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 \${
                    msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                  }`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl px-5 py-3 \${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-sm' 
                      : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-tl-sm'
                  }`}>
                    {msg.role === 'user' ? (
                      msg.text
                    ) : (
                      <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-a:text-indigo-500">
                        <Markdown>{msg.text}</Markdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                    <Bot size={16} className="text-zinc-500" />
                  </div>
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl rounded-tl-sm px-5 py-4 flex items-center gap-1">
                    <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
              <form onSubmit={handleSubmit} className="relative flex items-center">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about my experience..."
                  className="w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-shadow"
                  disabled={loading}
                />
                <button 
                  type="submit" 
                  disabled={!input.trim() || loading}
                  className="absolute right-2 p-2 text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-50 disabled:hover:text-zinc-400 transition-colors"
                >
                  <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
