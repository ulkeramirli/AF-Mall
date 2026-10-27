import { getDb } from '@/lib/actions'
import { CategoriesManager } from '@/components/admin/CategoriesManager'

export const dynamic = 'force-dynamic'

export default async function AdminCategoriesPage() {
  const db = await getDb()
  const categories = db.categories || []
  const stores = db.stores || []

  return (
    <CategoriesManager
      initialCategories={categories}
      stores={stores}
    />
  )
}
