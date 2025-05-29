'use client'

import { Button } from "@/components/ui/button"
import { ArrowRightIcon, AlertTriangleIcon, CheckIcon, BarChart3Icon, ClockIcon, ZapIcon, TargetIcon, BrainCircuitIcon, ShieldCheckIcon } from 'lucide-react'
import { Manrope } from 'next/font/google'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

interface ProblemSolutionSectionProps {
  onScrollToForm: () => void
}

export default function ProblemSolutionSection({ onScrollToForm }: ProblemSolutionSectionProps) {
  const problemPoints = [
    {
      title: "Риски разбросаны по системам",
      description: "Excel, Jira, почта — нет единой картины",
      icon: <BarChart3Icon className="w-6 h-6 text-white" />
    },
    {
      title: "Ручная работа",
      description: "Сбор и оценка занимают недели",
      icon: <ClockIcon className="w-6 h-6 text-white" />
    },
    {
      title: "Нет исполнения",
      description: "Планы остаются на бумаге",
      icon: <AlertTriangleIcon className="w-6 h-6 text-white" />
    },
    {
      title: "Реактивность",
      description: "Узнаём о проблемах постфактум",
      icon: <ZapIcon className="w-6 h-6 text-white" />
    }
  ]

  const solutionPoints = [
    {
      title: "Единая система",
      description: "Все риски синхронизированы",
      icon: <TargetIcon className="w-6 h-6 text-white" />
    },
    {
      title: "AI-автоматизация",
      description: "Выявление и планирование за минуты",
      icon: <BrainCircuitIcon className="w-6 h-6 text-white" />
    },
    {
      title: "Исполнение под контролем",
      description: "Задачи с дедлайнами и RACI создаются автоматически",
      icon: <CheckIcon className="w-6 h-6 text-white" />
    },
    {
      title: "Проактивность",
      description: "Предупреждаем риски до их реализации",
      icon: <ShieldCheckIcon className="w-6 h-6 text-white" />
    }
  ]

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-900/80 via-gray-900/50 to-gray-800/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900/20 to-transparent" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 scroll-animation">
          <h2 className={`text-4xl md:text-6xl font-bold mb-6 ${manrope.className}`}>
            <span className="text-red-400">Проблема</span>
            <span className="text-gray-400 mx-4">→</span>
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">Решение</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            От Excel-хаоса к единой AI-платформе управления рисками
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          {/* Problem Side */}
          <div className="scroll-animation">
            <div className="relative h-full">
              <div className="bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-500/30 rounded-2xl p-8 backdrop-blur-sm hover:border-red-500/50 transition-all duration-500 group h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/25">
                      <AlertTriangleIcon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className={`text-3xl font-bold text-red-400 ${manrope.className}`}>Проблема</h3>
                    <p className="text-red-300/70 text-sm">Текущее состояние</p>
                  </div>
                </div>

                {/* Problem Points */}
                <div className="space-y-6 flex-grow">
                  {problemPoints.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 group/item">
                      <div className="mt-1 group-hover/item:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2 group-hover/item:text-red-300 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-gray-300 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Problem Stats */}
                <div className="mt-8 pt-6 border-t border-red-500/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-400">90%</div>
                      <div className="text-xs text-red-300/70">рисков в Excel</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-400">6 недель</div>
                      <div className="text-xs text-red-300/70">на анализ</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Solution Side */}
          <div className="scroll-animation scroll-delay-1">
            <div className="relative h-full">
              <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-500/30 rounded-2xl p-8 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-500 group h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                      <CheckIcon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className={`text-3xl font-bold text-blue-400 ${manrope.className}`}>Решение</h3>
                    <p className="text-blue-300/70 text-sm">Право (риски)</p>
                  </div>
                </div>

                {/* Solution Points */}
                <div className="space-y-6 flex-grow">
                  {solutionPoints.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 group/item">
                      <div className="mt-1 group-hover/item:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-2 group-hover/item:text-blue-300 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-gray-300 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Solution Stats */}
                <div className="mt-8 pt-6 border-t border-blue-500/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">AI-модуль</div>
                      <div className="text-xs text-blue-300/70">полный анализ</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">100%</div>
                      <div className="text-xs text-blue-300/70">задач зафиксировано</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating CTA */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-full font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105"
                  onClick={onScrollToForm}
                >
                  Получить доступ
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 