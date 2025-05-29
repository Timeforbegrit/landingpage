'use client'

import { useState } from 'react'
import { MonitorIcon, KanbanSquareIcon, ShieldIcon, FileTextIcon, BarChart3Icon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Manrope } from 'next/font/google'
import { productSlides } from '@/lib/data/productSlides'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const slideIcons = [
  MonitorIcon,
  KanbanSquareIcon,
  ShieldIcon,
  FileTextIcon,
  BarChart3Icon
]

export default function ProductTourSection() {
  const [activeSlide, setActiveSlide] = useState(0)

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % productSlides.length)
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + productSlides.length) % productSlides.length)
  }

  return (
    <section id="product" className="py-20 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Фоновые эффекты */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.3)_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent ${manrope.className}`}>
            Тур по продукту
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Посмотрите, как выглядит современное управление рисками
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-blue-400 text-sm">Интерактивная демонстрация</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-12">
          <div className="flex justify-center">
            <div className="flex gap-2 p-2 bg-gray-800/30 rounded-2xl border border-gray-700/30 backdrop-blur-sm">
              {productSlides.map((slide, index) => {
                const IconComponent = slideIcons[index]
                const isActive = index === activeSlide
                
                return (
                  <button
                    key={index}
                    className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 scale-105' 
                        : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
                    }`}
                    onClick={() => setActiveSlide(index)}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="text-sm font-medium hidden sm:block">{slide.title}</span>
                    {isActive && (
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-800/80 hover:bg-gray-700/80 border border-gray-600/50 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm"
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-400 hover:text-white" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-gray-800/80 hover:bg-gray-700/80 border border-gray-600/50 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm"
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-400 hover:text-white" />
          </button>

          {/* Slide Content */}
          <div className="max-w-5xl mx-auto">
            {/* Header with slide info */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  {slideIcons.map((IconComponent, index) => (
                    <IconComponent 
                      key={index}
                      className={`w-10 h-10 text-white transition-all duration-500 ${
                        index === activeSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-75 absolute'
                      }`} 
                    />
                  ))}
                </div>
                <div>
                  <h3 className={`text-3xl font-bold text-white mb-3 ${manrope.className}`}>
                    {productSlides[activeSlide].title}
                  </h3>
                  <p className="text-gray-300 text-lg">
                    {productSlides[activeSlide].description}
                  </p>
                </div>
              </div>
              
              {/* Slide number */}
              <div className="text-right">
                <div className="text-4xl font-bold text-blue-400">
                  {String(activeSlide + 1).padStart(2, '0')}
                </div>
                <div className="text-gray-500">
                  из {productSlides.length}
                </div>
              </div>
            </div>

            {/* Interface preview area - безрамочный */}
            <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden rounded-2xl shadow-2xl">
              
              {/* Placeholder for future GIF */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center mx-auto mb-6 group transition-transform duration-300 hover:scale-105">
                    {slideIcons.map((IconComponent, index) => (
                      <IconComponent 
                        key={index}
                        className={`w-16 h-16 text-blue-600 transition-all duration-500 ${
                          index === activeSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-75 absolute'
                        }`} 
                      />
                    ))}
                  </div>
                  <div className="text-gray-700 font-semibold text-xl mb-3">
                    Интерфейс: {productSlides[activeSlide].title}
                  </div>
                  <div className="text-gray-600 max-w-lg mx-auto leading-relaxed">
                    Здесь будет размещена автопроигрываемая демонстрация данного модуля платформы
                  </div>
                </div>
              </div>

              {/* Feature badge */}
              <div className="absolute top-6 left-6">
                <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                  Демо
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-3 mt-12">
          {productSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`transition-all duration-300 ${
                index === activeSlide
                  ? 'w-12 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50'
                  : 'w-3 h-3 bg-gray-600 rounded-full hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 bg-gray-800/50 border border-gray-700/50 rounded-full px-8 py-4 backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-gray-300">
              Хотите увидеть полную демонстрацию? Запишитесь на персональный показ
            </span>
          </div>
        </div>
      </div>
    </section>
  )
} 