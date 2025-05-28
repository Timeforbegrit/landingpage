'use client'

import { useState } from 'react'
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

export default function ProductTourSection() {
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <section id="product" className="py-20 px-6 bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 scroll-animation">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 text-white ${manrope.className}`}>
            Тур по продукту
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Посмотрите, как выглядит современное управление рисками
          </p>
        </div>

        {/* Tabs Navigation - Single Row */}
        <div className="mb-8 scroll-animation">
          <div className="flex justify-center gap-2 p-1 bg-gray-800/30 rounded-xl border border-gray-700/30">
            {productSlides.map((slide, index) => {
              const IconComponent = slideIcons[index]
              const isActive = index === activeSlide
              
              return (
                <button
                  key={index}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
                  }`}
                  onClick={() => setActiveSlide(index)}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-sm font-medium hidden sm:block">{slide.title}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Main Screen Area - Compact */}
        <div className="scroll-animation scroll-delay-1">
          <div className="bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/50">
            {/* Browser Header */}
            <div className="flex items-center justify-between p-3 bg-gray-800/80 border-b border-gray-700/50">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-gray-400 text-xs font-mono ml-2">
                  risks-platform.com
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                <span className="text-gray-400 text-xs">Live</span>
              </div>
            </div>

            {/* Screen Content - Smaller */}
            <div className="relative aspect-[16/10] bg-gray-50">
              {/* Mock Interface */}
              <div className="absolute inset-0 p-6">
                {activeSlide === 0 && <CEODashboardMock />}
                {activeSlide === 1 && <KanbanMock />}
                {activeSlide === 2 && <MitigationMock />}
                {activeSlide === 3 && <ContractsMock />}
                {activeSlide === 4 && <AnalyticsMock />}
              </div>

              {/* Play overlay */}
              <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center cursor-pointer">
                <div className="bg-white/90 rounded-full p-4">
                  <PlayIcon className="w-8 h-8 text-gray-900" />
                </div>
              </div>
            </div>

            {/* Bottom info */}
            <div className="p-4 bg-gray-800/50 border-t border-gray-700/50">
              <h3 className={`text-lg font-semibold text-white mb-1 ${manrope.className}`}>
                {productSlides[activeSlide].title}
              </h3>
              <p className="text-gray-400 text-sm">
                {productSlides[activeSlide].description}
              </p>
            </div>
          </div>
        </div>

        {/* Simple indicators */}
        <div className="flex justify-center gap-2 mt-6 scroll-animation scroll-delay-2">
          {productSlides.map((_, index) => (
            <button
              key={index}
              className={`w-8 h-1.5 rounded-full transition-colors duration-200 ${
                index === activeSlide ? 'bg-blue-500' : 'bg-gray-600 hover:bg-gray-500'
              }`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Simplified Mock Components
function CEODashboardMock() {
  return (
    <div className="h-full bg-white rounded-lg p-4">
      <div className="grid grid-cols-3 gap-4 h-full">
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
          <div className="text-blue-600 text-xs font-medium mb-1">Индекс риска</div>
          <div className="text-2xl font-bold text-blue-900">7.2</div>
          <div className="text-xs text-blue-600">↗ +0.3</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <div className="text-gray-600 text-xs font-medium mb-1">Ущерб</div>
          <div className="text-2xl font-bold text-gray-900">₽2.4М</div>
          <div className="text-xs text-gray-600">↘ -15%</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
          <div className="text-blue-600 text-xs font-medium mb-1">Митигированы</div>
          <div className="text-2xl font-bold text-blue-900">23</div>
          <div className="text-xs text-blue-600">↗ +5</div>
        </div>
      </div>
    </div>
  )
}

function KanbanMock() {
  return (
    <div className="h-full bg-white rounded-lg p-3">
      <div className="grid grid-cols-3 gap-3 h-full">
        <div className="bg-gray-50 rounded-lg p-2">
          <div className="text-gray-600 text-xs font-medium mb-2">Новые</div>
          <div className="space-y-1">
            <div className="bg-red-100 border-l-2 border-red-500 p-1.5 rounded text-xs">
              <div className="font-medium">Кибератака</div>
              <div className="text-gray-600">85%</div>
            </div>
            <div className="bg-yellow-100 border-l-2 border-yellow-500 p-1.5 rounded text-xs">
              <div className="font-medium">Сбой системы</div>
              <div className="text-gray-600">45%</div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-2">
          <div className="text-gray-600 text-xs font-medium mb-2">В работе</div>
          <div className="bg-blue-100 border-l-2 border-blue-500 p-1.5 rounded text-xs">
            <div className="font-medium">Аудит</div>
            <div className="text-gray-600">60%</div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-2">
          <div className="text-gray-600 text-xs font-medium mb-2">Готово</div>
          <div className="bg-green-100 border-l-2 border-green-500 p-1.5 rounded text-xs">
            <div className="font-medium">Обновление</div>
            <div className="text-gray-600">100%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MitigationMock() {
  return (
    <div className="h-full bg-white rounded-lg p-4">
      <div className="text-sm font-semibold text-gray-900 mb-3">Стратегия: Принять</div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="text-xs font-medium text-blue-800 mb-2">Чек-лист:</div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Оценить воздействие</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Создать резерв</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border-2 border-gray-300 rounded-full"></div>
            <span>Уведомить стороны</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ContractsMock() {
  return (
    <div className="h-full bg-white rounded-lg p-4">
      <div className="text-sm font-semibold text-gray-900 mb-3">ИИ-анализ</div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="text-xs font-medium text-blue-800 mb-2">Обязательства:</div>
        <div className="space-y-1 text-xs">
          <div className="bg-white p-1.5 rounded border-l-2 border-blue-500">
            <span className="font-medium">Срок:</span> 30 дней
          </div>
          <div className="bg-white p-1.5 rounded border-l-2 border-orange-500">
            <span className="font-medium">Штраф:</span> 0.1%/день
          </div>
          <div className="bg-white p-1.5 rounded border-l-2 border-green-500">
            <span className="font-medium">Гарантия:</span> 12 мес
          </div>
        </div>
      </div>
    </div>
  )
}

function AnalyticsMock() {
  return (
    <div className="h-full bg-white rounded-lg p-4">
      <div className="grid grid-cols-2 gap-4 h-full">
        <div>
          <div className="text-sm font-semibold text-gray-900 mb-3">По отделам</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-1.5 bg-gray-50 rounded text-xs">
              <span>ИТ</span>
              <div className="flex items-center gap-1">
                <div className="w-12 h-1.5 bg-gray-200 rounded-full">
                  <div className="w-9 h-1.5 bg-red-500 rounded-full"></div>
                </div>
                <span>75%</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-1.5 bg-gray-50 rounded text-xs">
              <span>Финансы</span>
              <div className="flex items-center gap-1">
                <div className="w-12 h-1.5 bg-gray-200 rounded-full">
                  <div className="w-6 h-1.5 bg-blue-500 rounded-full"></div>
                </div>
                <span>50%</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900 mb-3">Тренд</div>
          <div className="h-20 bg-blue-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-xs text-gray-600">
              📈 Снижение<br/>
              <span className="text-blue-600 font-medium">-15%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 