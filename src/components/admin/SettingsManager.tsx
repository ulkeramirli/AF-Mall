'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Settings as SettingsIcon, 
  Shield, 
  Lock, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Megaphone, 
  Download, 
  CheckCircle2, 
  AlertTriangle,
  User
} from 'lucide-react'
import { updateMallSettings } from '@/lib/actions'
import { handleUpdateSecurity } from '@/app/login/actions'
import { MallSettings, AdminUser } from '@/types'

export function SettingsManager({
  mallInfo,
  admin
}: {
  mallInfo: MallSettings;
  admin: AdminUser;
}) {
  const router = useRouter()
  const [mallSaved, setMallSaved] = useState(false)
  const [securitySaved, setSecuritySaved] = useState(false)
  const [securityError, setSecurityError] = useState<string | null>(null)
  const [isSubmittingMall, setIsSubmittingMall] = useState(false)
  const [isSubmittingSec, setIsSubmittingSec] = useState(false)

  const handleMallSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmittingMall(true)
    setMallSaved(false)
    try {
      const formData = new FormData(e.currentTarget)
      await updateMallSettings(formData)
      setMallSaved(true)
      setTimeout(() => setMallSaved(false), 4000)
      router.refresh()
    } catch (err: any) {
      alert('Xəta baş verdi: ' + (err.message || 'Error'))
    } finally {
      setIsSubmittingMall(false)
    }
  }

  const handleSecuritySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmittingSec(true)
    setSecuritySaved(false)
    setSecurityError(null)

    try {
      const formData = new FormData(e.currentTarget)
      const res = await handleUpdateSecurity(null, formData)
      if (res && res.error) {
        setSecurityError(res.error)
      } else {
        setSecuritySaved(true)
        setTimeout(() => setSecuritySaved(false), 4000)
        e.currentTarget.reset()
        router.refresh()
      }
    } catch (err: any) {
      setSecurityError(err.message || 'Təhlükəsizlik yenilənməsi zamanı xəta.')
    } finally {
      setIsSubmittingSec(false)
    }
  }

  const handleDownloadBackup = () => {
    window.open('/api/data', '_blank')
  }

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
            Konfiqurasiya
          </span>
          <span className="text-xs text-slate-400 font-medium">Sistem və Təhlükəsizlik</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Mall Tənzimləmələri</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Ticarət mərkəzinin əsas məlumatları, bildirişləri və admin təhlükəsizlik şifrəsini buradan yeniləyin.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mall General Info Form */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold shrink-0">
                <SettingsIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">Əsas Mall Məlumatları</h2>
                <p className="text-xs text-slate-400">Public saytda görünən əlaqə və iş saatları</p>
              </div>
            </div>

            {mallSaved && (
              <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Məlumatlar uğurla yeniləndi!
              </div>
            )}

            <form onSubmit={handleMallSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Mall Adı</label>
                <input
                  name="name"
                  defaultValue={mallInfo.name}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Şüar / Qısa Təsvir</label>
                <input
                  name="tagline"
                  defaultValue={mallInfo.tagline}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Əlaqə Telefonu</label>
                  <input
                    name="phone"
                    defaultValue={mallInfo.phone}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">Rəsmi Email</label>
                  <input
                    name="email"
                    defaultValue={mallInfo.email}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Ünvan</label>
                <input
                  name="address"
                  defaultValue={mallInfo.address}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">İş Saatları</label>
                <input
                  name="workingHours"
                  defaultValue={mallInfo.workingHours}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white"
                />
              </div>

              {/* Announcement Banner */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-slate-800 uppercase flex items-center gap-2">
                    <Megaphone className="w-4 h-4 text-red-500" />
                    Başlıq Bildirişi (Announcement Banner)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="announcementEnabled"
                      name="announcementEnabled"
                      defaultChecked={mallInfo.announcement?.enabled}
                      className="w-4 h-4 accent-red-600 rounded cursor-pointer"
                    />
                    <label htmlFor="announcementEnabled" className="text-xs font-bold text-slate-700 cursor-pointer">
                      Aktiv olsun
                    </label>
                  </div>
                </div>

                <textarea
                  name="announcementText"
                  rows={2}
                  defaultValue={mallInfo.announcement?.text || ''}
                  placeholder="Məs: AF Mall-da həftəsonu xüsusi endirimlər və canlı musiqi!"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingMall}
                className="w-full mt-4 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-red-600/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmittingMall ? 'Yadda saxlanılır...' : 'Mall Məlumatlarını Yadda Saxla'}
              </button>
            </form>
          </div>
        </div>

        {/* Admin Security & Password Change */}
        <div className="space-y-8">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold shrink-0">
                <Shield className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900">Admin Təhlükəsizlik və Giriş</h2>
                <p className="text-xs text-slate-400">Giriş emailini və şifrəsini dəyişdirin</p>
              </div>
            </div>

            {securitySaved && (
              <div className="mb-4 p-3.5 rounded-2xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Admin giriş məlumatları uğurla yeniləndi!
              </div>
            )}

            {securityError && (
              <div className="mb-4 p-3.5 rounded-2xl bg-red-50 text-red-700 text-xs font-bold border border-red-200 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                {securityError}
              </div>
            )}

            <form onSubmit={handleSecuritySubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Admin Adı</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    name="newName"
                    defaultValue={admin.name}
                    placeholder="Admin Director"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Admin Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    name="newEmail"
                    type="email"
                    defaultValue={admin.email}
                    placeholder="admin@afmall.az"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Yeni Şifrə (boş buraxa bilərsiniz)</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    name="newPassword"
                    type="password"
                    placeholder="Minimum 6 simvol"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-2 space-y-1.5">
                <label className="text-xs font-bold text-red-600 uppercase">
                  Təsdiq üçün Hazırkı Şifrəni Daxil Edin *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-red-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    required
                    name="currentPassword"
                    type="password"
                    placeholder="Hazırkı şifrə (İlkin: password123)"
                    className="w-full bg-red-50/40 border border-red-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium focus:bg-white focus:border-red-500"
                  />
                </div>
                <p className="text-[11px] text-slate-400">İlkin quraşdırılmış şifrə: <strong>password123</strong></p>
              </div>

              <button
                type="submit"
                disabled={isSubmittingSec}
                className="w-full mt-2 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmittingSec ? 'Yenilənir...' : 'Təhlükəsizlik Məlumatlarını Yenilə'}
              </button>
            </form>
          </div>

          {/* Database Backup Tool */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800">
            <h3 className="text-base font-extrabold mb-1">Baza Rezerv Nüsxəsi (JSON Backup)</h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Bütün mağazalar, kateqoriyalar və sahələrin ən son nüsxəsini JSON formatında baxın və ya yükləyin.
            </p>
            <button
              onClick={handleDownloadBackup}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl border border-white/10 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              Baza Faylını Aç / İxrac Et (JSON)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
