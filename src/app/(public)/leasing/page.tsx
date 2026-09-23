'use client'

import { Building, ArrowRight, CheckCircle2 } from 'lucide-react'
import { premises } from '@/lib/mockData'
import { useLanguage } from '@/context/LanguageContext'
import { useTranslation } from '@/lib/i18n'

export default function LeasingPage() {
  const { lang } = useLanguage()
  const t = useTranslation(lang).leasingPage

  const availablePremises = premises.filter(p => p.status === 'Available');

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Section */}
      <div className="bg-slate-900 py-24 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-red-600/10 mix-blend-overlay" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <Building className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">{t.title}</h1>
          <p className="text-xl text-slate-300">{t.desc}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 border border-slate-200">
               <h3 className="text-2xl font-bold text-slate-900 mb-4">{t.whyUs}</h3>
               <ul className="space-y-4">
                 <li className="flex items-start gap-3">
                   <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                   <span className="text-slate-600 text-sm leading-relaxed">{t.why1}</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                   <span className="text-slate-600 text-sm leading-relaxed">{t.why2}</span>
                 </li>
                 <li className="flex items-start gap-3">
                   <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                   <span className="text-slate-600 text-sm leading-relaxed">{t.why3}</span>
                 </li>
               </ul>
            </div>

            <div className="bg-red-600 p-8 text-white">
               <h3 className="text-2xl font-bold mb-4">{t.contactInfo}</h3>
               <p className="mb-2">{t.phone}</p>
               <p className="mb-6">{t.email}</p>
               <button className="bg-white text-red-600 font-bold w-full py-3 hover:bg-slate-100 transition-colors">
                 {t.sendMessage}
               </button>
            </div>
          </div>

          {/* Right Column: Available Premises */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">{t.availablePremises}</h2>
            
            <div className="space-y-6">
              {availablePremises.map((premise) => (
                <div key={premise.id} className="bg-white border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:shadow-lg transition-shadow">
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                         <Building className="w-8 h-8" />
                      </div>
                      <div>
                         <h4 className="text-xl font-bold text-slate-900 mb-1">Unit {premise.id}</h4>
                         <p className="text-sm font-medium text-slate-500">
                            {t.floor} {premise.floor} &bull; {premise.type} &bull; {premise.area}
                         </p>
                      </div>
                   </div>
                   
                   <div className="flex flex-col items-end gap-3 border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-6">
                      <span className="text-lg font-black text-slate-900">{premise.price}</span>
                      <button className="text-sm font-bold text-red-600 flex items-center gap-1 hover:text-red-700 transition-colors">
                        {t.inquire} <ArrowRight className="w-4 h-4" />
                      </button>
                   </div>
                </div>
              ))}

              {availablePremises.length === 0 && (
                <div className="text-center py-20 bg-white border border-slate-200">
                  <p className="text-slate-500">{t.noPremises}</p>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
