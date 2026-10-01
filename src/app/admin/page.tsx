import { Store, Tag, Calendar, Users, TrendingUp, Briefcase, Building, ArrowUpRight, Activity } from "lucide-react"
import { stores, categories, events, vacancies, premises } from "@/lib/mockData"

export default function AdminDashboard() {
  const storeCount = stores.length;
  const categoryCount = categories.length;
  const eventCount = events.length;
  const vacancyCount = vacancies.length;
  const availablePremises = premises.filter(p => p.status === 'Available').length;

  const stats = [
    { name: "Total Stores", value: storeCount, change: "+12%", icon: Store, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
    { name: "Categories", value: categoryCount, change: "0%", icon: Tag, color: "text-slate-600", bg: "bg-slate-50", border: "border-slate-100" },
    { name: "Available Premises", value: availablePremises, change: "-5%", icon: Building, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
    { name: "Active Vacancies", value: vacancyCount, change: "+3", icon: Briefcase, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Dashboard Overview</h1>
          <p className="text-slate-500">Welcome back, here's what's happening at AF Mall today.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 flex items-center gap-2 text-sm font-bold text-slate-700">
           <span className="relative flex h-3 w-3">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
           </span>
           System Healthy
        </div>
      </div>
      
      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-4 group hover:border-red-200 hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} border ${stat.border} flex items-center justify-center shrink-0`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : stat.change === '0%' ? 'bg-slate-50 text-slate-500' : 'bg-red-50 text-red-600'}`}>
                {stat.change}
                {stat.change.startsWith('+') && <ArrowUpRight className="w-3 h-3" />}
              </span>
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900 mb-1">{stat.value}</p>
              <p className="text-sm font-medium text-slate-500">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-slate-400" /> Recent Activity
            </h3>
            <button className="text-sm font-bold text-red-600 hover:text-red-700">View All</button>
          </div>
          <div className="p-6 flex-1">
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
               
               <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-100 text-blue-600 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10">
                     <Store className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
                     <div className="flex items-center justify-between mb-1">
                        <p className="font-bold text-slate-900 text-sm">New store added</p>
                        <time className="text-xs text-slate-500 font-medium">2 hours ago</time>
                     </div>
                     <p className="text-sm text-slate-600">Admin User added "Zara" to the Fashion category.</p>
                  </div>
               </div>

               <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-emerald-100 text-emerald-600 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10">
                     <Calendar className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
                     <div className="flex items-center justify-between mb-1">
                        <p className="font-bold text-slate-900 text-sm">Event updated</p>
                        <time className="text-xs text-slate-500 font-medium">5 hours ago</time>
                     </div>
                     <p className="text-sm text-slate-600">"Summer Fashion Show" details were modified.</p>
                  </div>
               </div>

               <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-purple-100 text-purple-600 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10">
                     <Briefcase className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
                     <div className="flex items-center justify-between mb-1">
                        <p className="font-bold text-slate-900 text-sm">Vacancy posted</p>
                        <time className="text-xs text-slate-500 font-medium">1 day ago</time>
                     </div>
                     <p className="text-sm text-slate-600">Security Guard position opened.</p>
                  </div>
               </div>

            </div>
          </div>
        </div>

        {/* Quick Actions & System Info */}
        <div className="flex flex-col gap-6">
          <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl shadow-slate-900/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <Building className="w-32 h-32" />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Generate Reports</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">Download the latest monthly performance and analytics report for AF Mall.</p>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-red-600/20 flex items-center justify-center gap-2">
                 Download PDF
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex-1">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">System Info</h3>
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                 <span className="text-slate-500 text-sm">Version</span>
                 <span className="text-slate-900 font-bold text-sm">v2.4.1</span>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-slate-500 text-sm">Last Backup</span>
                 <span className="text-slate-900 font-bold text-sm">Today, 03:00 AM</span>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-slate-500 text-sm">Database</span>
                 <span className="text-emerald-600 font-bold text-sm">Connected</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
