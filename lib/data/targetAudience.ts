import { TargetAudience } from '../types'

export const targetAudience: TargetAudience[] = [
  { 
    role: "CRO", 
    description: "Chief Risk Officer",
    customerJourney: "Получает еженедельные сводки по всем типам рисков компании. Использует ИИ-аналитику для стратегического планирования и принятия решений на уровне совета директоров.",
    image: "/images/avatars/cro.jpg"
  },
  { 
    role: "Compliance", 
    description: "Руководители комплаенса",
    customerJourney: "Мониторит соответствие требованиям регуляторов в реальном времени. Получает автоматические уведомления о нарушениях и использует готовые планы митигации для быстрого реагирования.",
    image: "/images/avatars/compliance.jpg"
  },
  { 
    role: "Legal Head", 
    description: "Главные юристы",
    customerJourney: "Отслеживает правовые риски в документах и процессах. ИИ анализирует контракты и выявляет потенциальные юридические проблемы до их возникновения.",
    image: "/images/avatars/legal.jpg"
  },
  { 
    role: "HR-D", 
    description: "HR-директора",
    customerJourney: "Управляет кадровыми рисками через автоматическое выявление проблем в команде. Получает insights по текучести кадров и рекомендации по удержанию талантов.",
    image: "/images/avatars/hr.jpg"
  },
  { 
    role: "COO", 
    description: "Операционные директора",
    customerJourney: "Контролирует операционные риски всех бизнес-процессов. Система автоматически формирует task-листы для минимизации рисков и повышения эффективности операций.",
    image: "/images/avatars/coo.jpg"
  },
  { 
    role: "CISO", 
    description: "Директора по ИБ",
    customerJourney: "Мониторит киберриски и уязвимости в IT-инфраструктуре. ИИ предсказывает возможные атаки и автоматически создает планы по укреплению безопасности.",
    image: "/images/avatars/ciso.jpg"
  },
  { 
    role: "CFO", 
    description: "Финансовые директора",
    customerJourney: "Анализирует финансовые риски и их влияние на бюджет. Получает прогнозы потенциальных убытков и готовые планы по оптимизации финансовых ресурсов.",
    image: "/images/avatars/cfo.jpg"
  }
] 