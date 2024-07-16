'use client'
import React from 'react';
import '../minecraftText.css';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const TextChat: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={`inline-block minecraftText px-4 py-2 border-none bg-black bg-opacity-60 ${className}`} >
      {children}
    </div>
  );
};

export default TextChat;
