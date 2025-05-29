'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { 
  MailIcon, 
  PhoneIcon, 
  BuildingIcon, 
  UserIcon, 
  ClockIcon, 
  RefreshCwIcon,
  LogOutIcon,
  Loader2,
  AlertCircle,
  CheckCircle,
  ExternalLinkIcon,
  FilterIcon
} from 'lucide-react'
import { supabase, SubmissionRecord } from '@/lib/supabase/client'
import LoginForm from '@/components/admin/LoginForm'

interface DemoSession {
  email: string
  full_name: string
  role: string
  loginTime: string
}

export default function AdminPage() {
  const [demoSession, setDemoSession] = useState<DemoSession | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Проверка сессии админа
  useEffect(() => {
    const checkAdminSession = () => {
      try {
        const sessionData = localStorage.getItem('admin_session')
        if (sessionData) {
          const session = JSON.parse(sessionData)
          setDemoSession(session)
        }
      } catch (error) {
        console.error('Ошибка проверки сессии:', error)
      } finally {
        setAuthLoading(false)
      }
    }

    checkAdminSession()
  }, [])

  const loadSubmissions = async () => {
    setLoading(true)
    setError('')
    try {
      let query = supabase
        .from('submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter)
      }

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,company.ilike.%${searchTerm}%`)
      }

      const { data, error } = await query

      if (error) {
        setError('Ошибка загрузки заявок')
        console.error('Ошибка загрузки заявок:', error)
      } else {
        setSubmissions(data || [])
      }
    } catch (err) {
      setError('Ошибка загрузки заявок')
      console.error('Ошибка:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateSubmissionStatus = async (id: string, status: string, notes?: string) => {
    try {
      const updateData: any = { status }
      if (notes !== undefined) {
        updateData.admin_notes = notes
      }

      const { error } = await supabase
        .from('submissions')
        .update(updateData)
        .eq('id', id)

      if (error) {
        console.error('Ошибка обновления статуса:', error)
      } else {
        await loadSubmissions()
      }
    } catch (err) {
      console.error('Ошибка обновления:', err)
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('admin_session')
    setDemoSession(null)
    window.location.reload()
  }

  useEffect(() => {
    if (demoSession) {
      loadSubmissions()
    }
  }, [demoSession, statusFilter, searchTerm])

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'text-blue-400 bg-blue-900/20 border-blue-500/30'
      case 'contacted': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30'
      case 'qualified': return 'text-green-400 bg-green-900/20 border-green-500/30'
      case 'converted': return 'text-purple-400 bg-purple-900/20 border-purple-500/30'
      default: return 'text-gray-400 bg-gray-900/20 border-gray-500/30'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Новая'
      case 'contacted': return 'Связались'
      case 'qualified': return 'Квалифицированная'
      case 'converted': return 'Конвертированная'
      default: return status
    }
  }

  // Показываем форму входа, если пользователь не аутентифицирован
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Проверка авторизации...</p>
        </div>
      </div>
    )
  }

  if (!demoSession) {
    return <LoginForm onSuccess={() => window.location.reload()} />
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Административная панель</h1>
            <p className="text-gray-400 mt-1">
              Добро пожаловать, {demoSession.full_name}
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={loadSubmissions}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <RefreshCwIcon className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Обновить
            </Button>
            
            <Button 
              onClick={handleSignOut}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <LogOutIcon className="w-4 h-4 mr-2" />
              Выход
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Поиск
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Поиск по имени, email или компании..."
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Статус
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="all">Все</option>
                <option value="new">Новые</option>
                <option value="contacted">Связались</option>
                <option value="qualified">Квалифицированные</option>
                <option value="converted">Конвертированные</option>
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-400">{submissions.length}</div>
            <div className="text-gray-400 text-sm">Всего заявок</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-400">
              {submissions.filter(s => s.status === 'new').length}
            </div>
            <div className="text-gray-400 text-sm">Новые</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400">
              {submissions.filter(s => s.status === 'qualified').length}
            </div>
            <div className="text-gray-400 text-sm">Квалифицированные</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-400">
              {submissions.filter(s => s.status === 'converted').length}
            </div>
            <div className="text-gray-400 text-sm">Конвертированные</div>
          </div>
        </div>

        {/* Submissions List */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Заявки на доступ</h2>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
              <p>Загрузка заявок...</p>
            </div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <MailIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Заявки не найдены</p>
            </div>
          ) : (
            <div className="space-y-6">
              {submissions.map((submission) => (
                <div 
                  key={submission.id}
                  className="bg-gray-700/50 border border-gray-600 rounded-lg p-6 hover:border-blue-500/50 transition-colors"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column - Basic Info */}
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <UserIcon className="w-5 h-5 text-blue-400" />
                          <div>
                            <h3 className="font-semibold text-lg">{submission.name}</h3>
                            {submission.position && (
                              <p className="text-gray-400 text-sm">{submission.position}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(submission.status)}`}>
                          {getStatusText(submission.status)}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <BuildingIcon className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">{submission.company}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <MailIcon className="w-5 h-5 text-yellow-400" />
                        <a 
                          href={`mailto:${submission.email}`}
                          className="text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          {submission.email}
                        </a>
                      </div>

                      <div className="flex items-center gap-3">
                        <PhoneIcon className="w-5 h-5 text-purple-400" />
                        <a 
                          href={`tel:${submission.phone}`}
                          className="text-gray-300 hover:text-white transition-colors"
                        >
                          {submission.phone}
                        </a>
                      </div>
                    </div>

                    {/* Right Column - Meta Info & Actions */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <ClockIcon className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-gray-300">{formatDate(submission.created_at)}</p>
                          <p className="text-gray-500 text-sm">ID: {submission.id.substring(0, 8)}...</p>
                        </div>
                      </div>

                      <div className="text-sm text-gray-500 space-y-1">
                        <p><span className="text-gray-400">IP:</span> {submission.ip_address || 'N/A'}</p>
                        <p className="truncate">
                          <span className="text-gray-400">User Agent:</span> {submission.user_agent || 'N/A'}
                        </p>
                      </div>

                      {/* Status Update */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                          Изменить статус:
                        </label>
                        <select
                          value={submission.status}
                          onChange={(e) => updateSubmissionStatus(submission.id, e.target.value)}
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded text-white text-sm focus:border-blue-500 focus:outline-none"
                        >
                          <option value="new">Новая</option>
                          <option value="contacted">Связались</option>
                          <option value="qualified">Квалифицированная</option>
                          <option value="converted">Конвертирована</option>
                        </select>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button 
                          size="sm"
                          variant="outline"
                          className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                          onClick={() => window.open(`mailto:${submission.email}?subject=Право (риски) - Интервью&body=Добрый день, ${submission.name}!%0A%0AСпасибо за интерес к платформе «Право (риски)».%0A%0AМы готовы провести демонстрацию системы...`)}
                        >
                          <MailIcon className="w-4 h-4 mr-1" />
                          Написать письмо
                        </Button>
                        <Button 
                          size="sm"
                          variant="outline"
                          className="border-green-500/50 text-green-400 hover:bg-green-500/10"
                          onClick={() => window.open(`tel:${submission.phone}`)}
                        >
                          <PhoneIcon className="w-4 h-4 mr-1" />
                          Позвонить
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Admin Notes */}
                  {submission.admin_notes && (
                    <div className="mt-4 pt-4 border-t border-gray-600">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Заметки админа:</h4>
                      <p className="text-gray-400 text-sm">{submission.admin_notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 