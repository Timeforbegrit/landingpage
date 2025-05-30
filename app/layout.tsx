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
        url: "data:image/svg+xml,<svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='32' height='32' rx='6' fill='%233b82f6'/><g fill='white'><rect x='7' y='8' width='3' height='16' rx='1'/><rect x='16' y='8' width='3' height='16' rx='1'/><rect x='7' y='8' width='12' height='3' rx='1'/></g><circle cx='23' cy='11' r='2.5' fill='%2360a5fa'/></svg>",
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
        <link rel="icon" href="data:image/svg+xml,<svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'><rect width='32' height='32' rx='6' fill='%233b82f6'/><g fill='white'><rect x='7' y='8' width='3' height='16' rx='1'/><rect x='16' y='8' width='3' height='16' rx='1'/><rect x='7' y='8' width='12' height='3' rx='1'/></g><circle cx='23' cy='11' r='2.5' fill='%2360a5fa'/></svg>" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
      </head>
      <body className={`${inter.className} bg-black bg-dotted-grid`}>{children}</body>
    </html>
  );
}
