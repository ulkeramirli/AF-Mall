'use client'

import { useState, useRef, useEffect } from 'react'
import { Sparkles, X, Send, Bot } from 'lucide-react'
import { stores, events, vacancies } from '@/lib/mockData'

export function AIWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I am your AF AI Concierge. How can I help you discover the perfect store or event today?', sender: 'bot' }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const getAIResponse = (text: string) => {
    const lower = text.toLowerCase()
    
    // Greetings
    if (lower.includes('hi') || lower.includes('hello') || lower.includes('salam')) {
      return "Hello! How can I help you today?"
    }

    // Specific stores
    const foundStore = stores.find(s => lower.includes(s.name.toLowerCase()))
    if (foundStore) {
      return `Yes, we have ${foundStore.name}! You can find it on Floor ${foundStore.floor}, Zone ${foundStore.location}.`
    }

    // Categories
    if (lower.includes('food') || lower.includes('eat') || lower.includes('restaurant') || lower.includes('coffee')) {
      return "If you're looking for food or drinks, we have Starbucks and other great cafes on the 1st floor."
    }
    if (lower.includes('clothes') || lower.includes('fashion') || lower.includes('wear') || lower.includes('shoes')) {
      return "For fashion and clothing, Zara and Nike are very popular choices here at AF Mall."
    }
    if (lower.includes('phone') || lower.includes('electronics') || lower.includes('apple')) {
      return "The Apple Store on Floor 2 has the latest electronics and smartphones."
    }

    // Events
    if (lower.includes('event') || lower.includes('show') || lower.includes('happening')) {
      const upcoming = events.map(e => e.title).join(' and ')
      return `We have some exciting events coming up: ${upcoming}. Check the Events page for dates and details!`
    }

    // Vacancies
    if (lower.includes('job') || lower.includes('career') || lower.includes('vacancy') || lower.includes('work') || lower.includes('hiring')) {
      const activeJobs = vacancies.filter(v => v.status === 'Active')
      if (activeJobs.length > 0) {
        return `Yes, we are hiring! For example: ${activeJobs[0].position} at ${activeJobs[0].storeName}. Visit our Careers page to apply.`
      }
      return "Please check our Careers page for the latest job opportunities."
    }

    // Leasing
    if (lower.includes('rent') || lower.includes('lease') || lower.includes('premise') || lower.includes('space')) {
      return "We have available retail and restaurant spaces for rent! Please visit our Leasing page or contact leasing@af-mall.com."
    }

    // Fallback
    return "That sounds interesting! I recommend checking out our Directory to explore all stores and restaurants. Can I help you find anything else?"
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userText = input.trim()
    const newMessages = [
      ...messages,
      { id: Date.now(), text: userText, sender: 'user' }
    ]
    setMessages(newMessages)
    setInput('')

    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { 
          id: Date.now() + 1, 
          text: getAIResponse(userText), 
          sender: 'bot' 
        }
      ])
    }, 800)
  }

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-linear-to-r from-red-600 to-orange-500 text-white shadow-2xl hover:scale-110 transition-transform duration-300 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <Sparkles className="w-6 h-6 animate-pulse" />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 z-50 w-[350px] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden transition-all duration-500 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
        style={{ height: '500px' }}
      >
        {/* Header */}
        <div className="bg-linear-to-r from-slate-900 to-slate-800 p-4 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm">AF Smart Concierge</h3>
              <p className="text-xs text-slate-300">Powered by AI</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4 flex flex-col">
          {messages.map(msg => (
            <div 
              key={msg.id} 
              className={`max-w-[80%] rounded-2xl p-3 text-sm shadow-sm ${
                msg.sender === 'user' 
                  ? 'bg-red-600 text-white self-end rounded-tr-sm' 
                  : 'bg-white border border-slate-200 text-slate-700 self-start rounded-tl-sm'
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex gap-2 shrink-0">
          <input 
            type="text" 
            placeholder="Ask anything..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
          />
          <button 
            type="submit" 
            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors flex shrink-0 items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </>
  )
}
