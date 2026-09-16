'use client'

import { useState } from 'react'
import { Sparkles, X, Send, Bot } from 'lucide-react'

export function AIWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I am your AF AI Concierge. How can I help you discover the perfect store or event today?', sender: 'bot' }
  ])
  const [input, setInput] = useState('')

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMessages = [
      ...messages,
      { id: Date.now(), text: input, sender: 'user' }
    ]
    setMessages(newMessages)
    setInput('')

    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { 
          id: Date.now(), 
          text: "That sounds amazing! I recommend checking out our newly opened 'Premium Fashion' wing on Floor 2. Let me know if you need help finding it on the map!", 
          sender: 'bot' 
        }
      ])
    }, 1000)
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
        className={`fixed bottom-6 right-6 z-50 w-87.5 bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden transition-all duration-500 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
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
