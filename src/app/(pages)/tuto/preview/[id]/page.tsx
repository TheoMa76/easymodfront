'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import MinecraftHN from '@/components/atoms/Texts/Title/MinecraftHN';
import MinecraftText from '@/components/atoms/Texts/TextBlock/MinecraftText';
import Card from '@/components/molecules/Card/Card'; // Ajoutez l'importation du composant Card
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

interface Tutoriel {
  id: number;
  title: string;
  description: string;
  estimated_time: string;
  difficulty: string;
  game: string;
  position: number;
  chapters: Chapter[];
}

interface Chapter {
  id: number;
  title: string;
  description: string;
  position: number;
  contents: Content[];
}

interface Content {
  id: number;
  text?: string;
  code?: string;
  image?: string;
  video?: string;
  position: number;
}

const sortTutoriel = (tutoriel: Tutoriel): Tutoriel => {
  tutoriel.chapters.sort((a, b) => a.position - b.position);
  // tutoriel.chapters.forEach(chapter => {
  //   chapter.contents.sort((a, b) => a.position - b.position);
  // });
  return tutoriel;
};

const fetchTutoriel = async (id: number): Promise<Tutoriel | null> => {
  try {
    const response = await fetch(`/api/tuto/preview/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      const data = await response.json();
      if (data && typeof data.tuto === 'object') {
        const sortedTutoriel = sortTutoriel(data.tuto);
        return sortedTutoriel;
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

const PreviewTutoPage: React.FC = () => {
  const [tuto, setTutoriel] = useState<Tutoriel | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ? parseInt(searchParams.get('id') as string) : null;

  useEffect(() => {
    if (id) {
      const loadTutoriel = async () => {
        const data = await fetchTutoriel(id);
        setTutoriel(data);
      };
      loadTutoriel();
    }
  }, [id]);

  if (!tuto) {
    return <MinecraftText>Chargement...</MinecraftText>;
  }

  return (
    <div className='flex flex-col justify-center items-center w-full'>
      <Card title={tuto.title} bg="bg-obsi" className='lg:w-10/12 w-full my-8'>
        <MinecraftText>Duree du tutoriel : {tuto.estimated_time}</MinecraftText>
        <MinecraftText>Difficulte : {tuto.difficulty}</MinecraftText>
        <MinecraftText>Jeu : {tuto.game}</MinecraftText>
        <MinecraftText>{tuto.description}</MinecraftText>
        <MinecraftHN as='h2'>Chapitres disponibles</MinecraftHN>
      
      {tuto.chapters.map(chapter => (
        <Card key={chapter.position} title={chapter.title} bg="bg-stone" className='lg:w-1/2 w-full my-8'>
          <MinecraftText>{chapter.description}</MinecraftText>
          {/* {chapter.contents.map(content => (
            <div key={content.id}>
              {content.text && <Card bg="bg-stone"><MinecraftText>{content.text}</MinecraftText></Card>}
              {content.code && <Card bg="bg-deepslate"><pre>{content.code}</pre></Card>}
              {content.image && <Card bg="bg-dirt"><img src={content.image} alt="Image" /></Card>}
              {content.video && <Card bg="bg-glowstone"><video src={content.video} controls /></Card>}
            </div>
          ))} */}
        </Card>
      ))}
      </Card>
    </div>
  );
};

export default PreviewTutoPage;
