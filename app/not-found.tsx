'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon, HomeIcon } from 'lucide-react'
import { Manrope } from 'next/font/google'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Фоновые эффекты */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-md mx-auto text-center relative z-10">
        {/* 404 число */}
        <div className="mb-8">
          <h1 className={`text-8xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent ${manrope.className}`}>
            404
          </h1>
        </div>

        {/* Заголовок */}
        <h2 className={`text-2xl font-bold text-white mb-4 ${manrope.className}`}>
          Страница не найдена
        </h2>

        {/* Описание */}
        <p className="text-gray-300 mb-8 leading-relaxed">
          К сожалению, запрашиваемая страница не существует или была перемещена. 
          Проверьте правильность адреса или вернитесь на главную страницу.
        </p>

        {/* Кнопки */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            <Link href="/">
              <HomeIcon className="w-5 h-5 mr-2" />
              На главную
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-6 py-3 rounded-lg font-semibold"
            onClick={() => window.history.back()}
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Назад
          </Button>
        </div>

        {/* Дополнительная информация */}
        <div className="mt-12 p-6 bg-gray-800/50 rounded-lg border border-gray-700/50">
          <h3 className="text-lg font-semibold text-white mb-3">
            Нужна помощь?
          </h3>
          <p className="text-gray-300 text-sm">
            Если вы считаете, что это ошибка, свяжитесь с нами через форму обратной связи на главной странице.
          </p>
        </div>
      </div>
    </div>
  )
} 