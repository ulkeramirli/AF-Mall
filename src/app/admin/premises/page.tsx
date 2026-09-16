import { Building, Plus, MoreHorizontal, CheckCircle, XCircle } from "lucide-react"
import { premises } from "@/lib/mockData"

export default function PremisesAdminPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Empty Premises</h1>
          <p className="text-slate-500">Manage available locations for rent and current tenant statuses.</p>
        </div>
        <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-red-600 transition-colors shadow-lg">
          <Plus className="w-5 h-5" /> Add Premise
        </button>
      </div>
      
      <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="p-6 font-bold text-slate-400 text-sm uppercase tracking-wider">Unit & Area</th>
                <th className="p-6 font-bold text-slate-400 text-sm uppercase tracking-wider">Floor & Type</th>
                <th className="p-6 font-bold text-slate-400 text-sm uppercase tracking-wider">Price (Est.)</th>
                <th className="p-6 font-bold text-slate-400 text-sm uppercase tracking-wider">Status</th>
                <th className="p-6 font-bold text-slate-400 text-sm uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {premises.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${p.status === 'Available' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                        <Building className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-lg">Unit {p.id}</p>
                        <p className="text-slate-500 text-sm">{p.area}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <p className="font-bold text-slate-900">Floor {p.floor}</p>
                    <p className="text-slate-500 text-sm">{p.type}</p>
                  </td>
                  <td className="p-6 text-slate-900 font-bold">
                    {p.price}
                  </td>
                  <td className="p-6">
                    {p.status === 'Available' ? (
                      <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg w-fit border border-blue-100">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Available</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg w-fit border border-slate-200">
                        <XCircle className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Rented ({p.tenant})</span>
                      </div>
                    )}
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
