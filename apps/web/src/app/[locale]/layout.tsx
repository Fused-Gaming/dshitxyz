import type { Metadata, Viewport } from 'next';
import { InstallPrompt } from '@/components/InstallPrompt';
import { Providers } from '@/providers';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/config';
import { IntlClientProvider } from 'next-intl';
import config from '@/i18n/config';

export const metadata: Metadata = {
  title: 'dshit.xyz - Meme Commerce & Community',
  description:
    'Decentralized meme commerce platform. Create, vote, and trade memes on Base L2.',
  manifest: '/manifest.json',
  keywords: [
    'meme',
    'defi',
    'cryptocurrency',
    'base',
    'web3',
    'dshit',
    'community',
  ],
  authors: [{ name: 'dshit.xyz' }],
  creator: 'dshit.xyz',
  metadataBase: new URL('https://dshitxyz.vercel.app'),
  openGraph: {
    title: 'dshit.xyz',
    description: 'Decentralized meme commerce platform',
    url: 'https://dshitxyz.vercel.app',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'dshit.xyz',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'dshit.xyz',
    description: 'Decentralized meme commerce platform',
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
  themeColor: '#F4D03F',
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

  const messages = (await import(`@/i18n/locales/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F4D03F" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="dshit.xyz" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body>
        <IntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
          <InstallPrompt />
          <ServiceWorkerRegistration />
        </IntlClientProvider>
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
