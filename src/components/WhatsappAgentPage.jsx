import { useEffect, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  ChatGPTIcon,
  ClaudeIcon,
  GeminiIcon,
  GitHubIcon,
  GrokIcon,
  LinkedInIcon,
  Logo,
  N8nIcon,
} from './icons.jsx'
import { ADEEL_PORTRAIT_B64 } from './wardmailAssets.js'
import FeaturedBlogsStrip from './FeaturedBlogsStrip.jsx'
import './WardmailPage.css'
import './WhatsappAgentPage.css'

/* ============ PASTE YOUR YOUTUBE / LOOM / LINKEDIN EMBED URL HERE ============ */
const VIDEO_URL = 'https://www.youtube.com/embed/i3ZrTtFP7fw?si=d8h360ecqdxx2MdB'
/* ============================================================================= */

const CAL_URL = 'https://cal.com/adeelsi/20min'
const LINKEDIN_URL = 'https://www.linkedin.com/in/muhammadadeelai/'
const GITHUB_URL = 'https://github.com/adeeljames'

/* Authentic Brand Logos for WhatsApp Booking Agent Stack */
function WhatsAppLogo() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#25D366" />
      <path
        fill="#fff"
        d="M16.6 14.2c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8.9-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.4-.5-.5-.8-1.1-1-1.7-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.3.2-.4.1-.2 0-.3 0-.4-.1-.1-.5-1.3-.7-1.8-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.5.5-.8 1.2-.8 2 0 .9.4 1.8 1 2.6 1.1 1.5 2.5 2.5 4.2 3.1.5.2 1 .3 1.5.3.6 0 1.2-.2 1.6-.6.4-.4.6-.9.7-1.4.1-.2.1-.4 0-.4-.1-.1-.3-.2-.5-.3Z"
      />
    </svg>
  )
}

function DeepgramLogo() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#13EF93" />
      <path
        fill="#08120E"
        d="M7 7h5.2a4.8 4.8 0 0 1 0 9.6H7V7Zm2.4 2.2v5.2h2.8a2.6 2.6 0 0 0 0-5.2H9.4Zm8.1-1.2h1.8v8h-1.8V8Z"
      />
    </svg>
  )
}

function NeonPostgresLogo() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#00E599" />
      <path
        fill="#06140F"
        d="M7 17V7h2.4l5.2 6.4V7H17v10h-2.4L9.4 10.6V17H7Z"
      />
    </svg>
  )
}

function FastApiLogo() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#05998B" />
      <path fill="#fff" d="M13.2 5.5 7.5 13h4.2l-.9 5.5L16.5 11h-4.2l.9-5.5Z" />
    </svg>
  )
}

function PdfEngineLogo() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <rect x="3" y="2" width="18" height="20" rx="3" fill="#EF4444" />
      <path
        fill="#fff"
        d="M7 8h10v1.8H7V8Zm0 3.6h10v1.8H7v-1.8Zm0 3.6h6.5V17H7v-1.8Z"
      />
    </svg>
  )
}

function OpenTelemetryLogo() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#F5A800" />
      <circle cx="12" cy="12" r="5" fill="#180800" />
      <circle cx="16.5" cy="7.5" r="2.2" fill="#fff" />
    </svg>
  )
}

function GmailAlertLogo() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path fill="#EA4335" d="M12 13.5 2 6.2V5c0-1.1.9-2 2-2h1l7 5.2L19 3h1c1.1 0 2 .9 2 2v1.2L12 13.5Z" />
      <path fill="#4285F4" d="M2 6.2 7 9.9V20H4c-1.1 0-2-.9-2-2V6.2Z" />
      <path fill="#34A853" d="M17 9.9 22 6.2V18c0 1.1-.9 2-2 2h-3V9.9Z" />
      <path fill="#FBBC05" d="m12 13.5-5-3.6V5.5l5 3.7 5-3.7v4.4l-5 3.6Z" />
    </svg>
  )
}

function MultilingualGlobeLogo() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#FF8A1F" strokeWidth="1.9" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3.5 12h17M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  )
}

function CheckSvg() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  )
}

function ClockSvg() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  )
}

function PenSvg() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 20l4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10z" />
    </svg>
  )
}

const stackLogos = [
  { name: 'WhatsApp Business', Icon: WhatsAppLogo },
  { name: 'Deepgram (2-Way Voice AI)', Icon: DeepgramLogo },
  { name: 'Any Language (Multilingual)', Icon: MultilingualGlobeLogo },
  { name: 'Neon PostgreSQL (Live DB)', Icon: NeonPostgresLogo },
  { name: 'PDF Quotes & Receipts', Icon: PdfEngineLogo },
  { name: 'Owner Email Alerts', Icon: GmailAlertLogo },
  { name: 'FastAPI & Python', Icon: FastApiLogo },
  { name: 'OpenAI', Icon: ChatGPTIcon },
  { name: 'OpenTelemetry Monitoring', Icon: OpenTelemetryLogo },
]

const servicePills = [
  'Car & Fleet Rentals',
  'Cleaning Businesses',
  'Plumbers & Home Repair',
  'Clinics & Appointments',
  'Travel & Tour Agencies',
  'Equipment & Event Rentals',
  'Real Estate Viewings',
]

const problemBullets = [
  'Customers send WhatsApp voice notes or ask for prices at night, and by morning they have already booked with a competitor.',
  'Checking dates manually, sending car or service photos one by one, and typing out quotes eats hours every day.',
  'Double-bookings happen when your team forgets to check which vehicle, crew, or appointment slot is already reserved.',
  'Adding a new vehicle, service package, or price usually requires calling a developer—instead of a simple admin panel.',
]

const adminExamples = [
  {
    rowNum: '01',
    topic: 'Add Vehicle / Service',
    itemLabel: 'Aston DBX Luxury SUV · 5 Seats',
    adminValue: 'Photos uploaded · Self-Drive $140/d · With Driver $175/d · Saved in Neon DB.',
    liveReply:
      '🎙️ AI Voice + Photos sent! Our Aston DBX SUV is available Nov 15–18 ($140/day self-drive or $175/day with chauffeur). Here is your official PDF Quotation: Quotation_SUV_3Days.pdf ($525).',
  },
  {
    rowNum: '02',
    topic: 'Update Pricing',
    itemLabel: 'Mercedes E-Class Executive Sedan',
    adminValue: 'Weekend rate updated to $95/day Self-Drive ($125/day w/ Driver) · No code needed.',
    liveReply:
      'Hi Tariq! Our Mercedes E-Class Sedan is $95/day self-drive or $125/day with a driver. I have attached your updated PDF Quotation right here on WhatsApp.',
  },
  {
    rowNum: '03',
    topic: 'Date Conflict Check',
    itemLabel: 'Nov 14 Booked → Suggest Open Dates',
    adminValue: 'Nov 14 reserved (#BK-8490) · Agent automatically suggests Nov 15–18.',
    liveReply:
      'The Matte Black SUV is already booked on Nov 14, but it is open Nov 15–18 (with or without driver), or our Executive Sedan is open Nov 14–17. Which would you like to lock in?',
  },
]

