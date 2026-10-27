'use server'

import fs from 'fs/promises'
import path from 'path'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Store, Category, Event as MallEvent, Vacancy, Premise, MallSettings, ActivityLog } from '@/types'

const DB_PATH = path.join(process.cwd(), 'data', 'db.json')

export interface DatabaseSchema {
  categories: Category[];
  stores: Store[];
  events: MallEvent[];
  vacancies: Vacancy[];
  premises: Premise[];
  admin: {
    email: string;
    password?: string;
    name: string;
    role: string;
    avatar?: string;
  };
  mallInfo: MallSettings;
  activityLogs: ActivityLog[];
}

export async function getDb(): Promise<DatabaseSchema> {
  try {
    const file = await fs.readFile(DB_PATH, 'utf8')
    const parsed = JSON.parse(file)
    return {
      categories: parsed.categories || [],
      stores: parsed.stores || [],
      events: parsed.events || [],
      vacancies: parsed.vacancies || [],
      premises: parsed.premises || [],
      admin: parsed.admin || {
        email: 'admin@afmall.az',
        password: 'password123',
        name: 'Admin Director',
        role: 'Superadmin'
      },
      mallInfo: parsed.mallInfo || {
        name: 'AF Mall',
        tagline: 'Premium Shopping & Leisure Destination',
        phone: '+994 12 404 00 00',
        email: 'info@afmall.az',
        address: 'Samad Vurgun 34, Baku, Azerbaijan',
        workingHours: '10:00 - 22:00 (Daily)',
        announcement: {
          enabled: true,
          text: 'Welcome to AF Mall — Baku\'s premier shopping and leisure destination.',
          type: 'info'
        }
      },
      activityLogs: parsed.activityLogs || []
    }
  } catch (err) {
    console.error('Failed to read db.json, returning empty structure:', err)
    return {
      categories: [],
      stores: [],
      events: [],
      vacancies: [],
      premises: [],
      admin: {
        email: 'admin@afmall.az',
        password: 'password123',
        name: 'Admin Director',
        role: 'Superadmin'
      },
      mallInfo: {
        name: 'AF Mall',
        tagline: 'Premium Shopping & Leisure Destination',
        phone: '+994 12 404 00 00',
        email: 'info@afmall.az',
        address: 'Samad Vurgun 34, Baku, Azerbaijan',
        workingHours: '10:00 - 22:00 (Daily)',
        announcement: {
          enabled: true,
          text: 'Welcome to AF Mall',
          type: 'info'
        }
      },
      activityLogs: []
    }
  }
}

export async function saveDb(data: Partial<DatabaseSchema>) {
  const current = await getDb()
  const merged = { ...current, ...data }
  await fs.writeFile(DB_PATH, JSON.stringify(merged, null, 2), 'utf8')
}

export async function logActivity(action: string, description: string, user: string = 'Superadmin') {
  try {
    const db = await getDb()
    const newLog: ActivityLog = {
      id: 'act-' + Date.now(),
      action,
      description,
      user,
      timestamp: new Date().toISOString()
    }
    const currentLogs = db.activityLogs || []
    db.activityLogs = [newLog, ...currentLogs].slice(0, 50)
    await saveDb(db)
  } catch (err) {
    console.error('Error logging activity:', err)
  }
}

/* =========================================================================
   STORES MANAGEMENT
========================================================================= */

export async function addStore(formData: FormData) {
  const db = await getDb()
  const name = formData.get('name')?.toString().trim() || 'New Store'
  const newStore: Store = {
    id: Date.now().toString(),
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    categoryId: formData.get('categoryId')?.toString() || '1',
    floor: formData.get('floor')?.toString() || '1',
    location: formData.get('location')?.toString() || '1A',
    description: formData.get('description')?.toString() || '',
    logo: formData.get('logo')?.toString() || undefined,
    image: formData.get('image')?.toString() || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=600&fit=crop',
    isPremium: formData.get('isPremium') === 'on' || formData.get('isPremium') === 'true',
    phone: formData.get('phone')?.toString() || undefined,
    hours: formData.get('hours')?.toString() || '10:00 - 22:00',
    website: formData.get('website')?.toString() || undefined,
  }

  db.stores.push(newStore)
  await saveDb(db)
  await logActivity('Store Added', `Store "${name}" registered on floor ${newStore.floor}`)

  revalidatePath('/stores')
  revalidatePath('/admin')
  revalidatePath('/admin/stores')
  revalidatePath('/')
  return { success: true, store: newStore }
}

