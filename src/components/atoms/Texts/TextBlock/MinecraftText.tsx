import React from 'react';
import './minecraftText.css';

type MinecraftTextProps = {
  text: string;
  className?: string;
};

const MinecraftText: React.FC<MinecraftTextProps> = ({ text, className }) => {
  return (
    <div className="bg-deepslate p-4">
      <p className={`minecraft-text text-white text-xl minecraftTextBlock ${className}`}>{text}</p>
    </div>
  );
};

export default MinecraftText;
