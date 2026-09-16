import { Briefcase, Plus, MoreHorizontal } from "lucide-react"
import { vacancies } from "@/lib/mockData"

export default function VacanciesAdminPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Vacancies</h1>
          <p className="text-slate-500">Manage job postings from mall tenants and management.</p>
        </div>
        <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-red-600 transition-colors shadow-lg">
          <Plus className="w-5 h-5" /> Add Vacancy
        </button>
      </div>
      
      <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="p-6 font-bold text-slate-400 text-sm uppercase tracking-wider">Position & Store</th>
                <th className="p-6 font-bold text-slate-400 text-sm uppercase tracking-wider">Type</th>
                <th className="p-6 font-bold text-slate-400 text-sm uppercase tracking-wider">Posted Date</th>
                <th className="p-6 font-bold text-slate-400 text-sm uppercase tracking-wider">Status</th>
                <th className="p-6 font-bold text-slate-400 text-sm uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vacancies.map((vacancy) => (
                <tr key={vacancy.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                        <Briefcase className="w-5 h-5 text-slate-500" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-lg">{vacancy.position}</p>
                        <p className="text-slate-500 text-sm">{vacancy.storeName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
                      {vacancy.type}
                    </span>
                  </td>
                  <td className="p-6 text-slate-600 font-medium">
                    {new Date(vacancy.postedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                      vacancy.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {vacancy.status}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors hover:bg-slate-100 rounded-lg">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
