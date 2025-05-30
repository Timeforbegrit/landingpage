import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

export async function GET() {
  try {
    // Проверяем переменные окружения
    const hasSupabaseUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
    const hasSupabaseKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    let supabaseConnected = false
    let supabaseError = null
    
    // Проверяем подключение к Supabase
    if (hasSupabaseUrl && hasSupabaseKey) {
      try {
        const { data, error } = await supabase
          .from('submissions')
          .select('count', { count: 'exact', head: true })
        
        if (error) {
          supabaseError = error.message
        } else {
          supabaseConnected = true
        }
      } catch (err) {
        supabaseError = err instanceof Error ? err.message : 'Неизвестная ошибка'
      }
    }
    
    const status = {
      api: 'working',
      timestamp: new Date().toISOString(),
      environment: {
        hasSupabaseUrl,
        hasSupabaseKey,
        supabaseConnected,
        supabaseError
      },
      nextjs: process.env.NODE_ENV || 'unknown'
    }
    
    const isHealthy = hasSupabaseUrl && hasSupabaseKey && supabaseConnected
    
    return NextResponse.json(status, { 
      status: isHealthy ? 200 : 503 
    })
    
  } catch (error) {
    return NextResponse.json({
      api: 'error',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Неизвестная ошибка'
    }, { status: 500 })
  }
} 