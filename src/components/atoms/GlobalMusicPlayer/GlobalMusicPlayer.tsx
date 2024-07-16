// components/GlobalMusicPlayer.tsx
'use client'
import { useEffect, useRef } from 'react';

const GlobalMusicPlayer = ({ play }: { play: boolean }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      if (play) {
        audio.play().catch(error => {
          console.log('Error playing audio:', error);
        });

        const handleVisibilityChange = () => {
          if (document.visibilityState === 'hidden') {
            audio.pause();
          } else {
            audio.play().catch(error => {
              console.log('Error resuming audio:', error);
            });
          }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
          document.removeEventListener('visibilitychange', handleVisibilityChange);
          audio.pause();
        };
      } else {
        audio.pause();
      }
    }
  }, [play]);

  return (
    <audio ref={audioRef} src="/music/your-music-file.mp3" loop>
      Your browser does not support the audio element.
    </audio>
  );
};

export default GlobalMusicPlayer;
