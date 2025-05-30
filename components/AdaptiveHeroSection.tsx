'use client'

// Пример интеграции AdaptiveSection с HeroSection
// Этот файл показывает, как использовать новую систему адаптивных компонентов

import { AdaptiveSection } from './AdaptiveSection'
import HeroSection from './sections/HeroSection'
import { HeroSectionMobile } from './sections/mobile'

interface AdaptiveHeroSectionProps {
  onScrollToForm: () => void
  onScrollToProduct: () => void
}

export default function AdaptiveHeroSection(props: AdaptiveHeroSectionProps) {
  return (
    <AdaptiveSection
      DesktopComponent={HeroSection}
      MobileComponent={HeroSectionMobile}
      componentProps={props}
      breakpoint={1024}
    />
  )
}

/*
ИНСТРУКЦИЯ ПО ИСПОЛЬЗОВАНИЮ:

1. В app/page-refactored.tsx замените:
   
   // Было:
   import HeroSection from "@/components/sections/HeroSection"
   
   // Стало:
   import AdaptiveHeroSection from "@/components/AdaptiveHeroSection"

2. В JSX замените:
   
   // Было:
   <HeroSection 
     onScrollToForm={handleScrollToForm}
     onScrollToProduct={handleScrollToProduct}
   />
   
   // Стало:
   <AdaptiveHeroSection 
     onScrollToForm={handleScrollToForm}
     onScrollToProduct={handleScrollToProduct}
   />

3. Десктопная версия останется ПОЛНОСТЬЮ неизменной!
   На экранах >= 1024px будет показываться оригинальный HeroSection
   На экранах < 1024px будет показываться HeroSectionMobile

4. Аналогично можно создать адаптивные версии для всех остальных секций:
   - AdaptiveProblemSolutionSection
   - AdaptiveCapabilitiesSection
   - AdaptiveProductTourSection
   - и так далее...

ПРЕИМУЩЕСТВА:
✅ Полное сохранение десктопного дизайна
✅ Независимая разработка мобильной версии
✅ Легкость тестирования
✅ Возможность постепенной миграции
✅ Чистое разделение кода
*/ 