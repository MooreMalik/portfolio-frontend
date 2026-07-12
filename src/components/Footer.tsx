import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';

export default function Footer() {
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();
  const { data } = useData();

  const handleAdminClick = () => {
    const newCount = clickCount + 1;
    if (newCount >= 3) {
      setClickCount(0);
      navigate('/admin');
    } else {
      setClickCount(newCount);
    }
  };

  return (
    <footer className="py-8 px-6 border-t border-zinc-200 dark:border-zinc-800/10 bg-zinc-50 dark:bg-[#050505]">
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center gap-4">
        <div 
          onClick={handleAdminClick}
          className="text-center cursor-pointer select-none"
        >
          <div className="font-bold text-zinc-800 dark:text-zinc-300">
            {data?.footer?.name || "Ilhomjon"}
          </div>
          <div className="text-sm font-mono text-zinc-500 mt-1">
            {data?.footer?.title || "AI Engineer & Developer"}
          </div>
        </div>
      </div>
    </footer>
  );
}
