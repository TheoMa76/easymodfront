'use client';
import React from 'react';
import './awesometitle.css';
import MinecraftHN from './MinecraftHN';
import Image from 'next/image';

interface MinecraftHNProps {
  className?: string;
  children: React.ReactNode;
  imgSrc?: string;
}

const imgSrc = '/img/EasyMod.png';

const AwesomeTitle: React.FC<MinecraftHNProps> = ({ className, children }) => {
  return (
    <div className={`relative w-fit lg:w-full h-1/4 ${className}`}>
      <Image
        src={imgSrc}
        width={0}
        height={0}
        sizes='100vw'
        style={{ width: '100%', height: 'auto' }}
        alt="easymod"
        className="w-full h-auto"
      />
      <MinecraftHN
        as='h2'
        className="hidden lg:block text-yellow-300 text-xs sm:text-lg md:bottom-0 lg:bottom-3 lg:-right-10 xl:bottom-3 xl:-right-32 md:text-xl lg:text-2xl xl:text-3xl absolute -bottom-5 right-0 m-2 diagonal-text breath-animation"
      >
        {children}
      </MinecraftHN>
    </div>
  );
}

export default AwesomeTitle;
