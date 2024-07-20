import MinecraftHN from '@/components/atoms/Texts/Title/MinecraftHN';
import React from 'react';

type Props = {
  title: string;
  children: React.ReactNode;
};

const Card: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="bg-minecraft-button border-2 flex flex-col items-center justify-center mx-auto my-8 border-black text-white w-full h-full lg:w-1/2 lg:h-1/2 p-8">
      <MinecraftHN as="h2" className="mb-4">{title}</MinecraftHN>
      <div className="mt-4">
        {children}
      </div>
    </div>
  );
}

export default Card;
