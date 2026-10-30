import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Close } from './icons.jsx'
import './ChatWidget.css'

const CAL_URL = 'https://cal.com/adeelsi/20min'

const STARTERS = [
  'What AI agents & RAG systems do you build?',
  'Tell me about your 12 shipped projects',
  'What is your experience & certifications?',
  'How can I hire you or book a 20-min call?',
]

const INITIAL_MESSAGES = [
  {
    role: 'assistant',
    content:
      "Hi! I’m Muhammad Adeel’s AI assistant. Ask me about his 5 AI services, 12 shipped projects, 4 industry roles, or how to book a free 20-min call.",
  },
]

// Built-in local portfolio responder if static hosting is used before GROQ_API_KEY is added in Cloudflare Dashboard
function getLocalPortfolioAnswer(query) {
  const q = String(query || '').toLowerCase()

  if (q.includes('hire') || q.includes('call') || q.includes('book') || q.includes('contact') || q.includes('price') || q.includes('rate')) {
    return `You can hire Muhammad Adeel or discuss your workflow directly:\n• Book a free 20-min call: https://cal.com/adeelsi/20min\n• Email directly: hello@adeelsi.me\n• LinkedIn: https://www.linkedin.com/in/muhammadadeelai/`
  }

  if (q.includes('project') || q.includes('work') || q.includes('built') || q.includes('12')) {
    return `Muhammad Adeel has shipped 12 production AI systems:\n• 01. 24/7 WhatsApp Rental & Service Booking AI Agent (FastAPI, LangChain)\n• 02. SBP Monetary Policy Financial RAG (Docling, Qdrant, Cohere Rerank)\n• 03. Claude External Memory MCP Server (70% token reduction)\n• 04. Lahore Smog Watch Live Air Quality Agent (LangGraph, NASA FIRMS)\n• Plus Bird Voice AI (82.4% accuracy), Pakistan Budget Bilingual RAG, Job Lead B2B MCP, Real Estate RAG, CrewAI Content Pipeline, Style Cloning Agent, CSV Data Analyst, and Glaucoma Few-Shot Vision.\nBook a call at https://cal.com/adeelsi/20min to see a live walkthrough.`
  }

  if (q.includes('experience') || q.includes('role') || q.includes('cert') || q.includes('background') || q.includes('who')) {
    return `Muhammad Adeel is a Certified Agent Architect (Microsoft & Founderz), Anthropic Claude Code Partner, and n8n Verified Template Creator.\n• n8n Verified Template Creator · N8N (Jun 2026 — Present)\n• AI Engineer · Excellence Code Solution (Jan 2026 — Present)\n• AI Native Developer (ASoC 2026) · Afrium (Jul 2026 — Present)\n• Machine Learning Engineering · FlyRank AI\nConnect on GitHub at https://github.com/adeeljames or book a call at https://cal.com/adeelsi/20min.`
  }

  return `Muhammad Adeel builds 5 core production AI systems for ROI:\n• Autonomous AI Agents (LangGraph, CrewAI, MCP — 70% token cut)\n• End-to-End Workflow Automation (n8n Verified, Make, Zapier)\n• Context-Aware RAG Systems (Qdrant, Pinecone, Docling)\n• Predictive ML, Vision & Audio AI (PyTorch, U-Net & MAML)\n• Decision Dashboards & Cloud Serving (FastAPI, Power BI, PostgreSQL)\nBook a free 20-min call at https://cal.com/adeelsi/20min or email hello@adeelsi.me.`
}

