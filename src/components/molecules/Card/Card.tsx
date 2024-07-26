import AwesomeTitle from '@/components/atoms/Texts/Title/AwesomeTitle';
import MinecraftHN from '@/components/atoms/Texts/Title/MinecraftHN';
import React from 'react';

type Props = {
  title: string;
  children: React.ReactNode;
  useAwesometitle?: boolean;
};

const Card: React.FC<Props> = ({ title, children, useAwesometitle = false }) => {
  return (
    <>
      <div className="bg-obsi border-4 z-10 flex flex-col items-center justify-center mx-auto my-8 border-t-white border-l-white border-b-custom-dark-grey border-r-border-b-custom-dark-grey text-white lg:w-full lg:min-h-full p-8">
      {!useAwesometitle ? <MinecraftHN as="h2" className="mb-4">{title}</MinecraftHN> : <AwesomeTitle className="mb-4">{title}</AwesomeTitle>}      
        <div className="mt-4">
          {children}
        </div>
      </div>
    </>
  );
}

export default Card;