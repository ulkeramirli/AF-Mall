'use client'

import { useState, useRef, useEffect, useTransition } from 'react'
import { Sparkles, X, Send, Bot, User, MapPin } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useTranslation } from '@/lib/i18n'
import { getAdvancedAIResponse } from '@/lib/actions/chat'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

export function AIWidget() {
  const { lang } = useLanguage()
  const t = useTranslation(lang).ai

  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: t.greeting, sender: 'bot' }
  ])
  const [input, setInput] = useState('')
  const [isPending, startTransition] = useTransition()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const suggestions = {
    AZ: ["Yemək yerləri", "Tədbirlər", "Vakansiyalar", "Mağazalar"],
    EN: ["Find Food", "Upcoming Events", "Job Vacancies", "Stores"],
    RU: ["Где поесть?", "Новые события", "Вакансии", "Магазины"]
  }[lang] || ["Find Food", "Upcoming Events", "Job Vacancies", "Stores"];

  useEffect(() => {
    setMessages(prev => {
      const newMessages = [...prev]
      if (newMessages.length > 0 && newMessages[0].id === 1) {
        newMessages[0].text = t.greeting
      }
      return newMessages
    })
  }, [lang, t.greeting])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendText = (text: string) => {
    if (!text.trim() || isPending) return

    const userText = text.trim()
    const history = messages.filter(m => m.id !== 1).map(m => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }))

    setMessages(prev => [
      ...prev,
      { id: Date.now(), text: userText, sender: 'user' }
    ])
    setInput('')

    startTransition(async () => {
      const result = await getAdvancedAIResponse(userText, lang, history)
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, text: result.text, sender: 'bot' }
      ])
    })
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    sendText(input)
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={clsx(
          "fixed bottom-6 right-6 z-50 p-4 rounded-full bg-linear-to-r from-red-600 to-orange-500 text-white shadow-2xl transition-all duration-500",
          isOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        )}
      >
        <Sparkles className="w-6 h-6 animate-pulse" />
      </motion.button>

      {/* Chat Window */}
      <div 
        className={clsx(
          "fixed bottom-6 right-6 z-50 w-[380px] sm:w-[400px] bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden transition-all duration-500 origin-bottom-right",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        )}
        style={{ height: '600px', maxHeight: '90vh' }}
      >
        {/* Header */}
        <div className="bg-linear-to-r from-slate-900 to-slate-800 p-4 text-white flex justify-between items-center shrink-0 shadow-md z-10 relative">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm relative">
              <Bot className="w-5 h-5 text-white" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-slate-900 rounded-full"></div>
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide flex items-center gap-1">
                AF Smart Concierge
                <Sparkles className="w-3 h-3 text-orange-400" />
              </h3>
              <p className="text-xs text-slate-300 font-medium">Powered by AI</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-5 overflow-y-auto bg-slate-50 space-y-5 flex flex-col scroll-smooth">
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <motion.div 
                key={msg.id} 
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={clsx(
                  "flex gap-3 max-w-[85%]",
                  msg.sender === 'user' ? "self-end flex-row-reverse" : "self-start"
                )}
              >
                {/* Avatar */}
                <div className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                  msg.sender === 'user' ? "bg-slate-200 text-slate-600" : "bg-red-600 text-white"
                )}>
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Bubble */}
                <div 
                  className={clsx(
                    "p-3.5 text-sm shadow-sm leading-relaxed",
                    msg.sender === 'user' 
                      ? 'bg-slate-900 text-white rounded-2xl rounded-tr-sm' 
                      : 'bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-tl-sm'
                  )}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
            
            {/* Loading Indicator */}
            {isPending && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 self-start max-w-[85%]"
              >
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center shrink-0 shadow-sm text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-4 text-sm shadow-sm flex items-center gap-1.5 h-[46px]">
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} className="h-1" />
        </div>

        {/* Suggestions */}
        <div className="px-4 py-3 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
          {suggestions.map((sug, i) => (
            <button
              key={i}
              onClick={() => sendText(sug)}
              disabled={isPending}
              className="whitespace-nowrap px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded-full transition-colors disabled:opacity-50"
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-4 pt-2 bg-white flex gap-2 shrink-0">
          <input 
            type="text" 
            placeholder={t.placeholder} 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isPending}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all disabled:opacity-50"
          />
          <button 
            type="submit" 
            disabled={isPending || !input.trim()}
            className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors flex shrink-0 items-center justify-center disabled:opacity-50 disabled:bg-slate-300 shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </>
  )
}