// Cleanly formats any message into structured paragraphs, bullet points, and clickable links with zero raw ** or # symbols
function renderFormattedMessage(text) {
  if (!text) return null

  const cleaned = String(text)
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/`([^`]+)`/g, '$1')
    .trim()

  const lines = cleaned.split(/\n+/).filter(Boolean)

  const linkifyLine = (line, lineIdx) => {
    const urlRegex = /(https?:\/\/[^\s)]+|hello@adeelsi\.me)/g
    const parts = line.split(urlRegex)

    return parts.map((part, idx) => {
      if (part === 'hello@adeelsi.me') {
        return (
          <a key={`${lineIdx}-${idx}`} href="mailto:hello@adeelsi.me">
            hello@adeelsi.me
          </a>
        )
      }
      if (/^https?:\/\//.test(part)) {
        const cleanUrl = part.replace(/[.,;!?]+$/, '')
        const label = cleanUrl.includes('cal.com/adeelsi/20min')
          ? 'cal.com/adeelsi/20min ↗'
          : cleanUrl.replace(/^https?:\/\/(www\.)?/, '')
        return (
          <a
            key={`${lineIdx}-${idx}`}
            href={cleanUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {label}
          </a>
        )
      }
      return <span key={`${lineIdx}-${idx}`}>{part}</span>
    })
  }

  return lines.map((line, idx) => {
    const trimmed = line.trim()
    const isBullet = /^[•\-–]\s+/.test(trimmed) || /^\d+[.)]\s+/.test(trimmed)
    return (
      <p
        key={idx}
        className={isBullet ? 'chat-msg__line chat-msg__line--bullet' : 'chat-msg__line'}
      >
        {linkifyLine(trimmed, idx)}
      </p>
    )
  })
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bodyRef = useRef(null)

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [messages, loading, open])

  const sendQuestion = async (questionText) => {
    const trimmed = questionText.trim()
    if (!trimmed || loading) return

    const nextMessages = [...messages, { role: 'user', content: trimmed }]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      })

      const contentType = response.headers.get('content-type') || ''
      if (response.ok && contentType.includes('application/json')) {
        const data = await response.json()
        if (data?.reply) {
          setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
          return
        }
      }

      // Intelligent fallback if deployed on static hosting before GROQ_API_KEY is set
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: getLocalPortfolioAnswer(trimmed),
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: getLocalPortfolioAnswer(trimmed),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendQuestion(input)
  }

  return (
    <div className="chat-widget">
      {!open ? (
        <button
          type="button"
          className="chat-launcher"
          onClick={() => setOpen(true)}
          aria-label="Open Muhammad Adeel AI Assistant"
        >
          <span className="chat-launcher__avatar-wrap">
            <img
              className="chat-launcher__avatar"
              src="/assets/aistudio/adeel_0af0bdd4.png"
              alt="Muhammad Adeel"
            />
            <span className="chat-launcher__dot" aria-hidden="true" />
          </span>
          <span className="chat-launcher__text">
            <span className="chat-launcher__title">Ask Adeel’s AI</span>
            <span className="chat-launcher__sub">Portfolio Agent</span>
          </span>
        </button>
      ) : (
        <div className="chat-panel" role="dialog" aria-label="Muhammad Adeel AI Assistant">
          <div className="chat-head">
            <div className="chat-head__info">
              <img
                className="chat-head__avatar"
                src="/assets/aistudio/adeel_0af0bdd4.png"
                alt="Muhammad Adeel"
              />
              <div>
                <h3 className="chat-head__name">Adeel’s AI Assistant</h3>
                <span className="chat-head__status">
                  <span className="chat-head__status-dot" aria-hidden="true" />
                  Instant Portfolio Answers
                </span>
              </div>
            </div>
            <button
              type="button"
              className="chat-head__close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <Close />
            </button>
          </div>

          <div className="chat-body" ref={bodyRef}>
            {messages.map((m, idx) => (
              <div key={idx} className={`chat-msg chat-msg--${m.role}`}>
                {renderFormattedMessage(m.content)}
              </div>
            ))}

            {messages.length === 1 && !loading && (
              <div className="chat-starters">
                {STARTERS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    className="chat-starter"
                    onClick={() => sendQuestion(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {loading && <div className="chat-typing">Thinking...</div>}
          </div>

          <form className="chat-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="chat-input"
              placeholder="Ask about projects, services, or booking..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className="chat-send"
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              <ArrowRight />
            </button>
          </form>

          <div className="chat-promo">
            <span className="chat-promo__text">Want an AI like this for your site?</span>
            <div className="chat-promo__links">
              <a
                href="#contact"
                className="chat-promo__link"
                onClick={() => setOpen(false)}
              >
                Contact me
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="chat-promo__link"
              >
                Book 20-min call ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
