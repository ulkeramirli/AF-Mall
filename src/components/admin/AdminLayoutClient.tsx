'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Plus, Settings, Store, Sparkles, Building, Briefcase, Calendar } from 'lucide-react'
import { AdminSidebar } from './AdminSidebar'
import { AdminUser } from '@/types'

export function AdminLayoutClient({
  children,
  admin
}: {
  children: React.ReactNode;
  admin: AdminUser;
}) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="h-screen bg-slate-100 flex font-sans overflow-hidden antialiased">
      {/* Sidebar Component */}
      <AdminSidebar 
        admin={admin} 
        mobileOpen={mobileOpen} 
        setMobileOpen={setMobileOpen} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200/80 flex items-center justify-between px-4 sm:px-8 shadow-xs shrink-0 z-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              aria-label="Toggle Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>AF Mall Control System</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Quick Add Dropdown / Action */}
            <div className="flex items-center gap-2">
              <Link 
                href="/admin/stores" 
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
              >
                <Plus className="w-4 h-4 text-red-400" />
                <span>Add Store</span>
              </Link>
              <Link 
                href="/admin/events" 
                className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
              >
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>Add Event</span>
              </Link>
            </div>

            <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />

            <Link
              href="/admin/settings"
              className="p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
              title="Admin Settings"
            >
              <Settings className="w-5 h-5" />
            </Link>

            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-800 leading-tight">{admin.name}</p>
                <p className="text-[11px] text-emerald-600 font-semibold">{admin.role}</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-900 to-slate-800 text-white font-bold text-sm flex items-center justify-center shadow-sm border border-slate-200">
                {admin.name.charAt(0) || 'A'}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content with Scroll */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-50/70">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
