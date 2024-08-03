import AwesomeTitle from '@/components/atoms/Texts/Title/AwesomeTitle';
import MinecraftHN from '@/components/atoms/Texts/Title/MinecraftHN';
import React from 'react';

type Props = {
  title?: string;
  children: React.ReactNode;
  useAwesometitle?: boolean;
  className?: string;
  bg?: string;
};

const Card: React.FC<Props> = ({ title, children, useAwesometitle = false, className, bg = 'bg-obsi' }) => {
  return (
    <div className={`${className} ${bg} border-4 flex flex-col items-center justify-center mx-auto border-t-white border-l-white border-b-custom-dark-grey border-r-custom-dark-grey text-white`}>
      {title && (
        !useAwesometitle ? 
          <MinecraftHN as="h2" className="mb-4 w-1/2 lg:w-fit">{title}</MinecraftHN> 
        : 
          <div className='w-1/3 my-10'>
          <AwesomeTitle className="mb-4">{title}</AwesomeTitle>
          </div>
      )}
      {children}
    </div>
  );
}

export default Card;
