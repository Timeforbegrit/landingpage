# Варианты реализации бэкенда для получения заявок

## 🎯 Обзор

Вот **3 варианта реализации бэкенда** для получения и обработки заполненных заявок с лендинга "Право (риски)":

---

## 📋 Вариант 1: Next.js API Routes + Local Storage (Реализован)

### ✅ Преимущества:
- **Быстрый запуск** - готов к работе без дополнительных настроек
- **Простота** - все в одном проекте
- **Отладка** - легко тестировать локально
- **Валидация** - встроенная проверка данных
- **Типизация** - полная поддержка TypeScript

### ⚙️ Что уже реализовано:

#### API Endpoint: `/api/submit-form`
```typescript
// POST - отправка заявки
{
  "name": "Иван Петров",
  "email": "ivan@company.com", 
  "company": "ООО Компания",
  "position": "Директор",
  "phone": "+7 999 123-45-67"
}

// GET - получение всех заявок (для админки)
```

#### Функции:
- ✅ Валидация форм (email, телефон, обязательные поля)
- ✅ Сохранение в JSON файл (`/data/submissions.json`)
- ✅ Email уведомления (заглушка, готово для интеграции)
- ✅ Административная панель (`/admin`)
- ✅ Обработка ошибок и состояний загрузки
- ✅ Метаданные (IP, User Agent, время)

### 🚀 Запуск:
```bash
npm run dev
# Форма: http://localhost:3000
# Админка: http://localhost:3000/admin
```

### 📧 Интеграция Email сервисов:
Замените функцию `sendEmailNotification` в `/app/api/submit-form/route.ts`:

#### Nodemailer + SMTP:
```bash
npm install nodemailer @types/nodemailer
```

```typescript
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransporter({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

async function sendEmailNotification(formData: FormData) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: 'sales@newbusiness.io',
    subject: `Новая заявка от ${formData.name} (${formData.company})`,
    html: `
      <h2>Новая заявка с сайта</h2>
      <p><strong>Имя:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Компания:</strong> ${formData.company}</p>
      <p><strong>Должность:</strong> ${formData.position}</p>
      <p><strong>Телефон:</strong> ${formData.phone}</p>
    `
  })
}
```

#### Resend (рекомендуется):
```bash
npm install resend
```

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

async function sendEmailNotification(formData: FormData) {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'sales@newbusiness.io',
    subject: `Новая заявка от ${formData.name} (${formData.company})`,
    html: `...`
  })
}
```

---

## 📋 Вариант 2: Next.js + База данных + CRM интеграция

### ✅ Преимущества:
- **Надежность** - данные в базе данных
- **Масштабируемость** - готов к росту
- **CRM интеграция** - автоматическая синхронизация
- **Аналитика** - подробная статистика
- **Backup** - автоматическое резервирование

### 🛠️ Технологии:
- **База данных**: PostgreSQL / MongoDB / Supabase
- **ORM**: Prisma / Mongoose
- **CRM**: HubSpot / AmoCRM / Bitrix24

### 📦 Установка:

#### PostgreSQL + Prisma:
```bash
npm install prisma @prisma/client
npm install @types/bcryptjs bcryptjs
npx prisma init
```

#### Schema (`prisma/schema.prisma`):
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Submission {
  id        String   @id @default(cuid())
  name      String
  email     String
  company   String
  position  String?
  phone     String
  
  // Метаданные
  ip        String?
  userAgent String?
  source    String?  @default("website")
  status    String   @default("new") // new, contacted, qualified, converted
  
  // Временные метки
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // CRM интеграция
  crmId     String?  // ID в CRM системе
  crmSynced Boolean  @default(false)
  
  @@map("submissions")
}
```

#### API с базой данных:
```typescript
// app/api/submit-form/route.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  const formData: FormData = await request.json()
  
  // Валидация...
  
  // Сохранение в БД
  const submission = await prisma.submission.create({
    data: {
      ...formData,
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    }
  })
  
  // Отправка в CRM
  await syncToCRM(submission)
  
  return NextResponse.json({ success: true, submissionId: submission.id })
}
```

#### HubSpot интеграция:
```bash
npm install @hubspot/api-client
```

```typescript
import { Client } from '@hubspot/api-client'

const hubspotClient = new Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN })

async function syncToCRM(submission: any) {
  try {
    const contact = await hubspotClient.crm.contacts.basicApi.create({
      properties: {
        firstname: submission.name.split(' ')[0],
        lastname: submission.name.split(' ').slice(1).join(' '),
        email: submission.email,
        phone: submission.phone,
        company: submission.company,
        jobtitle: submission.position,
        hs_lead_status: 'NEW',
        lifecyclestage: 'lead'
      }
    })
    
    // Обновляем запись в БД
    await prisma.submission.update({
      where: { id: submission.id },
      data: { 
        crmId: contact.id,
        crmSynced: true 
      }
    })
  } catch (error) {
    console.error('Ошибка синхронизации с CRM:', error)
  }
}
```

