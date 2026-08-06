import type { Metadata, Viewport } from 'next';
import { InstallPrompt } from '@/components/InstallPrompt';
import { Providers } from '@/providers';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/config';

export const metadata: Metadata = {
  title: 'dshit.xyz | Decentralized Postal Service',
  description:
    'The world\'s first decentralized NFT postal service. Mail Digital Turds to any blockchain wallet on Monad.',
  manifest: '/manifest.json',
  keywords: [
    'nft',
    'postal',
    'monad',
    'crypto',
    'web3',
    'blockchain',
    'mail',
  ],
  authors: [{ name: 'dshit.xyz' }],
  creator: 'dshit.xyz',
  metadataBase: new URL('https://dshit.xyz'),
  openGraph: {
    title: 'dshit.xyz',
    description: 'The world\'s first decentralized NFT postal service',
    url: 'https://dshit.xyz',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'dshit.xyz - Postal Service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'dshit.xyz',
    description: 'Decentralized NFT postal service on Monad',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'dshit.xyz',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#09090B',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#09090B" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="dshit.xyz" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body>
        <Providers>{children}</Providers>
        <InstallPrompt />
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}

function ServiceWorkerRegistration() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js').then(
                function(registration) {
                  console.log('SW registered:', registration);
                },
                function(err) {
                  console.log('SW registration failed:', err);
                }
              );
            });
          }
        `,
      }}
    />
  );
}
