import { cookies } from 'next/headers'
import { getDb, saveDb, logActivity } from './actions'
import { AdminUser } from '@/types'

const SESSION_COOKIE_NAME = 'af_admin_session'
const SESSION_DURATION_DAYS = 7

interface SessionPayload {
  email: string;
  name: string;
  role: string;
  expiresAt: number;
}

function encodeSession(payload: SessionPayload): string {
  return Buffer.from(JSON.stringify(payload)).toString('base64url')
}

function decodeSession(token: string): SessionPayload | null {
  try {
    const raw = Buffer.from(token, 'base64url').toString('utf8')
    const parsed = JSON.parse(raw) as SessionPayload
    if (!parsed || !parsed.email || !parsed.expiresAt) return null
    if (Date.now() > parsed.expiresAt) return null
    return parsed
  } catch {
    return null
  }
}

export async function getAdminSession(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value
    if (!sessionToken) return null

    const session = decodeSession(sessionToken)
    if (!session) return null

    const db = await getDb()
    const admin = db.admin || {
      email: 'admin@afmall.az',
      name: 'Admin User',
      role: 'Superadmin'
    }

    if (session.email.toLowerCase() !== admin.email.toLowerCase()) {
      return null
    }

    return {
      email: admin.email,
      name: admin.name || 'Admin Director',
      role: admin.role || 'Superadmin',
      avatar: admin.avatar
    }
  } catch (error) {
    console.error('getAdminSession error:', error)
    return null
  }
}

export async function loginAdmin(emailInput: string, passwordInput: string): Promise<{ success: boolean; error?: string }> {
  const db = await getDb()
  const admin = db.admin || {
    email: 'admin@afmall.az',
    password: 'password123',
    name: 'Admin Director',
    role: 'Superadmin'
  }

  const cleanEmail = emailInput.trim().toLowerCase()
  const cleanPass = passwordInput.trim()

  if (cleanEmail !== admin.email.toLowerCase() || cleanPass !== admin.password) {
    return { success: false, error: 'Yanlış email və ya şifrə! / Invalid email or password' }
  }

  const expiresAt = Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000
  const sessionToken = encodeSession({
    email: admin.email,
    name: admin.name,
    role: admin.role || 'Superadmin',
    expiresAt
  })

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DURATION_DAYS * 24 * 60 * 60
  })

  await logActivity('Admin Login', `Admin signed into dashboard (${admin.email})`, admin.name)

  return { success: true }
}

export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

export async function updateAdminCredentials(params: {
  currentPassword: string;
  newEmail?: string;
  newPassword?: string;
  newName?: string;
}): Promise<{ success: boolean; error?: string }> {
  const db = await getDb()
  const admin = db.admin || {
    email: 'admin@afmall.az',
    password: 'password123',
    name: 'Admin Director',
    role: 'Superadmin'
  }

  if (params.currentPassword !== admin.password) {
    return { success: false, error: 'Hazırkı şifrə yanlışdır! / Current password is incorrect' }
  }

  if (params.newEmail && params.newEmail.trim().length > 3) {
    admin.email = params.newEmail.trim().toLowerCase()
  }

  if (params.newPassword && params.newPassword.trim().length >= 6) {
    admin.password = params.newPassword.trim()
  }

  if (params.newName && params.newName.trim().length > 0) {
    admin.name = params.newName.trim()
  }

  db.admin = admin
  await saveDb(db)
  await logActivity('Security Updated', 'Admin credentials updated', admin.name)

  // Re-issue session with new credentials
  const expiresAt = Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000
  const sessionToken = encodeSession({
    email: admin.email,
    name: admin.name,
    role: admin.role || 'Superadmin',
    expiresAt
  })

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DURATION_DAYS * 24 * 60 * 60
  })

  return { success: true }
}
