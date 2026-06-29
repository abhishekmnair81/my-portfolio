import { useState, useEffect } from 'react';

export default function useTypewriter(words, typeSpeed = 100, eraseSpeed = 50, delay = 1500) {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timer;

    if (!isDeleting && currentText === currentWord) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, delay);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    } else {
      timer = setTimeout(() => {
        const nextText = isDeleting
          ? currentWord.substring(0, currentText.length - 1)
          : currentWord.substring(0, currentText.length + 1);
        setCurrentText(nextText);
      }, isDeleting ? eraseSpeed : typeSpeed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, words, typeSpeed, eraseSpeed, delay]);

  return currentText;
}
