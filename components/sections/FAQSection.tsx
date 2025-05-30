'use client'

import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { Manrope } from 'next/font/google'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "Как быстро можно внедрить систему в компании?",
    answer: "Тестовая версия запускается за 4-6 недель. Полная интеграция со всеми корпоративными системами занимает 2-3 месяца в зависимости от сложности инфраструктуры."
  },
  {
    question: "Какие типы корпоративных рисков покрывает система?",
    answer: "Система охватывает все виды корпоративных рисков: правовые, финансовые, операционные, технологические, репутационные, ESG-риски, комплаенс-риски и другие."
  },
  {
    question: "Как работает AI-анализ рисков?",
    answer: "ИИ анализирует паттерны рисков, прогнозирует потенциальные угрозы, формирует планы действий и автоматически распределяет задачи между ответственными сотрудниками на основе исторических данных и актуальной ситуации."
  },
  {
    question: "Можно ли интегрировать систему с существующими решениями?",
    answer: "Да, система имеет открытые API для интеграции с ERP, CRM, документооборотом, системами мониторинга и другими корпоративными решениями."
  },
  {
    question: "Какой уровень безопасности данных обеспечивается?",
    answer: "Система соответствует стандартам ISO 27001, имеет сертификацию по защите персональных данных, использует шифрование данных и многофакторную аутентификацию."
  },
  {
    question: "Сколько стоит внедрение и поддержка системы?",
    answer: "Стоимость зависит от размера компании и объема рисков. Базовая лицензия от 500 000 рублей в год. Точная стоимость рассчитывается индивидуально после анализа потребностей."
  }
]

interface FAQItemComponentProps {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
}

function FAQItemComponent({ item, isOpen, onToggle }: FAQItemComponentProps) {
  return (
    <div className="border border-gray-800/50 rounded-lg bg-gray-900/20 backdrop-blur-md transition-all duration-300 hover:bg-gray-900/30 hover:border-blue-600/50">
      <button
        className="w-full px-6 py-6 text-left flex justify-between items-center"
        onClick={onToggle}
      >
        <h3 className={`text-lg font-semibold text-white pr-4 ${manrope.className}`}>
          {item.question}
        </h3>
        <div className="flex-shrink-0">
          {isOpen ? (
            <ChevronUpIcon className="w-6 h-6 text-blue-500" />
          ) : (
            <ChevronDownIcon className="w-6 h-6 text-gray-400" />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="px-6 pb-6">
          <p className="text-gray-300 leading-relaxed">
            {item.answer}
          </p>
        </div>
      )}
    </div>
  )
}

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-800/10 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16 scroll-animation">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${manrope.className}`}>
            <span className="text-white">Часто задаваемые </span>
            <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              вопросы
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ответы на ключевые вопросы о внедрении и использовании системы управления корпоративными рисками
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="scroll-animation" style={{ animationDelay: `${index * 0.1}s` }}>
              <FAQItemComponent
                item={item}
                isOpen={openItems.includes(index)}
                onToggle={() => toggleItem(index)}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-12 scroll-animation">
          <p className="text-gray-400 mb-4">
            Не нашли ответ на свой вопрос?
          </p>
          <a 
            href="#early-access-form" 
            className="inline-flex items-center text-blue-500 hover:text-blue-400 font-semibold transition-colors"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('early-access-form')?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
              })
            }}
          >
            Задать вопрос нашим экспертам
          </a>
        </div>
      </div>
    </section>
  )
} 