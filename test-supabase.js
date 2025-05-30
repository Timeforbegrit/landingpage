const { createClient } = require('@supabase/supabase-js')

// Используем переменные окружения из .env.local
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('🔍 Проверка переменных окружения:')
console.log('URL:', supabaseUrl ? '✅ Найден' : '❌ Не найден')
console.log('Key:', supabaseAnonKey ? '✅ Найден' : '❌ Не найден')

if (supabaseUrl && supabaseAnonKey) {
  console.log('\n🔗 URL:', supabaseUrl)
  console.log('🔑 Key (первые 20 символов):', supabaseAnonKey.substring(0, 20) + '...')
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  
  // Тестовый запрос
  supabase
    .from('submissions')
    .select('count', { count: 'exact' })
    .then(({ data, error, count }) => {
      if (error) {
        console.log('\n❌ Ошибка подключения:', error)
      } else {
        console.log('\n✅ Подключение успешно!')
        console.log('📊 Количество записей в таблице submissions:', count)
      }
    })
    .catch(err => {
      console.log('\n❌ Критическая ошибка:', err)
    })
} else {
  console.log('\n❌ Переменные окружения не настроены')
} 