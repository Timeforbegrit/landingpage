import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

// Интерфейс для данных формы
interface FormSubmission {
  name: string
  email: string
  company: string
  position?: string
  phone: string
}

// Валидация данных формы
function validateFormData(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (!data.name || data.name.length < 2) {
    errors.push('Имя должно содержать минимум 2 символа')
  }
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Некорректный email адрес')
  }
  
  if (!data.company || data.company.length < 2) {
    errors.push('Название компании обязательно')
  }
  
  if (!data.phone || !/^[\+]?[1-9][\d]{10,14}$/.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
    errors.push('Некорректный номер телефона')
  }
  
  return { isValid: errors.length === 0, errors }
}

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Начало обработки POST запроса к /api/submit-form')
    
    // Диагностика переменных окружения
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    console.log('🔍 Проверка переменных окружения:')
    console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? `✅ ${supabaseUrl}` : '❌ НЕ НАЙДЕНА')
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? `✅ ${supabaseKey.substring(0, 20)}...` : '❌ НЕ НАЙДЕНА')
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Критическая ошибка: переменные окружения Supabase не настроены')
      return NextResponse.json({
        success: false,
        message: 'Ошибка конфигурации сервера',
        details: 'Supabase переменные окружения не настроены'
      }, { status: 500 })
    }
    
    // Получаем данные из запроса
    const formData: FormSubmission = await request.json()
    console.log('📥 Получены данные формы:', { 
      name: formData.name, 
      email: formData.email, 
      company: formData.company 
    })
    
    // Валидация данных
    const validation = validateFormData(formData)
    if (!validation.isValid) {
      console.log('❌ Ошибка валидации:', validation.errors)
      return NextResponse.json({
        success: false,
        errors: validation.errors
      }, { status: 400 })
    }
    
    // Подготовка данных для Supabase
    const submissionData = {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      position: formData.position || null,
      phone: formData.phone,
      ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      user_agent: request.headers.get('user-agent') || 'unknown',
      source: 'website'
    }
    
    console.log('💾 Попытка сохранения в Supabase...')
    
    // Сохранение в Supabase
    const { data: submission, error } = await supabase
      .from('submissions')
      .insert([submissionData])
      .select()
      .single()
    
    if (error) {
      console.error('❌ Ошибка сохранения в Supabase:', error)
      return NextResponse.json({
        success: false,
        message: 'Ошибка сохранения данных',
        details: error.message
      }, { status: 500 })
    }
    
    console.log('✅ Данные успешно сохранены:', submission?.id)
    
    // Логируем успешную отправку (вместо реальной отправки email)
    console.log('📧 Email уведомление (заглушка):', {
      to: 'admin@company.com',
      subject: `Новая заявка от ${formData.name} (${formData.company})`,
      submissionId: submission.id
    })
    
    // Успешный ответ
    return NextResponse.json({
      success: true,
      message: 'Заявка успешно отправлена! Мы свяжемся с вами в течение 24 часов.',
      submissionId: submission.id
    })
    
  } catch (error) {
    console.error('❌ Критическая ошибка в API:', error)
    return NextResponse.json({
      success: false,
      message: 'Внутренняя ошибка сервера',
      details: error instanceof Error ? error.message : 'Неизвестная ошибка'
    }, { status: 500 })
  }
}

// API для получения всех заявок (для отладки)
export async function GET() {
  try {
    console.log('🔍 GET запрос к /api/submit-form')
    
    // Получение заявок из Supabase
    const { data: submissions, error } = await supabase
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)
    
    if (error) {
      console.error('❌ Ошибка получения заявок:', error)
      return NextResponse.json({
        success: false,
        message: 'Ошибка получения данных',
        details: error.message
      }, { status: 500 })
    }
    
    console.log(`✅ Получено ${submissions?.length || 0} заявок`)
    
    return NextResponse.json({
      success: true,
      count: submissions?.length || 0,
      submissions: submissions || []
    })
  } catch (error) {
    console.error('❌ Ошибка в GET /api/submit-form:', error)
    return NextResponse.json({
      success: false,
      message: 'Ошибка получения данных',
      details: error instanceof Error ? error.message : 'Неизвестная ошибка'
    }, { status: 500 })
  }
} 