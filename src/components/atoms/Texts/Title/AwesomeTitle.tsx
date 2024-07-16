'use client'
import React from 'react';
import './awesometitle.css';
import MinecraftHN from './MinecraftHN';

interface MinecraftHNProps {
  className?: string;  
  children: React.ReactNode;
  imgSrc?: string;
}

const imgSrc = '/img/EasyMod.png';

const AwesomeTitle: React.FC<MinecraftHNProps> = ({ className,children }) => {
  return (
    <div className={`relative w-fit h-1/4 ${className}`}>
      <img src={imgSrc} alt="easymod" className="w-full h-auto" />
      <MinecraftHN as='h2' className="text-yellow-300 text-xs sm:text-lg md:bottom-0 lg:bottom-3 lg:-right-10 xl:bottom-3 xl:-right-32 md:text-xl lg:text-2xl xl:text-3xl absolute bottom-0 right-0 m-2 diagonal-text breath-animation">
        {children}
      </MinecraftHN>    
      </div>
  );
}

export default AwesomeTitle;
