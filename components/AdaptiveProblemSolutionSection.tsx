'use client'

import { AdaptiveSection } from './AdaptiveSection'
import ProblemSolutionSection from './sections/ProblemSolutionSection'
import { ProblemSolutionSectionMobile } from './sections/mobile'

interface AdaptiveProblemSolutionSectionProps {
  onScrollToForm: () => void
}

// Десктопный компонент как встроенный JSX (из page.tsx)
function ProblemSolutionSectionDesktop({ onScrollToForm }: AdaptiveProblemSolutionSectionProps) {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-900/80 via-gray-900/50 to-gray-800/30 relative overflow-hidden">
      {/* Здесь будет весь JSX из page.tsx - пока заглушка */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-red-400">Проблема</span>
            <span className="text-gray-400 mx-4">→</span>
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">Решение</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            От хаоса к единой AI-платформе управления рисками
          </p>
        </div>
        {/* Остальной контент будет перенесен позже */}
      </div>
    </section>
  )
}

export default function AdaptiveProblemSolutionSection({ onScrollToForm }: AdaptiveProblemSolutionSectionProps) {
  return (
    <AdaptiveSection
      DesktopComponent={() => <ProblemSolutionSection onScrollToForm={onScrollToForm} />}
      MobileComponent={() => <ProblemSolutionSectionMobile onScrollToForm={onScrollToForm} />}
    />
  )
} 