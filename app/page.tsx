'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Inter, Manrope } from 'next/font/google'
import CapabilitiesSection from "@/components/sections/CapabilitiesSection"
import ProductTourSection from "@/components/sections/ProductTourSection"
import { 
  ChevronDownIcon, 
  CheckIcon, 
  PlayIcon, 
  ArrowRightIcon, 
  ShieldCheckIcon, 
  ZapIcon, 
  BarChart3Icon, 
  UsersIcon, 
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
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    position: '',
    phone: ''
  })
  const observerRef = useRef<IntersectionObserver | null>(null)

  const capabilities = [
    {
      icon: <BrainCircuitIcon className="w-8 h-8" />,
      title: "AI-анализ рисков",
      description: "Автоматическое выявление и оценка корпоративных рисков с помощью ИИ"
    },
    {
      icon: <TargetIcon className="w-8 h-8" />,
      title: "Единая система",
      description: "Все типы рисков в одной платформе: операционные, финансовые, правовые"
    },
    {
      icon: <ZapIcon className="w-8 h-8" />,
      title: "Автоматизация",
      description: "Превращение решений в конкретные задачи с назначением ответственных"
    },
    {
      icon: <BarChart3Icon className="w-8 h-8" />,
      title: "Аналитика",
      description: "Детальная отчетность и прогнозирование развития рисков"
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      title: "Безопасность",
      description: "Соответствие стандартам безопасности и защиты данных"
    },
    {
      icon: <UsersIcon className="w-8 h-8" />,
      title: "Коллаборация",
      description: "Совместная работа команд над управлением рисками"
    }
  ]

  const targetAudience = [
    { role: "CRO", description: "Chief Risk Officer" },
    { role: "Compliance", description: "Руководители комплаенса" },
    { role: "Legal Head", description: "Главные юристы" },
    { role: "HR-D", description: "HR-директора" },
    { role: "COO", description: "Операционные директора" },
    { role: "CISO", description: "Директора по ИБ" },
    { role: "CFO", description: "Финансовые директора" }
  ]

  const faqItems = [
    {
      question: "Чем «Право (риски)» отличается от классических GRC?",
      answer: "Фокус на AI-цикле выявления-митигации, а не только отчётности. Мы автоматизируем весь процесс от обнаружения риска до конкретных действий."
    },
    {
      question: "Сколько длится внедрение?",
      answer: "MVP-запуск за 4–6 недель при готовых данных. Полное внедрение занимает 2-3 месяца в зависимости от сложности интеграций."
    },
    {
      question: "Какие интеграции есть?",
      answer: "REST API, SFTP import, Webhooks; готовые коннекторы Jira, SAP, 1C. Также поддерживаем интеграцию с популярными CRM и ERP системами."
    },
    {
      question: "Возможен ли on-premise?",
      answer: "В дорожной карте на Q1 2026, сейчас SaaS EU-кластер с высоким уровнем безопасности и соответствием GDPR."
    },
    {
      question: "Что в roadmap?",
      answer: "Машинное обучение для прогнозирования рисков, интеграция с внешними источниками данных, мобильное приложение, on-premise решение."
    },
    {
      question: "Сколько стоит?",
      answer: "Ценообразование user-tier, финальная цена после интервью. Стартовые планы от 50 000₽/месяц для команды до 10 человек."
    }
  ]

  const workflowSteps = [
    {
      step: "01",
      title: "Выявление",
      description: "AI сканирует документы, процессы и выявляет потенциальные риски",
      icon: <BrainCircuitIcon className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10"
    },
    {
      step: "02", 
      title: "Оценка",
      description: "Автоматический расчет вероятности и ущерба, присвоение приоритета",
      icon: <BarChart3Icon className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500", 
      bgColor: "bg-purple-500/10"
    },
    {
      step: "03",
      title: "Планирование",
      description: "Формирование AI-плана действий с конкретными шагами митигации",
      icon: <TargetIcon className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10"
    },
    {
      step: "04",
      title: "Исполнение",
      description: "Превращение плана в задачи с назначением ответственных и дедлайнов",
      icon: <CheckIcon className="w-8 h-8" />,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500/10"
    }
  ]

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Здесь будет логика отправки формы
    console.log('Form submitted:', formData)
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className={`flex flex-col min-h-screen bg-[#10131a] text-white ${inter.className}`}>
      <style jsx global>{`
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
        <div className="max-w-7xl mx-auto flex w-full items-center justify-between py-4 px-6">
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
          <nav className="hidden md:flex flex-1 justify-center items-center gap-8">
            <Link href="#product" className="text-gray-300 hover:text-white transition-colors">Продукт</Link>
            <Link href="#capabilities" className="text-gray-300 hover:text-white transition-colors">Возможности</Link>
            <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">Как работает</Link>
            <Link href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link>
          </nav>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
            onClick={() => {
              document.getElementById('early-access-form')?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
              });
            }}
          >
            Записаться на интервью
          </Button>
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
                  document.getElementById('early-access-form')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                  });
                }}
              >
                Записаться на интервью
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg"
                onClick={() => {
                  document.getElementById('product')?.scrollIntoView({ 
                    behavior: 'smooth'
                  });
                }}
              >
                <PlayIcon className="w-5 h-5 mr-2" />
                Посмотреть демо
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto fade-in delay-2">
              <div className="text-center p-6 border border-gray-800/50 rounded-lg bg-gray-900/20 backdrop-blur-md outline-none transition-all duration-300 hover:scale-105 hover:bg-gray-900/30 hover:backdrop-blur-lg hover:border-blue-600">
                <div className="text-3xl font-bold text-blue-500 mb-2">4-6 недель</div>
                <div className="text-gray-400">MVP-запуск</div>
              </div>
              <div className="text-center p-6 border border-gray-800/50 rounded-lg bg-gray-900/20 backdrop-blur-md outline-none transition-all duration-300 hover:scale-105 hover:bg-gray-900/30 hover:backdrop-blur-lg hover:border-blue-600">
                <div className="text-3xl font-bold text-blue-500 mb-2">AI-powered</div>
                <div className="text-gray-400">Анализ рисков</div>
              </div>
              <div className="text-center p-6 border border-gray-800/50 rounded-lg bg-gray-900/20 backdrop-blur-md outline-none transition-all duration-300 hover:scale-105 hover:bg-gray-900/30 hover:backdrop-blur-lg hover:border-blue-600">
                <div className="text-3xl font-bold text-blue-500 mb-2">100%</div>
                <div className="text-gray-400">Автоматизация</div>
              </div>
            </div>
          </div>
        </section>

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
                От хаоса разрозненных систем к единой AI-платформе управления рисками
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
              {/* Problem Side */}
              <div className="scroll-animation">
                <div className="relative h-full">
                  {/* Problem Card */}
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
                          description: "Excel, Jira, email, документы — нет единой картины",
                          icon: <BarChart3Icon className="w-6 h-6 text-white" />
                        },
                        {
                          title: "Ручная работа",
                          description: "Сбор данных, оценка, планирование занимают недели",
                          icon: <ClockIcon className="w-6 h-6 text-white" />
                        },
                        {
                          title: "Нет исполнения",
                          description: "Планы остаются планами, нет контроля выполнения",
                          icon: <AlertTriangleIcon className="w-6 h-6 text-white" />
                        },
                        {
                          title: "Реактивность",
                          description: "Узнаём о проблемах постфактум, когда ущерб уже нанесён",
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
                          <div className="text-2xl font-bold text-red-400">4-6 недель</div>
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
                          description: "Все риски в одном месте с автоматической синхронизацией",
                          icon: <TargetIcon className="w-6 h-6 text-white" />
                        },
                        {
                          title: "AI-автоматизация",
                          description: "Выявление, оценка и планирование за минуты, не недели",
                          icon: <BrainCircuitIcon className="w-6 h-6 text-white" />
                        },
                        {
                          title: "Исполнение",
                          description: "Автоматическое создание задач с ответственными и дедлайнами",
                          icon: <CheckIcon className="w-6 h-6 text-white" />
                        },
                        {
                          title: "Проактивность",
                          description: "Предупреждение рисков до их материализации",
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
                          <div className="text-2xl font-bold text-blue-400">15 мин</div>
                          <div className="text-xs text-blue-300/70">полный анализ</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-400">100%</div>
                          <div className="text-xs text-blue-300/70">автоматизация</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating CTA */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <Button 
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-full font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105"
                      onClick={() => {
                        document.getElementById('early-access-form')?.scrollIntoView({ 
                          behavior: 'smooth',
                          block: 'center'
                        });
                      }}
                    >
                      Попробовать решение
                      <ArrowRightIcon className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <CapabilitiesSection />

        {/* Product Tour Section */}
        <ProductTourSection />

        {/* Target Audience Section */}
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

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-6 bg-gray-900/50 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
          </div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16 scroll-animation">
              <h2 className={`text-4xl md:text-5xl font-bold mb-6 text-red-500 ${manrope.className}`}>
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
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-500/50 to-purple-500/50 animate-pulse" />
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-purple-500/50 to-green-500/50 animate-pulse" style={{animationDelay: '0.5s'}} />
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-green-500/50 to-orange-500/50 animate-pulse" style={{animationDelay: '1s'}} />
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
                        {step.icon}
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

        {/* FAQ Section */}
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

        {/* Early Access Form */}
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
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                <li><Link href="#capabilities" className="text-gray-400 hover:text-white transition-colors">Возможности</Link></li>
                <li><Link href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">Как работает</Link></li>
                <li><Link href="#faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
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