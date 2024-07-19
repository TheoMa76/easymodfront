'use client'
import React from 'react';
import Button from '../../atoms/Buttons/index';
import Input from '../../atoms/Inputs/index';
import { FaHome, FaShoppingBag, FaBullhorn, FaPhone, FaSearch } from 'react-icons/fa';

interface NavbarProps {
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  searchPlaceholder?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  searchPlaceholder = 'Recherche exemple',
}) => {
  return (
    <nav className={`bg-custom-white p-4 flex items-center shadow-lg fixed top-0 w-full z-50`}>
      <div className="flex justify-start flex-1">
        <h1 className="text-2xl">Logo</h1>
      </div>
      <div className="flex justify-center flex-1">
        <Button variant="neutral" label='Accueil' icon={<FaHome />} />
        <Button variant="neutral" label='Produits' icon={<FaShoppingBag />} />
        <Button variant="neutral" label='Promotions' icon={<FaBullhorn />} />
        <Button variant="neutral" label='Contact' icon={<FaPhone />} />
      </div>
      <div className="flex justify-end flex-1">
        <Input variant="neutral" placeholder={searchPlaceholder} icon={<FaSearch />} label={searchPlaceholder} type='search' />
      </div>
    </nav>
  );
};

export default Navbar;
