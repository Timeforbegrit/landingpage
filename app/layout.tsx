import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  style: ['normal'],
})

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://pravo-riski.vercel.app'),
  title: "Управление корпоративными рисками",
  description: "Комплексная система управления корпоративными рисками с ИИ-анализом. Объединяем все риски в одной платформе, формируем планы действий и автоматизируем процессы.",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "data:image/svg+xml,<svg width='32' height='32' viewBox='0 0 127 127' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='63.2479' cy='63.2479' r='63.2479' fill='%232463EB'/><path d='M105.666 63.4958C105.666 67.4148 105.288 71.2395 104.533 74.9696C103.777 78.6998 102.609 82.2411 101.027 85.5936C99.4685 88.946 97.4618 92.0387 95.0065 94.8718H87.8531C90.0723 91.8735 91.9374 88.6627 93.4483 85.2394C94.9593 81.8162 96.0925 78.2631 96.848 74.5801C97.6035 70.8971 97.9812 67.1788 97.9812 63.425C97.9812 59.6004 97.5916 55.823 96.8126 52.0928C96.0571 48.3626 94.9239 44.7741 93.4129 41.3272C91.9019 37.8567 90.0251 34.6223 87.7822 31.624H95.0065C97.4618 34.5279 99.4685 37.6915 101.027 41.1147C102.609 44.538 103.777 48.1383 104.533 51.9157C105.288 55.6695 105.666 59.5295 105.666 63.4958Z' fill='white'/><path d='M21.082 63.5312C21.082 59.5649 21.4598 55.6931 22.2152 51.9157C22.9943 48.1383 24.1748 44.538 25.7566 41.1147C27.3383 37.6915 29.3333 34.5279 31.7414 31.624H39.0011C35.625 36.1333 33.0753 41.1265 31.3518 46.6038C29.652 52.081 28.8021 57.6999 28.8021 63.4604C28.8021 67.2142 29.1798 70.9325 29.9353 74.6155C30.6908 78.2985 31.824 81.8398 33.335 85.2394C34.8459 88.6627 36.711 91.8735 38.9302 94.8718H31.7414C29.3333 92.0387 27.3383 88.946 25.7566 85.5936C24.1748 82.2411 22.9943 78.6998 22.2152 74.9696C21.4598 71.2395 21.082 67.4267 21.082 63.5312Z' fill='white'/></svg>",
        type: "image/svg+xml",
      }
    ],
    apple: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
        sizes: "180x180"
      }
    ],
    shortcut: [{ url: "/favicon.svg" }],
  },
  manifest: "/manifest.json",
  keywords: ["управление рисками", "корпоративные риски", "ИИ анализ", "автоматизация", "комплаенс", "право"],
  authors: [{ name: "Право (риски)" }],
  openGraph: {
    title: "Управление корпоративными рисками",
    description: "Комплексная система управления корпоративными рисками с ИИ-анализом",
    url: "https://pravo-riski.vercel.app",
    siteName: "Право (риски)",
    images: [
      {
        url: "/images/logo.svg",
        width: 1200,
        height: 630,
        alt: "Право (риски) - Система управления рисками",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Управление корпоративными рисками",
    description: "Комплексная система управления корпоративными рисками с ИИ-анализом",
    images: ["/images/logo.svg"],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="dark">
      <head>
        {/* Инициализация переменных перед GTM */}
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            
            // Заглушки для внешних сервисов
            window.ym = window.ym || function(){
              console.log('Yandex.Metrica not loaded, call ignored:', arguments);
            };
            
            // Заглушка для jQuery
            if (typeof window.$ === 'undefined') {
              window.$ = function() {
                console.log('jQuery not loaded, call ignored:', arguments);
                return {
                  ready: function(fn) { if (typeof fn === 'function') fn(); },
                  on: function() { return this; },
                  off: function() { return this; },
                  click: function() { return this; },
                  length: 0
                };
              };
            }
            
            // Заглушка для VK API
            if (typeof window.VK === 'undefined') {
              window.VK = {
                init: function() { console.log('VK API not loaded'); },
                Api: {
                  call: function() { console.log('VK API call ignored'); }
                }
              };
            }
            
            // Заглушка для yaglaaction
            if (typeof window.yaglaaction === 'undefined') {
              window.yaglaaction = function() {
                console.log('yaglaaction not loaded, call ignored:', arguments);
              };
            }
            
            console.log('✅ Заглушки инициализированы до загрузки GTM');
          `
        }} />
        
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TGMTCK6');`
        }} />
        {/* End Google Tag Manager */}
        
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" href="data:image/svg+xml,<svg width='32' height='32' viewBox='0 0 127 127' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='63.2479' cy='63.2479' r='63.2479' fill='%232463EB'/><path d='M105.666 63.4958C105.666 67.4148 105.288 71.2395 104.533 74.9696C103.777 78.6998 102.609 82.2411 101.027 85.5936C99.4685 88.946 97.4618 92.0387 95.0065 94.8718H87.8531C90.0723 91.8735 91.9374 88.6627 93.4483 85.2394C94.9593 81.8162 96.0925 78.2631 96.848 74.5801C97.6035 70.8971 97.9812 67.1788 97.9812 63.425C97.9812 59.6004 97.5916 55.823 96.8126 52.0928C96.0571 48.3626 94.9239 44.7741 93.4129 41.3272C91.9019 37.8567 90.0251 34.6223 87.7822 31.624H95.0065C97.4618 34.5279 99.4685 37.6915 101.027 41.1147C102.609 44.538 103.777 48.1383 104.533 51.9157C105.288 55.6695 105.666 59.5295 105.666 63.4958Z' fill='white'/><path d='M21.082 63.5312C21.082 59.5649 21.4598 55.6931 22.2152 51.9157C22.9943 48.1383 24.1748 44.538 25.7566 41.1147C27.3383 37.6915 29.3333 34.5279 31.7414 31.624H39.0011C35.625 36.1333 33.0753 41.1265 31.3518 46.6038C29.652 52.081 28.8021 57.6999 28.8021 63.4604C28.8021 67.2142 29.1798 70.9325 29.9353 74.6155C30.6908 78.2985 31.824 81.8398 33.335 85.2394C34.8459 88.6627 36.711 91.8735 38.9302 94.8718H31.7414C29.3333 92.0387 27.3383 88.946 25.7566 85.5936C24.1748 82.2411 22.9943 78.6998 22.2152 74.9696C21.4598 71.2395 21.082 67.4267 21.082 63.5312Z' fill='white'/></svg>" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
      </head>
      <body className={`${inter.className} bg-black bg-dotted-grid`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-TGMTCK6"
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        {children}
      </body>
    </html>
  );
}
