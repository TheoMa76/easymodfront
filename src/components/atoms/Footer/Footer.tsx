'use client';
import React from 'react';
import MinecraftText from '../Texts/TextBlock/MinecraftText';

const Footer: React.FC = () => {
  return (
    <footer className='bg-dirt w-full mt-20 text-white py-5'>
      <MinecraftText>Travail pedagogique sans objectifs commerciaux</MinecraftText>
      <MinecraftText>
        Ce site est conçu dans le respect de la legislation en vigueur (RGPD). 
        <a href="/mentions-legales" className='font-semibold'> Mentions legales </a> 
         et <a href="/politique-de-confidentialite" className='font-semibold'>Politique de confidentialite</a> disponibles.
      </MinecraftText>
    </footer>
  );
};

export default Footer;
