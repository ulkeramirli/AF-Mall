'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, MapPin, X, Globe, ShoppingBag, Coffee, MoreHorizontal, Menu } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useTranslation } from '@/lib/i18n'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  
  const { lang, setLang } = useLanguage()
  const t = useTranslation(lang).nav

  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  const changeLang = (newLang: string) => {
    setLang(newLang as any)
  }

  const headerClass = scrolled 
    ? 'bg-white shadow-lg fixed top-0 w-full z-50' 
    : 'bg-white/80 backdrop-blur-md absolute top-0 w-full z-50'

  const textColor = 'text-slate-900'

  return (
    <header className={`${headerClass} transition-all duration-300 h-16 md:h-20 flex items-center`}>
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0 z-50">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-black text-3xl md:text-4xl tracking-tighter">
               <span className="text-red-600">AF</span>
               <span className={`font-light ${textColor}`}>mall</span>
            </span>
          </Link>
        </div>

        {/* Desktop Links (Center) */}
        <div className={`hidden lg:flex items-center gap-8 font-semibold ${textColor} text-base`}>
          <Link href="/stores" className="hover:text-red-600 transition-colors">{t.storesAndRestaurants}</Link>
          <Link href="/stores?category=2" className="hover:text-red-600 transition-colors">{t.entertainment}</Link>
          <Link href="/map" className="hover:text-red-600 transition-colors">{t.map}</Link>
          <Link href="/services" className="hover:text-red-600 transition-colors">{t.services || 'Xidmətlər'}</Link>
        </div>

        {/* Desktop Actions (Right) */}
        <div className={`hidden lg:flex items-center gap-6 text-sm font-semibold ${textColor}`}>
          <Link href="/search" className="flex items-center gap-2 hover:text-red-600 transition-colors">
            <Search className="w-5 h-5" />
          </Link>
          <Link href="/how-to-get" className="flex items-center gap-2 hover:text-red-600 transition-colors">
            <MapPin className="w-5 h-5" /> {t.howToGet}
          </Link>
          <div className="flex items-center gap-1 hover:opacity-70 transition-opacity cursor-pointer border-l border-current pl-6 ml-2">
             <Globe className="w-4 h-4" /> 
             <select 
               className={`bg-transparent border-none outline-none cursor-pointer appearance-none font-bold ${textColor}`}
               value={lang}
               onChange={(e) => changeLang(e.target.value)}
             >
               <option value="AZ" className="text-black">AZ</option>
               <option value="EN" className="text-black">EN</option>
               <option value="RU" className="text-black">RU</option>
             </select>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className={`lg:hidden z-50 flex items-center justify-center p-2 focus:outline-none transition-transform`}
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

      {/* Mobile Menu Overlay - Clean & Elegant */}
      <div 
        className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        } flex flex-col pt-20 px-6 pb-8 overflow-y-auto`}
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
        <div className="flex flex-col text-2xl font-semibold text-slate-800 divide-y divide-slate-100">
          <Link href="/" onClick={toggleMenu} className="py-5 hover:text-red-600 transition-colors">{t.home}</Link>
          <Link href="/stores" onClick={toggleMenu} className="py-5 hover:text-red-600 transition-colors">{t.storesAndRestaurants}</Link>
          <Link href="/stores?category=2" onClick={toggleMenu} className="py-5 hover:text-red-600 transition-colors">{t.entertainment}</Link>
          <Link href="/map" onClick={toggleMenu} className="py-5 hover:text-red-600 transition-colors">{t.map}</Link>
          <Link href="/services" onClick={toggleMenu} className="py-5 hover:text-red-600 transition-colors">{t.services || 'Xidmətlər'}</Link>
          <Link href="/how-to-get" onClick={toggleMenu} className="py-5 hover:text-red-600 transition-colors">{t.howToGet}</Link>
        </div>

        {/* Footer of Mobile Menu */}
        <div className="mt-auto pt-8 flex flex-col gap-6">
          <div>
            <p className="text-xs text-slate-400 mb-3 uppercase tracking-widest font-bold">{t.languageSelection}</p>
            <div className="flex gap-3">
              {['AZ', 'EN', 'RU'].map(l => (
                <button 
                  key={l}
                  onClick={() => {
                    changeLang(l)
                    toggleMenu()
                  }}
                  className={`px-5 py-2 rounded-lg font-bold text-sm border transition-all ${
                    lang === l 
                      ? 'bg-red-600 text-white border-red-600' 
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