export async function updateStore(formData: FormData) {
  const db = await getDb()
  const id = formData.get('id')?.toString()
  if (!id) throw new Error('Store ID is required')

  const index = db.stores.findIndex(s => s.id === id)
  if (index === -1) throw new Error('Store not found')

  const name = formData.get('name')?.toString().trim() || db.stores[index].name
  const updatedStore: Store = {
    ...db.stores[index],
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    categoryId: formData.get('categoryId')?.toString() || db.stores[index].categoryId,
    floor: formData.get('floor')?.toString() || db.stores[index].floor,
    location: formData.get('location')?.toString() || db.stores[index].location,
    description: formData.get('description')?.toString() || db.stores[index].description,
    logo: formData.get('logo')?.toString() || db.stores[index].logo,
    image: formData.get('image')?.toString() || db.stores[index].image,
    isPremium: formData.get('isPremium') === 'on' || formData.get('isPremium') === 'true',
    phone: formData.get('phone')?.toString() || db.stores[index].phone,
    hours: formData.get('hours')?.toString() || db.stores[index].hours,
    website: formData.get('website')?.toString() || db.stores[index].website,
  }

  db.stores[index] = updatedStore
  await saveDb(db)
  await logActivity('Store Updated', `Store "${name}" details updated`)

  revalidatePath('/stores')
  revalidatePath(`/stores/${id}`)
  revalidatePath('/admin')
  revalidatePath('/admin/stores')
  revalidatePath('/')
  return { success: true, store: updatedStore }
}

export async function deleteStore(id: string) {
  const db = await getDb()
  const storeToDelete = db.stores.find(s => s.id === id)
  db.stores = db.stores.filter(s => s.id !== id)
  await saveDb(db)
  await logActivity('Store Deleted', `Store "${storeToDelete?.name || id}" was removed`)

  revalidatePath('/stores')
  revalidatePath('/admin')
  revalidatePath('/admin/stores')
  revalidatePath('/')
  return { success: true }
}

/* =========================================================================
   CATEGORIES MANAGEMENT
========================================================================= */

export async function addCategory(formData: FormData) {
  const db = await getDb()
  const name = formData.get('name')?.toString().trim() || 'New Category'
  const slug = formData.get('slug')?.toString().trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  const newCategory: Category = {
    id: Date.now().toString(),
    name,
    slug,
    icon: formData.get('icon')?.toString() || undefined
  }

  db.categories.push(newCategory)
  await saveDb(db)
  await logActivity('Category Created', `Category "${name}" added`)

  revalidatePath('/stores')
  revalidatePath('/admin')
  revalidatePath('/admin/categories')
  revalidatePath('/')
  return { success: true, category: newCategory }
}

export async function updateCategory(formData: FormData) {
  const db = await getDb()
  const id = formData.get('id')?.toString()
  if (!id) throw new Error('Category ID is required')

  const index = db.categories.findIndex(c => c.id === id)
  if (index === -1) throw new Error('Category not found')

  const name = formData.get('name')?.toString().trim() || db.categories[index].name
  const slug = formData.get('slug')?.toString().trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  db.categories[index] = {
    ...db.categories[index],
    name,
    slug,
    icon: formData.get('icon')?.toString() || db.categories[index].icon
  }

  await saveDb(db)
  await logActivity('Category Updated', `Category "${name}" updated`)

  revalidatePath('/stores')
  revalidatePath('/admin')
  revalidatePath('/admin/categories')
  revalidatePath('/')
  return { success: true }
}

export async function deleteCategory(id: string) {
  const db = await getDb()
  const cat = db.categories.find(c => c.id === id)
  db.categories = db.categories.filter(c => c.id !== id)
  await saveDb(db)
  await logActivity('Category Deleted', `Category "${cat?.name || id}" deleted`)

  revalidatePath('/stores')
  revalidatePath('/admin')
  revalidatePath('/admin/categories')
  revalidatePath('/')
  return { success: true }
}

/* =========================================================================
   PREMISES / LEASING MANAGEMENT
========================================================================= */

