'use client'

import { Button } from "@/components/ui/button"
import { ArrowRightIcon, PlayIcon } from 'lucide-react'
import { Manrope } from 'next/font/google'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

interface HeroSectionProps {
  onScrollToForm: () => void
  onScrollToProduct: () => void
}

export default function HeroSection({ onScrollToForm, onScrollToProduct }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-6 relative">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-blue-800/10" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-800/20 rounded-full blur-3xl" />
      </div>
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <div className="mb-8 fade-in">
          <div className="inline-flex items-center gap-2 bg-gray-900/80 border border-blue-600/50 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-blue-400 text-sm font-medium">Революция в управлении рисками</span>
          </div>
          
          <h1 className={`text-5xl md:text-7xl font-bold mb-8 ${manrope.className}`}>
            <span className="text-white">
              Все корпоративные риски
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              в одной системе
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            <strong className="text-white">Право (риски)</strong> объединяет все корпоративные риски в одной системе, 
            формирует AI-план действий и превращает решения в задачи с ответственными
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 fade-in delay-1">
          <Button 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg"
            onClick={onScrollToForm}
          >
            Записаться на интервью
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg"
            onClick={onScrollToProduct}
          >
            <PlayIcon className="w-5 h-5 mr-2" />
            Посмотреть демо
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto fade-in delay-2">
          <div className="text-center p-6 border border-gray-800/50 rounded-lg bg-gray-900/20 backdrop-blur-md outline-none transition-all duration-300 hover:scale-105 hover:bg-gray-900/30 hover:backdrop-blur-lg hover:border-blue-600">
            <div className="text-3xl font-bold text-blue-500 mb-2">4-6 недель</div>
            <div className="text-gray-400">MVP-запуск</div>
          </div>
          <div className="text-center p-6 border border-gray-800/50 rounded-lg bg-gray-900/20 backdrop-blur-md outline-none transition-all duration-300 hover:scale-105 hover:bg-gray-900/30 hover:backdrop-blur-lg hover:border-blue-600">
            <div className="text-3xl font-bold text-blue-500 mb-2">AI-powered</div>
            <div className="text-gray-400">Анализ рисков</div>
          </div>
          <div className="text-center p-6 border border-gray-800/50 rounded-lg bg-gray-900/20 backdrop-blur-md outline-none transition-all duration-300 hover:scale-105 hover:bg-gray-900/30 hover:backdrop-blur-lg hover:border-blue-600">
            <div className="text-3xl font-bold text-blue-500 mb-2">100%</div>
            <div className="text-gray-400">Автоматизация</div>
          </div>
        </div>
      </div>
    </section>
  )
} 