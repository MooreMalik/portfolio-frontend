import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function RainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lightningFlash, setLightningFlash] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Background falling rain
    const drops: { x: number; y: number; length: number; speed: number; opacity: number; depth: number }[] = [];
    const numDrops = window.innerWidth > 768 ? 200 : 100;
    
    for (let i = 0; i < numDrops; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 25 + 15, // Longer
        speed: Math.random() * 8 + 6, // Faster falling
        opacity: Math.random() * 0.2 + 0.05,
        depth: Math.random() // 0 is far, 1 is close
      });
    }

    // Drops sliding on glass
    const glassDrops: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];
    const numGlassDrops = window.innerWidth > 768 ? 80 : 40;
    for (let i = 0; i < numGlassDrops; i++) {
      glassDrops.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.1, // Slow sliding
        opacity: Math.random() * 0.6 + 0.3
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      const time = Date.now() * 0.0005;
      
      // City lights / Morning glow & fog
      ctx.save();
      ctx.filter = 'blur(80px)';
      
      if (theme === 'light') {
        // Morning sun warm gold ray
        ctx.fillStyle = 'rgba(251, 191, 36, 0.16)';
        ctx.beginPath();
        ctx.arc(width * 0.15 + Math.sin(time * 0.4) * 80, height * 0.2, 350, 0, Math.PI * 2);
        ctx.fill();

        // Fresh sky blue mist
        ctx.fillStyle = 'rgba(14, 165, 233, 0.14)';
        ctx.beginPath();
        ctx.arc(width * 0.85 + Math.cos(time * 0.3) * 120, height * 0.3, 400, 0, Math.PI * 2);
        ctx.fill();

        // Soft rosy morning light
        ctx.fillStyle = 'rgba(244, 63, 94, 0.05)';
        ctx.beginPath();
        ctx.arc(width * 0.5 + Math.sin(time * 0.2) * 50, height * 0.7, 250, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Icy cyan light
        ctx.fillStyle = 'rgba(34, 211, 238, 0.15)';
        ctx.beginPath();
        ctx.arc(width * 0.2 + Math.sin(time * 0.5) * 150, height * 0.4, 250, 0, Math.PI * 2);
        ctx.fill();

        // Deep teal/blue light
        ctx.fillStyle = 'rgba(15, 118, 110, 0.15)';
        ctx.beginPath();
        ctx.arc(width * 0.8 + Math.cos(time * 0.3) * 100, height * 0.6, 300, 0, Math.PI * 2);
        ctx.fill();

        // Amber/warm street light
        ctx.fillStyle = 'rgba(245, 158, 11, 0.08)';
        ctx.beginPath();
        ctx.arc(width * 0.5 + Math.sin(time * 0.2) * 50, height * 0.8, 200, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();

      // Draw drops sliding on glass
      ctx.save();
      for(let i=0; i<glassDrops.length; i++) {
        const drop = glassDrops[i];
        
        if (theme === 'light') {
          // Draw trail with a soft, refractive dark-tinted edge
          ctx.fillStyle = `rgba(71, 85, 105, ${drop.opacity * 0.04})`;
          ctx.beginPath();
          ctx.ellipse(drop.x, drop.y - drop.size * 2, drop.size * 0.8, drop.size * 3, 0, 0, Math.PI * 2);
          ctx.fill();

          // Draw drop body (refractive shadow/shading)
          ctx.fillStyle = `rgba(71, 85, 105, ${drop.opacity * 0.14})`;
          ctx.beginPath();
          ctx.arc(drop.x, drop.y, drop.size, 0, Math.PI * 2);
          ctx.fill();
          
          // Add a pure white reflection highlight
          ctx.fillStyle = `rgba(255, 255, 255, ${drop.opacity * 0.85})`;
          ctx.beginPath();
          ctx.arc(drop.x - drop.size*0.3, drop.y - drop.size*0.3, drop.size*0.3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw trail
          ctx.fillStyle = `rgba(255, 255, 255, ${drop.opacity * 0.1})`;
          ctx.beginPath();
          ctx.ellipse(drop.x, drop.y - drop.size * 2, drop.size * 0.8, drop.size * 3, 0, 0, Math.PI * 2);
          ctx.fill();

          // Draw drop body
          ctx.fillStyle = `rgba(255, 255, 255, ${drop.opacity * 0.5})`;
          ctx.beginPath();
          ctx.arc(drop.x, drop.y, drop.size, 0, Math.PI * 2);
          ctx.fill();
          
          // Add a tiny reflection
          ctx.fillStyle = `rgba(255, 255, 255, ${drop.opacity * 0.9})`;
          ctx.beginPath();
          ctx.arc(drop.x - drop.size*0.3, drop.y - drop.size*0.3, drop.size*0.3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Move drop
        drop.y += drop.speed;
        
        // Sometime wiggle horizontally
        if (Math.random() < 0.05) {
          drop.x += (Math.random() - 0.5) * 0.5;
        }

        // Variable speed
        if (Math.random() < 0.02) {
           drop.speed = Math.random() * 1.5 + 0.1; // Sudden slide
        } else if (drop.speed > 0.2) {
           drop.speed -= 0.02; // Slow down
        }

        if (drop.y > height + 10) {
          drop.y = -10;
          drop.x = Math.random() * width;
          drop.size = Math.random() * 3 + 1;
          drop.speed = Math.random() * 0.5 + 0.1;
        }
      }
      ctx.restore();

      // Draw moving rain
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';
      
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        
        // Closer drops are thicker and faster
        const adjustedSpeed = drop.speed * (0.5 + drop.depth * 0.5);
        const adjustedLineWidth = 1 + drop.depth * 1.5;
        ctx.lineWidth = adjustedLineWidth;

        // More opaque if closer
        if (theme === 'light') {
          ctx.strokeStyle = `rgba(71, 85, 105, ${drop.opacity * (0.15 + drop.depth * 0.2)})`; 
        } else {
          ctx.strokeStyle = `rgba(148, 163, 184, ${drop.opacity * (0.5 + drop.depth * 0.5)})`; 
        }
        
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - adjustedSpeed * 0.15, drop.y + drop.length);
        ctx.stroke();

        drop.y += adjustedSpeed;
        drop.x -= adjustedSpeed * 0.15; 
        
        if (drop.y > height) {
          drop.y = -drop.length;
          drop.x = Math.random() * width + 100; // Compensate for wind
        }
      }
      
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Lightning effect logic
    const triggerLightning = () => {
      // Small chance to strike
      if (Math.random() < 0.4) {
        setLightningFlash(Math.random() * 0.6 + 0.2); // Opacity of the flash
        
        // Secondary flash
        setTimeout(() => {
           setLightningFlash(Math.random() * 0.3 + 0.1);
        }, 100 + Math.random() * 150);

        // Turn off
        setTimeout(() => {
          setLightningFlash(0);
        }, 300 + Math.random() * 200);
      }
      
      // Schedule next check
      setTimeout(triggerLightning, 5000 + Math.random() * 15000); // Check every 5-20 seconds
    };

    const lightningTimer = setTimeout(triggerLightning, 5000);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(lightningTimer);
    };
  }, [theme]);

  return (
    <div className={`fixed inset-0 z-[-1] pointer-events-none overflow-hidden transition-colors duration-700 ${
      theme === 'light' 
        ? 'bg-gradient-to-tr from-[#f3f8fc] via-[#f7fafc] to-[#fbf8f3]' 
        : 'bg-[#050914]'
    }`}>
      {/* Base canvas */}
      <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full transition-all duration-700 ${
        theme === 'light' ? 'mix-blend-normal opacity-85' : 'mix-blend-screen'
      }`} />
      
      {/* Glass/Mist overlay for depth */}
      <div 
        className={`absolute inset-0 backdrop-blur-[4px] transition-colors duration-700 ${
          theme === 'light' ? 'bg-white/10' : 'bg-[#050914]/30'
        }`}
        style={{ 
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 100%)', 
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 100%)' 
        }}
      ></div>
      
      {/* Subtle vignette */}
      <div className={`absolute inset-0 transition-all duration-700 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${
        theme === 'light' 
          ? 'from-transparent via-white/5 to-[#e1e9f0]/45 opacity-70' 
          : 'from-transparent via-[#050914]/50 to-[#050914] opacity-90'
      }`}></div>

      {/* Lightning Flash Overlay */}
      <div 
        className="absolute inset-0 bg-white pointer-events-none mix-blend-overlay transition-opacity duration-75"
        style={{ opacity: theme === 'light' ? lightningFlash * 0.3 : lightningFlash }}
      />
      <div 
        className="absolute inset-0 bg-blue-400 pointer-events-none mix-blend-color transition-opacity duration-150"
        style={{ opacity: theme === 'light' ? lightningFlash * 0.15 : lightningFlash * 0.6 }}
      />
    </div>
  );
}
