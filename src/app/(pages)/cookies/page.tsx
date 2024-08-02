import MinecraftText from '@/components/atoms/Texts/TextBlock/MinecraftText';
import Card from '@/components/molecules/Card/Card';
import React from 'react';

const CookiesPage: React.FC = () => {
  return (
    <div className='flex flex-col justify-center gap-10 lg:mx-10'>
      <Card title="Gestion des cookies" useAwesometitle={true} className='w-full lg:w-10/12 my-10'>
        <div className='w-full lg:w-1/2 lg:m-auto self-center my-10'>
          <Card title="Introduction" className='w-full lg:w-10/12 my-10' bg="bg-stone">
            <MinecraftText className='mt-5 w-full'>
              Sur EasyMod, il n&apos;y a pas beaucoup de cookies. Nous utilisons un cookie pour vous connecter sur notre site. Nous utilisons egalement des cookies tiers pour afficher des videos YouTube sur notre site. En utilisant notre site web, vous acceptez l&apos;utilisation de ces cookies conformement à notre politique de gestion des cookies.
            </MinecraftText>
          </Card>

          <Card title="Qu'est-ce qu'un cookie ?" className='w-full lg:w-10/12 my-10' bg="bg-stone">
            <MinecraftText className='mt-5 w-full'>
              Un cookie est un petit fichier texte stocke sur votre appareil (ordinateur, tablette, smartphone) lorsque vous visitez un site web. Les cookies permettent au site web de se souvenir de vos actions et preferences (comme les informations de connexion et la langue) pendant une periode donnee, afin que vous n&apos;ayez pas à les saisir à chaque fois que vous revenez sur le site ou naviguez d&apos;une page à l&apos;autre.
            </MinecraftText>
          </Card>

          <Card title="Types de cookies que nous utilisons" className='w-full lg:w-10/12 my-10' bg="bg-stone">
            <MinecraftText className='mt-5 w-full'>
              Nous utilisons seulement un cookie sur notre site :
              <strong>Cookie de connexion</strong> : Ce cookie est essentiel pour que notre site web fonctionne correctement. Il permet simplement de se connecter sur notre site.
            </MinecraftText>
          </Card>

          <Card title="Cookies tiers" className='w-full lg:w-10/12 my-10' bg="bg-stone">
            <MinecraftText className='mt-5 w-full'>
              Nous integrons des iframes YouTube sur notre site pour afficher des videos. Ces videos peuvent utiliser des cookies pour fournir des fonctionnalites telles que les recommandations de videos. Vous pouvez consulter la politique de gestion des cookies de YouTube pour plus d&apos;informations sur leurs pratiques.
            </MinecraftText>
          </Card>

          <Card title="Gestion des cookies" className='w-full lg:w-10/12 my-10' bg="bg-stone">
            <MinecraftText className='mt-5 w-full'>
              Vous pouvez gerer les cookies en ajustant les paramètres de votre navigateur. La plupart des navigateurs vous permettent de refuser les cookies ou de les supprimer. Cependant, veuillez noter que la desactivation des cookies peut affecter votre experience sur notre site web et certaines fonctionnalites pourraient ne pas fonctionner correctement.
              Pour Chrome : <a href="https://support.google.com/chrome/answer/95647">Consultez cette page</a>
              Pour Firefox : <a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences">Consultez cette page</a>
              Pour Safari : <a href="https://support.apple.com/en-us/HT201265">Consultez cette page</a>
              Pour Edge : <a href="https://support.microsoft.com/en-us/help/4468242/microsoft-edge-browsing-data-and-privacy">Consultez cette page</a>
            </MinecraftText>
          </Card>

          <Card title="Modifications de notre politique de cookies" className='w-full lg:w-10/12 my-10' bg="bg-stone">
            <MinecraftText className='mt-5 w-full'>
              Nous pouvons mettre à jour notre politique de gestion des cookies de temps à autre pour refleter les changements dans les pratiques ou les exigences legales. Nous vous encourageons à consulter regulièrement cette politique pour être informe des eventuelles modifications.
            </MinecraftText>
          </Card>

          <Card title="Contact" className='w-full lg:w-10/12 my-10' bg="bg-stone">
            <MinecraftText className='mt-5 w-full'>
              Pour toute question concernant notre politique de gestion des cookies, veuillez nous contacter à l&apos;adresse suivante : tmaerten@normandiewebschool.fr.
            </MinecraftText>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default CookiesPage;
