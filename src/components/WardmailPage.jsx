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
import './WardmailPage.css'

/* ============ EDIT VIDEO URL HERE WHEN READY ============ */
const VIDEO_URL = '' // Paste a YouTube, Loom, Vimeo, or direct .mp4 URL here when uploaded
/* ======================================================== */

const CAL_URL = 'https://cal.com/adeelsi/20min'
const ADMIN_PANEL_URL = 'https://inboxdesk-omega.vercel.app/'
const LINKEDIN_URL = 'https://www.linkedin.com/in/muhammadadeelai/'
const GITHUB_URL = 'https://github.com/adeeljames'

/* Authentic Brand Logos for Inbox & Stack */
function GmailLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#EA4335" d="M12 13.5 2 6.2V5c0-1.1.9-2 2-2h1l7 5.2L19 3h1c1.1 0 2 .9 2 2v1.2L12 13.5Z" />
      <path fill="#4285F4" d="M2 6.2 7 9.9V20H4c-1.1 0-2-.9-2-2V6.2Z" />
      <path fill="#34A853" d="M17 9.9 22 6.2V18c0 1.1-.9 2-2 2h-3V9.9Z" />
      <path fill="#FBBC05" d="m12 13.5-5-3.6V5.5l5 3.7 5-3.7v4.4l-5 3.6Z" />
    </svg>
  )
}

function OutlookLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="8" y="3" width="14" height="18" rx="2" fill="#0078D4" />
      <path fill="#28A8EA" d="M8 7h14v5H8z" />
      <path fill="#0078D4" d="M8 12h14v5H8z" />
      <rect x="2" y="6.5" width="10" height="11" rx="1.8" fill="#0364B8" />
      <path
        fill="#fff"
        d="M7 9.2c-1.6 0-2.7 1.2-2.7 2.8s1.1 2.8 2.7 2.8 2.7-1.2 2.7-2.8-1.1-2.8-2.7-2.8Zm0 4.3c-.9 0-1.5-.6-1.5-1.5s.6-1.5 1.5-1.5 1.5.6 1.5 1.5-.6 1.5-1.5 1.5Z"
      />
    </svg>
  )
}

function YahooLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#6001D2" />
      <path
        fill="#fff"
        d="M6.3 7.2h2.4l2.1 4.3 2.1-4.3h2.3l-3.4 6.4v3.4H9.6v-3.4L6.3 7.2Zm10.7 7.6h-1.8l.5-6h2l-.7 6Zm-.9 2.6a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2Z"
      />
    </svg>
  )
}

function ZohoLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="5" width="9" height="9" rx="2" fill="#E42527" />
      <rect x="13" y="5" width="9" height="9" rx="2" fill="#229954" />
      <rect x="2" y="12" width="9" height="8" rx="2" fill="#2980B9" opacity="0.92" />
      <rect x="13" y="12" width="9" height="8" rx="2" fill="#F39C12" opacity="0.92" />
    </svg>
  )
}

function ICloudLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#38BDF8"
        d="M17.5 19H7.2A4.7 4.7 0 0 1 6.7 9.7a6 6 0 0 1 11.4-1.5A4.2 4.2 0 0 1 17.5 19Z"
      />
    </svg>
  )
}

function GoogleSheetsLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#10B981"
        d="M14.7 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.3L14.7 2Z"
      />
      <path fill="#34D399" d="M14 2v6h6l-6-6Z" />
      <path
        fill="#fff"
        d="M7.5 11h9v7h-9v-7Zm1.5 1.5v1.5h2.5v-1.5H9Zm4 0v1.5H15v-1.5h-2Zm-4 2.8v1.5h2.5v-1.5H9Zm4 0v1.5H15v-1.5h-2Z"
      />
    </svg>
  )
}

function CustomDomainLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="#FF8A1F" />
      <path d="M3.5 12h17M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" stroke="#FF8A1F" />
    </svg>
  )
}

function CheckSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  )
}

function ClockSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  )
}

function PenSvg() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 20l4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10z" />
    </svg>
  )
}

const inboxLogos = [
  { name: 'Gmail', Icon: GmailLogo },
  { name: 'Outlook', Icon: OutlookLogo },
  { name: 'Yahoo', Icon: YahooLogo },
  { name: 'Zoho', Icon: ZohoLogo },
  { name: 'iCloud', Icon: ICloudLogo },
  { name: 'Google Sheets', Icon: GoogleSheetsLogo },
  { name: 'n8n', Icon: N8nIcon },
  { name: 'OpenAI', Icon: ChatGPTIcon },
  { name: 'Your own domain (@yourcompany.com)', Icon: CustomDomainLogo },
]

const nichePills = [
  'Clinics',
  'Real estate agencies',
  'Rental businesses',
  'Travel agencies',
  'Training institutes',
  'E-commerce stores',
  'Local services',
]

