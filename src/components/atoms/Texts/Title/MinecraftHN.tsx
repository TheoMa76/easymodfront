'use client'
import React from 'react';
import '../minecraftText.css';

interface MinecraftHNProps {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
  className?: string;
}

const classMap: { [key: string]: string } = {
  h1: 'text-3xl minecraftText text-white',
  h2: 'text-2xl minecraftText text-white',
  h3: 'text-2xl minecraftText text-white',
  h4: 'text-xl minecraftText text-white',
  h5: 'text-large minecraftText text-white',
  h6: 'text-base minecraftText text-white',
};

const MinecraftHN: React.FC<MinecraftHNProps> = ({ as: Tag, className, children }) => {
  const classNameBase = classMap[Tag];
  
  return (
    <Tag className={`${classNameBase} ${className}`}>
      {children}
    </Tag>
  );
}

export default MinecraftHN;
