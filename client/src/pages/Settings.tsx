
import { useState } from 'react'
import { Save, Settings as SettingsIcon } from 'lucide-react'

function Settings() {
  const [workspaceName, setWorkspaceName] = useState(
    () => localStorage.getItem('pulseworks-name') || 'PulseWorks AI'
  )

  const [notifications, setNotifications] = useState(
    () => localStorage.getItem('pulseworks-notifications') !== 'false'
  )

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    localStorage.setItem('pulseworks-name', workspaceName)
    localStorage.setItem('pulseworks-notifications', String(notifications))
    setSaved(true)
  }

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Workspace Settings</h1>
        <p className="mt-2 text-sm text-slate-500">
          Configure your workspace preferences.
        </p>
      </div>

      <section className="max-w-2xl rounded-2xl border bg-white p-6">
        <div className="flex items-center gap-3">
          <SettingsIcon className="text-blue-600" size={24} />
          <h2 className="text-lg font-bold">General Settings</h2>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <label htmlFor="workspaceName" className="mb-2 block text-sm font-medium">
              Workspace Name
            </label>
            <input
              id="workspaceName"
              value={workspaceName}
              onChange={e => setWorkspaceName(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={notifications}
              onChange={e => setNotifications(e.target.checked)}
              className="h-4 w-4"
            />
            Enable workspace notifications
          </label>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Save size={18} />
            Save Settings
          </button>

          {saved && (
            <p role="status" className="text-sm text-emerald-600">
              Settings saved successfully!
            </p>
          )}
        </div>
      </section>
    </div>
  )
}

export default Settings
