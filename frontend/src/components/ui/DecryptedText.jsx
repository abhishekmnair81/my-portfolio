import React, { useState, useEffect, useRef } from 'react';

export default function DecryptedText({ 
  text, 
  speed = 30, 
  className = "", 
  useHover = true, 
  animateOnView = true 
}) {
  const [display, setDisplay] = useState(text);
  const [triggerCount, setTriggerCount] = useState(0);
  const elementRef = useRef(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!_+=-";

  // Trigger scramble resolution
  const triggerScramble = () => {
    setTriggerCount(prev => prev + 1);
  };

  // Scramble and resolve text whenever triggerCount changes
  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, index) => {
            if (index < iterations) {
              return text[index];
            }
            if (char === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iterations >= text.length) {
        clearInterval(interval);
      }
      iterations += 0.5; // Controls resolution speed
    }, speed);

    return () => clearInterval(interval);
  }, [triggerCount, text, speed]);

  // Trigger once on view entrance
  useEffect(() => {
    if (!animateOnView || !elementRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          triggerScramble();
          // Unobserve after triggering once to prevent infinite loops on scrolling
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [text, animateOnView]);

  return (
    <span 
      ref={elementRef}
      className={`${className} cursor-pointer select-none transition-all duration-200`} 
      onMouseEnter={() => { if (useHover) triggerScramble(); }}
      onClick={triggerScramble}
    >
      {display}
    </span>
  );
}

