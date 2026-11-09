import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Sections from './components/Sections.jsx'
import WardmailPage from './components/WardmailPage.jsx'
import WhatsappAgentPage from './components/WhatsappAgentPage.jsx'
import BlogPage from './components/BlogPage.jsx'
import AdminBlogPanel from './components/AdminBlogPanel.jsx'
import ChatWidget from './components/ChatWidget.jsx'
import { applyDynamicSeo } from './utils/blogStore.js'

function isWardmailHost(host: string) {
  return (
    host.startsWith('wardmail.') ||
    host.startsWith('www.wardmail.') ||
    host.includes('.wardmail.')
  )
}

interface RouteState {
  page: 'portfolio' | 'wardmail' | 'whatsapp' | 'blog' | 'admin'
  slug: string
}

function detectRouteState(): RouteState {
  if (typeof window === 'undefined') {
    return { page: 'portfolio', slug: '' }
  }
  const host = window.location.hostname.toLowerCase()
  const rawPath = window.location.pathname.replace(/\/+$/, '') || '/'
  const path = rawPath.toLowerCase()
  const params = new URLSearchParams(window.location.search)
  const pageParam = params.get('page')?.toLowerCase()

  if (path === '/admin' || path.startsWith('/admin/') || pageParam === 'admin') {
    return { page: 'admin', slug: '' }
  }

  if (path === '/blog' || pageParam === 'blog') {
    return { page: 'blog', slug: params.get('slug') || '' }
  }

  if (path.startsWith('/blog/')) {
    const extractedSlug = rawPath.slice('/blog/'.length).trim()
    return { page: 'blog', slug: decodeURIComponent(extractedSlug) }
  }

  if (
    path === '/whatsapp-agent' ||
    path.startsWith('/whatsapp-agent/') ||
    path === '/rental-agent' ||
    path.startsWith('/rental-agent/') ||
    pageParam === 'whatsapp-agent' ||
    pageParam === 'whatsapp'
  ) {
    return { page: 'whatsapp', slug: '' }
  }

  if (
    isWardmailHost(host) ||
    path === '/wardmail' ||
    path.startsWith('/wardmail/') ||
    pageParam === 'wardmail'
  ) {
    return { page: 'wardmail', slug: '' }
  }

  return { page: 'portfolio', slug: '' }
}

export default function App() {
  const [route, setRoute] = useState<RouteState>(detectRouteState)

  useEffect(() => {
    const handlePopState = () => {
      setRoute(detectRouteState())
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (route.page === 'wardmail') {
      applyDynamicSeo({
        title: 'Wardmail — Done-For-You 24/7 AI Email Agent | Muhammad Adeel',
        description:
          'Done-for-you 24/7 AI email reply agent that answers customer emails from your Google Sheet knowledge base and flags sensitive emails for 1-click approval.',
        keywords: [
          'Wardmail',
          '24/7 AI email agent',
          'automated customer email replies',
          'Google Sheet AI agent',
          'Muhammad Adeel',
        ],
        canonicalPath: '/wardmail',
      })
    } else if (route.page === 'whatsapp') {
      applyDynamicSeo({
        title:
          'WhatsApp Booking Agent — 24/7 Multilingual Voice, PDF Quote & Booking AI | Adeel',
        description:
          'Done-for-you 24/7 Multilingual WhatsApp AI Agent for rental and service businesses. Handles voice notes (Deepgram), sends photos, checks live database dates, generates instant PDF quotes & booking receipts, and includes a Zero-Code Admin Panel.',
        keywords: [
          'WhatsApp AI Booking Agent',
          'WhatsApp AI agent for rental businesses',
          'multilingual WhatsApp voice agent',
          'automated WhatsApp PDF quote',
          'WhatsApp bot for cleaning and plumbers',
          'Muhammad Adeel',
        ],
        canonicalPath: '/whatsapp-agent',
      })
    } else if (route.page === 'portfolio') {
      applyDynamicSeo({
        title: 'Muhammad Adeel — AI Engineer & Certified Agent Architect',
        description:
          'Portfolio of Muhammad Adeel (@muhammadadeelai) — AI Engineer, Microsoft & Founderz Certified Agent Architect, and n8n Verified Creator in Lahore, Pakistan.',
        keywords: [
          'Muhammad Adeel',
          'AI Engineer Pakistan',
          'Certified Agent Architect',
          'n8n Verified Creator',
          'Context-Aware RAG',
          'Wardmail AI Email Agent',
          'WhatsApp Booking AI Agent',
        ],
        canonicalPath: '/',
      })
    }
  }, [route.page])

  const handleNavigate = (targetPath: string, hash = '') => {
    const cleanTarget = targetPath || '/'
    const host = window.location.hostname.toLowerCase()

    if (
      isWardmailHost(host) &&
      cleanTarget === '/' &&
      !cleanTarget.startsWith('/blog') &&
      !cleanTarget.startsWith('/admin') &&
      !cleanTarget.startsWith('/whatsapp-agent')
    ) {
      window.location.href = `https://adeelsi.me/${hash}`
      return
    }

    const nextUrl =
      cleanTarget === '/wardmail'
        ? isWardmailHost(host)
          ? '/'
          : '/wardmail'
        : cleanTarget === '/'
        ? `/${hash}`
        : `${cleanTarget}${hash}`

    window.history.pushState({}, '', nextUrl)
    setRoute(detectRouteState())

    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }, 60)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const isWardmail = route.page === 'wardmail'
  const isWhatsappAgent = route.page === 'whatsapp'
  const isBlog = route.page === 'blog'
  const isAdmin = route.page === 'admin'

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      {!isAdmin && (
        <Navbar
          isWardmail={isWardmail}
          isWhatsappAgent={isWhatsappAgent}
          isBlog={isBlog}
          onNavigate={handleNavigate}
        />
      )}
      <main id="main">
        {isAdmin ? (
          <AdminBlogPanel onNavigate={handleNavigate} />
        ) : isBlog ? (
          <BlogPage slug={route.slug} onNavigate={handleNavigate} />
        ) : isWhatsappAgent ? (
          <WhatsappAgentPage onNavigate={handleNavigate} />
        ) : isWardmail ? (
          <WardmailPage onNavigate={handleNavigate} />
        ) : (
          <>
            <Hero />
            <Sections onNavigate={handleNavigate} />
          </>
        )}
      </main>
      {!isAdmin && <ChatWidget />}
    </>
  )
}
