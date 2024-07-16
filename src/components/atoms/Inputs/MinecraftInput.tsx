'use client';
import React, { ChangeEvent } from 'react';

type MinecraftInputVariant = 'primary' | 'secondary' | 'neutral';

interface MinecraftInputProps {
  variant?: MinecraftInputVariant;
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onInput?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  name?: string;
  icon?: any;
  label?: string;
  type?: string;
  isRequired?: boolean;
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
  name = label,
  isRequired = false,
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
      <label htmlFor={label} className="text-custom-dark">{label}</label>
      <input
        id={label}
        type={type}
        className={`${baseClasses} ${className} ${icon ? 'pl-10' : ''}`}
        placeholder={placeholder}
        aria-label={`${placeholder} + ${label}`}
        value={value}
        onChange={onChange}
        onInput={onInput}
        disabled={disabled}
        name = {name}
        required = {isRequired}
      />
    </div>
  );
};

export default MinecraftInput;
