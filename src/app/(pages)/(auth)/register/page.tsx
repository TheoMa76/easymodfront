'use client';
import { useRouter } from 'next/navigation';
import Card from '@/components/molecules/Card/Card';
import Form from '@/components/molecules/Forms/Form';

const RegisterPage = () => {
  const router = useRouter();

  const formFields = [
    { name: 'email', label: 'Email', placeholder: 'E-mail', type: 'text' },
    { name: 'password', label: 'Mot de passe', placeholder: 'Mot de passe', type: 'password' },
    { name: 'password_confirmation', label: 'Confirmation du mot de passe', placeholder: 'Confirmation du mot de passe', type: 'password' },
  ];

  async function handleSubmit(values: { [key: string]: string }) {
    const { email, password } = values;

    try {
      const response = await fetch('https://localhost:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push('/');
      } else {
        const errorData = await response.json();
        console.log('Erreur de connexion:', errorData);
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
    }
  }

  return (
    <div className="flex items-center w-full justify-center my-8">
      <Card title="S'enregistrer" className='lg:w-1/2 w-full'>
        <Form formFields={formFields} onSubmit={handleSubmit} />
      </Card>
    </div>
  );
};

export default RegisterPage;
