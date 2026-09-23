'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, MapIcon, Sparkles, Coffee, ArrowRight } from 'lucide-react'
import { events, stores as allStores, categories } from '@/lib/mockData'
import { useLanguage } from '@/context/LanguageContext'
import { useTranslation } from '@/lib/i18n'
import { useWeather } from '@/hooks/useWeather'

export default function Home() {
  const { lang } = useLanguage()
  const translation = useTranslation(lang)
  const t = translation.home
  const nav = translation.nav

  const { weather } = useWeather()

  const recentEvents = events.slice(0, 2)
  const featuredBrands = allStores.slice(0, 6).map(store => ({
    ...store,
    category: categories.find(c => c.id === store.categoryId)
  }))

  const getGradient = () => {
    switch (weather) {
      case 'sunny': return 'from-blue-400 via-blue-200 to-slate-50';
      case 'rainy': return 'from-slate-600 via-slate-400 to-slate-300';
      case 'snowy': return 'from-slate-300 via-slate-200 to-slate-100';
      case 'cloudy':
      default: return 'from-[#cce0ff] via-[#eaf2ff] to-slate-50';
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      
      {/* 1. AF MALL HERO - IMMERSIVE FULL-SCREEN UI (Deniz Mall Style - Soft Light Theme) */}
      <section className="relative pt-28 md:pt-32 pb-16 w-full overflow-hidden min-h-[90vh] flex bg-slate-50">
        
        {/* Full-Screen Parallax Clouds Background */}
        <div className={`absolute inset-0 z-0 overflow-hidden bg-linear-to-b ${getGradient()} transition-colors duration-1000`}>
          
          {weather === 'sunny' && (
            <div className="absolute top-10 right-20 w-48 h-48 bg-yellow-300 rounded-full blur-[60px] opacity-70 pointer-events-none"></div>
          )}

          {/* Cloud Layer 1 - Far background, slow, large */}
          <div className={`absolute top-0 left-0 w-[200%] h-[70%] flex animate-[slide_90s_linear_infinite] pointer-events-none transition-opacity duration-1000 ${weather === 'sunny' ? 'opacity-30' : 'opacity-60'}`}>
            <div className="w-1/2 h-full relative" style={{ WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 50%, transparent 100%)', maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 50%, transparent 100%)' }}>
              <Image src="/clouds.png" alt="clouds" fill className="object-cover object-center" priority />
            </div>
            <div className="w-1/2 h-full relative" style={{ WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 50%, transparent 100%)', maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 50%, transparent 100%)' }}>
              <Image src="/clouds.png" alt="clouds" fill className="object-cover object-center" priority />
            </div>
          </div>

          {/* Cloud Layer 2 - Midground, slightly faster, lowered */}
          <div className={`absolute top-[30%] left-0 w-[200%] h-[60%] flex animate-[slide_60s_linear_infinite] pointer-events-none transition-opacity duration-1000 ${weather === 'sunny' ? 'opacity-40' : 'opacity-80'}`} style={{ animationDelay: '-30s' }}>
            <div className="w-1/2 h-full relative" style={{ WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 50%, transparent 100%)', maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 50%, transparent 100%)' }}>
              <Image src="/clouds.png" alt="clouds" fill className="object-cover object-center" priority />
            </div>
            <div className="w-1/2 h-full relative" style={{ WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 50%, transparent 100%)', maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 50%, transparent 100%)' }}>
              <Image src="/clouds.png" alt="clouds" fill className="object-cover object-center" priority />
            </div>
          </div>

          {weather === 'rainy' && (
            <div className="absolute inset-0 pointer-events-none animate-rain opacity-70 z-10"></div>
          )}
          {weather === 'snowy' && (
            <div className="absolute inset-0 pointer-events-none animate-snow opacity-90 z-10"></div>
          )}

          {/* Soft gradient overlay to make text readable on the left */}
          <div className="absolute inset-0 bg-linear-to-r from-slate-50/95 via-slate-50/60 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-linear-to-t from-slate-50 via-transparent to-transparent bottom-0 z-10"></div>
        </div>
        
        <div className="w-[90vw] mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 h-full">
          
          {/* Left Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-20 pt-10 lg:pt-0">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 font-bold text-xs mb-6 lg:mb-8 uppercase tracking-widest shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              {t.bakuAzerbaijan}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight text-slate-900 font-black mb-4 lg:mb-6 tracking-tight">
              {t.heroTitle}
            </h1>
            
            <p className="text-base md:text-lg lg:text-xl text-slate-500 font-medium max-w-xl mb-8 lg:mb-10 leading-relaxed">
              {t.heroSubtitle}
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link href="/stores" className="w-full sm:w-auto flex items-center justify-between sm:justify-center gap-3 bg-red-600 hover:bg-red-700 text-white px-6 py-3.5 rounded-xl md:rounded-full font-bold text-base transition-all shadow-lg shadow-red-600/20 group">
                <span>{nav.storesAndRestaurants || 'Mağazalar'}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <Link href="/map" className="w-full sm:w-auto flex items-center justify-between sm:justify-center gap-3 bg-white hover:bg-slate-50 text-slate-900 px-6 py-3.5 rounded-xl md:rounded-full font-bold text-base transition-all border border-slate-200 shadow-sm">
                <span>{nav.map || 'Xəritə'}</span>
                <MapIcon className="w-5 h-5 text-red-600" />
              </Link>
            </div>
            
            {/* Statistics / Trust Indicators */}
            <div className="flex items-center justify-between lg:justify-start gap-2 sm:gap-6 md:gap-10 mt-10 lg:mt-12 p-5 lg:p-0 lg:pt-6 lg:border-t border-white/50 lg:border-slate-200/60 w-full lg:w-[80%] relative z-30 bg-white/60 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none rounded-3xl lg:rounded-none shadow-xl lg:shadow-none border lg:border-none">
               <div className="text-center lg:text-left">
                  <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter drop-shadow-sm">100+</p>
                  <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{t.store}</p>
               </div>
               <div className="w-px h-8 bg-slate-200/50"></div>
               <div className="text-center lg:text-left">
                  <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter drop-shadow-sm">20+</p>
                  <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{t.restaurant}</p>
               </div>
               <div className="w-px h-8 bg-slate-200/50"></div>
               <div className="text-center lg:text-left">
                  <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter drop-shadow-sm">Premium</p>
                  <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{t.premiumService?.split(' ')[1] || 'XİDMƏT'}</p>
               </div>
            </div>
          </div>
          
          {/* Right Image Container - Floating Style */}
          <div className="w-full lg:w-1/2 relative h-50 sm:h-75 lg:h-[80vh] -mt-2 md:-mt-8 lg:mt-0 lg:-ml-12 z-10 flex items-end justify-center lg:justify-end pointer-events-none">
             {/* Main Building Image (Foreground, floating over clouds) */}
             <div className="relative w-full h-full lg:w-[130%] lg:h-[110%] lg:-mr-20 scale-[1.45] lg:scale-110 origin-bottom">
               <Image 
                 src="/af-mall.png" 
                 alt="AF Mall Architecture" 
                 fill
                 className="object-contain object-bottom drop-shadow-2xl hover:scale-105 transition-transform duration-2000 ease-out pointer-events-auto"
                 priority
               />
             </div>
          </div>

        </div>
      </section>

      {/* 2. OUR UNIQUE HIGHLIGHT (IZUMINKA) */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:w-1/2 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-bold tracking-wider uppercase">{t.exclusiveTo}</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                {t.infinityCascade} <span className="text-red-600">{t.cascade}</span>
              </h2>
              
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                {t.cascadeDesc}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 transition-colors hover:border-red-100 hover:bg-red-50/50">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 text-red-500">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{t.arPhotoSpots}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{t.arPhotoSpotsDesc}</p>
                </div>
                
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 transition-colors hover:border-blue-100 hover:bg-blue-50/50">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 text-blue-500">
                    <Coffee className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{t.waterShows}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{t.waterShowsDesc}</p>
                </div>
              </div>
              
              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <Link href="/stores" className="inline-flex items-center justify-center bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-red-600 transition-colors shadow-lg shadow-slate-900/20">
                  {t.viewSchedule}
                </Link>
                
                <div className="flex items-center gap-4 px-6 py-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">{t.mallHours}</p>
                    <p className="font-black text-slate-900 text-lg">08:00 - 22:00</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Images (Bento Grid) */}
            <div className="lg:w-1/2 w-full grid grid-cols-2 grid-rows-2 gap-3 md:gap-4 h-100 md:h-125 lg:h-150">
              <div className="col-span-2 md:col-span-1 row-span-1 md:row-span-2 relative rounded-3xl overflow-hidden group shadow-xl">
                <Image 
                  src="https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?w=800&q=80" 
                  alt="Shopping Atrium" 
                  fill
                  style={{ objectFit: 'cover' }}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                   <p className="text-white font-bold text-xl mb-1">{t.mainAtrium}</p>
                   <p className="text-white/80 text-sm font-medium">{t.level1}</p>
                </div>
              </div>
              <div className="col-span-1 row-span-1 relative rounded-3xl overflow-hidden group shadow-md">
                <Image 
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80" 
                  alt="Dining Experience" 
                  fill
                  style={{ objectFit: 'cover' }}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="col-span-1 row-span-1 relative rounded-3xl overflow-hidden group shadow-md">
                <Image 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" 
                  alt="Premium Shopping" 
                  fill
                  style={{ objectFit: 'cover' }}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. PREMIUM BRANDS CAROUSEL/GRID */}
      <section className="container mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 max-w-6xl mx-auto gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.worldClassBrands}</h2>
            <p className="text-slate-600 max-w-xl">{t.worldClassDesc}</p>
          </div>
          <Link href="/stores" className="inline-flex items-center gap-2 font-bold text-red-600 hover:text-red-700 transition-colors">
            {t.viewAllBrands} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 max-w-6xl mx-auto">
          {featuredBrands.map((store) => (
            <Link href={`/stores/${store.id}`} key={store.id} className="group relative rounded-2xl overflow-hidden block">
              <div className="aspect-4/5 bg-slate-100 overflow-hidden relative">
                {store.image ? (
                  <Image src={store.image} alt={store.name} fill style={{ objectFit: 'cover' }} className="object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                   <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400 font-bold text-4xl">{store.name[0]}</div>
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 transform translate-y-2 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="bg-white/20 backdrop-blur-md w-10 h-10 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-2 md:mb-4 border border-white/30 shadow-lg overflow-hidden relative">
                   {store.logo ? (
                     <Image src={store.logo} alt={`${store.name} logo`} fill style={{ objectFit: 'contain' }} className="object-contain filter brightness-0 invert p-1 md:p-2" />
                   ) : (
                     <span className="text-white font-bold text-lg md:text-xl">{store.name[0]}</span>
                   )}
                </div>
                <h4 className="font-bold text-lg md:text-2xl text-white mb-1 md:mb-2">{store.name}</h4>
                <p className="text-[10px] md:text-sm text-slate-300 font-medium truncate">{t.floor} {store.floor} • {(translation.categories as Record<string, string>)[store.categoryId] || store.category?.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>



      {/* 5. NEWS & EVENTS */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t.whatsHappening}</h2>
              <p className="text-slate-600 max-w-xl">{t.whatsHappeningDesc}</p>
            </div>
            <Link href="/events" className="inline-flex items-center gap-2 font-bold text-red-600 hover:text-red-700 transition-colors">
              {t.allEvents} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentEvents.map(event => (
               <Link href={`/events/${event.id}`} key={event.id} className="group flex flex-col md:flex-row gap-6 bg-white rounded-2xl p-4 border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="w-full md:w-2/5 aspect-4/3 rounded-xl overflow-hidden shrink-0 relative">
                    {event.image ? (
                      <Image src={event.image} alt={event.title} fill style={{ objectFit: 'cover' }} className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-slate-100"></div>
                    )}
                  </div>
                  <div className="py-4 pr-4 flex flex-col justify-center">
                    <time className="text-sm font-bold text-red-600 mb-2 uppercase tracking-wide">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </time>
                    <h4 className="font-bold text-2xl text-slate-900 mb-3 group-hover:text-red-600 transition-colors">{event.title}</h4>
                    <p className="text-slate-600 text-sm line-clamp-2">{t.eventDesc}</p>
                  </div>
               </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
