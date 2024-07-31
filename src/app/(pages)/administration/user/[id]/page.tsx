"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@/components/molecules/Forms/Form';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: number;
  email: string;
  username: string;
  roles: Array<string>;
  created_at: string;
  updated_at: string;
}

const fetchUser = async (id: number): Promise<User | null> => {
  try {
    const response = await fetch(`/api/administration/user/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      const data = await response.json();
      if (data && typeof data.user === 'object') {
        return data.user;
      } else {
        console.error('Les données de réponse ne sont pas dans le format attendu');
        return null;
      }
    } else {
      const errorData = await response.json();
      console.error('Erreur de connexion:', errorData);
      return null;
    }
  } catch (error) {
    console.error('Erreur réseau:', error);
    return null;
  }
};

const formFields = [
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    placeholder: 'Email',
  },
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    placeholder: 'Username',
  },
  {
    name: 'roles',
    label: 'Roles',
    type: 'text',
    placeholder: 'Roles',
  },
];

const UserShow = () => {
  const [user, setUser] = useState<User | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ? parseInt(searchParams.get('id') as string) : null;
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login');
    } else {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp == null || decodedToken.exp < Date.now() / 1000) {
Cookies.remove('token');        
router.push('/login');
      }
    }
    if (id) {
      const loadUser = async () => {
        const data = await fetchUser(id);
        setUser(data);
      };

      loadUser();
    }
  }, [id]);

  const initialValues = {
    email: user ? user.email : '',
    username: user ? user.username : '',
    roles: user ? user.roles.join(', ') : '', // Assuming roles is an array
  };

  const handleSubmit = async (values: any) => {
    if (id) {
        const token = Cookies.get('token');
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        return toast.error('API URL non configurée');
      }
      try {
        const response = await fetch(`${apiUrl}/admin/user/${id}/update`, {
          method: 'PUT', 
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const data = await response.json();
          toast.success('Form submitted successfully:', data);
        } else {
          const errorData = await response.json();
          console.error('Error submitting form:', errorData);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    } else {
      console.error('User ID is missing');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center lg:w-10/12 w-full m-auto'>
      {user ? (
        <Form formFields={formFields} onSubmit={handleSubmit} initialValues={initialValues} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserShow;
