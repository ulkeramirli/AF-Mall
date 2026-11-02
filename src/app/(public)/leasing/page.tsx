'use client'

import {
  Building, ArrowRight, MapPin, Maximize, Tag, Phone, Mail, Send, Check, Star,
  TrendingUp, ShieldCheck, X, Users, MessageCircle, ChevronRight,
  Filter, CheckCircle, Clock
} from 'lucide-react'
import { useLanguage, Language } from '@/context/LanguageContext'
import { useTranslation } from '@/lib/i18n'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useMemo } from 'react'
import { useMallData } from '@/hooks/useMallData'
import { submitLeasingInquiry } from '@/lib/actions'
import { Premise } from '@/types'

const WHATSAPP_NUMBER = '994125550000'
const LEASING_PHONE_1 = '+994 12 555 00 00'
const LEASING_PHONE_2 = '+994 50 555 35 35'
const LEASING_EMAIL = 'leasing@afmall.az'

const FLOOR_COLORS: Record<string, string> = {
  '1': 'bg-red-50 text-red-700 border-red-100',
  '2': 'bg-blue-50 text-blue-700 border-blue-100',
  '3': 'bg-purple-50 text-purple-700 border-purple-100',
  '4': 'bg-amber-50 text-amber-700 border-amber-100',
}

function getStatusStyle(status: string) {
  if (status === 'Available') return 'bg-emerald-100 text-emerald-700 border-emerald-200'
  if (status === 'Rented') return 'bg-red-100 text-red-700 border-red-200'
  if (status === 'Reserved') return 'bg-amber-100 text-amber-700 border-amber-200'
  return 'bg-slate-100 text-slate-600 border-slate-200'
}

