'use client';
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
  }, [id, router]);

  const handleInputChange = (formId: string, values: any) => {
    setFormValues((prevValues: any) => ({
      ...prevValues,
      [formId]: values,
    }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    console.log(formValues);
    // Ajout des donnees du tutoriel
    formData.append('title', formValues['tuto'].title);
    formData.append('description', formValues['tuto'].description);
    formData.append('estimated_time', formValues['tuto'].estimated_time);
    formData.append('game', formValues['tuto'].game);
    formData.append('position', formValues['tuto'].position);

    if (tutoriel) {
      tutoriel.chapters.forEach((chapter, chapterIndex) => {
        formData.append(`chapters[${chapterIndex}][title]`, formValues[`chapter_${chapterIndex}`].chapter_title);
        formData.append(`chapters[${chapterIndex}][description]`, formValues[`chapter_${chapterIndex}`].chapter_description);
        formData.append(`chapters[${chapterIndex}][position]`, formValues[`chapter_${chapterIndex}`].chapter_position);

        chapter.contents.forEach((content, contentIndex) => {
          formData.append(`chapters[${chapterIndex}][contents][${contentIndex}][text]`, formValues[`content_${chapterIndex}_${contentIndex}`].content_text);
          formData.append(`chapters[${chapterIndex}][contents][${contentIndex}][code]`, formValues[`content_${chapterIndex}_${contentIndex}`].content_code);
          formData.append(`chapters[${chapterIndex}][contents][${contentIndex}][position]`, formValues[`content_${chapterIndex}_${contentIndex}`].content_position);

          // Gestion des fichiers
          const contentImage = formValues[`content_${chapterIndex}_${contentIndex}`].content_image;
          if (contentImage && contentImage instanceof File) {
            formData.append(`chapters[${chapterIndex}][contents][${contentIndex}][image]`, contentImage);
          }

          const contentVideo = formValues[`content_${chapterIndex}_${contentIndex}`].content_video;
          if (contentVideo && contentVideo instanceof File) {
            formData.append(`chapters[${chapterIndex}][contents][${contentIndex}][video]`, contentVideo);
          }
        });
      });
    }

    // try {
    //   const token = Cookies.get('token');
    //   const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    //   if (!apiUrl) {
    //     return toast.error('Erreur du developpeur : URL de l\'API non configuree');
    //   }

    //   const response = await fetch(`${apiUrl}/admin/tuto/${id}/update`, {
    //     method: 'PUT',
    //     headers: { 'Authorization': `Bearer ${token}` },
    //     body: formData,
    //   });

    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     console.error('Erreur lors de la mise à jour:', errorData);
    //     toast.error('Erreur lors de la mise à jour.');
    //   } else {
    //     console.log('Mise à jour reussie');
    //     toast.success('Mise à jour reussie.');
    //   }
    // } catch (error) {
    //   console.error('Erreur reseau:', error);
    //   toast.error('Erreur reseau.');
    // }
  };

  if (!tutoriel) {
    return <MinecraftText>Aucun tutoriel trouve.</MinecraftText>;
  }

  const formChapterFields = [
    { name: 'chapter_title', label: 'chapter_title', placeholder: 'Titre du chapitre', type: 'text' },
    { name: 'chapter_description', label: 'chapter_description', placeholder: 'Description du chapitre', type: 'text' },
    { name: 'chapter_position', label: 'chapter_position', placeholder: 'Position du chapitre', type: 'number' },
  ];

  const formContentFields = [
    { name: 'content_text', label: 'content_text', placeholder: 'Texte du contenu', type: 'text' },
    { name: 'content_code', label: 'content_code', placeholder: 'Code du contenu', type: 'text' },
    { name: 'content_image', label: 'content_image', placeholder: 'Image du contenu', type: 'file' },
    { name: 'content_video', label: 'content_video', placeholder: 'Video du contenu', type: 'file' },
    { name: 'content_position', label: 'content_position', placeholder: 'Position du contenu', type: 'number' },
  ];

  const formTutoFields = [
    { name: 'title', label: 'title', placeholder: 'Titre du tutoriel', type: 'text' },
    { name: 'estimated_time', label: 'estimated_time', placeholder: 'Temps estime', type: 'text' },
    { name: 'game', label: 'game', placeholder: 'Jeu', type: 'text' },
    { name: 'position', label: 'position', placeholder: 'Position', type: 'number' },
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
      <Card className='mb-3 w-10/12 my-8' bg='bg-deepslate'>
        <Form
          formFields={formTutoFields}
          onSubmit={handleSubmit}
          onChange={(values: any) => handleInputChange('tuto', values)}
          initialValues={initialTutoValues}
          putSubmit={false}
        />
        {tutoriel.chapters && tutoriel.chapters.map((chapter, chapterIndex) => {
          const initialChapterValues = {
            chapter_title: chapter.title,
            chapter_description: chapter.description,
            chapter_position: chapter.position,
          };
          return (
            <div key={chapterIndex}>
              <MinecraftHN as='h2' className="text-3xl">{chapter.position} : {chapter.title}</MinecraftHN>
              <Form
                onChange={(values) => handleInputChange(`chapter_${chapterIndex}`, values)}
                formFields={formChapterFields}
                initialValues={initialChapterValues}
                putSubmit={false}
                onSubmit={() => {}}
              />
              {chapter.contents && chapter.contents.map((content, contentIndex) => {
                const initialContentValues = {
                  content_text: content.text || '',
                  content_code: content.code || '',
                  content_image: '',
                  content_video: '',
                  content_position: content.position,
                };
                return (
                  <div key={contentIndex}>
                    <MinecraftHN as='h2' className="text-2xl">Contenu {content.position} du chapitre : {chapter.title}</MinecraftHN>
                    <Form
                      onChange={(values: any) => handleInputChange(`content_${chapterIndex}_${contentIndex}`, values)}
                      formFields={formContentFields}
                      initialValues={initialContentValues}
                      putSubmit={false}
                      onSubmit={() => {}}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
        <MinecraftButton label="Soumettre" type="button" onClick={handleSubmit} />
      </Card>
    </div>
  );
};

export default TutoPage;
