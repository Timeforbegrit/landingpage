'use client'

import { useState, useEffect } from 'react'
import { MonitorIcon, KanbanSquareIcon, ShieldIcon, FileTextIcon, BarChart3Icon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Manrope } from 'next/font/google'
import { productSlides } from '@/lib/data/productSlides'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { GTMEvents } from '@/lib/gtm'

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

export default function ProductTourSectionMobile() {
  const [activeSlide, setActiveSlide] = useState(0)
  
  // Функция для изменения слайда с GTM событием
  const handleSlideChange = (newSlideIndex: number) => {
    setActiveSlide(newSlideIndex)
    // Отправляем GTM событие просмотра слайда тура (нумерация с 1)
    GTMEvents.viewTourSlide(newSlideIndex + 1)
  }
  const [isImageLoading, setIsImageLoading] = useState(true)
  const [loadedImages, setLoadedImages] = useState<number[]>([])
  const [failedImages, setFailedImages] = useState<number[]>([])
  const [isPaused, setIsPaused] = useState(false)

  // Отправляем GTM событие просмотра первого слайда при монтировании
  useEffect(() => {
    GTMEvents.viewTourSlide(1)
  }, [])

  // Прелоадинг изображений
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = productSlides.map((slide, index) => {
        return new Promise((resolve) => {
          const img = new window.Image()
          img.onload = () => {
            setLoadedImages(prev => [...prev, index])
            resolve(true)
          }
          img.onerror = () => {
            setFailedImages(prev => [...prev, index])
            resolve(false)
          }
          img.src = slide.image
        })
      })
      
      await Promise.all(imagePromises)
    }

    preloadImages()
  }, [])

  // Автоматическое переключение слайдов
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      const newSlideIndex = (activeSlide + 1) % productSlides.length
      handleSlideChange(newSlideIndex)
    }, 5000) // Переключение каждые 5 секунд

    return () => clearInterval(interval)
  }, [isPaused])

  // Обработка загрузки текущего изображения
  useEffect(() => {
    if (loadedImages.includes(activeSlide) || failedImages.includes(activeSlide)) {
      setIsImageLoading(false)
    } else {
      setIsImageLoading(true)
    }
  }, [activeSlide, loadedImages, failedImages])

  const nextSlide = () => {
    const newSlideIndex = (activeSlide + 1) % productSlides.length
    handleSlideChange(newSlideIndex)
  }

  const prevSlide = () => {
    const newSlideIndex = (activeSlide - 1 + productSlides.length) % productSlides.length
    handleSlideChange(newSlideIndex)
  }

  const handleDemoRequest = () => {
    // Отправляем GTM событие для кнопки "Запросить демо" в туре (мобильная версия)
    GTMEvents.clickDemoRequestTour()
    
    const contactSection = document.getElementById('early-access-form')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Получаем текущий слайд с проверкой
  const currentSlide = productSlides[activeSlide]
  if (!currentSlide) {
    return null
  }

  return (
    <section id="product" className="py-12 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Упрощенные фоновые эффекты */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl" />
      </div>

      <div className="max-w-md mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className={`text-2xl font-bold mb-3 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent ${manrope.className}`}>
            Тур по продукту
          </h2>
          <p className="text-base text-gray-300 leading-relaxed">
            Современное управление рисками
          </p>
        </div>

        {/* Main Slide */}
        <div className="relative mb-8">
          {/* Slide Card */}
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-4 mx-4">
            
            {/* Slide Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                {slideIcons.map((IconComponent, index) => (
                  <IconComponent 
                    key={index}
                    className={`w-5 h-5 text-white transition-all duration-500 ${
                      index === activeSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-75 absolute'
                    }`} 
                  />
                ))}
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-bold text-white mb-1 ${manrope.className}`}>
                  {currentSlide.title}
                </h3>
                <div className="text-blue-400 text-xs">
                  {activeSlide + 1} из {productSlides.length}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              {currentSlide.description}
            </p>

            {/* Image */}
            <div className="aspect-[16/10] bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden rounded-xl mb-4">
              <Image
                src={currentSlide.image}
                alt={`Демонстрация: ${currentSlide.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className={`object-contain bg-white/5 rounded-xl transition-opacity duration-500 ${
                  isImageLoading ? 'opacity-0' : 'opacity-100'
                }`}
                priority={activeSlide === 0}
                unoptimized={true}
                onLoad={() => setIsImageLoading(false)}
                onError={() => setFailedImages(prev => [...prev, activeSlide])}
              />
              
              {/* Loading state */}
              {isImageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
                  <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              {/* Feature badge */}
              <div className="absolute top-2 left-2">
                <div className="bg-blue-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
                  Демо
                </div>
              </div>
            </div>

            {/* Navigation Arrows под изображением */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={prevSlide}
                className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-600/50 transition-all duration-200"
                aria-label="Предыдущий слайд"
              >
                <ChevronLeftIcon className="w-4 h-4 text-gray-300" />
                <span className="text-sm text-gray-300">Назад</span>
              </button>
              
              <div className="flex gap-1">
                {productSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleSlideChange(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeSlide
                        ? 'bg-blue-500 w-4'
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-600/50 transition-all duration-200"
                aria-label="Следующий слайд"
              >
                <span className="text-sm text-gray-300">Далее</span>
                <ChevronRightIcon className="w-4 h-4 text-gray-300" />
              </button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-4 mb-6">
            <div className="text-white font-medium mb-2">
              Готовы увидеть платформу в действии?
            </div>
            <Button 
              onClick={handleDemoRequest}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 w-full"
            >
              Запросить демо
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
} 