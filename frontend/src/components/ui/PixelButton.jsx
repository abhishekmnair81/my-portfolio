import React from 'react';
import { playClickSound } from '../../utils/sound';

export default function PixelButton({ 
  children, 
  variant = 'primary', 
  onClick, 
  href, 
  download,
  type = 'button',
  className = '',
  disabled = false
}) {
  const baseClass = variant === 'primary' ? 'mc-btn' : 'mc-btn-secondary';
  
  const handleClick = (e) => {
    playClickSound();
    if (onClick) onClick(e);
  };

  if (href) {
    const isAnchor = href.startsWith('#');
    return (
      <a 
        href={href} 
        download={download}
        onClick={handleClick}
        className={`${baseClass} ${className}`}
        target={isAnchor ? undefined : '_blank'}
        rel={isAnchor ? undefined : 'noopener noreferrer'}
      >
        {children}
      </a>
    );
  }

  return (
    <button 
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`${baseClass} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}
