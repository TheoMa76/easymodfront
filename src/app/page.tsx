'use client'
import React, { useEffect, useState } from 'react';
import MinecraftButton from '@/components/atoms/Buttons/MinecraftButton';
import MusicPopup from '@/components/molecules/Popups/MusicPopup';
import AwesomeTitle from '@/components/atoms/Texts/Title/AwesomeTitle';
import TextChat from '@/components/atoms/Texts/TextBlock/TextChat';

const App: React.FC = () => {

  return (
    <>
      <div className="p-5 m-20">
        <h1 className="text-2xl mb-4">UI Kit Exemples Boutons</h1>
        <MusicPopup />
        <h1 className="mb-8 text-3xl">Minecraft Style Button</h1>
          <MinecraftButton
            label="Bouton minecraft"
          />
          <AwesomeTitle>Meeting expectations!</AwesomeTitle>
          <TextChat className="text-white text-2xl">Testing text</TextChat>
      </div>
    </>
  );
};

export default App;
