'use client'

import { useState } from 'react'
import { Manrope } from 'next/font/google'
import { capabilities, getCapabilityIcon } from '@/lib/data/capabilities'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export default function CapabilitiesSection() {
  const [activeCard, setActiveCard] = useState(0)

  const nextCard = () => {
    setActiveCard((prev) => (prev + 1) % capabilities.length)
  }

  const prevCard = () => {
    setActiveCard((prev) => (prev - 1 + capabilities.length) % capabilities.length)
  }

  return (
    <section id="capabilities" className="py-12 px-6 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок секции */}
        <div className="text-center mb-8">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 text-white ${manrope.className}`}>
            Возможности платформы
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Комплексное решение для управления всеми типами корпоративных рисков 
            с использованием искусственного интеллекта
          </p>
        </div>

        {/* Интерактивный стек карточек */}
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-5xl h-[280px] flex items-center justify-center">
            {capabilities.map((capability, index) => {
              const isActive = index === activeCard
              const offset = index - activeCard
              const isVisible = Math.abs(offset) <= 2
              
              return (
                <div 
                  key={index}
                  className={`absolute w-[480px] h-52 bg-gradient-to-br from-gray-900/90 to-gray-800/80 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm transition-all duration-700 cursor-pointer group ${
                    isActive 
                      ? 'hover:-translate-y-6 hover:border-gray-600 hover:shadow-xl hover:shadow-gray-900/50 z-30' 
                      : 'hover:-translate-y-2 z-20'
                  }`}
                  style={{
                    transform: `translateX(${offset * 40}px) translateY(${Math.abs(offset) * 10}px) ${isActive ? 'scale(1)' : 'scale(0.95)'}`,
                    opacity: isVisible ? (isActive ? 1 : 0.6) : 0,
                    pointerEvents: isVisible ? 'auto' : 'none',
                    zIndex: 30 - Math.abs(offset) * 5
                  }}
                  onClick={() => setActiveCard(index)}
                >
                  <div className="flex items-start gap-6 h-full">
                    <div className="flex-shrink-0 p-4 bg-gray-800/80 rounded-lg group-hover:bg-gray-700/80 transition-colors duration-300">
                      <div className="text-gray-400 group-hover:text-white transition-colors duration-300">
                        {getCapabilityIcon(capability.iconName)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-xl font-semibold mb-3 text-gray-200 group-hover:text-white transition-colors duration-300 ${manrope.className}`}>
                        {capability.title}
                      </h3>
                      <p className="text-gray-400 text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                        {capability.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Индикатор активности */}
                  <div className="absolute bottom-4 right-4">
                    <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      isActive ? 'bg-blue-500' : 'bg-gray-600 group-hover:bg-blue-400'
                    }`}></div>
                  </div>

                  {/* Эффект свечения при наведении */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"></div>
                </div>
              )
            })}

            {/* Кнопки навигации */}
            <button
              onClick={prevCard}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-800/80 hover:bg-gray-700/80 border border-gray-600/50 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-40"
            >
              <ChevronLeft className="w-6 h-6 text-gray-400 hover:text-white" />
            </button>
            
            <button
              onClick={nextCard}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-800/80 hover:bg-gray-700/80 border border-gray-600/50 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-40"
            >
              <ChevronRight className="w-6 h-6 text-gray-400 hover:text-white" />
            </button>
          </div>
        </div>

        {/* Индикаторы точек */}
        <div className="flex justify-center gap-3">
          {capabilities.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveCard(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeCard 
                  ? 'bg-blue-500 scale-125' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 