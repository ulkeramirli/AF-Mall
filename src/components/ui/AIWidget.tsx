'use client'

import { useState, useRef, useEffect } from 'react'
import { Sparkles, X, Send, Bot } from 'lucide-react'
import { stores, events, vacancies } from '@/lib/mockData'
import { useLanguage } from '@/context/LanguageContext'
import { useTranslation } from '@/lib/i18n'

export function AIWidget() {
  const { lang } = useLanguage()
  const t = useTranslation(lang).ai

  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: t.greeting, sender: 'bot' }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Update greeting when language changes
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

  const getAIResponse = (text: string, currentLang: string) => {
    const lower = text.toLowerCase()
    
    // Responses dictionary
    const responses = {
      AZ: {
        greeting: "Salam! Sizə necə kömək edə bilərəm?",
        storeFound: (name: string, floor: string, zone: string) => `Bəli, bizdə ${name} var! Onu ${floor}-ci mərtəbədə, ${zone} zonasında tapa bilərsiniz.`,
        food: "Əgər yemək və ya içki axtarırsınızsa, 1-ci mərtəbədə Starbucks və digər möhtəşəm kafelərimiz var.",
        fashion: "Geyim və moda üçün Zara və Nike AF Mall-da çox populyar seçimlərdir.",
        tech: "2-ci mərtəbədəki Apple Store-da ən son elektronika və smartfonları tapa bilərsiniz.",
        events: (eventsStr: string) => `Qarşıdan gələn maraqlı tədbirlərimiz var: ${eventsStr}. Tarixlər və detallar üçün Tədbirlər səhifəsinə baxın!`,
        jobsActive: (pos: string, store: string) => `Bəli, işçilər axtarırıq! Məsələn: ${store} mağazasında ${pos}. Müraciət etmək üçün Karyera səhifəmizə daxil olun.`,
        jobsEmpty: "Ən son iş imkanları üçün Karyera səhifəmizi yoxlayın.",
        leasing: "İcarəyə verilən mağaza və restoran sahələrimiz var! Zəhmət olmasa İcarə səhifəmizə daxil olun və ya leasing@af-mall.com ilə əlaqə saxlayın.",
        fallback: "Bu maraqlı səslənir! Bütün mağaza və restoranları kəşf etmək üçün Kataloqumuza baxmağı tövsiyə edirəm. Başqa nə isə tapmaqda sizə kömək edə bilərəm?"
      },
      EN: {
        greeting: "Hello! How can I help you today?",
        storeFound: (name: string, floor: string, zone: string) => `Yes, we have ${name}! You can find it on Floor ${floor}, Zone ${zone}.`,
        food: "If you're looking for food or drinks, we have Starbucks and other great cafes on the 1st floor.",
        fashion: "For fashion and clothing, Zara and Nike are very popular choices here at AF Mall.",
        tech: "The Apple Store on Floor 2 has the latest electronics and smartphones.",
        events: (eventsStr: string) => `We have some exciting events coming up: ${eventsStr}. Check the Events page for dates and details!`,
        jobsActive: (pos: string, store: string) => `Yes, we are hiring! For example: ${pos} at ${store}. Visit our Careers page to apply.`,
        jobsEmpty: "Please check our Careers page for the latest job opportunities.",
        leasing: "We have available retail and restaurant spaces for rent! Please visit our Leasing page or contact leasing@af-mall.com.",
        fallback: "That sounds interesting! I recommend checking out our Directory to explore all stores and restaurants. Can I help you find anything else?"
      },
      RU: {
        greeting: "Здравствуйте! Чем я могу вам помочь сегодня?",
        storeFound: (name: string, floor: string, zone: string) => `Да, у нас есть ${name}! Вы можете найти его на ${floor} этаже, зона ${zone}.`,
        food: "Если вы ищете еду или напитки, на 1 этаже есть Starbucks и другие отличные кафе.",
        fashion: "Для моды и одежды Zara и Nike — очень популярные выборы в AF Mall.",
        tech: "В Apple Store на 2 этаже представлены новейшие электронные устройства и смартфоны.",
        events: (eventsStr: string) => `У нас намечаются интересные события: ${eventsStr}. Загляните на страницу Событий для дат и подробностей!`,
        jobsActive: (pos: string, store: string) => `Да, мы нанимаем! Например: ${pos} в ${store}. Посетите нашу страницу Вакансий, чтобы подать заявку.`,
        jobsEmpty: "Пожалуйста, проверьте нашу страницу Вакансий для поиска последних предложений о работе.",
        leasing: "У нас есть свободные площади для магазинов и ресторанов! Пожалуйста, посетите страницу Аренды или свяжитесь с leasing@af-mall.com.",
        fallback: "Звучит интересно! Я рекомендую заглянуть в наш Каталог, чтобы изучить все магазины и рестораны. Могу ли я помочь вам найти что-то еще?"
      }
    };

    const res = responses[currentLang as keyof typeof responses] || responses.EN;

    // Greetings
    if (lower.includes('hi') || lower.includes('hello') || lower.includes('salam') || lower.includes('privet') || lower.includes('здравствуй') || lower.includes('привет') || lower.includes('hey')) {
      return res.greeting
    }

    // Specific stores
    const foundStore = stores.find(s => lower.includes(s.name.toLowerCase()))
    if (foundStore) {
      return res.storeFound(foundStore.name, foundStore.floor, foundStore.location || 'A');
    }

    // Categories
    if (lower.includes('food') || lower.includes('eat') || lower.includes('restaurant') || lower.includes('coffee') || lower.includes('yemək') || lower.includes('kafe') || lower.includes('еда') || lower.includes('кофе') || lower.includes('ресторан')) {
      return res.food;
    }
    if (lower.includes('clothes') || lower.includes('fashion') || lower.includes('wear') || lower.includes('shoes') || lower.includes('geyim') || lower.includes('paltar') || lower.includes('одежда') || lower.includes('обувь')) {
      return res.fashion;
    }
    if (lower.includes('phone') || lower.includes('electronics') || lower.includes('apple') || lower.includes('telefon') || lower.includes('elektronika') || lower.includes('телефон')) {
      return res.tech;
    }

    // Events
    if (lower.includes('event') || lower.includes('show') || lower.includes('tədbir') || lower.includes('konsert') || lower.includes('событие') || lower.includes('шоу')) {
      const upcoming = events.map(e => e.title).join(', ')
      return res.events(upcoming);
    }

    // Vacancies
    if (lower.includes('job') || lower.includes('career') || lower.includes('vacancy') || lower.includes('work') || lower.includes('iş') || lower.includes('vakansiya') || lower.includes('работа') || lower.includes('вакансия')) {
      const activeJobs = vacancies.filter(v => v.status === 'Active')
      if (activeJobs.length > 0) {
        return res.jobsActive(activeJobs[0].position, activeJobs[0].storeName);
      }
      return res.jobsEmpty;
    }

    // Leasing
    if (lower.includes('rent') || lower.includes('lease') || lower.includes('premise') || lower.includes('space') || lower.includes('icarə') || lower.includes('obyekt') || lower.includes('аренда') || lower.includes('помещение')) {
      return res.leasing;
    }

    // Fallback
    return res.fallback;
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
          text: getAIResponse(userText, lang), 
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
            placeholder={t.placeholder} 
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
