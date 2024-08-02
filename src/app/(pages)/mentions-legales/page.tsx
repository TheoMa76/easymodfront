import React from 'react';
import MinecraftText from '@/components/atoms/Texts/TextBlock/MinecraftText';
import Card from '@/components/molecules/Card/Card';

const MentionsLegalesPage: React.FC = () => {
  return (
    <div className='flex flex-col justify-center gap-10 lg:mx-10'>
      <Card title="Mentions Legales" className='w-full lg:w-10/12 my-10'>
        <div className='w-full lg:w-1/2 lg:m-auto self-center my-10'>
          
          <Card title="Introduction" className='w-full lg:w-10/12 my-10' bg="bg-stone">
            <MinecraftText className='mt-5 w-full'>
              Les presentes mentions legales ont pour but d&apos;informer les utilisateurs du site des conditions d&apos;utilisation et des informations legales necessaires conformement à la legislation en vigueur. 
            </MinecraftText>
          </Card>

          <Card title="Identification de l’editeur" className='w-full lg:w-10/12 my-10' bg="bg-stone">
            <MinecraftText className='mt-5 w-full'>
              <strong>Nom de l’editeur :</strong> Theo Maerten
              <strong>Email :</strong> tmaerten@normandiewebschool.fr
            </MinecraftText>
          </Card>

          <Card title="Hebergement" className='w-full lg:w-10/12 my-10' bg="bg-stone">
            <MinecraftText className='mt-5 w-full'>
              <strong>Hebergeur :</strong> OVH
              <strong>Adresse :</strong> https://www.ovhcloud.com/fr/
              <strong>Telephone :</strong> 1007
            </MinecraftText>
          </Card>

          <Card title="Propriete intellectuelle" className='w-full lg:w-10/12 my-10' bg="bg-stone">
            <MinecraftText className='mt-5 w-full'>
              Le contenu du site, incluant mais sans s’y limiter les textes, images, videos, logos, et marques, est la propriete de Theo Maerten ou de ses partenaires et est protege par les lois sur la propriete intellectuelle.
            </MinecraftText>
          </Card>

          <Card title="Responsabilite" className='w-full lg:w-10/12 my-10' bg="bg-stone">
            <MinecraftText className='mt-5 w-full'>
              Le site peut contenir des liens vers d&apos;autres sites web. Nous ne sommes pas responsables du contenu ou de la politique de confidentialite de ces sites tiers.
            </MinecraftText>
          </Card>

          <Card title="Protection des donnees personnelles" className='w-full lg:w-10/12 my-10' bg="bg-stone">
            <MinecraftText className='mt-5 w-full'>
              Nous nous engageons à proteger votre vie privee. Pour plus d&apos;informations sur la gestion de vos donnees personnelles, veuillez consulter notre <a href="/politique-de-confidentialite" className='text-blue-600'>Politique de Confidentialite</a>.
            </MinecraftText>
          </Card>

          <Card title="Modifications des mentions legales" className='w-full lg:w-10/12 my-10' bg="bg-stone">
            <MinecraftText className='mt-5 w-full'>
              Nous nous reservons le droit de modifier les presentes mentions legales à tout moment. Nous vous encourageons à les consulter regulièrement.
            </MinecraftText>
          </Card>

          <Card title="Contact" className='w-full lg:w-10/12 my-10' bg="bg-stone">
            <MinecraftText className='mt-5 w-full'>
              Pour toute question concernant les mentions legales, veuillez nous contacter à l&apos;adresse suivante : <a href="tmaerten@normandiewebschool.fr" className='text-blue-600'>tmaerten@normandiewebschool.fr</a>.
            </MinecraftText>
          </Card>
          
        </div>
      </Card>
    </div>
  );
};

export default MentionsLegalesPage;
