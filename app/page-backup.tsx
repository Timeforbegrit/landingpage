'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Manrope } from 'next/font/google'
import AdaptiveCapabilitiesSection from "@/components/AdaptiveCapabilitiesSection"
import AdaptiveProductTourSection from "@/components/AdaptiveProductTourSection"
import AdaptiveProblemSolutionSection from "@/components/AdaptiveProblemSolutionSection"
import TargetAudienceSection from "@/components/sections/TargetAudienceSection"
import ContactFormSection from "@/components/sections/ContactFormSection"
import FAQSection from "@/components/ui/faq-section"
import { FormData } from '@/lib/types'
import { 
  CheckIcon, 
  PlayIcon, 
  ArrowRightIcon, 
  ShieldCheckIcon, 
  ZapIcon, 
  BarChart3Icon, 
  FileTextIcon, 
  BrainCircuitIcon, 
  TrendingUpIcon, 
  LockIcon, 
  GlobeIcon, 
  DatabaseIcon,
  AlertTriangleIcon,
  TargetIcon,
  ClockIcon,
  StarIcon
} from 'lucide-react'
import AdaptiveHeroSection from "@/components/AdaptiveHeroSection"
import Header from "@/components/layout/Header"

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export default function PageBackup() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    position: '',
    phone: '',
    dataProcessingConsent: false,
    marketingConsent: false
  })

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-4">Упрощенная страница</h1>
      <p className="text-lg">Проверяем работу основных компонентов по одному</p>
    </div>
  )
} 