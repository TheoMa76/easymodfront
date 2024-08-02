'use client';

import {
  getLocalStorage,
  setLocalStorage,
} from '@/lib/helpers/localStorageHelper';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import MinecraftButton from '../Buttons/MinecraftButton';

const CookieBanner = () => {
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const storedCookieConsent = getLocalStorage('cookie_consent', null);
    setCookieConsent(storedCookieConsent);
  }, []);

  useEffect(() => {
    if (cookieConsent !== null) {
      setLocalStorage('cookie_consent', cookieConsent);
      console.log('Cookie Consent: ', cookieConsent);
    }
  }, [cookieConsent]);

  return (
    <div
      className={`${
        cookieConsent === true
          ? 'hidden'
          : 'minecraftText text-white flex flex-col fixed inset-x-0 bottom-0 z-20 justify-between gap-x-8 gap-y-4 bg-deepslate border-t border-secondary p-6 ring-1 md:flex-row md:items-center lg:px-8 xs:block'
      }`}
    >
      <p className="max-w-4xl text-sm leading-6 text-foreground">
        Ce site utilise des cookies pour des fonctionnalites essentielles. En
        continuant à utiliser ce site, vous consentez à notre utilisation des
        cookies. En savoir plus dans notre{' '}
        <Link className="font-semibold text-secondary" href="/cookies">
          politique de cookies
        </Link>
      </p>
<div className="flex gap-2">
        <div className="mr-16 flex flex-none items-center gap-x-5">
          <MinecraftButton
            onClick={() => setCookieConsent(true)}
            type="button"
            label="Accepter"
          />
          <MinecraftButton
            onClick={() => setCookieConsent(false)}
            type="button"
            label="Refuser"
          />
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;