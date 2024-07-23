// pages/tuto.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import TutoCard from '@/components/molecules/Card/TutoCard';

interface Tutoriel {
    id: number;
    title: string;
    description: string;
    estimated_time: string;
    game: string;
    position: number;
}

const fetchTutoriels = async (): Promise<Tutoriel[]> => {
    try {
        const token = Cookies.get('token');
        const response = await fetch('https://localhost:8000/tuto/', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        });
        if (response.ok) {
            const data: Tutoriel[] = await response.json();
            return data.sort((a, b) => a.position - b.position);
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

const TutoPage: React.FC = () => {
    const [tutoriels, setTutoriels] = useState<Tutoriel[]>([]);
    const [hoveredTuto, setHoveredTuto] = useState<Tutoriel | null>(null);

    useEffect(() => {
        const loadTutoriels = async () => {
            const data = await fetchTutoriels();
            console.log(data);
            setTutoriels(data);
        };

        loadTutoriels();
    }, []);

    return (
        <div className='w-full mt-3 flex flex-col justify-start px-3'>
            <div className='bg-black bg-opacity-50'>
                {tutoriels.map((tuto) => (
                    <div
                        key={`card-${tuto.id}`}
                        onMouseEnter={() => setHoveredTuto(tuto)}
                        onMouseLeave={() => setHoveredTuto(null)}
                        className='hover:border-4 hover:border-white hover:border-opacity-50 flex items-center'
                    >
                        <TutoCard
                            key={tuto.id}
                            id={tuto.id}
                            title={tuto.title}
                            estimated_time={tuto.estimated_time}
                        />
                        {hoveredTuto?.id === tuto.id && (
                            <div className='ml-4 text-white'>
                                {tuto.description ? tuto.description : tuto.title}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TutoPage;
