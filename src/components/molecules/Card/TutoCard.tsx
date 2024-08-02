import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MinecraftButton from '@/components/atoms/Buttons/MinecraftButton';
import MinecraftHN from '@/components/atoms/Texts/Title/MinecraftHN';
import Cookies from 'js-cookie';

interface TutoCardProps {
  id: number;
  title: string;
  estimated_time: string;
  imageUrl: string;
}

const TutoCard: React.FC<TutoCardProps> = ({ id, title, estimated_time, imageUrl }) => {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (Cookies.get('token')) {
      setIsConnected(true);
    }
  }, []);

  // Determine la classe de fond en fonction de l'image
  const backgroundClass = imageUrl ? '' : 'bg-stone';
  const backgroundImageStyle = imageUrl ? { backgroundImage: `url(${imageUrl})` } : {};

  return (
    <div
      className={`border-2 w-full bg-cover bg-center bg-no-repeat h-full lg:w-1/4 lg:h-1/6 border-black relative cursor-pointer flex flex-col items-center justify-between shadow-lg transition-transform transform hover:scale-105 ${backgroundClass}`}
      style={backgroundImageStyle}
    >
      <div className="relative flex flex-col items-center justify-center z-20 p-4 text-white">
        <MinecraftHN as='h2' className="text-xl text-center">{title}</MinecraftHN>
        <MinecraftHN as='h3' className="text-sm text-center">Temps : {estimated_time}</MinecraftHN>
        <MinecraftButton
          label="Faire le tutoriel"
          onClick={() => {
            if (!isConnected) {
              router.push(`/tuto/preview/${id}?id=${id}`);
            } else {
              router.push(`/tuto/${id}?id=${id}`);
            }
          }}
          className="mt-4"
        />
      </div>
    </div>
  );
};

export default TutoCard;