function InquiryModal({ premise, onClose, lang }: {
  premise: Premise | null
  onClose: () => void
  lang: Language
}) {
  const t = useTranslation(lang).leasingPage
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isAz = lang === 'AZ'
  const isRu = lang === 'RU'

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const fd = new FormData(e.currentTarget)
      if (premise?.id) fd.set('premiseId', premise.id)
      await submitLeasingInquiry(fd)
      setSuccess(true)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : (isAz ? 'Xəta baş verdi' : isRu ? 'Ошибка' : 'An error occurred')
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  const inputCls = 'w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none focus:bg-white transition-all text-sm placeholder:text-slate-400'
  const labelCls = 'block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider'

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Modal header */}
        <div className="bg-linear-to-br from-slate-900 to-slate-800 p-6 relative overflow-hidden shrink-0">
          <div className="absolute right-0 top-0 w-32 h-32 bg-red-600/10 rounded-full -translate-y-8 translate-x-8" />
          <div className="relative z-10">
            <button onClick={onClose} className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white">
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 mb-1">
              <Building className="w-5 h-5 text-red-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-red-400">AF Mall Leasing</span>
            </div>
            <h3 className="text-lg font-black text-white pr-8">{t.inquiryModalTitle}</h3>
            {premise && (
              <p className="text-slate-400 text-sm mt-1">
                {isAz ? 'Obyekt' : isRu ? 'Объект' : 'Unit'} <span className="text-white font-bold">{premise.id}</span> — {premise.area} / {premise.floor}{isAz ? '-ci mərtəbə' : isRu ? ' этаж' : 'F'}
              </p>
            )}
            <p className="text-xs text-slate-500 mt-1">{t.inquiryModalDesc}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {success ? (
            <div className="text-center py-12 px-8">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-emerald-600" />
              </div>
              <h4 className="text-xl font-black text-slate-900 mb-2">{t.inquirySuccessTitle}</h4>
              <p className="text-sm text-slate-500 mb-6">{t.inquirySuccessDesc}</p>
              <button onClick={onClose} className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold px-6 py-3 rounded-2xl hover:bg-red-600 transition-colors">
                <Check className="w-4 h-4" /> {isAz ? 'Bağla' : isRu ? 'Закрыть' : 'Close'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className={labelCls}>{t.companyBrand}</label>
                  <input required name="companyOrBrand" type="text" placeholder="Boutique Fragrance Baku" className={inputCls} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className={labelCls}>{t.fullName} *</label>
                  <input required name="fullName" type="text" placeholder="Ad Soyad" className={inputCls} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className={labelCls}>{t.phone} *</label>
                  <input required name="phone" type="tel" placeholder="+994 50..." className={inputCls} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className={labelCls}>{t.email}</label>
                  <input name="email" type="email" placeholder="leasing@brand.az" className={inputCls} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className={labelCls}>{t.activityType}</label>
                  <input name="activityType" type="text" placeholder="Retail / Restoran / Kiosk" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>{t.preferredArea}</label>
                  <input name="requiredArea" type="text" placeholder="80 - 120 m²" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>{t.budget}</label>
                  <input name="budget" type="text" placeholder="$3,000 - $4,000/ay" className={inputCls} />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>{t.notes}</label>
                  <textarea name="notes" rows={3} placeholder="..." className={inputCls + ' resize-none'} />
                </div>
              </div>

              {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors disabled:opacity-60 shadow-lg hover:shadow-red-600/30"
              >
                {submitting
                  ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{t.submitting}</>
                  : <><Send className="w-4 h-4" />{t.sendInquiry}</>
                }
              </button>

              <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
                <p className="text-xs text-center text-slate-400 font-medium">{isAz ? 'Birbaşa əlaqə' : isRu ? 'Прямой контакт' : 'Or contact directly'}</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(isAz ? 'Salam! İcarə şərtləri haqqında məlumat almaq istəyirəm.' : isRu ? 'Здравствуйте! Хочу узнать об условиях аренды.' : 'Hello! I would like to know about leasing.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold py-2.5 rounded-xl transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                  <a
                    href={`tel:${LEASING_PHONE_1.replace(/\s+/g, '')}`}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2.5 rounded-xl transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-red-500" /> {LEASING_PHONE_1}
                  </a>
                  <a
                    href={`tel:${LEASING_PHONE_2.replace(/\s+/g, '')}`}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2.5 rounded-xl transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" /> {LEASING_PHONE_2}
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default function LeasingPage() {
  const { lang } = useLanguage()
  const t = useTranslation(lang).leasingPage
  const tNav = useTranslation(lang).nav
  const { premises } = useMallData()

  const isAz = lang === 'AZ'
  const isRu = lang === 'RU'

  const [floorFilter, setFloorFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [selectedPremise, setSelectedPremise] = useState<Premise | null>(null)
  const [inquiryPremise, setInquiryPremise] = useState<Premise | null>(null)
  const [showInquiryModal, setShowInquiryModal] = useState(false)

  const availablePremises = premises.filter(p => p.status === 'Available')

  const floors = useMemo(() => Array.from(new Set(availablePremises.map(p => p.floor))).sort(), [availablePremises])
  const types = useMemo(() => Array.from(new Set(availablePremises.map(p => p.type))).sort(), [availablePremises])

  const filtered = useMemo(() => {
    return availablePremises.filter(p => {
      const matchFloor = floorFilter === 'all' || p.floor === floorFilter
      const matchType = typeFilter === 'all' || p.type === typeFilter
      return matchFloor && matchType
    })
  }, [availablePremises, floorFilter, typeFilter])

  function openInquiry(premise: Premise) {
    setInquiryPremise(premise)
    setShowInquiryModal(true)
  }
  function openGeneralInquiry() {
    setInquiryPremise(null)
    setShowInquiryModal(true)
  }

  const whatsappLeasing = encodeURIComponent(
    isAz ? 'Salam! AF Mall-da icarə imkanları haqqında məlumat almaq istəyirəm.'
      : isRu ? 'Здравствуйте! Хочу получить информацию об аренде в AF Mall.'
        : 'Hello! I would like to know about leasing opportunities at AF Mall.'
  )

  const WHY_US = [
    { icon: TrendingUp, text: t.why1, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' },
    { icon: ShieldCheck, text: t.why2, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
    { icon: Star, text: t.why3, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
  ]

  const STATS = [
    { label: t.statsTraffic, icon: Users },
    { label: t.statsOccupancy, icon: CheckCircle },
    { label: t.statsLocation, icon: MapPin },
    { label: t.statsStores, icon: Building },
  ]

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* HERO */}
      <div className="relative bg-slate-900 pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1519567770579-c2fc5836caef?w=2400&q=80"
            alt="AF Mall Leasing"
            fill
            className="object-cover opacity-15 mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/90 to-transparent" />
        </div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-red-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 -left-20 w-72 h-72 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[48px_48px] pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-white/60 mb-8">
              <Link href="/" className="hover:text-white transition-colors">{tNav.home}</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-red-400">{t.title}</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs font-bold mb-6">
              <Building className="w-4 h-4 text-red-400" />
              <span>AF Mall — Premium Commercial Spaces</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-3 tracking-tight leading-tight">
              {t.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl font-light mb-10 leading-relaxed">
              {t.subtitle}
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STATS.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                    className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl px-4 py-3 flex items-center gap-3"
                  >
                    <Icon className="w-5 h-5 text-red-400 shrink-0" />
                    <span className="text-xs font-bold text-slate-200 leading-tight">{stat.label}</span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* MAIN */}
      <div className="container mx-auto px-6 md:px-12 mt-16 pb-24 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* LEFT — Main content */}
          <div className="lg:col-span-8 space-y-14">

            {/* Why Us */}
            <section>
              <h2 className="text-3xl font-black text-slate-900 mb-8">{t.whyUs}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {WHY_US.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm"
                    >
                      <div className={`w-12 h-12 ${item.bg} ${item.color} border ${item.border} rounded-2xl flex items-center justify-center mb-4`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <p className="text-slate-700 font-medium leading-relaxed text-sm">{item.text}</p>
                    </motion.div>
                  )
                })}
              </div>
            </section>

            {/* Available Premises */}
            <section>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-3xl font-black text-slate-900">{t.availablePremises}</h2>
                  <p className="text-sm text-slate-500 mt-1">
                    <span className="font-bold text-slate-700">{availablePremises.length}</span> {t.availableUnitsCount}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-slate-500">{isAz ? 'Canlı məlumat' : isRu ? 'Актуально' : 'Live data'}</span>
                </div>
              </div>

              {/* Filters */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-6 flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <select
                    value={floorFilter}
                    onChange={e => setFloorFilter(e.target.value)}
                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                  >
                    <option value="all">{t.filterAllFloors}</option>
                    {floors.map(f => (
                      <option key={f} value={f}>{t.floor} {f}</option>
                    ))}
                  </select>
                </div>
                <select
                  value={typeFilter}
                  onChange={e => setTypeFilter(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                >
                  <option value="all">{t.filterAllTypes}</option>
                  {types.map(tp => (
                    <option key={tp} value={tp}>{tp}</option>
                  ))}
                </select>
                {(floorFilter !== 'all' || typeFilter !== 'all') && (
                  <button
                    onClick={() => { setFloorFilter('all'); setTypeFilter('all') }}
                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-slate-200"
                  >
                    <X className="w-3.5 h-3.5" />
                    {isAz ? 'Sıfırla' : isRu ? 'Сбросить' : 'Reset'}
                  </button>
                )}
              </div>

              {/* Cards */}
              <div className="space-y-4">
                {filtered.map((premise, idx) => (
                  <motion.div
                    key={premise.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    onClick={() => setSelectedPremise(selectedPremise?.id === premise.id ? null : premise)}
                    className={`bg-white rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                      selectedPremise?.id === premise.id
                        ? 'border-red-500 shadow-xl shadow-red-100/50 ring-2 ring-red-500/20'
                        : 'border-slate-200 hover:border-slate-300 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5">
                      {/* Image */}
                      <div className="w-full sm:w-28 h-36 sm:h-20 relative rounded-xl overflow-hidden shrink-0 bg-slate-100">
                        {premise.images && premise.images[0] ? (
                          <Image
                            src={premise.images[0]}
                            alt={`Unit ${premise.id}`}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Building className="w-8 h-8 text-slate-300" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h4 className="text-lg font-black text-slate-900">
                            {t.unit} {premise.id}
                          </h4>
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getStatusStyle(premise.status)}`}>
                            {premise.status === 'Available' ? t.available : premise.status === 'Rented' ? t.rented : t.reserved}
                          </span>
                          <span className={`text-xs font-bold px-2 py-1 rounded-lg border ${FLOOR_COLORS[premise.floor] || 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                            {t.floor} {premise.floor}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm font-medium text-slate-500">
                          <span className="flex items-center gap-1.5"><Tag className="w-4 h-4 text-slate-400" /> {premise.type}</span>
                          <span className="flex items-center gap-1.5"><Maximize className="w-4 h-4 text-slate-400" /> {premise.area}</span>
                          {premise.locationInMall && (
                            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-400" /> {premise.locationInMall}</span>
                          )}
                        </div>
                        {premise.description && (
                          <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">{premise.description}</p>
                        )}
                      </div>

                      {/* Price + CTA */}
                      <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 shrink-0 sm:border-l sm:border-slate-100 sm:pl-5">
                        <div className="text-right">
                          <p className="text-xl font-black text-slate-900">{premise.price}</p>
                          <p className="text-xs text-slate-400 font-medium">{isAz ? 'aylıq icarə' : isRu ? 'в месяц' : 'per month'}</p>
                        </div>
                        <button
                          onClick={e => { e.stopPropagation(); openInquiry(premise) }}
                          className="flex items-center gap-1.5 text-sm font-bold text-white bg-slate-900 hover:bg-red-600 px-4 py-2.5 rounded-xl transition-colors duration-300 whitespace-nowrap shadow hover:shadow-red-600/30"
                        >
                          {t.inquire} <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Expanded details */}
                    <AnimatePresence>
                      {selectedPremise?.id === premise.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-slate-100 p-5">
                            {/* Image gallery */}
                            {premise.images && premise.images.length > 1 && (
                              <div className="grid grid-cols-3 gap-2 mb-4">
                                {premise.images.slice(1).map((img, i) => (
                                  <div key={i} className="aspect-video rounded-xl overflow-hidden bg-slate-100 relative">
                                    <Image src={img} alt={`Gallery ${i + 1}`} fill className="object-cover" />
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Features */}
                            {premise.features && premise.features.length > 0 && (
                              <div className="mb-4">
                                <p className="text-xs font-black uppercase tracking-wider text-slate-600 mb-2">
                                  {isAz ? 'Xüsusiyyətlər & Avadanlıq' : isRu ? 'Характеристики & Оборудование' : 'Features & Equipment'}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {premise.features.map((f, i) => (
                                    <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                      <span>{f}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                              <button
                                onClick={() => openInquiry(premise)}
                                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors shadow-lg shadow-red-600/20"
                              >
                                <Send className="w-4 h-4" /> {t.sendInquiry}
                              </button>
                              <a
                                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                                  isAz ? `Salam! "${premise.id}" (${premise.area}) icarə sahəsi haqqında məlumat almaq istəyirəm.`
                                    : isRu ? `Здравствуйте! Хочу узнать об аренде объекта "${premise.id}" (${premise.area}).`
                                      : `Hello! I would like to know about leasing unit "${premise.id}" (${premise.area}).`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors"
                              >
                                <MessageCircle className="w-4 h-4" /> WhatsApp
                              </a>
                              <Link
                                href={`/leasing/${premise.id}`}
                                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm px-5 py-2.5 rounded-xl transition-colors"
                              >
                                {t.viewDetails} <ArrowRight className="w-4 h-4" />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}

                {filtered.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20 bg-white rounded-3xl border border-slate-100"
                  >
                    <Building className="w-14 h-14 text-slate-300 mx-auto mb-4" />
                    <p className="text-lg font-bold text-slate-700 mb-1">{t.noPremises}</p>
                    <p className="text-sm text-slate-500 mb-6 max-w-xs mx-auto">{t.noPremisesDesc}</p>
                    <button
                      onClick={openGeneralInquiry}
                      className="inline-flex items-center gap-2 bg-slate-900 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-2xl transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      {isAz ? 'Gözləmə Siyahısı' : isRu ? 'Лист ожидания' : 'Waiting List'}
                    </button>
                  </motion.div>
                )}
              </div>
            </section>
          </div>

          {/* RIGHT — Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">

              {/* Contact card */}
              <div className="bg-slate-900 rounded-3xl p-7 text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-36 h-36 bg-red-600/15 rounded-full -translate-y-10 translate-x-10" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-1">
                    <Building className="w-4 h-4 text-red-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-red-400">Leasing Office</span>
                  </div>
                  <h3 className="text-xl font-black mb-5">{t.contactInfo}</h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-0.5">{t.phoneText}</p>
                        <div className="flex flex-col gap-0.5">
                          <a href={`tel:${LEASING_PHONE_1.replace(/\s+/g, '')}`} className="text-white font-semibold hover:text-red-400 transition-colors text-sm">{LEASING_PHONE_1}</a>
                          <a href={`tel:${LEASING_PHONE_2.replace(/\s+/g, '')}`} className="text-slate-300 font-semibold hover:text-emerald-400 transition-colors text-xs">{LEASING_PHONE_2}</a>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-0.5">{t.emailText}</p>
                        <a href={`mailto:${LEASING_EMAIL}`} className="text-white font-semibold hover:text-red-400 transition-colors text-sm">{LEASING_EMAIL}</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 mb-0.5">{isAz ? 'İş saatları' : isRu ? 'Часы работы' : 'Working Hours'}</p>
                        <p className="text-white font-semibold text-sm">{t.hours}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappLeasing}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-2xl transition-colors shadow-lg shadow-emerald-600/30"
                    >
                      <MessageCircle className="w-5 h-5" />
                      {t.whatsappLeasing}
                    </a>
                    <button
                      onClick={openGeneralInquiry}
                      className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-2xl transition-colors shadow-lg shadow-red-600/20"
                    >
                      <Send className="w-5 h-5" />
                      {t.sendInquiry}
                    </button>
                  </div>
                </div>
              </div>

              {/* Office location */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  {isAz ? 'Ofis Ünvanı' : isRu ? 'Адрес офиса' : 'Office Address'}
                </p>
                <p className="text-sm text-slate-700 font-medium">{t.officeLocation}</p>
                <div className="mt-3 aspect-video rounded-xl overflow-hidden bg-slate-100 relative">
                  <Image
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80"
                    alt="Office"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Occupancy indicator */}
              <div className="bg-linear-to-br from-red-600 to-rose-700 rounded-2xl p-5 text-white shadow-xl shadow-red-600/20">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-black uppercase tracking-wider opacity-80">
                    {isAz ? 'Doluluq Səviyyəsi' : isRu ? 'Заполняемость' : 'Occupancy Rate'}
                  </p>
                  <span className="text-2xl font-black">
                    {premises.length > 0 ? Math.round((premises.filter(p => p.status === 'Rented').length / premises.length) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 mb-3">
                  <div
                    className="bg-white rounded-full h-2 transition-all duration-1000"
                    style={{ width: `${premises.length > 0 ? Math.round((premises.filter(p => p.status === 'Rented').length / premises.length) * 100) : 0}%` }}
                  />
                </div>
                <p className="text-xs opacity-80">
                  {premises.filter(p => p.status === 'Available').length} {isAz ? 'boş sahə qalıb' : isRu ? 'мест остаётся' : 'spots remaining'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {showInquiryModal && (
          <InquiryModal
            premise={inquiryPremise}
            onClose={() => { setShowInquiryModal(false); setInquiryPremise(null) }}
            lang={lang}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
