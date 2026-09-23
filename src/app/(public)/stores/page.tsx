'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Search, ChevronRight, ArrowRight } from 'lucide-react'
import { stores as allStores, categories } from '@/lib/mockData'
import { useLanguage } from '@/context/LanguageContext'
import { useTranslation } from '@/lib/i18n'
import { Suspense } from 'react'

function StoresContent() {
  const searchParams = useSearchParams()
  const categoryId = searchParams.get('category')
  const q = searchParams.get('q')

  const { lang } = useLanguage()
  const t = useTranslation(lang)

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
    <div className="bg-[#fafafa] min-h-screen pb-32 font-sans selection:bg-black selection:text-white">
      {/* Hero Section */}
      <section className="relative h-[45vh] min-h-100 flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=2400&q=85" 
            alt="Mall Directory" 
            fill
            className="object-cover opacity-40 scale-105 animate-[pulse_20s_ease-in-out_infinite]"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#fafafa] via-black/20 to-black/60" />
        </div>
        
        <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto mt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-xs text-white/80 uppercase tracking-widest font-medium mb-6">
            <Link href="/" className="hover:text-white transition-colors">{t.nav.home}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{t.stores.brands}</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight drop-shadow-sm">
            {activeCategory}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            {t.stores.heroDesc}
          </p>
        </div>
      </section>

      {/* Navigation & Filters */}
      <div className="sticky top-[64px] md:top-[80px] z-30 bg-white/90 backdrop-blur-2xl border-b border-black/5 shadow-sm transition-all">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-4 gap-3 md:gap-4">
            
            {/* Search Form */}
            <form action="/stores" method="GET" className="relative w-full md:w-80 group">
              {categoryId && <input type="hidden" name="category" value={categoryId} />}
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black transition-colors" />
              <input 
                type="text" 
                name="q"
                placeholder={t.stores.searchBrands}
                className="w-full pl-10 pr-4 py-2 md:py-2.5 bg-gray-100/50 border border-gray-200 rounded-full text-sm outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-gray-400"
                defaultValue={q || ''}
              />
            </form>

            {/* Categories */}
            <div 
              className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <Link 
                href="/stores"
                className={`whitespace-nowrap px-4 py-1.5 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                  !categoryId 
                    ? 'bg-black text-white shadow-md' 
                    : 'bg-transparent text-gray-500 hover:text-black hover:bg-gray-100'
                }`}
              >
                {t.stores.allBrands}
              </Link>
              {categories.map(c => (
                <Link 
                  key={c.id}
                  href={`/stores?category=${c.id}`}
                  className={`whitespace-nowrap px-4 py-1.5 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                    categoryId === c.id 
                      ? 'bg-black text-white shadow-md' 
                      : 'bg-transparent text-gray-500 hover:text-black hover:bg-gray-100'
                  }`}
                >
                  {(t.categories as Record<string, string>)[c.id] || c.name}
                </Link>
              ))}
            </div>
            
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl mt-12 md:mt-20">
        
        <div className="flex justify-between items-end mb-10 border-b border-black/10 pb-4">
          <h2 className="text-2xl font-light text-black">
            {q ? `${t.stores.resultsFor} "${q}"` : t.stores.discover}
          </h2>
          <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">
            <span className="text-black font-bold">{storesWithCategories.length}</span> {t.stores.brandsCount}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {storesWithCategories.map((store) => (
            <Link 
              href={`/stores/${store.id}`} 
              key={store.id} 
              className="group flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-gray-100 mb-6 shadow-sm">
                {store.image ? (
                  <Image 
                    src={store.image} 
                    alt={store.name} 
                    fill
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-300 font-light text-6xl">{store.name[0]}</span>
                  </div>
                )}
                
                {/* Overlay & Hover Action */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-sm">
                  <ArrowRight className="w-4 h-4 text-black" />
                </div>

                {/* Category Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-1.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold rounded-full uppercase tracking-widest">
                    {(t.categories as Record<string, string>)[store.categoryId] || store.category?.name}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex items-start justify-between gap-4 px-2">
                <div>
                  <h3 className="font-semibold text-2xl text-black mb-2 group-hover:text-gray-600 transition-colors">
                    {store.name}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5 font-medium">
                      <MapPin className="w-4 h-4" />
                      {t.stores.level} {store.floor} • {t.stores.zone} {store.location || 'A'}
                    </span>
                  </div>
                </div>
                
                {/* Logo */}
                {store.logo && (
                  <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center p-2.5 shrink-0 group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300">
                    <div className="relative w-full h-full">
                      <Image 
                        src={store.logo} 
                        alt={`${store.name} logo`} 
                        fill 
                        className="object-contain" 
                      />
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {storesWithCategories.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-24 h-24 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center mb-6">
              <Search className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-3xl font-light text-black mb-4">{t.stores.noBrandsFound}</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-10 font-light text-lg">
              {t.stores.noBrandsDesc}
            </p>
            <Link 
              href="/stores" 
              className="px-10 py-4 bg-black text-white text-sm font-bold tracking-widest uppercase rounded-full hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
            >
              {t.stores.clearFilters}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default function StoresPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fafafa]"></div>}>
      <StoresContent />
    </Suspense>
  )
}
