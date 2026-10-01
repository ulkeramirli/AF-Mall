'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, MapPin, X, ShoppingBag, MoreHorizontal, Menu, Home, Ticket, Map, Briefcase, Building } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useTranslation } from '@/lib/i18n'
import { motion, AnimatePresence } from 'framer-motion'


export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  const { lang, setLang } = useLanguage()
  const t = useTranslation(lang).nav


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  const changeLang = (newLang: string) => {
    setLang(newLang as 'AZ' | 'EN' | 'RU')
  }

  const headerClass = scrolled 
    ? 'bg-white shadow-lg fixed top-0 w-full z-50' 
    : 'bg-white/80 backdrop-blur-md absolute top-0 w-full z-50'

  const textColor = 'text-slate-900'

  return (
    <>
      <header className={`${headerClass} transition-all duration-300 h-16 md:h-20 flex items-center`}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <div className="shrink-0 z-50">
            <Link href="/" className="flex items-center gap-3 group">
            {/* Elegant Icon */}
            <div className="relative w-10 h-10 md:w-11 md:h-11 flex items-center justify-center shrink-0">
              <div className="absolute inset-0 bg-red-600 rotate-45 rounded-lg group-hover:rotate-90 transition-transform duration-500 ease-out shadow-lg shadow-red-600/30"></div>
              <div className="absolute inset-0 border border-red-400/50 rotate-45 rounded-lg scale-110 group-hover:rotate-90 transition-transform duration-700 ease-out"></div>
              <span className="relative z-10 text-white font-black text-lg md:text-xl tracking-tighter">AF</span>
            </div>
            {/* Typography */}
            <div className="flex flex-col justify-center">
              <span className={`font-black text-xl md:text-2xl leading-none tracking-tight uppercase ${isMobileMenuOpen ? 'text-slate-900' : textColor}`}>MALL</span>
            </div>
          </Link>
          </div>

          {/* Desktop Links (Center) */}
          <div className={`hidden lg:flex items-center gap-4 xl:gap-6 font-semibold ${textColor} text-sm xl:text-base whitespace-nowrap`}>
            <Link href="/" className="hover:text-red-600 transition-colors">{t.home}</Link>
            <Link href="/stores" className="hover:text-red-600 transition-colors">{t.storesAndRestaurants}</Link>
            {/* <Link href="/stores?category=2" className="hover:text-red-600 transition-colors">{t.entertainment}</Link> */}
            <Link href="/map" className="hover:text-red-600 transition-colors">{t.map}</Link>
            <Link href="/services" className="hover:text-red-600 transition-colors">{t.services || 'Xidmətlər'}</Link>
            <Link href="/leasing" className="hover:text-red-600 transition-colors flex items-center gap-1.5">
              {t.leasing || 'İcarə'}
            </Link>
            <Link href="/vacancies" className="hover:text-red-600 transition-colors flex items-center gap-1.5">
              {t.vacancies || 'Vakansiyalar'}
            </Link>
          </div>

          {/* Desktop Actions (Right) */}
          <div className={`hidden lg:flex items-center gap-6 text-sm font-semibold ${textColor}`}>
            <Link href="/search" className="flex items-center gap-2 hover:text-red-600 transition-colors">
              <Search className="w-5 h-5" />
            </Link>
            <Link href="/how-to-get" className="flex items-center gap-2 hover:text-red-600 transition-colors">
              <MapPin className="w-5 h-5" /> {t.howToGet}
            </Link>
            
            {/* Custom Language Dropdown */}
            <div className="relative" onMouseLeave={() => setIsLangDropdownOpen(false)}>
              <div 
                className="flex items-center gap-2 hover:text-red-600 transition-colors cursor-pointer border-l border-slate-200 pl-6 ml-2 py-4 -my-4"
                onMouseEnter={() => setIsLangDropdownOpen(true)}
              >
                 <Image 
                   src={`https://flagcdn.com/${lang === 'AZ' ? 'az' : lang === 'EN' ? 'gb' : 'ru'}.svg`} 
                   alt={lang}
                   width={20}
                   height={14}
                   unoptimized
                   className="w-5 h-3.5 object-cover rounded-xs shadow-[0_0_2px_rgba(0,0,0,0.2)]" 
                 />
                 <span className="font-bold">{lang}</span>
              </div>
              
              {/* Invisible bridge to prevent mouse leave */}
              <div className={`absolute top-full right-0 w-full h-4 ${isLangDropdownOpen ? 'block' : 'hidden'}`}></div>

              <div className={`absolute top-[calc(100%+0.5rem)] right-0 bg-white border border-slate-100 shadow-xl rounded-xl overflow-hidden min-w-35 flex flex-col z-50 transition-all duration-200 origin-top-right ${isLangDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                {[
                  { code: 'AZ', flag: 'az', label: 'Azərbaycan' }, 
                  { code: 'EN', flag: 'gb', label: 'English' }, 
                  { code: 'RU', flag: 'ru', label: 'Русский' }
                ].map(l => (
                  <button
                    key={l.code}
                    onClick={() => {
                      changeLang(l.code)
                      setIsLangDropdownOpen(false)
                    }}
                    className={`px-4 py-3 text-sm font-bold text-left transition-colors flex items-center justify-between group ${lang === l.code ? 'text-red-600 bg-red-50/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Image 
                        src={`https://flagcdn.com/${l.flag}.svg`} 
                        alt={l.code}
                        width={20}
                        height={14}
                        unoptimized
                        className="w-5 h-3.5 object-cover rounded-xs shadow-[0_0_2px_rgba(0,0,0,0.2)]" 
                      />
                      <span>{l.code}</span>
                    </span>
                    {lang === l.code && <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Actions (Language + Hamburger) */}
          <div className="flex lg:hidden items-center gap-2 z-50">
            {/* Mobile Language Switcher */}
            <div className="relative">
               <button 
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)} 
                  className={`flex items-center gap-2 p-2 font-bold ${isMobileMenuOpen ? 'text-slate-900' : textColor}`}
               >
                  <Image 
                    src={`https://flagcdn.com/${lang === 'AZ' ? 'az' : lang === 'EN' ? 'gb' : 'ru'}.svg`} 
                    alt={lang}
                    width={20}
                    height={14}
                    unoptimized
                    className="w-5 h-3.5 object-cover rounded-xs shadow-[0_0_2px_rgba(0,0,0,0.2)]" 
                  />
                  {lang}
               </button>
               {/* Dropdown for mobile */}
               <div className={`absolute top-[calc(100%+0.5rem)] right-0 bg-white border border-slate-100 shadow-xl rounded-xl overflow-hidden min-w-35 flex flex-col z-50 transition-all duration-200 origin-top-right ${isLangDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                 {[
                   { code: 'AZ', flag: 'az' }, 
                   { code: 'EN', flag: 'gb' }, 
                   { code: 'RU', flag: 'ru' }
                 ].map(l => (
                   <button
                     key={l.code}
                     onClick={() => {
                       changeLang(l.code);
                       setIsLangDropdownOpen(false);
                     }}
                     className={`px-4 py-3 text-sm font-bold text-left transition-colors flex items-center justify-between group ${lang === l.code ? 'text-red-600 bg-red-50/50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
                   >
                     <span className="flex items-center gap-2.5">
                       <Image 
                         src={`https://flagcdn.com/${l.flag}.svg`} 
                         alt={l.code}
                         width={20}
                         height={14}
                         unoptimized
                         className="w-5 h-3.5 object-cover rounded-xs shadow-[0_0_2px_rgba(0,0,0,0.2)]" 
                       />
                       <span>{l.code}</span>
                     </span>
                     {lang === l.code && <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>}
                   </button>
                 ))}
               </div>
            </div>

            <button 
              className={`flex items-center justify-center p-2 focus:outline-none transition-transform`}
              onClick={toggleMenu}
            >
              <div className={`w-10 h-10 flex items-center justify-center transition-colors ${isMobileMenuOpen ? 'text-slate-900' : textColor}`}>
                {isMobileMenuOpen ? (
                  <X className="w-8 h-8" />
                ) : (
                  <Menu className="w-8 h-8" />
                )}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Moved OUTSIDE header to avoid stacking context issues */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-white z-45 flex flex-col pt-24 px-6 pb-8 overflow-y-auto"
          >
            {/* Search Bar in Mobile Menu */}
            <div className="relative mb-8 mt-4">
              <input 
                type="text" 
                placeholder={`${t.search}...`}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 pl-11 outline-none focus:border-red-600 transition-colors"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            </div>

            {/* Links */}
            <div className="flex flex-col text-xl font-medium text-slate-800 divide-y divide-slate-100">
              {[
                { href: '/', label: t.home, icon: Home },
                { href: '/stores', label: t.storesAndRestaurants, icon: ShoppingBag },
                { href: '/stores?category=2', label: t.entertainment, icon: Ticket },
                { href: '/map', label: t.map, icon: Map },
                { href: '/services', label: t.services || 'Xidmətlər', icon: MoreHorizontal },
                { href: '/how-to-get', label: t.howToGet, icon: MapPin },
                { href: '/leasing', label: t.leasing || 'İcarə', icon: Building },
                { href: '/vacancies', label: t.vacancies || 'Vakansiyalar', icon: Briefcase }
              ].map((link, i) => {
                const Icon = link.icon;
                return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link href={link.href} onClick={toggleMenu} className="flex items-center gap-4 py-4 hover:text-red-600 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-red-50 flex items-center justify-center shrink-0 transition-colors">
                      <Icon className="w-5 h-5 text-slate-500 group-hover:text-red-600 transition-colors" />
                    </div>
                    <span>{link.label}</span>
                  </Link>
                </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
