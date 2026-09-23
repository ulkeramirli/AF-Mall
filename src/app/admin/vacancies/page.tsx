'use client'

import { useState } from 'react'
import { vacancies } from '@/lib/mockData'
import { addVacancy, deleteVacancy } from '@/lib/actions'
import { Briefcase, Plus, Trash2 } from 'lucide-react'

export default function AdminVacancies() {
  const [isAdding, setIsAdding] = useState(false)

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Manage Vacancies</h1>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg shadow-red-600/20 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Post Vacancy
        </button>
      </div>

      {isAdding && (
        <form action={async (formData) => {
          await addVacancy(formData)
          setIsAdding(false)
          window.location.reload()
        }} className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">New Vacancy</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input required name="storeName" placeholder="Store or Company Name" className="border border-slate-200 rounded-xl px-4 py-3" />
            <input required name="position" placeholder="Position (e.g. Sales Assistant)" className="border border-slate-200 rounded-xl px-4 py-3" />
            <select required name="type" className="border border-slate-200 rounded-xl px-4 py-3 bg-white">
              <option value="">Select Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Shift">Shift</option>
            </select>
          </div>
          
          <div className="flex justify-end gap-4 mt-4">
            <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-3 text-slate-500 font-bold hover:text-slate-900 transition-colors">Cancel</button>
            <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-bold transition-colors">Post Vacancy</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase text-xs tracking-wider border-b border-slate-100">
              <th className="p-6 font-bold">Position</th>
              <th className="p-6 font-bold">Company</th>
              <th className="p-6 font-bold">Type</th>
              <th className="p-6 font-bold">Posted</th>
              <th className="p-6 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {vacancies.map(vac => (
              <tr key={vac.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-6 font-bold text-slate-900">{vac.position}</td>
                <td className="p-6 text-slate-500">{vac.storeName}</td>
                <td className="p-6 text-slate-500">
                  <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-600">{vac.type}</span>
                </td>
                <td className="p-6 text-slate-500">{vac.postedDate}</td>
                <td className="p-6 text-right">
                  <button 
                    onClick={async () => {
                      if(confirm('Are you sure?')) {
                        await deleteVacancy(vac.id)
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
