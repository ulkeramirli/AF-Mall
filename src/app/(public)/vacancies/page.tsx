'use client'

import { Briefcase, MapPin, Clock } from 'lucide-react'
import { vacancies } from '@/lib/mockData'
import { useLanguage } from '@/context/LanguageContext'
import { useTranslation } from '@/lib/i18n'

export default function VacanciesPage() {
  const { lang } = useLanguage()
  const t = useTranslation(lang).vacanciesPage

  const activeVacancies = vacancies.filter(v => v.status === 'Active');

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="bg-white py-16 border-b border-slate-200">
        <div className="container mx-auto px-4 text-center">
          <Briefcase className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-slate-900 mb-4">{t.title}</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">{t.desc}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 max-w-4xl">
        <div className="space-y-6">
          {activeVacancies.map((vacancy) => (
            <div key={vacancy.id} className="bg-white border border-slate-200 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-lg transition-shadow">
               <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{vacancy.position}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-medium">
                     <span className="flex items-center gap-1 text-red-600 font-bold">
                        <MapPin className="w-4 h-4" /> {vacancy.storeName}
                     </span>
                     <span className="flex items-center gap-1 border-l border-slate-300 pl-4">
                        <Clock className="w-4 h-4" /> {vacancy.type}
                     </span>
                     <span className="border-l border-slate-300 pl-4">
                        {t.posted}: {new Date(vacancy.postedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                     </span>
                  </div>
               </div>
               
               <button className="shrink-0 bg-slate-900 text-white px-8 py-3 font-bold hover:bg-red-600 transition-colors w-full md:w-auto">
                 {t.applyNow}
               </button>
            </div>
          ))}

          {activeVacancies.length === 0 && (
            <div className="text-center py-20 bg-white border border-slate-200">
              <p className="text-slate-500">{t.noVacancies}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
