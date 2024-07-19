import React, { ReactNode } from 'react';
import MusicPopup from '../Popups/MusicPopup';
interface LayoutProps {
  children: ReactNode;
  playMusic: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, playMusic }) => {
  return (
    <>
      <MusicPopup />
      <div>{children}</div>
    </>
  );
};

export default Layout;
