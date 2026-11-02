import Link from "next/link"
import { 
  Store, 
  Tag, 
  Calendar, 
  Briefcase, 
  Building, 
  ArrowUpRight, 
  Activity, 
  Plus, 
  Clock, 
  ExternalLink,
  Percent,
  CheckCircle2,
  AlertCircle,
  Mail,
  Users,
  BellRing
} from "lucide-react"
import { getDb } from "@/lib/actions"

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const db = await getDb()
  const stores = db.stores || []
  const categories = db.categories || []
  const events = db.events || []
  const vacancies = db.vacancies || []
  const premises = db.premises || []
  const activityLogs = db.activityLogs || []
  const mallInfo = db.mallInfo
  const leasingInquiries = db.leasingInquiries || []
  const jobApplications = db.jobApplications || []

  const storeCount = stores.length
  const categoryCount = categories.length
  const eventCount = events.length
  const activeVacancies = vacancies.filter(v => v.status === 'Active').length
  const availablePremises = premises.filter(p => p.status === 'Available').length
  const totalPremises = premises.length
  const rentedPremises = premises.filter(p => p.status === 'Rented').length
  const occupancyRate = totalPremises > 0 ? Math.round((rentedPremises / totalPremises) * 100) : 100

  const newInquiries = leasingInquiries.filter(i => i.status === 'New').length
  const newApplications = jobApplications.filter(a => a.status === 'New').length
  const totalNewNotifications = newInquiries + newApplications

  const stats = [
    { 
      name: "Total Stores", 
      value: storeCount, 
      sub: `${stores.filter(s => s.isPremium).length} premium brands`, 
      icon: Store, 
      href: "/admin/stores",
      color: "text-blue-600", 
      bg: "bg-blue-50", 
      border: "border-blue-100" 
    },
    { 
      name: "Mall Categories", 
      value: categoryCount, 
      sub: "Active sectors", 
      icon: Tag, 
      href: "/admin/categories",
      color: "text-emerald-600", 
      bg: "bg-emerald-50", 
      border: "border-emerald-100" 
    },
    { 
      name: "Available Premises", 
      value: `${availablePremises} / ${totalPremises}`, 
      sub: `${occupancyRate}% occupancy rate`, 
      icon: Building, 
      href: "/admin/premises",
      color: "text-amber-600", 
      bg: "bg-amber-50", 
      border: "border-amber-100" 
    },
    { 
      name: "Active Vacancies", 
      value: activeVacancies, 
      sub: "Hiring open now", 
      icon: Briefcase, 
      href: "/admin/vacancies",
      color: "text-purple-600", 
      bg: "bg-purple-50", 
      border: "border-purple-100" 
    },
  ]

  return (
    <div className="space-y-8">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-0.5 rounded-md border border-red-100">
              Control Center
            </span>
            <span className="text-xs text-slate-400 font-medium">• Live Database</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Mall Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            Bütün mağazaları, icarə sahələrini, vakansiyaları və tədbirləri buradan idarə edin.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/stores"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-5 py-3 rounded-2xl shadow-lg shadow-red-600/20 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" /> Yeni Mağaza Əlavə Et
          </Link>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-5 py-3 rounded-2xl transition-all"
          >
            <ExternalLink className="w-4 h-4" /> Sayta Bax
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <Link 
            key={stat.name} 
            href={stat.href}
            className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:border-red-300 hover:shadow-md transition-all group relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} border ${stat.border} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-slate-400 group-hover:text-red-600 transition-colors">
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </div>
            <div>
              <p className="text-3xl font-black text-slate-900 mb-1 tracking-tight">{stat.value}</p>
              <p className="text-sm font-bold text-slate-700">{stat.name}</p>
              <p className="text-xs text-slate-400 mt-0.5">{stat.sub}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* New Inquiries & Applications Notification Row */}
      {(newInquiries > 0 || newApplications > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {newInquiries > 0 && (
            <Link
              href="/admin/leasing-inquiries"
              className="flex items-center gap-4 p-5 bg-amber-50 border border-amber-200 rounded-3xl hover:bg-amber-100 transition-all group shadow-xs"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-black text-amber-900 text-sm">Yeni İcarə Sorğusu</p>
                  <span className="text-xs font-black bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                    {newInquiries} yeni
                  </span>
                </div>
                <p className="text-xs text-amber-700 mt-0.5">Sahə icarəsi ilə bağlı müraciət daxil olub — klikləyin</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-amber-500 group-hover:text-amber-700 transition-colors shrink-0" />
            </Link>
          )}
          {newApplications > 0 && (
            <Link
              href="/admin/job-applications"
              className="flex items-center gap-4 p-5 bg-purple-50 border border-purple-200 rounded-3xl hover:bg-purple-100 transition-all group shadow-xs"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-purple-600/30 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-black text-purple-900 text-sm">Yeni İş Müraciəti (CV)</p>
                  <span className="text-xs font-black bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                    {newApplications} yeni
                  </span>
                </div>
                <p className="text-xs text-purple-700 mt-0.5">Vakansiyaya yeni namizəd müraciəti — klikləyin</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-purple-500 group-hover:text-purple-700 transition-colors shrink-0" />
            </Link>
          )}
        </div>
      )}

      {/* Quick Action Hub */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-slate-700">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 opacity-5 pointer-events-none">
          <Store className="w-96 h-96" />
        </div>
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-black tracking-tight">Sürətli Əməliyyatlar (Quick Actions)</h2>
              <p className="text-xs text-slate-400">İstənilən bölməyə 1 kliklə daxil olub məlumatları dərhal əlavə edin və ya dəyişin</p>
            </div>
            {mallInfo?.announcement?.enabled && (
              <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10 text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Bildiriş Aktivdir: "{mallInfo.announcement.text.slice(0, 30)}..."</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3">
            <Link 
              href="/admin/stores" 
              className="bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl p-4 text-center transition-all group hover:scale-[1.03]"
            >
              <Store className="w-6 h-6 mx-auto mb-2 text-red-400 group-hover:text-red-300 transition-colors" />
              <p className="text-xs font-bold text-white">Mağazalar</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{storeCount} mağaza</p>
            </Link>

            <Link 
              href="/admin/categories" 
              className="bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl p-4 text-center transition-all group hover:scale-[1.03]"
            >
              <Tag className="w-6 h-6 mx-auto mb-2 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
              <p className="text-xs font-bold text-white">Kateqoriyalar</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{categoryCount} bölmə</p>
            </Link>

            <Link 
              href="/admin/premises" 
              className="bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl p-4 text-center transition-all group hover:scale-[1.03]"
            >
              <Building className="w-6 h-6 mx-auto mb-2 text-amber-400 group-hover:text-amber-300 transition-colors" />
              <p className="text-xs font-bold text-white">İcarə / Sahələr</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{availablePremises} boş sahə</p>
            </Link>

            <Link 
              href="/admin/leasing-inquiries" 
              className="bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl p-4 text-center transition-all group hover:scale-[1.03] relative"
            >
              {newInquiries > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-ping" />
              )}
              <Mail className="w-6 h-6 mx-auto mb-2 text-amber-300 group-hover:text-amber-200 transition-colors" />
              <p className="text-xs font-bold text-white">İcarə Sorğuları</p>
              <p className="text-[10px] text-amber-300 font-semibold mt-0.5">{leasingInquiries.length} sorğu ({newInquiries} yeni)</p>
            </Link>

            <Link 
              href="/admin/vacancies" 
              className="bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl p-4 text-center transition-all group hover:scale-[1.03]"
            >
              <Briefcase className="w-6 h-6 mx-auto mb-2 text-purple-400 group-hover:text-purple-300 transition-colors" />
              <p className="text-xs font-bold text-white">Vakansiyalar</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{activeVacancies} aktiv</p>
            </Link>

            <Link 
              href="/admin/job-applications" 
              className="bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl p-4 text-center transition-all group hover:scale-[1.03] relative"
            >
              {newApplications > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-ping" />
              )}
              <Users className="w-6 h-6 mx-auto mb-2 text-purple-300 group-hover:text-purple-200 transition-colors" />
              <p className="text-xs font-bold text-white">İş Müraciətləri</p>
              <p className="text-[10px] text-purple-300 font-semibold mt-0.5">{jobApplications.length} namizəd ({newApplications} yeni)</p>
            </Link>

            <Link 
              href="/admin/events" 
              className="bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl p-4 text-center transition-all group hover:scale-[1.03]"
            >
              <Calendar className="w-6 h-6 mx-auto mb-2 text-blue-400 group-hover:text-blue-300 transition-colors" />
              <p className="text-xs font-bold text-white">Tədbirlər</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{eventCount} tədbir</p>
            </Link>

            <Link 
              href="/admin/settings" 
              className="bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl p-4 text-center transition-all group hover:scale-[1.03]"
            >
              <Clock className="w-6 h-6 mx-auto mb-2 text-rose-400 group-hover:text-rose-300 transition-colors" />
              <p className="text-xs font-bold text-white">Tənzimləmələr</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Şifrə & Əlaqə</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Grid: Activity Feed + Mall Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Real Activity Feed */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 shadow-xs flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <Activity className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Son Əməliyyat Tarixçəsi (Activity Log)</h3>
                <p className="text-xs text-slate-500">Admin paneldə icra olunan son dəyişikliklər</p>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
              {activityLogs.length} qeyd
            </span>
          </div>

          <div className="p-6 flex-1 overflow-y-auto max-h-[460px] custom-scrollbar">
            {activityLogs.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <p className="text-sm">Hələ ki əməliyyat qeydi yoxdur.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activityLogs.map((log) => {
                  const dateStr = new Date(log.timestamp).toLocaleString('az-AZ', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                  return (
                    <div 
                      key={log.id} 
                      className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/70 transition-colors border border-slate-100"
                    >
                      <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-red-600 flex items-center justify-center font-bold text-xs shrink-0 shadow-xs mt-0.5">
                        ✓
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <p className="font-bold text-slate-900 text-xs sm:text-sm truncate">{log.action}</p>
                          <span className="text-[11px] font-mono text-slate-400 shrink-0">{dateStr}</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{log.description}</p>
                        <p className="text-[10px] text-slate-400 mt-1 font-medium">İstifadəçi: {log.user}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Mall Overview & Status Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Ticarət Mərkəzi Göstəriciləri
            </h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                  <span className="text-slate-600">İcarə Doluluq Faizı</span>
                  <span className="text-slate-900">{occupancyRate}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-red-500 to-rose-600 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${occupancyRate}%` }} 
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  {rentedPremises} icarədə, {availablePremises} boş sahə
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">İş Saatları:</span>
                  <span className="font-semibold text-slate-800">{mallInfo?.workingHours || '10:00 - 22:00'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Əlaqə Nömrəsi:</span>
                  <span className="font-semibold text-slate-800">{mallInfo?.phone || '+994 12 404 00 00'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Ünvan:</span>
                  <span className="font-semibold text-slate-800 text-right truncate max-w-[170px]">{mallInfo?.address || 'Səməd Vurğun 34'}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link 
                href="/admin/settings"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors border border-slate-200"
              >
                Məlumatları Yenilə
              </Link>
            </div>
          </div>

          {/* Mall Announcement Preview */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-3xl p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
                  Başlıq Bildirişi (Banner)
                </p>
                <p className="text-xs text-amber-900 leading-relaxed font-medium">
                  {mallInfo?.announcement?.enabled 
                    ? mallInfo.announcement.text 
                    : 'Bildiriş hazırda deaktivdir. Tənzimləmələrdən aktivləşdirə bilərsiniz.'}
                </p>
                <Link 
                  href="/admin/settings" 
                  className="inline-block mt-3 text-xs font-bold text-amber-900 hover:text-amber-700 underline"
                >
                  Banneri dəyiş →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
