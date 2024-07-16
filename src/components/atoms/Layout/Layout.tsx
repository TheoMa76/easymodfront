import React, { ReactNode } from 'react';
import GlobalMusicPlayer from '../GlobalMusicPlayer/GlobalMusicPlayer';
interface LayoutProps {
  children: ReactNode;
  playMusic: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, playMusic }) => {
  return (
    <>
      <GlobalMusicPlayer play={playMusic} />
      <div>{children}</div>
    </>
  );
};

export default Layout;
