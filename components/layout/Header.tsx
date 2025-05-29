'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Manrope } from 'next/font/google'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

interface HeaderProps {
  onScrollToForm: () => void
}

export default function Header({ onScrollToForm }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex w-full items-center justify-between py-4 px-6">
        <Link href="/" className={`flex items-center gap-3 ${manrope.className}`}>
          <img 
            src="/images/logo.png" 
            alt="Право (риски)" 
            className="w-10 h-10 object-contain"
            style={{ 
              transform: 'scale(2)'
            }}
          />
        </Link>
        <nav className="hidden md:flex flex-1 justify-center items-center gap-8">
          <Link href="#product" className="text-gray-300 hover:text-white transition-colors">Продукт</Link>
          <Link href="#capabilities" className="text-gray-300 hover:text-white transition-colors">Возможности</Link>
          <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">Как работает</Link>
          <Link href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link>
        </nav>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
          onClick={onScrollToForm}
        >
          Получить доступ
        </Button>
      </div>
    </header>
  )
} 