import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
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