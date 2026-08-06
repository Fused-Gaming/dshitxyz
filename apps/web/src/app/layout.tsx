import type { ReactNode } from 'react';
import './globals.css';
import { Navigation } from '@/components/layout/Navigation';

export const metadata = {
  title: 'dshit.xyz | Decentralized Postal Service',
  description:
    'The world\'s first decentralized NFT postal service. Mail Digital Turds to any blockchain wallet on Monad.',
  openGraph: {
    title: 'dshit.xyz | Decentralized Postal Service',
    description: 'Mail Digital Turds on Monad',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#09090B" />
      </head>
      <body>
        <Navigation />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
