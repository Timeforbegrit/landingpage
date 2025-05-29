export interface ProductSlide {
  title: string
  description: string
  image: string
}

export interface Capability {
  icon: React.ReactNode
  title: string
  description: string
}

export interface TargetAudience {
  role: string
  description: string
  customerJourney: string
  image: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface WorkflowStep {
  step: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  bgColor: string
}

export interface FormData {
  name: string
  email: string
  company: string
  position: string
  phone: string
} 