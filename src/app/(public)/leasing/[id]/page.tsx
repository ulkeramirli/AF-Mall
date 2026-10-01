'use client'

import { use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, MapPin, Maximize, Tag, Building, Phone, Mail, Check, Send } from 'lucide-react'
import { premises } from '@/lib/mockData'
import { useLanguage } from '@/context/LanguageContext'
import { useTranslation } from '@/lib/i18n'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function PremiseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const premise = premises.find(p => p.id === resolvedParams.id)
  
  const { lang } = useLanguage()
  const t = useTranslation(lang).leasingPage
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  if (!premise) {
    return notFound()
  }

  const isAz = lang === 'AZ';
  const isRu = lang === 'RU';

  const uiText = {
    available: isAz ? 'Mövcuddur' : isRu ? 'Доступно' : 'Available',
    callUs: isAz ? 'Bizə zəng edin' : isRu ? 'Позвоните нам' : 'Call us',
    emailUs: isAz ? 'Bizə yazın' : isRu ? 'Напишите нам' : 'Email us',
    name: isAz ? 'Adınız' : isRu ? 'Ваше имя' : 'Your Name',
    phoneLabel: isAz ? 'Telefon' : isRu ? 'Телефон' : 'Phone',
    sent: isAz ? 'Göndərildi' : isRu ? 'Отправлено' : 'Sent',
    unit: isAz ? 'Obyekt' : isRu ? 'Объект' : 'Unit',
    back: isAz ? 'Geri qayıt' : isRu ? 'Назад' : 'Back to list',
    details: isAz ? 'Məlumat' : isRu ? 'Детали' : 'Details',
    gallery: isAz ? 'Qalereya' : isRu ? 'Галерея' : 'Gallery',
    requestInfo: isAz ? 'Məlumat Sorğusu' : isRu ? 'Запросить информацию' : 'Request Info',
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

  const images = (premise as any).images || []

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="container mx-auto px-6 md:px-12 py-12 max-w-6xl">
        
        {/* Top bar with back button */}
        <div className="mb-8">
          <Link href="/leasing" className="inline-flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" />
            {uiText.back}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-4xl md:text-5xl font-black text-slate-900">{uiText.unit} {premise.id}</h1>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${premise.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {premise.status === 'Available' ? uiText.available : premise.status}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-lg font-medium text-slate-600">
                <span className="flex items-center gap-2"><MapPin className="w-5 h-5 text-red-500" /> {t.floor} {premise.floor}</span>
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                <span className="flex items-center gap-2"><Tag className="w-5 h-5 text-red-500" /> {premise.type}</span>
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                <span className="flex items-center gap-2"><Maximize className="w-5 h-5 text-red-500" /> {premise.area}</span>
              </div>
            </div>

            {/* Main Image */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm relative aspect-video">
              {images.length > 0 ? (
                <img src={images[0]} alt={`Unit ${premise.id}`} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                   <Building className="w-20 h-20 opacity-50" />
                </div>
              )}
            </div>

            {/* Gallery Grid */}
            {images.length > 1 && (
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">{uiText.gallery}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {images.slice(1).map((img, idx) => (
                    <div key={idx} className="rounded-2xl overflow-hidden border border-slate-200 aspect-video hover:opacity-90 cursor-pointer transition-opacity">
                      <img src={img} alt={`Gallery ${idx+1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Details Section */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
               <h3 className="text-2xl font-bold text-slate-900 mb-6">{uiText.details}</h3>
               <p className="text-slate-600 leading-relaxed mb-6">
                 {isAz ? 'Bu geniş və müasir obyekt şəhərin mərkəzində yerləşən AF Mall-da biznesinizi inkişaf etdirmək üçün ideal fürsətdir. Yüksək piyada axını və premium xidmətlərlə əhatə olunmuşdur.' : 
                  isRu ? 'Это просторное и современное помещение в центре города в AF Mall — идеальная возможность для развития вашего бизнеса. Высокая проходимость и премиальные услуги.' : 
                  'This spacious and modern premise in the centrally located AF Mall is the ideal opportunity to grow your business. High foot traffic and surrounded by premium services.'}
               </p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-red-500 shadow-sm">
                       <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">Location</p>
                      <p className="font-bold text-slate-900">Floor {premise.floor}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-red-500 shadow-sm">
                       <Maximize className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">Total Area</p>
                      <p className="font-bold text-slate-900">{premise.area}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-red-500 shadow-sm">
                       <Tag className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">Property Type</p>
                      <p className="font-bold text-slate-900">{premise.type}</p>
                    </div>
                 </div>
               </div>
            </div>

          </div>

          {/* Sidebar (Right) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              
              {/* Pricing Card */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg shadow-slate-200/40 text-center">
                 <p className="text-slate-500 font-medium mb-2">Monthly Rent</p>
                 <div className="text-4xl font-black text-slate-900 mb-6">{premise.price}</div>
                 <hr className="border-slate-100 mb-6" />
                 <div className="flex items-center justify-center gap-2 text-slate-600 text-sm">
                    <Check className="w-4 h-4 text-green-500" /> Maintenance included
                 </div>
              </div>

              {/* Contact Card */}
              <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl shadow-slate-900/10">
                 <h3 className="text-xl font-bold mb-6">{uiText.requestInfo}</h3>
                 
                 <div className="space-y-4 mb-6">
                   <div className="flex items-center gap-3 text-slate-300">
                     <Phone className="w-5 h-5 text-red-400" />
                     <span className="font-medium">{t.phone}</span>
                   </div>
                   <div className="flex items-center gap-3 text-slate-300">
                     <Mail className="w-5 h-5 text-red-400" />
                     <span className="font-medium">{t.email}</span>
                   </div>
                 </div>

                 <hr className="border-white/10 mb-6" />

                 <form onSubmit={handleContactSubmit} className="space-y-4">
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
