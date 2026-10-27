import { redirect } from 'next/navigation'
import { getAdminSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const admin = await getAdminSession()
  if (admin) {
    redirect('/admin')
  }

  return <>{children}</>
}
