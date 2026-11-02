'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import {
  Briefcase, User, Phone, Mail, ExternalLink, Clock, Check,
  X, ChevronDown, MessageCircle, Trash2, CheckCircle2,
  AlertCircle, Search, Filter
} from 'lucide-react'
import { updateJobApplicationStatus, deleteJobApplication } from '@/lib/actions'
import { JobApplication, JobApplicationStatus } from '@/types'

const STATUS_OPTS: { value: JobApplicationStatus; label: string; color: string }[] = [
  { value: 'New', label: 'Yeni', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { value: 'Reviewed', label: 'Baxıldı', color: 'bg-slate-100 text-slate-700 border-slate-200' },
  { value: 'Interview', label: 'Müsahibə', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  { value: 'Offered', label: 'Təklif Verildi', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { value: 'Rejected', label: 'Rədd Edildi', color: 'bg-red-100 text-red-700 border-red-200' },
]

function getStatusStyle(status: string) {
  return STATUS_OPTS.find(o => o.value === status)?.color || 'bg-slate-100 text-slate-600 border-slate-200'
}

function getStatusLabel(status: string) {
  return STATUS_OPTS.find(o => o.value === status)?.label || status
}

export function JobApplicationsManager({ initialApplications }: { initialApplications: JobApplication[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | JobApplicationStatus>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [adminNotes, setAdminNotes] = useState<Record<string, string>>({})

  const filtered = initialApplications.filter(app => {
    const q = search.toLowerCase()
    const matchSearch = !q || app.fullName.toLowerCase().includes(q) || app.position.toLowerCase().includes(q) || app.storeName.toLowerCase().includes(q)
    const matchStatus = statusFilter === 'all' || app.status === statusFilter
    return matchSearch && matchStatus
  })

  async function handleStatusChange(id: string, status: JobApplicationStatus) {
    startTransition(async () => {
      await updateJobApplicationStatus(id, status, adminNotes[id])
      router.refresh()
    })
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`"${name}" müraciətini silmək istəyirsiniz?`)) return
    startTransition(async () => {
      await deleteJobApplication(id)
      router.refresh()
    })
  }

  const newCount = initialApplications.filter(a => a.status === 'New').length
  const interviewCount = initialApplications.filter(a => a.status === 'Interview').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
              İş Müraciətləri
            </span>
            {newCount > 0 && (
              <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100 animate-pulse">
                <AlertCircle className="w-3 h-3" /> {newCount} Yeni
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">CV & İş Müraciətləri</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {initialApplications.length} müraciət · {interviewCount} müsahibə mərhələsindədir
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Ad, vəzifə, mağaza axtar..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl flex-wrap">
          {[{ val: 'all', lbl: `Hamısı (${initialApplications.length})` }, ...STATUS_OPTS.map(s => ({ val: s.value, lbl: `${s.label}` }))].map(opt => (
            <button
              key={opt.val}
              onClick={() => setStatusFilter(opt.val as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${statusFilter === opt.val ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {opt.lbl}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-100">
            <Briefcase className="w-12 h-12 text-slate-200 mx-auto mb-3" />
            <p className="text-slate-500">Müraciət tapılmadı</p>
          </div>
        ) : (
          filtered.map(app => (
            <div
              key={app.id}
              className={`bg-white rounded-2xl border transition-all ${expandedId === app.id ? 'border-blue-300 shadow-lg shadow-blue-100/40' : 'border-slate-200 hover:border-slate-300'}`}
            >
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 cursor-pointer"
                onClick={() => setExpandedId(expandedId === app.id ? null : app.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-black text-sm shrink-0">
                    {app.fullName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="font-black text-slate-900">{app.fullName}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusStyle(app.status)}`}>
                        {getStatusLabel(app.status)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 font-medium">{app.position} — <span className="text-slate-500">{app.storeName}</span></p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {new Date(app.createdAt).toLocaleString('az-AZ', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {app.phone && (
                    <a href={`tel:${app.phone}`} onClick={e => e.stopPropagation()} className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 transition-colors">
                      <Phone className="w-3.5 h-3.5 text-slate-400" /> {app.phone}
                    </a>
                  )}
                  <a
                    href={`https://wa.me/${app.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Salam ${app.fullName}! AF Mall HR departamentindən əlaqə saxlayırıq.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="p-2 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 hover:bg-emerald-100 transition-colors"
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedId === app.id ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {expandedId === app.id && (
                <div className="border-t border-slate-100 p-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    {app.email && (
                      <div>
                        <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">E-poçt</p>
                        <a href={`mailto:${app.email}`} className="text-blue-600 hover:underline font-medium">{app.email}</a>
                      </div>
                    )}
                    {app.cvLink && (
                      <div>
                        <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">CV / Portfolio</p>
                        <a href={app.cvLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline font-medium">
                          <ExternalLink className="w-3.5 h-3.5" /> CV Linkə Bax
                        </a>
                      </div>
                    )}
                    {app.experience && (
                      <div className="col-span-2">
                        <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">İş Təcrübəsi</p>
                        <p className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">{app.experience}</p>
                      </div>
                    )}
                    {app.message && (
                      <div className="col-span-2">
                        <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Örtük Məktubu / Qeydlər</p>
                        <p className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">{app.message}</p>
                      </div>
                    )}
                    {app.adminNotes && (
                      <div className="col-span-2">
                        <p className="text-xs font-bold text-amber-600 mb-1 uppercase tracking-wider">Admin Qeydləri</p>
                        <p className="text-slate-700 bg-amber-50 p-3 rounded-xl border border-amber-100">{app.adminNotes}</p>
                      </div>
                    )}
                  </div>

                  {/* Admin notes input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Admin Qeydi əlavə et / yenilə</label>
                    <textarea
                      rows={2}
                      value={adminNotes[app.id] ?? app.adminNotes ?? ''}
                      onChange={e => setAdminNotes(prev => ({ ...prev, [app.id]: e.target.value }))}
                      placeholder="Müsahibə vaxtı, yönləndirmə qeydləri, əlavə şərhlər..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                    />
                  </div>

                  {/* Status + Actions */}
                  <div className="flex flex-wrap items-center gap-3">
                    <select
                      defaultValue={app.status}
                      onChange={e => handleStatusChange(app.id, e.target.value as JobApplicationStatus)}
                      disabled={isPending}
                      className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      {STATUS_OPTS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>

                    <button
                      onClick={() => handleStatusChange(app.id, app.status)}
                      disabled={isPending}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors disabled:opacity-60"
                    >
                      <Check className="w-4 h-4" /> Qeydi Saxla
                    </button>

                    <button
                      onClick={() => handleDelete(app.id, app.fullName)}
                      disabled={isPending}
                      className="flex items-center gap-2 text-red-600 hover:bg-red-50 text-sm font-bold px-4 py-2.5 rounded-xl border border-red-200 transition-colors disabled:opacity-60"
                    >
                      <Trash2 className="w-4 h-4" /> Sil
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