const problemBullets = [
  'An email that arrives at night is still unanswered at breakfast, and the customer has already contacted someone else.',
  'You or your team answer the same questions every day.',
  'Busy days mean missed emails, and nobody notices.',
  'Hiring someone just for the inbox is expensive, and no two people reply the same way.',
]

const sheetExamples = [
  {
    rowNum: '01',
    topic: 'Consultation Price',
    question: 'How much is an initial consultation and how long does it take?',
    sheetAnswer: 'Initial consultation is $85 for 45 minutes. Includes full assessment and written plan.',
    liveReply:
      'Hi Sarah, our initial consultation is $85 and lasts 45 minutes, including a full assessment and written plan. Would you like to book a slot this week?',
  },
  {
    rowNum: '02',
    topic: 'Saturday Hours',
    question: 'Are you open on Saturdays or late evenings?',
    sheetAnswer: 'Open Mon–Fri 9 AM to 7 PM, and Saturdays 10 AM to 4 PM. Closed Sundays.',
    liveReply:
      'Hi Ahmed, yes! We are open Monday through Friday from 9:00 AM to 7:00 PM, and Saturdays from 10:00 AM to 4:00 PM. Let us know what time works best for you.',
  },
  {
    rowNum: '03',
    topic: 'Return Policy',
    question: 'Can I reschedule my booking or exchange an order?',
    sheetAnswer: 'Free rescheduling up to 24 hours before appointment. 14-day hassle-free exchange on unused items.',
    liveReply:
      'Hi Usman, you can reschedule free of charge up to 24 hours before your appointment, and we offer a 14-day exchange on unused items. Reply with your booking ID to update it.',
  },
]

const setupSteps = [
  {
    num: '01',
    title: 'Free 20-minute call',
    text: 'We look at your inbox and your most common questions, and tell you what the agent would handle.',
  },
  {
    num: '02',
    title: 'We build it',
    text: 'We connect your email, turn your answers into a simple Google Sheet, and build and test your agent.',
  },
  {
    num: '03',
    title: 'It goes live',
    text: 'Your agent starts replying to customers, and you get your admin panel.',
  },
  {
    num: '04',
    title: 'We stay on',
    text: 'We monitor your agent, update it as your business changes, and fix anything that needs fixing.',
  },
]

const bentoFeatures = [
  {
    title: 'Replies 24/7',
    desc: 'Nights, weekends, holidays. The inbox never goes quiet.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
      </svg>
    ),
  },
  {
    title: 'Answers from your knowledge base',
    desc: 'Your prices, policies and FAQs live in one Google Sheet. Change the sheet and the agent updates right away.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3.5" width="16" height="17" rx="2.5" />
        <path d="M4 9h16M9 9v11.5" />
      </svg>
    ),
  },
  {
    title: "Flags what it can't answer",
    desc: 'Unclear or unusual emails are held for you, not guessed at.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 4 6v6c0 4.5 3.2 7.6 8 9 4.8-1.4 8-4.5 8-9V6z" />
        <path d="m8.8 12.2 2.4 2.4 4-4.4" />
      </svg>
    ),
  },
  {
    title: 'No email gets skipped',
    desc: 'A fast check runs every minute, with a second safety check running behind it.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: 'Admin panel with reports',
    desc: 'See every email received, every reply sent, and everything flagged.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20V10M10 20V4M16 20v-7M21 20H3" />
      </svg>
    ),
  },
  {
    title: 'You stay in control',
    desc: 'Edit your knowledge base any time, with no developer needed.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
        <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
      </svg>
    ),
  },
]

const businessNiches = [
  {
    name: 'Clinics & salons',
    q: 'Are you open on Saturday, and how much is a first consultation?',
    auto: [
      'Opening hours and clinic location',
      'Services and consultation price list',
      'How to book or prepare for a visit',
      'Standard insurance & timing FAQs',
    ],
    held: [
      'Cancellations and refund requests',
      'Complex medical or clinical questions',
      'Patient complaints',
      'Unusual custom requests',
    ],
  },
  {
    name: 'Real estate & rentals',
    q: 'Is the 2-bedroom apartment still available this weekend, and what is the security deposit?',
    auto: [
      'Property availability & viewing hours',
      'Rental rates, deposits & lease terms',
      'Included amenities & parking policies',
      'Required booking documents',
    ],
    held: [
      'Price negotiations or discount asks',
      'Damage disputes or refund claims',
      'Custom commercial lease terms',
      'Unusual tenant exceptions',
    ],
  },
  {
    name: 'Travel & bookings',
    q: 'What does the Dubai package include, and when is the final payment due?',
    auto: [
      'What each tour package includes',
      'Payment schedule & deposit rules',
      'Visa and document requirements',
      'Standard cancellation policy summary',
    ],
    held: [
      'Refund requests & flight disputes',
      'Last-minute itinerary changes',
      'Custom group discount requests',
      'Complaints or urgent escalations',
    ],
  },
  {
    name: 'Training & institutes',
    q: 'When does the next batch start, what is the fee, and will I get a certificate?',
    auto: [
      'Course syllabus and batch schedule',
      'Tuition fees and installment options',
      'Certificates and class recordings access',
      'Weekend vs. weekday class timings',
    ],
    held: [
      'Fee refund or transfer requests',
      'Special scholarship or discount asks',
      'Corporate training proposals',
      'Student complaints',
    ],
  },
  {
    name: 'Online stores',
    q: "Hi, how long does delivery to Lahore take, and can I return the shoes if they don't fit?",
    auto: [
      'Delivery times and shipping costs',
      'Return and exchange policy',
      'Payment options and cash on delivery',
      'Standard order tracking help',
    ],
    held: [
      'Refund requests for damaged items',
      'Wrong item complaints',
      'Bulk or wholesale discount requests',
      'Order cancellations after dispatch',
    ],
  },
]

