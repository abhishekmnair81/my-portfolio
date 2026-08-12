import React, { useState, useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%!&*<>/\\[]{}';

export default function DecryptedText({ text, className = '', speed = 35, useHover = false, autoPlay = true }) {
  const [displayText, setDisplayText] = useState(useHover ? text : '');
  const [isDecrypting, setIsDecrypting] = useState(false);
  const intervalRef = useRef(null);
  const iterationsRef = useRef(0);
  const hasPlayedRef = useRef(false);

  const startDecrypt = () => {
    if (isDecrypting) return;
    setIsDecrypting(true);
    iterationsRef.current = 0;

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, idx) => {
            if (char === ' ') return ' ';
            if (idx < iterationsRef.current) return text[idx];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');
      });

      iterationsRef.current += 0.5;

      if (iterationsRef.current >= text.length) {
        clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsDecrypting(false);
      }
    }, speed);
  };

  // Auto-play on mount
  useEffect(() => {
    if (autoPlay && !useHover && !hasPlayedRef.current) {
      hasPlayedRef.current = true;
      const delay = setTimeout(() => startDecrypt(), 100);
      return () => clearTimeout(delay);
    }
    if (useHover) {
      setDisplayText(text);
    }
  }, []);

  // Update if text prop changes
  useEffect(() => {
    if (useHover) setDisplayText(text);
  }, [text]);

  return (
    <span
      className={`${className} select-none font-code tracking-wider`}
      onMouseEnter={() => { if (useHover) startDecrypt(); }}
    >
      {displayText || text}
    </span>
  );
}
