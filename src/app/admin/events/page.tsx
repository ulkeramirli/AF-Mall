import { getDb } from '@/lib/actions'
import { EventsManager } from '@/components/admin/EventsManager'

export const dynamic = 'force-dynamic'

export default async function AdminEventsPage() {
  const db = await getDb()
  const events = db.events || []

  return (
    <EventsManager initialEvents={events} />
  )
}
