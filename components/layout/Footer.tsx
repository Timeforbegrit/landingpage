'use client'

import Link from "next/link"
import Image from "next/image"
import { Manrope } from 'next/font/google'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className={`flex items-center gap-3 mb-4 ${manrope.className}`}>
              <Image 
                src="/images/logo.svg" 
                alt="Право (риски)" 
                width={60}
                height={60}
                className="object-contain"
              />
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              ИИ-платформа для комплексного управления корпоративными рисками. 
              Превращаем хаос в систему, реактивность в проактивность.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Продукт</h3>
            <ul className="space-y-2">
              <li><Link href="#capabilities" className="text-gray-400 hover:text-white transition-colors">Возможности</Link></li>
              <li><Link href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">Как работает</Link></li>
              <li><Link href="#faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Контакты</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">hello@pravorisk.ai</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Право (риски). Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
} 