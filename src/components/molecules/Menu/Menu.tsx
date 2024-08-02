'use client';
import React, { useState, useEffect } from 'react';
import MinecraftButton from '@/components/atoms/Buttons/MinecraftButton';
import { useRouter } from 'next/navigation';
import Card from '@/components/molecules/Card/Card';

// Definir les interfaces pour les boutons et les props
interface SubButton {
  label: string;
  route?: string;
  additionalOnClick?: () => void;
}

interface MenuButton {
  label: string;
  route?: string;
  onClick?: () => void;
  buttons?: SubButton[];
  sound?: string;
}

interface MenuProps {
  buttons: MenuButton[];
}

const Menu: React.FC<MenuProps> = ({ buttons }) => {
  const [menuState, setMenuState] = useState<'initial' | 'connected'>('initial');
  const [currentButtons, setCurrentButtons] = useState<MenuButton[]>(buttons);
  const [previousButtons, setPreviousButtons] = useState<MenuButton[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleButtonClick = (button: MenuButton) => {
    if (button.onClick) {
      button.onClick();
    }
    if (button.route && isMounted) {
      router.push(button.route);
    } else if (button.buttons) {
      setPreviousButtons(currentButtons);
      setCurrentButtons(button.buttons.map(subButton => ({
        ...subButton,
        onClick: () => {
          if (subButton.additionalOnClick) {
            subButton.additionalOnClick();
          }
          if (subButton.route && isMounted) {
            router.push(subButton.route);
          }
        }
      })));
      setMenuState('connected');
    } else {
      setMenuState('connected');
    }
  };

  const handleBackClick = () => {
    setCurrentButtons(previousButtons);
    setMenuState('initial');
  };

  return (
    <div className="flex items-center w-full justify-center min-h-screen">
      <Card title="Naviguez où vous voulez!" useAwesometitle={true} className='w-full'>
        <div className="flex flex-col items-center w-fit lg:w-1/4 mb-5">
          {menuState === 'initial' && (
            currentButtons.map((button, index) => (
              <MinecraftButton
                key={index}
                label={button.label}
                onClick={() => handleButtonClick(button)}
                className="w-full mb-4"
                sound={button.sound}
              />
            ))
          )}
          {menuState === 'connected' && (
            <>
              {currentButtons.map((button, index) => (
                <MinecraftButton
                  key={index}
                  label={button.label}
                  onClick={() => handleButtonClick(button)}
                  className="w-full mb-4"
                />
              ))}
              <MinecraftButton
                label="Retour"
                onClick={handleBackClick}
                className="w-full"
              />
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Menu;
