import { getDb } from '@/lib/actions'
import { getAdminSession } from '@/lib/auth'
import { SettingsManager } from '@/components/admin/SettingsManager'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function AdminSettingsPage() {
  const admin = await getAdminSession()
  if (!admin) redirect('/login')

  const db = await getDb()
  const mallInfo = db.mallInfo

  return (
    <SettingsManager 
      mallInfo={mallInfo} 
      admin={admin} 
    />
  )
}
