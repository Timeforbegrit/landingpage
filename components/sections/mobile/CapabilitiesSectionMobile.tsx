'use client'

import { useState } from 'react'
import { Manrope } from 'next/font/google'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { capabilities, getCapabilityIcon } from '@/lib/data/capabilities'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export default function CapabilitiesSectionMobile() {
  const [activeCapability, setActiveCapability] = useState(0)

  const nextCapability = () => {
    setActiveCapability((prev) => (prev + 1) % capabilities.length)
  }

  const prevCapability = () => {
    setActiveCapability((prev) => (prev - 1 + capabilities.length) % capabilities.length)
  }

  // Преимущества для каждой возможности
  const getCapabilityBenefits = (index: number) => {
    const benefits = [
      { metric: "90%", description: "экономия времени на анализе" },
      { metric: "100%", description: "покрытие всех типов рисков" },
      { metric: "80%", description: "сокращение ручной работы" },
      { metric: "24/7", description: "мониторинг и аналитика" },
      { metric: "99.9%", description: "надежность и безопасность" },
      { metric: "5x", description: "улучшение коммуникации" }
    ]
    return benefits[index] || benefits[0]
  }

  return (
    <section id="capabilities" className="py-12 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Фоновые эффекты */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
      </div>

      <div className="max-w-lg mx-auto relative z-10">
        {/* Заголовок секции */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent ${manrope.className}`}>
            Возможности платформы
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Комплексное решение для управления всеми типами корпоративных рисков
          </p>
        </div>

        {/* Основная карточка возможности */}
        <div className="relative mb-6">
          {/* Карточка */}
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6 mx-4 relative overflow-hidden min-h-[320px]">
            
            {/* Фоновый эффект */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-purple-600/5" />
            
            <div className="relative z-10 text-center">
              {/* Иконка */}
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <div className="text-white scale-150">
                    {getCapabilityIcon(capabilities[activeCapability].iconName)}
                  </div>
                </div>
              </div>
              
              {/* Номер и заголовок */}
              <div className="mb-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                    <span className="text-blue-400 text-sm font-bold">{activeCapability + 1}</span>
                  </div>
                  <div className="w-8 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                  <div className="text-blue-400 text-sm font-medium">{capabilities.length}</div>
                </div>
                
                <h3 className={`text-2xl font-bold text-white mb-3 ${manrope.className}`}>
                  {capabilities[activeCapability].title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed text-base">
                  {capabilities[activeCapability].description}
                </p>
              </div>

              {/* Метрика */}
              <div className="pt-6 border-t border-gray-700/50">
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4">
                  <div className="text-3xl font-bold text-blue-400 mb-1">
                    {getCapabilityBenefits(activeCapability).metric}
                  </div>
                  <div className="text-sm text-gray-300">
                    {getCapabilityBenefits(activeCapability).description}
                  </div>
                </div>
              </div>

              {/* Дополнительные детали */}
              <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <div className="text-gray-400 mb-1">Статус</div>
                  <div className="text-green-400 font-medium flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    Активно
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <div className="text-gray-400 mb-1">Интеграция</div>
                  <div className="text-blue-400 font-medium">Ready</div>
                </div>
              </div>
            </div>
          </div>

          {/* Навигация под карточкой */}
          <div className="flex items-center justify-between px-4 mt-4">
            <button
              onClick={prevCapability}
              className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-600/50 transition-all duration-200"
              aria-label="Предыдущая возможность"
            >
              <ChevronLeftIcon className="w-4 h-4 text-gray-300" />
              <span className="text-sm text-gray-300">Назад</span>
            </button>
            
            <div className="flex gap-1">
              {capabilities.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCapability(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeCapability
                      ? 'bg-blue-500 w-4'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextCapability}
              className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-600/50 transition-all duration-200"
              aria-label="Следующая возможность"
            >
              <span className="text-sm text-gray-300">Далее</span>
              <ChevronRightIcon className="w-4 h-4 text-gray-300" />
            </button>
          </div>
        </div>

        {/* Мини-превью следующих карточек */}
        <div className="mt-8 px-4">
          <div className="text-center text-gray-400 text-sm mb-4">Следующие возможности</div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {capabilities.map((capability, index) => {
              if (index === activeCapability) return null
              
              return (
                <button
                  key={index}
                  onClick={() => setActiveCapability(index)}
                  className="flex-shrink-0 bg-gray-800/50 border border-gray-700/50 rounded-xl p-3 hover:bg-gray-700/50 transition-all duration-300 min-w-[120px]"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <div className="text-gray-300 scale-75">
                      {getCapabilityIcon(capability.iconName)}
                    </div>
                  </div>
                  <div className="text-gray-300 text-xs font-medium text-center">
                    {capability.title}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
} 