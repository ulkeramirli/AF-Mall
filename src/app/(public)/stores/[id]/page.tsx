import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { MapPin, ChevronRight, Clock, Phone, Globe, Share2 } from "lucide-react"
import { stores as allStores, categories } from "@/lib/mockData"

type Props = {
  params: Promise<{ id: string }>
}

export default async function StorePage({ params }: Props) {
  const resolvedParams = await params
  const store = allStores.find(s => s.id === resolvedParams.id);
  
  if (!store) {
    notFound()
  }
  
  const category = categories.find(c => c.id === store.categoryId);

  return (
    <div className="bg-slate-50 min-h-screen pb-32 font-sans">
      
      {/* Hero Image Header */}
      <div className="relative w-full h-[50vh] min-h-[400px] bg-slate-900">
        {store.image ? (
          <Image 
            src={store.image} 
            alt={store.name} 
            fill 
            className="object-cover opacity-70"
            priority 
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-slate-800 to-slate-900"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="flex items-center gap-8">
              {/* Logo Box */}
              <div className="w-32 h-32 md:w-48 md:h-48 bg-white rounded-3xl shadow-2xl flex items-center justify-center p-4 overflow-hidden relative border-4 border-white/20 backdrop-blur-md">
                {store.logo ? (
                  <Image src={store.logo} alt={`${store.name} logo`} fill className="object-contain p-4" />
                ) : (
                  <span className="text-5xl font-black text-slate-300">{store.name[0]}</span>
                )}
              </div>
              
              <div className="pb-4">
                <div className="flex items-center gap-2 text-sm text-slate-300 mb-3 tracking-widest uppercase font-semibold">
                  <Link href="/" className="hover:text-white transition-colors">Home</Link>
                  <ChevronRight className="w-4 h-4" />
                  <Link href="/stores" className="hover:text-white transition-colors">Brands</Link>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-red-400">{store.name}</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-2">{store.name}</h1>
                <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-1 rounded-full text-sm font-bold shadow-inner">
                  {category?.name}
                </span>
              </div>
            </div>
            
            <div className="pb-4 flex gap-4">
               <button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white flex items-center justify-center transition-all border border-white/10">
                 <Share2 className="w-5 h-5" />
               </button>
               <Link href="/map" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-red-600/30 flex items-center gap-2">
                 <MapPin className="w-5 h-5" /> View on Map
               </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Details */}
          <div className="lg:w-2/3">
             <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
               <h2 className="text-2xl font-bold text-slate-900 mb-6">About {store.name}</h2>
               <p className="text-slate-600 leading-relaxed text-lg mb-8">
                 {store.description} Discover exclusive collections and a premium shopping experience tailored just for you. Visit us on level {store.floor} to explore the latest trends and unparalleled service.
               </p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-100 pt-8">
                 {/* Gallery / Highlights could go here */}
                 <div className="rounded-2xl overflow-hidden aspect-video relative bg-slate-100">
                   <Image src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80" alt="Store interior 1" fill className="object-cover" />
                 </div>
                 <div className="rounded-2xl overflow-hidden aspect-video relative bg-slate-100">
                   <Image src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80" alt="Store interior 2" fill className="object-cover" />
                 </div>
               </div>
             </div>
          </div>
          
          {/* Right Column: Info Card */}
          <div className="lg:w-1/3">
             <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-32">
                <h3 className="font-bold text-slate-900 text-xl mb-6">Store Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Location</p>
                      <p className="text-slate-600">Level {store.floor}, Zone {store.location || 'A'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-slate-50 text-slate-700 rounded-full flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Opening Hours</p>
                      <p className="text-slate-600">10:00 AM - 10:00 PM</p>
                      <p className="text-sm text-green-600 font-bold mt-1">Open Now</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-slate-50 text-slate-700 rounded-full flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Contact</p>
                      <p className="text-slate-600">+994 12 345 67 89</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-slate-50 text-slate-700 rounded-full flex items-center justify-center shrink-0">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Website</p>
                      <a href="#" className="text-blue-600 hover:underline">www.{store.slug}.com</a>
                    </div>
                  </div>
                </div>
             </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
