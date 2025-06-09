import { 
  BrainCircuitIcon,
  BarChart3Icon,
  TargetIcon,
  CheckIcon
} from 'lucide-react'

export interface WorkflowStepData {
  step: string
  title: string
  description: string
  iconName: string
  color: string
  bgColor: string
}

export const workflowSteps: WorkflowStepData[] = [
  {
    step: "01",
    title: "Выявление",
    description: "ИИ сканирует документы, процессы и выявляет потенциальные риски",
    iconName: "BrainCircuit",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10"
  },
  {
    step: "02", 
    title: "Оценка",
    description: "Автоматический расчет вероятности и ущерба, присвоение приоритета",
    iconName: "BarChart3",
    color: "from-purple-500 to-pink-500", 
    bgColor: "bg-purple-500/10"
  },
  {
    step: "03",
    title: "Планирование",
    description: "Формирование ИИ-плана действий с конкретными шагами митигации",
    iconName: "Target",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10"
  },
  {
    step: "04",
    title: "Исполнение",
    description: "Превращение плана в задачи с назначением ответственных и дедлайнов",
    iconName: "Check",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10"
  }
]

export const getWorkflowIcon = (iconName: string) => {
  const iconProps = { className: "w-8 h-8" }
  
  switch (iconName) {
    case "BrainCircuit":
      return <BrainCircuitIcon {...iconProps} />
    case "BarChart3":
      return <BarChart3Icon {...iconProps} />
    case "Target":
      return <TargetIcon {...iconProps} />
    case "Check":
      return <CheckIcon {...iconProps} />
    default:
      return <BrainCircuitIcon {...iconProps} />
  }
} 