export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="relative w-24 h-24">
       
        <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
        
        <div className="absolute inset-0 rounded-full border-4 border-red-600 border-t-transparent animate-spin"></div>
       
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-black text-red-600 text-lg">AF</span>
        </div>
      </div>
    </div>
  )
}
