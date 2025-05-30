'use client'

import { useEffect, useRef, useState } from "react"
import { Inter } from 'next/font/google'
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import AdaptiveHeroSection from "@/components/AdaptiveHeroSection"
import ProblemSolutionSection from "@/components/sections/ProblemSolutionSection"
import CapabilitiesSection from "@/components/sections/CapabilitiesSection"
import ProductTourSection from "@/components/sections/ProductTourSection"
import TargetAudienceSection from "@/components/sections/TargetAudienceSection"
import WorkflowSection from "@/components/sections/WorkflowSection"
import FAQSection from "@/components/sections/FAQSection"
import ContactFormSection from "@/components/sections/ContactFormSection"
import { FormData } from "@/lib/types"

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
})

export default function PageRefactored() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    position: '',
    phone: ''
  })
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    document.querySelectorAll('.scroll-animation').forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const handleScrollToForm = () => {
    document.getElementById('early-access-form')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
  }

  const handleScrollToProduct = () => {
    document.getElementById('product')?.scrollIntoView({ 
      behavior: 'smooth'
    });
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className={`flex flex-col min-h-screen bg-[#10131a] text-white ${inter.className}`}>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }
        
        .scroll-animation {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .scroll-animation.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .scroll-delay-1 { transition-delay: 0.1s; }
        .scroll-delay-2 { transition-delay: 0.2s; }
        .scroll-delay-3 { transition-delay: 0.3s; }
        .scroll-delay-4 { transition-delay: 0.4s; }
      `}</style>

      <Header onScrollToForm={handleScrollToForm} />

      <main className="flex-grow">
        <AdaptiveHeroSection 
          onScrollToForm={handleScrollToForm}
          onScrollToProduct={handleScrollToProduct}
        />
        
        <ProblemSolutionSection onScrollToForm={handleScrollToForm} />
        
        <CapabilitiesSection />
        
        <ProductTourSection />
        
        <TargetAudienceSection />
        
        <WorkflowSection />
        
        <FAQSection />
        
        <ContactFormSection 
          formData={formData}
          onFormSubmit={handleFormSubmit}
          onInputChange={handleInputChange}
        />
      </main>

      <Footer />
    </div>
  )
} 