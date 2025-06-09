import { Manrope } from 'next/font/google'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Фоновые эффекты */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
      </div>

      <div className="text-center relative z-10">
        {/* Анимированный логотип/спиннер */}
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto relative">
            {/* Внешнее кольцо */}
            <div className="absolute inset-0 border-4 border-gray-700 rounded-full"></div>
            {/* Анимированное кольцо */}
            <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            {/* Внутренний элемент */}
            <div className="absolute inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
          </div>
        </div>

        {/* Текст загрузки */}
        <h2 className={`text-xl font-semibold text-white mb-2 ${manrope.className}`}>
          Загрузка...
        </h2>
        
        <p className="text-gray-400 text-sm">
          Подготавливаем систему управления рисками
        </p>

        {/* Анимированные точки */}
        <div className="flex justify-center space-x-1 mt-6">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  )
} 