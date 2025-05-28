'use client'

import { Manrope } from 'next/font/google'
import { workflowSteps, getWorkflowIcon } from '@/lib/data/workflowSteps'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export default function WorkflowSection() {
  return (
    <section id="how-it-works" className="py-20 px-6 bg-gray-900/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 scroll-animation">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 text-white ${manrope.className}`}>
            Как это работает
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Четыре простых шага от выявления риска до его митигации
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection lines for desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5">
            <div className="flex justify-between items-center h-full max-w-5xl mx-auto px-8">
              <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-500/50 to-purple-500/50" />
              <div className="flex-1 h-0.5 bg-gradient-to-r from-purple-500/50 to-green-500/50" />
              <div className="flex-1 h-0.5 bg-gradient-to-r from-green-500/50 to-orange-500/50" />
            </div>
          </div>

          {workflowSteps.map((step, index) => (
            <div 
              key={index}
              className={`text-center scroll-animation scroll-delay-${index + 1} group`}
            >
              <div className="relative mb-6">
                {/* Main circle with icon */}
                <div className={`w-20 h-20 ${step.bgColor} border-2 border-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 relative overflow-hidden group-hover:border-transparent transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl`}>
                  {/* Gradient border on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full`} />
                  <div className="absolute inset-0.5 bg-gray-900 rounded-full" />
                  
                  {/* Step number */}
                  <div className="absolute top-2 right-2 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center z-10">
                    <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors duration-300">{step.step}</span>
                  </div>
                  
                  {/* Icon */}
                  <div className={`text-gray-400 group-hover:text-white transition-all duration-500 z-10 group-hover:scale-110`}>
                    {getWorkflowIcon(step.iconName)}
                  </div>
                  
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full blur-xl`} />
                </div>
              </div>
              
              <h3 className={`text-xl font-semibold mb-3 text-white group-hover:bg-gradient-to-r group-hover:${step.color} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 ${manrope.className}`}>
                {step.title}
              </h3>
              <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 