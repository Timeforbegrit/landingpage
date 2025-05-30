'use client'

import { AdaptiveSection } from './AdaptiveSection'
import CapabilitiesSection from './sections/CapabilitiesSection'
import { CapabilitiesSectionMobile } from './sections/mobile'

export default function AdaptiveCapabilitiesSection() {
  return (
    <AdaptiveSection
      DesktopComponent={CapabilitiesSection}
      MobileComponent={CapabilitiesSectionMobile}
    />
  )
} 