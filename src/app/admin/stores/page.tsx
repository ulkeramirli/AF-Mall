import { getDb } from '@/lib/actions'
import { StoresManager } from '@/components/admin/StoresManager'

export const dynamic = 'force-dynamic'

export default async function AdminStoresPage() {
  const db = await getDb()
  const stores = db.stores || []
  const categories = db.categories || []

  return (
    <StoresManager 
      initialStores={stores} 
      categories={categories} 
    />
  )
}
