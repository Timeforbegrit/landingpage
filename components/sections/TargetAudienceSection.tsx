'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Manrope } from 'next/font/google'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

// Обновленные данные согласно спецификации, но в формате исходного компонента
const targetAudience = [
  {
    role: "Директор по рискам",
    description: "Управление всеми рисками компании",
    customerJourney: "Я месяцами собирал риски из десятков Excel-файлов и почтовых цепочек. Теперь AI за минуты дает мне полную картину — работаю в 6 раз быстрее!"
  },
  {
    role: "Руководитель комплаенса", 
    description: "Контроль соответствия требованиям",
    customerJourney: "Раньше постоянно что-то упускала при проверках. Система сама отслеживает все требования — больше никаких штрафов от регуляторов."
  },
  {
    role: "Юридический директор",
    description: "Управление правовыми рисками",
    customerJourney: "Юридические риски были разбросаны везде... В переписках, договорах, отчетах. Единая карта экономит мне 4 дня в неделю."
  },
  {
    role: "HR-директор",
    description: "Управление кадровыми рисками",
    customerJourney: "Увольнения всегда были для меня сюрпризом. Теперь вижу проблемы за 3 месяца и успеваю их решить — текучесть упала вдвое!"
  },
  {
    role: "Директор по информационной безопасности",
    description: "Информационная безопасность",
    customerJourney: "Угрозы приходили из 15 разных систем. Я не успевал анализировать. Теперь все в одном дашборде — сплю спокойно."
  },
  {
    role: "Финансовый директор",
    description: "Финансовые риски и планирование",
    customerJourney: "Финансовые кризисы всегда застигали врасплох... Бюджеты летели. AI-прогнозы дают 95% точность — планирую на год вперед."
  },
  {
    role: "Операционный директор",
    description: "Операционные риски",
    customerJourney: "Когда останавливался конвейер, я узнавал последним. Убытки миллионные! Система предупреждает за час — простоев почти нет."
  }
]

const AudienceColumn = (props: {
  className?: string;
  audiences: typeof targetAudience;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 20,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.audiences.map(({ customerJourney, role, description }, i) => (
                <div className="p-8 rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg shadow-2xl shadow-blue-500/10 max-w-sm w-full hover:border-blue-500/50 transition-all duration-300 group" key={i}>
                  <div className="text-gray-300 leading-relaxed text-sm mb-6 group-hover:text-gray-200 transition-colors">
                    {customerJourney}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-bold text-lg">
                          {role.charAt(0)}
                        </span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className={`font-semibold tracking-tight leading-5 text-white group-hover:text-blue-300 transition-colors ${manrope.className}`}>
                        {role}
                      </div>
                      <div className="leading-5 text-gray-400 tracking-tight text-sm group-hover:text-gray-300 transition-colors">
                        {description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

export default function TargetAudienceSection() {
  // Разделяем аудиторию на три колонки для лучшей анимации
  const splitAudiences = [
    targetAudience.slice(0, 3),  // CRO, Compliance, Legal
    targetAudience.slice(3, 5),  // HR, CISO
    targetAudience.slice(5, 7),  // CFO, COO
  ]

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Фоновые эффекты */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.3)_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent ${manrope.className}`}>
            Кто использует платформу
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Руководители крупных компаний интегрируют <strong className="text-white">Право (риски)</strong> в свои ежедневные процессы для проактивного управления рисками
          </p>
        </div>

        {/* Анимированные колонки */}
        <div className="relative">
          {/* Контейнер с CSS mask для плавного исчезновения */}
          <div 
            className="flex gap-6 justify-center h-[600px]"
            style={{
              mask: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
              WebkitMask: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
            }}
          >
            {splitAudiences.map((audiences, columnIndex) => (
              <AudienceColumn
                key={columnIndex}
                className="flex-shrink-0"
                audiences={audiences}
                duration={15 + columnIndex * 5} // Разные скорости для каждой колонки
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 