import React from 'react';
import './minecraftText.css';

type MinecraftTextProps = {
  children: React.ReactNode;
  className?: string;
  size?: string;
};

const MinecraftText: React.FC<MinecraftTextProps> = ({ children, className,size = 'text-xl' }) => {
  return (
    <p className={`minecraft-text px-4 py-2 ${size} minecraftTextBlock ${className}`}>{children}</p>
  );
};

export default MinecraftText;
