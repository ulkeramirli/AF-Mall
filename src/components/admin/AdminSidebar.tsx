'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Store, 
  Tag, 
  Calendar, 
  LayoutDashboard, 
  Briefcase, 
  Building, 
  LogOut, 
  Settings, 
  ExternalLink,
  ShieldCheck,
  X
} from 'lucide-react'
import { handleLogout } from '@/app/login/actions'
import { AdminUser } from '@/types'

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/stores', label: 'Stores & Brands', icon: Store },
  { href: '/admin/categories', label: 'Categories', icon: Tag },
  { href: '/admin/premises', label: 'Premises & Leasing', icon: Building },
  { href: '/admin/vacancies', label: 'Vacancies / Jobs', icon: Briefcase },
  { href: '/admin/events', label: 'Events & News', icon: Calendar },
  { href: '/admin/settings', label: 'Mall Settings', icon: Settings },
]

export function AdminSidebar({
  admin,
  mobileOpen,
  setMobileOpen
}: {
  admin: AdminUser;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity" 
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 w-72 bg-[#0b0f19] text-slate-300 flex flex-col z-50 transition-transform duration-300 ease-in-out border-r border-slate-800/80
        lg:static lg:translate-x-0
        ${mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
      `}>
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800/80 bg-[#070a12]">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center font-black text-white shadow-lg shadow-red-600/30 text-lg tracking-wider">
              AF
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-white font-extrabold text-lg tracking-tight">AF Mall</span>
                <span className="bg-red-500/20 text-red-400 text-[10px] font-black uppercase px-1.5 py-0.5 rounded-md border border-red-500/30">Admin</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Control Center</p>
            </div>
          </Link>
          <button 
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          <p className="px-3 text-[11px] font-black text-slate-300 uppercase tracking-wider mb-2">Main Menu</p>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3.5 px-4 py-3 rounded-xl font-semibold text-sm transition-all group
                  ${isActive 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' 
                    : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                  }
                `}
              >
                <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-red-400'}`} />
                <span>{item.label}</span>
              </Link>
            )
          })}

          <div className="pt-6">
            <p className="px-3 text-[11px] font-black text-slate-300 uppercase tracking-wider mb-2">Live Mall</p>
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm text-slate-300 hover:bg-slate-800/70 hover:text-white transition-all group"
            >
              <div className="flex items-center gap-3">
                <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-white" />
                <span>Open Public Mall</span>
              </div>
              <span className="text-xs bg-slate-800 text-slate-400 group-hover:text-white px-2 py-0.5 rounded-full font-mono">↗</span>
            </Link>
          </div>
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-slate-800/80 bg-[#070a12]/80">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white font-bold text-sm overflow-hidden shrink-0">
              {admin.avatar ? (
                <img src={admin.avatar} alt={admin.name} className="w-full h-full object-cover" />
              ) : (
                <ShieldCheck className="w-5 h-5 text-red-500" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">{admin.name}</p>
              <p className="text-[11px] text-slate-400 truncate">{admin.email}</p>
            </div>
          </div>

          <form action={handleLogout}>
            <button
              type="submit"
              className="flex items-center justify-center gap-2.5 px-4 py-2.5 w-full rounded-xl bg-slate-800/60 hover:bg-red-950/40 hover:text-red-400 hover:border-red-500/30 border border-transparent transition-all font-semibold text-xs text-slate-300 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Çıxış / Sign Out</span>
            </button>
          </form>
        </div>
      </aside>
    </>
  )
}
