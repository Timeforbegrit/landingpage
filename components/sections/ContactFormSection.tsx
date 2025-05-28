'use client'

import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from 'lucide-react'
import { Manrope } from 'next/font/google'
import { FormData } from '@/lib/types'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

interface ContactFormSectionProps {
  formData: FormData
  onFormSubmit: (e: React.FormEvent) => void
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ContactFormSection({ 
  formData, 
  onFormSubmit, 
  onInputChange 
}: ContactFormSectionProps) {
  return (
    <section id="early-access-form" className="py-20 px-6 bg-gray-900/50">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12 scroll-animation">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 text-white ${manrope.className}`}>
            Записаться на интервью
          </h2>
          <p className="text-xl text-gray-300">
            Получите персональную демонстрацию и early access к платформе
          </p>
        </div>

        <form onSubmit={onFormSubmit} className="space-y-6 scroll-animation scroll-delay-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Имя *
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={onInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="your@email.com"
                value={formData.email}
                onChange={onInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Компания *
              </label>
              <input
                type="text"
                name="company"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="Название компании"
                value={formData.company}
                onChange={onInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Должность *
              </label>
              <input
                type="text"
                name="position"
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="Ваша должность"
                value={formData.position}
                onChange={onInputChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Телефон
            </label>
            <input
              type="tel"
              name="phone"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              placeholder="+7 (999) 123-45-67"
              value={formData.phone}
              onChange={onInputChange}
            />
          </div>

          <Button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold text-lg"
          >
            Записаться на интервью
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </Button>

          <p className="text-sm text-gray-400 text-center">
            Мы свяжемся с вами в течение 24 часов для согласования времени интервью
          </p>
        </form>
      </div>
    </section>
  )
} 