import { useEffect, useState } from 'react'
import { Close, Logo, Menu } from './icons.jsx'
import './Navbar.css'

const portfolioLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'WhatsApp AI', href: '/whatsapp-agent', isRoute: true },
  { label: 'Blog', href: '/blog', isRoute: true },
  { label: 'Contact', href: '#contact' },
]

const wardmailLinks = [
  { label: 'How it works', href: '#how' },
  { label: 'Google Sheet', href: '#sheet' },
  { label: 'Demo & Panel', href: '#demo' },
  { label: 'Pricing', href: '#offer' },
  { label: 'WhatsApp AI', href: '/whatsapp-agent', isRoute: true },
  { label: 'Blog', href: '/blog', isRoute: true },
]

const whatsappLinks = [
  { label: 'Workflow', href: '#workflow' },
  { label: 'Admin Panel', href: '#panel' },
  { label: 'Demo', href: '#demo' },
  { label: 'Industries', href: '#industries' },
  { label: 'Pricing', href: '#offer' },
  { label: 'Blog', href: '/blog', isRoute: true },
]

export default function Navbar({
  isWardmail = false,
  isWhatsappAgent = false,
  isBlog = false,
  onNavigate,
}) {
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
    if (path === '/whatsapp-agent' && isWhatsappAgent) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    if (onNavigate) {
      e.preventDefault()
      onNavigate(path, hash)
    }
  }

  const activeLinks = isWhatsappAgent
    ? whatsappLinks
    : isWardmail
    ? wardmailLinks
    : portfolioLinks

  const isSubpage = isWardmail || isWhatsappAgent || isBlog

  return (
    <header className="nav">
      <a
        className="nav__brand"
        href={isSubpage ? '/' : '#main'}
        onClick={(e) => (isSubpage ? goRoute(e, '/') : undefined)}
      >
        <Logo className="nav__logo" />
        <span>Adeel</span>
        {isWardmail && <span className="nav__brand-tag">/ Wardmail</span>}
        {isWhatsappAgent && <span className="nav__brand-tag">/ WhatsApp AI</span>}
        {isBlog && <span className="nav__brand-tag">/ Blog</span>}
      </a>

      <nav className="nav__pill" aria-label="Primary">
        <ul>
          {isSubpage && (
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
              {link.isRoute ? (
                <a
                  href={link.href}
                  onClick={(e) => goRoute(e, link.href)}
                >
                  {link.label}
                </a>
              ) : (
                <a
                  href={isBlog ? `/${link.href}` : link.href}
                  onClick={(e) => (isBlog ? goRoute(e, '/', link.href) : undefined)}
                >
                  {link.label}
                </a>
              )}
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
        {/* Always-visible quick pill on mobile/tablet where .nav__pill is hidden */}
        <a
          href={isWardmail || isWhatsappAgent ? '/' : '/wardmail'}
          className={`nav__mobile-wardmail ${isWardmail || isWhatsappAgent ? 'is-active' : ''}`}
          onClick={(e) => goRoute(e, isWardmail || isWhatsappAgent ? '/' : '/wardmail')}
        >
          <span className="nav__wardmail-dot" aria-hidden="true" />
          <span>{isWardmail || isWhatsappAgent ? '← Portfolio' : 'Wardmail'}</span>
        </a>

        {isWardmail || isWhatsappAgent ? (
          <a
            className="btn btn--light nav__cta"
            href="https://cal.com/adeelsi/20min"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book 20-Min Call
          </a>
        ) : (
          <a
            className="btn btn--light nav__cta"
            href={isBlog ? '/#contact' : '#contact'}
            onClick={(e) => (isBlog ? goRoute(e, '/', '#contact') : undefined)}
          >
            Hire me
          </a>
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
                <span className="nav__wardmail-badge">PRODUCT</span>
              </a>
            </li>
            <li>
              <a
                href="/whatsapp-agent"
                className="nav__sheet-wardmail"
                onClick={(e) => goRoute(e, '/whatsapp-agent')}
              >
                <span className="nav__wardmail-dot" aria-hidden="true" />
                <span>WhatsApp AI — 24/7 Quote &amp; Booking Agent</span>
                <span className="nav__wardmail-badge">NEW</span>
              </a>
            </li>
            {isSubpage && (
              <li>
                <a href="/" onClick={(e) => goRoute(e, '/')}>
                  ← Back to Main Portfolio
                </a>
              </li>
            )}
            {activeLinks.map((link) => (
              <li key={link.label}>
                {link.isRoute ? (
                  <a href={link.href} onClick={(e) => goRoute(e, link.href)}>
                    {link.label}
                  </a>
                ) : (
                  <a
                    href={isBlog ? `/${link.href}` : link.href}
                    onClick={(e) => {
                      if (isBlog) {
                        goRoute(e, '/', link.href)
                      } else {
                        setOpen(false)
                      }
                    }}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
          {isWardmail || isWhatsappAgent ? (
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
            <a
              className="btn btn--flame nav__sheet-cta"
              href={isBlog ? '/#contact' : '#contact'}
              onClick={(e) => {
                if (isBlog) {
                  goRoute(e, '/', '#contact')
                } else {
                  setOpen(false)
                }
              }}
            >
              Hire me
            </a>
          )}
        </div>
      )}
    </header>
  )
}