export async function addPremise(formData: FormData) {
  const db = await getDb()
  const imagesRaw = formData.get('images')?.toString() || ''
  const images = imagesRaw ? imagesRaw.split(',').map(s => s.trim()).filter(Boolean) : [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800'
  ]

  const customId = formData.get('id')?.toString().trim()
  const newPremise: Premise = {
    id: customId || ('P' + Math.floor(100 + Math.random() * 900)),
    floor: formData.get('floor')?.toString() || '1',
    area: formData.get('area')?.toString() || '100 sqm',
    type: formData.get('type')?.toString() || 'Retail',
    status: (formData.get('status')?.toString() as any) || 'Available',
    tenant: formData.get('tenant')?.toString().trim() || null,
    price: formData.get('price')?.toString() || '$3,000/mo',
    images,
    description: formData.get('description')?.toString() || ''
  }

  db.premises.push(newPremise)
  await saveDb(db)
  await logActivity('Premise Added', `Premise ${newPremise.id} (${newPremise.area}) listed`)

  revalidatePath('/leasing')
  revalidatePath('/admin')
  revalidatePath('/admin/premises')
  return { success: true, premise: newPremise }
}

export async function updatePremise(formData: FormData) {
  const db = await getDb()
  const id = formData.get('id')?.toString()
  if (!id) throw new Error('Premise ID is required')

  const index = db.premises.findIndex(p => p.id === id)
  if (index === -1) throw new Error('Premise not found')

  const imagesRaw = formData.get('images')?.toString()
  const images = imagesRaw ? imagesRaw.split(',').map(s => s.trim()).filter(Boolean) : db.premises[index].images

  db.premises[index] = {
    ...db.premises[index],
    floor: formData.get('floor')?.toString() || db.premises[index].floor,
    area: formData.get('area')?.toString() || db.premises[index].area,
    type: formData.get('type')?.toString() || db.premises[index].type,
    status: (formData.get('status')?.toString() as any) || db.premises[index].status,
    tenant: formData.get('tenant')?.toString().trim() || null,
    price: formData.get('price')?.toString() || db.premises[index].price,
    images: images && images.length > 0 ? images : db.premises[index].images,
    description: formData.get('description')?.toString() || db.premises[index].description
  }

  await saveDb(db)
  await logActivity('Premise Updated', `Premise ${id} status: ${db.premises[index].status}`)

  revalidatePath('/leasing')
  revalidatePath(`/leasing/${id}`)
  revalidatePath('/admin')
  revalidatePath('/admin/premises')
  return { success: true }
}

export async function deletePremise(id: string) {
  const db = await getDb()
  db.premises = db.premises.filter(p => p.id !== id)
  await saveDb(db)
  await logActivity('Premise Deleted', `Premise ${id} was deleted`)

  revalidatePath('/leasing')
  revalidatePath('/admin')
  revalidatePath('/admin/premises')
  return { success: true }
}

/* =========================================================================
   VACANCIES MANAGEMENT
========================================================================= */

export async function addVacancy(formData: FormData) {
  const db = await getDb()
  const position = formData.get('position')?.toString().trim() || 'Staff'
  const storeName = formData.get('storeName')?.toString().trim() || 'AF Mall'

  const newVacancy: Vacancy = {
    id: Date.now().toString(),
    storeName,
    position,
    type: formData.get('type')?.toString() || 'Full-time',
    status: (formData.get('status')?.toString() as any) || 'Active',
    postedDate: new Date().toISOString().split('T')[0],
    salary: formData.get('salary')?.toString() || undefined,
    description: formData.get('description')?.toString() || ''
  }

  db.vacancies.push(newVacancy)
  await saveDb(db)
  await logActivity('Vacancy Created', `Position "${position}" for "${storeName}" posted`)

  revalidatePath('/vacancies')
  revalidatePath('/admin')
  revalidatePath('/admin/vacancies')
  return { success: true, vacancy: newVacancy }
}

export async function updateVacancy(formData: FormData) {
  const db = await getDb()
  const id = formData.get('id')?.toString()
  if (!id) throw new Error('Vacancy ID is required')

  const index = db.vacancies.findIndex(v => v.id === id)
  if (index === -1) throw new Error('Vacancy not found')

  db.vacancies[index] = {
    ...db.vacancies[index],
    storeName: formData.get('storeName')?.toString().trim() || db.vacancies[index].storeName,
    position: formData.get('position')?.toString().trim() || db.vacancies[index].position,
    type: formData.get('type')?.toString() || db.vacancies[index].type,
    status: (formData.get('status')?.toString() as any) || db.vacancies[index].status,
    salary: formData.get('salary')?.toString() || db.vacancies[index].salary,
    description: formData.get('description')?.toString() || db.vacancies[index].description
  }

  await saveDb(db)
  await logActivity('Vacancy Updated', `Vacancy "${db.vacancies[index].position}" updated`)

  revalidatePath('/vacancies')
  revalidatePath('/admin')
  revalidatePath('/admin/vacancies')
  return { success: true }
}