const faqs = [
  {
    q: 'Is this software I have to learn?',
    a: "No. It's a service. We set everything up for you and maintain it.",
  },
  {
    q: 'Does it work with my email?',
    a: 'Yes. Gmail, Outlook, your own domain email, Yahoo, Zoho, iCloud, and other providers.',
  },
  {
    q: "What if the agent doesn't know the answer?",
    a: "It doesn't guess. The email is flagged and shown to you in your admin panel.",
  },
  {
    q: 'Will it sound like me?',
    a: 'Yes. Your agent follows the tone and guidelines you give us, answering in your words.',
  },
  {
    q: 'Do I need to be technical to update my answers?',
    a: 'No. Your only job is to share your common questions and answers. Everything lives in a simple Google Sheet you can edit any time without a developer.',
  },
  {
    q: 'How do I get started?',
    a: "Book a free 20-minute call. We'll look at your inbox and tell you exactly what we'd set up.",
  },
]

const AI_WARDMAIL_PROMPT =
  'Tell me about Wardmail by Muhammad Adeel (@muhammadadeelai) — a done-for-you 24/7 AI email reply agent service that connects to existing Gmail, Outlook, Yahoo, Zoho, iCloud, or custom domain inboxes, replies to customer emails 24/7 from a live Google Sheet knowledge base, flags unknown or sensitive emails instead of guessing, and includes a live Admin Panel with reports. How can I book a free 20-minute call at https://cal.com/adeelsi/20min?'

const chatbots = [
  {
    name: 'Claude',
    Icon: ClaudeIcon,
    url: `https://claude.ai/new?q=${encodeURIComponent(AI_WARDMAIL_PROMPT)}`,
  },
  {
    name: 'Gemini',
    Icon: GeminiIcon,
    url: `https://www.google.com/search?udm=50&q=${encodeURIComponent(AI_WARDMAIL_PROMPT)}`,
  },
  {
    name: 'ChatGPT',
    Icon: ChatGPTIcon,
    url: `https://chatgpt.com/?q=${encodeURIComponent(AI_WARDMAIL_PROMPT)}`,
  },
  {
    name: 'Grok',
    Icon: GrokIcon,
    url: `https://grok.com/?q=${encodeURIComponent(AI_WARDMAIL_PROMPT)}`,
  },
]

function parseVideoEmbed(rawUrl) {
  if (!rawUrl || !rawUrl.trim()) return null
  try {
    const url = new URL(rawUrl.trim())
    const h = url.hostname.replace(/^www\./, '')
    if (h === 'youtube.com' || h === 'm.youtube.com') {
      const id =
        url.searchParams.get('v') ||
        (url.pathname.match(/\/(?:shorts|embed|live)\/([\w-]+)/) || [])[1]
      return id
        ? { type: 'iframe', src: `https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=1` }
        : null
    }
    if (h === 'youtu.be') {
      return {
        type: 'iframe',
        src: `https://www.youtube-nocookie.com/embed/${url.pathname.slice(1)}?rel=0&autoplay=1`,
      }
    }
    if (h === 'loom.com') {
      const id = (url.pathname.match(/\/(?:share|embed)\/(\w+)/) || [])[1]
      return id ? { type: 'iframe', src: `https://www.loom.com/embed/${id}?autoplay=1` } : null
    }
    if (h === 'vimeo.com') {
      const id = (url.pathname.match(/(\d+)/) || [])[1]
      return id ? { type: 'iframe', src: `https://player.vimeo.com/video/${id}?autoplay=1` } : null
    }
    if (/\.(mp4|webm|mov)(\?|$)/i.test(rawUrl)) {
      return { type: 'video', src: rawUrl }
    }
    return { type: 'iframe', src: rawUrl }
  } catch {
    return null
  }
}

