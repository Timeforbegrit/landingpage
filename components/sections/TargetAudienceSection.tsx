'use client'

import { UsersIcon } from 'lucide-react'
import { Manrope } from 'next/font/google'
import { targetAudience } from '@/lib/data/targetAudience'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export default function TargetAudienceSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 scroll-animation">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 text-white ${manrope.className}`}>
            Для кого
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Руководители крупных компаний, отвечающие за управление рисками
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {targetAudience.map((audience, index) => (
            <div 
              key={index}
              className={`border border-gray-800 rounded-lg p-6 text-center hover:border-blue-600 transition-colors bg-gray-900/30 scroll-animation scroll-delay-${(index % 4) + 1}`}
            >
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <UsersIcon className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 text-white ${manrope.className}`}>
                {audience.role}
              </h3>
              <p className="text-gray-400 text-sm">
                {audience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 