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
  imageUrl?: string;
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
      if (data && typeof data.tuto === 'object') {
        const sortedTutoriel = sortTutoriel(data.tuto);
        return sortedTutoriel;
      } else {
        console.error('Les donnees de reponse ne sont pas dans le format attendu');
        return null;
      }
    } else {
      const errorData = await response.json();
      toast.error('Veuillez vous reconnecter.');
      return null;
    }
  } catch (error) {
    console.error('Erreur reseau:', error);
    return null;
  }
};

const DoTutoPage: React.FC = () => {
  const [tuto, setTutoriel] = useState<Tutoriel | null>(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id') ? parseInt(searchParams.get('id') as string) : null;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;


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
      router.push('/tuto/end');
    }
  };

  const extractYouTubeID = (url:string) => {
    const regExp = /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
    } else {
      toast.info('Vous avez atteint le debut du tutoriel.');
    }
  };

  const handleProgress = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const chapter = currentChapter.id;
    const completedAt = new Date().toISOString();
    const isCompleted = true;
  
    if (!apiUrl) {
      console.error('API URL non configurée');
      return;
    }
  
    try {
      const token = Cookies.get('token');
      if (!token) {
        router.push('/login');
        return;
      }
  
      const decodedToken = jwtDecode(token);
      if (!decodedToken.exp || decodedToken.exp < Date.now() / 1000) {
        Cookies.remove('token');
        router.push('/login');
        return;
      }
  
      const response = await fetch(`${apiUrl}/progress/progression/insert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ chapter, completedAt, isCompleted }),
      });
  
      if (response.ok) {
        toast.success('Chapitre validé');
        handleNextChapter();
      } if(response.status == 401){
        toast.error('Veuillez vous reconnecter.');
        router.push('/login');
      }else {
        const errorData = await response.json();
        console.error('Erreur de connexion:', errorData);
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
  };
  


  return (
    <div className='flex flex-col justify-center items-center w-full'>
      <Card title={`Tutoriel ${tuto.position} : ${tuto.title}`} bg="bg-obsi" className='lg:w-10/12 w-full my-8 font-semibold'>
        <div key={currentChapter.position} title={currentChapter.title} className='lg:w-10/12 w-full my-8 text-center'>
          <MinecraftHN as='h2' className=''>{currentChapter.title}</MinecraftHN>
          <MinecraftText className='font-medium'>{currentChapter.description}</MinecraftText>
          {currentChapter.contents.map(content => (
            <div key={content.id} className={`my-16 w-full ${content.id}`}>
              {content.text && <Card bg="bg-stone" className='my-5 font-thin'><MinecraftText className='my-3 mx-5'>{content.text}</MinecraftText></Card>}
              {content.code && <Card bg="bg-deepslate" className='my-5 font-thin text-left'><TextChat>{content.code}</TextChat></Card>}
              {content.image && <Card bg="bg-dirt" className='my-5 font-thin'><img src={`${apiUrl}${content.imageUrl}`} alt="Image" /></Card>}
              {content.video && 
                              <Card bg="bg-glowstone" className='my-5 w-full h-fit font-thin p-5'>
                                <iframe 
                                  width="100%"
                                  height="auto"
                                  src={`https://www.youtube.com/embed/${extractYouTubeID(content.video)}`} 
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                  allowFullScreen 
                                  style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
                                ></iframe>
                              </Card>
}            </div>
          ))}
        </div>
        <div className='flex justify-between w-full lg:w-1/2'>
        
          <MinecraftButton
            onClick={handleNextChapter}
            label="Chapitre suivant"
          />
          <MinecraftButton
            onClick={handleProgress}
            label="Valider le chapitre"
            />
          <MinecraftButton
            onClick={handlePrevChapter}
            label="Chapitre precedent"
          />
          </div>
      </Card>
    </div>
  );
};

export default DoTutoPage;
