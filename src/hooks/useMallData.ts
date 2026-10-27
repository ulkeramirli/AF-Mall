'use client'

import { useState, useEffect } from 'react'
import { 
  stores as initialStores, 
  categories as initialCategories, 
  events as initialEvents, 
  vacancies as initialVacancies, 
  premises as initialPremises 
} from '@/lib/mockData'
import { Store, Category, Event as MallEvent, Vacancy, Premise, MallSettings } from '@/types'

export function useMallData() {
  const [stores, setStores] = useState<Store[]>(initialStores)
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [events, setEvents] = useState<MallEvent[]>(initialEvents)
  const [vacancies, setVacancies] = useState<Vacancy[]>(initialVacancies)
  const [premises, setPremises] = useState<Premise[]>(initialPremises)
  const [mallInfo, setMallInfo] = useState<MallSettings | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true
    fetch('/api/data', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return
        if (data.stores) setStores(data.stores)
        if (data.categories) setCategories(data.categories)
        if (data.events) setEvents(data.events)
        if (data.vacancies) setVacancies(data.vacancies)
        if (data.premises) setPremises(data.premises)
        if (data.mallInfo) setMallInfo(data.mallInfo)
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  return {
    stores,
    categories,
    events,
    vacancies,
    premises,
    mallInfo,
    loading
  }
}
