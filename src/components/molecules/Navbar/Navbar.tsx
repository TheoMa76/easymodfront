'use client';
import React, { useState } from 'react';
import AwesomeTitle from '@/components/atoms/Texts/Title/AwesomeTitle';
import MinecraftButton from '@/components/atoms/Buttons/MinecraftButton';
import Menu from '@/components/molecules/Menu/Menu';
import Cookies from 'js-cookie';
import {jwtDecode, JwtPayload } from 'jwt-decode';
import { useRouter } from 'next/navigation';

// Define a custom interface for your token payload
interface CustomJwtPayload extends JwtPayload {
  roles: string[]; // Define any additional properties
}

const Navbar: React.FC = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<CustomJwtPayload>(token);
        if (decodedToken.roles.includes('ROLE_ADMIN')) {
          setIsAdmin(true);
        }
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
    router.push('/');
  };

  const buttons = [
    { label: 'Accueil', route: '/', onClick: handleMenuClose },
    ...(isAuthenticated
      ? [
          {
            label: 'Mon compte',
            buttons: [
              { label: 'Profil', route: '/dashboard/profil', additionalOnClick: handleMenuClose },
              { label: 'Se deconnecter', additionalOnClick: handleLogout }
            ]
          },
          ...(isAdmin ? [{ label: 'Administration', buttons: [
            { label: 'Utilisateurs', route: '/administration/user', additionalOnClick: handleMenuClose },
            { label: 'Tutoriels', route: '/administration/tuto', additionalOnClick: handleMenuClose }
          ] }] : []),
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
    { label: 'Tutoriels', route: '/tuto', onClick: handleMenuClose },
    { label: 'Retour', onClick: handleMenuClose }
  ];

  return (
    <>
      <div className="relative w-full">
        <div className="flex flex-wrap sm:flex-col items-center justify-between w-full bg-dirt bg-auto">
          <div className='sm:w-1/4 sm:m-auto'>
            <AwesomeTitle>Craftez votre mod!</AwesomeTitle>
          </div>
          <MinecraftButton
            label="Menu"
            onClick={toggleMenu}
            className="self-center lg:mb-3 z-0"
          />
        </div>

        {isMenuVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
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
