'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Manrope } from 'next/font/google'
import { MenuIcon, XIcon } from 'lucide-react'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

interface HeaderProps {
  onScrollToForm: () => void
  smoothScrollTo: (elementId: string) => void
}

export default function Header({ onScrollToForm, smoothScrollTo }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleNavClick = (elementId: string) => {
    smoothScrollTo(elementId)
    setIsMenuOpen(false) // Закрываем меню после клика
  }

  const handleGetAccess = () => {
    onScrollToForm()
    setIsMenuOpen(false) // Закрываем меню если открыто
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          {/* Left - Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className={`flex items-center gap-3 ${manrope.className}`}>
              <Image 
                src="/images/logo.svg" 
                alt="Право (риски)" 
                width={120}
                height={40}
                className="object-contain"
              />
            </Link>
          </div>
          
          {/* Center - Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
            <button 
              onClick={(e) => { e.preventDefault(); smoothScrollTo('product'); }} 
              className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer bg-transparent border-none relative group"
            >
              Продукт
              <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
              onClick={(e) => { e.preventDefault(); smoothScrollTo('capabilities'); }} 
              className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer bg-transparent border-none relative group"
            >
              Возможности
              <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
              onClick={(e) => { e.preventDefault(); smoothScrollTo('faq'); }} 
              className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer bg-transparent border-none relative group"
            >
              FAQ
              <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
          </nav>
          
          {/* Right - Desktop CTA Button and Mobile Menu Button */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Desktop CTA Button */}
            <button
              onClick={handleGetAccess}
              type="button"
              className="hidden md:block px-6 py-2 bg-blue-600 text-white rounded-lg font-medium cursor-pointer relative z-10"
            >
              Получить доступ
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              type="button"
              className="md:hidden text-gray-300 hover:text-white transition-colors p-2"
              aria-label="Открыть меню"
            >
              {isMenuOpen ? (
                <XIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <nav className="py-4 border-t border-gray-700/50">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={(e) => { e.preventDefault(); handleNavClick('product'); }} 
                className="text-gray-300 hover:text-white transition-colors text-left py-2 px-4 rounded-lg hover:bg-gray-800/50"
                type="button"
              >
                Продукт
              </button>
              <button 
                onClick={(e) => { e.preventDefault(); handleNavClick('capabilities'); }} 
                className="text-gray-300 hover:text-white transition-colors text-left py-2 px-4 rounded-lg hover:bg-gray-800/50"
                type="button"
              >
                Возможности
              </button>
              <button 
                onClick={(e) => { e.preventDefault(); handleNavClick('faq'); }} 
                className="text-gray-300 hover:text-white transition-colors text-left py-2 px-4 rounded-lg hover:bg-gray-800/50"
                type="button"
              >
                FAQ
              </button>
              
              {/* Mobile CTA Button */}
              <button 
                onClick={handleGetAccess}
                className="text-left py-3 px-4 bg-blue-600 text-white rounded-lg font-medium cursor-pointer mt-2"
                type="button"
              >
                Получить доступ
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
} 