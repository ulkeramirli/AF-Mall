'use client'
import Link from 'next/link'
import Image from 'next/image'

import { useState } from 'react'
import { Building, ArrowRight, MapPin, Maximize, Tag, Phone, Mail, Send, Check, Star, TrendingUp, ShieldCheck } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useTranslation } from '@/lib/i18n'
import { motion } from 'framer-motion'
import { useMallData } from '@/hooks/useMallData'

export default function LeasingPage() {
  const { lang } = useLanguage()
  const t = useTranslation(lang).leasingPage
  const { premises } = useMallData()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const availablePremises = premises.filter(p => p.status === 'Available');

  const isAz = lang === 'AZ';
  const isRu = lang === 'RU';

  const uiText = {
    available: isAz ? 'Mövcuddur' : isRu ? 'Доступно' : 'Available',
    callUs: isAz ? 'Bizə zəng edin' : isRu ? 'Позвоните нам' : 'Call us',
    emailUs: isAz ? 'Bizə yazın' : isRu ? 'Напишите нам' : 'Email us',
    name: isAz ? 'Adınız' : isRu ? 'Ваше имя' : 'Your Name',
    phoneLabel: isAz ? 'Telefon' : isRu ? 'Телефон' : 'Phone',
    sent: isAz ? 'Göndərildi' : isRu ? 'Отправлено' : 'Sent',
    unit: isAz ? 'Obyekt' : isRu ? 'Объект' : 'Unit'
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    }, 1000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } }
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero Section */}
      <div className="relative bg-slate-900 py-32 overflow-hidden">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-600 rounded-full blur-[128px]" />
          <div className="absolute top-20 -left-20 w-72 h-72 bg-blue-600 rounded-full blur-[128px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[32px_32px]" />
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-sm font-medium mb-8">
              <Building className="w-4 h-4 text-red-400" />
              <span>AF Mall Leasing</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light">
              {t.desc}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 mt-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Why Us Section */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-200/60"
            >
               <h2 className="text-3xl font-bold text-slate-900 mb-8">{t.whyUs}</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {[
                   { id: 1, text: t.why1, icon: Star },
                   { id: 2, text: t.why2, icon: TrendingUp },
                   { id: 3, text: t.why3, icon: ShieldCheck }
                 ].map((item) => {
                   const Icon = item.icon
                   return (
                     <div key={item.id} className="space-y-4">
                       <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
                         <Icon className="w-6 h-6" />
                       </div>
                       <p className="text-slate-600 font-medium leading-relaxed">{item.text}</p>
                     </div>
                   )
                 })}
               </div>
            </motion.section>

            {/* Available Premises */}
            <section>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <h2 className="text-3xl font-bold text-slate-900">{t.availablePremises}</h2>
                <div className="bg-slate-200 text-slate-700 px-4 py-1.5 rounded-full text-sm font-bold w-fit">
                  {availablePremises.length} {uiText.available}
                </div>
              </div>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {availablePremises.map((premise) => (
                  <Link href={`/leasing/${premise.id}`} key={premise.id} className="block">
                    <motion.div 
                      variants={itemVariants}
                      className="group bg-white rounded-2xl border border-slate-200/60 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:shadow-xl hover:shadow-slate-200/50 hover:border-red-200 transition-all duration-300"
                    >
                       <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full sm:w-auto">
                          <div className="w-full sm:w-32 h-48 sm:h-24 bg-slate-100 rounded-xl overflow-hidden shrink-0 relative">
                             {premise.images && premise.images.length > 0 ? (
                               <Image src={premise.images[0]} alt={`Unit ${premise.id}`} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                             ) : (
                               <div className="w-full h-full flex items-center justify-center bg-slate-50 border border-slate-100 text-slate-400 group-hover:text-red-600 group-hover:bg-red-50 transition-colors duration-300">
                                 <Building className="w-8 h-8" />
                               </div>
                             )}
                             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                          </div>
                          <div>
                             <div className="flex items-center gap-3 mb-2">
                               <h4 className="text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors">{uiText.unit} {premise.id}</h4>
                               <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">{uiText.available}</span>
                             </div>
                             <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-500">
                                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-400" /> {t.floor} {premise.floor}</span>
                                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                <span className="flex items-center gap-1.5"><Tag className="w-4 h-4 text-slate-400" /> {premise.type}</span>
                                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                <span className="flex items-center gap-1.5"><Maximize className="w-4 h-4 text-slate-400" /> {premise.area}</span>
                             </div>
                          </div>
                       </div>
                       
                       <div className="flex flex-col items-start sm:items-end gap-3 border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-6 w-full sm:w-auto shrink-0">
                          <span className="text-xl font-black text-slate-900">{premise.price}</span>
                          <button className="w-full sm:w-auto text-sm font-bold text-white bg-slate-900 group-hover:bg-red-600 px-5 py-2.5 rounded-xl flex items-center justify-center sm:justify-start gap-2 transition-colors duration-300">
                            {t.inquire} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                       </div>
                    </motion.div>
                  </Link>
                ))}

                {availablePremises.length === 0 && (
                  <motion.div variants={itemVariants} className="text-center py-24 bg-white rounded-3xl border border-slate-200/60 border-dashed">
                    <Building className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-lg text-slate-500 font-medium">{t.noPremises}</p>
                  </motion.div>
                )}
              </motion.div>
            </section>
          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-8">
              
              {/* Contact Card */}
              <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl shadow-slate-900/10">
                 <h3 className="text-2xl font-bold mb-6">{t.contactInfo}</h3>
                 
                 <div className="space-y-6 mb-8">
                   <div className="flex items-center gap-4 text-slate-300">
                     <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                       <Phone className="w-5 h-5 text-red-400" />
                     </div>
                     <div>
                       <p className="text-sm text-slate-400 mb-0.5">{uiText.callUs}</p>
                       <p className="font-medium text-white">{t.phone}</p>
                     </div>
                   </div>
                   
                   <div className="flex items-center gap-4 text-slate-300">
                     <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                       <Mail className="w-5 h-5 text-red-400" />
                     </div>
                     <div>
                       <p className="text-sm text-slate-400 mb-0.5">{uiText.emailUs}</p>
                       <p className="font-medium text-white">{t.email}</p>
                     </div>
                   </div>
                 </div>

                 <hr className="border-white/10 mb-8" />

                 <form onSubmit={handleContactSubmit} className="space-y-4">
                   <h4 className="font-bold text-lg mb-4">{t.sendMessage}</h4>
                   <input 
                     type="text" 
                     placeholder={uiText.name}
                     required
                     className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-red-500 focus:bg-white/10 transition-colors"
                   />
                   <input 
                     type="tel" 
                     placeholder={uiText.phoneLabel}
                     required
                     className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:border-red-500 focus:bg-white/10 transition-colors"
                   />
                   <button 
                     type="submit" 
                     disabled={isSubmitting || submitted}
                     className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                   >
                     {isSubmitting ? (
                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                     ) : submitted ? (
                       <><Check className="w-5 h-5" /> {uiText.sent}</>
                     ) : (
                       <><Send className="w-5 h-5" /> {t.sendMessage}</>
                     )}
                   </button>
                 </form>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
