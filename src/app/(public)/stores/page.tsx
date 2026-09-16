import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Search, ChevronRight, Star, ArrowUpRight } from 'lucide-react'
import { stores as allStores, categories } from '@/lib/mockData'

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function StoresPage({ searchParams }: Props) {
  const params = await searchParams
  const categoryId = typeof params.category === 'string' ? params.category : undefined
  const q = typeof params.q === 'string' ? params.q : undefined

  let filteredStores = allStores;

  if (categoryId) {
    filteredStores = filteredStores.filter(s => s.categoryId === categoryId);
  }

  if (q) {
    filteredStores = filteredStores.filter(s => s.name.toLowerCase().includes(q.toLowerCase()));
  }

  const storesWithCategories = filteredStores.map(store => ({
    ...store,
    category: categories.find(c => c.id === store.categoryId)
  }));

  const activeCategory = categoryId ? categories.find(c => c.id === categoryId)?.name : 'All Brands';

  return (
    <div className="bg-slate-50 min-h-screen pb-32 font-sans">
      
      {/* Cinematic Header */}
      <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=2000&q=80" 
            alt="Fashion and Shopping" 
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <div className="flex items-center justify-center gap-2 text-sm text-slate-300 mb-4 tracking-widest uppercase font-semibold">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Discover</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-xl">
            {activeCategory}
          </h1>
          <p className="text-lg text-slate-200 max-w-2xl mx-auto">
            Explore world-class boutiques, immersive dining experiences, and premium entertainment.
          </p>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-[80px] z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm py-4">
        <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search for a brand..." 
              className="w-full pl-12 pr-4 py-3 bg-slate-100/50 border border-slate-200 rounded-full text-sm outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all shadow-inner"
              defaultValue={q}
            />
          </div>

          {/* Categories Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            <Link 
              href="/stores"
              className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                !categoryId 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All
            </Link>
            {categories.map(c => (
              <Link 
                key={c.id}
                href={`/stores?category=${c.id}`}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  categoryId === c.id 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>
          
        </div>
      </div>

      {/* Store Grid */}
      <div className="container mx-auto px-4 max-w-7xl mt-16">
        
        {/* Results Info */}
        <div className="flex justify-between items-end mb-8">
          <p className="text-slate-500 font-medium">Showing <span className="text-slate-900 font-bold">{storesWithCategories.length}</span> brands</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {storesWithCategories.map((store, i) => (
            <Link 
              href={`/stores/${store.id}`} 
              key={store.id} 
              className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-[400px]"
            >
              {/* Image Header */}
              <div className="relative h-2/3 bg-slate-100 overflow-hidden">
                {store.image ? (
                  <Image 
                    src={store.image} 
                    alt={store.name} 
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold text-6xl">
                    {store.name[0]}
                  </div>
                )}
                {/* Elegant overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-60 group-hover:opacity-80 transition-opacity"></div>
                
                {/* Floating Tag */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm">
                  {store.category?.name}
                </div>

                {/* Arrow Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              {/* Content Footer */}
              <div className="p-6 relative flex flex-col flex-1 bg-white">
                {/* Logo Overlap */}
                <div className="absolute -top-12 left-6 w-20 h-20 bg-white rounded-2xl shadow-xl border border-slate-100 flex items-center justify-center overflow-hidden p-2 group-hover:-translate-y-2 transition-transform duration-300">
                  {store.logo ? (
                    <Image src={store.logo} alt={`${store.name} logo`} fill className="object-contain p-2" />
                  ) : (
                    <span className="text-2xl font-black text-slate-300">{store.name[0]}</span>
                  )}
                </div>

                <div className="mt-8 flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-2xl text-slate-900 mb-2">{store.name}</h3>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                       <MapPin className="w-4 h-4 text-red-500" />
                       Level {store.floor}
                    </div>
                  </div>
                  {/* Rating / Feature Icon */}
                  <div className="flex items-center gap-1 text-yellow-400 bg-yellow-50 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-bold text-yellow-700">Premium</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {storesWithCategories.length === 0 && (
          <div className="text-center py-32 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No brands found</h3>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">We couldn't find any brands matching your search criteria. Try adjusting your filters.</p>
            <Link href="/stores" className="inline-flex items-center gap-2 bg-red-600 text-white font-bold px-8 py-3 rounded-full hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20">
              Clear all filters
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
