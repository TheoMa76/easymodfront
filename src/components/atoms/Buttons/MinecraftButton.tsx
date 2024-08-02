'use client'
import React from 'react';
import './css/minecraftButton.css';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps {
  variant?: ButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
  label?: string;
  icon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  sound?: string;
}

const playClickSound = (sound:string) => {
  const audio = new Audio(`/sound/${sound}`);
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  } else {
    console.error("Audio element not found");
  }
}

const MinecraftButton: React.FC<ButtonProps> = ({
  variant = 'primary',
  onClick = playClickSound,
  disabled = false,
  style = {},
  className = '',
  label = '',
  icon,
  type = 'button',
  sound = 'minecraft-menu-button.mp3',
}) => {
  const baseClasses = 'MinecraftButton bg-minecraft-button border border-solid border-2 border-black relative py-2 px-4 tracking-wide text-xl text-white';
  const hoverClasses = 'hover:scale-105 hover:bg-minecraft-hover';
  const beforeClasses = `before:bg-stone before:absolute 
  before:top-0 before:left-0 before:w-full before:h-full before:border before:border-4 
  before:border-solid before:border-custom-white  before:border-b-4 before:border-b-solid 
  before:border-b-custom-dark-grey before:border-r-0 before:pointer-events-none 
  before:bg-cover before:bg-center before:opacity-50 before:transition-all before:z-10`;
  const spanClasses = `relative z-20`;

  return (
    <>
      <button
        className={`${baseClasses} ${hoverClasses} ${beforeClasses} ${className} flex flex-row items-center`}
        onClick={() => {
          playClickSound(sound);
          if (onClick) onClick(sound);
        }}
        disabled={disabled}
        aria-label={label}
        type={type}
        style={style}
        id={label}
      >
        {icon && <span className="text-black mr-2">{icon}</span>}
        <span className={spanClasses}>{label}</span>
      </button>
    </>
  );
};

export default MinecraftButton;
