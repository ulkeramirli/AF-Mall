import { Store, Tag, Calendar, Users, TrendingUp, Briefcase, Building } from "lucide-react"
import { stores, categories, events, vacancies, premises } from "@/lib/mockData"

export default function AdminDashboard() {
  const storeCount = stores.length;
  const categoryCount = categories.length;
  const eventCount = events.length;
  const vacancyCount = vacancies.length;
  const availablePremises = premises.filter(p => p.status === 'Available').length;

  const stats = [
    { name: "Total Stores", value: storeCount, icon: Store, color: "text-red-700", bg: "bg-red-100" },
    { name: "Categories", value: categoryCount, icon: Tag, color: "text-red-600", bg: "bg-red-100" },
    { name: "Available Premises", value: availablePremises, icon: Building, color: "text-blue-600", bg: "bg-blue-100" },
    { name: "Active Vacancies", value: vacancyCount, icon: Briefcase, color: "text-amber-600", bg: "bg-amber-100" },
    { name: "Active Events", value: eventCount, icon: Calendar, color: "text-emerald-600", bg: "bg-emerald-100" },
    { name: "Administrators", value: 1, icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
  ]

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
        <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 flex items-center gap-2 text-sm font-bold text-slate-600">
           <TrendingUp className="w-4 h-4 text-emerald-500" /> System Healthy
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 flex items-center gap-5 hover:-translate-y-1 transition-transform">
            <div className={`w-16 h-16 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0 shadow-inner`}>
              <stat.icon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.name}</p>
              <p className="text-4xl font-black text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 bg-white p-10 rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100">
          <h3 className="text-2xl font-black text-slate-900 mb-6">Recent Activity</h3>
          <div className="space-y-6">
             <div className="flex items-start gap-4">
               <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-1">
                  <Store className="w-5 h-5 text-red-700" />
               </div>
               <div>
                  <p className="text-slate-900 font-bold">New store "Zara" added</p>
                  <p className="text-slate-500 text-sm">2 hours ago by Admin User</p>
               </div>
             </div>
             <div className="flex items-start gap-4">
               <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-1">
                  <Calendar className="w-5 h-5 text-red-600" />
               </div>
               <div>
                  <p className="text-slate-900 font-bold">"Summer Fashion Show" event updated</p>
                  <p className="text-slate-500 text-sm">5 hours ago by Admin User</p>
               </div>
             </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100">
          <h3 className="text-xl font-black text-slate-900 mb-4">Quick Actions</h3>
          <p className="text-slate-500 mb-8 leading-relaxed">Welcome to the AF Mall Administration Panel. Use the sidebar to navigate to different sections.</p>
          <button className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-colors shadow-lg">
             Generate Report
          </button>
        </div>
      </div>
    </div>
  )
}
