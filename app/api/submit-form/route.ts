import { NextRequest, NextResponse } from 'next/server'
import { FormData } from '@/lib/types'
import { supabase } from '@/lib/supabase/client'

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

// Отправка email уведомления (заглушка)
async function sendEmailNotification(formData: FormData) {
  console.log('📧 Отправка email уведомления:', {
    to: 'sales@newbusiness.io',
    subject: `Новая заявка от ${formData.name} (${formData.company})`,
    data: formData
  })
  
  // Здесь можно интегрировать реальный email сервис:
  // - Nodemailer + SMTP
  // - SendGrid
  // - Mailgun
  // - Resend
  
  return true
}

export async function POST(request: NextRequest) {
  try {
    const formData: FormData = await request.json()
    
    // Валидация данных
    const validation = validateFormData(formData)
    if (!validation.isValid) {
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
    
    // Сохранение в Supabase
    const { data: submission, error } = await supabase
      .from('submissions')
      .insert([submissionData])
      .select()
      .single()
    
    if (error) {
      console.error('Ошибка сохранения в Supabase:', error)
      return NextResponse.json({
        success: false,
        message: 'Ошибка сохранения данных'
      }, { status: 500 })
    }
    
    // Отправка email уведомления
    await sendEmailNotification(formData)
    
    // Успешный ответ
    return NextResponse.json({
      success: true,
      message: 'Заявка успешно отправлена! Мы свяжемся с вами в течение 24 часов.',
      submissionId: submission.id
    })
    
  } catch (error) {
    console.error('Ошибка обработки формы:', error)
    return NextResponse.json({
      success: false,
      message: 'Внутренняя ошибка сервера'
    }, { status: 500 })
  }
}

// API для получения всех заявок (только для админов)
export async function GET() {
  try {
    // Получение заявок из Supabase
    const { data: submissions, error } = await supabase
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Ошибка получения заявок:', error)
      return NextResponse.json({
        success: false,
        message: 'Ошибка получения данных'
      }, { status: 500 })
    }
    
    return NextResponse.json({
      success: true,
      submissions: submissions || []
    })
  } catch (error) {
    console.error('Ошибка получения заявок:', error)
    return NextResponse.json({
      success: false,
      message: 'Ошибка получения данных'
    }, { status: 500 })
  }
} 