import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-6 group">
            <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center text-white font-black text-lg tracking-wide">
              AF
            </div>
            <span className="font-bold text-xl tracking-wide text-white uppercase">
              Mall
            </span>
          </div>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            The ultimate premium shopping and entertainment destination in the heart of the city.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/stores" className="hover:text-white transition-colors">All Stores</Link></li>
            <li><Link href="/stores?category=2" className="hover:text-white transition-colors">Dining & Food</Link></li>
            <li><Link href="/events" className="hover:text-white transition-colors">Events & Offers</Link></li>
            <li><Link href="/map" className="hover:text-white transition-colors">Mall Map</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Information</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/leasing" className="hover:text-white transition-colors">Leasing Inquiries</Link></li>
            <li><Link href="/how-to-get" className="hover:text-white transition-colors">How to get here</Link></li>
            <li><Link href="/vacancies" className="hover:text-white transition-colors">Careers</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 shrink-0 text-red-500" />
              <span>123 Shopping Blvd, City Center, Baku, AZ1000</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 shrink-0 text-red-500" />
              <span>+994 12 345 67 89</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 shrink-0 text-red-500" />
              <span>info@afmall.az</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-sm text-center text-slate-500">
        © {new Date().getFullYear()} AF Mall. All rights reserved. Designed for excellence.
      </div>
    </footer>
  )
}
