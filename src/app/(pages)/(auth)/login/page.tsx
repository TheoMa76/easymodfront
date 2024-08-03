'use client';
import { useRouter } from 'next/navigation';
import Card from '@/components/molecules/Card/Card';
import Form from '@/components/molecules/Forms/Form';
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';
import MinecraftButton from '@/components/atoms/Buttons/MinecraftButton';


const LoginPage = () => {
  const router = useRouter();

  const formFields = [
    { name: 'username', label: 'Nom d\'utilisateur', placeholder: 'Nom d\'utilisateur', type: 'text' },
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
        router.push('/dashboard/profil');
        toast.success('Connexion reussie');
      }
      if(response.status === 401) {
        toast.error('Nom d\'utilisateur ou mot de passe incorrect');
      } else {
        const errorData = await response.json();
        console.log('Erreur de connexion:', errorData);
      }
    } catch (error) {
      console.error('Erreur reseau:', error);
    }
  }

  return (
    <div className="flex items-center w-full lg:w-full md:w-full sm:w-full justify-center my-8">
      <Card title="Connexion" className='lg:w-1/2 w-full'>
        <Form formFields={formFields} onSubmit={handleSubmit} />
        <MinecraftButton label="Mot de passe oublie" onClick={() => router.push('/passwordreset')} className='mb-4'></MinecraftButton>
      </Card>
    </div>
  );
};

export default LoginPage;
