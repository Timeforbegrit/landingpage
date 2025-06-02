export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-4">Тестовая страница</h1>
      <p className="text-lg">Если эта страница загружается нормально, значит проблема в основном компоненте.</p>
      <div className="mt-8 p-4 bg-blue-600 rounded">
        <p>Это тестовый блок для проверки рендеринга</p>
      </div>
    </div>
  )
} 