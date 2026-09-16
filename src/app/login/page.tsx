'use client'

import { useActionState } from 'react'
import { authenticate } from './actions'
import { ShoppingBag, Lock, Mail, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    null
  )

  return (
    <div className="min-h-screen flex bg-slate-900">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-16">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&q=80" alt="Mall" className="w-full h-full object-cover opacity-40 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/80 to-transparent" />
        </div>
        
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 font-black text-3xl tracking-tighter text-white">
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-slate-900" />
            </div>
            AF Mall
          </Link>
        </div>

        <div className="relative z-10">
          <h1 className="text-5xl font-black text-white leading-tight mb-6 tracking-tight">Manage the <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Extraordinary</span></h1>
          <p className="text-lg text-slate-300 max-w-md">Access the centralized administration portal to manage stores, categories, and events for AF Mall.</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8 sm:p-12 lg:p-24 relative rounded-l-[3rem] shadow-[-20px_0_40px_rgba(0,0,0,0.2)]">
        <div className="max-w-md w-full">
          <div className="text-center lg:text-left mb-10">
            <div className="lg:hidden flex justify-center mb-8">
              <Link href="/" className="inline-flex items-center gap-3 font-black text-3xl tracking-tighter text-slate-900">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                AF Mall
              </Link>
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h2>
            <p className="text-slate-500">Sign in to the admin portal.</p>
          </div>
          
          <form className="space-y-6" action={formAction}>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Email address</label>
                <div className="relative group">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-red-600 transition-colors" />
                  <input
                    name="email"
                    type="email"
                    required
                    className="pl-12 w-full rounded-2xl bg-slate-50 border-none px-4 py-4 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-red-600 transition-all placeholder:font-normal placeholder:text-slate-400"
                    placeholder="admin@afmall.az"
                    defaultValue="admin@afmall.az"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide flex justify-between">
                  <span>Password</span>
                  <a href="#" className="text-red-700 hover:text-red-600 normal-case tracking-normal text-xs">Forgot?</a>
                </label>
                <div className="relative group">
                  <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-red-600 transition-colors" />
                  <input
                    name="password"
                    type="password"
                    required
                    className="pl-12 w-full rounded-2xl bg-slate-50 border-none px-4 py-4 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-red-600 transition-all placeholder:font-normal placeholder:text-slate-400"
                    placeholder="••••••••"
                    defaultValue="password123"
                  />
                </div>
              </div>
            </div>

            {errorMessage && typeof errorMessage === 'string' && (
              <div className="text-red-500 text-sm text-center bg-red-50 p-4 rounded-xl font-medium">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-2xl shadow-xl shadow-red-600/20 text-base font-bold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isPending ? 'Signing in...' : 'Sign In to Dashboard'}
              {!isPending && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
