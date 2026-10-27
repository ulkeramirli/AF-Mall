import { redirect } from "next/navigation"
import { getAdminSession } from "@/lib/auth"
import { AdminLayoutClient } from "@/components/admin/AdminLayoutClient"

export const dynamic = 'force-dynamic'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const admin = await getAdminSession()

  if (!admin) {
    redirect('/login')
  }

  return (
    <AdminLayoutClient admin={admin}>
      {children}
    </AdminLayoutClient>
  )
}