---

## 📋 Вариант 3: Headless CMS + Webhook

### ✅ Преимущества:
- **Безопасность** - нет прямого доступа к базе
- **Готовые инструменты** - админка из коробки
- **API ready** - готовые эндпоинты
- **Webhook** - мгновенные уведомления
- **Модерация** - возможность проверки заявок

### 🛠️ Технологии:
- **CMS**: Strapi / Directus / Contentful
- **Hosting**: Heroku / Railway / Render
- **Webhook**: Discord / Slack / Email

### 📦 Strapi Setup:

#### Установка:
```bash
npx create-strapi-app@latest backend --quickstart
cd backend
npm run develop
```

#### Content Type "Submission":
```json
{
  "kind": "collectionType",
  "collectionName": "submissions",
  "info": {
    "singularName": "submission",
    "pluralName": "submissions",
    "displayName": "Form Submissions"
  },
  "attributes": {
    "name": { "type": "string", "required": true },
    "email": { "type": "email", "required": true },
    "company": { "type": "string", "required": true },
    "position": { "type": "string" },
    "phone": { "type": "string", "required": true },
    "status": { 
      "type": "enumeration",
      "enum": ["new", "contacted", "qualified", "converted"],
      "default": "new"
    },
    "notes": { "type": "text" }
  }
}
```

#### API в Next.js:
```typescript
// app/api/submit-form/route.ts
export async function POST(request: NextRequest) {
  const formData = await request.json()
  
  // Отправка в Strapi
  const response = await fetch(`${process.env.STRAPI_URL}/api/submissions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.STRAPI_TOKEN}`
    },
    body: JSON.stringify({ data: formData })
  })
  
  if (!response.ok) {
    throw new Error('Ошибка сохранения в CMS')
  }
  
  const result = await response.json()
  
  // Webhook уведомление
  await sendWebhook(result.data)
  
  return NextResponse.json({ success: true })
}
```

#### Discord Webhook:
```typescript
async function sendWebhook(submission: any) {
  await fetch(process.env.DISCORD_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      embeds: [{
        title: "🎯 Новая заявка!",
        color: 0x0099ff,
        fields: [
          { name: "Имя", value: submission.name, inline: true },
          { name: "Email", value: submission.email, inline: true },
          { name: "Компания", value: submission.company, inline: true },
          { name: "Телефон", value: submission.phone, inline: true }
        ],
        timestamp: new Date().toISOString()
      }]
    })
  })
}
```

---

## 🎯 Рекомендации по выбору

### 🚀 Для MVP и быстрого старта:
**Вариант 1** - уже реализован и готов к работе

### 🏢 Для корпоративного проекта:
**Вариант 2** - максимальный контроль и интеграции

### 🛡️ Для безопасности и простоты:
**Вариант 3** - готовая инфраструктура

---

## 📊 Дополнительные возможности

### Analytics интеграция:
```typescript
// Google Analytics 4
gtag('event', 'form_submit', {
  event_category: 'engagement',
  event_label: 'early_access_form'
})

// Яндекс.Метрика
ym(METRIKA_ID, 'reachGoal', 'FORM_SUBMIT')
```

### Anti-spam защита:
```bash
npm install react-google-recaptcha
```

```typescript
import ReCAPTCHA from 'react-google-recaptcha'

// В форме
<ReCAPTCHA
  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
  onChange={setCaptchaToken}
/>
```

### Rate limiting:
```bash
npm install @upstash/redis @upstash/ratelimit
```

### Email templates:
```typescript
// Красивые email с React Email
import { render } from '@react-email/render'
import NewSubmissionEmail from './emails/NewSubmission'

const emailHtml = render(<NewSubmissionEmail submission={formData} />)
```

---

## 🔧 Environment Variables

```env
# .env.local

# Email (Resend)
RESEND_API_KEY=your_resend_key

# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# CRM (HubSpot)
HUBSPOT_ACCESS_TOKEN=your_hubspot_token

# CMS (Strapi)
STRAPI_URL=http://localhost:1337
STRAPI_TOKEN=your_strapi_token

# Webhooks
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
```

---

## 🚀 Деплой

### Vercel (для Варианта 1):
```bash
npm run build
vercel --prod
```

### Railway (для Варианта 2):
```bash
# railway.toml
[build]
builder = "nixpacks"

[deploy]
healthcheckPath = "/"
healthcheckTimeout = 300
restartPolicyType = "always"
```

### Docker (для Варианта 3):
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Все три варианта готовы к использованию и могут быть адаптированы под ваши конкретные потребности! 🎯 