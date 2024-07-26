'use client';
import React, { useState } from 'react';
import AwesomeTitle from '@/components/atoms/Texts/Title/AwesomeTitle';
import MinecraftButton from '@/components/atoms/Buttons/MinecraftButton';
import Menu from '@/components/molecules/Menu/Menu';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const Navbar: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleMenu = () => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log('decodedToken:', decodedToken);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Token decode error:', error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }

    setIsMenuVisible(prev => !prev);
  };

  const handleMenuClose = () => {
    setIsMenuVisible(false);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    handleMenuClose();
  };

  const buttons = [
    { label: 'Accueil', route: '/', onClick: handleMenuClose },
    ...(isAuthenticated
      ? [
          {
            label: 'Mon compte',
            buttons: [
              { label: 'Profil', route: '/dashboard/profil', additionalOnClick: handleMenuClose },
              { label: 'Progression', route: '/dashboard//progression', additionalOnClick: handleMenuClose },
              { label: 'Se déconnecter', additionalOnClick: handleLogout }
            ]
          }
        ]
      : [
          {
            label: 'Authentification',
            buttons: [
              { label: 'Connexion', route: '/login', additionalOnClick: handleMenuClose },
              { label: 'S\'enregistrer', route: '/register', additionalOnClick: handleMenuClose }
            ]
          }
        ]
    ),
    { label: 'Retour', onClick: handleMenuClose }
  ];

  return (
    <>
      <div className="absolute w-full h-full">
        <div className="flex flex-wrap flex-col items-center justify-between w-full bg-dirt bg-auto">
          <div className='w-1/4 m-auto'>
            <AwesomeTitle>Craftez votre mod!</AwesomeTitle>
          </div>
          <MinecraftButton
            label="Menu"
            onClick={toggleMenu}
            className="self-center mb-3 z-0"
          />
        </div>

        {isMenuVisible && (
          <div className="fixed inset-0  bg-black bg-opacity-80 flex items-center justify-center z-50">
            <Menu
              buttons={buttons}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
