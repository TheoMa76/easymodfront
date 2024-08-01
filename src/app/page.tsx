'use client'
import MinecraftButton from '@/components/atoms/Buttons/MinecraftButton';
import MinecraftText from '@/components/atoms/Texts/TextBlock/MinecraftText';
import TextChat from '@/components/atoms/Texts/TextBlock/TextChat';
import Card from '@/components/molecules/Card/Card';
import React, { useState, useEffect } from 'react';

const HomePage: React.FC = () => {

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleMenu = () => {
    const btnMenu = document.getElementById('Menu');
    if (btnMenu) {
      btnMenu.click();
    }
  }

  const redirectLogin = () => {
    window.location.href = '/register';
  }

  return (
    <div className='flex flex-col justify-center gap-10 lg:mx-10'>
      <Card title="Bienvenue sur EasyMod" className=' w-full lg:w-10/12 my-10'>
        <div className='w-full lg:w-1/2 lg:m-auto self-center my-10'>
          <MinecraftText className='mt-5 w-full'>
            Bienvenue sur EasyMod, votre destination incontournable pour créer vos propres mods Minecraft ! 
            Que vous soyez un jeune aventurier ou un moddeur expérimenté, notre site est conçu pour vous 
            accompagner à chaque étape de votre aventure de création !
          </MinecraftText>
        </div>
      </Card>
      
      <div className='w-full lg:w-1/2 lg:m-auto text-center items-center'>
        <MinecraftButton label="Explorer !" onClick={toggleMenu} className='self-center m-auto'></MinecraftButton>
      </div>

      <Card title="Pourquoi choisir EasyMod ?" useAwesometitle={true} bg="bg-glowstone" className='w-full lg:w-10/12 my-10'>
        <div className='w-full lg:w-1/2 lg:m-auto self-center my-10'>
          <TextChat className='mt-5 w-full'>
            <ul>
              <li className='my-10 text-xl'><MinecraftText size='text-3xl'>Guide Complet et Accessible :</MinecraftText> Nos tutoriels sont élaborés pour tous les âges et tous les niveaux. 
              Que vous soyez un débutant curieux ou un passionné en quête de perfectionnement, nous avons les 
              ressources qu'il vous faut pour maîtriser l'art de la création de mods.</li>
              
              <li className='my-10 text-xl'><MinecraftText size='text-3xl'>De l&apos;Installation à l&apos;Action :</MinecraftText> Nous vous guidons à travers tout le processus, depuis l&apos;installation 
              des outils nécessaires jusqu&apos;à la mise en œuvre et le test de votre mod dans Minecraft. 
              Vous n&apos;avez qu&apos;à suivre nos étapes simples et claires pour transformer vos idées en réalité !</li>
              
              <li className='my-10 text-xl'><MinecraftText size='text-3xl'>Communauté et Support :</MinecraftText> Chez EasyMod, nous croyons en la puissance de la communauté. 
              Rejoignez notre forum pour échanger avec d&apos;autres créateurs, partager vos expériences 
              et obtenir des conseils personnalisés. Notre équipe est également là pour répondre à vos 
              questions et vous aider à surmonter les obstacles.</li>
              
              <li className='my-10 text-xl'><MinecraftText size='text-3xl'>Inspirations et Créativité :</MinecraftText> Explorez nos tutoriels et projets inspirants pour stimuler
              votre créativité. Nous proposons des idées variées pour vous aider à imaginer et réaliser
              des mods qui enrichiront votre expérience Minecraft.</li>
              
              <li className='my-10 text-xl'><MinecraftText size='text-3xl'>Mises à Jour et Nouveautés :</MinecraftText> Restez à la pointe des dernières tendances et mises à jour 
              de Minecraft. Nous vous informons des nouveautés pour que vous puissiez adapter vos créations 
              et continuer à innover.</li>
            </ul>
          </TextChat>
        </div>
      </Card>

      <MinecraftButton label="Enregistrez-vous !" onClick={redirectLogin} className='self-center m-auto'></MinecraftButton>

      <Card title="Prêt à commencer ?" className='w-full lg:w-10/12 my-10'>
        <div className='w-full lg:w-1/2 lg:m-auto self-center my-10'>
          <MinecraftText>
            Prêt à commencer ? Plongez dans le monde fascinant de la création de mods Minecraft avec EasyMod. 
            Explorez nos guides, laissez libre cours à votre imagination, et faites de chaque aventure Minecraft
            une expérience unique et personnalisée.
            
            Bienvenue dans votre nouvelle aventure de modding avec EasyMod !
          </MinecraftText>
        </div>
      </Card>
    </div>
  );
};

export default HomePage;
