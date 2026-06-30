import React, { useEffect, useRef } from 'react';

export default function NeuralGrid({ enabled = true }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, radius: 150 });

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const nodeTags = [
      'SYS_CORE_A', 'NET_LINK_B', 'DATA_STREAM', 'PORT_8080', 
      'HOLO_SYNC', 'FIREWALL', 'DNS_SECURE', 'MEM_CACHE', 
      'CPU_THREAD_4', 'DB_NODE_3', 'ROUTER_09', 'GATEWAY_WAN'
    ];

    // Particle class
    class Particle {
      constructor(width, height, index) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 1.5 + 0.8;
        this.tag = index % 8 === 0 ? nodeTags[Math.floor(index / 8) % nodeTags.length] : null;
      }

      update(width, height) {
        this.x += this.vx;
        this.y += this.vy;

        // Boundary checks
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw(cContext, color) {
        cContext.beginPath();
        cContext.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        cContext.fillStyle = color;
        cContext.fill();

        if (this.tag) {
          cContext.fillStyle = color.slice(0, 7) + '44'; // Translucent tag text
          cContext.font = '7px "JetBrains Mono", monospace';
          cContext.fillText(this.tag, this.x + 8, this.y + 3);
        }
      }
    }

    const particles = Array.from({ length: 75 }, (_, idx) => new Particle(canvas.width, canvas.height, idx));

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Get color dynamically from CSS custom property
      const themeColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-cyan')
        .trim() || '#00f3ff';

      const mouse = mouseRef.current;
      const connectionDist = 120;

      // Update and draw particles
      particles.forEach((p) => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx, themeColor + '88'); // 50% opacity
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Check connection to mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            // Attraction force
            const force = (mouse.radius - dist) / mouse.radius;
            p1.x -= dx * force * 0.02;
            p1.y -= dy * force * 0.02;

            // Draw line to mouse
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = themeColor + Math.floor(force * 50).toString(16).padStart(2, '0');
            ctx.lineWidth = force * 0.8;
            ctx.stroke();
          }
        }

        // Check connection to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = (connectionDist - dist) / connectionDist;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = themeColor + Math.floor(alpha * 24).toString(16).padStart(2, '0');
            ctx.lineWidth = alpha * 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1] opacity-55"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
