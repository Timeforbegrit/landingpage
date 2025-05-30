import { createClient } from '@supabase/supabase-js'

// Проверяем наличие переменных окружения
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL не найдена')
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

if (!supabaseAnonKey) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY не найдена')
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
}

console.log('✅ Supabase переменные окружения найдены')
console.log('🔗 Supabase URL:', supabaseUrl)

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web'
    }
  }
})

// Типы для базы данных
export interface SubmissionRecord {
  id: string
  name: string
  email: string
  company: string
  position?: string
  phone: string
  ip_address?: string
  user_agent?: string
  source: string
  status: 'new' | 'contacted' | 'qualified' | 'converted'
  created_at: string
  updated_at: string
  notes?: string
  admin_notes?: string
}

export interface AdminProfile {
  id: string
  email: string
  full_name?: string
  role: 'admin' | 'super_admin'
  created_at: string
  last_login?: string
} 