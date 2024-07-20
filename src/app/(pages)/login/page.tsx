'use client';
import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/molecules/Card/Card';
import Form from '@/components/molecules/Forms/Form';

const LoginPage = () => {
  const router = useRouter();

  const formFields = [
    { name: 'username', label: 'Email', placeholder: 'E-mail', type: 'text' },
    { name: 'password', label: 'Mot de passe', placeholder: 'Mot de passe', type: 'password' },
  ];

  async function handleSubmit(values: { [key: string]: string }) {
    const { username, password } = values;

    const response = await fetch('https://localhost:8000/api/login_check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      router.push('/');
    } else {
      console.log(response);
    }
  }

  return (
    <div className="flex items-center w-fit md:w-full xs:w-full justify-center min-h-screen bg-gray-900 p-6">
      <Card title="Connexion">
        <Form formFields={formFields} onSubmit={handleSubmit} />
      </Card>
    </div>
  );
};

export default LoginPage;
