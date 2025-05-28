'use client'

import { useState } from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { Manrope } from 'next/font/google'
import { faqItems } from '@/lib/data/faqItems'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export default function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 scroll-animation">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 text-white ${manrope.className}`}>
            Часто задаваемые вопросы
          </h2>
          <p className="text-xl text-gray-300">
            Ответы на основные вопросы о платформе
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className={`border border-gray-800 rounded-lg overflow-hidden scroll-animation scroll-delay-${(index % 3) + 1}`}
            >
              <button
                className="w-full p-6 text-left hover:bg-gray-900/50 transition-colors flex justify-between items-center"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <span className="font-semibold text-white">{item.question}</span>
                <ChevronDownIcon 
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    openFaq === index ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              {openFaq === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-300">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 