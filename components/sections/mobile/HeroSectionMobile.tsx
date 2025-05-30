'use client'

import { Button } from "@/components/ui/button"
import { ArrowRightIcon, PlayIcon } from 'lucide-react'
import { Manrope } from 'next/font/google'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

interface HeroSectionMobileProps {
  onScrollToForm: () => void
  onScrollToProduct: () => void
}

export default function HeroSectionMobile({ onScrollToForm, onScrollToProduct }: HeroSectionMobileProps) {
  return (
    <section className="min-h-screen flex items-center justify-center py-12 px-4 relative">
      {/* Упрощенные фоновые эффекты */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-blue-800/5" />
        <div className="absolute top-20 left-10 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-56 h-56 bg-blue-800/10 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-md mx-auto text-center relative z-10 w-full">
        <div className="mb-8 fade-in">
          <h1 className={`text-2xl font-bold mb-6 leading-tight ${manrope.className}`}>
            <span className="text-white">
              Все корпоративные риски
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              в одной системе
            </span>
          </h1>
          
          <p className="text-base text-gray-300 mb-8 leading-relaxed px-2">
            <strong className="text-white">Право (риски)</strong> объединяет все корпоративные риски в одной системе, 
            формирует AI-план действий и превращает решения в задачи с ответственными
          </p>
        </div>

        {/* Кнопки - увеличенные */}
        <div className="flex flex-col gap-3 mb-10 fade-in delay-1 px-4">
          <Button 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-base w-full"
            onClick={onScrollToForm}
          >
            Получить доступ
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-4 rounded-lg font-semibold text-base w-full"
            onClick={onScrollToProduct}
          >
            <PlayIcon className="w-5 h-5 mr-2" />
            Посмотреть демо
          </Button>
        </div>

        {/* Увеличенные карточки статистики */}
        <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto fade-in delay-2">
          <div className="text-center p-4 border border-gray-800/50 rounded-lg bg-gray-900/20 backdrop-blur-md transition-all duration-300 hover:bg-gray-900/30 hover:border-blue-600/50">
            <div className="text-xl font-bold text-blue-500 mb-1">4-6 недель</div>
            <div className="text-gray-400 text-sm">Тестовая версия</div>
          </div>
          <div className="text-center p-4 border border-gray-800/50 rounded-lg bg-gray-900/20 backdrop-blur-md transition-all duration-300 hover:bg-gray-900/30 hover:border-blue-600/50">
            <div className="text-xl font-bold text-blue-500 mb-1">С ИИ-поиском</div>
            <div className="text-gray-400 text-sm">Анализ рисков</div>
          </div>
          <div className="text-center p-4 border border-gray-800/50 rounded-lg bg-gray-900/20 backdrop-blur-md transition-all duration-300 hover:bg-gray-900/30 hover:border-blue-600/50">
            <div className="text-xl font-bold text-blue-500 mb-1">100%</div>
            <div className="text-gray-400 text-sm">Автоматизация</div>
          </div>
        </div>
      </div>
    </section>
  )
} 