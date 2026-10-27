'use client'

import { Calendar, Tag, MapPin } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useTranslation } from '@/lib/i18n'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useMallData } from '@/hooks/useMallData'

export default function EventsPage() {
  const { lang } = useLanguage()
  const translation = useTranslation(lang)
  const t = translation.home // Fixed: using home instead of hero
  const { events } = useMallData()

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      <section className="bg-slate-900 pt-40 pb-32 text-center px-4 relative overflow-hidden flex items-center justify-center min-h-[400px]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=2400&q=80" 
            alt="Events Background"
            fill
            className="object-cover opacity-30 mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent" />
        </div>
        
        <div className="absolute top-10 left-10 w-96 h-96 bg-red-600/20 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-8 border border-white/20 shadow-xl"
          >
             <Tag className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-lg"
          >
            {t.allEvents}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-slate-300 font-medium drop-shadow-md max-w-2xl mx-auto"
          >
            {t.eventDesc}
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-6 lg:px-8 mt-[-6rem] relative z-20 max-w-5xl">
        <div className="space-y-10">
          {events.map((event, index) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.7 }}
              className="flex flex-col md:flex-row bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden group hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-500"
            >
              {event.image && (
                <div className="w-full md:w-5/12 h-72 md:h-auto shrink-0 relative overflow-hidden bg-slate-100">
                  <Image src={event.image} alt={event.title} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                </div>
              )}
              <div className="p-8 md:p-10 flex flex-col justify-center flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                   <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-wider bg-red-50 px-4 py-2 rounded-xl border border-red-100">
                     <Calendar className="w-4 h-4" />
                     {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                   </div>
                   {event.location && (
                     <div className="flex items-center gap-2 text-slate-600 font-bold text-xs uppercase tracking-wider bg-slate-50 px-4 py-2 rounded-xl border border-slate-200">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                     </div>
                   )}
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 leading-tight group-hover:text-red-600 transition-colors">{event.title}</h3>
                <p className="text-slate-500 leading-relaxed text-lg mb-8">{event.description}</p>
                
                <div className="mt-auto pt-8 border-t border-slate-100">
                   <button className="bg-slate-900 text-white font-bold py-4 px-8 rounded-xl hover:bg-red-600 transition-colors duration-300 w-full md:w-auto shadow-lg shadow-slate-900/20 hover:shadow-red-600/30">
                     Add to Calendar
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
          
          {events.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32 bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm"
            >
              <p className="text-slate-500 text-lg">No upcoming events at the moment. Check back soon!</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