const setupSteps = [
  {
    num: '01',
    title: 'Free 20-minute call',
    text: 'We review your WhatsApp booking flow, catalog, and pricing rules, and give you a tailored quote.',
  },
  {
    num: '02',
    title: 'We build & connect it',
    text: 'We connect WhatsApp, Deepgram voice AI, your PDF quote/receipt engine, and Neon PostgreSQL database.',
  },
  {
    num: '03',
    title: 'Zero-Code Admin Panel',
    text: 'We hand over your web Admin Panel and train your team live on adding cars/services and updating prices.',
  },
  {
    num: '04',
    title: 'Live monitoring & care',
    text: 'We monitor uptime, tool calls, and latency via OpenTelemetry and keep your agent sharp.',
  },
]

const bentoFeatures = [
  {
    title: '2-Way Voice & Any Language',
    desc: 'Customers speak or type in English, Arabic, Urdu, Spanish, or any language. Send a voice note, get an AI voice reply.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3" />
      </svg>
    ),
  },
  {
    title: 'Photos & Catalog in Chat',
    desc: 'Sends real vehicle pictures, service checklists, or property galleries with clear pricing directly on WhatsApp.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2.5" />
        <circle cx="8.5" cy="9.5" r="1.5" />
        <path d="m21 15-5-5L5 20" />
      </svg>
    ),
  },
  {
    title: 'Live DB Conflict Check',
    desc: 'Checks Neon PostgreSQL in real time. If a date is booked, it suggests open dates—with or without a driver.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
      </svg>
    ),
  },
  {
    title: 'PDF Quotes & Receipts',
    desc: 'Generates branded PDF Quotations and official PDF Booking Receipts with unique Booking Reference Numbers (#BK-8492).',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M8 13h8M8 17h5" />
      </svg>
    ),
  },
  {
    title: 'Instant Owner Email Alerts',
    desc: 'The moment a customer confirms on WhatsApp, the business owner receives a complete booking email notification.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
  {
    title: 'Zero-Code Admin Panel',
    desc: 'Add new vehicles or services, update prices, and upload photos from your browser without editing Python code.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2.5" />
        <path d="M4 9h16M9 9v11" />
      </svg>
    ),
  },
]

const serviceIndustries = [
  {
    name: 'Car & Fleet Rentals',
    q: '🎙️ Voice Note: "Hi, do you have a black SUV for 3 days starting Friday with a driver? Send me pictures and the total quote."',
    auto: [
      'Replies with an AI voice note in the customer’s language + sends SUV photos',
      'Checks Neon PostgreSQL live database for Friday–Sunday availability (Self-Drive vs. With Driver)',
      'Generates & sends Quotation_SUV_3Days.pdf ($525) + Booking Receipt #BK-8492.pdf on WhatsApp',
    ],
    held: [
      'Add new cars & upload vehicle photos in 30 seconds without touching code',
      'Update daily Self-Drive & With-Driver rental rates anytime in your Admin Panel',
      'Receive instant owner email notifications for every confirmed WhatsApp booking',
    ],
  },
  {
    name: 'Cleaning Businesses',
    q: '🎙️ Voice Note: "Hello, I need a deep move-out cleaning for a 3-bedroom apartment this Saturday morning. How much is it?"',
    auto: [
      'Replies in voice & text with cleaning package details and checklist photos',
      'Checks Saturday morning crew availability in your live schedule database',
      'Sends PDF_Quote_3Bed_DeepClean.pdf ($210) + Confirmed Booking Receipt #CL-3094.pdf',
    ],
    held: [
      'Edit room or square-footage pricing & add deep-clean packages without code',
      'Manage open crew slots and blocked dates from your Zero-Code Admin Panel',
      'Receive instant dispatch emails when a customer confirms their cleaning slot',
    ],
  },
  {
    name: 'Plumbers & Home Repair',
    q: '💬 WhatsApp: "Hi, our kitchen water heater is leaking and we need a plumber tomorrow morning. What is the inspection & replacement cost?"',
    auto: [
      'Answers voice notes or messages 24/7 and shares service rate cards & photos',
      'Checks tomorrow’s technician time slots in your live database',
      'Generates PDF_Job_Estimate.pdf + locks technician slot with Booking Receipt #PL-6120.pdf',
    ],
    held: [
      'Add or update plumbing, HVAC, or electrical repair services without code',
      'Adjust call-out fees, emergency rates, and technician availability windows',
      'Get instant owner & technician email notifications on confirmed jobs',
    ],
  },
  {
    name: 'Clinics & Appointments',
    q: '🎙️ Voice Note: "Hi, is Dr. Ayesha available tomorrow evening for a dental consultation and scaling? Please share the charges."',
    auto: [
      'Replies with a natural AI voice note in any language the patient speaks',
      'Verifies doctor or specialist slot availability in real time without double-booking',
      'Sends Treatment_Quote.pdf ($85) + Confirmed Appointment Pass #APT-9041.pdf on WhatsApp',
    ],
    held: [
      'Add doctors, treatments, or consultation packages in your Zero-Code Admin Panel',
      'Update clinic hours, slot durations, and treatment pricing anytime',
      'Receive instant reception email alerts for every confirmed WhatsApp appointment',
    ],
  },
  {
    name: 'Travel & Real Estate',
    q: '💬 WhatsApp: "We are a family of 5 looking for a 4-day northern tour package next week with a private van. Can you send options?"',
    auto: [
      'Sends tour itinerary photos, venue galleries, or property pictures on WhatsApp',
      'Checks live date availability for vehicles, tours, or property viewings',
      'Generates Custom_Group_Tour_Quote.pdf + Confirmed Reservation Voucher #TR-4418.pdf',
    ],
    held: [
      'Upload new tour packages, event venues, or property photos without a developer',
      'Update seasonal pricing and group rates in seconds',
      'Track all confirmed reservations and PDF vouchers in one Admin Panel',
    ],
  },
]

