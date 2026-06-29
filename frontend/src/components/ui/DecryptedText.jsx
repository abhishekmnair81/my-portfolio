import React, { useState, useEffect } from 'react';

export default function DecryptedText({ text, speed = 30, className = "" }) {
  const [display, setDisplay] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!_+=-";

  useEffect(() => {
    if (!isHovered) {
      setDisplay(text);
      return;
    }

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
  }, [isHovered, text, speed]);

  return (
    <span 
      className={`${className} cursor-pointer transition-all duration-200`} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {display}
    </span>
  );
}
