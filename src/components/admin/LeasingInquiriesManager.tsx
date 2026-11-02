'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import {
  Building, Phone, Mail, ExternalLink, ChevronDown,
  MessageCircle, Trash2, Check, AlertCircle, Search, Send, MapPin, Maximize
} from 'lucide-react'
import { updateLeasingInquiryStatus, deleteLeasingInquiry } from '@/lib/actions'
import { LeasingInquiry, LeasingInquiryStatus } from '@/types'

const STATUS_OPTS: { value: LeasingInquiryStatus; label: string; color: string }[] = [
  { value: 'New', label: 'Yeni', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { value: 'Contacted', label: 'Əlaqə Saxlanıldı', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  { value: 'Under Review', label: 'Nəzərdən Keçirilir', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { value: 'Approved', label: 'Təsdiqləndi', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { value: 'Declined', label: 'Rədd Edildi', color: 'bg-red-100 text-red-700 border-red-200' },
]

function getStatusStyle(status: string) {
  return STATUS_OPTS.find(o => o.value === status)?.color || 'bg-slate-100 text-slate-600 border-slate-200'
}
function getStatusLabel(status: string) {
  return STATUS_OPTS.find(o => o.value === status)?.label || status
}

export function LeasingInquiriesManager({ initialInquiries }: { initialInquiries: LeasingInquiry[] }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | LeasingInquiryStatus>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [adminNotes, setAdminNotes] = useState<Record<string, string>>({})

  const filtered = initialInquiries.filter(inq => {
    const q = search.toLowerCase()
    const matchSearch = !q ||
      inq.fullName.toLowerCase().includes(q) ||
      inq.companyOrBrand.toLowerCase().includes(q) ||
      (inq.premiseId || '').toLowerCase().includes(q) ||
      inq.activityType.toLowerCase().includes(q)
    const matchStatus = statusFilter === 'all' || inq.status === statusFilter
    return matchSearch && matchStatus
  })

  async function handleStatusChange(id: string, status: LeasingInquiryStatus) {
    startTransition(async () => {
      await updateLeasingInquiryStatus(id, status, adminNotes[id])
      router.refresh()
    })
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`"${name}" sorğusunu silmək istəyirsiniz?`)) return
    startTransition(async () => {
      await deleteLeasingInquiry(id)
      router.refresh()
    })
  }

  const newCount = initialInquiries.filter(i => i.status === 'New').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
              İcarə Sorğuları
            </span>
            {newCount > 0 && (
              <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100 animate-pulse">
                <AlertCircle className="w-3 h-3" /> {newCount} Yeni
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">İcarə Müraciətləri</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{initialInquiries.length} sorğu</p>
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
            placeholder="Ad, brend, obyekt axtar..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
          />
        </div>
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl flex-wrap">
          {[{ val: 'all', lbl: `Hamısı (${initialInquiries.length})` }, ...STATUS_OPTS.map(s => ({ val: s.value, lbl: s.label }))].map(opt => (
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
            <Building className="w-12 h-12 text-slate-200 mx-auto mb-3" />
            <p className="text-slate-500">Sorğu tapılmadı</p>
          </div>
        ) : (
          filtered.map(inq => (
            <div
              key={inq.id}
              className={`bg-white rounded-2xl border transition-all ${expandedId === inq.id ? 'border-amber-300 shadow-lg shadow-amber-100/40' : 'border-slate-200 hover:border-slate-300'}`}
            >
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 cursor-pointer"
                onClick={() => setExpandedId(expandedId === inq.id ? null : inq.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center font-black text-sm shrink-0">
                    {inq.companyOrBrand.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="font-black text-slate-900">{inq.companyOrBrand}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusStyle(inq.status)}`}>
                        {getStatusLabel(inq.status)}
                      </span>
                      {inq.premiseId && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                          Obyekt: {inq.premiseId}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 font-medium">
                      {inq.fullName} · {inq.activityType}
                      {inq.requiredArea && <span className="text-slate-400"> · {inq.requiredArea}</span>}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {new Date(inq.createdAt).toLocaleString('az-AZ', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {inq.phone && (
                    <a href={`tel:${inq.phone}`} onClick={e => e.stopPropagation()} className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 transition-colors">
                      <Phone className="w-3.5 h-3.5 text-slate-400" /> {inq.phone}
                    </a>
                  )}
                  <a
                    href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Salam ${inq.fullName}! AF Mall İcarə departamentindən əlaqə saxlayırıq.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className="p-2 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 hover:bg-emerald-100 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedId === inq.id ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {expandedId === inq.id && (
                <div className="border-t border-slate-100 p-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    {inq.email && (
                      <div>
                        <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">E-poçt</p>
                        <a href={`mailto:${inq.email}`} className="text-blue-600 hover:underline font-medium">{inq.email}</a>
                      </div>
                    )}
                    {inq.budget && (
                      <div>
                        <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Planlaşdırılan Büdcə</p>
                        <p className="text-slate-700 font-semibold">{inq.budget}</p>
                      </div>
                    )}
                    {inq.requiredArea && (
                      <div>
                        <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Tələb Olunan Sahə</p>
                        <p className="text-slate-700 font-semibold">{inq.requiredArea}</p>
                      </div>
                    )}
                    {inq.notes && (
                      <div className="col-span-2">
                        <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Müştəri Qeydləri</p>
                        <p className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">{inq.notes}</p>
                      </div>
                    )}
                    {inq.adminNotes && (
                      <div className="col-span-2">
                        <p className="text-xs font-bold text-amber-600 mb-1 uppercase tracking-wider">Mövcud Admin Qeydi</p>
                        <p className="text-slate-700 bg-amber-50 p-3 rounded-xl border border-amber-100">{inq.adminNotes}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Admin Qeydi yenilə</label>
                    <textarea
                      rows={2}
                      value={adminNotes[inq.id] ?? inq.adminNotes ?? ''}
                      onChange={e => setAdminNotes(prev => ({ ...prev, [inq.id]: e.target.value }))}
                      placeholder="Görüş tarixi, təklif şərtləri, zəng qeydi..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <select
                      defaultValue={inq.status}
                      onChange={e => handleStatusChange(inq.id, e.target.value as LeasingInquiryStatus)}
                      disabled={isPending}
                      className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                    >
                      {STATUS_OPTS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>

                    <button
                      onClick={() => handleStatusChange(inq.id, inq.status)}
                      disabled={isPending}
                      className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors disabled:opacity-60"
                    >
                      <Check className="w-4 h-4" /> Qeydi Saxla
                    </button>

                    <button
                      onClick={() => handleDelete(inq.id, inq.companyOrBrand)}
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
