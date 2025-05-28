'use client'

import Link from "next/link"
import { GlobeIcon, FileTextIcon } from 'lucide-react'
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
              <img 
                src="/images/logo.png" 
                alt="Право (риски)" 
                className="w-10 h-10 object-contain scale-150"
              />
              <span className="text-xl font-bold text-white">Право (риски)</span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              AI-платформа для комплексного управления корпоративными рисками. 
              Превращаем хаос в систему, реактивность в проактивность.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                <GlobeIcon className="w-5 h-5 text-gray-400" />
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                <FileTextIcon className="w-5 h-5 text-gray-400" />
              </div>
            </div>
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
              <li className="text-gray-400">+7 (495) 123-45-67</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Право (риски). Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
} 