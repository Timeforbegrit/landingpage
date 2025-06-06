'use client'

import { useState, useEffect } from 'react'
import { Manrope } from 'next/font/google'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { capabilities, getCapabilityIcon } from '@/lib/data/capabilities'
import { GTMEvents } from '@/lib/gtm'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export default function CapabilitiesSectionMobile() {
  const [activeCapability, setActiveCapability] = useState(0)

  // Отправляем GTM событие просмотра первой возможности при монтировании
  useEffect(() => {
    GTMEvents.viewOpportunitiesSlide(1)
  }, [])

  const handleCapabilityClick = (index: number) => {
    setActiveCapability(index)
    // Отправляем GTM событие просмотра возможности (нумерация с 1)
    GTMEvents.viewOpportunitiesSlide(index + 1)
  }

  const nextCapability = () => {
    const newIndex = (activeCapability + 1) % capabilities.length
    setActiveCapability(newIndex)
    GTMEvents.viewOpportunitiesSlide(newIndex + 1)
  }

  const prevCapability = () => {
    const newIndex = (activeCapability - 1 + capabilities.length) % capabilities.length
    setActiveCapability(newIndex)
    GTMEvents.viewOpportunitiesSlide(newIndex + 1)
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

  // Получаем текущую активную возможность с проверкой
  const currentCapability = capabilities[activeCapability]
  if (!currentCapability) {
    return null
  }

  return (
    <section id="capabilities" className="py-16 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Фоновые эффекты */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
      </div>

      <div className="max-w-md mx-auto relative z-10">
        {/* Заголовок секции */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent ${manrope.className}`}>
            Возможности платформы
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Комплексное решение для управления корпоративных рисков
          </p>
        </div>

        {/* Центральная карточка */}
        <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-6 mb-8 relative overflow-hidden">
          {/* Фоновый эффект */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-purple-600/5" />
          
          <div className="relative z-10">
            {/* Иконка и заголовок */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <div className="text-white">
                  {getCapabilityIcon(currentCapability.iconName)}
                </div>
              </div>
              <div className="flex-1">
                <h3 className={`text-xl font-bold text-white mb-1 ${manrope.className}`}>
                  {currentCapability.title}
                </h3>
                <div className="text-blue-400 text-sm">
                  {activeCapability + 1} из {capabilities.length}
                </div>
              </div>
            </div>

            {/* Описание */}
            <p className="text-gray-300 text-base leading-relaxed mb-6">
              {currentCapability.description}
            </p>

            {/* Метрика */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">
                  {getCapabilityBenefits(activeCapability)?.metric || 'N/A'}
                </div>
                <div className="text-gray-300 text-sm">
                  {getCapabilityBenefits(activeCapability)?.description || 'Описание недоступно'}
                </div>
              </div>
            </div>

            {/* Навигация */}
            <div className="flex items-center justify-between">
              <button
                onClick={prevCapability}
                className="w-12 h-12 bg-gray-800/80 hover:bg-gray-700/80 border border-gray-600/50 hover:border-blue-500/50 rounded-full flex items-center justify-center transition-all duration-300"
                aria-label="Предыдущая возможность"
              >
                <ChevronLeftIcon className="w-5 h-5 text-gray-400" />
              </button>

              {/* Точки навигации */}
              <div className="flex gap-2">
                {capabilities.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleCapabilityClick(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeCapability 
                        ? 'bg-blue-500 scale-125' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextCapability}
                className="w-12 h-12 bg-gray-800/80 hover:bg-gray-700/80 border border-gray-600/50 hover:border-blue-500/50 rounded-full flex items-center justify-center transition-all duration-300"
                aria-label="Следующая возможность"
              >
                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Список всех возможностей */}
        <div className="space-y-3">
          {capabilities.map((capability, index) => (
            <button
              key={index}
              onClick={() => handleCapabilityClick(index)}
              className={`w-full p-4 rounded-xl border transition-all duration-300 text-left ${
                index === activeCapability
                  ? 'bg-blue-500/10 border-blue-500/30 shadow-lg shadow-blue-500/10'
                  : 'bg-gray-800/50 border-gray-700/30 hover:bg-gray-700/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  index === activeCapability
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-gray-700/50 text-gray-400'
                }`}>
                  {getCapabilityIcon(capability.iconName)}
                </div>
                <div className="flex-1">
                  <div className={`font-medium ${
                    index === activeCapability ? 'text-white' : 'text-gray-300'
                  }`}>
                    {capability.title}
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  index === activeCapability ? 'bg-blue-500' : 'bg-gray-600'
                }`} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
} 