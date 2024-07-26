'use client';
import React, { useState } from 'react';
import AwesomeTitle from '@/components/atoms/Texts/Title/AwesomeTitle';
import MinecraftButton from '@/components/atoms/Buttons/MinecraftButton';
import Menu from '@/components/molecules/Menu/Menu';

const Navbar: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(prev => !prev);
  };

  const handleMenuClose = () => {
    setIsMenuVisible(false);
  };

  return (
    <>
      <div className="relative">
        <div className="flex flex-wrap flex-col items-center justify-between gap-4 w-full bg-dirt">
            <div className='w-1/4 m-auto'>
            <AwesomeTitle>Craftez votre mod!</AwesomeTitle>
            </div>
            <div className='mb-5'>
              <MinecraftButton
                label="Menu"
                onClick={toggleMenu}
                className="self-center"
              />
            </div>
          </div>

        {/* Menu Overlay */}
        {isMenuVisible && (
          <div className="fixed inset-0  bg-black bg-opacity-80 flex items-center justify-center z-50">
            <Menu
              buttons={[
                { label: 'Accueil', route: '/',onClick: handleMenuClose },
                { label: 'Tutoriels', route: '/tuto',onClick: handleMenuClose },
                {
                  label: 'Authentification',
                  buttons: [
                    { label: 'Connexion', route: '/login', additionalOnClick: handleMenuClose },
                    { label: 'S\'enregistrer', route: '/register', additionalOnClick: handleMenuClose }
                  ]
                },
                { label: 'Retour', onClick: handleMenuClose }
              ]}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
