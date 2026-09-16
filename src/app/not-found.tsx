import Link from 'next/link'
import { MapPin, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center border border-slate-100">
        <div className="w-24 h-24 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <MapPin className="w-10 h-10" />
        </div>
        
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">404</h1>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Lost in the mall?</h2>
        
        <p className="text-slate-500 mb-8">
          The page you are looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="space-y-3">
          <Link 
            href="/" 
            className="flex items-center justify-center gap-2 w-full py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
          >
            Back to Home
          </Link>
          <Link 
            href="/map" 
            className="flex items-center justify-center gap-2 w-full py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
          >
            <Search className="w-4 h-4" /> Open Mall Map
          </Link>
        </div>
      </div>
    </div>
  )
}
