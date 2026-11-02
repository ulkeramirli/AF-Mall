import { getDb } from '@/lib/actions'
import { JobApplicationsManager } from '@/components/admin/JobApplicationsManager'
import { Briefcase } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'İş Müraciətləri | AF Mall Admin',
}

export default async function JobApplicationsPage() {
  const db = await getDb()
  const jobApplications = db.jobApplications || []

  const newCount = jobApplications.filter(a => a.status === 'New').length
  const interviewCount = jobApplications.filter(a => a.status === 'Interview').length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100">
                HR Panel
              </span>
              {newCount > 0 && (
                <span className="text-xs font-bold bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                  {newCount} Yeni
                </span>
              )}
            </div>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">İş Müraciətləri</h1>
          <p className="text-sm text-slate-500 mt-1">
            Vakansiyalara daxil olan bütün müraciətlər — cavablandırın, status verin, qeyd əlavə edin.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="text-center px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200">
            <p className="text-2xl font-black text-slate-900">{jobApplications.length}</p>
            <p className="text-xs text-slate-500 font-semibold">Ümumi</p>
          </div>
          <div className="text-center px-4 py-3 rounded-2xl bg-blue-50 border border-blue-100">
            <p className="text-2xl font-black text-blue-700">{newCount}</p>
            <p className="text-xs text-blue-600 font-semibold">Yeni</p>
          </div>
          <div className="text-center px-4 py-3 rounded-2xl bg-amber-50 border border-amber-100">
            <p className="text-2xl font-black text-amber-700">{interviewCount}</p>
            <p className="text-xs text-amber-600 font-semibold">Müsahibə</p>
          </div>
        </div>
      </div>

      {/* Manager Component */}
      <JobApplicationsManager initialApplications={jobApplications} />
    </div>
  )
}
