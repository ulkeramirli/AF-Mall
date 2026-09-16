'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Plus, Minus, X, ChevronDown, ChevronUp } from 'lucide-react'

export default function MapFullPage() {
  const [activeFloor, setActiveFloor] = useState('1')
  const [zoom, setZoom] = useState(1)
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Mağaza')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const floors = ['B1', '1', '2', '3', '4', '5']
  
  const categories = [
    { name: 'Mağaza', items: ['Zara', 'Mango', 'Nike', 'Apple Store'] },
    { name: 'Restoran', items: ['Starbucks', 'McDonalds', 'Baku Cafe'] },
    { name: 'Əyləncə', items: ['CinemaPlus', 'Sky Park'] }
  ]

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2.5))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5))

  const toggleCategory = (name: string) => {
    setExpandedCategory(prev => prev === name ? null : name)
  }

  return (
    <div className="flex h-screen w-full bg-[#f0f2f5] overflow-hidden font-sans">
      
      {/* LEFT SIDEBAR (White) */}
      <aside className={`w-full md:w-[350px] bg-white h-full flex flex-col shadow-2xl z-40 absolute md:relative transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 overflow-hidden`}>
        <div className="p-6 md:p-8 flex-1 overflow-y-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-blue-900 flex items-center justify-center text-white font-black text-xl rounded-sm">
              AF
            </div>
            <span className="font-bold text-2xl text-blue-900 tracking-wide">
              MALL
            </span>
          </Link>

          {/* Search */}
          <div className="relative mb-8">
            <input 
              type="text" 
              placeholder="Brend üzrə axtarış" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-b-2 border-slate-200 py-2 pr-8 text-slate-700 focus:outline-none focus:border-blue-900 transition-colors bg-transparent"
            />
            <Search className="w-5 h-5 text-slate-400 absolute right-0 top-2.5" />
          </div>

          {/* Categories Accordion */}
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category.name} className="border-b border-slate-100">
                <button 
                  onClick={() => toggleCategory(category.name)}
                  className="w-full flex items-center justify-between py-4 text-left font-bold text-lg text-slate-800 hover:text-blue-900 transition-colors"
                >
                  {category.name}
                  {expandedCategory === category.name ? (
                    <Minus className="w-5 h-5 text-slate-400" />
                  ) : (
                    <Plus className="w-5 h-5 text-slate-400" />
                  )}
                </button>
                
                {/* Accordion Content */}
                {expandedCategory === category.name && (
                  <div className="pb-4 pt-1 space-y-3 px-2">
                    {category.items.map(item => (
                      <div key={item} className="text-slate-600 hover:text-blue-900 cursor-pointer transition-colors">
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile Close Button - Only visible on small screens to close sidebar */}
        <div className="md:hidden p-4 border-t border-slate-100 bg-white">
           <button onClick={() => setIsSidebarOpen(false)} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold flex justify-center items-center">
             Xəritəyə bax
           </button>
        </div>
      </aside>

      {/* Mobile Sidebar Toggle Button */}
      {!isSidebarOpen && (
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden absolute top-6 left-6 z-30 bg-white p-3 rounded-full shadow-md text-blue-900"
        >
          <Search className="w-6 h-6" />
        </button>
      )}

      {/* MAIN MAP AREA */}
      <main className="flex-1 relative flex items-center justify-center overflow-hidden">
        
        {/* Top Right Close Button */}
        <div className="absolute top-6 right-6 z-30 hidden md:block">
          <Link href="/" className="bg-white hover:bg-slate-50 text-slate-800 font-bold px-6 py-3 rounded-full shadow-md flex items-center gap-2 transition-transform hover:scale-105">
            Bağla <X className="w-5 h-5" />
          </Link>
        </div>

        {/* Floor Selector (Left Floating) */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3">
          {floors.map(floor => (
            <button
              key={floor}
              onClick={() => setActiveFloor(floor)}
              className={`w-12 h-12 rounded-full font-bold text-lg flex items-center justify-center transition-all duration-300 shadow-sm ${
                activeFloor === floor 
                  ? 'bg-blue-900 text-white scale-110 shadow-lg' 
                  : 'bg-white text-blue-900 hover:bg-slate-100'
              }`}
            >
              {floor}
            </button>
          ))}
        </div>

        {/* Zoom Controls (Right Floating) */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4">
          <button 
            onClick={handleZoomIn}
            className="w-12 h-12 bg-white text-blue-900 rounded-full flex items-center justify-center shadow-md hover:bg-slate-50 transition-colors"
          >
            <Plus className="w-6 h-6" />
          </button>
          <button 
            onClick={handleZoomOut}
            className="w-12 h-12 bg-white text-blue-900 rounded-full flex items-center justify-center shadow-md hover:bg-slate-50 transition-colors"
          >
            <Minus className="w-6 h-6" />
          </button>
        </div>

        {/* Map Container (Interactive SVG) */}
        <div 
          className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* Background Star Shape (like Deniz Mall) */}
          <div className="absolute w-[800px] h-[800px] opacity-20 flex items-center justify-center pointer-events-none">
             <svg viewBox="0 0 100 100" className="w-full h-full fill-slate-300">
               {/* An 8-pointed star roughly mimicking the mall shape */}
               <polygon points="50,5 60,35 90,35 65,55 75,85 50,65 25,85 35,55 10,35 40,35" rx="5" ry="5" strokeLinejoin="round" />
             </svg>
          </div>

          {/* Store Blocks Overlay */}
          <div className="relative z-10 w-[600px] h-[600px]">
            <svg viewBox="0 0 800 800" className="w-full h-full drop-shadow-xl">
               <g className="transition-all duration-300">
                 {/* Center Atrium */}
                 <circle cx="400" cy="400" r="80" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
                 <circle cx="400" cy="400" r="50" fill="#ffffff" />
                 <text x="400" y="405" textAnchor="middle" className="text-xs fill-slate-400 font-bold">ATRIUM</text>

                 {/* Top Wing */}
                 <path d="M 330 290 L 330 150 L 470 150 L 470 290 Q 400 310 330 290 Z" fill="#4f46e5" className="hover:fill-blue-700 cursor-pointer transition-colors" />
                 <text x="400" y="220" textAnchor="middle" fill="white" className="font-bold text-sm pointer-events-none">FASHION</text>

                 {/* Right Wing */}
                 <path d="M 510 330 L 650 330 L 650 470 L 510 470 Q 490 400 510 330 Z" fill="#4338ca" className="hover:fill-blue-700 cursor-pointer transition-colors" />
                 <text x="580" y="405" textAnchor="middle" fill="white" className="font-bold text-sm pointer-events-none">ELECTRONICS</text>

                 {/* Bottom Wing */}
                 <path d="M 330 510 L 330 650 L 470 650 L 470 510 Q 400 490 330 510 Z" fill="#3730a3" className="hover:fill-blue-700 cursor-pointer transition-colors" />
                 <text x="400" y="585" textAnchor="middle" fill="white" className="font-bold text-sm pointer-events-none">DINING</text>

                 {/* Left Wing */}
                 <path d="M 290 330 L 150 330 L 150 470 L 290 470 Q 310 400 290 330 Z" fill="#312e81" className="hover:fill-blue-700 cursor-pointer transition-colors" />
                 <text x="220" y="405" textAnchor="middle" fill="white" className="font-bold text-sm pointer-events-none">BEAUTY</text>

                 {/* Corridors / Small stores */}
                 <rect x="360" y="320" width="80" height="20" fill="#94a3b8" />
                 <rect x="360" y="460" width="80" height="20" fill="#94a3b8" />
                 <rect x="320" y="360" width="20" height="80" fill="#94a3b8" />
                 <rect x="460" y="360" width="20" height="80" fill="#94a3b8" />
               </g>
            </svg>
          </div>
        </div>

      </main>

    </div>
  )
}
