import React, { useState, ChangeEvent, FormEvent } from 'react';
import MinecraftInput from '@/components/atoms/Inputs/MinecraftInput';
import Button from '../../atoms/Buttons/Button';
import MinecraftButton from '@/components/atoms/Buttons/MinecraftButton';

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
  onSubmit: (values: FormValues) => void;
}

const Form: React.FC<FormProps> = ({ formFields, onSubmit }) => {
  const initialFormValues: FormValues = formFields.reduce((acc, field) => {
    acc[field.name] = '';
    return acc;
  }, {} as FormValues);

  const [values, setValues] = useState<FormValues>(initialFormValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [field]: event.target.value });
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors = validate();

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true);
      onSubmit(values);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-custom-white shadow-md w-fit">
      {formFields.map((field) => (
        <div key={field.name} className="text-center items-center m-2">
          <MinecraftInput
            label={field.label}
            placeholder={field.placeholder}
            value={values[field.name]}
            onChange={handleChange(field.name)}
            variant="primary"
            className="text-xl"
            type={field.type}
            name={field.name}
            isRequired={true}
          />
          {errors[field.name] && (
            <p className="text-custom-secondary text-lg mt-2" role="alert" aria-label={errors[field.name]}>
              {errors[field.name]}
            </p>
          )}
        </div>
      ))}

      <div className="flex justify-center">
        <MinecraftButton type="submit" variant="primary" label="Soumettre" className="text-2xl m-2" />
      </div>

      {isSubmitted && (
        <p className="text-green-500 text-lg mt-4 text-center" role="status">
          Formulaire envoyé avec succès !
        </p>
      )}
    </form>
  );
};

export default Form;
