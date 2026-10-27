'use server'

import { redirect } from 'next/navigation'
import { loginAdmin, logoutAdmin, updateAdminCredentials } from '@/lib/auth'

export async function authenticate(
  prevState: string | null,
  formData: FormData,
): Promise<string | null> {
  const email = formData.get('email')?.toString() || ''
  const password = formData.get('password')?.toString() || ''

  if (!email || !password) {
    return 'Zəhmət olmasa email və şifrəni daxil edin. / Please enter email and password.'
  }

  const result = await loginAdmin(email, password)

  if (!result.success) {
    return result.error || 'Giriş uğursuz oldu. / Invalid credentials.'
  }

  redirect('/admin')
}

export async function handleLogout() {
  await logoutAdmin()
  redirect('/login')
}

export async function handleUpdateSecurity(
  prevState: { success?: boolean; error?: string } | null,
  formData: FormData
) {
  const currentPassword = formData.get('currentPassword')?.toString() || ''
  const newEmail = formData.get('newEmail')?.toString() || undefined
  const newPassword = formData.get('newPassword')?.toString() || undefined
  const newName = formData.get('newName')?.toString() || undefined

  if (!currentPassword) {
    return { error: 'Təsdiq üçün hazırkı şifrəni daxil edin! / Current password required.' }
  }

  const res = await updateAdminCredentials({
    currentPassword,
    newEmail,
    newPassword,
    newName
  })

  return res
}
