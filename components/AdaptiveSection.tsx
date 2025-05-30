'use client'

import React from 'react'
import { useDeviceType } from '@/lib/hooks/useDeviceType'

interface AdaptiveSectionProps {
  // Десктопный компонент (существующий)
  DesktopComponent: React.ComponentType<any>
  // Мобильный компонент (новый)
  MobileComponent: React.ComponentType<any>
  // Пропсы, которые будут переданы в оба компонента
  componentProps?: any
  // Кастомный breakpoint (опционально)
  breakpoint?: number
  // Fallback компонент во время загрузки (опционально)
  LoadingComponent?: React.ComponentType
}

export function AdaptiveSection({
  DesktopComponent,
  MobileComponent,
  componentProps = {},
  breakpoint = 1024,
  LoadingComponent
}: AdaptiveSectionProps) {
  const { isMobile, isLoading } = useDeviceType({ breakpoint })

  // Показываем loading состояние для избежания flickering
  if (isLoading) {
    if (LoadingComponent) {
      return <LoadingComponent />
    }
    
    // Простой loading fallback - можно кастомизировать
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Рендерим соответствующий компонент
  return isMobile ? (
    <MobileComponent {...componentProps} />
  ) : (
    <DesktopComponent {...componentProps} />
  )
}

// Экспорт типов для удобства
export type { AdaptiveSectionProps } 