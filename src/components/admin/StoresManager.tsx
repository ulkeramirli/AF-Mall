'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Store as StoreIcon, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Star, 
  X, 
  Sparkles,
  Phone,
  Clock,
  MapPin,
  Tag
} from 'lucide-react'
import { addStore, updateStore, deleteStore } from '@/lib/actions'
import { Store, Category } from '@/types'

export function StoresManager({
  initialStores,
  categories
}: {
  initialStores: Store[];
  categories: Category[];
}) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedFloor, setSelectedFloor] = useState<string>('all')
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingStore, setEditingStore] = useState<Store | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Filtered Stores
  const filtered = initialStores.filter(store => {
    const matchSearch = store.name.toLowerCase().includes(search.toLowerCase()) || 
      (store.location && store.location.toLowerCase().includes(search.toLowerCase())) ||
      (store.description && store.description.toLowerCase().includes(search.toLowerCase()))
    const matchCat = selectedCategory === 'all' || store.categoryId === selectedCategory
    const matchFloor = selectedFloor === 'all' || store.floor === selectedFloor
    return matchSearch && matchCat && matchFloor
  })

  // Unique floors
  const floors = Array.from(new Set(initialStores.map(s => s.floor).filter(Boolean))).sort()

  const handleOpenAdd = () => {
    setEditingStore(null)
    setError(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (store: Store) => {
    setEditingStore(store)
    setError(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (store: Store) => {
    if (!confirm(`"${store.name}" mağazasını silmək istədiyinizdən əminsiniz?`)) return
    try {
      await deleteStore(store.id)
      router.refresh()
    } catch (err: any) {
      alert('Silinmə zamanı xəta baş verdi: ' + (err.message || 'Error'))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)
      if (editingStore) {
        formData.set('id', editingStore.id)
        await updateStore(formData)
      } else {
        await addStore(formData)
      }
      setIsModalOpen(false)
      setEditingStore(null)
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Xəta baş verdi. Zəhmət olmasa yenidən yoxlayın.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Bar with Title and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100">
              Kataloq
            </span>
            <span className="text-xs text-slate-400 font-medium">Toplam {initialStores.length} mağaza</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Mağazalar və Brendlər</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Mall daxilindəki bütün mağazaları əlavə edin, redaktə edin və ya silin.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-red-600/20 transition-all hover:scale-[1.02] cursor-pointer shrink-0"
        >
          <Plus className="w-5 h-5" /> Yeni Mağaza Əlavə Et
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Mağaza adı, yer və ya açar sözlə axtar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-2.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-red-500 focus:bg-white transition-all"
          />
          {search && (
            <button 
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-700 focus:outline-none focus:border-red-500 focus:bg-white transition-all cursor-pointer w-full md:w-48"
          >
            <option value="all">Bütün Kateqoriyalar</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {/* Floor Filter */}
          <select
            value={selectedFloor}
            onChange={(e) => setSelectedFloor(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-700 focus:outline-none focus:border-red-500 focus:bg-white transition-all cursor-pointer w-full md:w-36"
          >
            <option value="all">Bütün Mərtəbələr</option>
            {floors.map(f => (
              <option key={f} value={f}>{f}-ci Mərtəbə</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stores Table & Cards */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 px-4">
            <StoreIcon className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <h3 className="text-base font-bold text-slate-800">Heç bir mağaza tapılmadı</h3>
            <p className="text-xs text-slate-500 mt-1">Axtarış meyarlarını dəyişin və ya yeni mağaza əlavə edin.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 text-slate-400 uppercase text-[11px] font-black tracking-wider border-b border-slate-100">
                  <th className="p-5 pl-6">Mağaza & Loqo</th>
                  <th className="p-5">Kateqoriya</th>
                  <th className="p-5">Mərtəbə / Yer</th>
                  <th className="p-5">Əlaqə & Saatlar</th>
                  <th className="p-5">Status</th>
                  <th className="p-5 pr-6 text-right">Əməliyyatlar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filtered.map(store => {
                  const cat = categories.find(c => c.id === store.categoryId)
                  return (
                    <tr key={store.id} className="hover:bg-slate-50/60 transition-colors group">
                      {/* Logo and Name */}
                      <td className="p-5 pl-6">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 shadow-xs p-1.5 flex items-center justify-center shrink-0 overflow-hidden">
                            {store.logo ? (
                              <img src={store.logo} alt={store.name} className="w-full h-full object-contain" />
                            ) : store.image ? (
                              <img src={store.image} alt={store.name} className="w-full h-full object-cover rounded-xl" />
                            ) : (
                              <StoreIcon className="w-6 h-6 text-slate-400" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-slate-900 group-hover:text-red-600 transition-colors">
                                {store.name}
                              </span>
                              {store.isPremium && (
                                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-200">
                                  <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" /> Premium
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 line-clamp-1 max-w-xs mt-0.5">
                              {store.description || 'Məlumat daxil edilməyib'}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-5">
                        <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-xl">
                          <Tag className="w-3 h-3 text-slate-500" />
                          {cat?.name || 'Digər'}
                        </span>
                      </td>

                      {/* Floor & Location */}
                      <td className="p-5">
                        <div className="flex items-center gap-1.5 text-slate-700 font-semibold text-xs">
                          <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                          <span>Mərtəbə {store.floor}</span>
                          {store.location && (
                            <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[11px] font-mono font-bold">
                              {store.location}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Contact & Hours */}
                      <td className="p-5 text-xs text-slate-500 space-y-1">
                        {store.phone && (
                          <div className="flex items-center gap-1.5 font-medium text-slate-700">
                            <Phone className="w-3 h-3 text-slate-400" />
                            <span>{store.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5 font-mono text-[11px]">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{store.hours || '10:00 - 22:00'}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="p-5">
                        <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Aktiv
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-5 pr-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(store)}
                            className="p-2 text-slate-600 hover:text-slate-950 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
                            title="Redaktə et"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(store)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                            title="Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  {editingStore ? 'Mağazanı Redaktə Et' : 'Yeni Mağaza Əlavə Et'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Bütün məlumatları diqqətlə doldurun</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
              {error && (
                <div className="p-4 rounded-2xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Store Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Mağaza Adı *</label>
                  <input
                    required
                    name="name"
                    placeholder="Məsələn: Zara, Apple Store, Nike"
                    defaultValue={editingStore?.name || ''}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-red-500 focus:bg-white"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Kateqoriya *</label>
                  <select
                    required
                    name="categoryId"
                    defaultValue={editingStore?.categoryId || ''}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-red-500 focus:bg-white"
                  >
                    <option value="">Kateqoriya Seçin</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Floor */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Mərtəbə *</label>
                  <input
                    required
                    name="floor"
                    placeholder="Məsələn: 1 və ya 2"
                    defaultValue={editingStore?.floor || '1'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-red-500 focus:bg-white"
                  />
                </div>

                {/* Location / Unit */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Mall Daxili Yer / Unit</label>
                  <input
                    name="location"
                    placeholder="Məsələn: 1A, 2B, Şimal Qanad"
                    defaultValue={editingStore?.location || ''}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-red-500 focus:bg-white"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Əlaqə Telefonu</label>
                  <input
                    name="phone"
                    placeholder="+994 12 404 XX XX"
                    defaultValue={editingStore?.phone || ''}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-red-500 focus:bg-white"
                  />
                </div>

                {/* Working Hours */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">İş Saatları</label>
                  <input
                    name="hours"
                    placeholder="10:00 - 22:00"
                    defaultValue={editingStore?.hours || '10:00 - 22:00'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-red-500 focus:bg-white"
                  />
                </div>

                {/* Logo URL */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Loqo URL (PNG / SVG)</label>
                  <input
                    name="logo"
                    placeholder="https://.../logo.png"
                    defaultValue={editingStore?.logo || ''}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-red-500 focus:bg-white"
                  />
                </div>

                {/* Cover Image URL */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Şəkil URL (Cover)</label>
                  <input
                    name="image"
                    placeholder="https://images.unsplash.com/..."
                    defaultValue={editingStore?.image || ''}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-red-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Website */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Vebsayt və ya İnstagram</label>
                <input
                  name="website"
                  placeholder="https://instagram.com/... və ya https://brand.com"
                  defaultValue={editingStore?.website || ''}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-red-500 focus:bg-white"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Haqqında / Təsvir *</label>
                <textarea
                  required
                  name="description"
                  rows={3}
                  placeholder="Mağaza haqqında qısa məlumat, təklif etdiyi məhsullar..."
                  defaultValue={editingStore?.description || ''}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-red-500 focus:bg-white"
                />
              </div>

              {/* Premium Toggle */}
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <input
                  type="checkbox"
                  id="isPremium"
                  name="isPremium"
                  defaultChecked={editingStore?.isPremium || false}
                  className="w-5 h-5 accent-red-600 rounded cursor-pointer"
                />
                <label htmlFor="isPremium" className="text-xs font-bold text-slate-800 cursor-pointer">
                  Premium / Seçilmiş Brend kimi qeyd et (Əsas səhifədə önə çəkilir)
                </label>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Ləğv et
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-red-600/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Saxlanılır...' : editingStore ? 'Yadda Saxla' : 'Mağazanı Yarat'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
