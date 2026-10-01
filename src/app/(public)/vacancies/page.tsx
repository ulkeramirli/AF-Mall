'use client'

import { Briefcase, MapPin, Clock, ChevronRight, ArrowRight, Building2, Calendar, X, Check } from 'lucide-react'
import { vacancies } from '@/lib/mockData'
import { useLanguage } from '@/context/LanguageContext'
import { useTranslation } from '@/lib/i18n'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function VacanciesPage() {
  const { lang } = useLanguage()
  const t = useTranslation(lang).vacanciesPage
  const tNav = useTranslation(lang).nav

  const activeVacancies = vacancies.filter(v => v.status === 'Active');

  const [selectedVacancy, setSelectedVacancy] = useState<typeof activeVacancies[0] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setSelectedVacancy(null);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      {/* Premium Corporate Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-900 flex items-center justify-center min-h-[400px]">
        {/* Background architectural image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=2400&q=85" 
            alt="Careers Background"
            fill
            className="object-cover opacity-30 mix-blend-luminosity"
            priority
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent" />
        </div>

        {/* Floating red orbs for AF Mall branding */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-red-600/20 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] animate-[pulse_12s_ease-in-out_infinite_reverse]" />
        
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white mb-8"
          >
            <Link href="/" className="hover:text-red-400 transition-colors">{tNav.home}</Link>
            <ChevronRight className="w-3 h-3 text-white/50" />
            <span className="text-red-400">{t.title}</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-tight"
          >
            {t.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            {t.desc}
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-6 lg:px-8 max-w-5xl mt-12 md:mt-20">
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 pb-4 border-b border-slate-200 gap-4">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            {t.title}
          </h2>
          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center justify-center gap-2 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-sm text-slate-600 font-bold uppercase tracking-wider">
              <span className="text-slate-900">{activeVacancies.length}</span> Active
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <AnimatePresence>
            {activeVacancies.map((vacancy, index) => (
              <motion.div 
                key={vacancy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="group bg-white rounded-2xl border border-slate-200 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-2xl hover:shadow-slate-200/50 hover:border-slate-300 transition-all duration-300"
              >
                 <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg border border-red-100">
                        {vacancy.type}
                      </span>
                      <span className="text-[10px] sm:text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {t.posted}: {new Date(vacancy.postedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 group-hover:text-red-600 transition-colors leading-tight">
                      {vacancy.position}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-sm text-slate-500 font-medium">
                       <span className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-slate-400" /> 
                          {vacancy.storeName}
                       </span>
                       <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-slate-400" /> 
                          AF Mall
                       </span>
                       <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-slate-400" /> 
                          {vacancy.type}
                       </span>
                    </div>
                 </div>
                 
                 <button 
                   onClick={() => setSelectedVacancy(vacancy)}
                   className="shrink-0 group/btn relative overflow-hidden bg-slate-900 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-600 transition-all duration-300 shadow-lg shadow-slate-900/20 hover:shadow-red-600/30 w-full md:w-auto"
                 >
                   <span className="relative z-10">{t.applyNow}</span>
                   <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                 </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {activeVacancies.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40"
            >
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">{t.noVacancies}</h3>
            </motion.div>
          )}
        </div>
      </div>

      {/* Application Modal */}
      <AnimatePresence>
        {selectedVacancy && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setSelectedVacancy(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 md:p-8">
                <button 
                  onClick={() => !isSubmitting && setSelectedVacancy(null)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <h3 className="text-2xl font-black text-slate-900 mb-2">{t.applyNow}</h3>
                <p className="text-slate-500 mb-6 font-medium">
                  <span className="text-red-600 font-bold">{selectedVacancy.position}</span> (AF Mall)
                </p>

                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Göndərildi! / Submitted!</h4>
                    <p className="text-slate-500">Tezliklə sizinlə əlaqə saxlanılacaq.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Ad və Soyad / Full Name</label>
                      <input required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none transition-all" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Telefon / Phone</label>
                      <input required type="tel" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none transition-all" placeholder="+994" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">CV Link (LinkedIn, Drive, vb.)</label>
                      <input type="url" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none transition-all" placeholder="https://" />
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full mt-4 bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-red-600/30 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <span>Göndər / Submit</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
