'use client'
import React, { useState } from 'react';

type MinecraftInputVariant = 'primary' | 'secondary' | 'neutral';

interface MinecraftInputProps {
  variant?: MinecraftInputVariant;
  placeholder?: string;
  value?: string;
  onChange?: () => void;
  onInput?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: any;
  label?: string;
  type?: string;
}

const MinecraftInput: React.FC<MinecraftInputProps> = ({
  variant = 'primary',
  placeholder,
  value,
  onChange,
  onInput,
  disabled = false,
  className = '',
  icon,
  label = "Exemple input",
  type = 'text',
}) => {
  const baseClasses =
    'appearance-none border-2 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

  return (
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <label htmlFor={label} className="text-custom-dark"></label>
      <MinecraftInput
        type={type}
        className={`${baseClasses} ${className} ${icon ? 'pl-10' : ''}`}
        placeholder={placeholder}
        aria-label={`${placeholder} + ${label}`}
        value={value}
        disabled={disabled}
      />
      {value && type !== 'password' &&   (
        <p className="text-2xl mt-2 text-gray-700">
          Vous avez saisi : <strong>{value}</strong>
        </p>
      )}
    </div>
  );
};

export default MinecraftInput;
