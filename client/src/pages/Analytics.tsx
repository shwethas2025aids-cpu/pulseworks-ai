
import { useEffect, useState } from 'react'
import { BarChart3, CheckCircle2, Clock, ListTodo } from 'lucide-react'
import type { Task } from '../types/task'
import { fetchExternalTodos } from '../services/api'

interface AnalyticsProps {
  tasks: Task[]
}

function Analytics({ tasks }: AnalyticsProps) {
  const [apiCount, setApiCount] = useState<number | null>(null)
  const [apiLoading, setApiLoading] = useState(true)
  const [apiError, setApiError] = useState('')

  const completed = tasks.filter(t => t.status === 'Completed').length
  const inProgress = tasks.filter(t => t.status === 'In Progress').length
  const pending = tasks.filter(t => t.status === 'Todo').length
  const completionRate = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0

  useEffect(() => {
    let active = true

    async function loadExternalData() {
      try {
        setApiLoading(true)
        setApiError('')
        const data = await fetchExternalTodos()

        if (active) setApiCount(data.length)
      } catch {
        if (active) setApiError('Unable to load external API data. Please try again.')
      } finally {
        if (active) setApiLoading(false)
      }
    }

    loadExternalData()

    return () => {
      active = false
    }
  }, [])

  const stats = [
    { label: 'Total Tasks', value: tasks.length, icon: ListTodo },
    { label: 'Completed', value: completed, icon: CheckCircle2 },
    { label: 'In Progress', value: inProgress, icon: Clock },
    { label: 'Pending', value: pending, icon: BarChart3 },
  ]

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Workspace Analytics</h1>
        <p className="mt-2 text-sm text-slate-500">
          Monitor task performance and workspace activity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border bg-white p-5">
            <Icon className="text-blue-600" size={24} />
            <p className="mt-4 text-sm text-slate-500">{label}</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">{value}</p>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border bg-white p-6">
        <h2 className="text-lg font-bold">Task Completion Rate</h2>
        <p className="mt-2 text-3xl font-bold text-blue-600">
          {completionRate}%
        </p>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-blue-600 transition-all"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-slate-500">
          {completed} of {tasks.length} tasks completed
        </p>
      </section>

      <section className="rounded-2xl border bg-white p-6">
        <h2 className="text-lg font-bold">External API Integration</h2>
        <p className="mt-1 text-sm text-slate-500">
          Sample data retrieved from DummyJSON.
        </p>

        {apiLoading && <p className="mt-4 text-sm">Loading external data...</p>}

        {apiError && (
          <p role="alert" className="mt-4 text-sm text-red-600">{apiError}</p>
        )}

        {!apiLoading && !apiError && (
          <p className="mt-4 text-2xl font-bold text-emerald-600">
            {apiCount} external todos retrieved successfully
          </p>
        )}
      </section>
    </div>
  )
}

export default Analytics
