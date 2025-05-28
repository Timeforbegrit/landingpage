import { 
  Brain,
  Target,
  Zap,
  BarChart3,
  Shield,
  Users
} from 'lucide-react'

export interface CapabilityData {
  iconName: string
  title: string
  description: string
}

export const capabilities: CapabilityData[] = [
  {
    iconName: "Brain",
    title: "AI-анализ рисков",
    description: "Автоматическое выявление и оценка корпоративных рисков с помощью ИИ"
  },
  {
    iconName: "Target",
    title: "Единая система",
    description: "Все типы рисков в одной платформе: операционные, финансовые, правовые"
  },
  {
    iconName: "Zap",
    title: "Автоматизация",
    description: "Превращение решений в конкретные задачи с назначением ответственных"
  },
  {
    iconName: "BarChart3",
    title: "Аналитика",
    description: "Детальная отчетность и прогнозирование развития рисков"
  },
  {
    iconName: "Shield",
    title: "Безопасность",
    description: "Соответствие стандартам безопасности и защиты данных"
  },
  {
    iconName: "Users",
    title: "Коллаборация",
    description: "Совместная работа команд над управлением рисками"
  }
]

export const getCapabilityIcon = (iconName: string) => {
  const iconProps = { className: "w-6 h-6", strokeWidth: 1.5 }
  
  switch (iconName) {
    case "Brain":
      return <Brain {...iconProps} />
    case "Target":
      return <Target {...iconProps} />
    case "Zap":
      return <Zap {...iconProps} />
    case "BarChart3":
      return <BarChart3 {...iconProps} />
    case "Shield":
      return <Shield {...iconProps} />
    case "Users":
      return <Users {...iconProps} />
    default:
      return <Brain {...iconProps} />
  }
} 