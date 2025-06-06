'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { ArrowRightIcon, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { Manrope } from 'next/font/google'
import { FormData } from '@/lib/types'
import Image from "next/image"
import { GTMEvents } from '@/lib/gtm'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

interface ContactFormSectionProps {
  formData: FormData
  onFormSubmit: (e: React.FormEvent) => void
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isSubmitting?: boolean
  submitMessage?: string
  submitError?: string[]
}

export default function ContactFormSection({ 
  formData, 
  onFormSubmit, 
  onInputChange,
  onCheckboxChange,
  isSubmitting = false,
  submitMessage = '',
  submitError = []
}: ContactFormSectionProps) {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Отправляем GTM событие при отправке формы
    GTMEvents.demoRequest()
    onFormSubmit(e)
  }

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

        {/* Status Messages */}
        {submitMessage && (
          <div className="mb-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <p className="text-green-400">{submitMessage}</p>
          </div>
        )}

        {submitError.length > 0 && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-400 font-medium">Ошибки валидации:</p>
            </div>
            <ul className="list-disc list-inside text-red-300 space-y-1 ml-8">
              {submitError.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-6 scroll-animation scroll-delay-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Имя *
              </label>
              <input
                type="text"
                name="name"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
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
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
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
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
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
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
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
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="+7 (999) 123-45-67"
              value={formData.phone}
              onChange={onInputChange}
            />
          </div>

          {/* Согласия */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="dataProcessingConsent"
                id="dataProcessingConsent"
                required
                disabled={isSubmitting}
                checked={formData.dataProcessingConsent}
                onChange={onCheckboxChange}
                className="mt-1 w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <label htmlFor="dataProcessingConsent" className="text-sm text-gray-300">
                Я даю{' '}
                <a 
                  href="/privacy-consent.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                >
                  согласие
                </a>{' '}
                на обработку персональных данных в соответствии с{' '}
                <a 
                  href="/privacy-policy.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                >
                  Политикой
                </a>.
              </label>
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="marketingConsent"
                id="marketingConsent"
                disabled={isSubmitting}
                checked={formData.marketingConsent}
                onChange={onCheckboxChange}
                className="mt-1 w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <label htmlFor="marketingConsent" className="text-sm text-gray-300">
                Я даю согласие на получение информационных и рекламных сообщений в соответствии с{' '}
                <a 
                  href="/privacy-policy.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                >
                  Правилами
                </a>.
              </label>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Отправка...
              </>
            ) : (
              <>
                Получить доступ
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>

          <p className="text-sm text-gray-400 text-center">
            Мы свяжемся с вами в течение 24 часов для согласования времени интервью
          </p>
          
          {/* Logo under form */}
          <div className="flex justify-center mt-8 pt-6 border-t border-gray-700/30">
            <Image 
              src="/logo_pravo(tech)_white.svg" 
              alt="Право (tech)" 
              width={150}
              height={50}
              className="object-contain opacity-70"
            />
          </div>
        </form>
      </div>
    </section>
  )
} 