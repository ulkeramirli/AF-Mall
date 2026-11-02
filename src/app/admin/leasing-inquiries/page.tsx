import { getDb } from '@/lib/actions'
import { LeasingInquiriesManager } from '@/components/admin/LeasingInquiriesManager'
import { Mail } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'İcarə Sorğuları | AF Mall Admin',
}

export default async function LeasingInquiriesPage() {
  const db = await getDb()
  const leasingInquiries = db.leasingInquiries || []

  const newCount = leasingInquiries.filter(i => i.status === 'New').length
  const inProgressCount = leasingInquiries.filter(i => i.status === 'Contacted' || i.status === 'Under Review').length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
              <Mail className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-100">
                Leasing Panel
              </span>
              {newCount > 0 && (
                <span className="text-xs font-bold bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                  {newCount} Yeni
                </span>
              )}
            </div>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">İcarə Sorğuları</h1>
          <p className="text-sm text-slate-500 mt-1">
            Sahə icarəsi üçün daxil olan bütün sorğular — cavablandırın, status verin, qeyd əlavə edin.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="text-center px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200">
            <p className="text-2xl font-black text-slate-900">{leasingInquiries.length}</p>
            <p className="text-xs text-slate-500 font-semibold">Ümumi</p>
          </div>
          <div className="text-center px-4 py-3 rounded-2xl bg-blue-50 border border-blue-100">
            <p className="text-2xl font-black text-blue-700">{newCount}</p>
            <p className="text-xs text-blue-600 font-semibold">Yeni</p>
          </div>
          <div className="text-center px-4 py-3 rounded-2xl bg-amber-50 border border-amber-100">
            <p className="text-2xl font-black text-amber-700">{inProgressCount}</p>
            <p className="text-xs text-amber-600 font-semibold">Davam Edir</p>
          </div>
        </div>
      </div>

      {/* Manager Component */}
      <LeasingInquiriesManager initialInquiries={leasingInquiries} />
    </div>
  )
}