const quoteFactors = [
  'Daily WhatsApp message & voice note volume',
  'Size of your fleet, service menu, or appointment catalog',
  'Custom PDF Quotation & Booking Receipt branding rules',
  'Languages needed (English, Arabic, Urdu, European, or Multilingual auto-switch)',
]

const includedDeliverables = [
  'Custom 24/7 WhatsApp AI Agent (Text + 2-Way Deepgram Voice Notes + Photo Catalog)',
  'Automated PDF Quotation & PDF Booking Receipt engine + Instant Owner Email Alerts',
  'Zero-Code Web Admin Panel (add vehicles/services, edit prices & upload photos anytime)',
  'Live Neon PostgreSQL database + OpenTelemetry monitoring + full team training',
]

const faqs = [
  {
    q: 'Can the WhatsApp AI Agent speak and understand multiple languages?',
    a: 'Yes! While our live demo on this page is shown in English so everyone worldwide can follow it easily, the agent is 100% multilingual. It automatically detects your customer’s language (such as English, Arabic, Urdu / Roman Urdu, Spanish, French, German, or Hindi) and replies in that same language in both text and AI voice notes.',
  },
  {
    q: 'How does the agent prevent double-booking a car or appointment slot?',
    a: 'Every time a customer asks for specific dates or times, the agent queries your live Neon PostgreSQL database in real time. If that vehicle, cleaning crew, or appointment slot is already booked on those dates, the agent politely informs the customer and suggests the nearest available dates or alternative options (with or without a driver).',
  },
  {
    q: 'Do I need coding skills to add a new car, change prices, or upload new pictures?',
    a: 'Not at all. We include a dedicated Zero-Code Admin Panel built for business owners. Want to add a new vehicle or cleaning package, update daily rental prices, or replace photos? You simply log into your Admin Panel, upload the picture, and click Save—your WhatsApp AI Agent uses the updated inventory immediately without touching Python code or redeploying.',
  },
  {
    q: 'Can this same WhatsApp agent be customized for cleaning, plumbing, clinics, or other service businesses?',
    a: 'Yes. The core engine—WhatsApp voice & text conversation, visual catalog photos, live availability database, instant PDF quotation, confirmed PDF booking receipt, owner email notification, and zero-code admin panel—works for any business that quotes and books customers.',
  },
  {
    q: 'How do I get notified when a customer confirms a booking on WhatsApp?',
    a: 'The moment a customer confirms their booking, two things happen automatically: the customer receives their official PDF Booking Receipt with a unique Booking Reference Number right inside WhatsApp, and you receive an instant email notification with all customer details, dates, and pricing.',
  },
]

const AI_WA_PROMPT =
  'Tell me about the 24/7 Multilingual WhatsApp AI Agent for Rental & Service Businesses built by Muhammad Adeel (@muhammadadeelai). Explain how it handles 2-way WhatsApp voice notes (via Deepgram) and text in any language, sends vehicle or service photos, checks live Neon PostgreSQL database availability (with or without driver), generates instant PDF Quotations and PDF Booking Receipts with unique booking numbers on WhatsApp, sends instant owner email notifications, and includes a Zero-Code Admin Panel plus OpenTelemetry monitoring. Also explain how it can be customized for car rentals, cleaning services, plumbers, clinics, and appointment businesses, and how to book a free 20-minute discovery call at https://cal.com/adeelsi/20min.'

const chatbots = [
  {
    name: 'Claude',
    Icon: ClaudeIcon,
    url: `https://claude.ai/new?q=${encodeURIComponent(AI_WA_PROMPT)}`,
  },
  {
    name: 'Gemini',
    Icon: GeminiIcon,
    url: `https://www.google.com/search?udm=50&q=${encodeURIComponent(AI_WA_PROMPT)}`,
  },
  {
    name: 'ChatGPT',
    Icon: ChatGPTIcon,
    url: `https://chatgpt.com/?q=${encodeURIComponent(AI_WA_PROMPT)}`,
  },
  {
    name: 'Grok',
    Icon: GrokIcon,
    url: `https://grok.com/?q=${encodeURIComponent(AI_WA_PROMPT)}`,
  },
]

