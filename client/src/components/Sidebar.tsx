
import { useState } from 'react'
import {
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  FileText,
  Users,
  ChartNoAxesCombined,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  activeItem: string
  onNavigate: (page: string) => void
}

const navigationItems = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'My Tasks', path: '/tasks', icon: CheckSquare },
  { label: 'Projects', path: '/projects', icon: FolderKanban },
  { label: 'Documents', path: '/documents', icon: FileText },
  { label: 'Team Members', path: '/team', icon: Users },
  { label: 'Analytics', path: '/analytics', icon: ChartNoAxesCombined },
  { label: 'Settings', path: '/settings', icon: Settings },
]

function Sidebar({
  isOpen,
  onClose,
  activeItem,
  onNavigate,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 top-20 z-40 bg-slate-950/50 md:hidden"
        />
      )}

      <aside
        className={`fixed md:sticky top-20 left-0 z-40
          h-[calc(100vh-5rem)] flex-shrink-0
          bg-[#101B31] border-r border-slate-700
          flex flex-col transition-all duration-300
          ${collapsed ? 'md:w-20' : 'md:w-64'}
          w-64
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0`}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-slate-700">
          {!collapsed && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Workspace
              </p>
              <p className="text-sm text-white font-semibold mt-1">
                Main Menu
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700"
            aria-label="Toggle sidebar"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="md:hidden p-2 rounded-lg text-slate-400"
            aria-label="Close sidebar"
          >
            <X size={19} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.path

            return (
              <button
                key={item.path}
                type="button"
                onClick={() => {
                  onNavigate(item.path)
                  onClose()
                }}
                title={collapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all
                  ${isActive
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                  ${collapsed ? 'md:justify-center' : ''}`}
              >
                <Icon size={19} className="flex-shrink-0" />
                <span className={collapsed ? 'md:hidden' : ''}>
                  {item.label}
                </span>
                {isActive && !collapsed && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </button>
            )
          })}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
