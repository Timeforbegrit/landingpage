'use client'

import { useState, useEffect } from 'react'
import { MonitorIcon, KanbanSquareIcon, ShieldIcon, FileTextIcon, BarChart3Icon, PlayIcon } from 'lucide-react'
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

const slideColors = [
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-pink-500', 
  'from-green-500 to-emerald-500',
  'from-orange-500 to-red-500',
  'from-indigo-500 to-purple-500'
]

export default function ProductTourSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveSlide((current) => (current + 1) % productSlides.length)
          return 0
        }
        return prev + 1
      })
    }, 80)

    return () => clearInterval(progressInterval)
  }, [isAutoPlaying, activeSlide])

  const handleSlideChange = (index: number) => {
    setActiveSlide(index)
    setProgress(0)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  return (
    <section id="product" className="py-20 px-6 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 scroll-animation">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 text-white ${manrope.className}`}>
            Тур по продукту
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Посмотрите, как выглядит современное управление рисками
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-8 scroll-animation">
          <div className="flex flex-wrap justify-center gap-2 p-2 bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-700/50">
            {productSlides.map((slide, index) => {
              const IconComponent = slideIcons[index]
              const isActive = index === activeSlide
              const colorClass = slideColors[index]
              
              return (
                <button
                  key={index}
                  className={`relative flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 group ${
                    isActive 
                      ? 'bg-white text-gray-900 shadow-lg transform scale-105' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                  }`}
                  onClick={() => handleSlideChange(index)}
                >
                  {/* Progress bar for active tab */}
                  {isActive && (
                    <div 
                      className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${colorClass} rounded-full transition-all duration-100`}
                      style={{ width: `${progress}%` }}
                    />
                  )}
                  
                  <div className={`p-2 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? `bg-gradient-to-r ${colorClass} text-white shadow-md` 
                      : 'bg-gray-600/50 group-hover:bg-gray-500/50'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  
                  <div className="text-left">
                    <div className={`font-semibold text-sm ${isActive ? 'text-gray-900' : ''}`}>
                      {slide.title}
                    </div>
                    <div className={`text-xs ${isActive ? 'text-gray-600' : 'text-gray-500'}`}>
                      {slide.description}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Main Screen Area */}
        <div className="scroll-animation scroll-delay-1">
          <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-700/50">
            {/* Browser-like header */}
            <div className="flex items-center justify-between p-4 bg-gray-800/80 border-b border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-gray-400 text-sm font-mono">
                  risks-platform.com/{productSlides[activeSlide].title.toLowerCase().replace(/\s+/g, '-')}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${slideColors[activeSlide]} animate-pulse`}></div>
                <span className="text-gray-400 text-xs">Live Demo</span>
              </div>
            </div>

            {/* Screen Content */}
            <div className="relative aspect-video bg-gradient-to-br from-slate-50 to-gray-100">
              {/* Mock Interface based on active slide */}
              <div className="absolute inset-0 p-8">
                {activeSlide === 0 && <CEODashboardMock />}
                {activeSlide === 1 && <KanbanMock />}
                {activeSlide === 2 && <MitigationMock />}
                {activeSlide === 3 && <ContractsMock />}
                {activeSlide === 4 && <AnalyticsMock />}
              </div>

              {/* Play overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center group cursor-pointer">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-6 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <PlayIcon className="w-12 h-12 text-gray-900" />
                </div>
              </div>
            </div>

            {/* Bottom info bar */}
            <div className="p-6 bg-gray-800/80 border-t border-gray-700/50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-2xl font-bold text-white mb-2 ${manrope.className}`}>
                    {productSlides[activeSlide].title}
                  </h3>
                  <p className="text-gray-300">
                    {productSlides[activeSlide].description}
                  </p>
                </div>
                
                {/* Feature pills */}
                <div className="flex flex-wrap gap-2 max-w-md">
                  {getSlideFeatures(activeSlide).slice(0, 3).map((feature, index) => (
                    <span 
                      key={index}
                      className={`px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${slideColors[activeSlide]} text-white`}
                    >
                      {feature.replace(/[📊🎯💰📈🎮🃏🎨⚡✅🛡️📋👥🤖📄📁🏷️📤⚙️]/g, '').trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex justify-center gap-3 mt-8 scroll-animation scroll-delay-2">
          {productSlides.map((_, index) => (
            <button
              key={index}
              className={`relative w-12 h-2 rounded-full transition-all duration-300 ${
                index === activeSlide ? `bg-gradient-to-r ${slideColors[index]}` : 'bg-gray-600 hover:bg-gray-500'
              }`}
              onClick={() => handleSlideChange(index)}
            >
              {index === activeSlide && (
                <div className={`absolute inset-0 bg-gradient-to-r ${slideColors[index]} rounded-full animate-pulse opacity-75`} />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// Mock interface components
function CEODashboardMock() {
  return (
    <div className="h-full bg-white rounded-lg shadow-sm p-6">
      <div className="grid grid-cols-3 gap-6 h-full">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="text-blue-600 text-sm font-medium mb-2">Индекс риска</div>
          <div className="text-3xl font-bold text-blue-900">7.2</div>
          <div className="text-xs text-blue-600 mt-1">↗ +0.3 за неделю</div>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4">
          <div className="text-red-600 text-sm font-medium mb-2">Потенциальный ущерб</div>
          <div className="text-3xl font-bold text-red-900">₽2.4М</div>
          <div className="text-xs text-red-600 mt-1">↘ -15% за месяц</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
          <div className="text-green-600 text-sm font-medium mb-2">Митигированные</div>
          <div className="text-3xl font-bold text-green-900">23</div>
          <div className="text-xs text-green-600 mt-1">↗ +5 за неделю</div>
        </div>
      </div>
    </div>
  )
}

function KanbanMock() {
  return (
    <div className="h-full bg-white rounded-lg shadow-sm p-4">
      <div className="grid grid-cols-3 gap-4 h-full">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-gray-600 text-sm font-medium mb-3">Новые риски</div>
          <div className="space-y-2">
            <div className="bg-red-100 border-l-4 border-red-500 p-2 rounded text-xs">
              <div className="font-medium">Кибератака</div>
              <div className="text-gray-600">Вероятность: 85%</div>
            </div>
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-2 rounded text-xs">
              <div className="font-medium">Сбой системы</div>
              <div className="text-gray-600">Вероятность: 45%</div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-gray-600 text-sm font-medium mb-3">В работе</div>
          <div className="space-y-2">
            <div className="bg-blue-100 border-l-4 border-blue-500 p-2 rounded text-xs">
              <div className="font-medium">Аудит безопасности</div>
              <div className="text-gray-600">Прогресс: 60%</div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-gray-600 text-sm font-medium mb-3">Завершено</div>
          <div className="space-y-2">
            <div className="bg-green-100 border-l-4 border-green-500 p-2 rounded text-xs">
              <div className="font-medium">Обновление ПО</div>
              <div className="text-gray-600">Завершено: 100%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MitigationMock() {
  return (
    <div className="h-full bg-white rounded-lg shadow-sm p-6">
      <div className="mb-4">
        <div className="text-lg font-semibold text-gray-900 mb-2">Стратегия митигации: Принять</div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-sm font-medium text-green-800 mb-2">Чек-лист действий:</div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-green-700">Оценить финансовое воздействие</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-green-700">Создать резервный фонд</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
              <span className="text-gray-600">Уведомить заинтересованные стороны</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ContractsMock() {
  return (
    <div className="h-full bg-white rounded-lg shadow-sm p-6">
      <div className="mb-4">
        <div className="text-lg font-semibold text-gray-900 mb-4">ИИ-анализ контракта</div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="text-sm font-medium text-blue-800 mb-2">Извлеченные обязательства:</div>
          <div className="space-y-2 text-sm">
            <div className="bg-white p-2 rounded border-l-4 border-blue-500">
              <span className="font-medium">Срок поставки:</span> не позднее 30 дней
            </div>
            <div className="bg-white p-2 rounded border-l-4 border-orange-500">
              <span className="font-medium">Штраф за просрочку:</span> 0.1% за каждый день
            </div>
            <div className="bg-white p-2 rounded border-l-4 border-red-500">
              <span className="font-medium">Гарантийный период:</span> 12 месяцев
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AnalyticsMock() {
  return (
    <div className="h-full bg-white rounded-lg shadow-sm p-6">
      <div className="grid grid-cols-2 gap-6 h-full">
        <div>
          <div className="text-lg font-semibold text-gray-900 mb-4">Аналитика по отделам</div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm">ИТ-отдел</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-gray-200 rounded-full">
                  <div className="w-12 h-2 bg-red-500 rounded-full"></div>
                </div>
                <span className="text-xs text-gray-600">75%</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm">Финансы</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-gray-200 rounded-full">
                  <div className="w-8 h-2 bg-yellow-500 rounded-full"></div>
                </div>
                <span className="text-xs text-gray-600">50%</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm">Операции</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-gray-200 rounded-full">
                  <div className="w-4 h-2 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-xs text-gray-600">25%</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-lg font-semibold text-gray-900 mb-4">Тренды</div>
          <div className="h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-end justify-center p-4">
            <div className="text-center text-sm text-gray-600">
              📈 График трендов<br/>
              <span className="text-xs">Снижение рисков на 15%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function to get features for each slide
function getSlideFeatures(slideIndex: number): string[] {
  const features = [
    [
      "📊 Индекс риска в реальном времени",
      "🎯 Матрица критичности рисков", 
      "💰 Финансовые показатели ущерба",
      "📈 Интерактивные дашборды"
    ],
    [
      "🎮 Drag & Drop интерфейс",
      "🃏 Карточки с вероятностью",
      "🎨 Цветовая индикация статусов", 
      "⚡ Быстрое редактирование"
    ],
    [
      "✅ Автоматические чек-листы",
      "🛡️ Выбор стратегии митигации",
      "📋 Отслеживание прогресса",
      "👥 Назначение ответственных"
    ],
    [
      "🤖 ИИ-анализ документов",
      "📄 Извлечение обязательств", 
      "📁 Поддержка DOCX/PDF",
      "🏷️ Автоматическая категоризация"
    ],
    [
      "📊 Срезы по отделам и срокам",
      "📈 Интерактивные графики",
      "📤 Экспорт отчётов", 
      "⚙️ Настраиваемые метрики"
    ]
  ]
  
  return features[slideIndex] || []
} 