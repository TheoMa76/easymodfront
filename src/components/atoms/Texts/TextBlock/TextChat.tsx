'use client';
import React, { useRef } from 'react';
import '../minecraftText.css';
import {toast} from 'react-toastify';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const TextChat: React.FC<Props> = ({ children, className }) => {
  const preRef = useRef<HTMLPreElement>(null);

  const playClickSound = () => {
    const audio = new Audio('/sound/glass-break.mp3');
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    } else {
      console.error("Audio element not found");
    }
  }

  const handleCopy = () => {
    playClickSound();
    if (preRef.current) {
      // Get the text content from the <pre> element
      const text = preRef.current.textContent || '';
      // Use the Clipboard API to copy the text
      navigator.clipboard.writeText(text).then(() => {
        toast.info('Code copié !');
      }).catch(err => {
        toast.error('Failed to copy text: ', err);
      });
    }
  };

  return (
    <div className={`relative flex flex-col flex-wrap minecraftText px-4 py-2 border-none bg-black bg-opacity-60 ${className}`}>
      <pre ref={preRef} className='minecraftText w-full whitespace-pre-wrap overflow-x-auto'>{children}</pre>
      <button
        onClick={handleCopy}
        className='MinecraftButton absolute top-2 right-2 bg-deepslate text-white px-2 py-1'
      >
        Copier
      </button>
    </div>
  );
};

export default TextChat;
