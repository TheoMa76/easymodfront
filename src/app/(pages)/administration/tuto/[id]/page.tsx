'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams,useRouter } from 'next/navigation';
import MinecraftHN from '@/components/atoms/Texts/Title/MinecraftHN';
import MinecraftText from '@/components/atoms/Texts/TextBlock/MinecraftText';
import MinecraftButton from '@/components/atoms/Buttons/MinecraftButton';
import Form from '@/components/molecules/Forms/Form';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import {jwtDecode} from 'jwt-decode';

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

const TutoPage: React.FC = () => {
  const [tutoriel, setTutoriel] = useState<Tutoriel | null>(null);
  const [formValues, setFormValues] = useState<any>({});
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

  const handleInputChange = (formId: string, values: any) => {
    setFormValues((prevValues:any) => ({
      ...prevValues,
      [formId]: values,
    }));
  };

  const handleSubmit = async () => {
    const updatedTutoriel = {
      ...formValues['tuto'],
      chapters: tutoriel?.chapters.map((chapter, chapterIndex) => ({
        ...formValues[`chapter_${chapterIndex}`],
        contents: chapter.contents.map((content, contentIndex) => ({
          ...formValues[`content_${chapterIndex}_${contentIndex}`],
        })),
      })),
    };

    try {
      const token = Cookies.get('token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        return toast.error('Erreur du developpeur: URL de l\'API non configurée');
      }
      const response = await fetch(`${apiUrl}/admin/tuto/${id}/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(updatedTutoriel),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erreur lors de la mise à jour:', errorData);
      } else {
        console.log('Mise à jour réussie');
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
    }
  };

  if (!tutoriel) {
    return <MinecraftText>Aucun tutoriel trouvé.</MinecraftText>;
  }

  const formChapterFields = [
    { name: 'chapter_title', label: 'Titre du chapitre', placeholder: 'Titre du chapitre', type: 'text' },
    { name: 'chapter_description', label: 'Description du chapitre', placeholder: 'Description du chapitre', type: 'text' },
    { name: 'chapter_position', label: 'position du chapitre', placeholder: 'position du chapitre', type: 'number' },
  ];

  const formContentFields = [
    { name: 'content_text', label: 'Texte du contenu', placeholder: 'Texte du contenu', type: 'text' },
    { name: 'content_code', label: 'Code du contenu', placeholder: 'Code du contenu', type: 'text' },
    { name: 'content_image', label: 'Image du contenu', placeholder: 'Image du contenu', type: 'file' },
    { name: 'content_video', label: 'Video du contenu', placeholder: 'Video du contenu', type: 'file' },
    { name: 'content_position', label: 'position du contenu', placeholder: 'position du contenu', type: 'number' },
  ];

  const formTutoFields = [
    { name: 'title', label: 'Titre', placeholder: 'Titre du tutoriel', type: 'text' },
    { name: 'estimated_time', label: 'Temps estimé', placeholder: 'Temps estimé', type: 'text' },
    { name: 'game', label: 'Jeu', placeholder: 'Jeu', type: 'text' },
    { name: 'position', label: 'position', placeholder: 'position', type: 'number' },
  ];

  const initialTutoValues = {
    title: tutoriel.title,
    description: tutoriel.description,
    estimated_time: tutoriel.estimated_time,
    game: tutoriel.game,
    position: tutoriel.position,
  };

  return (
    <div className='flex flex-col justify-center items-center w-full' id="formTuto">
      <Form formFields={formTutoFields} onChange={(values:any) => handleInputChange('tuto', values)} initialValues={initialTutoValues} putSubmit={false} />
      {tutoriel.chapters && tutoriel.chapters.map((chapter, chapterIndex) => {
        const initialChapterValues = {
          chapter_title: chapter.title,
          chapter_description: chapter.description,
          chapter_position: chapter.position,
        };
        return (
          <div key={chapterIndex}>
            <MinecraftHN as='h2' className="text-3xl">{chapter.position} : {chapter.title}</MinecraftHN>
            <Form onChange={(values) => handleInputChange(`chapter_${chapterIndex}`, values)} formFields={formChapterFields} initialValues={initialChapterValues} putSubmit={false} />
            {chapter.contents && chapter.contents.map((content, contentIndex) => {
              const initialContentValues = {
                content_text: content.text,
                content_code: content.code,
                content_image: content.image,
                content_video: content.video,
                content_position: content.position,
              };
              return (
                <div key={contentIndex}>
                  <MinecraftHN as='h2' className="text-2xl">Contenu {content.position} du chapitre : {chapter.title}</MinecraftHN>
                  <Form onChange={(values:any) => handleInputChange(`content_${chapterIndex}_${contentIndex}`, values)} formFields={formContentFields} initialValues={initialContentValues} putSubmit={false} />
                </div>
              );
            })}
          </div>
        );
      })}
      <MinecraftButton label="Soumettre" type="button" onClick={handleSubmit} />
    </div>
  );
};

export default TutoPage;
