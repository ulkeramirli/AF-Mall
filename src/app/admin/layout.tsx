import Link from "next/link"
import { Store, Tag, Calendar, LayoutDashboard, Briefcase, Building, LogOut, Bell, Search, Settings } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen bg-slate-50 flex font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-[#0f172a] text-slate-300 flex flex-col shadow-2xl z-20">
        <div className="h-20 flex items-center px-8 border-b border-slate-800/50 bg-[#020617]">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-black text-white shadow-lg shadow-red-600/20">AF</div>
             <span className="text-white font-bold text-xl tracking-tight">Mall Admin</span>
          </div>
        </div>
        <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
          <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Overview</p>
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all group font-medium">
            <LayoutDashboard className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition-colors" /> Dashboard
          </Link>
          
          <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mt-8 mb-4">Management</p>
          <Link href="/admin/stores" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all group font-medium">
            <Store className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition-colors" /> Stores
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all group font-medium">
            <Tag className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition-colors" /> Categories
          </Link>
          <Link href="/admin/premises" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all group font-medium">
            <Building className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition-colors" /> Premises
          </Link>
          <Link href="/admin/vacancies" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all group font-medium">
            <Briefcase className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition-colors" /> Vacancies
          </Link>
          <Link href="/admin/events" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all group font-medium">
            <Calendar className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition-colors" /> Events
          </Link>
        </nav>
        
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-slate-800 hover:text-white transition-all group font-medium text-slate-400 text-left">
             <LogOut className="w-5 h-5 group-hover:text-red-500" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm shrink-0 z-10">
          <div className="flex items-center gap-4 flex-1">
             <div className="relative w-96 hidden md:block">
               <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
               <input type="text" placeholder="Search admin..." className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-sm transition-all" />
             </div>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
             <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
               <Bell className="w-6 h-6" />
               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
             </button>
             <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
               <Settings className="w-6 h-6" />
             </button>
             <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block" />
             <div className="flex items-center gap-3 cursor-pointer group">
                <div className="text-right hidden sm:block">
                   <p className="text-sm font-bold text-slate-700 group-hover:text-red-600 transition-colors">Admin User</p>
                   <p className="text-xs text-slate-500">Superadmin</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-800 to-slate-900 flex items-center justify-center text-white font-bold border-2 border-white shadow-md group-hover:border-red-100 transition-all">
                  A
                </div>
             </div>
          </div>
        </header>
        <div className="p-6 sm:p-10 flex-1 overflow-auto bg-slate-50/50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
