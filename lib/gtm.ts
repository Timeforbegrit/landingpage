// Типы для GTM событий
export interface GTMEvent {
  event: string
  [key: string]: any
}

// Проверяем, что dataLayer доступен
declare global {
  interface Window {
    dataLayer: any[]
    ym?: any  // Добавляем типизацию для Yandex.Metrica
  }
}

// Функция для отправки событий в GTM
export const pushToDataLayer = (eventData: GTMEvent): void => {
  try {
    if (typeof window !== 'undefined') {
      // Убеждаемся, что dataLayer существует
      if (!window.dataLayer) {
        console.warn('dataLayer не инициализирован, инициализируем...')
        window.dataLayer = []
      }
      
      window.dataLayer.push(eventData)
      console.log('✅ GTM Event отправлен:', eventData)
    } else {
      console.warn('Window объект недоступен (SSR)')
    }
  } catch (error) {
    console.error('❌ GTM Error:', error)
    // Не прерываем выполнение из-за ошибок аналитики
  }
}

// Простая инициализация dataLayer
export const initDataLayer = (): void => {
  if (typeof window !== 'undefined' && !window.dataLayer) {
    window.dataLayer = []
  }
}

// События согласно ТЗ
export const GTMEvents = {
  // Навигация в хедере
  clickProductHeader: () => {
    try {
      pushToDataLayer({ event: 'click_product_header_riski' })
    } catch (error) {
      console.error('GTM clickProductHeader error:', error)
    }
  },
  clickOpportunitiesHeader: () => {
    try {
      pushToDataLayer({ event: 'click_opportunities_header_riski' })
    } catch (error) {
      console.error('GTM clickOpportunitiesHeader error:', error)
    }
  },
  clickFAQHeader: () => {
    try {
      pushToDataLayer({ event: 'click_faq_header_riski' })
    } catch (error) {
      console.error('GTM clickFAQHeader error:', error)
    }
  },
  
  // Кнопки "Получить доступ"
  clickDemoRequestHeader: () => {
    try {
      pushToDataLayer({ event: 'click_demo_request_header_riski' })
      pushToDataLayer({ event: 'click_demo_request_riski' })
    } catch (error) {
      console.error('GTM clickDemoRequestHeader error:', error)
    }
  },
  clickDemoRequestMain: () => {
    try {
      pushToDataLayer({ event: 'click_demo_request_main_riski' })
      pushToDataLayer({ event: 'click_demo_request_riski' })
    } catch (error) {
      console.error('GTM clickDemoRequestMain error:', error)
    }
  },
  clickDemoRequestProblemSolution: () => {
    try {
      pushToDataLayer({ event: 'click_demo_request_problem_solution_riski' })
      pushToDataLayer({ event: 'click_demo_request_riski' })
    } catch (error) {
      console.error('GTM clickDemoRequestProblemSolution error:', error)
    }
  },
  clickDemoRequestTour: () => {
    try {
      pushToDataLayer({ event: 'click_demo_request_tour_riski' })
      pushToDataLayer({ event: 'click_demo_request_riski' })
    } catch (error) {
      console.error('GTM clickDemoRequestTour error:', error)
    }
  },
  
  // Отправка формы
  demoRequest: () => {
    try {
      pushToDataLayer({ event: 'demo_request' })
      pushToDataLayer({ event: 'demo_request_riski' })
    } catch (error) {
      console.error('GTM demoRequest error:', error)
    }
  },
  
  // Просмотр слайдов возможностей
  viewOpportunitiesSlide: (slideNumber: number) => {
    try {
      pushToDataLayer({ event: `view_opportunities_slide_${slideNumber}_riski` })
    } catch (error) {
      console.error('GTM viewOpportunitiesSlide error:', error)
    }
  },
  
  // Просмотр слайдов тура
  viewTourSlide: (slideNumber: number) => {
    try {
      pushToDataLayer({ event: `view_tour_slide_${slideNumber}_riski` })
    } catch (error) {
      console.error('GTM viewTourSlide error:', error)
    }
  },
  
  // Кнопка "Остались вопросы"
  clickQuestions: () => {
    try {
      pushToDataLayer({ event: 'click_questions_riski' })
    } catch (error) {
      console.error('GTM clickQuestions error:', error)
    }
  }
} 