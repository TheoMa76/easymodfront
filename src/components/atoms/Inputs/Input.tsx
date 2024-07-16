'use client'
import React, { useState } from 'react';

type InputVariant = 'primary' | 'secondary' | 'neutral';

interface InputProps {
  variant?: InputVariant;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onInput?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  icon?: any;
  label?: string;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  variant = 'primary',
  placeholder,
  value,
  onChange,
  onInput,
  disabled = false,
  className = '',
  icon,
  label,
  type = 'text',
}) => {
  const baseClasses =
    'appearance-none border-2 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

  const variantClasses = {
    primary: 'border-custom-primary',
    secondary: 'border-custom-secondary',
    neutral: 'border-none',
  };

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (onChange) {
      onChange(newValue);
    }
    if (onInput) {
      onInput(newValue);
    }
  };

  return (
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <label htmlFor={label} className="text-custom-dark"></label>
      <input
        type={type}
        className={`${baseClasses} ${variantClasses[variant]} ${className} ${
          isFocused ? 'ring-2 ring-violet-400 border-violet-400' : ''
        } ${icon ? 'pl-10' : ''}`}
        placeholder={placeholder}
        aria-label={`${placeholder} + ${label}`}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        name={label}
      />
      {value && type !== 'password' &&   (
        <p className="text-2xl mt-2 text-gray-700">
          Vous avez saisi : <strong>{value}</strong>
        </p>
      )}
    </div>
  );
};

export default Input;
