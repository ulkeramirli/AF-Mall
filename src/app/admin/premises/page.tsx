import { getDb } from '@/lib/actions'
import { PremisesManager } from '@/components/admin/PremisesManager'

export const dynamic = 'force-dynamic'

export default async function AdminPremisesPage() {
  const db = await getDb()
  const premises = db.premises || []

  return (
    <PremisesManager initialPremises={premises} />
  )
}
