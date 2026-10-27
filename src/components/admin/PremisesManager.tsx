'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Building, Plus, Search, Edit3, Trash2, X, DollarSign, Layers, CheckCircle2 } from 'lucide-react'
import { addPremise, updatePremise, deletePremise } from '@/lib/actions'
import { Premise } from '@/types'

export function PremisesManager({
  initialPremises
}: {
  initialPremises: Premise[];
}) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'Available' | 'Rented' | 'Reserved'>('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPremise, setEditingPremise] = useState<Premise | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const filtered = initialPremises.filter(p => {
    const matchSearch = p.id.toLowerCase().includes(search.toLowerCase()) ||
      (p.tenant && p.tenant.toLowerCase().includes(search.toLowerCase())) ||
      p.type.toLowerCase().includes(search.toLowerCase()) ||
      p.area.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || p.status === statusFilter
    return matchSearch && matchStatus
  })

  const availableCount = initialPremises.filter(p => p.status === 'Available').length
  const rentedCount = initialPremises.filter(p => p.status === 'Rented').length

  const handleOpenAdd = () => {
    setEditingPremise(null)
    setError(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (premise: Premise) => {
    setEditingPremise(premise)
    setError(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (premise: Premise) => {
    if (!confirm(`"${premise.id}" sahəsini silmək istədiyinizdən əminsiniz?`)) return
    try {
      await deletePremise(premise.id)
      router.refresh()
    } catch (err: any) {
      alert('Xəta: ' + (err.message || 'Error'))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)
      if (editingPremise) {
        formData.set('id', editingPremise.id)
        await updatePremise(formData)
      } else {
        await addPremise(formData)
      }
      setIsModalOpen(false)
      setEditingPremise(null)
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Xəta baş verdi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
              İcarə & Sahələr
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {availableCount} Boş / {initialPremises.length} Toplam Sahə
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Mall Sahələri və İcarə</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Mall daxilindəki mağaza və ofis sahələrinin icarə statusunu idarə edin.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-amber-600/20 transition-all hover:scale-[1.02] cursor-pointer shrink-0"
        >
          <Plus className="w-5 h-5" /> Yeni Sahə Əlavə Et
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl w-full md:w-auto">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${statusFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Hamısı ({initialPremises.length})
          </button>
          <button
            onClick={() => setStatusFilter('Available')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${statusFilter === 'Available' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Boş Sahələr ({availableCount})
          </button>
          <button
            onClick={() => setStatusFilter('Rented')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${statusFilter === 'Rented' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
          >
            İcarədə ({rentedCount})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ID, icarədar və ya tip axtar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-2 text-xs font-medium focus:outline-none focus:border-amber-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Premises Grid / Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 px-4 text-slate-400">
            <Building className="w-12 h-12 mx-auto mb-2 text-slate-300" />
            <p className="font-bold text-slate-700">Heç bir sahə tapılmadı</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50/70 text-slate-400 uppercase text-[11px] font-black tracking-wider border-b border-slate-100">
                  <th className="p-5 pl-6">Foto & ID</th>
                  <th className="p-5">Mərtəbə & Sahə</th>
                  <th className="p-5">Tip</th>
                  <th className="p-5">Status & İcarədar</th>
                  <th className="p-5">Aylıq Qiymət</th>
                  <th className="p-5 pr-6 text-right">Əməliyyatlar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50/60 transition-colors group">
                    <td className="p-5 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                          {p.images && p.images[0] ? (
                            <img src={p.images[0]} alt={p.id} className="w-full h-full object-cover" />
                          ) : (
                            <Building className="w-6 h-6 m-auto text-slate-400 mt-3" />
                          )}
                        </div>
                        <div>
                          <span className="font-mono font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                            {p.id}
                          </span>
                          <p className="text-[11px] text-slate-400">{p.images?.length || 0} foto</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-5">
                      <p className="font-bold text-slate-800">Mərtəbə {p.floor}</p>
                      <p className="text-xs text-slate-500 font-mono">{p.area}</p>
                    </td>

                    <td className="p-5">
                      <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-xl text-xs font-semibold">
                        {p.type}
                      </span>
                    </td>

                    <td className="p-5">
                      <div className="space-y-1">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          p.status === 'Available'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : p.status === 'Rented'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${p.status === 'Available' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          {p.status === 'Available' ? 'Boş / Mümkündür' : p.status === 'Rented' ? 'İcarəyə Verilib' : p.status}
                        </span>
                        {p.tenant && (
                          <p className="text-xs font-semibold text-slate-800">İcarədar: {p.tenant}</p>
                        )}
                      </div>
                    </td>

                    <td className="p-5">
                      <span className="font-extrabold text-slate-900 font-mono">{p.price}</span>
                    </td>

                    <td className="p-5 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl"
                          title="Redaktə et"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl"
                          title="Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-lg font-black text-slate-900">
                {editingPremise ? `Sahəni Redaktə Et (${editingPremise.id})` : 'Yeni Sahə Əlavə Et'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-700 rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Sahə Kodu / ID *</label>
                  <input
                    required
                    name="id"
                    placeholder="Məsələn: P105"
                    defaultValue={editingPremise?.id || ''}
                    disabled={!!editingPremise}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white disabled:opacity-50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Mərtəbə *</label>
                  <input
                    required
                    name="floor"
                    placeholder="1, 2, 3..."
                    defaultValue={editingPremise?.floor || '1'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Sahə (Ölçü) *</label>
                  <input
                    required
                    name="area"
                    placeholder="Məsələn: 120 sqm"
                    defaultValue={editingPremise?.area || ''}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Obyekt Tipi *</label>
                  <select
                    required
                    name="type"
                    defaultValue={editingPremise?.type || 'Retail'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white"
                  >
                    <option value="Retail">Retail (Pərakəndə Mağaza)</option>
                    <option value="Office">Office (Ofis)</option>
                    <option value="Restaurant">Restaurant / Cafe</option>
                    <option value="Kiosk">Kiosk / Ada stendi</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Status *</label>
                  <select
                    required
                    name="status"
                    defaultValue={editingPremise?.status || 'Available'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white"
                  >
                    <option value="Available">Available (Boş / İcarəyə açıq)</option>
                    <option value="Rented">Rented (İcarədədir)</option>
                    <option value="Reserved">Reserved (Bron edilib)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">İcarədar Şirkət (əgər icarədədirsə)</label>
                  <input
                    name="tenant"
                    placeholder="Məsələn: Zara, Starbucks..."
                    defaultValue={editingPremise?.tenant || ''}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Aylıq Qiymət *</label>
                <input
                  required
                  name="price"
                  placeholder="Məsələn: $4,500/mo və ya 5,000 AZN/ay"
                  defaultValue={editingPremise?.price || ''}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Şəkil URL-ləri (vergüllə ayırın)</label>
                <input
                  name="images"
                  placeholder="https://...1.jpg, https://...2.jpg"
                  defaultValue={editingPremise?.images?.join(', ') || ''}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Təsvir / Xüsusiyyətlər</label>
                <textarea
                  name="description"
                  rows={2}
                  placeholder="Vitrin genişliyi, havalandırma, elektrik gücü və s."
                  defaultValue={editingPremise?.description || ''}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-800"
                >
                  Ləğv et
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold rounded-xl transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Saxlanılır...' : 'Yadda Saxla'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
