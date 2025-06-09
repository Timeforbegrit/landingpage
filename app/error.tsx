'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { RefreshCwIcon, HomeIcon, AlertTriangleIcon } from 'lucide-react'
import { Manrope } from 'next/font/google'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Логируем ошибку для мониторинга
    console.error('Application error:', error)
    
    // Здесь можно добавить отправку ошибки в сервис мониторинга
    // например, Sentry, LogRocket и т.д.
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Фоновые эффекты */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-md mx-auto text-center relative z-10">
        {/* Иконка ошибки */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto bg-red-500/20 rounded-full flex items-center justify-center">
            <AlertTriangleIcon className="w-10 h-10 text-red-500" />
          </div>
        </div>

        {/* Заголовок */}
        <h1 className={`text-3xl font-bold text-white mb-4 ${manrope.className}`}>
          Что-то пошло не так
        </h1>

        {/* Описание */}
        <p className="text-gray-300 mb-8 leading-relaxed">
          Произошла непредвиденная ошибка. Мы уже работаем над её устранением. 
          Попробуйте обновить страницу или вернуться на главную.
        </p>

        {/* Детали ошибки (только в development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 text-left">
            <h3 className="text-sm font-semibold text-red-400 mb-2">
              Детали ошибки (только в разработке):
            </h3>
            <p className="text-xs text-gray-400 font-mono break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-gray-500 mt-2">
                ID ошибки: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Кнопки */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
            onClick={reset}
          >
            <RefreshCwIcon className="w-5 h-5 mr-2" />
            Попробовать снова
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-6 py-3 rounded-lg font-semibold"
            onClick={() => window.location.href = '/'}
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            На главную
          </Button>
        </div>

        {/* Дополнительная информация */}
        <div className="mt-12 p-6 bg-gray-800/50 rounded-lg border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-3">
            Проблема не решается?
          </h3>
          <p className="text-gray-300 text-sm">
            Если ошибка повторяется, пожалуйста, свяжитесь с нашей службой поддержки 
            через форму обратной связи на главной странице.
          </p>
        </div>
      </div>
    </div>
  )
} 