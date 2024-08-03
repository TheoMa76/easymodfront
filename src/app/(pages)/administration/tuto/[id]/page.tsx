"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import MinecraftHN from '@/components/atoms/Texts/Title/MinecraftHN';
import MinecraftText from '@/components/atoms/Texts/TextBlock/MinecraftText';
import MinecraftButton from '@/components/atoms/Buttons/MinecraftButton';
import Form from '@/components/molecules/Forms/Form';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import Card from '@/components/molecules/Card/Card';
import CreateTutorialForm from '@/components/molecules/Forms/TutoForm';

interface Tutoriel {
  id: number;
  title: string;
  description: string;
  estimated_time: string;
  game: string;
  position: number;
  chapters: Chapter[];
}

interface Chapter {
  id: number;
  title: string;
  description: string;
  contents: Content[];
  position: number;
}

interface Content {
  id: number;
  text?: string;
  code?: string;
  image?: string;
  video?: string;
  position: number;
}

const fetchTutoriel = async (id: number): Promise<Tutoriel | null> => {
  try {
    const response = await fetch(`/api/administration/tuto/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      const data = await response.json();
      if (data && typeof data.tutos === 'object') {
        return data.tutos;
      } else {
        console.error('Les donnees de reponse ne sont pas dans le format attendu');
        return null;
      }
    } else {
      const errorData = await response.json();
      console.error('Erreur de connexion:', errorData);
      return null;
    }
  } catch (error) {
    console.error('Erreur reseau:', error);
    return null;
  }
};

const TutoPage: React.FC = () => {
  const [tutoriel, setTutoriel] = useState<Tutoriel | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id') ? parseInt(searchParams.get('id') as string) : null;

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
      const loadTutoriel = async () => {
        const data = await fetchTutoriel(id);
        setTutoriel(data);
      };

      loadTutoriel();
    }
  }, [id, router]);

  if (!tutoriel) {
    return <MinecraftText>Aucun tutoriel trouve.</MinecraftText>;
  }


  return (
    <CreateTutorialForm defaultValues={tutoriel} edit={true} />
  );
};

export default TutoPage;
