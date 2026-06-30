import React, { useEffect, useRef } from 'react';

export default function MatrixOverlay() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationId;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    
    const hexChars = '0123456789ABCDEFabcdef/*-+[]{}<>';
    const fontSize = 11;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);
    
    const draw = () => {
      // Very faint black trailing effect
      ctx.fillStyle = 'rgba(7, 8, 11, 0.16)';
      ctx.fillRect(0, 0, width, height);
      
      // Get current theme color from root variable
      const themeColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-cyan')
        .trim() || '#00f3ff';
        
      ctx.fillStyle = themeColor;
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const char = hexChars[Math.floor(Math.random() * hexChars.length)];
        
        // Staggered opacity for trails
        const opacity = Math.random() > 0.4 ? '18' : '33';
        ctx.fillStyle = themeColor + opacity;
        
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > height && Math.random() > 0.982) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      
      animationId = requestAnimationFrame(draw);
    };
    
    draw();
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-30"
      style={{ mixBlendMode: 'screen', opacity: 0.7 }}
    />
  );
}
