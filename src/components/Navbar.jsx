import { useEffect, useState } from 'react'
import { Close, Logo, Menu } from './icons.jsx'
import './Navbar.css'

const portfolioLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Architect', href: '#architect' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const wardmailLinks = [
  { label: 'How it works', href: '#how' },
  { label: 'Google Sheet', href: '#sheet' },
  { label: 'Demo & Panel', href: '#demo' },
  { label: 'Pricing & Training', href: '#offer' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar({ isWardmail = false, onNavigate }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const goRoute = (e, path, hash = '') => {
    setOpen(false)
    if (path === '/wardmail' && isWardmail) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    if (onNavigate) {
      e.preventDefault()
      onNavigate(path, hash)
    }
  }

  const activeLinks = isWardmail ? wardmailLinks : portfolioLinks

  return (
    <header className="nav">
      <a
        className="nav__brand"
        href={isWardmail ? '/' : '#main'}
        onClick={(e) => (isWardmail ? goRoute(e, '/') : undefined)}
      >
        <Logo className="nav__logo" />
        <span>Adeel</span>
        {isWardmail && <span className="nav__brand-tag">/ Wardmail</span>}
      </a>

      <nav className="nav__pill" aria-label="Primary">
        <ul>
          {isWardmail && (
            <li>
              <a
                href="/"
                className="nav__back-link"
                onClick={(e) => goRoute(e, '/')}
              >
                ← Portfolio
              </a>
            </li>
          )}

          {activeLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}

          <li>
            <a
              href="/wardmail"
              className={`nav__wardmail ${isWardmail ? 'is-active' : ''}`}
              onClick={(e) => goRoute(e, '/wardmail')}
            >
              <span className="nav__wardmail-dot" aria-hidden="true" />
              <span>Wardmail</span>
              <span className="nav__wardmail-badge">PRODUCT</span>
            </a>
          </li>
        </ul>
      </nav>

      <div className="nav__actions">
        {/* Always-visible Wardmail quick pill on mobile/tablet where .nav__pill is hidden */}
        <a
          href={isWardmail ? '/' : '/wardmail'}
          className={`nav__mobile-wardmail ${isWardmail ? 'is-active' : ''}`}
          onClick={(e) => goRoute(e, isWardmail ? '/' : '/wardmail')}
        >
          <span className="nav__wardmail-dot" aria-hidden="true" />
          <span>{isWardmail ? '← Portfolio' : 'Wardmail'}</span>
        </a>

        {isWardmail ? (
          <a
            className="btn btn--light nav__cta"
            href="https://cal.com/adeelsi/20min"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book 20-Min Call
          </a>
        ) : (
          <a className="btn btn--light nav__cta" href="#contact">Hire me</a>
        )}
        <button
          className="nav__burger"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <Close /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="nav__sheet">
          <ul>
            <li>
              <a
                href="/wardmail"
                className="nav__sheet-wardmail"
                onClick={(e) => goRoute(e, '/wardmail')}
              >
                <span className="nav__wardmail-dot" aria-hidden="true" />
                <span>Wardmail — 24/7 AI Email Agent</span>
                <span className="nav__wardmail-badge">NEW</span>
              </a>
            </li>
            {isWardmail && (
              <li>
                <a href="/" onClick={(e) => goRoute(e, '/')}>
                  ← Back to Main Portfolio
                </a>
              </li>
            )}
            {activeLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
              </li>
            ))}
          </ul>
          {isWardmail ? (
            <a
              className="btn btn--flame nav__sheet-cta"
              href="https://cal.com/adeelsi/20min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              Book a Free 20-Min Call
            </a>
          ) : (
            <a className="btn btn--flame nav__sheet-cta" href="#contact" onClick={() => setOpen(false)}>
              Hire me
            </a>
          )}
        </div>
      )}
    </header>
  )
}
