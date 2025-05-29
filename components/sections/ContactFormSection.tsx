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
    <section id="early-access-form" className="py-20 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.3)_100%)]" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-12 scroll-animation">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 text-white ${manrope.className}`}>
            Получить доступ
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
                className="w-full px-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/25"
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
                className="w-full px-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/25"
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
                className="w-full px-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/25"
                placeholder="Название компании"
                value={formData.company}
                onChange={onInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Должность
              </label>
              <input
                type="text"
                name="position"
                className="w-full px-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/25"
                placeholder="Ваша должность"
                value={formData.position}
                onChange={onInputChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Телефон *
            </label>
            <input
              type="tel"
              name="phone"
              required
              className="w-full px-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/25"
              placeholder="+7 (999) 123-45-67"
              value={formData.phone}
              onChange={onInputChange}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Получить доступ
          </Button>

          <p className="text-sm text-gray-400 text-center">
            Мы свяжемся с вами в течение 24 часов для согласования времени интервью
          </p>
        </form>
      </div>
    </section>
  )
} 