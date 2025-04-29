'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  fonts: string; // pass font classes
};

export default function BodyWrapper({ children, fonts }: Props) {
  const pathname = usePathname();

  const isLoginPage = pathname === '/login';
  const bodyClass = `${fonts} antialiased ${isLoginPage ? 'login' : 'app'}`;
  return <body className='__className_ad50fd'>{children}</body>;
  // return <body className={bodyClass}>{children}</body>;
}
