'use client';
import React, { useState, useEffect } from 'react';
import TutoCard from '@/components/molecules/Card/TutoCard';
import MinecraftButton from '@/components/atoms/Buttons/MinecraftButton';

interface Tutoriel {
  id: number;
  title: string;
  description: string;
  estimated_time: string;
  game: string;
  position: number;
  imageUrl: string;
  image:string;
}

const fetchTutoriels = async (): Promise<Tutoriel[]> => {
  try {
    const response = await fetch('/api/tuto', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json','Cache-Control': 'no-cache, no-store, must-revalidate', // Evite le cache
    'Pragma': 'no-cache', // Pour les navigateurs plus anciens
    'Expires': '0' },
    });
    if (response.ok) {
      const data: Tutoriel[] = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      console.error('Erreur de connexion:', errorData);
      return [];
    }
  } catch (error) {
    console.error('Erreur reseau:', error);
    return [];
  }
};

const TutoPage: React.FC = () => {
  const [tutoriels, setTutoriels] = useState<Tutoriel[]>([]);
  const [hoveredTuto, setHoveredTuto] = useState<Tutoriel | null>(null);

  useEffect(() => {
    const loadTutoriels = async () => {
      const data = await fetchTutoriels();
      setTutoriels(data);
    };

    loadTutoriels();
  }, []);
  return (
    <div className='w-full flex mt-5 flex-col justify-start px-3'>
      <div className='bg-black bg-opacity-50'>
        {tutoriels.map((tuto) => (
          <div
            key={`card-${tuto.id}`}
            onMouseEnter={() => setHoveredTuto(tuto)}
            onMouseLeave={() => setHoveredTuto(null)}
            className='relative flex flex-col items-center mb-4 hover:border-4 lg:hover:border-white lg:hover:border-opacity-50 lg:flex lg:items-center'
          >
            <TutoCard
              id={tuto.id}
              title={tuto.title}
              estimated_time={tuto.estimated_time}
              imageUrl={tuto.imageUrl}
            />
            {hoveredTuto?.id === tuto.id && (
              <div className='lg:ml-4 lg:text-white lg:relative absolute top-0 left-0 w-full h-full bg-black bg-opacity-75 flex flex-col items-center justify-between text-white p-4 md:hidden overflow-y-auto max-h-[80vh]'>
                <div className='w-full flex flex-col items-center'>
                  <div className='text-center'>
                    {tuto.description ? tuto.description : tuto.title}
                  </div>
                  <MinecraftButton
                    label="Retour"
                    onClick={() => setHoveredTuto(null)}
                    className='mb-4 px-4 py-2 bg-gray-800'
                  />
                </div>
              </div>
            )}
            {hoveredTuto?.id === tuto.id && (
              <div className='hidden md:block ml-4 text-white overflow-y-auto max-h-[80vh]'>
                {tuto.description || tuto.title}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutoPage;