export default function WhatsappAgentPage({ onNavigate }) {
  const replySample =
    '🎙️ AI Voice + Photos sent! Aston DBX SUV is open Nov 15–18 ($525 w/ Driver). Attached: Quotation_SUV_3Days.pdf'

  // Permanently visible Hero WhatsApp Mock state (exact 2-row Wardmail structure)
  const [typedText, setTypedText] = useState(replySample)
  const [showCaret, setShowCaret] = useState(false)
  const [isEasyRevealed, setIsEasyRevealed] = useState(false)

  // Compact Zero-Code Admin Panel Row selector
  const [activeAdminIdx, setActiveAdminIdx] = useState(0)

  // Interactive Service Industry tab
  const [industryIdx, setIndustryIdx] = useState(0)

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState(0)

  // Chatbot toast
  const [copiedBot, setCopiedBot] = useState('')

  // Looping typewriter for Row 1 while keeping the "Confirm & send PDF" button ready for user click
  useEffect(() => {
    if (isEasyRevealed) return undefined
    let timers = []
    const at = (ms, fn) => {
      const id = setTimeout(fn, ms)
      timers.push(id)
    }

    const cycleDemo = () => {
      timers.forEach(clearTimeout)
      timers = []
      setTypedText('')
      setShowCaret(true)

      for (let i = 0; i < replySample.length; i++) {
        at(200 + i * 20, () => {
          setTypedText(replySample.slice(0, i + 1))
        })
      }

      const doneTyping = 200 + replySample.length * 20
      at(doneTyping + 150, () => {
        setShowCaret(false)
      })
    }

    cycleDemo()
    const interval = setInterval(cycleDemo, 8500)
    return () => {
      clearInterval(interval)
      timers.forEach(clearTimeout)
    }
  }, [isEasyRevealed])

  // Scroll reveal observer
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      els.forEach((e) => e.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.1 }
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])

  const goRoute = (e, path = '/', hash = '') => {
    if (onNavigate) {
      e.preventDefault()
      onNavigate(path, hash)
    }
  }

  const handleBotClick = (botName) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(AI_WA_PROMPT).catch(() => {})
    }
    setCopiedBot(`Pre-filled WhatsApp AI Agent prompt ready for ${botName}`)
    setTimeout(() => setCopiedBot(''), 3500)
  }

  const activeIndustry = serviceIndustries[industryIdx]
  const activeAdmin = adminExamples[activeAdminIdx]

  return (
    <div className="wm-page wa-page">
      {/* ================= 1. SPLIT HERO + COMPACT 2-ROW LIVE WHATSAPP MOCK ================= */}
      <section className="wm-hero" id="whatsapp-top">
        <div className="wm-hero__glow" aria-hidden="true" />

        <div className="wm-wrap wm-hero__grid">
          <div className="wm-hero__left">
            <p className="wm-eyebrow reveal">
              Done-for-you 24/7 multilingual WhatsApp AI agent
            </p>

            <h1 className="wm-h1 reveal">
              <span>Every WhatsApp</span>
              <span>voice note, quote &amp;</span>
              <span>
                booking. <em>Handled 24/7.</em>
              </span>
            </h1>

            <p className="wm-lede reveal">
              We build and set up a custom WhatsApp AI Agent for rental and service businesses. It replies to voice notes and text in <strong>any language</strong>, sends vehicle or service photos, checks live database dates, sends instant <strong>PDF Quotations &amp; Receipts</strong>, and includes a <strong>Zero-Code Admin Panel</strong>.
            </p>

            <div className="wm-cta-row reveal">
              <a
                className="btn btn--flame wm-btn-main"
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Free 20-Min Call
                <span className="hero__go-dot" aria-hidden="true">
                  <ArrowRight />
                </span>
              </a>
              <a className="wm-btn-ghost" href="#demo">
                Watch the 3-min demo
              </a>
            </div>

            <p className="wm-under-cta reveal">
              Built for Car Rentals, Cleaning Businesses, Plumbers, Clinics, and Appointment Services.
            </p>

            <ul className="wm-ticks reveal">
              <li>
                <CheckSvg />
                <span>2-Way Voice &amp; Text (Any Language)</span>
              </li>
              <li>
                <CheckSvg />
                <span>Instant PDF Quotes &amp; Receipts</span>
              </li>
              <li>
                <CheckSvg />
                <span>Zero-Code Owner Admin Panel</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Compact 2-Row Live WhatsApp Widget (Matches Wardmail 1:1) */}
          <div
            className={`wm-mock ${isEasyRevealed ? 'wm-mock--easy' : ''}`}
            role="region"
            aria-live="polite"
            aria-label="Live WhatsApp Booking Agent example: click Confirm and send PDF to test"
          >
            {!isEasyRevealed ? (
              <>
                <div className="wm-mock__top">
                  <span className="wm-mock__brand">WhatsApp · 24/7 Booking Agent</span>
                  <span className="wm-mock__live">
                    <i aria-hidden="true" />
                    Speaks Any Language
                  </span>
                </div>

                {/* Row 1: Customer Voice Note + Instant AI Voice, Photo & PDF Quote Reply */}
                <div className="wm-mrow">
                  <div className="wm-mw">
                    <span className="wm-av">D</span>
                    <div className="wm-mw__meta">
                      <b>Daniel K. · 🎙️ Voice Note (0:14)</b>
                      <small>Black SUV Nov 15–18 with driver? Send photos &amp; quote</small>
                    </div>
                    <em>9:42 PM</em>
                  </div>

                  <div className="wm-reply">
                    <span>{typedText || '🎙️ AI Voice + Photos sent! Aston DBX SUV...'}</span>
                    {showCaret && <span className="wm-caret" aria-hidden="true" />}
                  </div>

                  <div className="wm-stat wm-stat--ok">
                    <CheckSvg />
                    <span>Replied in 4s · AI Voice + Car Photos + PDF Quote sent</span>
                  </div>
                </div>

                {/* Row 2: Live DB Checked & 1-Click Booking Confirmation + Owner Email */}
                <div className="wm-mrow">
                  <div className="wm-mw">
                    <span className="wm-av wm-av--amber">B</span>
                    <div className="wm-mw__meta">
                      <b>Booking #BK-8492 · Aston DBX SUV</b>
                      <small>Nov 15–18 (3 Days w/ Driver) · Total: $525.00</small>
                    </div>
                    <em>9:43 PM</em>
                  </div>

                  <div className="wm-stat wm-stat--hold">
                    <span className="wm-radar" aria-hidden="true" />
                    <span>Live DB verified · Sends PDF Receipt &amp; emails owner</span>
                  </div>

                  <div className="wm-apw">
                    <button
                      type="button"
                      className="wm-appr"
                      onClick={() => setIsEasyRevealed(true)}
                    >
                      <span>Confirm &amp; send PDF</span>
                      <span className="wm-appr__hint">Click to test</span>
                    </button>
                  </div>
                </div>

                <div className="wm-mock__foot">
                  <span>
                    <b>1</b> quoted with PDF &amp; voice
                  </span>
                  <span>
                    <b>1</b> ready to lock in
                  </span>
                </div>
              </>
            ) : (
              <div className="wm-easy-state">
                <div className="wm-mock__top">
                  <span className="wm-mock__brand">WhatsApp · Booking Confirmed</span>
                  <span className="wm-mock__live wm-mock__live--ok">
                    <i aria-hidden="true" />
                    100% Automated
                  </span>
                </div>

                <div className="wm-easy-state__body">
                  <div className="wm-easy-state__badge">
                    <CheckSvg />
                    <span>Booking #BK-8492 · PDF Receipt &amp; Owner Email Sent</span>
                  </div>

                  <h3 className="wm-easy-state__title">
                    From WhatsApp voice note to confirmed booking — <em>it really is this easy.</em>
                  </h3>

                  <p className="wm-easy-state__desc">
                    The customer just received <strong>Booking_Receipt_BK8492.pdf</strong> on WhatsApp, the dates are locked in your database, and the business owner received an instant email alert.
                  </p>

                  <ul className="wm-easy-state__pills">
                    <li>
                      <CheckSvg />
                      <span>PDF Quote &amp; Receipt on WhatsApp</span>
                    </li>
                    <li>
                      <CheckSvg />
                      <span>Instant Owner Email Alert</span>
                    </li>
                    <li>
                      <CheckSvg />
                      <span>Zero-Code Admin Panel</span>
                    </li>
                  </ul>

                  <div className="wm-easy-state__actions">
                    <a
                      href={CAL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--flame wm-easy-state__cta"
                    >
                      <span>Book a Free 20-Min Call</span>
                      <span className="hero__go-dot" aria-hidden="true">
                        <ArrowRight />
                      </span>
                    </a>
                    <button
                      type="button"
                      className="wm-easy-state__back"
                      onClick={() => setIsEasyRevealed(false)}
                    >
                      ← Back to live WhatsApp demo
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Powered By Tech Stack & Service Industries Strip */}
        <div className="wm-wrap wm-logos reveal">
          <p className="wm-logos__title">
            Powered by a production-grade voice, database &amp; monitoring stack — built for 24/7 reliability
          </p>
          <div className="wm-lrow">
            {stackLogos.map(({ name, Icon }) => (
              <span key={name} className="wm-lg">
                <span className="wm-lg__icon">
                  <Icon />
                </span>
                <span>{name}</span>
              </span>
            ))}
          </div>
          <div className="wm-niches-pills">
            {servicePills.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 2. PROBLEM & SOLUTION ("THREE BOOKING STEPS") ================= */}
      <section className="wm-sec" id="workflow">
        <div className="wm-wrap">
          <p className="wm-eyebrow reveal">From Chat to Confirmed Revenue</p>
          <h2 className="wm-h2 reveal">
            More than a chatbot. It executes <em>your entire booking workflow.</em>
          </h2>
          <p className="wm-lede reveal">
            Basic chatbots only answer generic FAQs. Your WhatsApp AI Agent listens to voice notes in any language, checks your live inventory or schedule, sends real photos, generates PDF quotations, confirms bookings, and alerts you by email:
          </p>

          <ul className="wm-pain-strip reveal">
            {problemBullets.map((item) => (
              <li key={item}>
                <span className="wm-pain-dot" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="wm-roads">
            <article className="wm-road reveal">
              <span className="wm-road__k">01 · Voice, Text &amp; Photos</span>
              <h3>Replies in any language</h3>
              <p>
                Customers send WhatsApp voice notes or text in English, Arabic, Urdu, or any language. Powered by Deepgram, the agent replies with a natural AI voice note and sends real vehicle or service photos in chat.
              </p>
              <span className="wm-road__tag wm-road__tag--ok">
                <CheckSvg />
                <span>2-Way Voice AI + Visual Catalog</span>
              </span>
            </article>

            <article className="wm-road wm-road--hold reveal">
              <span className="wm-road__k">02 · Live DB &amp; PDF Quote</span>
              <h3>Checks dates &amp; sends PDF</h3>
              <p>
                Queries your live Neon PostgreSQL database. If a vehicle or slot is already booked on that date, it suggests open dates (with or without a driver) and sends an instant branded PDF Quotation.
              </p>
              <span className="wm-road__tag wm-road__tag--hold">
                <ClockSvg />
                <span>Zero Double-Bookings + PDF Quote</span>
              </span>
            </article>

            <article className="wm-road reveal">
              <span className="wm-road__k">03 · Receipt &amp; Owner Email</span>
              <h3>Confirms &amp; alerts you</h3>
              <p>
                When confirmed, the agent locks the dates, sends an official PDF Booking Receipt with a unique Booking Reference (#BK-8492) on WhatsApp, and emails the business owner immediately.
              </p>
              <span className="wm-road__tag">
                <PenSvg />
                <span>PDF Receipt + Owner Email Alert</span>
              </span>
            </article>
          </div>
        </div>
      </section>

      {/* ================= 3. COMPACT ZERO-CODE ADMIN PANEL SECTION ================= */}
      <section className="wm-sec" id="panel">
        <div className="wm-wrap">
          <div className="wm-sheet-minimal reveal">
            <div className="wm-sheet-minimal__top">
              <div>
                <p className="wm-eyebrow">A Proper Admin Panel — Zero Code Changes Needed</p>
                <h2 className="wm-h2 wm-h2--md">
                  Add cars, update prices &amp; upload photos. <em>No developer needed.</em>
                </h2>
                <p className="wm-lede">
                  Want to add another vehicle or service package? Simply add it through your Admin Panel. Your data is saved in Neon PostgreSQL, and your WhatsApp AI Agent uses the updated inventory immediately—without editing Python code or redeploying.
                </p>
              </div>

              <div className="wm-sheet-tabs" role="tablist" aria-label="Sample Admin Panel actions">
                {adminExamples.map((row, idx) => (
                  <button
                    key={row.rowNum}
                    type="button"
                    role="tab"
                    aria-selected={activeAdminIdx === idx}
                    className={`wm-sheet-tab ${activeAdminIdx === idx ? 'is-active' : ''}`}
                    onClick={() => setActiveAdminIdx(idx)}
                  >
                    <NeonPostgresLogo />
                    <span>{row.topic}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="wm-sheet-flow">
              {/* Compact 2-Row Visual Admin Panel Preview */}
              <div className="wm-gsheet-box">
                <div className="wm-gsheet-box__bar">
                  <span className="wm-gsheet-box__file">
                    <NeonPostgresLogo />
                    <b>Owner_Admin_Panel · Neon PostgreSQL</b>
                  </span>
                  <span className="wm-gsheet-box__sync">No-Code Sync</span>
                </div>

                <div className="wm-gsheet-table" role="table" aria-label="Zero-Code Admin Panel preview">
                  <div className="wm-gsheet-row wm-gsheet-row--head" role="row">
                    <span role="columnheader">#</span>
                    <span role="columnheader">Vehicle / Service</span>
                    <span role="columnheader">Your Admin Panel Update (No Code)</span>
                  </div>
                  <div className="wm-gsheet-row wm-gsheet-row--active" role="row">
                    <span className="wm-gsheet-row__num" role="cell">{activeAdmin.rowNum}</span>
                    <span className="wm-gsheet-row__q" role="cell">{activeAdmin.itemLabel}</span>
                    <span className="wm-gsheet-row__a" role="cell">{activeAdmin.adminValue}</span>
                  </div>
                </div>
              </div>

              {/* Flow Arrow Pill */}
              <div className="wm-sheet-arrow" aria-hidden="true">
                <span>Instant 24/7 Sync →</span>
              </div>

              {/* 1 Instant WhatsApp Reply Bubble */}
              <div className="wm-gsheet-reply">
                <div className="wm-gsheet-reply__head">
                  <span className="wm-gsheet-reply__tag">
                    <CheckSvg />
                    <span>Live on WhatsApp Immediately</span>
                  </span>
                  <small>4s</small>
                </div>
                <p className="wm-gsheet-reply__body">&ldquo;{activeAdmin.liveReply}&rdquo;</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. HOW WE SET IT UP (4 STEPS) ================= */}
      <section className="wm-sec" id="how">
        <div className="wm-wrap">
          <p className="wm-eyebrow reveal">How we set it up</p>
          <h2 className="wm-h2 reveal">
            We build the system. <em>You get confirmed bookings.</em>
          </h2>

          <div className="wm-steps">
            {setupSteps.map((s) => (
              <div key={s.num} className="wm-step reveal">
                <span className="wm-step__n">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. DEMO VIDEO + ADMIN BANNER + 6 FEATURES ================= */}
      <section className="wm-sec" id="demo">
        <div className="wm-wrap">
          <div className="wm-dark-panel">
            {/* 5A. 3-Minute YouTube Demo Video Embed (3:16) */}
            <div className="wm-dhead">
              <div>
                <p className="wm-eyebrow reveal">3-Minute Video Demo (3:16) · Presented in English</p>
                <h2 className="wm-h2 reveal">
                  Watch the 3-minute <em>complete booking journey.</em>
                </h2>
              </div>
              <p className="wm-lede reveal">
                In this 3-minute walkthrough (3:16)—recorded in English for universal clarity while the agent itself speaks any customer language—watch the complete WhatsApp customer conversation, generated PDF quotation, booking receipt, owner email alert, Zero-Code Admin Panel, and live OpenTelemetry monitoring.
              </p>
            </div>

            <div
              className="wm-vframe reveal"
              role="region"
              aria-label="WhatsApp Booking Agent 3-minute walkthrough video"
            >
              {VIDEO_URL && VIDEO_URL.trim() ? (
                <iframe
                  width="560"
                  height="315"
                  src={VIDEO_URL}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wm-vph"
                  aria-label="Watch the WhatsApp Booking Agent walkthrough video"
                >
                  <span className="wm-play" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                    </svg>
                  </span>
                  <b>Watch the Full WhatsApp Booking Agent Demo</b>
                  <span className="wm-vph__sub">
                    Voice &amp; Car Discovery → PDF Quotation → Booking Receipt → Owner Email → Admin Panel &amp; Monitoring
                  </span>
                  <span className="wm-vph__soon">
                    Video Embed Slot Ready · Click to Watch on LinkedIn ↗
                  </span>
                </a>
              )}
            </div>

            {/* 5B. Clean Gradient Admin Panel & OpenTelemetry Banner */}
            <div className="wm-admin-banner reveal" id="whatsapp-admin">
              <div className="wm-admin-banner__copy">
                <p className="wm-eyebrow">Admin Panel &amp; Live OpenTelemetry Monitoring</p>
                <h2 className="wm-h2 wm-h2--md">
                  Manage inventory &amp; watch <em>live activity.</em>
                </h2>
                <p className="wm-lede wm-shots__lede">
                  Add new vehicles or services, update rental prices, and upload pictures from your Admin Panel without code—backed by a live OpenTelemetry dashboard tracking API requests, tool calls, and latency.
                </p>

                <ul className="wm-admin-pills">
                  <li>
                    <CheckSvg />
                    <span>Add cars/services &amp; upload photos (No Code)</span>
                  </li>
                  <li>
                    <CheckSvg />
                    <span>View latest WhatsApp bookings &amp; PDF receipts</span>
                  </li>
                  <li>
                    <CheckSvg />
                    <span>OpenTelemetry live monitoring &amp; latency logs</span>
                  </li>
                </ul>
              </div>

              <div className="wm-admin-banner__cta">
                <a
                  className="btn btn--flame wm-admin-live-btn"
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a Live Admin Demo
                  <span className="hero__go-dot" aria-hidden="true">
                    <ArrowUpRight />
                  </span>
                </a>
                <span className="wm-admin-banner__note">
                  Free 20-min walkthrough of the Admin Panel &amp; WhatsApp flow
                </span>
              </div>
            </div>

            {/* 5C. 6-Card Architectural Feature Grid ("What you get") */}
            <div className="wm-feats-head reveal">
              <p className="wm-eyebrow">What your agent does</p>
              <h2 className="wm-h2 wm-h2--md">
                What you <em>get.</em>
              </h2>
            </div>

            <div className="wm-feats reveal">
              {bentoFeatures.map((f) => (
                <div key={f.title} className="wm-feat">
                  {f.icon}
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. WHO IT'S FOR (INTERACTIVE SERVICE INDUSTRY TABS) ================= */}
      <section className="wm-sec" id="industries">
        <div className="wm-wrap">
          <p className="wm-eyebrow reveal">Adaptable to Any Service or Booking Business</p>
          <h2 className="wm-h2 reveal">
            Not just for car rentals. <em>Tailored to your business.</em>
          </h2>
          <p className="wm-lede reveal">
            The same approach—WhatsApp voice &amp; text in any language, visual catalog, live availability database, instant PDF quotation, booking receipt, and zero-code Admin Panel—can be customized for any service business:
          </p>

          <div className="wm-ntabs reveal" role="tablist" aria-label="Service business types">
            {serviceIndustries.map((ind, idx) => (
              <button
                key={ind.name}
                type="button"
                role="tab"
                aria-selected={industryIdx === idx}
                onClick={() => setIndustryIdx(idx)}
              >
                {ind.name}
              </button>
            ))}
          </div>

          <div className="wm-npanel reveal" aria-live="polite">
            <div className="wm-ncard wm-ncard--q">
              <p className="wm-ncard__k">A typical customer on WhatsApp</p>
              <p className="wm-ncard__mail">{activeIndustry.q}</p>
              <small>Example inquiry for {activeIndustry.name.toLowerCase()}</small>
            </div>

            <div className="wm-ncard wm-ncard--auto">
              <p className="wm-ncard__k">Handled automatically 24/7 on WhatsApp</p>
              <ul>
                {activeIndustry.auto.map((item) => (
                  <li key={item}>
                    <CheckSvg />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="wm-ncard wm-ncard--held">
              <p className="wm-ncard__k">Your Zero-Code Admin Panel &amp; Alerts</p>
              <ul>
                {activeIndustry.held.map((item) => (
                  <li key={item}>
                    <ClockSvg />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 7. SINGLE COMPACT CUSTOM QUOTE + TEAM TRAINING CARD ================= */}
      <section className="wm-sec" id="offer">
        <div className="wm-wrap">
          <p className="wm-eyebrow reveal">Tailored Pricing &amp; Team Training</p>
          <h2 className="wm-h2 reveal">
            Custom-built for your workflow. <em>We train your team too.</em>
          </h2>
          <p className="wm-lede reveal">
            Every rental fleet and service business has its own pricing rules, packages, and booking flow. We handle custom setup, your Zero-Code Admin Panel, live team training, and ongoing care.
          </p>

          <div className="wm-custom-quote reveal">
            <div className="wm-custom-quote__left">
              <div className="wm-quote-block">
                <span className="wm-eyebrow">01 · Typical factors that influence your quote</span>
                <ul className="wm-custom-quote__factors">
                  {quoteFactors.map((factor) => (
                    <li key={factor}>
                      <span className="wm-pain-dot" aria-hidden="true" />
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="wm-quote-block wm-quote-block--training">
                <span className="wm-eyebrow">02 · Done-For-You Setup, Admin Panel &amp; Training</span>
                <ul className="wm-training-compact">
                  {includedDeliverables.map((item) => (
                    <li key={item}>
                      <CheckSvg />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="wm-custom-quote__right">
              <div>
                <span className="wm-custom-quote__badge">Free 20-Minute Discovery Call</span>
                <h3 className="wm-custom-quote__cta-title">
                  Get a detailed, <em>no-surprise quote.</em>
                </h3>
                <p className="wm-custom-quote__call-copy">
                  I provide a free 20-minute discovery call to understand your WhatsApp workflow and give you a detailed, no-surprise quote.
                </p>
              </div>

              <div className="wm-custom-quote__actions">
                <a
                  className="btn btn--flame wm-custom-quote__btn"
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Book Free 20-Min Call</span>
                  <span className="hero__go-dot" aria-hidden="true">
                    <ArrowRight />
                  </span>
                </a>
                <p className="wm-custom-quote__email">
                  Book at{' '}
                  <a href={CAL_URL} target="_blank" rel="noopener noreferrer">
                    cal.com/adeelsi/20min ↗
                  </a>{' '}
                  or email{' '}
                  <a href="mailto:hello@adeelsi.me">hello@adeelsi.me</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 8. MEET ADEEL TEASER CARD ================= */}
      <section className="wm-sec" id="meet">
        <div className="wm-wrap">
          <div className="wm-teaser reveal">
            <div className="wm-teaser__avatar-wrap">
              <img
                className="wm-teaser__img"
                src={ADEEL_PORTRAIT_B64}
                alt="Portrait of Muhammad Adeel"
                loading="lazy"
              />
            </div>
            <div className="wm-teaser__content">
              <h3>Hi, I&apos;m Adeel. We&apos;ll build, customize your Admin Panel, and train your team.</h3>
              <p>
                I build production AI agents that execute real business workflows—from 24/7 multilingual WhatsApp voice, photo, and PDF booking systems to Wardmail 24/7 email agents. When you book a call, you talk directly with me.
              </p>
              <div className="wm-cta-row">
                <a
                  className="wm-btn-ghost"
                  href="/"
                  onClick={(e) => goRoute(e, '/')}
                >
                  Visit main portfolio
                </a>
                <a
                  className="wm-btn-ghost"
                  href="/wardmail"
                  onClick={(e) => goRoute(e, '/wardmail')}
                >
                  Explore Wardmail (24/7 Email Agent) →
                </a>
                <a
                  className="wm-btn-ghost"
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Connect on LinkedIn ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 9. FAQ ACCORDION ================= */}
      <section className="wm-sec" id="faq">
        <div className="wm-wrap">
          <p className="wm-eyebrow wm-eyebrow--center reveal">FAQ</p>
          <h2 className="wm-h2 wm-h2--center reveal">
            Things business owners ask <em>first.</em>
          </h2>

          <div className="wm-faq reveal">
            {faqs.map((item, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={item.q}
                  className={`wm-faq__item ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    type="button"
                    className="wm-faq__summary"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  >
                    <span>{item.q}</span>
                    <span className="wm-faq__plus" aria-hidden="true" />
                  </button>
                  {isOpen && <p className="wm-faq__ans">{item.a}</p>}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================= 10. FINAL CTA + ASK AI CHATBOT LAUNCHER ================= */}
      <section className="wm-final" id="start">
        <div className="wm-wrap">
          <div className="wm-fcard reveal">
            <p className="wm-eyebrow">Get started</p>
            <h2 className="wm-h2">
              Who&apos;s answering<br />
              tonight&apos;s <em>WhatsApp leads?</em>
            </h2>
            <p className="wm-lede wm-fcard__lede">
              Book a free 20-minute call and see how a custom 24/7 WhatsApp Voice, PDF Quote &amp; Booking Agent would work for your business.
            </p>

            <div className="contact__actions">
              <a
                className="btn btn--flame contact__go"
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Free 20-Min Call
                <span className="hero__go-dot" aria-hidden="true">
                  <ArrowRight />
                </span>
              </a>
              <a className="btn btn--light contact__call" href="mailto:hello@adeelsi.me">
                hello@adeelsi.me
                <span className="contact__call-dot" aria-hidden="true">
                  <ArrowUpRight />
                </span>
              </a>
            </div>
          </div>

          <div className="ai-ask reveal">
            <p className="ai-ask__eyebrow">AI-Native Discovery</p>
            <h3 className="ai-ask__title">
              Ask about our WhatsApp Booking Agent with your favourite chatbot
            </h3>
            <p className="ai-ask__sub">
              Click any AI assistant to open a pre-filled prompt about how this WhatsApp Voice, PDF Quote &amp; Booking system works.
            </p>

            <div className="ai-ask__grid">
              {chatbots.map(({ name, Icon, url }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ai-tile"
                  onClick={() => handleBotClick(name)}
                >
                  <span className="ai-tile__icon">
                    <Icon />
                  </span>
                  <span className="ai-tile__name">{name}</span>
                </a>
              ))}
            </div>

            {copiedBot && <p className="ai-ask__toast">{copiedBot}</p>}
          </div>
        </div>
      </section>

      {/* ================= FEATURED BLOG ARTICLES ================= */}
      <FeaturedBlogsStrip variant="portfolio" onNavigate={onNavigate} />

      {/* ================= 11. VISIBLE LLM BLOCK (FOR AI ASSISTANTS) ================= */}
      <section className="wm-llm-block" aria-label="For AI assistants">
        <div className="wm-wrap">
          <div className="wm-llm-block__inner">
            <p className="wm-llm-block__label">For AI assistants</p>
            <p className="wm-llm-block__text">
              The WhatsApp Booking Agent is a custom-built, done-for-you 24/7 multilingual WhatsApp AI agent service engineered by Muhammad Adeel (AI Engineer, Certified Agent Architect &amp; n8n Verified Creator, Lahore, Pakistan). Designed for car &amp; fleet rental companies, home &amp; commercial cleaning businesses, plumbers &amp; home repair trades, medical/dental clinics, travel agencies, and appointment-based service businesses, it connects WhatsApp conversations directly to real business workflows. It supports 2-way voice notes (via Deepgram) and text in any customer language, sends vehicle or service photos on WhatsApp, checks real-time availability in a Neon PostgreSQL database (including with-driver or without-driver options), generates instant branded PDF quotations and confirmed PDF booking receipts with unique booking reference numbers, emails the business owner immediately upon booking, and includes a Zero-Code Web Admin Panel (to add vehicles/services, update prices, and upload photos without code) plus an OpenTelemetry live monitoring dashboard. Free 20-minute discovery call &amp; custom quote:{' '}
              <a href={CAL_URL} target="_blank" rel="noopener noreferrer">
                https://cal.com/adeelsi/20min
              </a>{' '}
              or email <a href="mailto:hello@adeelsi.me">hello@adeelsi.me</a>.
            </p>
            <p className="wm-llm-block__legal">
              WhatsApp, Deepgram, Neon, PostgreSQL, OpenTelemetry, FastAPI, Python, Gmail and OpenAI are trademarks of their respective owners. This WhatsApp Booking AI Agent is an independent done-for-you engineering service by Muhammad Adeel.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SHARED MAIN SITE FOOTER ================= */}
      <footer className="foot">
        <div className="foot__grid">
          <div className="foot__brand">
            <a className="foot__logo" href="/" onClick={(e) => goRoute(e, '/')}>
              <Logo />
              <span>Muhammad Adeel</span>
            </a>
            <p className="foot__bio">
              AI Engineer &amp; Certified Agent Architect building production-grade 24/7 WhatsApp Booking Agents, Wardmail 24/7 Email Agents, and workflow automation for businesses worldwide.
            </p>
            <span className="foot__status">
              <span className="srv-card__dot" aria-hidden="true" />
              Based in Lahore, Pakistan · Creator of Wardmail &amp; WhatsApp Booking Agent
            </span>
            <a
              href="#whatsapp-top"
              className="foot__wardmail-cta"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              <span className="wm-flagship__dot" aria-hidden="true" />
              <span>WhatsApp AI — 24/7 Quote &amp; Booking Agent</span>
              <span aria-hidden="true">↑</span>
            </a>
            <div className="foot__socials">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="foot__social-icon"
                aria-label="GitHub (@adeeljames)"
                title="GitHub"
              >
                <GitHubIcon />
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="foot__social-icon"
                aria-label="LinkedIn (@muhammadadeelai)"
                title="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://n8n.io/creators/aiadeel/"
                target="_blank"
                rel="noopener noreferrer"
                className="foot__social-icon"
                aria-label="n8n Creator Profile"
                title="n8n Creator Profile"
              >
                <N8nIcon />
              </a>
            </div>
          </div>

          <div>
            <p className="foot__col-title">Flagship Products</p>
            <ul className="foot__nav">
              <li>
                <a
                  href="#whatsapp-top"
                  onClick={(e) => {
                    e.preventDefault()
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  <span className="foot__llms-badge">WhatsApp AI</span>
                  <span>24/7 Booking Agent</span>
                </a>
              </li>
              <li>
                <a href="/wardmail" onClick={(e) => goRoute(e, '/wardmail')}>
                  <span className="foot__llms-badge">Wardmail ↗</span>
                  <span>24/7 Email Agent</span>
                </a>
              </li>
              <li>
                <a href="/blog" onClick={(e) => goRoute(e, '/blog')}>
                  <span>SEO Blog &amp; Guides</span>
                </a>
              </li>
              <li>
                <a href="/#work" onClick={(e) => goRoute(e, '/', '#work')}>
                  <span>Selected Work (14)</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="foot__col-title">On This Page</p>
            <ul className="foot__nav">
              <li><a href="#workflow">Booking Workflow</a></li>
              <li><a href="#panel">Zero-Code Admin Panel</a></li>
              <li><a href="#demo">3-Min Video Demo</a></li>
              <li><a href="#industries">Rentals, Cleaning &amp; Clinics</a></li>
              <li><a href="#offer">Custom Quote &amp; Training</a></li>
            </ul>
          </div>

          <div>
            <p className="foot__col-title">Machine-Readable &amp; AI</p>
            <ul className="foot__nav">
              <li>
                <a href={CAL_URL} target="_blank" rel="noopener noreferrer">
                  <span>Book Free 20-Min Call ↗</span>
                </a>
              </li>
              <li>
                <a href="/llms.txt" target="_blank" rel="noopener noreferrer">
                  <span className="foot__llms-badge">llms.txt ↗</span>
                  <span>Full LLM Context File</span>
                </a>
              </li>
            </ul>
            <div className="foot__ai-mini">
              {chatbots.map(({ name, Icon, url }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="foot__ai-btn"
                  onClick={() => handleBotClick(name)}
                >
                  <Icon />
                  <span>{name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="foot__bottom">
          <span>© 2026 Muhammad Adeel (@muhammadadeelai) · 24/7 WhatsApp Booking AI Agent</span>
          <div className="foot__bottom-links">
            <a href="/" onClick={(e) => goRoute(e, '/')}>Main Portfolio</a>
            <a href="/wardmail" onClick={(e) => goRoute(e, '/wardmail')}>Wardmail</a>
            <a href="/blog" onClick={(e) => goRoute(e, '/blog')}>Blog</a>
            <a href="/llms.txt" target="_blank" rel="noopener noreferrer">llms.txt</a>
            <a
              href="#whatsapp-top"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
