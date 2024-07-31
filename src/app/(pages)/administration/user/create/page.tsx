"use client";
import React, { useEffect } from 'react';
import Form from '@/components/molecules/Forms/Form';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

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
    type: 'select',
    options: ['ROLE_USER', 'ROLE_ADMIN'],
    placeholder: 'Roles',
  },
];

const UserCreate = () => {
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
  },[router]);

  const handleSubmit = async (values: any) => {
        const token = Cookies.get('token');
        console.log(values);
      try {
        const response = await fetch(`/api/administration/user/create`, {
          method: 'POST', 
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const data = await response.json();
          toast.success('Utilisateur crée !', data);
        } else {
          const errorData = await response.json();
          console.error('Error submitting form:', errorData);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
  };

  

  return (
    <div className='flex flex-col items-center justify-center lg:w-10/12 w-full m-auto'>
        <Form formFields={formFields} onSubmit={handleSubmit} />
    </div>
  );
}

export default UserCreate;
