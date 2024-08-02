import React from 'react';
import MinecraftText from '@/components/atoms/Texts/TextBlock/MinecraftText';
import Card from '@/components/molecules/Card/Card';

const PolitiqueConfidentialitePage: React.FC = () => {
  return (
    <div className='flex flex-col justify-center gap-10 lg:mx-10'>
      <Card title="Politique de Confidentialite" useAwesometitle={true} className='w-full lg:w-10/12 my-10'>
        <div className='w-full lg:w-1/2 lg:m-auto self-center my-10'>
          
          <Card title="Introduction" className='w-full lg:w-10/12 my-10' bg="bg-stone">
            <MinecraftText className='mt-5 w-full'>
              Cette politique de confidentialite decrit comment nous collectons, utilisons et protegeons vos donnees personnelles lorsque vous utilisez notre site web. Nous nous engageons à respecter votre vie privee et à proteger vos informations personnelles.
            </MinecraftText>
          </Card>

          <Card title="Informations que nous collectons" className='w-full lg:w-10/12 my-10' bg="bg-stone">
            <MinecraftText className='mt-5 w-full'>

                Les informations que vous nous fournissez directement, comme votre adresse email lorsque vous remplissez un formulaire sont stocker.
                Les donnees de navigation telles que les adresses IP, les pages que vous consultez, et la duree de vos visites ne sont pas stocker.
                Les informations collectees par les cookies, comme decrit dans notre <a href="/gestion-des-cookies" className='text-blue-600'>Politique de Gestion des Cookies</a>.
            </MinecraftText>
          </Card>

          <Card title="Utilisation des informations" className='w-full lg:w-10/12 my-10' bg="bg-stone">
            <MinecraftText className='mt-5 w-full'>
              Nous n&apos;utilisons pas vos informations personnelles. Seulement votre mail pour vous connecter et repondre à la demande de mot de passe oublie.

            </MinecraftText>
          </Card>

          <Card title="Partage des informations" className='w-full lg:w-10/12 my-10' bg="bg-stone">
            <MinecraftText className='mt-5 w-full'>
             Nous ne partageons pas vos donnees avec des sites tiers.
            </MinecraftText>
          </Card>

          <Card title="Securite des donnees" className='w-full lg:w-10/12 my-10' bg="bg-stone">
            <MinecraftText className='mt-5 w-full'>
              Nous prenons des mesures de securite appropriees pour proteger vos informations contre l&apos;accès non autorise, la divulgation, l&apos;alteration ou la destruction. Cependant, aucun système de securite n&apos;est infaillible, et nous ne pouvons garantir une securite absolue.
            </MinecraftText>
          </Card>

          <Card title="Vos droits" className='w-full lg:w-10/12 my-10' bg="bg-stone">
            <MinecraftText className='mt-5 w-full'>
              Vous avez le droit de :
                Acceder à vos informations personnelles et demander des copies.
                Demander la correction ou la suppression de vos informations personnelles.
              Pour exercer ces droits, veuillez nous contacter à l’adresse suivante : <a href="tmaerten@normandiewebschool.fr" className='text-blue-600'>tmaerten@normandiewebschool.fr</a>.
            </MinecraftText>
          </Card>

          <Card title="Modifications de notre politique de confidentialite" className='w-full lg:w-10/12 my-10' bg="bg-stone">
            <MinecraftText className='mt-5 w-full'>
              Nous pouvons mettre à jour cette politique de confidentialite de temps à autre pour refleter les changements dans nos pratiques ou les exigences legales. Nous vous encourageons à consulter regulièrement cette page pour rester informe des eventuelles modifications.
            </MinecraftText>
          </Card>

          <Card title="Contact" className='w-full lg:w-10/12 my-10' bg="bg-stone">
            <MinecraftText className='mt-5 w-full'>
              Si vous avez des questions concernant cette politique de confidentialite, veuillez nous contacter à l’adresse suivante : <a href="tmaerten@normandiewebschool.fr" className='text-blue-600'>tmaerten@normandiewebschool.fr</a>.
            </MinecraftText>
          </Card>

        </div>
      </Card>
    </div>
  );
};

export default PolitiqueConfidentialitePage;
