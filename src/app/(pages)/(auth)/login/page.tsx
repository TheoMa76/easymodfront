'use client';
import { useRouter } from 'next/navigation';
import Card from '@/components/molecules/Card/Card';
import Form from '@/components/molecules/Forms/Form';
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';


const LoginPage = () => {
  const router = useRouter();

  const formFields = [
    { name: 'username', label: 'Email', placeholder: 'E-mail', type: 'text' },
    { name: 'password', label: 'Mot de passe', placeholder: 'Mot de passe', type: 'password' },
  ];

  async function handleSubmit(values: { [key: string]: string }) {
    const { username, password } = values;

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        Cookies.set('token', token);
        router.push('/dashboard');
        toast.success('Connexion réussie');
      } else {
        const errorData = await response.json();
        console.log('Erreur de connexion:', errorData);
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
    }
  }

  return (
    <div className="flex items-center w-fit md:w-full xs:w-full justify-center min-h-screen p-6">
      <Card title="Connexion">
        <Form formFields={formFields} onSubmit={handleSubmit} />
      </Card>
    </div>
  );
};

export default LoginPage;
