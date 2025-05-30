'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Inter, Manrope } from 'next/font/google'
import CapabilitiesSection from "@/components/sections/CapabilitiesSection"
import ProductTourSection from "@/components/sections/ProductTourSection"
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
  FileTextIcon, 
  BrainCircuitIcon, 
  TrendingUpIcon, 
  LockIcon, 
  GlobeIcon, 
  DatabaseIcon,
  AlertTriangleIcon,
  TargetIcon,
  ClockIcon,
  StarIcon
} from 'lucide-react'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
})

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
    phone: ''
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
          phone: ''
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

  return (
    <div className={`flex flex-col min-h-screen bg-[#10131a] text-white ${inter.className}`}>
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 80px;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }
        
        .scroll-animation {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .scroll-animation.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .scroll-delay-1 { transition-delay: 0.1s; }
        .scroll-delay-2 { transition-delay: 0.2s; }
        .scroll-delay-3 { transition-delay: 0.3s; }
      `}</style>

      {/* Top Bar */}
      {/* <div className="bg-gray-900 text-white py-3 px-6 text-center text-sm border-b border-gray-800">
        <span className="font-medium">Early Access открыт. Записывайтесь на UX-интервью и получите доступ к beta-версии</span>
      </div> */}

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md">
        <div className="max-w-7xl mx-auto grid grid-cols-3 items-center py-4 px-6">
          {/* Left - Logo */}
          <div className="flex justify-start">
            <Link href="/" className={`flex items-center gap-3 ${manrope.className}`}>
              <img 
                src="/images/logo.png" 
                alt="Право (риски)" 
                className="w-10 h-10 object-contain"
                style={{ 
                  transform: 'scale(2)'
                }}
              />
            </Link>
          </div>
          
          {/* Center - Navigation */}
          <nav className="hidden md:flex justify-center items-center gap-8">
            <button 
              onClick={(e) => { e.preventDefault(); smoothScrollTo('product'); }} 
              className="text-gray-300 hover:text-white transition-all duration-300 cursor-pointer bg-transparent border-none relative group"
            >
              Продукт
              <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
              onClick={(e) => { e.preventDefault(); smoothScrollTo('capabilities'); }} 
              className="text-gray-300 hover:text-white transition-all duration-300 cursor-pointer bg-transparent border-none relative group"
            >
              Возможности
              <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
              onClick={(e) => { e.preventDefault(); smoothScrollTo('faq'); }} 
              className="text-gray-300 hover:text-white transition-all duration-300 cursor-pointer bg-transparent border-none relative group"
            >
              FAQ
              <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
          </nav>
          
          {/* Right - CTA Button */}
          <div className="flex justify-end">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
              onClick={() => {
                smoothScrollTo('early-access-form');
              }}
            >
              Получить доступ
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center py-20 px-6 relative">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-blue-800/10" />
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-800/20 rounded-full blur-3xl" />
          </div>
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <div className="mb-8 fade-in">
              <div className="inline-flex items-center gap-2 bg-gray-900/80 border border-blue-600/50 rounded-full px-4 py-2 mb-8">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-blue-400 text-sm font-medium">Революция в управлении рисками</span>
              </div>
              
              <h1 className={`text-5xl md:text-7xl font-bold mb-8 ${manrope.className}`}>
                <span className="text-white">
                  Все корпоративные риски
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                  в одной системе
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                <strong className="text-white">Право (риски)</strong> объединяет все корпоративные риски в одной системе, 
                формирует AI-план действий и превращает решения в задачи с ответственными
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 fade-in delay-1">
              <Button 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg"
                onClick={() => {
                  smoothScrollTo('early-access-form');
                }}
              >
                Получить доступ
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg"
                onClick={() => {
                  smoothScrollTo('product');
                }}
              >
                <PlayIcon className="w-5 h-5 mr-2" />
                Тур по продукту
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto fade-in delay-2">
              <div className="text-center p-6 border border-gray-800/50 rounded-lg bg-gray-900/20 backdrop-blur-md outline-none transition-all duration-300 hover:scale-105 hover:bg-gray-900/30 hover:backdrop-blur-lg hover:border-blue-600">
                <div className="text-3xl font-bold text-blue-500 mb-2">4-6 недель</div>
                <div className="text-gray-400">Тестовая версия</div>
              </div>
              <div className="text-center p-6 border border-gray-800/50 rounded-lg bg-gray-900/20 backdrop-blur-md outline-none transition-all duration-300 hover:scale-105 hover:bg-gray-900/30 hover:backdrop-blur-lg hover:border-blue-600">
                <div className="text-3xl font-bold text-blue-500 mb-2">С ИИ-поиском</div>
                <div className="text-gray-400">Анализ рисков</div>
              </div>
              <div className="text-center p-6 border border-gray-800/50 rounded-lg bg-gray-900/20 backdrop-blur-md outline-none transition-all duration-300 hover:scale-105 hover:bg-gray-900/30 hover:backdrop-blur-lg hover:border-blue-600">
                <div className="text-3xl font-bold text-blue-500 mb-2">100%</div>
                <div className="text-gray-400">Автоматизация</div>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <CapabilitiesSection />

        {/* Problem → Solution Section */}
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
                От хаоса к единой AI-платформе управления рисками
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
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
                      {[
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
                      ].map((item, index) => (
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
                  {/* Solution Card */}
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
                      {[
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
                          description: "Задачи с дедлайнами и ответственными создаются автоматически",
                          icon: <CheckIcon className="w-6 h-6 text-white" />
                        },
                        {
                          title: "Проактивность",
                          description: "Предупреждаем риски до их реализации",
                          icon: <ShieldCheckIcon className="w-6 h-6 text-white" />
                        }
                      ].map((item, index) => (
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
                      onClick={() => {
                        smoothScrollTo('early-access-form');
                      }}
                    >
                      Получить доступ
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Tour Section */}
        <ProductTourSection />

        {/* Target Audience Section */}
        <TargetAudienceSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Contact Form Section */}
        <ContactFormSection
          formData={formData}
          onFormSubmit={handleFormSubmit}
          onInputChange={handleInputChange}
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
                <img 
                  src="/images/logo.png" 
                  alt="Право (риски)" 
                  className="w-10 h-10 object-contain scale-150"
                />
                <span className="text-xl font-bold text-white">Право (риски)</span>
              </Link>
              <p className="text-gray-400 mb-4 max-w-md">
                AI-платформа для комплексного управления корпоративными рисками. 
                Превращаем хаос в систему, реактивность в проактивность.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <GlobeIcon className="w-5 h-5 text-gray-400" />
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <FileTextIcon className="w-5 h-5 text-gray-400" />
                </div>
              </div>
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
                <li className="text-gray-400">+7 (495) 123-45-67</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Право (риски). Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}