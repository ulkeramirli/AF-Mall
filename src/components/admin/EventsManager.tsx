'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Plus, Search, Edit3, Trash2, X, MapPin, Clock, Image as ImageIcon } from 'lucide-react'
import { addEvent, updateEvent, deleteEvent } from '@/lib/actions'
import { Event as MallEvent } from '@/types'

export function EventsManager({
  initialEvents
}: {
  initialEvents: MallEvent[];
}) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<MallEvent | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const filtered = initialEvents.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    (e.location && e.location.toLowerCase().includes(search.toLowerCase())) ||
    (e.description && e.description.toLowerCase().includes(search.toLowerCase()))
  )

  const handleOpenAdd = () => {
    setEditingEvent(null)
    setError(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (evt: MallEvent) => {
    setEditingEvent(evt)
    setError(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (evt: MallEvent) => {
    if (!confirm(`"${evt.title}" tədbirini silmək istəyirsiniz?`)) return
    try {
      await deleteEvent(evt.id)
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
      if (editingEvent) {
        formData.set('id', editingEvent.id)
        await updateEvent(formData)
      } else {
        await addEvent(formData)
      }
      setIsModalOpen(false)
      setEditingEvent(null)
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
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
              Tədbirlər və Aksiyalar
            </span>
            <span className="text-xs text-slate-400 font-medium">Toplam {initialEvents.length} tədbir</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Mall Tədbirləri</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Xüsusi konsertlər, moda nümayişləri, endirim kampaniyaları və tədbirlər.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] cursor-pointer shrink-0"
        >
          <Plus className="w-5 h-5" /> Yeni Tədbir Əlavə Et
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tədbir adı, məkan və ya açar sözlə axtar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-2 text-xs font-medium focus:outline-none focus:border-blue-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(evt => (
          <div 
            key={evt.id} 
            className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col group hover:shadow-lg transition-all"
          >
            {/* Cover Image */}
            <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
              {evt.image ? (
                <img 
                  src={evt.image} 
                  alt={evt.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                  <ImageIcon className="w-12 h-12" />
                </div>
              )}
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-xs p-1 rounded-2xl shadow-sm">
                <button
                  onClick={() => handleOpenEdit(evt)}
                  className="p-1.5 text-slate-600 hover:text-slate-950 hover:bg-slate-100 rounded-xl"
                  title="Redaktə et"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(evt)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl"
                  title="Sil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {evt.location && (
                <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-xl flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-red-400" />
                  <span>{evt.location}</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-blue-600 text-xs font-bold mb-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {new Date(evt.date).toLocaleDateString('az-AZ', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <h3 className="font-extrabold text-slate-900 text-base mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {evt.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                  {evt.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="bg-slate-100 text-slate-600 font-mono px-2 py-0.5 rounded text-[10px]">
                  ID: #{evt.id}
                </span>
                <span className="text-emerald-600 font-bold text-xs">
                  {evt.status || 'Upcoming'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-lg font-black text-slate-900">
                {editingEvent ? 'Tədbiri Redaktə Et' : 'Yeni Tədbir Əlavə Et'}
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
                <label className="text-xs font-bold text-slate-700 uppercase">Tədbir Başlığı *</label>
                <input
                  required
                  name="title"
                  placeholder="Məs: Yaz Moda Nümayişi 2026"
                  defaultValue={editingEvent?.title || ''}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Tarix & Saat *</label>
                  <input
                    required
                    type="datetime-local"
                    name="date"
                    defaultValue={editingEvent?.date ? editingEvent.date.slice(0, 16) : ''}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Status</label>
                  <select
                    name="status"
                    defaultValue={editingEvent?.status || 'Upcoming'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white"
                  >
                    <option value="Upcoming">Gözlənilir (Upcoming)</option>
                    <option value="Ongoing">Davam edir (Ongoing)</option>
                    <option value="Past">Keçmiş (Past)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Məkan (Mall daxili) *</label>
                <input
                  required
                  name="location"
                  placeholder="Məs: Əsas Atrium, Kinoteatr zonası, 2-ci mərtəbə"
                  defaultValue={editingEvent?.location || ''}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Cover Şəkil URL</label>
                <input
                  name="image"
                  placeholder="https://images.unsplash.com/..."
                  defaultValue={editingEvent?.image || ''}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Təsvir və Təfərrüatlar *</label>
                <textarea
                  required
                  name="description"
                  rows={4}
                  placeholder="Tədbir haqqında ətraflı məlumat, iştirak şərtləri və s."
                  defaultValue={editingEvent?.description || ''}
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
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all disabled:opacity-50"
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
