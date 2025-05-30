'use client'

import { Button } from "@/components/ui/button"
import { Manrope } from 'next/font/google'
import { 
  CheckIcon, 
  ArrowRightIcon, 
  ShieldCheckIcon, 
  BarChart3Icon, 
  AlertTriangleIcon,
  TargetIcon,
  ClockIcon,
  ZapIcon,
  BrainCircuitIcon
} from 'lucide-react'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

interface ProblemSolutionSectionMobileProps {
  onScrollToForm: () => void
}

export default function ProblemSolutionSectionMobile({ onScrollToForm }: ProblemSolutionSectionMobileProps) {
  const problemPoints = [
    {
      title: "Риски разбросаны по системам",
      description: "Excel, Jira, почта — нет единой картины",
      icon: <BarChart3Icon className="w-5 h-5 text-white" />
    },
    {
      title: "Ручная работа",
      description: "Сбор и оценка занимают недели",
      icon: <ClockIcon className="w-5 h-5 text-white" />
    },
    {
      title: "Нет исполнения",
      description: "Планы остаются на бумаге",
      icon: <AlertTriangleIcon className="w-5 h-5 text-white" />
    },
    {
      title: "Реактивность",
      description: "Узнаём о проблемах постфактум",
      icon: <ZapIcon className="w-5 h-5 text-white" />
    }
  ]

  const solutionPoints = [
    {
      title: "Единая система",
      description: "Все риски синхронизированы",
      icon: <TargetIcon className="w-5 h-5 text-white" />
    },
    {
      title: "AI-автоматизация",
      description: "Выявление и планирование за минуты",
      icon: <BrainCircuitIcon className="w-5 h-5 text-white" />
    },
    {
      title: "Исполнение под контролем",
      description: "Задачи с дедлайнами и ответственными",
      icon: <CheckIcon className="w-5 h-5 text-white" />
    },
    {
      title: "Проактивность",
      description: "Предупреждаем риски до их реализации",
      icon: <ShieldCheckIcon className="w-5 h-5 text-white" />
    }
  ]

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-gray-900/80 via-gray-900/50 to-gray-800/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-lg mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className={`text-2xl font-bold mb-4 ${manrope.className}`}>
            <span className="text-red-400">Проблема</span>
            <span className="text-gray-400 mx-2">→</span>
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">Решение</span>
          </h2>
          <p className="text-base text-gray-300 leading-relaxed px-2">
            От хаоса к единой AI-платформе управления рисками
          </p>
        </div>

        {/* Problem Card */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-500/30 rounded-2xl p-6 backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/25">
                <AlertTriangleIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`text-xl font-bold text-red-400 ${manrope.className}`}>Проблема</h3>
                <p className="text-red-300/70 text-sm">Текущее состояние</p>
              </div>
            </div>

            {/* Problem Points */}
            <div className="space-y-4">
              {problemPoints.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Problem Stats */}
            <div className="mt-6 pt-4 border-t border-red-500/20">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-red-400">90%</div>
                  <div className="text-xs text-red-300/70">рисков в Excel</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-red-400">6 недель</div>
                  <div className="text-xs text-red-300/70">на анализ</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow Indicator */}
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 bg-gray-800/50 rounded-full flex items-center justify-center border border-gray-600/50">
            <ArrowRightIcon className="w-6 h-6 text-gray-400 rotate-90" />
          </div>
        </div>

        {/* Solution Card */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <CheckIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`text-xl font-bold text-blue-400 ${manrope.className}`}>Решение</h3>
                <p className="text-blue-300/70 text-sm">Право (риски)</p>
              </div>
            </div>

            {/* Solution Points */}
            <div className="space-y-4">
              {solutionPoints.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Solution Stats */}
            <div className="mt-6 pt-4 border-t border-blue-500/20">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-400">AI-модуль</div>
                  <div className="text-xs text-blue-300/70">полный анализ</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-400">100%</div>
                  <div className="text-xs text-blue-300/70">задач зафиксировано</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button 
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-full font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 w-full max-w-xs"
            onClick={onScrollToForm}
          >
            Получить доступ
          </Button>
        </div>
      </div>
    </section>
  )
} 