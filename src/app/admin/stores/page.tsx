'use client'

import { useState } from 'react'
import { stores, categories } from '@/lib/mockData'
import { addStore, deleteStore } from '@/lib/actions'
import { Store, Plus, Trash2 } from 'lucide-react'

export default function AdminStores() {
  const [isAdding, setIsAdding] = useState(false)

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Manage Stores</h1>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg shadow-red-600/20 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add New Store
        </button>
      </div>

      {isAdding && (
        <form action={async (formData) => {
          await addStore(formData)
          setIsAdding(false)
          window.location.reload() // Force reload to fetch new JSON if needed
        }} className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Add Store</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required name="name" placeholder="Store Name" className="border border-slate-200 rounded-xl px-4 py-3" />
            <select required name="categoryId" className="border border-slate-200 rounded-xl px-4 py-3 bg-white">
              <option value="">Select Category</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input required name="floor" placeholder="Floor (e.g. 1)" className="border border-slate-200 rounded-xl px-4 py-3" />
            <input required name="location" placeholder="Location (e.g. 1A)" className="border border-slate-200 rounded-xl px-4 py-3" />
            <input name="logo" placeholder="Logo URL (optional)" className="border border-slate-200 rounded-xl px-4 py-3" />
            <input name="image" placeholder="Image URL (optional)" className="border border-slate-200 rounded-xl px-4 py-3" />
          </div>
          <textarea required name="description" placeholder="Description" className="border border-slate-200 rounded-xl px-4 py-3 min-h-[100px]" />
          
          <div className="flex justify-end gap-4 mt-4">
            <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-3 text-slate-500 font-bold hover:text-slate-900 transition-colors">Cancel</button>
            <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-bold transition-colors">Save Store</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wider border-b border-slate-100">
              <th className="p-6 font-bold">Store</th>
              <th className="p-6 font-bold">Category</th>
              <th className="p-6 font-bold">Floor/Loc</th>
              <th className="p-6 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {stores.map(store => {
              const cat = categories.find(c => c.id === store.categoryId)
              return (
                <tr key={store.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6 font-bold text-slate-900">{store.name}</td>
                  <td className="p-6 text-slate-500">{cat?.name}</td>
                  <td className="p-6 text-slate-500">{store.floor} / {store.location}</td>
                  <td className="p-6 text-right">
                    <button 
                      onClick={async () => {
                        if(confirm('Are you sure?')) {
                          await deleteStore(store.id)
                          window.location.reload()
                        }
                      }} 
                      className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
