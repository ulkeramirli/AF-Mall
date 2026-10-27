'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Search, ChevronRight, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useTranslation } from '@/lib/i18n'
import { Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMallData } from '@/hooks/useMallData'

function StoresContent() {
  const searchParams = useSearchParams()
  const categoryId = searchParams.get('category')
  const q = searchParams.get('q')

  const { lang } = useLanguage()
  const t = useTranslation(lang)
  const { stores: allStores, categories } = useMallData()

  let filteredStores = allStores;

  if (categoryId) {
    filteredStores = filteredStores.filter(s => s.categoryId === categoryId);
  }

  if (q) {
    filteredStores = filteredStores.filter(s => s.name.toLowerCase().includes(q.toLowerCase()));
  }

  const storesWithCategories = filteredStores.map(store => ({
    ...store,
    category: categories.find(c => c.id === store.categoryId)
  }));

  const activeCategory = categoryId ? (t.categories as Record<string, string>)[categoryId] : t.stores.directory;

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      {/* Premium Glassmorphism Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden flex items-center justify-center min-h-[350px]">
        {/* Abstract Architectural Background */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1519567241046-7f4f0fee3ac1?w=2400&q=85"
            alt="Mall Architecture"
            fill
            className="object-cover opacity-60"
            priority
          />
          {/* Intense Frosted Glass Overlay */}
          <div className="absolute inset-0 bg-white/60 backdrop-blur-3xl" />
          {/* Gradients for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-slate-50" />
        </div>

        {/* Dynamic Color Orbs for subtle ambient light */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-400/10 rounded-full blur-[120px] mix-blend-multiply animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-rose-200/20 rounded-full blur-[150px] mix-blend-multiply animate-[pulse_12s_ease-in-out_infinite_reverse]" />
        
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            
            {/* Elegant Breadcrumb */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-slate-500 mb-8 md:mb-10"
            >
              <Link href="/" className="hover:text-red-600 transition-colors">{t.nav.home}</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-900">{t.stores.brands}</span>
            </motion.div>
            
            {/* Striking Typography */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-4 leading-tight"
            >
              {activeCategory}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8 md:mb-10 font-medium"
            >
              {t.stores.heroDesc}
            </motion.p>
            
            {/* Massive Premium Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full max-w-2xl mx-auto"
            >
              <form action="/stores" method="GET" className="relative group">
                {categoryId && <input type="hidden" name="category" value={categoryId} />}
                
                {/* Ambient Glow on Focus */}
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 via-rose-400/20 to-red-500/20 rounded-full blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
                
                <div className="relative w-full flex items-center bg-white/90 backdrop-blur-2xl border border-white shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] hover:shadow-[0_16px_60px_-12px_rgba(0,0,0,0.1)] rounded-full overflow-hidden transition-all duration-500">
                  <div className="pl-6 md:pl-8 pr-3 flex items-center justify-center">
                    <Search className="w-5 h-5 md:w-6 md:h-6 text-slate-400 group-focus-within:text-red-500 transition-colors duration-300" />
                  </div>
                  <input 
                    type="text" 
                    name="q"
                    placeholder={t.stores.searchBrands}
                    className="w-full pl-2 pr-32 md:pr-40 py-3.5 md:py-4 bg-transparent text-slate-900 placeholder:text-slate-400 font-semibold text-sm md:text-base outline-none"
                    defaultValue={q || ''}
                  />
                  <div className="absolute right-1.5 md:right-2 top-1.5 md:top-2 bottom-1.5 md:bottom-2">
                    <button type="submit" className="h-full px-6 md:px-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm hover:bg-red-600 transition-colors shadow-md hover:shadow-xl hover:-translate-y-[1px] active:translate-y-0">
                       <span className="hidden sm:block mr-2">Axtarış</span>
                       <ArrowRight className="w-4 h-4 md:w-5 md:h-5 sm:hidden" />
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modern Tabs */}
      <div className="sticky top-[64px] md:top-[80px] z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm transition-all py-4">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] relative">
            {/* Fade edges for scroll indication */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10 md:hidden" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
            
            <div 
              className="flex items-center gap-3 overflow-x-auto pb-1 -mb-1 [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <Link 
                href="/stores"
                className={`relative whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shrink-0 border ${
                  !categoryId 
                    ? 'text-white border-transparent shadow-lg shadow-red-600/30' 
                    : 'text-slate-600 hover:text-slate-900 bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm'
                }`}
              >
                {!categoryId && (
                  <motion.div layoutId="activeTab2" className="absolute inset-0 bg-red-600 rounded-full" style={{ zIndex: -1 }} />
                )}
                {t.stores.allBrands}
              </Link>
              {categories.map(c => (
                <Link 
                  key={c.id}
                  href={`/stores?category=${c.id}`}
                  className={`relative whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shrink-0 border ${
                    categoryId === c.id 
                      ? 'text-white border-transparent shadow-lg shadow-red-600/30' 
                      : 'text-slate-600 hover:text-slate-900 bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm'
                  }`}
                >
                  {categoryId === c.id && (
                    <motion.div layoutId="activeTab2" className="absolute inset-0 bg-red-600 rounded-full" style={{ zIndex: -1 }} />
                  )}
                  {(t.categories as Record<string, string>)[c.id] || c.name}
                </Link>
              ))}
            </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] mt-10 md:mt-12">
        
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            {q ? `${t.stores.resultsFor} "${q}"` : t.stores.discover}
          </h2>
          <div className="text-sm text-slate-500 font-medium">
            <span className="text-slate-900 font-bold">{storesWithCategories.length}</span> {t.stores.brandsCount}
          </div>
        </div>

        {/* 4-Column Professional Grid (2 on mobile) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <AnimatePresence>
            {storesWithCategories.map((store, index) => (
                <motion.div
                  key={store.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ delay: index * 0.02, duration: 0.3 }}
                  className="group col-span-1 h-full"
                >
                  <Link 
                    href={`/stores/${store.id}`} 
                    className="flex flex-col h-full bg-white rounded-xl md:rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Image Header */}
                    <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-slate-100 border-b border-slate-100">
                      {store.image ? (
                        <Image 
                          src={store.image} 
                          alt={store.name} 
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                          <span className="text-slate-300 font-bold text-3xl md:text-4xl">{store.name[0]}</span>
                        </div>
                      )}
                      
                      {/* Category Badge */}
                      <div className="absolute top-2 left-2 md:top-3 md:left-3">
                        <span className="px-2 py-1 md:px-3 md:py-1 bg-white/90 backdrop-blur-sm text-slate-900 text-[9px] md:text-[10px] font-bold uppercase tracking-wider rounded-md shadow-sm">
                          {(t.categories as Record<string, string>)[store.categoryId] || store.category?.name}
                        </span>
                      </div>
                    </div>

                    {/* Details Section */}
                    <div className="flex-1 p-4 md:p-5 relative flex flex-col justify-between">
                      
                      {/* Logo Overlap */}
                      {store.logo && (
                        <div className="absolute -top-7 right-3 md:-top-10 md:right-4 w-14 h-14 md:w-16 md:h-16 bg-white rounded-xl md:rounded-xl p-1.5 md:p-1.5 shadow-md border border-slate-100 z-10 group-hover:shadow-lg transition-shadow">
                          <div className="relative w-full h-full rounded-lg overflow-hidden">
                            <Image 
                              src={store.logo} 
                              alt={`${store.name} logo`} 
                              fill 
                              className="object-contain" 
                            />
                          </div>
                        </div>
                      )}

                      <div>
                        <h3 className="font-bold text-slate-900 text-base md:text-xl mb-1.5 group-hover:text-red-600 transition-colors pr-14 md:pr-14 truncate">
                          {store.name}
                        </h3>
                        <p className="text-slate-500 text-xs md:text-sm line-clamp-3 mb-3 md:mb-4 leading-snug">
                          {(store.slug && (t.storeDescriptions as Record<string, string>)?.[store.slug]) || store.description || t.storeDetails.genericDesc.replace('{floor}', store.floor)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 md:pt-4 mt-auto border-t border-slate-100">
                         <div className="flex items-center gap-1.5 md:gap-1.5 text-slate-500 md:text-slate-600 text-xs font-semibold">
                           <MapPin className="w-3.5 h-3.5 md:w-3.5 md:h-3.5 text-red-500" />
                           <span className="truncate">L{store.floor}</span>
                           <span className="mx-0.5 md:mx-1">•</span>
                           <span className="truncate">Z: {store.location || 'A'}</span>
                         </div>
                         <ArrowRight className="hidden md:block w-4 h-4 text-slate-300 group-hover:text-red-600 transition-colors group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {storesWithCategories.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl border border-slate-200"
          >
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.stores.noBrandsFound}</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-8 font-medium">
              {t.stores.noBrandsDesc}
            </p>
            <Link 
              href="/stores" 
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-full transition-colors shadow-sm"
            >
              {t.stores.clearFilters}
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default function StoresPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50"></div>}>
      <StoresContent />
    </Suspense>
  )
}
