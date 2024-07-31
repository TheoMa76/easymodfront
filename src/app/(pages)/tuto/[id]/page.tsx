'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import MinecraftHN from '@/components/atoms/Texts/Title/MinecraftHN';
import MinecraftText from '@/components/atoms/Texts/TextBlock/MinecraftText';
import Card from '@/components/molecules/Card/Card';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import MinecraftButton from '@/components/atoms/Buttons/MinecraftButton';
import TextChat from '@/components/atoms/Texts/TextBlock/TextChat';
import { jwtDecode } from 'jwt-decode';
import { log } from 'console';

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
  tutoriel.chapters.forEach(chapter => {
    chapter.contents.sort((a, b) => a.position - b.position);
  });
  return tutoriel;
};

const fetchTutoriel = async (id: number): Promise<Tutoriel | null> => {
  try {
    const response = await fetch(`/api/tuto/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      if (data && typeof data.tuto === 'object') {
        const sortedTutoriel = sortTutoriel(data.tuto);
        return sortedTutoriel;
      } else {
        console.error('Les données de réponse ne sont pas dans le format attendu');
        return null;
      }
    } else {
      const errorData = await response.json();
      toast.error('Veuillez vous reconnecter.');
      return null;
    }
  } catch (error) {
    console.error('Erreur réseau:', error);
    return null;
  }
};

const DoTutoPage: React.FC = () => {
  const [tuto, setTutoriel] = useState<Tutoriel | null>(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);
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
  }, [id,router]);

  if (!tuto) {
    return <MinecraftText>Chargement...</MinecraftText>;
  }
  
  const currentChapter = tuto.chapters[currentChapterIndex];

  const handleNextChapter = () => {
    if (currentChapterIndex < tuto.chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
    } else {
      toast.info('Vous avez atteint la fin du tutoriel.');
    }
  };

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
    } else {
      toast.info('Vous avez atteint le début du tutoriel.');
    }
  };

  return (
    <div className='flex flex-col justify-center items-center w-full'>
      <Card title={tuto.title} bg="bg-obsi" className='lg:w-10/12 w-full my-8'>
        <div key={currentChapter.position} title={currentChapter.title} className='lg:w-10/12 w-full my-8'>
          <MinecraftText>{currentChapter.description}</MinecraftText>
          {currentChapter.contents.map(content => (
            <div key={content.id} className='my-16 w-full'>
              {content.text && <Card bg="bg-stone" className='my-5'><MinecraftText className='my-3 mx-5'>{content.text}</MinecraftText></Card>}
              {content.code && <Card bg="bg-deepslate" className='my-5'><TextChat>{content.code}</TextChat></Card>}
              {content.image && <Card bg="bg-dirt" className='my-5'><img src={content.image} alt="Image" /></Card>}
              {content.video && <Card bg="bg-glowstone" className='my-5'><video src={content.video} controls /></Card>}
            </div>
          ))}
        </div>
        <MinecraftButton
          onClick={handleNextChapter}
          label="Chapitre suivant"
        />
        <MinecraftButton
          onClick={handlePrevChapter}
          label="Chapitre precedent"
        />
      </Card>
    </div>
  );
};

export default DoTutoPage;
