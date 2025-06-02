// Глобальные типы для устранения конфликтов TypeScript

declare global {
  // Устранение конфликта require
  var require: NodeJS.Require;
  
  // Устранение конфликта gc
  var gc: undefined | (() => void);
}

// Убеждаемся что это модуль
export {}; 