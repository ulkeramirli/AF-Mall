import { getDb } from '@/lib/actions'
import { VacanciesManager } from '@/components/admin/VacanciesManager'

export const dynamic = 'force-dynamic'

export default async function AdminVacanciesPage() {
  const db = await getDb()
  const vacancies = db.vacancies || []

  return (
    <VacanciesManager initialVacancies={vacancies} />
  )
}
