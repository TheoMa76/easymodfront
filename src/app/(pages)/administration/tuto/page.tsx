'use client';
import React, { useState, useEffect } from 'react';
import MinecraftHN from '@/components/atoms/Texts/Title/MinecraftHN';
import TextChat from '@/components/atoms/Texts/TextBlock/TextChat';
import Card from '@/components/molecules/Card/Card';
import MinecraftText from '@/components/atoms/Texts/TextBlock/MinecraftText';
import MinecraftButton from '@/components/atoms/Buttons/MinecraftButton';

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

const fetchTutoriels = async (): Promise<Tutoriel[]> => {
  try {
    const response = await fetch('/api/administration/tuto', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      if (data && Array.isArray(data.tutos)) {
        return data.tutos;
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

const ContentCard: React.FC<{ content: Content }> = ({ content }) => (
  <Card className='mb-3 w-full' bg='bg-dirt'>
    {content.text && <MinecraftText className='text-white'>{content.text}</MinecraftText>}
    {content.code && <TextChat className='text-white'><pre className='minecraftTextBlock'>{content.code}</pre></TextChat>}
    {content.image && <img src={content.image} alt={content.text} />}
    {content.video && <video src={content.video} controls />}
  </Card>
);

const ChapterCard: React.FC<{ chapter: Chapter }> = ({ chapter }) => (
  <Card title={chapter.title} className='mb-5 w-full' bg='bg-stone'>
    <MinecraftText className='text-white'>{chapter.description}</MinecraftText>
    {chapter.contents && chapter.contents.map(content => (
      <ContentCard key={content.id} content={content} />
    ))}
    </Card>
);

const TutorielCard: React.FC<{ tutoriel: Tutoriel }> = ({ tutoriel }) => (
  <Card title={tutoriel.title} className='w-full mb-5'>
    <MinecraftButton label={`Modifier`}  />
    <MinecraftText className='text-white'>{tutoriel.description}</MinecraftText>
    <MinecraftText className='text-white'>Temps estimé: {tutoriel.estimated_time}</MinecraftText>
    {tutoriel.chapters && tutoriel.chapters.map(chapter => (
      <ChapterCard key={chapter.id} chapter={chapter} />
    ))}
  </Card>
);

const AdminTutoPage: React.FC = () => {
  const [tutoriels, setTutoriels] = useState<Tutoriel[]>([]);

  useEffect(() => {
    const loadTutoriels = async () => {
      const data = await fetchTutoriels();
      setTutoriels(data);
    };

    loadTutoriels();
  }, []);

  return (
      <div className='bg-black bg-opacity-50 w-full lg:w-10/12 flex mt-5 flex-col m-auto'>
        {Array.isArray(tutoriels) && tutoriels.length > 0 ? (
          tutoriels.map(tuto => (
            <TutorielCard key={tuto.id} tutoriel={tuto} />
          ))
        ) : (
          <MinecraftText>Aucun tutoriel trouvé.</MinecraftText>
        )}
      </div>
  );
};

export default AdminTutoPage;
