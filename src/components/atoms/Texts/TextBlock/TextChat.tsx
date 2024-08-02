'use client';
import React, { useRef } from 'react';
import '../minecraftText.css';
import { toast } from 'react-toastify';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const TextChat: React.FC<Props> = ({ children, className }) => {
  const preRef = useRef<HTMLPreElement>(null);

  const playClickSound = () => {
    const audio = new Audio('/sound/minecraft-villager.mp3');
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
      const text = preRef.current.textContent || '';
      navigator.clipboard.writeText(text).then(() => {
        toast.info('Code copie !');
      }).catch(err => {
        toast.error('Failed to copy text: ', err);
      });
    }
  };

  return (
    <div className={`relative flex flex-col w-full flex-wrap minecraftText px-4 py-2 border-none bg-black bg-opacity-60 ${className}`}>
      <pre ref={preRef} className='minecraftText w-full whitespace-pre-wrap overflow-x-auto'>{children}</pre>
      <button
        onClick={handleCopy}
        className='MinecraftButton absolute top-1 right-0 px-2 py-1 bg-deepslate text-white opacity-20 lg:opacity-50 hover:opacity-100 transition-opacity duration-200'
      >
        Copier
      </button>
    </div>
  );
};

export default TextChat;
