'use client'

import {
  Briefcase, MapPin, Clock, ArrowRight, Building2, Calendar,
  X, Check, Search, Filter, DollarSign, Award, ListChecks,
  Phone, MessageCircle, Mail, Send, Users, Sparkles, Star, CheckCircle2
} from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useTranslation } from '@/lib/i18n'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo } from 'react'
import { useMallData } from '@/hooks/useMallData'
import { submitJobApplication } from '@/lib/actions'
import { Vacancy } from '@/types'

// HR & Application Contact Numbers
const WHATSAPP_NUMBER = '994505553535'
const HR_PHONE_1 = '+994 50 555 35 35'
const HR_PHONE_2 = '+994 12 404 00 00'
const HR_EMAIL = 'hr@afmall.az'

const STATUS_BADGE: Record<string, string> = {
  'Active': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Closed': 'bg-slate-100 text-slate-500 border-slate-200',
}

function getStatusLabel(status: string, isAz: boolean, isRu: boolean) {
  if (status === 'Active') return isAz ? 'Aktiv' : isRu ? 'Активно' : 'Active'
  if (status === 'Closed') return isAz ? 'Bağlı' : isRu ? 'Закрыто' : 'Closed'
  return status
}

/* =========================================================================
   APPLY MODAL COMPONENT (Dedicated popup with full form & contact fallbacks)
========================================================================= */
function ApplyModal({
  vacancy,
  onClose,
  lang,
}: {
  vacancy: Vacancy
  onClose: () => void
  lang: string
}) {
  const t = useTranslation(lang as any).vacanciesPage
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
      fd.set('vacancyId', vacancy.id)
      fd.set('position', vacancy.position)
      fd.set('storeName', vacancy.storeName)
      await submitJobApplication(fd)
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || (isAz ? 'Xəta baş verdi' : isRu ? 'Произошла ошибка' : 'An error occurred'))
    } finally {
      setSubmitting(false)
    }
  }

  const whatsappMsg = encodeURIComponent(
    isAz
      ? `Salam! "${vacancy.position}" (${vacancy.storeName}) vəzifəsinə müraciət etmək istəyirəm.`
      : isRu
        ? `Здравствуйте! Хочу подать заявку на вакансию "${vacancy.position}" (${vacancy.storeName}).`
        : `Hello! I would like to apply for "${vacancy.position}" (${vacancy.storeName}).`
  )

  const inputCls = 'w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none focus:bg-white transition-all text-sm placeholder:text-slate-400'
  const labelCls = 'block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider'

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/75 backdrop-blur-sm"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col z-10"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 relative overflow-hidden shrink-0">
          <div className="absolute right-0 top-0 w-36 h-36 bg-red-600/15 rounded-full -translate-y-8 translate-x-8 pointer-events-none" />
          <div className="relative z-10">
            <button
              onClick={onClose}
              className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-bold uppercase tracking-wider text-red-400 bg-red-500/10 px-2.5 py-0.5 rounded-md border border-red-500/20 mb-2 inline-block">
              {t.applyModalTitle}
            </span>
            <h3 className="text-xl font-black text-white leading-snug pr-8">{vacancy.position}</h3>
            <p className="text-slate-300 text-xs font-medium flex items-center gap-1.5 mt-1">
              <Building2 className="w-3.5 h-3.5 text-red-400 shrink-0" />
              {vacancy.storeName}
              {vacancy.salary && (
                <>
                  <span className="text-slate-500">•</span>
                  <span className="text-emerald-400 font-semibold">{vacancy.salary}</span>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-6">
          {success ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <h4 className="text-xl font-black text-slate-900 mb-1.5">{t.successTitle}</h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">{t.successDesc}</p>
              </div>
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-3 px-5 rounded-xl transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  {t.whatsappDirect}
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
                >
                  {t.close}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3.5 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
                  {error}
                </div>
              )}

              <div>
                <label className={labelCls}>{t.fullName} *</label>
                <input
                  required
                  name="fullName"
                  type="text"
                  placeholder="Məs: Əli Məmmədov"
                  className={inputCls}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>{t.phone} *</label>
                  <input
                    required
                    name="phone"
                    type="tel"
                    placeholder="+994 50 123 45 67"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>{t.email}</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>{t.cvLink}</label>
                <input
                  name="cvLink"
                  type="url"
                  placeholder="https://drive.google.com/... və ya https://linkedin.com/in/..."
                  className={inputCls}
                />
              </div>

              <div>
                <label className={labelCls}>{t.experienceInput}</label>
                <textarea
                  name="experience"
                  rows={2}
                  placeholder="Məs: 2 il Zara filialında satış məsləhətçisi..."
                  className={inputCls + ' resize-none'}
                />
              </div>

              <div>
                <label className={labelCls}>{t.coverLetter}</label>
                <textarea
                  name="message"
                  rows={2}
                  placeholder="Əlavə bildirmək istədiyiniz məlumatlar..."
                  className={inputCls + ' resize-none'}
                />
              </div>

              {/* Direct call options inside modal */}
              <div className="pt-2 border-t border-slate-100">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {isAz ? 'Zənglə müraciət üçün əlaqə nömrələri:' : isRu ? 'Телефоны для прямой связи:' : 'Direct call numbers:'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href={`tel:${HR_PHONE_1.replace(/\s+/g, '')}`}
                    className="flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold py-2.5 px-3 rounded-xl transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-red-500" />
                    <span>{HR_PHONE_1}</span>
                  </a>
                  <a
                    href={`tel:${HR_PHONE_2.replace(/\s+/g, '')}`}
                    className="flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold py-2.5 px-3 rounded-xl transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-600" />
                    <span>{HR_PHONE_2}</span>
                  </a>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-red-600/20 cursor-pointer text-sm"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{t.submitting}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{t.submit}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  )
}

/* =========================================================================
   VACANCY DETAIL PANEL (Scrollable body, sticky header & footer, 2 phone numbers)
========================================================================= */
function VacancyDetailPanel({
  vacancy,
  onClose,
  lang,
  onApply
}: {
  vacancy: Vacancy
  onClose: () => void
  lang: string
  onApply: () => void
}) {
  const t = useTranslation(lang as any).vacanciesPage
  const isAz = lang === 'AZ'
  const isRu = lang === 'RU'

  const whatsappMsg = encodeURIComponent(
    isAz
      ? `Salam! "${vacancy.position}" (${vacancy.storeName}) vəzifəsinə müraciət etmək istəyirəm.`
      : isRu
        ? `Здравствуйте! Хочу подать заявку на вакансию "${vacancy.position}" (${vacancy.storeName}).`
        : `Hello! I would like to apply for "${vacancy.position}" (${vacancy.storeName}).`
  )

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col h-full max-h-full min-h-0">
      {/* 1. Header (Fixed / Shrink-0) */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 relative overflow-hidden shrink-0">
        <div className="absolute right-0 top-0 w-40 h-40 bg-red-600/10 rounded-full -translate-y-12 translate-x-12 pointer-events-none" />
        <div className="relative z-10">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title={t.close}
          >
            <X className="w-4 h-4" />
          </button>
          <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border mb-3 ${STATUS_BADGE[vacancy.status] || 'bg-white/10 text-white border-white/20'}`}>
            {getStatusLabel(vacancy.status, isAz, isRu)}
          </span>
          <h2 className="text-xl font-black text-white leading-snug mb-1.5 pr-8">{vacancy.position}</h2>
          <p className="text-slate-300 text-sm font-medium flex items-center gap-2">
            <Building2 className="w-4 h-4 text-red-400 shrink-0" />
            <span>{vacancy.storeName}</span>
          </p>
        </div>
      </div>

      {/* 2. Middle Content (Scrolls smoothly to the very end!) */}
      <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-6 space-y-5">
        {/* Meta badges */}
        <div className="flex flex-wrap gap-2">
          {vacancy.type && (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200/60">
              <Clock className="w-3.5 h-3.5 text-red-500" /> {vacancy.type}
            </span>
          )}
          {vacancy.salary && (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              <DollarSign className="w-3.5 h-3.5" /> {vacancy.salary}
            </span>
          )}
          {vacancy.experienceLevel && (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
              <Award className="w-3.5 h-3.5" /> {vacancy.experienceLevel}
            </span>
          )}
          {vacancy.department && (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-200">
              <Users className="w-3.5 h-3.5" /> {vacancy.department}
            </span>
          )}
        </div>

        {/* Description */}
        {vacancy.description && (
          <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-100">
            <p className="text-sm text-slate-700 leading-relaxed font-normal">{vacancy.description}</p>
          </div>
        )}

        {/* Responsibilities */}
        {vacancy.responsibilities && vacancy.responsibilities.length > 0 && (
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3.5 flex items-center gap-2">
              <ListChecks className="w-4 h-4 text-red-500" />
              {t.responsibilities}
            </h4>
            <ul className="space-y-2.5">
              {vacancy.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 leading-normal">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-2" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Requirements */}
        {vacancy.requirements && vacancy.requirements.length > 0 && (
          <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100">
            <h4 className="text-xs font-black uppercase tracking-wider text-blue-900 mb-3.5 flex items-center gap-2">
              <Star className="w-4 h-4 text-blue-600" />
              {t.requirements}
            </h4>
            <ul className="space-y-2.5">
              {vacancy.requirements.map((r, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 leading-normal">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Posted date */}
        <p className="text-xs text-slate-400 flex items-center gap-1.5 font-medium pt-1">
          <Calendar className="w-3.5 h-3.5" />
          {t.posted}: {new Date(vacancy.postedDate).toLocaleDateString(
            lang === 'AZ' ? 'az-AZ' : lang === 'RU' ? 'ru-RU' : 'en-US',
            { day: 'numeric', month: 'long', year: 'numeric' }
          )}
        </p>

        {/* HR Contact Box with BOTH phone numbers */}
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4.5 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-950">{t.hrContactTitle}</p>
              <p className="text-[11px] text-emerald-700">{t.hrContactDesc}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              {t.whatsappDirect}
            </a>

            {/* 2 Call buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href={`tel:${HR_PHONE_1.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-bold py-2 px-3 rounded-xl transition-colors shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-red-500" />
                <span>{HR_PHONE_1}</span>
              </a>
              <a
                href={`tel:${HR_PHONE_2.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-bold py-2 px-3 rounded-xl transition-colors shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>{HR_PHONE_2}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Footer (Fixed CTA at the bottom - ALWAYS visible!) */}
      {vacancy.status === 'Active' && (
        <div className="p-4 border-t border-slate-100 bg-slate-50/90 backdrop-blur-xs shrink-0">
          <button
            onClick={onApply}
            className="w-full bg-slate-900 hover:bg-red-600 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-red-600/30 cursor-pointer"
          >
            <Briefcase className="w-5 h-5" />
            <span>{t.applyNow}</span>
          </button>
        </div>
      )}
    </div>
  )
}

/* =========================================================================
   MAIN VACANCIES PAGE
========================================================================= */
export default function VacanciesPage() {
  const { lang } = useLanguage()
  const t = useTranslation(lang).vacanciesPage
  const { vacancies } = useMallData()

  const isAz = lang === 'AZ'
  const isRu = lang === 'RU'

  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null)
  const [applyModalVacancy, setApplyModalVacancy] = useState<Vacancy | null>(null)

  const activeVacancies = vacancies.filter(v => v.status === 'Active')

  const types = useMemo(() => {
    const all = activeVacancies.map(v => v.type).filter(Boolean)
    return Array.from(new Set(all))
  }, [activeVacancies])

  const filtered = useMemo(() => {
    return activeVacancies.filter(v => {
      const q = search.toLowerCase()
      const matchSearch = !q ||
        v.position.toLowerCase().includes(q) ||
        v.storeName.toLowerCase().includes(q) ||
        (v.department || '').toLowerCase().includes(q)
      const matchType = typeFilter === 'all' || v.type === typeFilter
      return matchSearch && matchType
    })
  }, [activeVacancies, search, typeFilter])

  const WHATSAPP_GENERAL = encodeURIComponent(
    isAz
      ? 'Salam! AF Mall-da vakansiyalar haqqında məlumat almaq istəyirəm.'
      : isRu
        ? 'Здравствуйте! Хочу узнать о вакансиях в AF Mall.'
        : 'Hello! I would like to inquire about job opportunities at AF Mall.'
  )

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.15),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.08),transparent_50%)] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AF Mall Karyera Portalı</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-4">
              {t.title}
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed max-w-2xl">
              {t.desc}
            </p>
          </motion.div>

          {/* Stats Bar & WhatsApp quick link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-3 rounded-2xl text-center">
              <p className="text-2xl font-black text-white">{activeVacancies.length}</p>
              <p className="text-xs text-slate-400 font-semibold">{t.activeVacanciesCount}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-3 rounded-2xl text-center">
              <p className="text-2xl font-black text-white">{Array.from(new Set(activeVacancies.map(v => v.storeName))).length}</p>
              <p className="text-xs text-slate-400 font-semibold">{isAz ? 'Şirkət & Brend' : isRu ? 'Компаний' : 'Companies'}</p>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_GENERAL}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm px-5 py-3.5 rounded-2xl transition-colors shadow-lg shadow-emerald-600/30"
            >
              <MessageCircle className="w-4 h-4" />
              {t.whatsappDirect}
            </a>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl mt-10">
        {/* Search & Filters */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
            >
              <option value="all">{t.allTypes}</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          {(search || typeFilter !== 'all') && (
            <button
              onClick={() => { setSearch(''); setTypeFilter('all') }}
              className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-slate-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
              {isAz ? 'Sıfırla' : isRu ? 'Сбросить' : 'Reset'}
            </button>
          )}
        </div>

        {/* Two-Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Vacancies List (Left) */}
          <div className={`${selectedVacancy ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-4 transition-all duration-300`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h2 className="text-lg font-black text-slate-900">
                {filtered.length} {t.activeVacanciesCount}
              </h2>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wide">
                  {isAz ? 'Canlı' : isRu ? 'Онлайн' : 'Live'}
                </span>
              </div>
            </div>

            <AnimatePresence>
              {filtered.map((vacancy, idx) => (
                <motion.div
                  key={vacancy.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ delay: idx * 0.04, duration: 0.3 }}
                  onClick={() => setSelectedVacancy(vacancy)}
                  className={`group bg-white rounded-2xl border p-5 md:p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/60 ${
                    selectedVacancy?.id === vacancy.id
                      ? 'border-red-500 shadow-xl shadow-red-100/50 ring-2 ring-red-500/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="px-2.5 py-1 bg-red-50 text-red-600 text-[11px] font-bold uppercase tracking-wider rounded-lg border border-red-100">
                          {vacancy.type}
                        </span>
                        {vacancy.department && (
                          <span className="px-2.5 py-1 bg-purple-50 text-purple-700 text-[11px] font-semibold rounded-lg border border-purple-100">
                            {vacancy.department}
                          </span>
                        )}
                        <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {t.posted}: {new Date(vacancy.postedDate).toLocaleDateString(
                            lang === 'AZ' ? 'az-AZ' : lang === 'RU' ? 'ru-RU' : 'en-US',
                            { month: 'short', day: 'numeric' }
                          )}
                        </span>
                      </div>

                      <h3 className={`text-xl sm:text-2xl font-black mb-3 transition-colors leading-tight ${
                        selectedVacancy?.id === vacancy.id ? 'text-red-600' : 'text-slate-900 group-hover:text-red-600'
                      }`}>
                        {vacancy.position}
                      </h3>

                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500 font-medium">
                        <span className="flex items-center gap-1.5">
                          <Building2 className="w-4 h-4 text-slate-400" />
                          {vacancy.storeName}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          AF Mall, Baku
                        </span>
                        {vacancy.salary && (
                          <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                            <DollarSign className="w-4 h-4" />
                            {vacancy.salary}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2.5">
                      <button
                        onClick={e => {
                          e.stopPropagation()
                          setSelectedVacancy(vacancy)
                        }}
                        className="flex items-center gap-2 bg-slate-900 group-hover:bg-red-600 text-white text-sm font-bold px-4 py-3 rounded-xl transition-all duration-300 shadow hover:shadow-red-600/30 cursor-pointer"
                      >
                        <span>{t.details}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {vacancy.description && (
                    <p className="mt-3 text-sm text-slate-500 line-clamp-2 leading-relaxed border-t border-slate-100 pt-3">
                      {vacancy.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm"
              >
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Briefcase className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">{t.noVacancies}</h3>
                <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">{t.noVacanciesDesc}</p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_GENERAL}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm px-6 py-3 rounded-2xl transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  {t.whatsappDirect}
                </a>
              </motion.div>
            )}
          </div>

          {/* DESKTOP DETAIL PANEL (Right Sticky Column: Fully bounded height & scrollable!) */}
          {selectedVacancy && (
            <div className="hidden lg:flex lg:col-span-5 lg:sticky lg:top-24 lg:self-start h-[calc(100vh-120px)] min-h-[580px] max-h-[850px] flex-col">
              <VacancyDetailPanel
                vacancy={selectedVacancy}
                onClose={() => setSelectedVacancy(null)}
                lang={lang}
                onApply={() => setApplyModalVacancy(selectedVacancy)}
              />
            </div>
          )}
        </div>

        {/* MOBILE DETAIL MODAL (< 1024px: Slide-up bottom sheet so user doesn't miss it!) */}
        <AnimatePresence>
          {selectedVacancy && (
            <div className="fixed inset-0 z-[150] lg:hidden flex items-end sm:items-center justify-center p-0 sm:p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedVacancy(null)}
                className="absolute inset-0 bg-slate-900/75 backdrop-blur-xs"
              />
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="relative w-full sm:max-w-xl h-[88vh] sm:h-[82vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10"
              >
                <VacancyDetailPanel
                  vacancy={selectedVacancy}
                  onClose={() => setSelectedVacancy(null)}
                  lang={lang}
                  onApply={() => {
                    const v = selectedVacancy
                    setSelectedVacancy(null)
                    setApplyModalVacancy(v)
                  }}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* DEDICATED APPLY MODAL (Opens for application submission) */}
        <AnimatePresence>
          {applyModalVacancy && (
            <ApplyModal
              vacancy={applyModalVacancy}
              onClose={() => setApplyModalVacancy(null)}
              lang={lang}
            />
          )}
        </AnimatePresence>

        {/* BOTTOM HR BAR (Featuring 2 Phone Call buttons, WhatsApp, and Email) */}
        <div className="mt-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 text-white border border-slate-700 relative overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 w-64 h-64 bg-red-600/10 rounded-full -translate-y-24 translate-x-24 pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-red-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                  HR & {isAz ? 'Karyera Mərkəzi' : isRu ? 'Карьерный Центр' : 'Careers Center'}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black mb-1.5">{t.hrContactTitle}</h3>
              <p className="text-slate-300 text-sm max-w-xl">{t.hrContactDesc}</p>
            </div>

            {/* Direct action buttons: WhatsApp + 2 Call Numbers + Email */}
            <div className="flex flex-wrap items-center gap-3 shrink-0 w-full lg:w-auto">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_GENERAL}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm px-5 py-3.5 rounded-2xl transition-all shadow-lg shadow-emerald-600/30 shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.whatsappDirect}</span>
              </a>

              {/* Call Number 1 */}
              <a
                href={`tel:${HR_PHONE_1.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm px-5 py-3.5 rounded-2xl transition-all shrink-0 hover:scale-[1.02]"
                title="Zəng et"
              >
                <Phone className="w-4 h-4 text-red-400" />
                <span>{HR_PHONE_1}</span>
              </a>

              {/* Call Number 2 */}
              <a
                href={`tel:${HR_PHONE_2.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm px-5 py-3.5 rounded-2xl transition-all shrink-0 hover:scale-[1.02]"
                title="Zəng et"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{HR_PHONE_2}</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${HR_EMAIL}`}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-slate-300 hover:text-white font-semibold text-sm px-4 py-3.5 rounded-2xl transition-all shrink-0"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>{HR_EMAIL}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
