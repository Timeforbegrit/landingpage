'use client'

import { AdaptiveSection } from './AdaptiveSection'
import ProductTourSection from './sections/ProductTourSection'
import { ProductTourSectionMobile } from './sections/mobile'

export default function AdaptiveProductTourSection() {
  return (
    <AdaptiveSection
      DesktopComponent={ProductTourSection}
      MobileComponent={ProductTourSectionMobile}
    />
  )
} 