'use client';
import React, { ChangeEvent, ChangeEventHandler, FormEventHandler } from 'react';

type MinecraftInputVariant = 'primary' | 'secondary' | 'neutral';

interface MinecraftInputProps {
  variant?: MinecraftInputVariant;
  placeholder?: string;
  value?: string | number;
  onChange?: ChangeEventHandler<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>;
  onInput?: (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
  className?: string;
  name?: string;
  icon?: any;
  label?: string;
  type?: string;
  isRequired?: boolean;
  options?: string[];
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
  label = 'Example input',
  type = 'text',
  options = [],
  name = label,
  isRequired = false,
}) => {
  const baseClasses =
    'appearance-none text-black minecraftTextNoShadow border-2 py-2 px-3 leading-tight w-full';

  return (
    <>
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <label htmlFor={label} className="text-white minecraftText self-start">{label}</label>
      {type === 'select' ? (
        <select
          id={label}
          className={`${baseClasses} ${className} ${icon ? 'pl-10' : ''}`}
          aria-label={`${placeholder} + ${label}`}
          value={value}
          onChange={onChange}
          onInput={onInput as FormEventHandler<HTMLSelectElement>}
          disabled={disabled}
          name={name}
          required={isRequired} // Ajoute required seulement si isRequired est true
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={label}
          className={`${baseClasses} ${className} ${icon ? 'pl-10' : ''}`}
          placeholder={placeholder}
          aria-label={`${placeholder} + ${label}`}
          value={value}
          onChange={onChange}
          onInput={onInput as FormEventHandler<HTMLTextAreaElement>}
          disabled={disabled}
          name={name}
          required={isRequired}
        />
      ) : (
        <input
          id={label}
          type={type}
          className={`${baseClasses} ${className} ${icon ? 'pl-10' : ''}`}
          placeholder={placeholder}
          aria-label={`${placeholder} + ${label}`}
          value={value}
          onChange={onChange}
          onInput={onInput as FormEventHandler<HTMLInputElement>}
          disabled={disabled}
          name={name}
          required={isRequired}
        />
      )}
    </>
  );
};

export default MinecraftInput;
