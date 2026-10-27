import { NextResponse } from 'next/server'
import { getDb } from '@/lib/actions'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const db = await getDb()
    return NextResponse.json({
      categories: db.categories,
      stores: db.stores,
      events: db.events,
      vacancies: db.vacancies,
      premises: db.premises,
      mallInfo: db.mallInfo
    }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to read database' }, { status: 500 })
  }
}
