'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Tag, Plus, Search, Edit3, Trash2, X, Store, ArrowRight } from 'lucide-react'
import { addCategory, updateCategory, deleteCategory } from '@/lib/actions'
import { Category, Store as StoreType } from '@/types'

export function CategoriesManager({
  initialCategories,
  stores
}: {
  initialCategories: Category[];
  stores: StoreType[];
}) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Store counts per category
  const storeCounts: Record<string, number> = {}
  stores.forEach(s => {
    storeCounts[s.categoryId] = (storeCounts[s.categoryId] || 0) + 1
  })

  const filtered = initialCategories.filter(cat =>
    cat.name.toLowerCase().includes(search.toLowerCase()) ||
    cat.slug.toLowerCase().includes(search.toLowerCase())
  )

  const handleOpenAdd = () => {
    setEditingCategory(null)
    setError(null)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (cat: Category) => {
    setEditingCategory(cat)
    setError(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (cat: Category) => {
    const count = storeCounts[cat.id] || 0
    if (count > 0) {
      if (!confirm(`Bu kateqoriyaya (${cat.name}) aid ${count} mağaza var! Silmək istədiyinizdən tam əminsiniz?`)) {
        return
      }
    } else {
      if (!confirm(`"${cat.name}" kateqoriyasını silmək istəyirsiniz?`)) return
    }

    try {
      await deleteCategory(cat.id)
      router.refresh()
    } catch (err: any) {
      alert('Silinmə zamanı xəta: ' + (err.message || 'Error'))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)
      if (editingCategory) {
        formData.set('id', editingCategory.id)
        await updateCategory(formData)
      } else {
        await addCategory(formData)
      }
      setIsModalOpen(false)
      setEditingCategory(null)
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
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
              Bölmələr
            </span>
            <span className="text-xs text-slate-400 font-medium">Toplam {initialCategories.length} kateqoriya</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Mall Kateqoriyaları</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Mağazaların qruplaşdırıldığı bütün kateqoriyaları tənzimləyin.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-lg transition-all hover:scale-[1.02] cursor-pointer shrink-0"
        >
          <Plus className="w-5 h-5 text-emerald-400" /> Yeni Kateqoriya
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Kateqoriya adı və ya slug axtar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:border-red-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(cat => {
          const count = storeCounts[cat.id] || 0
          return (
            <div 
              key={cat.id} 
              className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center font-bold">
                    <Tag className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(cat)}
                      className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
                      title="Redaktə et"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                      title="Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-700 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-0.5">slug: /{cat.slug}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 text-slate-600 font-semibold">
                  <Store className="w-3.5 h-3.5 text-slate-400" />
                  {count} Mağaza bağlıdır
                </span>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                  ID: #{cat.id}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-lg font-black text-slate-900">
                {editingCategory ? 'Kateqoriyanı Dəyiş' : 'Yeni Kateqoriya'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl"
              >
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
                <label className="text-xs font-bold text-slate-700 uppercase">Kateqoriya Adı *</label>
                <input
                  required
                  name="name"
                  placeholder="Məs: Restoranlar və Kafeler"
                  defaultValue={editingCategory?.name || ''}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Slug / Link URL (İngiliscə)</label>
                <input
                  name="slug"
                  placeholder="dining, fashion, electronics"
                  defaultValue={editingCategory?.slug || ''}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-emerald-500 focus:bg-white"
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
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-all disabled:opacity-50"
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
