'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Manrope } from 'next/font/google'

import AdaptiveCapabilitiesSection from "@/components/AdaptiveCapabilitiesSection"
import AdaptiveProductTourSection from "@/components/AdaptiveProductTourSection"
import AdaptiveProblemSolutionSection from "@/components/AdaptiveProblemSolutionSection"
import TargetAudienceSection from "@/components/sections/TargetAudienceSection"
import ContactFormSection from "@/components/sections/ContactFormSection"
import FAQSection from "@/components/ui/faq-section"
import { FormData } from '@/lib/types'
import { 
  CheckIcon, 
  PlayIcon, 
  ArrowRightIcon, 
  ShieldCheckIcon, 
  ZapIcon, 
  BarChart3Icon, 
  BrainCircuitIcon, 
  TrendingUpIcon, 
  LockIcon, 
  DatabaseIcon,
  AlertTriangleIcon,
  TargetIcon,
  ClockIcon,
  StarIcon
} from 'lucide-react'
import AdaptiveHeroSection from "@/components/AdaptiveHeroSection"
import Header from "@/components/layout/Header"

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export default function Page() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    position: '',
    phone: '',
    dataProcessingConsent: false,
    marketingConsent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<string>('')
  const [submitError, setSubmitError] = useState<string[]>([])
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Функция плавного скролла с учетом высоты header
  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    document.querySelectorAll('.scroll-animation').forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')
    setSubmitError([])

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      
      if (result.success) {
        setSubmitMessage(result.message || 'Заявка успешно отправлена!')
        // Очищаем форму при успехе
        setFormData({
          name: '',
          email: '',
          company: '',
          position: '',
          phone: '',
          dataProcessingConsent: false,
          marketingConsent: false
        })
      } else {
        setSubmitError(result.errors || [result.message || 'Произошла ошибка'])
      }
    } catch (error) {
      setSubmitError(['Произошла неожиданная ошибка. Попробуйте еще раз.'])
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Очищаем ошибки при изменении полей
    if (submitError.length > 0) {
      setSubmitError([])
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked
    })
    // Очищаем ошибки при изменении полей
    if (submitError.length > 0) {
      setSubmitError([])
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#10131a] text-white font-inter">
      {/* Top Bar */}
      {/* <div className="bg-gray-900 text-white py-3 px-6 text-center text-sm border-b border-gray-800">
        <span className="font-medium">Early Access открыт. Записывайтесь на UX-интервью и получите доступ к beta-версии</span>
      </div> */}

      {/* Navigation */}
      <Header 
        onScrollToForm={() => smoothScrollTo('early-access-form')}
        smoothScrollTo={smoothScrollTo}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <AdaptiveHeroSection 
          onScrollToForm={() => smoothScrollTo('early-access-form')}
          onScrollToProduct={() => smoothScrollTo('product')}
        />

        {/* Capabilities Section */}
        <AdaptiveCapabilitiesSection />

        {/* Problem → Solution Section */}
        <AdaptiveProblemSolutionSection onScrollToForm={() => smoothScrollTo('early-access-form')} />

        {/* Product Tour Section */}
        <AdaptiveProductTourSection />

        {/* Target Audience Section */}
        <TargetAudienceSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Contact Form Section */}
        <ContactFormSection
          formData={formData}
          onFormSubmit={handleFormSubmit}
          onInputChange={handleInputChange}
          onCheckboxChange={handleCheckboxChange}
          isSubmitting={isSubmitting}
          submitMessage={submitMessage}
          submitError={submitError}
        />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <Link href="/" className={`flex items-center gap-3 mb-4 ${manrope.className}`}>
                <Image 
                  src="/images/logo.svg" 
                  alt="Право (риски)" 
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </Link>
              <p className="text-gray-400 mb-4 max-w-md">
                ИИ-платформа для комплексного управления корпоративными рисками. 
                Превращаем хаос в систему, реактивность в проактивность.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Продукт</h3>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={(e) => { e.preventDefault(); smoothScrollTo('capabilities'); }} 
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
                  >
                    Возможности
                  </button>
                </li>
                <li>
                  <button 
                    onClick={(e) => { e.preventDefault(); smoothScrollTo('faq'); }} 
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
                  >
                    FAQ
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Контакты</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">hello@pravorisk.ai</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Право (риски). Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}