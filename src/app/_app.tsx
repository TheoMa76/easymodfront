// pages/_app.tsx
import type { AppProps } from 'next/app';
import { useState } from 'react';
import Layout from '@/components/atoms/Layout/Layout';
import MusicPopup from '@/components/atoms/Popups/MusicPopup';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [playMusic, setPlayMusic] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  const handleAccept = () => {
    setPlayMusic(true);
    setShowPopup(false);
  };

  const handleDecline = () => {
    setPlayMusic(false);
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <MusicPopup onAccept={handleAccept} onDecline={handleDecline} />
      )}
      <Layout playMusic={playMusic}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
