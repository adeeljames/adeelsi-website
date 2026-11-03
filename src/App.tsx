import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Sections from './components/Sections.jsx'
import WardmailPage from './components/WardmailPage.jsx'
import ChatWidget from './components/ChatWidget.jsx'

function isWardmailHost(host: string) {
  return (
    host.startsWith('wardmail.') ||
    host.startsWith('www.wardmail.') ||
    host.includes('.wardmail.')
  )
}

function detectWardmailRoute() {
  if (typeof window === 'undefined') return false
  const host = window.location.hostname.toLowerCase()
  const path = window.location.pathname.toLowerCase()
  const params = new URLSearchParams(window.location.search)
  return (
    isWardmailHost(host) ||
    path === '/wardmail' ||
    path.startsWith('/wardmail/') ||
    params.get('page') === 'wardmail'
  )
}

export default function App() {
  const [isWardmail, setIsWardmail] = useState(detectWardmailRoute)

  useEffect(() => {
    const handlePopState = () => {
      setIsWardmail(detectWardmailRoute())
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (isWardmail) {
      document.title = 'Wardmail — Done-For-You 24/7 AI Email Agent | Muhammad Adeel'
    } else {
      document.title = 'Muhammad Adeel — AI Engineer & Certified Agent Architect'
    }
  }, [isWardmail])

  const handleNavigate = (targetPath: string, hash = '') => {
    const goWardmail = targetPath === '/wardmail'
    const host = window.location.hostname.toLowerCase()

    if (isWardmailHost(host) && !goWardmail) {
      window.location.href = `https://adeelsi.me/${hash}`
      return
    }

    const nextUrl = goWardmail
      ? isWardmailHost(host)
        ? '/'
        : '/wardmail'
      : `/${hash}`
    window.history.pushState({}, '', nextUrl)
    setIsWardmail(goWardmail)

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

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar isWardmail={isWardmail} onNavigate={handleNavigate} />
      <main id="main">
        {isWardmail ? (
          <WardmailPage onNavigate={handleNavigate} />
        ) : (
          <>
            <Hero />
            <Sections onNavigate={handleNavigate} />
          </>
        )}
      </main>
      <ChatWidget />
    </>
  )
}
