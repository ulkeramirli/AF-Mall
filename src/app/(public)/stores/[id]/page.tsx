'use client'

import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { MapPin, ChevronRight, Clock, Phone, Globe, Share2 } from "lucide-react"
import { stores as allStores, categories } from "@/lib/mockData"
import React from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { useTranslation } from '@/lib/i18n'

type Props = {
  params: Promise<{ id: string }>
}

export default function StorePage({ params }: Props) {
  const resolvedParams = React.use(params)
  const store = allStores.find(s => s.id === resolvedParams.id);
  
  if (!store) {
    notFound()
  }
  
  const { lang } = useLanguage()
  const t = useTranslation(lang)

  const categoryName = (t.categories as Record<string, string>)[store.categoryId] || categories.find(c => c.id === store.categoryId)?.name;

  return (
    <div className="bg-slate-50 min-h-screen pb-32 font-sans">
      
      {/* Hero Image Header */}
      <div className="relative w-full h-[50vh] min-h-100 bg-slate-900">
        {store.image ? (
          <Image 
            src={store.image} 
            alt={store.name} 
            fill 
            className="object-cover opacity-70"
            priority 
          />
        ) : (
          <div className="w-full h-full bg-linear-to-r from-slate-800 to-slate-900"></div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full px-5 py-6 md:p-16">
          <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
              {/* Logo Box */}
              <div className="w-24 h-24 md:w-48 md:h-48 shrink-0 bg-white rounded-2xl md:rounded-3xl shadow-2xl flex items-center justify-center p-3 overflow-hidden relative border-4 border-white/20 backdrop-blur-md">
                {store.logo ? (
                  <Image src={store.logo} alt={`${store.name} logo`} fill className="object-contain p-3 md:p-4" />
                ) : (
                  <span className="text-4xl md:text-5xl font-black text-slate-300">{store.name[0]}</span>
                )}
              </div>
              
              <div className="pb-0 md:pb-4">
                <div className="flex flex-wrap items-center gap-1.5 md:gap-2 text-[10px] md:text-sm text-slate-300 mb-2 md:mb-3 tracking-widest uppercase font-semibold">
                  <Link href="/" className="hover:text-white transition-colors">{t.nav.home}</Link>
                  <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                  <Link href="/stores" className="hover:text-white transition-colors">{t.stores.brands}</Link>
                  <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-red-400 truncate max-w-[120px] md:max-w-none">{store.name}</span>
                </div>
                <h1 className="text-3xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-2">{store.name}</h1>
                <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-3 py-1 md:px-4 md:py-1 rounded-full text-xs md:text-sm font-bold shadow-inner">
                  {categoryName}
                </span>
              </div>
            </div>
            
            <div className="pb-0 md:pb-4 flex gap-3 md:gap-4 w-full md:w-auto">
               <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white flex items-center justify-center transition-all border border-white/10">
                 <Share2 className="w-5 h-5" />
               </button>
               <Link href="/map" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-red-600/30 flex items-center gap-2">
                 <MapPin className="w-5 h-5" /> {t.storeDetails.viewOnMap}
               </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Details */}
          <div className="lg:w-2/3">
             <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
               <h2 className="text-2xl font-bold text-slate-900 mb-6">{t.storeDetails.about} {store.name}</h2>
               <p className="text-slate-600 leading-relaxed text-lg mb-8">
                 {(t.storeDescriptions as Record<string, string>)?.[store.slug] || store.description || t.storeDetails.genericDesc.replace('{floor}', store.floor)}
               </p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-100 pt-8">
                 <div className="rounded-2xl overflow-hidden aspect-video relative bg-slate-100">
                   <Image src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80" alt="Store interior 1" fill className="object-cover" />
                 </div>
                 <div className="rounded-2xl overflow-hidden aspect-video relative bg-slate-100">
                   <Image src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80" alt="Store interior 2" fill className="object-cover" />
                 </div>
               </div>
             </div>
          </div>
          
          {/* Right Column: Info Card */}
          <div className="lg:w-1/3">
             <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-32">
                <h3 className="font-bold text-slate-900 text-xl mb-6">{t.storeDetails.storeInfo}</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{t.storeDetails.location}</p>
                      <p className="text-slate-600">{t.stores.level} {store.floor}, {t.stores.zone} {store.location || 'A'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-slate-50 text-slate-700 rounded-full flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{t.storeDetails.openingHours}</p>
                      <p className="text-slate-600">08:00 - 22:00</p>
                      <p className="text-sm text-green-600 font-bold mt-1">{t.storeDetails.openNow}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-slate-50 text-slate-700 rounded-full flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{t.storeDetails.contact}</p>
                      <p className="text-slate-600">+994 12 345 67 89</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-slate-50 text-slate-700 rounded-full flex items-center justify-center shrink-0">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{t.storeDetails.website}</p>
                      <a href="#" className="text-blue-600 hover:underline">www.{store.slug}.com</a>
                    </div>
                  </div>
                </div>
             </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
