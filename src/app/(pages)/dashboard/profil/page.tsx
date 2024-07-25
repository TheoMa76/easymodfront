"use client";
import Form from '@/components/molecules/Forms/Form';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import Modal from 'react-modal';
import MinecraftButton from '@/components/atoms/Buttons/MinecraftButton';
import MinecraftHN from '@/components/atoms/Texts/Title/MinecraftHN';
import MinecraftText from '@/components/atoms/Texts/TextBlock/MinecraftText';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getConnectedUser();
      if (user) {
        setUserData(user);
        console.log(user);
      }
    };
    fetchUserData();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
    <MinecraftHN as='h1' className="text-4xl">Profil</MinecraftHN>
    <MinecraftText text="Voici votre profil"></MinecraftText>
      <MinecraftButton onClick={openModal} label="Éditer le profil" className="btn btn-primary z-0"/>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Modifier le profil"
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-infinite"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg relative">
          <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
            &times;
          </button>
          <Form
            formFields={formFields}
            initialValues={userData || {}}
            onSubmit={async (values) => {
              await handleSubmit(values);
              closeModal();
            }}
          />
        </div>
      </Modal>
    </div>
  );
}

export default Profil;
