// components/molecules/Card/TutoCard.tsx
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import MinecraftButton from '@/components/atoms/Buttons/MinecraftButton';
import MinecraftHN from '@/components/atoms/Texts/Title/MinecraftHN';

interface TutoCardProps {
  id: number;
  title: string;
  estimated_time: string;
}

const TutoCard: React.FC<TutoCardProps> = ({ id, title, estimated_time }) => {
  const router = useRouter();


  return (
      <div
        className="bg-minecraft-card border-2 w-full h-full lg:w-1/4 lg:h-1/6 border-black relative cursor-pointer flex flex-col items-center justify-between rounded-lg shadow-lg transition-transform transform hover:scale-105"
      >
        <div className="before:bg-stone before:absolute before:top-0 before:left-0 before:w-full before:h-full before:border before:border-4 before:border-solid before:border-custom-white before:border-b-4 before:border-b-solid before:border-b-custom-dark-grey before:border-r-0 before:pointer-events-none before:bg-cover before:bg-center before:opacity-100 before:transition-all before:z-30"></div>
        <div className="relative flex flex-col items-center justify-center z-40 p-4">
          <MinecraftHN as='h2' className="text-xl text-center">{title}</MinecraftHN>
          <MinecraftHN as='h3' className="text-sm text-center">Temps : {estimated_time}</MinecraftHN>
          <MinecraftButton
            label="Faire le tutoriel"
            onClick={() => {
              router.push(`/tuto/${id}`);
            }}
            className="mt-4"
          />
        </div>
      </div>
  );
};

export default TutoCard;
