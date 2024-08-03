import React, { useState, ChangeEvent, FormEvent } from 'react';
import MinecraftInput from '@/components/atoms/Inputs/MinecraftInput';
import MinecraftButton from '@/components/atoms/Buttons/MinecraftButton';
import { toast } from 'react-toastify';

interface FormValues {
  [key: string]: any;
}

interface FormErrors {
  [key: string]: string;
}

interface FormField {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  options?: string[];
  required?: boolean;
}

interface FormProps {
  formFields: FormField[];
  onSubmit: (values: FormValues) => void;
  initialValues?: FormValues;
  putSubmit?: boolean;
  onChange?: (values: FormValues) => void;
}

const Form: React.FC<FormProps> = ({ formFields, onSubmit, initialValues = {},putSubmit = true }) => {
  const initialFormValues: FormValues = formFields.reduce((acc, field) => {
    if (field.type === 'select' && field.options && field.options.length > 0) {
      acc[field.name] = initialValues[field.name] || field.options[0];
    } else {
      acc[field.name] = initialValues[field.name] || '';
    }
    return acc;
  }, {} as FormValues);
  

  const [values, setValues] = useState<FormValues>(initialFormValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field: string) => (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues({ ...values, [field]: event.target.value });
    setErrors({ ...errors, [field]: '' });
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    formFields.forEach((field) => {
      if (!values[field.name] && field.required) {
        newErrors[field.name] = `${field.label} doit être rempli.`;
      }
    });

    if ('email' in values && values.email && !/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "L'email n'est pas valide.";
    }

    if ('password' in values) {
      if (values.password && values.password.length < 8) {
        newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères.';
      }

      if ('confirm_password' in values && values.password !== values.confirm_password) {
        newErrors.confirm_password = 'Les mots de passe ne correspondent pas.';
      }
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
    <div className="flex items-center w-full p-5 lg:w-1/2 text-white justify-center mb-8">
       <form onSubmit={handleSubmit} className="w-full">
      {formFields.map((field) => (
        <div key={field.name} className="flex flex-col items-center w-full">
          {field.type === 'select' ? (
            <MinecraftInput
              label={field.label}
              placeholder={field.placeholder}
              value={values[field.name]}
              onChange={handleChange(field.name)}
              variant="primary"
              className="text-xl"
              type={field.type}
              name={field.name}
              isRequired={field.required}
              options={field.options}
            />
          ) : (
            <MinecraftInput
              label={field.label}
              placeholder={field.placeholder}
              value={values[field.name]}
              onChange={handleChange(field.name)}
              variant="primary"
              className="text-xl"
              type={field.type}
              name={field.name}
              isRequired={field.required}
            />
          )}
            {errors[field.name] && (
              <p className="text-custom-secondary text-lg mt-2" role="alert" aria-label={errors[field.name]}>
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}
        {putSubmit &&
        <div className="flex justify-center">
          <MinecraftButton type="submit" variant="primary" label="Soumettre" className="text-2xl m-2" />
        </div>
        }
      </form>
    </div>
  );
};

export default Form;
