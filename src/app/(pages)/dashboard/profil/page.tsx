"use client";
import Form from '@/components/molecules/Forms/Form';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

async function getConnectedUser() {
  const token = Cookies.get('token');
  try {
    const response = await fetch('http://localhost:8000/user/connected', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    });
    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      toast.error(`Erreur de connexion: ${errorData}`);
      return null;
    }
  } catch (error) {
    toast.error(`Erreur réseau: ${error}`);
    return null;
  }
}

async function handleSubmit(values: { [key: string]: string }) {
  const { username, password, newpassword, confirmnewpassword } = values;

  try {
    const response = await fetch('http://localhost:8000/user/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, newpassword, confirmnewpassword }),
    });

    if (response.ok) {
      const data = await response.json();
      toast.success('Profil mis à jour');
    } else {
      const errorData = await response.json();
      console.log('Erreur de connexion:', errorData);
    }
  } catch (error) {
    console.error('Erreur réseau:', error);
  }
}

const formFields = [
  { name: 'username', label: 'Nom d\'utilisateur', placeholder: 'Nom d\'utilisateur', type: 'text' },
  { name: 'email', label: 'Email', placeholder: 'E-mail', type: 'text' },
  { name: 'current_password', label: 'Mot de passe actuel', placeholder: 'Mot de passe actuel', type: 'password' },
  { name: 'password', label: 'Nouveau mot de passe', placeholder: 'Nouveau mot de passe', type: 'password' },
  { name: 'confirm_password', label: 'Confirmez votre nouveau mot de passe', placeholder: 'Confirmez nouveau mot de passe', type: 'password' },
];

const Profil = () => {
  const [userData, setUserData] = useState<{ [key: string]: string } | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getConnectedUser();
      if (user) {
        setUserData(user);
      }
    };
    fetchUserData();
  }, []);

  return (
    <Form
      formFields={formFields}
      initialValues={userData || {}}
      onSubmit={handleSubmit}
    />
  );
}

export default Profil;
