import { PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqItems } from "@/lib/data/faqItems";
import { Manrope } from 'next/font/google'
import { GTMEvents } from '@/lib/gtm'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

interface FAQSectionProps {
  onContactClick?: () => void;
}

export default function FAQSection({ onContactClick }: FAQSectionProps) {
  return (
    <section id="faq" className="w-full py-20 lg:py-32 bg-gradient-to-br from-gray-900 via-blue-900/30 to-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="flex gap-8 flex-col scroll-animation">
            <div className="flex gap-6 flex-col">
              <div>
                <Badge variant="outline" className="bg-blue-600/10 border-blue-600/30 text-blue-400">
                  FAQ
                </Badge>
              </div>
              <div className="flex gap-4 flex-col">
                <h2 className={`text-4xl md:text-5xl lg:text-6xl tracking-tight max-w-xl text-left font-bold text-white ${manrope.className}`}>
                  Часто задаваемые вопросы
                </h2>
                <p className="text-xl max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-gray-300 text-left">
                  Ответы на основные вопросы о платформе «Право (риски)». 
                  Узнайте больше о возможностях системы и процессе внедрения.
                </p>
              </div>
              <div className="">
                <Button 
                  className="gap-4 bg-blue-600 hover:bg-blue-700 text-white border-blue-600" 
                  variant="outline"
                  onClick={onContactClick || (() => {
                    // Отправляем GTM событие для кнопки "Остались вопросы"
                    GTMEvents.clickQuestions();
                    document.getElementById('early-access-form')?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'center'
                    });
                  })}
                >
                  Остались вопросы? Свяжитесь с нами <PhoneCall className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="scroll-animation scroll-delay-1">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={"faq-" + index}
                  className="bg-gray-900/30 backdrop-blur-md rounded-lg px-6 py-2 hover:bg-gray-900/50 transition-all duration-300 border-0"
                >
                  <AccordionTrigger className="text-left text-white font-semibold hover:text-blue-400 transition-colors [&[data-state=open]]:text-blue-400">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 leading-relaxed text-base">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

export { FAQSection };