export async function deleteVacancy(id: string) {
  const db = await getDb()
  const vac = db.vacancies.find(v => v.id === id)
  db.vacancies = db.vacancies.filter(v => v.id !== id)
  await saveDb(db)
  await logActivity('Vacancy Deleted', `Vacancy "${vac?.position || id}" removed`)

  revalidatePath('/vacancies')
  revalidatePath('/admin')
  revalidatePath('/admin/vacancies')
  return { success: true }
}

/* =========================================================================
   EVENTS & PROMOTIONS MANAGEMENT
========================================================================= */

export async function addEvent(formData: FormData) {
  const db = await getDb()
  const title = formData.get('title')?.toString().trim() || 'New Event'
  const newEvent: MallEvent = {
    id: Date.now().toString(),
    title,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    date: formData.get('date')?.toString() || new Date().toISOString(),
    endDate: formData.get('endDate')?.toString() || undefined,
    location: formData.get('location')?.toString() || 'Main Atrium',
    description: formData.get('description')?.toString() || '',
    image: formData.get('image')?.toString() || 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=600&fit=crop',
    status: (formData.get('status')?.toString() as any) || 'Upcoming'
  }

  db.events.push(newEvent)
  await saveDb(db)
  await logActivity('Event Created', `Event "${title}" added to calendar`)

  revalidatePath('/events')
  revalidatePath('/admin')
  revalidatePath('/admin/events')
  revalidatePath('/')
  return { success: true, event: newEvent }
}

export async function updateEvent(formData: FormData) {
  const db = await getDb()
  const id = formData.get('id')?.toString()
  if (!id) throw new Error('Event ID is required')

  const index = db.events.findIndex(e => e.id === id)
  if (index === -1) throw new Error('Event not found')

  const title = formData.get('title')?.toString().trim() || db.events[index].title

  db.events[index] = {
    ...db.events[index],
    title,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    date: formData.get('date')?.toString() || db.events[index].date,
    endDate: formData.get('endDate')?.toString() || db.events[index].endDate,
    location: formData.get('location')?.toString() || db.events[index].location,
    description: formData.get('description')?.toString() || db.events[index].description,
    image: formData.get('image')?.toString() || db.events[index].image,
    status: (formData.get('status')?.toString() as any) || db.events[index].status
  }

  await saveDb(db)
  await logActivity('Event Updated', `Event "${title}" modified`)

  revalidatePath('/events')
  revalidatePath('/admin')
  revalidatePath('/admin/events')
  revalidatePath('/')
  return { success: true }
}

export async function deleteEvent(id: string) {
  const db = await getDb()
  const event = db.events.find(e => e.id === id)
  db.events = db.events.filter(e => e.id !== id)
  await saveDb(db)
  await logActivity('Event Deleted', `Event "${event?.title || id}" deleted`)

  revalidatePath('/events')
  revalidatePath('/admin')
  revalidatePath('/admin/events')
  revalidatePath('/')
  return { success: true }
}

/* =========================================================================
   MALL SETTINGS & GENERAL INFO
========================================================================= */

export async function updateMallSettings(formData: FormData) {
  const db = await getDb()
  db.mallInfo = {
    name: formData.get('name')?.toString() || db.mallInfo.name,
    tagline: formData.get('tagline')?.toString() || db.mallInfo.tagline,
    phone: formData.get('phone')?.toString() || db.mallInfo.phone,
    email: formData.get('email')?.toString() || db.mallInfo.email,
    address: formData.get('address')?.toString() || db.mallInfo.address,
    workingHours: formData.get('workingHours')?.toString() || db.mallInfo.workingHours,
    announcement: {
      enabled: formData.get('announcementEnabled') === 'on' || formData.get('announcementEnabled') === 'true',
      text: formData.get('announcementText')?.toString() || db.mallInfo.announcement.text,
      type: formData.get('announcementType')?.toString() || 'info'
    }
  }

  await saveDb(db)
  await logActivity('Mall Info Updated', 'Mall general contact & announcements updated')

  revalidatePath('/admin')
  revalidatePath('/admin/settings')
  revalidatePath('/')
  return { success: true }
}

/* =========================================================================
   RESET / RESTORE DATA
========================================================================= */

export async function resetDatabaseToDefaults() {
  // Can restore or clean if needed
  revalidatePath('/admin')
  revalidatePath('/')
  return { success: true }
}
