import React from 'react';

export default function DecryptedText({ text, className = "" }) {
  return (
    <span className={`${className} select-none`}>
      {text}
    </span>
  );
}
