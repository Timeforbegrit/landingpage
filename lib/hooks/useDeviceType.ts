'use client'

import { useState, useEffect } from 'react'

export type DeviceType = 'mobile' | 'desktop'

interface UseDeviceTypeOptions {
  breakpoint?: number
}

export function useDeviceType(options: UseDeviceTypeOptions = {}): {
  deviceType: DeviceType
  isMobile: boolean
  isDesktop: boolean
  isLoading: boolean
} {
  const { breakpoint = 1024 } = options
  
  // Начальное состояние - loading для избежания hydration mismatch
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkDeviceType = (): DeviceType => {
      if (typeof window === 'undefined') return 'desktop'
      return window.innerWidth < breakpoint ? 'mobile' : 'desktop'
    }

    const updateDeviceType = () => {
      const newDeviceType = checkDeviceType()
      setDeviceType(newDeviceType)
      setIsLoading(false)
    }

    // Первоначальная проверка
    updateDeviceType()

    // Обработчик изменения размера окна
    const handleResize = () => {
      const newDeviceType = checkDeviceType()
      setDeviceType(newDeviceType)
    }

    // Добавляем обработчик с debounce для производительности
    let timeoutId: NodeJS.Timeout
    const debouncedHandleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleResize, 150)
    }

    window.addEventListener('resize', debouncedHandleResize)

    return () => {
      window.removeEventListener('resize', debouncedHandleResize)
      clearTimeout(timeoutId)
    }
  }, [breakpoint])

  return {
    deviceType,
    isMobile: deviceType === 'mobile',
    isDesktop: deviceType === 'desktop',
    isLoading
  }
} 