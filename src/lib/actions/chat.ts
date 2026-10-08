'use server';

import { GoogleGenAI } from '@google/genai';
import { stores, events, vacancies, categories } from '../mockData';

// Initialize the Google Gen AI SDK conditionally to avoid crashes if credentials are completely missing
let ai: GoogleGenAI | null = null;
try {
  ai = new GoogleGenAI();
} catch (e) {
  console.warn("GoogleGenAI init failed. Will use fallback.", e);
}

// Advanced Local Fallback Logic
function getFallbackResponse(message: string, lang: string): string {
  const lower = message.toLowerCase();
  
  // Dictionaries for professional responses
  const t = {
    AZ: {
      greeting: "Salam! Mən AF Mall-un rəqəmsal köməkçisiyəm. Sizə ən yaxşı mağaza və restoranları tapmaqda necə kömək edə bilərəm?",
      storeFound: (s: any, c: any) => `Bəli, ${s.name} AF Mall-da mövcuddur! Bu ${c} mağazasını ${s.floor}-ci mərtəbədə, ${s.location} zonasında tapa bilərsiniz. Əlavə nəsə axtarırsınız?`,
      events: (e: any[]) => `Bizi çox maraqlı tədbirlər gözləyir: ${e.map(x => x.title).join(', ')}. Tədbirlər səhifəsində tarixlərlə tanış ola bilərsiniz!`,
      jobs: (v: any[]) => `Hazırda aktiv vakansiyalarımız var, məsələn: ${v[0].storeName} mağazasında ${v[0].position}. Karyera səhifəmizə daxil olaraq müraciət edə bilərsiniz.`,
      leasing: "İcarəyə verilən ticarət obyektlərimiz mövcuddur. Zəhmət olmasa, ətraflı məlumat üçün İcarə bölməsinə keçin və ya bizimlə əlaqə saxlayın.",
      food: "AF Mall-da müxtəlif zövqlərə uyğun kafelər və restoranlar var. 1-ci mərtəbədə yerləşən Starbucks kimi məkanlarda dincələ bilərsiniz.",
      fashion: "Moda həvəskarları üçün Zara, Nike və bir çox başqa beynəlxalq brendlərimiz mövcuddur. Kataloqa nəzər yetirin!",
      tech: "Ən son texnologiyalar üçün 2-ci mərtəbədəki Apple Store-a baş çəkməyinizi tövsiyə edirəm.",
      fallback: "Təşəkkür edirəm! Sizi daha yaxşı yönləndirmək üçün kataloqumuza nəzər yetirməyi və ya axtardığınız mağazanın adını qeyd etməyinizi xahiş edirəm."
    },
    EN: {
      greeting: "Hello! I am your AF Mall digital assistant. How may I help you find the perfect stores or dining experiences today?",
      storeFound: (s: any, c: any) => `Yes, ${s.name} is available at AF Mall! You can find this ${c} store on Floor ${s.floor}, Zone ${s.location}. Is there anything else you are looking for?`,
      events: (e: any[]) => `We have some fantastic events coming up: ${e.map(x => x.title).join(', ')}. Please check our Events page for exact dates!`,
      jobs: (v: any[]) => `We are actively hiring! For instance, there's an opening for a ${v[0].position} at ${v[0].storeName}. Visit our Careers page to apply.`,
      leasing: "We offer premium retail and restaurant spaces for lease. Please visit our Leasing page or contact our management for details.",
      food: "AF Mall offers a variety of dining experiences. You can enjoy a relaxing break at Starbucks and other cafes on the 1st floor.",
      fashion: "For fashion enthusiasts, we feature international brands like Zara and Nike. Check our directory for the full list!",
      tech: "I highly recommend visiting the Apple Store on the 2nd floor for the latest technology and electronics.",
      fallback: "Thank you for your message! To assist you better, I recommend exploring our Directory or specifying the brand you are looking for."
    },
    RU: {
      greeting: "Здравствуйте! Я цифровой помощник AF Mall. Как я могу помочь вам найти лучшие магазины или рестораны сегодня?",
      storeFound: (s: any, c: any) => `Да, ${s.name} представлен в AF Mall! Вы можете найти этот магазин (${c}) на ${s.floor} этаже, зона ${s.location}. Могу ли я помочь с чем-то еще?`,
      events: (e: any[]) => `У нас ожидаются замечательные события: ${e.map(x => x.title).join(', ')}. Подробное расписание доступно на странице Событий!`,
      jobs: (v: any[]) => `У нас есть открытые вакансии! Например, требуется ${v[0].position} в магазин ${v[0].storeName}. Посетите раздел "Вакансии" для подачи заявки.`,
      leasing: "У нас есть премиальные площади для аренды. Пожалуйста, посетите страницу Аренды или свяжитесь с руководством для деталей.",
      food: "AF Mall предлагает разнообразие ресторанов и кафе. Вы можете отдохнуть в Starbucks и других уютных заведениях на 1-м этаже.",
      fashion: "Для любителей моды у нас представлены международные бренды, такие как Zara и Nike. Загляните в наш каталог!",
      tech: "Рекомендую посетить Apple Store на 2-м этаже, чтобы ознакомиться с последними новинками техники.",
      fallback: "Благодарю за обращение! Для более точного ответа рекомендую заглянуть в наш Каталог или указать название конкретного бренда."
    }
  };

  const res = (t as any)[lang] || t.EN;

  // Greetings
  if (/(hi|hello|salam|privet|здравствуй|привет|hey)/i.test(lower)) return res.greeting;

  // Store Match (Advanced Substring matching)
  const foundStore = stores.find(s => lower.includes(s.name.toLowerCase()));
  if (foundStore) {
    const cat = categories.find(c => c.id === foundStore.categoryId)?.name || 'retail';
    return res.storeFound(foundStore, cat);
  }

  // Intent matching
  if (/(food|eat|restaurant|coffee|yemək|kafe|еда|кофе|ресторан|drink)/i.test(lower)) return res.food;
  if (/(clothes|fashion|wear|shoes|geyim|paltar|одежда|обувь|мода)/i.test(lower)) return res.fashion;
  if (/(phone|electronics|apple|telefon|elektronika|телефон|техника)/i.test(lower)) return res.tech;
  if (/(event|show|tədbir|konsert|событие|шоу)/i.test(lower)) return res.events(events);
  
  if (/(job|career|vacancy|work|iş|vakansiya|работа|вакансия)/i.test(lower)) {
    const activeJobs = vacancies.filter(v => v.status === 'Active');
    if (activeJobs.length > 0) return res.jobs(activeJobs);
  }
  
  if (/(rent|lease|premise|space|icarə|obyekt|аренда|помещение)/i.test(lower)) return res.leasing;

  return res.fallback;
}

