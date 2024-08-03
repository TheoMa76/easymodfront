"use client";
import MinecraftButton from '@/components/atoms/Buttons/MinecraftButton';
import MinecraftText from '@/components/atoms/Texts/TextBlock/MinecraftText';
import Card from '@/components/molecules/Card/Card';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {};

const EndTuto = (props: Props) => {
    const router = useRouter();
    
    return (
        <Card title="Fin du tutoriel" useAwesometitle={true}>
            <div className="flex flex-col items-center justify-center">
                <MinecraftText>Félicitations ! Vous avez terminé le tutoriel. Appuyez sur le bouton ci-dessous pour revenir au menu des tutoriels !</MinecraftText>
                <MinecraftButton 
                    label="Retour au menu" 
                    onClick={() => router.push('/tuto')} 
                    className='mt-4' 
                />
            </div>
        </Card>
    );
};

export default EndTuto;
