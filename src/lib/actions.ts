'use server'

import fs from 'fs/promises'
import path from 'path'
import { revalidatePath } from 'next/cache'

const DB_PATH = path.join(process.cwd(), 'data', 'db.json')

export async function getDb() {
  const file = await fs.readFile(DB_PATH, 'utf8')
  return JSON.parse(file)
}

export async function saveDb(data: any) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2))
}

// Stores
export async function addStore(formData: FormData) {
  const db = await getDb()
  const newStore = {
    id: Date.now().toString(),
    name: formData.get('name'),
    slug: formData.get('name')?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    categoryId: formData.get('categoryId'),
    floor: formData.get('floor'),
    location: formData.get('location'),
    description: formData.get('description'),
    logo: formData.get('logo'),
    image: formData.get('image') || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=600&fit=crop'
  }
  db.stores.push(newStore)
  await saveDb(db)
  revalidatePath('/stores')
  revalidatePath('/admin')
  revalidatePath('/')
  return { success: true }
}

export async function deleteStore(id: string) {
  const db = await getDb()
  db.stores = db.stores.filter((s: any) => s.id !== id)
  await saveDb(db)
  revalidatePath('/stores')
  revalidatePath('/admin')
  revalidatePath('/')
  return { success: true }
}

// Vacancies
export async function addVacancy(formData: FormData) {
  const db = await getDb()
  const newVacancy = {
    id: Date.now().toString(),
    storeName: formData.get('storeName'),
    position: formData.get('position'),
    type: formData.get('type'),
    status: 'Active',
    postedDate: new Date().toISOString().split('T')[0]
  }
  db.vacancies.push(newVacancy)
  await saveDb(db)
  revalidatePath('/admin/vacancies')
  return { success: true }
}

export async function deleteVacancy(id: string) {
  const db = await getDb()
  db.vacancies = db.vacancies.filter((v: any) => v.id !== id)
  await saveDb(db)
  revalidatePath('/admin/vacancies')
  return { success: true }
}

// Premises (Offices)
export async function addPremise(formData: FormData) {
  const db = await getDb()
  const newPremise = {
    id: 'P' + Math.floor(Math.random() * 1000),
    floor: formData.get('floor'),
    area: formData.get('area'),
    type: formData.get('type'),
    status: 'Available',
    tenant: null,
    price: formData.get('price')
  }
  db.premises.push(newPremise)
  await saveDb(db)
  revalidatePath('/admin/premises')
  return { success: true }
}

export async function deletePremise(id: string) {
  const db = await getDb()
  db.premises = db.premises.filter((p: any) => p.id !== id)
  await saveDb(db)
  revalidatePath('/admin/premises')
  return { success: true }
}
