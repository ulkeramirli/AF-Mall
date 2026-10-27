'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Briefcase, Plus, Search, Edit3, Trash2, X, DollarSign, Calendar, CheckCircle } from 'lucide-react'
import { addVacancy, updateVacancy, deleteVacancy } from '@/lib/actions'
import { Vacancy } from '@/types'

export function VacanciesManager({
  initialVacancies
}: {
  initialVacancies: Vacancy[];
}) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'Active' | 'Closed'>('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingVacancy, setEditingVacancy] = useState<Vacancy | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const filtered = initialVacancies.filter(v => {
    const matchSearch = v.position.toLowerCase().includes(search.toLowerCase()) ||
      v.storeName.toLowerCase().includes(search.toLowerCase()) ||
      v.type.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || v.status === statusFilter
    return matchSearch && matchStatus
  })

  const activeCount = initialVacancies.filter(v => v.status === 'Active').length

  const handleOpenAdd = () => {
    setEditingVacancy(null)
    setError(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (vac: Vacancy) => {
    setEditingVacancy(vac)
    setError(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (vac: Vacancy) => {
    if (!confirm(`"${vac.position}" vakansiyasını silmək istəyirsiniz?`)) return
    try {
      await deleteVacancy(vac.id)
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
      if (editingVacancy) {
        formData.set('id', editingVacancy.id)
        await updateVacancy(formData)
      } else {
        await addVacancy(formData)
      }
      setIsModalOpen(false)
      setEditingVacancy(null)
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
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
              Karyera
            </span>
            <span className="text-xs text-slate-400 font-medium">{activeCount} Aktiv Vakansiya</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Mall Vakansiyaları</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Mağazaların və Mall administrasiyasının iş elanlarını idarə edin.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-purple-600/20 transition-all hover:scale-[1.02] cursor-pointer shrink-0"
        >
          <Plus className="w-5 h-5" /> Yeni Vakansiya Elan Et
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl w-full sm:w-auto">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${statusFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
          >
            Hamısı ({initialVacancies.length})
          </button>
          <button
            onClick={() => setStatusFilter('Active')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${statusFilter === 'Active' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600'}`}
          >
            Aktiv ({activeCount})
          </button>
          <button
            onClick={() => setStatusFilter('Closed')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${statusFilter === 'Closed' ? 'bg-slate-700 text-white shadow-xs' : 'text-slate-600'}`}
          >
            Bağlanmış
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Vəzifə və ya şirkət axtar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-2 text-xs font-medium focus:outline-none focus:border-purple-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <Briefcase className="w-12 h-12 mx-auto mb-2 text-slate-300" />
            <p className="font-bold text-slate-700">Heç bir vakansiya tapılmadı</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50/70 text-slate-400 uppercase text-[11px] font-black tracking-wider border-b border-slate-100">
                  <th className="p-5 pl-6">Vəzifə</th>
                  <th className="p-5">Mağaza / Şirkət</th>
                  <th className="p-5">Rejim & Maaş</th>
                  <th className="p-5">Status</th>
                  <th className="p-5">Tarix</th>
                  <th className="p-5 pr-6 text-right">Əməliyyatlar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(vac => (
                  <tr key={vac.id} className="hover:bg-slate-50/60 transition-colors group">
                    <td className="p-5 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold shrink-0">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors">
                            {vac.position}
                          </p>
                          <p className="text-xs text-slate-400 line-clamp-1 max-w-xs">{vac.description || 'Təsvir yoxdur'}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-5 font-bold text-slate-700">{vac.storeName}</td>

                    <td className="p-5">
                      <div className="space-y-0.5">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs font-semibold">
                          {vac.type}
                        </span>
                        {vac.salary && <p className="text-xs font-mono text-emerald-600 font-bold">{vac.salary}</p>}
                      </div>
                    </td>

                    <td className="p-5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        vac.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${vac.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                        {vac.status === 'Active' ? 'Aktiv' : 'Bağlı'}
                      </span>
                    </td>

                    <td className="p-5 text-xs text-slate-400 font-mono">{vac.postedDate}</td>

                    <td className="p-5 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEdit(vac)}
                          className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl"
                          title="Redaktə et"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(vac)}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-lg font-black text-slate-900">
                {editingVacancy ? 'Vakansiyanı Redaktə Et' : 'Yeni Vakansiya Elan Et'}
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

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Vəzifə Adı *</label>
                <input
                  required
                  name="position"
                  placeholder="Məs: Satış Məsləhətçisi, Kassir, Menecer"
                  defaultValue={editingVacancy?.position || ''}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Mağaza / Şirkət Adı *</label>
                <input
                  required
                  name="storeName"
                  placeholder="Məs: Zara, Apple Store, AF Mall Management"
                  defaultValue={editingVacancy?.storeName || ''}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">İş Qrafiki *</label>
                  <select
                    name="type"
                    defaultValue={editingVacancy?.type || 'Full-time'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white"
                  >
                    <option value="Full-time">Tam Ştat (Full-time)</option>
                    <option value="Part-time">Yarım Ştat (Part-time)</option>
                    <option value="Shift">Növbəli (Shift)</option>
                    <option value="Internship">Təcrübəçi (Internship)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Status *</label>
                  <select
                    name="status"
                    defaultValue={editingVacancy?.status || 'Active'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white"
                  >
                    <option value="Active">Aktiv (Müraciət açıqdır)</option>
                    <option value="Closed">Bağlanmış (İşə qəbul bitdi)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Əmək Haqqı (Maaş)</label>
                <input
                  name="salary"
                  placeholder="Məs: 700 - 900 AZN və ya Razılaşma yolu ilə"
                  defaultValue={editingVacancy?.salary || ''}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Tələblər və Ətraflı Məlumat</label>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="İş təcrübəsi, dil bilikləri və digər tələblər..."
                  defaultValue={editingVacancy?.description || ''}
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
                  className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-xl transition-all disabled:opacity-50"
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
