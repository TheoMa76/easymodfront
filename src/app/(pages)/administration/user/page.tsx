'use client';
import React, { useState, useEffect } from 'react';
import MinecraftHN from '@/components/atoms/Texts/Title/MinecraftHN';
import TextChat from '@/components/atoms/Texts/TextBlock/TextChat';
import Card from '@/components/molecules/Card/Card';
import MinecraftText from '@/components/atoms/Texts/TextBlock/MinecraftText';
import MinecraftButton from '@/components/atoms/Buttons/MinecraftButton';
import Link from 'next/link';

interface User {
  id: number;
  email: string;
  username: string;
  roles: Array<string>;
  created_at: string;
  updated_at: string;

}


const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch('/api/administration/user', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      const data = await response.json();
      if (data && Array.isArray(data.users)) {
        return data.users;
      } else {
        console.error('Les données de réponse ne sont pas dans le format attendu');
        return [];
      }
    } else {
      const errorData = await response.json();
      console.error('Erreur de connexion:', errorData);
      return [];
    }
  } catch (error) {
    console.error('Erreur réseau:', error);
    return [];
  }
};

const formatDate = (date: string): string => {
  const d = new Date(date);
  return d.toLocaleString();
}

const handleDelete = async (id: number) => {
  try {
    const response = await fetch(`/api/administration/user/${id}/delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      const errorData = await response.json();
      console.error('Erreur de connexion:', errorData);
    }
  } catch (error) {
    console.error('Erreur réseau:', error);
  }
}

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <Card className='m-5 w-full'>
      <MinecraftHN as='h2'>{user.username}</MinecraftHN>
      <TextChat className='w-full'>
        <p>Email: {user.email}</p>
        <p>Rôles: {user.roles.join(', ')}</p>
        <p>Cree le: {formatDate(user.created_at)}</p>
        <p>Modifie le: {formatDate(user.updated_at)}</p>
      </TextChat>
      <MinecraftButton label = "Supprimer"></MinecraftButton>
      <Link href={`/administration/user/${user.id}?id=${user.id}`}>
          <MinecraftButton label="Modifier"></MinecraftButton>
      </Link>
    </Card>
  );
}

const AdminUserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };

    loadUsers();
  }, []);

  return (
      <div className='bg-black bg-opacity-50 w-full lg:w-10/12 flex mt-5 flex-col m-auto'>
        {Array.isArray(users) && users.length > 0 ? (
          users.map(u => (
            <UserCard key={u.id} user={u} />
          ))
        ) : (
          <MinecraftText>Aucun utilisateur trouvé.</MinecraftText>
        )}
      </div>
  );
};

export default AdminUserPage;
