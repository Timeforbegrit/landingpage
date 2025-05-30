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
  title: "Право (риски) - Управление корпоративными рисками",
  description: "Комплексная система управления корпоративными рисками с AI-анализом. Объединяем все риски в одной платформе, формируем планы действий и автоматизируем процессы.",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon.ico",
        type: "image/x-icon",
        sizes: "16x16"
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
  keywords: ["управление рисками", "корпоративные риски", "AI анализ", "автоматизация", "комплаенс", "право"],
  authors: [{ name: "Право (риски)" }],
  openGraph: {
    title: "Право (риски) - Управление корпоративными рисками",
    description: "Комплексная система управления корпоративными рисками с AI-анализом",
    url: "https://pravo-riski.vercel.app",
    siteName: "Право (риски)",
    images: [
      {
        url: "/images/logo.png",
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
    title: "Право (риски) - Управление корпоративными рисками",
    description: "Комплексная система управления корпоративными рисками с AI-анализом",
    images: ["/images/logo.png"],
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
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={`${inter.className} bg-black bg-dotted-grid`}>{children}</body>
    </html>
  );
}
