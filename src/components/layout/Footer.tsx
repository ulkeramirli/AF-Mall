'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useTranslation } from '@/lib/i18n'

export function Footer() {
  const { lang } = useLanguage()
  const t = useTranslation(lang).footer

  return (
    <footer className="bg-slate-900 text-slate-400 py-16 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-6 group">
            <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
              <div className="absolute inset-0 bg-red-600 rotate-45 rounded-lg group-hover:rotate-90 transition-transform duration-500 ease-out shadow-lg shadow-red-600/30"></div>
              <div className="absolute inset-0 border border-red-400/50 rotate-45 rounded-lg scale-110 group-hover:rotate-90 transition-transform duration-700 ease-out"></div>
              <span className="relative z-10 text-white font-black text-lg tracking-tighter">AF</span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-black text-xl leading-none tracking-tight uppercase text-white">MALL</span>
            </div>
          </div>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            {t.desc}
          </p>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/afmall_official/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-xl shadow-md shadow-pink-500/20 bg-linear-to-tr from-amber-400 via-pink-600 to-purple-600 hover:-translate-y-1 transition-transform group">
              <svg className="w-4.5 h-4.5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://www.facebook.com/afmall/?locale=az_AZ" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-xl shadow-md shadow-blue-500/20 bg-[#1877F2] hover:-translate-y-1 transition-transform group">
              <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.tiktok.com/@afmall" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-xl shadow-md shadow-black/30 bg-black hover:-translate-y-1 transition-transform group">
              <svg className="w-4.5 h-[18px] text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-1.13 4.39-2.9 5.61-1.77 1.22-4.08 1.57-6.17 1.01-2.09-.56-3.88-2.07-4.75-4.04-1.2-2.73-.55-6.09 1.63-8.13 1.83-1.7 4.54-2.28 6.79-1.41v4.06c-1.1-.38-2.39-.24-3.33.45-.94.69-1.46 1.84-1.39 3.01.07 1.17.75 2.25 1.77 2.82 1.02.57 2.3.61 3.35.1.13-.06.26-.13.38-.22.12-.09.24-.19.34-.3.1-.11.2-.23.28-.35.08-.12.16-.26.22-.4.06-.14.1-.28.14-.42.04-.14.07-.29.08-.44.01-.15.02-.3.02-.45-.01-5.69-.02-11.38 0-17.07z" clipRule="evenodd"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">{t.quickLinks}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/stores" className="hover:text-white transition-colors">{t.allStores}</Link></li>
            <li><Link href="/stores?category=2" className="hover:text-white transition-colors">{t.diningFood}</Link></li>
            <li><Link href="/events" className="hover:text-white transition-colors">{t.eventsOffers}</Link></li>
            <li><Link href="/map" className="hover:text-white transition-colors">{t.mallMap}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">{t.information}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/leasing" className="hover:text-white transition-colors">{t.leasingInquiries}</Link></li>
            <li><Link href="/how-to-get" className="hover:text-white transition-colors">{t.howToGetHere}</Link></li>
            <li><Link href="/vacancies" className="hover:text-white transition-colors">{t.careers}</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">{t.termsConditions}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">{t.contactUs}</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 shrink-0 text-red-500" />
              <span>123 Shopping Blvd, City Center, Baku, AZ1000</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 shrink-0 text-red-500" />
              <span>+994 12 345 67 89</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 shrink-0 text-red-500" />
              <span>info@afmall.az</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-sm text-center text-slate-500">
        © {new Date().getFullYear()} AF Mall. {t.rights}
      </div>
    </footer>
  )
}
