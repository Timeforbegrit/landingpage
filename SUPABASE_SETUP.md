# 🚀 Настройка Supabase + Админ панель

## ✅ Что уже сделано:

1. **Проект Supabase создан**: `kfmjqugkczichvlhmdtn`
2. **Таблицы созданы**: `submissions`, `admin_profiles`
3. **Аутентификация настроена**: Row Level Security включен
4. **Админ панель**: `/admin` с логином и функционалом
5. **API обновлен**: интеграция с Supabase

---

## 🔧 Настройка переменных окружения

Скопируйте содержимое `supabase-config.txt` в ваш `.env.local` файл:

```env
NEXT_PUBLIC_SUPABASE_URL=https://kfmjqugkczichvlhmdtn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmbWpxdWdrY3ppY2h2bGhtZHRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MTEwNTUsImV4cCI6MjA2NDA4NzA1NX0.ANO2KSYpJQ6I9kgDhQWPzIXXdNLmLGxU-cMSyqIx_Jk
ADMIN_EMAIL=admin@pravorisk.ai
```

---

## 👤 Создание первого админ пользователя

### Вариант 1: Через Supabase Dashboard (Рекомендуется)

1. Откройте [Supabase Dashboard](https://app.supabase.com/project/kfmjqugkczichvlhmdtn)
2. Перейдите в **Authentication** → **Users**
3. Нажмите **Add user**
4. Заполните:
   - Email: `admin@pravorisk.ai`
   - Password: `ваш_безопасный_пароль`
   - Confirm: включите
5. Нажмите **Create user**

### Вариант 2: Через SQL (для разработки)

1. Откройте **SQL Editor** в Supabase Dashboard
2. Выполните команду:

```sql
SELECT create_admin_user('admin@pravorisk.ai', 'password123', 'Администратор');
```

**⚠️ ВАЖНО**: Замените `password123` на безопасный пароль!

---

## 🏃‍♂️ Запуск системы

```bash
# Установка зависимостей (если еще не установлены)
npm install

# Запуск в режиме разработки
npm run dev
```

Теперь доступны:
- **Лендинг**: http://localhost:3000
- **Админ панель**: http://localhost:3000/admin

---

## 🔐 Вход в админ панель

1. Перейдите на http://localhost:3000/admin
2. Введите данные созданного админ пользователя:
   - Email: `admin@pravorisk.ai`
   - Password: ваш пароль

---

## 📊 Функционал админ панели

### ✅ Что доступно:

- **📋 Просмотр заявок**: все заявки с формы в реальном времени
- **🔍 Поиск и фильтрация**: по имени, email, компании, статусу
- **📈 Статистика**: общая статистика по заявкам
- **📝 Управление статусами**: 
  - Новая
  - Связались  
  - Квалифицированная
  - Конвертирована
- **📧 Быстрые действия**: кнопки "Написать письмо" и "Позвонить"
- **👤 Профиль админа**: информация о последнем входе
- **🚪 Безопасный выход**: кнопка выхода

### 📱 Адаптивность:
- Полностью адаптивный дизайн
- Работает на всех устройствах
- Темная тема

---

## 🛡️ Безопасность

### Row Level Security (RLS) настроен:

1. **Заявки**:
   - Создание: разрешено всем (для формы)
   - Чтение/Обновление: только для админов
   
2. **Профили админов**:
   - Доступ: только для владельца профиля

### Рекомендации:

1. **Смените пароль** админа на безопасный
2. **Включите 2FA** в Supabase Dashboard
3. **Ограничьте IP** доступ к админ панели (опционально)

---

## 📧 Настройка Email уведомлений

### Текущий статус:
В API есть заглушка для email уведомлений. Для активации:

#### Resend (рекомендуется):
```bash
npm install resend
```

Добавьте в `.env.local`:
```env
RESEND_API_KEY=your_resend_api_key
```

Обновите функцию в `app/api/submit-form/route.ts`:
```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

async function sendEmailNotification(formData: FormData) {
  await resend.emails.send({
    from: 'noreply@pravorisk.ai',
    to: process.env.ADMIN_EMAIL!,
    subject: `Новая заявка от ${formData.name} (${formData.company})`,
    html: `
      <h2>Новая заявка с сайта "Право (риски)"</h2>
      <p><strong>Имя:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Компания:</strong> ${formData.company}</p>
      <p><strong>Должность:</strong> ${formData.position}</p>
      <p><strong>Телефон:</strong> ${formData.phone}</p>
      <p><a href="http://localhost:3000/admin">Перейти в админ панель</a></p>
    `
  })
}
```

---

## 🔄 Дополнительные админы

Для создания дополнительных админов:

1. В админ панели Supabase создайте нового пользователя
2. Добавьте запись в таблицу `admin_profiles`:

```sql
INSERT INTO public.admin_profiles (id, email, full_name, role)
VALUES (
  'user_id_from_auth_users',
  'new-admin@pravorisk.ai',
  'Имя нового админа',
  'admin'
);
```

---

## 📈 Мониторинг и аналитика

### Supabase Dashboard:
- **Database**: просмотр данных напрямую
- **Auth**: управление пользователями
- **Logs**: мониторинг запросов и ошибок
- **Usage**: статистика использования

### В админ панели:
- Статистика по статусам заявок
- Поиск и фильтрация
- Экспорт данных (можно добавить)

---

## 🚀 Деплой

### Vercel:
```bash
# Билд проекта
npm run build

# Деплой на Vercel
vercel --prod
```

### Environment Variables в Vercel:
Добавьте переменные из `.env.local` в настройки проекта Vercel.

---

## ⚡ Быстрый тест

1. Откройте http://localhost:3000
2. Заполните форму "Получить доступ"
3. Откройте http://localhost:3000/admin
4. Войдите как админ
5. Проверьте, что заявка появилась в списке

---

## 🆘 Устранение проблем

### Ошибка подключения к Supabase:
- Проверьте переменные в `.env.local`
- Убедитесь, что проект активен

### Не можете войти в админку:
- Проверьте, что пользователь создан в Auth
- Проверьте, что есть запись в `admin_profiles`

### Заявки не появляются:
- Проверьте RLS политики
- Убедитесь, что таблица `submissions` создана

---

**🎉 Готово! Система полностью настроена и готова к использованию.** 