export async function getAdvancedAIResponse(message: string, currentLang: string, messageHistory: { role: string, parts: { text: string }[] }[] = []) {
  try {
    if (!ai || !process.env.GEMINI_API_KEY) {
      // Intentionally fallback silently if API key is not configured for a professional seamless experience
      return { success: true, text: getFallbackResponse(message, currentLang) };
    }

    const systemInstruction = `You are the AF Smart Concierge, a highly professional, polite, and helpful AI digital assistant for AF Mall (a premium shopping center in Baku, Azerbaijan).
Your job is to assist customers in finding stores, restaurants, events, and answering questions about the mall with absolute professionalism.

Current Language: ${currentLang} (Please reply exclusively in this language: AZ for Azerbaijani, EN for English, RU for Russian).

Here is the current mall data:
Stores & Restaurants: ${JSON.stringify(stores.map(s => ({ name: s.name, floor: s.floor, zone: s.location, category: categories.find(c => c.id === s.categoryId)?.name })))}
Upcoming Events: ${JSON.stringify(events.map(e => ({ title: e.title, date: e.date })))}
Active Job Vacancies: ${JSON.stringify(vacancies.filter(v => v.status === 'Active').map(v => ({ position: v.position, store: v.storeName })))}

Rules:
1. Be extremely polite, professional, and helpful. Use formal language.
2. If asked about a store, ALWAYS mention its floor and zone.
3. If asked about something not in the mall, politely explain that it's not available and seamlessly suggest an alternative from the available stores.
4. Do not invent stores, events, or facts that are not in the data provided.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        ...messageHistory,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.3,
      }
    });

    return { success: true, text: response.text || "I apologize, I couldn't process your request." };
  } catch (error: any) {
    console.error("AI Generation Error, falling back to local engine:", error);
    // If the API call fails (e.g. invalid key, rate limit, network issue), fail gracefully and professionally.
    return { success: true, text: getFallbackResponse(message, currentLang) };
  }
}
