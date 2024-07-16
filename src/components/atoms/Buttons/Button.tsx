'use client'

import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'neutral';

interface ButtonProps {
  variant?: ButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
  label?: string;
  icon?: any;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  onClick,
  disabled = false,
  style,
  className = '',
  label = '',
  icon,
  type = 'button',
}) => {
  const baseClasses = 'py-2 px-4 text-center border-none cursor-pointer transition-transform duration-200 transform';
  const hoverClassesPrimary = 'hover:scale-125 hover:bg-custom-dark hover:text-custom-white';
  const hoverClassesNeutral = 'hover:scale-150 hover:underline';
  const variantClasses = {
    primary: 'bg-custom-primary rounded-full text-custom-white shadow-lg active:shadow-none',
    secondary: 'bg-custom-secondary rounded-full text-custom-white shadow-lg active:shadow-none',
    neutral: 'bg-none text-custom-dark',
  };

  const hoverClasses = variant === 'neutral' ? hoverClassesNeutral : hoverClassesPrimary;

  return (
    <button
      className={`${baseClasses} ${hoverClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={{ ...style, fontSize: '1.5em', display: 'flex', alignItems: 'center' }}
      aria-label={label}
      type={type}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </button>
  );
};

export default Button;
