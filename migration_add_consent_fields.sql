-- Добавление полей согласий в таблицу submissions
-- Выполните этот SQL в Supabase SQL Editor

ALTER TABLE public.submissions 
ADD COLUMN IF NOT EXISTS data_processing_consent BOOLEAN DEFAULT false NOT NULL,
ADD COLUMN IF NOT EXISTS marketing_consent BOOLEAN DEFAULT false NOT NULL;

-- Добавляем комментарии для понимания полей
COMMENT ON COLUMN public.submissions.data_processing_consent IS 'Согласие на обработку персональных данных (обязательное)';
COMMENT ON COLUMN public.submissions.marketing_consent IS 'Согласие на получение маркетинговых сообщений (опциональное)';

-- Создаем индекс для быстрого поиска по согласиям
CREATE INDEX IF NOT EXISTS idx_submissions_consents ON public.submissions(data_processing_consent, marketing_consent);

-- Проверяем, что поля добавились
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'submissions' 
  AND column_name IN ('data_processing_consent', 'marketing_consent'); 