import { Calendar, Tag, MapPin } from 'lucide-react'
import { events } from '@/lib/mockData'

export default function EventsPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="bg-red-600 py-32 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=80')] opacity-20 mix-blend-overlay bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/50 to-red-600/90" />
        <div className="relative z-10 max-w-3xl mx-auto mt-10">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-8 border border-white/30">
             <Tag className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-lg">Offers & Events</h1>
          <p className="text-xl text-red-100 font-medium drop-shadow-md">Don't miss out on the latest promotions, sales, and entertainment events happening at AF Mall.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-[-4rem] relative z-20 max-w-5xl">
        <div className="space-y-10">
          {events.map((event) => (
            <div key={event.id} className="flex flex-col md:flex-row bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden group hover:shadow-2xl transition-all">
              {event.image && (
                <div className="w-full md:w-5/12 h-72 md:h-auto shrink-0 relative overflow-hidden">
                  <img src={event.image} alt={event.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
              )}
              <div className="p-10 flex flex-col justify-center flex-1">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                   <div className="flex items-center gap-2 text-red-600 font-bold text-sm bg-red-50 px-4 py-2 rounded-full">
                     <Calendar className="w-4 h-4" />
                     {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                   </div>
                   {event.location && (
                     <div className="flex items-center gap-2 text-red-700 font-bold text-sm bg-red-50 px-4 py-2 rounded-full">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                     </div>
                   )}
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4">{event.title}</h3>
                <p className="text-slate-600 leading-relaxed text-lg">{event.description}</p>
                
                <div className="mt-8 pt-8 border-t border-slate-100">
                   <button className="bg-slate-900 text-white font-bold py-3 px-8 rounded-full hover:bg-slate-800 transition-colors w-full md:w-auto">
                     Add to Calendar
                   </button>
                </div>
              </div>
            </div>
          ))}
          
          {events.length === 0 && (
            <div className="text-center py-32 bg-white rounded-[2rem] border border-dashed border-slate-300 shadow-sm">
              <p className="text-slate-500 text-lg">No upcoming events at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
