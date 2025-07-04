'use client'

import { useState, useEffect } from 'react'
import { MonitorIcon, KanbanSquareIcon, ShieldIcon, FileTextIcon, BarChart3Icon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Manrope } from 'next/font/google'
import { productSlides } from '@/lib/data/productSlides'
import { GTMEvents } from '@/lib/gtm'

// SVG иконки для мессенджеров
const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
)

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
  </svg>
)

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
  
  // Функция для изменения слайда с GTM событием
  const handleSlideChange = (newSlideIndex: number) => {
    setActiveSlide(newSlideIndex)
    // Отправляем GTM событие просмотра слайда тура (нумерация с 1)
    GTMEvents.viewTourSlide(newSlideIndex + 1)
  }
  const [isVideoLoading, setIsVideoLoading] = useState(true)
  const [loadedVideos, setLoadedVideos] = useState<number[]>([])
  const [failedVideos, setFailedVideos] = useState<number[]>([])
  const [isPaused, setIsPaused] = useState(false)
  const [showMessengers, setShowMessengers] = useState(false)

  // Отправляем GTM событие просмотра первого слайда при монтировании
  useEffect(() => {
    GTMEvents.viewTourSlide(1)
  }, [])

  // Прелоадинг видео
  useEffect(() => {
    const preloadVideos = async () => {
      const videoPromises = productSlides.map((slide, index) => {
        return new Promise((resolve) => {
          const video = document.createElement('video')
          video.muted = true
          video.onloadeddata = () => {
            setLoadedVideos(prev => [...prev, index])
            resolve(true)
          }
          video.onerror = () => {
            setFailedVideos(prev => [...prev, index])
            resolve(false)
          }
          video.src = slide.image
          video.load()
        })
      })
      
      await Promise.all(videoPromises)
    }

    preloadVideos()
  }, [])

  // Автоматическое переключение слайдов
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      const newSlideIndex = (activeSlide + 1) % productSlides.length
      handleSlideChange(newSlideIndex)
    }, 6000) // Переключение каждые 6 секунд

    return () => clearInterval(interval)
  }, [isPaused, activeSlide])

  // Обработка загрузки текущего видео
  useEffect(() => {
    if (loadedVideos.includes(activeSlide) || failedVideos.includes(activeSlide)) {
      setIsVideoLoading(false)
    } else {
      setIsVideoLoading(true)
    }
  }, [activeSlide, loadedVideos, failedVideos])

  const nextSlide = () => {
    const newSlideIndex = (activeSlide + 1) % productSlides.length
    handleSlideChange(newSlideIndex)
  }

  const prevSlide = () => {
    const newSlideIndex = (activeSlide - 1 + productSlides.length) % productSlides.length
    handleSlideChange(newSlideIndex)
  }

  // Функции для кнопок
  const handleDemoRequest = () => {
    // Отправляем GTM событие для кнопки "Запросить демо" в туре
    GTMEvents.clickDemoRequestTour()
    
    // Скролл к форме обратной связи
    const contactSection = document.getElementById('early-access-form')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleContactManager = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    try {
      const newState = !showMessengers
      setShowMessengers(newState)
    } catch (error) {
      console.error('Ошибка при обработке клика:', error)
    }
  }

  // Получаем текущий слайд с проверкой
  const currentSlide = productSlides[activeSlide]
  if (!currentSlide) {
    return null
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
                
                // Проверяем что IconComponent существует
                if (!IconComponent) {
                  return null
                }
                
                return (
                  <button
                    key={index}
                    className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 scale-105' 
                        : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
                    }`}
                    onClick={() => handleSlideChange(index)}
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
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
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
                    {currentSlide.title}
                  </h3>
                  <p className="text-gray-300 text-lg">
                    {currentSlide.description}
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

            {/* Interface preview area - с GIF */}
            <div className="aspect-[16/10] md:aspect-[16/9] bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden rounded-xl md:rounded-2xl shadow-2xl border border-gray-700/30">
              
              {/* GIF Display */}
              <div className="absolute inset-0">
                <div className="w-full h-full relative">
                  {failedVideos.includes(activeSlide) ? (
                    // Fallback при ошибке загрузки
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
                          {slideIcons.map((IconComponent, index) => (
                            <IconComponent 
                              key={index}
                              className={`w-12 h-12 text-blue-600 transition-all duration-500 ${
                                index === activeSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-75 absolute'
                              }`} 
                            />
                          ))}
                        </div>
                        <div className="text-white font-semibold text-lg mb-2">
                          {currentSlide.title}
                        </div>
                        <div className="text-gray-300 max-w-lg mx-auto">
                          {currentSlide.description}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <video
                      src={currentSlide.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className={`w-full h-full object-contain bg-white/5 rounded-xl md:rounded-2xl transition-opacity duration-500 ${
                        isVideoLoading ? 'opacity-0' : 'opacity-100'
                      }`}
                      onLoadedData={() => setIsVideoLoading(false)}
                      onError={() => setFailedVideos(prev => [...prev, activeSlide])}
                      aria-label={`Демонстрация: ${currentSlide.title}`}
                    />
                  )}
                </div>
              </div>

              {/* Overlay градиент для лучшей читаемости */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-gray-900/20 pointer-events-none rounded-xl md:rounded-2xl" />

              {/* Feature badge */}
              <div className="absolute top-3 left-3 md:top-6 md:left-6 z-10">
                <div className="bg-blue-500/90 backdrop-blur-sm text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium shadow-lg">
                  Живая демонстрация
                </div>
              </div>

              {/* Loading state */}
              <div className={`absolute inset-0 flex items-center justify-center bg-gray-800/50 transition-opacity duration-300 rounded-xl md:rounded-2xl ${
                isVideoLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}>
                <div className="text-center">
                  <div className="w-8 h-8 md:w-12 md:h-12 border-2 md:border-3 border-blue-500 border-t-transparent rounded-full animate-spin mb-2 md:mb-4" />
                  <div className="text-gray-300 text-xs md:text-sm">Загрузка демонстрации...</div>
                </div>
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
            onClick={() => handleSlideChange(index)}
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
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full px-8 py-4 backdrop-blur-sm">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-white font-medium text-lg md:text-xl">
            Готовы увидеть платформу в действии?
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
        <button 
          onClick={handleDemoRequest}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:scale-105 cursor-pointer pointer-events-auto relative z-50"
          style={{ pointerEvents: 'auto' }}
          type="button"
        >
          Запросить демо
        </button>
      </div>
    </section>
  )
} 