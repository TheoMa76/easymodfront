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
      Bienvenue sur EasyMod, votre destination incontournable pour creer vos propres mods Minecraft ! 
      Que vous soyez un jeune aventurier ou un moddeur experimente, notre site est conçu pour vous 
      accompagner à chaque etape de votre aventure de creation !
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
          <li className='my-10 text-xl'><MinecraftText size='text-3xl'>Guide Complet et Accessible :</MinecraftText> Nos tutoriels sont elabores pour tous les âges et tous les niveaux. 
          Que vous soyez un debutant curieux ou un passionne en quête de perfectionnement, nous avons les 
          ressources qu'il vous faut pour maîtriser l'art de la creation de mods.</li>
          
          <li className='my-10 text-xl'><MinecraftText size='text-3xl'>De l'Installation à l'Action :</MinecraftText> Nous vous guidons à travers tout le processus, depuis l'installation 
          des outils necessaires jusqu'à la mise en oeuvre et le test de votre mod dans Minecraft. 
          Vous n'avez qu'à suivre nos etapes simples et claires pour transformer vos idees en realite !</li>
          
          <li className='my-10 text-xl'><MinecraftText size='text-3xl'>Communaute et Support :</MinecraftText> Chez EasyMod, nous croyons en la puissance de la communaute. 
          Rejoignez notre forum pour echanger avec d'autres createurs, partager vos experiences 
          et obtenir des conseils personnalises. Notre equipe est egalement là pour repondre à vos 
          questions et vous aider à surmonter les obstacles.</li>
          
          <li className='my-10 text-xl'><MinecraftText size='text-3xl'>Inspirations et Creativite :</MinecraftText> Explorez nos tutoriels et projets inspirants pour stimuler
          votre creativite. Nous proposons des idees variees pour vous aider à imaginer et realiser
            des mods qui enrichiront votre experience Minecraft.</li>
          
            <li className='my-10 text-xl'><MinecraftText size='text-3xl'>Mises à Jour et Nouveautes :</MinecraftText> Restez à la pointe des dernières tendances et mises à jour 
          de Minecraft. Nous vous informons des nouveautes pour que vous puissiez adapter vos creations 
          et continuer à innover.</li>
        </ul>
      </TextChat>
    </div>
    </Card>

    <MinecraftButton label="Enregistrez-vous !" onClick={redirectLogin} className='self-center m-auto'></MinecraftButton>


    <Card title="Prêt à commencer ?" className='w-full lg:w-10/12 my-10'>
    <div className='w-full lg:w-1/2 lg:m-auto self-center my-10'>

      <MinecraftText>
        Prêt à commencer ? Plongez dans le monde fascinant de la creation de mods Minecraft avec EasyMod. 
        Explorez nos guides, laissez libre cours à votre imagination, et faites de chaque aventure Minecraft
        une experience unique et personnalisee.
        
        Bienvenue dans votre nouvelle aventure de modding avec EasyMod !
      </MinecraftText>
      </div>
    </Card>
    </div>
  );
};

export default HomePage;
