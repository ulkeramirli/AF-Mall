import Link from "next/link"
import { Store, Tag, Calendar, LayoutDashboard, Briefcase, Building } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col shadow-2xl z-20 relative">
        <div className="h-20 flex items-center px-8 border-b border-slate-800 bg-slate-950">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-red-800 font-black text-2xl tracking-tight">AF Mall Admin</span>
        </div>
        <nav className="flex-1 py-8 px-4 space-y-3">
          <Link href="/admin" className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-slate-800 hover:text-white transition-all group font-medium">
            <LayoutDashboard className="w-5 h-5 text-slate-500 group-hover:text-red-500 transition-colors" /> Dashboard
          </Link>
          <Link href="/admin/stores" className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-slate-800 hover:text-white transition-all group font-medium">
            <Store className="w-5 h-5 text-slate-500 group-hover:text-red-500 transition-colors" /> Stores
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-slate-800 hover:text-white transition-all group font-medium">
            <Tag className="w-5 h-5 text-slate-500 group-hover:text-red-500 transition-colors" /> Categories
          </Link>
          <Link href="/admin/vacancies" className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-slate-800 hover:text-white transition-all group font-medium">
            <Briefcase className="w-5 h-5 text-slate-500 group-hover:text-red-500 transition-colors" /> Vacancies
          </Link>
          <Link href="/admin/premises" className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-slate-800 hover:text-white transition-all group font-medium">
            <Building className="w-5 h-5 text-slate-500 group-hover:text-red-500 transition-colors" /> Premises
          </Link>
          <Link href="/admin/events" className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-slate-800 hover:text-white transition-all group font-medium">
            <Calendar className="w-5 h-5 text-slate-500 group-hover:text-red-500 transition-colors" /> Events
          </Link>
        </nav>
        <div className="p-6 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-linear-to-tr from-red-500 to-red-800 flex items-center justify-center text-white font-bold">
               A
             </div>
             <div>
                <p className="text-white font-bold">Admin User</p>
                <p className="text-xs text-slate-500 font-medium">admin@af-mall.com</p>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto flex flex-col bg-slate-50">
        <header className="fixed h-20 bg-white border-b border-slate-200 flex items-center px-10 shadow-sm z-10 shrink-0">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Control Panel</h2>
        </header>
        <div className="p-10 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
