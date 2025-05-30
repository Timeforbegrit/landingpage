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

export default function CapabilitiesSection() {
  const [activeCapability, setActiveCapability] = useState(0)

  const handleCapabilityClick = (index: number) => {
    setActiveCapability(index)
  }

  // Функции для стрелочек
  const nextCapability = () => {
    setActiveCapability((prev) => (prev + 1) % capabilities.length)
  }

  const prevCapability = () => {
    setActiveCapability((prev) => (prev - 1 + capabilities.length) % capabilities.length)
  }

  // Рассчитываем позиции для орбитальных элементов
  const getOrbitalPosition = (index: number, radius: number = 180) => {
    const angle = (index * 360) / capabilities.length - 90 // Начинаем сверху
    const radian = (angle * Math.PI) / 180
    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius,
      angle
    }
  }

  // Преимущества для каждой возможности
  const getCapabilityBenefits = (index: number) => {
    const benefits = [
      { time: "90%", description: "экономия времени на анализе" },
      { time: "100%", description: "покрытие всех типов рисков" },
      { time: "80%", description: "сокращение ручной работы" },
      { time: "24/7", description: "мониторинг и аналитика" },
      { time: "99.9%", description: "надежность и безопасность" },
      { time: "5x", description: "улучшение коммуникации" }
    ]
    return benefits[index] || benefits[0]
  }

  return (
    <section id="capabilities" className="py-20 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Фоновые эффекты */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.3)_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent ${manrope.className}`}>
            Возможности платформы
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Комплексное решение для управления всеми типами корпоративных рисков 
            с использованием искусственного интеллекта
          </p>
        </div>

        {/* Основная радиальная структура */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Орбитальная диаграмма */}
          <div className="relative flex-1 flex justify-center">
            <div className="relative w-[500px] h-[500px] flex items-center justify-center">
              
              {/* Центральный элемент */}
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50 border-4 border-blue-400/30 relative overflow-hidden group">
                  {/* Анимированный фон */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-400/20 to-blue-600/0 -skew-y-12 group-hover:animate-spin" />
                  
                  {/* Иконка активной возможности */}
                  <div className="relative z-10 text-white transform group-hover:scale-110 transition-transform duration-300">
                    {getCapabilityIcon(capabilities[activeCapability].iconName)}
                  </div>
                  
                  {/* Пульсирующий эффект */}
                  <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping" />
                  <div className="absolute inset-2 rounded-full bg-blue-400/20 animate-ping" style={{animationDelay: '0.5s'}} />
                </div>

                {/* Стрелочки навигации около центрального кружочка */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {/* Левая стрелочка */}
                  <button
                    onClick={prevCapability}
                    className="absolute -left-20 w-12 h-12 bg-gray-800/80 hover:bg-gray-700/80 border border-gray-600/50 hover:border-blue-500/50 rounded-full flex items-center justify-center transition-all duration-300 group backdrop-blur-sm pointer-events-auto"
                    aria-label="Предыдущая возможность"
                  >
                    <ChevronLeftIcon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                  </button>

                  {/* Правая стрелочка */}
                  <button
                    onClick={nextCapability}
                    className="absolute -right-20 w-12 h-12 bg-gray-800/80 hover:bg-gray-700/80 border border-gray-600/50 hover:border-blue-500/50 rounded-full flex items-center justify-center transition-all duration-300 group backdrop-blur-sm pointer-events-auto"
                    aria-label="Следующая возможность"
                  >
                    <ChevronRightIcon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                  </button>
                </div>
              </div>

              {/* Орбитальные кольца */}
              <div className="absolute inset-0 z-10">
                {/* Внешнее кольцо */}
                <div className="absolute inset-8 border border-gray-600/30 rounded-full" />
                <div className="absolute inset-12 border border-gray-600/20 rounded-full" />
                <div className="absolute inset-16 border border-gray-600/10 rounded-full" />
              </div>

              {/* Орбитальные элементы возможностей */}
              {capabilities.map((capability, index) => {
                const position = getOrbitalPosition(index, 180)
                const isActive = index === activeCapability
                
                return (
                  <div
                    key={index}
                    className="absolute transition-all duration-700 ease-out cursor-pointer group z-30"
                    style={{
                      transform: `translate(${position.x}px, ${position.y}px)`,
                      left: '50%',
                      top: '50%',
                      marginLeft: '-40px',
                      marginTop: '-40px'
                    }}
                    onClick={() => handleCapabilityClick(index)}
                  >
                    {/* Соединительная линия */}
                    <div 
                      className={`absolute w-0.5 origin-bottom transition-all duration-500 pointer-events-none ${
                        isActive ? 'bg-gradient-to-t from-blue-500 to-blue-300 h-20' : 'bg-gray-600/50 h-16'
                      }`}
                      style={{
                        transform: `rotate(${position.angle + 90}deg)`,
                        transformOrigin: 'bottom center',
                        bottom: '50%',
                        left: '50%',
                        marginLeft: '-1px'
                      }}
                    />
                    
                    {/* Орбитальный элемент */}
                    <div className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isActive 
                        ? 'bg-gradient-to-br from-blue-500 to-blue-700 shadow-2xl shadow-blue-500/50 scale-125' 
                        : 'bg-gradient-to-br from-gray-700 to-gray-800 shadow-lg hover:from-gray-600 hover:to-gray-700 hover:scale-110'
                    }`}>
                      
                      {/* Иконка */}
                      <div className={`transition-all duration-300 ${
                        isActive ? 'text-white scale-110' : 'text-gray-300 group-hover:text-white'
                      }`}>
                        {getCapabilityIcon(capability.iconName)}
                      </div>
                      
                      {/* Активный индикатор */}
                      {isActive && (
                        <>
                          <div className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping pointer-events-none" />
                          <div className="absolute -inset-2 rounded-full border-2 border-blue-400/50 animate-pulse pointer-events-none" />
                        </>
                      )}
                      
                      {/* Номер позиции */}
                      <div className="absolute -top-3 -right-3 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center border border-gray-600 pointer-events-none">
                        <span className="text-xs font-bold text-gray-300">{index + 1}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Информационная панель */}
          <div className="flex-1">
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-8 relative overflow-hidden">
              
              {/* Фоновый эффект */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-purple-600/5" />
              
              <div className="relative z-10">
                {/* Заголовок активной возможности */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <div className="text-white">
                      {getCapabilityIcon(capabilities[activeCapability].iconName)}
                    </div>
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold text-white mb-2 ${manrope.className}`}>
                      {capabilities[activeCapability].title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                      <span className="text-blue-400 text-sm font-medium">
                        Возможность {activeCapability + 1} из {capabilities.length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Описание */}
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {capabilities[activeCapability].description}
                </p>

                {/* Ключевые метрики */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-400">Ключевое преимущество</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-sm text-green-400">Активно</span>
                    </div>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-blue-400 mb-1">
                          {getCapabilityBenefits(activeCapability).time}
                        </div>
                        <div className="text-gray-300 text-sm">
                          {getCapabilityBenefits(activeCapability).description}
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-700/20 rounded-lg flex items-center justify-center">
                        <div className="text-blue-400">
                          {getCapabilityIcon(capabilities[activeCapability].iconName)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Навигационные точки */}
                <div className="flex justify-center gap-3">
                  {capabilities.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleCapabilityClick(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === activeCapability 
                          ? 'bg-blue-500 scale-125 shadow-lg shadow-blue-500/50' 
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 bg-gray-800/50 border border-gray-700/50 rounded-full px-6 py-3 backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-gray-300 text-sm">
              Интерактивная демонстрация возможностей • Нажмите на элементы для изучения
            </span>
          </div>
        </div>
      </div>
    </section>
  )
} 