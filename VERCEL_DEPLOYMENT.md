# Настройка проекта на Vercel

## Проблема 500 ошибки

Если вы получаете ошибку 500 на `/api/submit-form`, это скорее всего связано с отсутствием переменных окружения Supabase.

## Настройка переменных окружения в Vercel

### 1. Откройте настройки проекта в Vercel
1. Зайдите в [vercel.com](https://vercel.com)
2. Откройте ваш проект
3. Перейдите во вкладку **Settings**
4. Выберите **Environment Variables**

### 2. Добавьте следующие переменные:

#### Обязательные переменные для Supabase:
```
NEXT_PUBLIC_SUPABASE_URL = ваш_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY = ваш_supabase_anon_key
```

### 3. Где взять значения Supabase:
1. Зайдите в [supabase.com](https://supabase.com)
2. Откройте ваш проект
3. Перейдите в **Settings** → **API**
4. Скопируйте:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Project API keys** → **anon/public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Создание таблицы submissions в Supabase:

Выполните следующий SQL запрос в Supabase SQL Editor:

```sql
-- Создание таблицы submissions
CREATE TABLE IF NOT EXISTS public.submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  position VARCHAR(255),
  phone VARCHAR(50) NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  source VARCHAR(50) DEFAULT 'website',
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted')),
  notes TEXT,
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Создание индексов для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_submissions_email ON public.submissions(email);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON public.submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON public.submissions(status);

-- Включение Row Level Security (RLS)
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Политика для вставки данных (любой может создать заявку)
CREATE POLICY "Allow public insert" ON public.submissions
  FOR INSERT TO public
  WITH CHECK (true);

-- Политика для чтения данных (только аутентифицированные пользователи)
CREATE POLICY "Allow authenticated read" ON public.submissions
  FOR SELECT TO authenticated
  USING (true);

-- Политика для обновления данных (только аутентифицированные пользователи)
CREATE POLICY "Allow authenticated update" ON public.submissions
  FOR UPDATE TO authenticated
  USING (true);
```

### 5. После настройки переменных:
1. Сохраните переменные окружения в Vercel
2. Перейдите во вкладку **Deployments**
3. Нажмите **Redeploy** на последнем деплойменте
4. Дождитесь завершения деплоя

## Отладка ошибок

### Просмотр логов в Vercel:
1. Откройте ваш проект в Vercel
2. Перейдите во вкладку **Functions**
3. Найдите функцию `api/submit-form`
4. Нажмите на неё для просмотра логов

### Проверка подключения к Supabase:
1. Откройте [ваш_сайт]/api/submit-form в браузере
2. Должен вернуться список заявок (пустой массив, если заявок нет)

## Дополнительные рекомендации

### Безопасность:
- Убедитесь, что используете **anon/public** ключ, а не **service_role**
- Настройте RLS политики в Supabase для защиты данных

### Мониторинг:
- Настройте уведомления в Vercel для отслеживания ошибок
- Регулярно проверяйте логи функций

### Производительность:
- Рассмотрите добавление кэширования для GET запросов
- Используйте Vercel Analytics для мониторинга производительности 