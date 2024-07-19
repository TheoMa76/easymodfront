'use client'
import React, { useState } from 'react';
import Input from '../../atoms/Inputs/Input';
import Button from '../../atoms/Buttons/Button';

interface FormValues {
  [key: string]: string;
}

interface FormErrors {
  [key: string]: string;
}

interface FormField {
  name: string;
  label: string;
  placeholder: string;
  type: string;
}

interface FormProps {
  formFields: FormField[];
}

const Form: React.FC<FormProps> = ({ formFields }) => {
  const initialFormValues: FormValues = formFields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {} as FormValues);

  const [values, setValues] = useState<FormValues>(initialFormValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field: string) => (value: string) => {
    setValues({ ...values, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    formFields.forEach((field) => {
      if (!values[field.name]) {
        newErrors[field.name] = `${field.label} doit être rempli.`;
      }
    });

    if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "L'email n'est pas valide.";
    }

    if (values.password && values.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères.';
    }

    if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas.';
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-custom-white">
      <form onSubmit={handleSubmit} className="p-6 bg-custom-white shadow-md rounded-lg w-full max-w-lg">
        <h1 className="text-3xl mb-6 text-center">Exemple de formulaire</h1>
        
        {formFields.map((field) => (
          <div key={field.name} className="text-center items-center m-2">
            <Input
              label={field.label}
              placeholder={field.placeholder}
              value={values[field.name]}
              onChange={handleChange(field.name)}
              variant="primary"
              className="text-xl"
              type={field.type}
            />
            {errors[field.name] && (
              <p className="text-custom-secondary text-lg mt-2" role="alert" aria-label={errors[field.name]}>
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}

        <div className="flex justify-center">
          <Button type="submit" variant="primary" label="Soumettre" className="text-2xl m-2" />
        </div>

        {isSubmitted && (
          <p className="text-green-500 text-lg mt-4 text-center" role="status">
            Formulaire envoyé avec succès !
          </p>
        )}
      </form>
    </div>
  );
};

export default Form;