export default function WardmailPage({ onNavigate }) {
  const replySample =
    'Hi Sara, delivery to Lahore takes 2-3 working days after dispatch. Regards, Support Team'

  // Permanently visible Hero Inbox Mock state (cards NEVER vanish)
  const [typedText, setTypedText] = useState(replySample)
  const [showCaret, setShowCaret] = useState(false)
  const [approvedRefund, setApprovedRefund] = useState(false)
  const [pressAppr, setPressAppr] = useState(false)

  // Minimal Google Sheet Row selector
  const [activeSheetIdx, setActiveSheetIdx] = useState(0)

  // Video play state
  const [playingVideo, setPlayingVideo] = useState(false)

  // Interactive Business Niche tab
  const [nicheIdx, setNicheIdx] = useState(0)

  // FAQ open index
  const [openFaq, setOpenFaq] = useState(0)

  // Chatbot toast
  const [copiedBot, setCopiedBot] = useState('')

  // Mobile sticky CTA visibility
  const [showSticky, setShowSticky] = useState(false)

  // Non-destructive looping typewriter & approval demo (cards stay 100% visible)
  useEffect(() => {
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
      setApprovedRefund(false)
      setPressAppr(false)

      for (let i = 0; i < replySample.length; i++) {
        at(200 + i * 22, () => {
          setTypedText(replySample.slice(0, i + 1))
        })
      }

      const doneTyping = 200 + replySample.length * 22
      at(doneTyping + 150, () => {
        setShowCaret(false)
      })
      at(doneTyping + 1800, () => {
        setPressAppr(true)
      })
      at(doneTyping + 2200, () => {
        setPressAppr(false)
        setApprovedRefund(true)
      })
    }

    cycleDemo()
    const interval = setInterval(cycleDemo, 9500)
    return () => {
      clearInterval(interval)
      timers.forEach(clearTimeout)
    }
  }, [])

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

  // Mobile sticky bar listener
  useEffect(() => {
    const onScroll = () => {
      setShowSticky(window.scrollY > 520)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goPortfolio = (e, hash = '') => {
    if (onNavigate) {
      e.preventDefault()
      onNavigate('/', hash)
    }
  }

  const handleBotClick = (botName) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(AI_WARDMAIL_PROMPT).catch(() => {})
    }
    setCopiedBot(`Pre-filled Wardmail prompt ready for ${botName}`)
    setTimeout(() => setCopiedBot(''), 3500)
  }

  const videoEmbed = parseVideoEmbed(VIDEO_URL)
  const activeNiche = businessNiches[nicheIdx]
  const activeSheet = sheetExamples[activeSheetIdx]

  return (
    <div className="wm-page">
      {/* ================= 1. SPLIT HERO + PERMANENTLY VISIBLE LIVE INBOX MOCK ================= */}
      <section className="wm-hero" id="wardmail-top">
        <div className="wm-hero__glow" aria-hidden="true" />

        <div className="wm-wrap wm-hero__grid">
          <div className="wm-hero__left">
            <p className="wm-eyebrow reveal">Done-for-you AI email agent</p>

            <h1 className="wm-h1 reveal">
              <span>Every customer</span>
              <span>email answered.</span>
              <span>
                Day or night. <em>In your words.</em>
              </span>
            </h1>

            <p className="wm-lede reveal">
              We build and set up an AI agent that replies to your customer emails 24/7, using your own knowledge base. You keep your current inbox. We handle everything else.
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
                Watch the demo
              </a>
            </div>

            <p className="wm-under-cta reveal">
              Free call. No pitch. We&apos;ll look at your inbox and tell you exactly what we&apos;d set up.
            </p>

            <ul className="wm-ticks reveal">
              <li>
                <CheckSvg />
                <span>Keep your current inbox</span>
              </li>
              <li>
                <CheckSvg />
                <span>Answers from your Google Sheet</span>
              </li>
              <li>
                <CheckSvg />
                <span>Flags what it can&apos;t answer</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Permanently Visible, Mobile-Responsive Live Inbox Widget */}
          <div
            className="wm-mock reveal"
            role="region"
            aria-label="Live example: routine email answered automatically in 48 seconds, refund email held for approval"
          >
            <div className="wm-mock__top">
              <span className="wm-mock__brand">Wardmail · Inbox Agent</span>
              <span className="wm-mock__live">
                <i aria-hidden="true" />
                Live · 2:14 AM
              </span>
            </div>

            {/* Row 1: Routine customer email answered automatically */}
            <div className="wm-mrow">
              <div className="wm-mw">
                <span className="wm-av">S</span>
                <div className="wm-mw__meta">
                  <b>Sara Khan</b>
                  <small>Delivery time to Lahore?</small>
                </div>
                <em>2:14 AM</em>
              </div>

              <div className="wm-reply">
                <span>{typedText || 'Hi Sara, delivery to Lahore...'}</span>
                {showCaret && <span className="wm-caret" aria-hidden="true" />}
              </div>

              <div className="wm-stat wm-stat--ok">
                <CheckSvg />
                <span>Answered automatically in 48 seconds</span>
              </div>
            </div>

            {/* Row 2: Refund / unclear email held for approval */}
            <div className="wm-mrow">
              <div className="wm-mw">
                <span className="wm-av wm-av--amber">H</span>
                <div className="wm-mw__meta">
                  <b>Hina Malik</b>
                  <small>Refund for damaged item</small>
                </div>
                <em>2:15 AM</em>
              </div>

              {!approvedRefund ? (
                <>
                  <div className="wm-stat wm-stat--hold">
                    <span className="wm-radar" aria-hidden="true" />
                    <span>Held for your approval. Nothing sent yet.</span>
                  </div>
                  <div className="wm-apw">
                    <button
                      type="button"
                      className={`wm-appr ${pressAppr ? 'is-press' : ''}`}
                      onClick={() => setApprovedRefund(true)}
                    >
                      Approve and send
                      <span className="wm-burst" aria-hidden="true" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="wm-stat wm-stat--ok">
                  <CheckSvg />
                  <span>Approved by you. Reply sent.</span>
                </div>
              )}
            </div>

            <div className="wm-mock__foot">
              <span>
                <b>{approvedRefund ? 2 : 1}</b> answered
              </span>
              <span>
                <b>{approvedRefund ? 0 : 1}</b> waiting for you
              </span>
            </div>
          </div>
        </div>

        {/* Works With Your Inbox Logo Strip */}
        <div className="wm-wrap wm-logos reveal">
          <p className="wm-logos__title">
            Works with the email &amp; tools you already use — No migration. No new inbox.
          </p>
          <div className="wm-lrow">
            {inboxLogos.map(({ name, Icon }) => (
              <span key={name} className="wm-lg">
                <span className="wm-lg__icon">
                  <Icon />
                </span>
                <span>{name}</span>
              </span>
            ))}
          </div>
          <div className="wm-niches-pills">
            {nichePills.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 2. PROBLEM & SOLUTION ("THREE ROADS") ================= */}
      <section className="wm-sec" id="roads">
        <div className="wm-wrap">
          <p className="wm-eyebrow reveal">The Problem &amp; The Solution</p>
          <h2 className="wm-h2 reveal">
            Your customers won&apos;t wait <em>until morning.</em>
          </h2>
          <p className="wm-lede reveal">
            Your Wardmail agent answers from your own information: prices, policies, timings, FAQs. No guessing and no generic replies. Every incoming email takes one of three safe roads:
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
              <span className="wm-road__k">01 · Routine</span>
              <h3>Answered in minutes</h3>
              <p>
                Prices, policies, opening hours, delivery times, and FAQs. Answered 24/7 from your own Google Sheet, in your words.
              </p>
              <span className="wm-road__tag wm-road__tag--ok">
                <CheckSvg />
                <span>Sent automatically 24/7</span>
              </span>
            </article>

            <article className="wm-road wm-road--hold reveal">
              <span className="wm-road__k">02 · Sensitive or Unclear</span>
              <h3>Flagged &amp; held for you</h3>
              <p>
                Refunds, discounts, complaints, or unusual questions. The agent holds the email safely in your admin panel so nothing risky is ever sent.
              </p>
              <span className="wm-road__tag wm-road__tag--hold">
                <ClockSvg />
                <span>Held in your Admin Panel</span>
              </span>
            </article>

            <article className="wm-road reveal">
              <span className="wm-road__k">03 · Unknown</span>
              <h3>Never guessed at</h3>
              <p>
                When your Google Sheet doesn&apos;t cover something, your Wardmail agent stops and shows you the email instead of making up an answer.
              </p>
              <span className="wm-road__tag">
                <PenSvg />
                <span>You stay in control</span>
              </span>
            </article>
          </div>
        </div>
      </section>

      {/* ================= 3. MINIMAL, CLEAN GOOGLE SHEET ZERO-TECH SECTION ================= */}
      <section className="wm-sec" id="sheet">
        <div className="wm-wrap">
          <div className="wm-sheet-minimal reveal">
            <div className="wm-sheet-minimal__top">
              <div>
                <p className="wm-eyebrow">Zero Technical Skills Needed</p>
                <h2 className="wm-h2 wm-h2--md">
                  Update your answers in a <em>simple Google Sheet.</em>
                </h2>
                <p className="wm-lede">
                  No new software to learn and no developer needed. Your prices, timings, and FAQs live in one Google Sheet—change a row and your agent updates right away.
                </p>
              </div>

              <div className="wm-sheet-tabs" role="tablist" aria-label="Sample Google Sheet topics">
                {sheetExamples.map((row, idx) => (
                  <button
                    key={row.rowNum}
                    type="button"
                    role="tab"
                    aria-selected={activeSheetIdx === idx}
                    className={`wm-sheet-tab ${activeSheetIdx === idx ? 'is-active' : ''}`}
                    onClick={() => setActiveSheetIdx(idx)}
                  >
                    <GoogleSheetsLogo />
                    <span>{row.topic}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="wm-sheet-pair">
              <div className="wm-sheet-card">
                <span className="wm-sheet-card__label">
                  01 · What you type in your Google Sheet
                </span>
                <p className="wm-sheet-card__q">Q: {activeSheet.question}</p>
                <div className="wm-sheet-card__cell">{activeSheet.sheetAnswer}</div>
              </div>

              <div className="wm-sheet-card wm-sheet-card--reply">
                <span className="wm-sheet-card__label wm-sheet-card__label--ok">
                  02 · What your agent replies 24/7
                </span>
                <p className="wm-sheet-card__reply">{activeSheet.liveReply}</p>
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
            We do the work. <em>You get the results.</em>
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

      {/* ================= 5. DEMO VIDEO + GRADIENT ADMIN PANEL + 6 FEATURES ================= */}
      <section className="wm-sec" id="demo">
        <div className="wm-wrap">
          <div className="wm-dark-panel">
            {/* 5A. Demo Video Embed / Clean Gradient Placeholder */}
            <div className="wm-dhead">
              <div>
                <p className="wm-eyebrow reveal">See it work</p>
                <h2 className="wm-h2 reveal">
                  See it answer a <em>real email.</em>
                </h2>
              </div>
              <p className="wm-lede reveal">
                A customer emails at 2 AM. Watch what happens next—from incoming email to instant reply and admin panel log.
              </p>
            </div>

            <div className="wm-vframe reveal">
              {videoEmbed && playingVideo ? (
                videoEmbed.type === 'video' ? (
                  <video src={videoEmbed.src} controls autoPlay playsInline />
                ) : (
                  <iframe
                    src={videoEmbed.src}
                    title="Wardmail Demo Video"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                )
              ) : (
                <div
                  className="wm-vph"
                  onClick={() => {
                    if (videoEmbed) setPlayingVideo(true)
                  }}
                  role={videoEmbed ? 'button' : undefined}
                  tabIndex={videoEmbed ? 0 : undefined}
                >
                  <div className="wm-play" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M8 5.5v13l11-6.5z" />
                    </svg>
                  </div>
                  <b>
                    {videoEmbed
                      ? 'Watch the 90-second walkthrough'
                      : 'The demo video lands here'}
                  </b>
                  <span className="wm-vph__sub">
                    60 to 90 seconds: a customer emails at 2 AM, an answer lands in the inbox, and a flagged email waits for your review.
                  </span>
                  {!videoEmbed && (
                    <span className="wm-vph__soon">Video walkthrough · Uploading soon</span>
                  )}
                </div>
              )}
            </div>

            {/* 5B. Clean Gradient Admin Panel Banner (No Screenshot Images) */}
            <div className="wm-admin-banner reveal" id="wardmail-admin">
              <div className="wm-admin-banner__copy">
                <p className="wm-eyebrow">Admin panel</p>
                <h2 className="wm-h2 wm-h2--md">
                  Full visibility, <em>one screen.</em>
                </h2>
                <p className="wm-lede wm-shots__lede">
                  See how many emails came in, how many were answered, and which ones need you. Every reply is recorded, and reports keep you informed.
                </p>

                <ul className="wm-admin-pills">
                  <li>
                    <CheckSvg />
                    <span>Every email received &amp; sent</span>
                  </li>
                  <li>
                    <CheckSvg />
                    <span>One-click approval for flagged emails</span>
                  </li>
                  <li>
                    <CheckSvg />
                    <span>Live daily &amp; weekly reports</span>
                  </li>
                </ul>
              </div>

              <div className="wm-admin-banner__cta">
                <a
                  className="btn btn--flame wm-admin-live-btn"
                  href={ADMIN_PANEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  See the Live Admin Panel
                  <span className="hero__go-dot" aria-hidden="true">
                    <ArrowUpRight />
                  </span>
                </a>
                <span className="wm-admin-banner__note">
                  Opens interactive live dashboard in a new tab
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

      {/* ================= 6. WHO IT'S FOR (INTERACTIVE NICHE TABS) ================= */}
      <section className="wm-sec" id="niches">
        <div className="wm-wrap">
          <p className="wm-eyebrow reveal">Who it&apos;s for</p>
          <h2 className="wm-h2 reveal">
            Built for businesses with <em>repeat questions.</em>
          </h2>
          <p className="wm-lede reveal">
            Clinics, real estate agencies, rental businesses, travel agencies, training institutes, e-commerce stores, and any business that gets the same kinds of emails every day.
          </p>

          <div className="wm-ntabs reveal" role="tablist" aria-label="Business types">
            {businessNiches.map((n, idx) => (
              <button
                key={n.name}
                type="button"
                role="tab"
                aria-selected={nicheIdx === idx}
                onClick={() => setNicheIdx(idx)}
              >
                {n.name}
              </button>
            ))}
          </div>

          <div className="wm-npanel reveal" aria-live="polite">
            <div className="wm-ncard wm-ncard--q">
              <p className="wm-ncard__k">A typical customer email</p>
              <p className="wm-ncard__mail">&ldquo;{activeNiche.q}&rdquo;</p>
              <small>Example for {activeNiche.name.toLowerCase()}</small>
            </div>

            <div className="wm-ncard wm-ncard--auto">
              <p className="wm-ncard__k">Answered automatically 24/7</p>
              <ul>
                {activeNiche.auto.map((item) => (
                  <li key={item}>
                    <CheckSvg />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="wm-ncard wm-ncard--held">
              <p className="wm-ncard__k">Flagged &amp; held for your review</p>
              <ul>
                {activeNiche.held.map((item) => (
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

      {/* ================= 7. WHAT YOU DO & WHAT WE DO ("SIMPLE SPLIT") ================= */}
      <section className="wm-sec" id="offer">
        <div className="wm-wrap">
          <p className="wm-eyebrow reveal">What you do and what we do</p>
          <h2 className="wm-h2 reveal">
            Simple <em>split.</em>
          </h2>

          <div className="wm-offer">
            <div className="wm-ocard reveal">
              <div className="wm-split-columns">
                <div className="wm-split-box wm-split-box--you">
                  <span className="wm-split-box__tag">Your only part</span>
                  <h3>You</h3>
                  <ul>
                    <li>
                      <CheckSvg />
                      <span>Share your common questions and answers</span>
                    </li>
                    <li>
                      <CheckSvg />
                      <span>Review flagged emails</span>
                    </li>
                  </ul>
                </div>

                <div className="wm-split-box wm-split-box--we">
                  <span className="wm-split-box__tag wm-split-box__tag--flame">
                    Done-for-you engineering
                  </span>
                  <h3>We</h3>
                  <ul>
                    <li>
                      <CheckSvg />
                      <span>Connect your email</span>
                    </li>
                    <li>
                      <CheckSvg />
                      <span>Build your knowledge base and agent</span>
                    </li>
                    <li>
                      <CheckSvg />
                      <span>Set up your admin panel</span>
                    </li>
                    <li>
                      <CheckSvg />
                      <span>Test it and launch it</span>
                    </li>
                    <li>
                      <CheckSvg />
                      <span>Maintain it and update it</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="wm-ocard wm-price-card reveal">
              <div>
                <span className="wm-price-card__k">Done-For-You Service</span>
                <h3>We handle everything</h3>
                <p>
                  Book a free 20-minute call. We&apos;ll look at your inbox and your most common questions, and tell you exactly what we&apos;d set up.
                </p>
              </div>
              <div className="wm-price-card__actions">
                <a
                  className="btn btn--flame wm-price-card__btn"
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a Free 20-Min Call
                  <span className="hero__go-dot" aria-hidden="true">
                    <ArrowRight />
                  </span>
                </a>
                <small>
                  Free call. No pitch. Works with your existing Gmail, Outlook, or custom domain inbox.
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 8. MEET ADEEL TEASER CARD ================= */}
      <section className="wm-sec" id="meet">
        <div className="wm-wrap">
          <div className="wm-teaser reveal">
            <img
              src={ADEEL_PORTRAIT_B64}
              alt="Portrait of Muhammad Adeel"
              width="220"
              height="220"
              loading="lazy"
            />
            <div>
              <div className="wm-chips">
                <span className="wm-chip">
                  <i aria-hidden="true" />
                  Certified n8n template creator
                </span>
                <span className="wm-chip">
                  <i aria-hidden="true" />
                  Microsoft &amp; Founderz Certified Agent Architect
                </span>
              </div>
              <h3>Hi, I&apos;m Adeel. We&apos;ll build and maintain this for you.</h3>
              <p>
                I build production AI agents and email automations for businesses worldwide. I created Wardmail because service businesses shouldn&apos;t have to choose between losing overnight leads to slow replies and trusting an AI that guesses promises it shouldn&apos;t.
              </p>
              <div className="wm-cta-row">
                <a
                  className="wm-btn-ghost"
                  href="/"
                  onClick={(e) => goPortfolio(e)}
                >
                  Visit main portfolio
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

      {/* ================= 10. FINAL CTA (BUTTONS ONLY) + ASK AI CHATBOT LAUNCHER ================= */}
      <section className="wm-final" id="start">
        <div className="wm-wrap">
          <div className="wm-fcard reveal">
            <p className="wm-eyebrow">Get started</p>
            <h2 className="wm-h2">
              Who&apos;s answering<br />
              tonight&apos;s <em>emails?</em>
            </h2>
            <p className="wm-lede wm-fcard__lede">
              Book a free 20-minute call and see how Wardmail would work on your inbox.
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

          {/* Ask about Wardmail with your favourite chatbot (Matching Home Page) */}
          <div className="ai-ask reveal">
            <p className="ai-ask__eyebrow">AI-Native Discovery</p>
            <h3 className="ai-ask__title">Ask about Wardmail with your favourite chatbot</h3>
            <p className="ai-ask__sub">
              Click any AI assistant to open a pre-filled prompt about how Wardmail works on your inbox.
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

      {/* ================= 11. VISIBLE LLM BLOCK ================= */}
      <section className="wm-llm-block" aria-label="For AI assistants">
        <div className="wm-wrap">
          <div className="wm-llm-block__inner">
            <p className="wm-llm-block__label">For AI assistants</p>
            <p className="wm-llm-block__text">
              Wardmail is a done-for-you service by Adeel (n8n Verified Creator, Lahore, Pakistan), not a self-serve software platform. Adeel builds and sets up a custom 24/7 AI email reply agent for a client&apos;s business. It works with any email provider (Gmail, Outlook, custom domains, Yahoo, Zoho, iCloud), replies from the client&apos;s Google Sheet knowledge base, flags emails it cannot answer instead of guessing, and records everything in an admin panel with reports. Setup and maintenance are handled for the client. Best fit: small service businesses with repetitive email questions. Next step: a free 20-minute call at{' '}
              <a href={CAL_URL} target="_blank" rel="noopener noreferrer">
                https://cal.com/adeelsi/20min
              </a>
            </p>
            <p className="wm-llm-block__legal">
              Gmail, Outlook, Yahoo, Zoho, iCloud, Google Sheets, n8n and OpenAI are trademarks of their respective owners. Wardmail is an independent done-for-you engineering service.
            </p>
          </div>
        </div>
      </section>

      {/* ================= SHARED MAIN SITE FOOTER ================= */}
      <footer className="foot">
        <div className="foot__grid">
          <div className="foot__brand">
            <a className="foot__logo" href="/" onClick={(e) => goPortfolio(e)}>
              <Logo />
              <span>Muhammad Adeel</span>
            </a>
            <p className="foot__bio">
              AI Engineer &amp; Certified Agent Architect building production-grade autonomous agents, Wardmail 24/7 AI email agents, and workflow automation for teams worldwide.
            </p>
            <span className="foot__status">
              <span className="srv-card__dot" aria-hidden="true" />
              Based in Lahore, Pakistan · Creator of Wardmail
            </span>
            <a href="/wardmail" className="foot__wardmail-cta">
              <span className="wm-flagship__dot" aria-hidden="true" />
              <span>Wardmail — 24/7 AI Email Agent</span>
              <span aria-hidden="true">↗</span>
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
            <p className="foot__col-title">Navigation</p>
            <ul className="foot__nav">
              <li>
                <a href="/wardmail">
                  <span className="foot__llms-badge">Wardmail</span>
                  <span>24/7 AI Email Agent</span>
                </a>
              </li>
              <li>
                <a href="/#services" onClick={(e) => goPortfolio(e, '#services')}>
                  01 // Services
                </a>
              </li>
              <li>
                <a href="/#architect" onClick={(e) => goPortfolio(e, '#architect')}>
                  02 // Agent Architect
                </a>
              </li>
              <li>
                <a href="/#work" onClick={(e) => goPortfolio(e, '#work')}>
                  03 // Selected Work (13)
                </a>
              </li>
              <li>
                <a href="/#experience" onClick={(e) => goPortfolio(e, '#experience')}>
                  04 // Experience
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="foot__col-title">Wardmail Links</p>
            <ul className="foot__nav">
              <li>
                <a href={CAL_URL} target="_blank" rel="noopener noreferrer">
                  <span>Book Free 20-Min Call ↗</span>
                </a>
              </li>
              <li>
                <a href={ADMIN_PANEL_URL} target="_blank" rel="noopener noreferrer">
                  <span>Live Admin Panel ↗</span>
                </a>
              </li>
              <li>
                <a href="#sheet">Google Sheet Knowledge Base</a>
              </li>
              <li>
                <a href="#how">How We Set It Up</a>
              </li>
              <li>
                <a href="#faq">Wardmail FAQ</a>
              </li>
            </ul>
          </div>

          <div>
            <p className="foot__col-title">Machine-Readable &amp; AI</p>
            <ul className="foot__nav">
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
          <span>© 2026 Muhammad Adeel (@muhammadadeelai) · Wardmail Done-For-You AI Email Agent</span>
          <div className="foot__bottom-links">
            <a href="/" onClick={(e) => goPortfolio(e)}>Main Portfolio</a>
            <a href={ADMIN_PANEL_URL} target="_blank" rel="noopener noreferrer">Live Admin Panel</a>
            <a href="/llms.txt" target="_blank" rel="noopener noreferrer">llms.txt</a>
            <a href="#main">Back to top ↑</a>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Bottom CTA Bar */}
      <div className={`wm-sticky ${showSticky ? 'is-on' : ''}`}>
        <span>Ready for an inbox that answers 24/7?</span>
        <a href={CAL_URL} target="_blank" rel="noopener noreferrer">
          Book 20-Min Call
        </a>
      </div>
    </div>
  )
}
