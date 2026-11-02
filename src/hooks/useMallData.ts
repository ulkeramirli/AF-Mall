'use client'

import { useState, useEffect, useCallback } from 'react'
import { 
  stores as initialStores, 
  categories as initialCategories, 
  events as initialEvents, 
  vacancies as initialVacancies, 
  premises as initialPremises 
} from '@/lib/mockData'
import { Store, Category, Event as MallEvent, Vacancy, Premise, MallSettings, LeasingInquiry, JobApplication } from '@/types'

export function useMallData() {
  const [stores, setStores] = useState<Store[]>(initialStores)
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [events, setEvents] = useState<MallEvent[]>(initialEvents)
  const [vacancies, setVacancies] = useState<Vacancy[]>(initialVacancies)
  const [premises, setPremises] = useState<Premise[]>(initialPremises)
  const [leasingInquiries, setLeasingInquiries] = useState<LeasingInquiry[]>([])
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([])
  const [mallInfo, setMallInfo] = useState<MallSettings | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/data', { cache: 'no-store' })
      const data = await res.json()
      if (data.stores) setStores(data.stores)
      if (data.categories) setCategories(data.categories)
      if (data.events) setEvents(data.events)
      if (data.vacancies) setVacancies(data.vacancies)
      if (data.premises) setPremises(data.premises)
      if (data.leasingInquiries) setLeasingInquiries(data.leasingInquiries)
      if (data.jobApplications) setJobApplications(data.jobApplications)
      if (data.mallInfo) setMallInfo(data.mallInfo)
    } catch (err) {
      console.error('Failed to load mall data:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    stores,
    categories,
    events,
    vacancies,
    premises,
    leasingInquiries,
    jobApplications,
    mallInfo,
    loading,
    refresh: fetchData
  }
}
