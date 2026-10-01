'use client'

import { useState } from 'react'
import { premises } from '@/lib/mockData'
import { addPremise, deletePremise } from '@/lib/actions'
import { Building, Plus, Trash2 } from 'lucide-react'

export default function AdminPremises() {
  const [isAdding, setIsAdding] = useState(false)

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Manage Leasing & Offices</h1>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg shadow-red-600/20 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add Premise
        </button>
      </div>

      {isAdding && (
        <form action={async (formData) => {
          await addPremise(formData)
          setIsAdding(false)
          window.location.reload()
        }} className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">New Premise for Rent</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input required name="floor" placeholder="Floor (e.g. 1)" className="border border-slate-200 rounded-xl px-4 py-3" />
            <input required name="area" placeholder="Area (e.g. 120 sqm)" className="border border-slate-200 rounded-xl px-4 py-3" />
            <select required name="type" className="border border-slate-200 rounded-xl px-4 py-3 bg-white">
              <option value="">Select Type</option>
              <option value="Retail">Retail</option>
              <option value="Office">Office</option>
              <option value="Kiosk">Kiosk</option>
              <option value="Restaurant">Restaurant</option>
            </select>
            <input required name="price" placeholder="Price (e.g. $5,000/mo)" className="border border-slate-200 rounded-xl px-4 py-3" />
            <input name="images" placeholder="Image URLs (comma separated for gallery)" className="border border-slate-200 rounded-xl px-4 py-3 md:col-span-2 lg:col-span-4" />
          </div>
          
          <div className="flex justify-end gap-4 mt-4">
            <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-3 text-slate-500 font-bold hover:text-slate-900 transition-colors">Cancel</button>
            <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-bold transition-colors">Save Premise</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wider border-b border-slate-100">
              <th className="p-6 font-bold w-16">Photo</th>
              <th className="p-6 font-bold">ID</th>
              <th className="p-6 font-bold">Floor & Area</th>
              <th className="p-6 font-bold">Type</th>
              <th className="p-6 font-bold">Status & Price</th>
              <th className="p-6 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {premises.map((p: any) => (
              <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-6">
                  {p.images && p.images.length > 0 ? (
                    <img src={p.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover border border-slate-200" />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                      <Building className="w-6 h-6" />
                    </div>
                  )}
                </td>
                <td className="p-6 font-bold text-slate-900">{p.id}</td>
                <td className="p-6 text-slate-500">Floor {p.floor} • {p.area}</td>
                <td className="p-6 text-slate-500">{p.type}</td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold mr-3 ${p.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {p.status}
                  </span>
                  <span className="font-bold text-slate-900">{p.price}</span>
                </td>
                <td className="p-6 text-right">
                  <button 
                    onClick={async () => {
                      if(confirm('Are you sure?')) {
                        await deletePremise(p.id)
                        window.location.reload()
                      }
                    }} 
                    className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
