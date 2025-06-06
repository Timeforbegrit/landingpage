// Типы для GTM событий
export interface GTMEvent {
  event: string
  [key: string]: any
}

// Проверяем, что dataLayer доступен
declare global {
  interface Window {
    dataLayer: any[]
  }
}

// Функция для отправки событий в GTM
export const pushToDataLayer = (eventData: GTMEvent): void => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(eventData)
    console.log('GTM Event:', eventData) // Для отладки
  }
}

// Инициализация dataLayer если он не существует
export const initDataLayer = (): void => {
  if (typeof window !== 'undefined' && !window.dataLayer) {
    window.dataLayer = []
  }
}

// События согласно ТЗ
export const GTMEvents = {
  // Навигация в хедере
  clickProductHeader: () => pushToDataLayer({ event: 'click_product_header_riski' }),
  clickOpportunitiesHeader: () => pushToDataLayer({ event: 'click_opportunities_header_riski' }),
  clickFAQHeader: () => pushToDataLayer({ event: 'click_faq_header_riski' }),
  
  // Кнопки "Получить доступ"
  clickDemoRequestHeader: () => {
    pushToDataLayer({ event: 'click_demo_request_header_riski' })
    pushToDataLayer({ event: 'click_demo_request_riski' })
  },
  clickDemoRequestMain: () => {
    pushToDataLayer({ event: 'click_demo_request_main_riski' })
    pushToDataLayer({ event: 'click_demo_request_riski' })
  },
  clickDemoRequestProblemSolution: () => {
    pushToDataLayer({ event: 'click_demo_request_problem_solution_riski' })
    pushToDataLayer({ event: 'click_demo_request_riski' })
  },
  clickDemoRequestTour: () => {
    pushToDataLayer({ event: 'click_demo_request_tour_riski' })
    pushToDataLayer({ event: 'click_demo_request_riski' })
  },
  
  // Отправка формы
  demoRequest: () => {
    pushToDataLayer({ event: 'demo_request' })
    pushToDataLayer({ event: 'demo_request_riski' })
  },
  
  // Просмотр слайдов возможностей
  viewOpportunitiesSlide: (slideNumber: number) => {
    pushToDataLayer({ event: `view_opportunities_slide_${slideNumber}_riski` })
  },
  
  // Просмотр слайдов тура
  viewTourSlide: (slideNumber: number) => {
    pushToDataLayer({ event: `view_tour_slide_${slideNumber}_riski` })
  },
  
  // Кнопка "Остались вопросы"
  clickQuestions: () => pushToDataLayer({ event: 'click_questions_riski' })
} 