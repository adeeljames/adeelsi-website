import { useEffect, useRef, useState, useCallback } from 'react'
import {
  ArrowRight,
  ClaudeIcon,
  Globe,
  MicrosoftIcon,
  N8nIcon,
} from './icons.jsx'
import './Hero.css'

const VIDEO_SRC = '/assets/aistudio/sea-storm_73066e98.mp4'
const POSTER_SRC = '/assets/aistudio/sea-storm_abe698cb.jpg'
const CROSSFADE_SECONDS = 1.45
const LINKEDIN_URL = 'https://www.linkedin.com/in/muhammadadeelai/'

const stats = [
  { value: '12', label: 'AI projects built' },
  { value: '12', label: 'Certifications' },
]
const bars = [34, 52, 44, 70, 88]

const heroCerts = [
  {
    title: 'n8n Verified Creator',
    Icon: N8nIcon,
    href: LINKEDIN_URL,
  },
  {
    title: 'Claude Code Partner',
    Icon: ClaudeIcon,
    href: LINKEDIN_URL,
  },
  {
    title: 'Microsoft Agent Architect',
    Icon: MicrosoftIcon,
    href: LINKEDIN_URL,
  },
]

export default function Hero() {
  const videoARef = useRef(null)
  const videoBRef = useRef(null)
  const [activeSlot, setActiveSlot] = useState('A')
  const [videoReady, setVideoReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [hoverLocked, setHoverLocked] = useState(false)
  const swappingRef = useRef(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsPlaying(false)
      return
    }
    const vA = videoARef.current
    if (!vA) return
    const p = vA.play()
    if (p?.catch) p.catch(() => {})
  }, [])

  useEffect(() => {
    const vA = videoARef.current
    const vB = videoBRef.current
    if (!vA || !vB) return

    if (isPlaying) {
      const current = activeSlot === 'A' ? vA : vB
      const p = current.play()
      if (p?.catch) p.catch(() => {})
    } else {
      const timer = setTimeout(() => {
        vA.pause()
        vB.pause()
      }, 900)
      return () => clearTimeout(timer)
    }
  }, [isPlaying, activeSlot])

  const handleTimeUpdate = useCallback(
    (slot) => {
      if (!isPlaying || slot !== activeSlot || swappingRef.current) return
      const currentVideo = slot === 'A' ? videoARef.current : videoBRef.current
      const nextVideo = slot === 'A' ? videoBRef.current : videoARef.current
      if (!currentVideo || !nextVideo) return

      const duration = currentVideo.duration
      if (!duration || !Number.isFinite(duration)) return

      const remaining = duration - currentVideo.currentTime
      if (remaining <= CROSSFADE_SECONDS) {
        swappingRef.current = true
        nextVideo.currentTime = 0
        const p = nextVideo.play()
        if (p?.catch) p.catch(() => {})
        setActiveSlot(slot === 'A' ? 'B' : 'A')

        setTimeout(() => {
          currentVideo.pause()
          currentVideo.currentTime = 0
          swappingRef.current = false
        }, CROSSFADE_SECONDS * 1000)
      }
    },
    [activeSlot, isPlaying]
  )

  const handleHeroClick = (e) => {
    if (e.target.closest('a, button')) return
    setHoverLocked(true)
    setIsPlaying((prev) => !prev)
  }

  const handleMouseLeave = () => {
    if (hoverLocked) {
      setIsPlaying(false)
    }
  }

  const handleMouseEnter = () => {
    if (hoverLocked) {
      setIsPlaying(true)
    }
  }

  return (
    <section
      className="hero"
      onClick={handleHeroClick}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div className="hero__media" aria-hidden="true">
        <img
          className={`hero__poster ${isPlaying && videoReady ? 'is-playing' : ''}`}
          src={POSTER_SRC}
          alt=""
        />
        <div className={`hero__video-stage ${isPlaying && videoReady ? 'is-active' : ''}`}>
          <video
            ref={videoARef}
            className={`hero__video ${activeSlot === 'A' ? 'is-current' : ''}`}
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            muted
            playsInline
            preload="auto"
            onCanPlay={() => setVideoReady(true)}
            onTimeUpdate={() => handleTimeUpdate('A')}
          />
          <video
            ref={videoBRef}
            className={`hero__video ${activeSlot === 'B' ? 'is-current' : ''}`}
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            muted
            playsInline
            preload="auto"
            onCanPlay={() => setVideoReady(true)}
            onTimeUpdate={() => handleTimeUpdate('B')}
          />
        </div>
        <div className="hero__scrim" />
        <div className="hero__rules"><span /><span /><span /></div>
      </div>

      <div className="hero__inner">
        <div className="hero__lead">
          <p className="hero__note">
            <Globe className="hero__note-icon" />
            <span>Based in Lahore, Pakistan<br />Building for teams worldwide</span>
          </p>

          <h1 className="hero__title">
            AI agents that<br />
            do the work.<br />
            Not <em>demos</em>
          </h1>

          <p className="hero__sub">
            I’m Muhammad Adeel, an AI engineer. I build agentic AI, RAG chatbots
            and automation that ship to production for founders and teams.
          </p>

          <div className="hero__cta">
            <a className="btn btn--flame hero__go" href="#work">
              See my work
              <span className="hero__go-dot" aria-hidden="true"><ArrowRight /></span>
            </a>
            <div className="hero__proof">
              <img className="hero__avatar" src="/assets/aistudio/adeel_0af0bdd4.png" alt="Muhammad Adeel" width="40" height="40" />
              <span className="hero__proof-text">
                <strong>Open to freelance work</strong>
                n8n Verified Creator
              </span>
            </div>
          </div>

          <ul className="hero__stats">
            {stats.map((s) => (
              <li key={s.label} className="stat">
                <span className="stat__mark" aria-hidden="true">*</span>
                <span className="stat__value">{s.value}</span>
                <span className="stat__label">{s.label}</span>
                <span className="stat__rule" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>

        <aside className="hero__ghost" aria-hidden="true">
          <div className="ghost__row">
            <div className="ghost__bars">{bars.map((h, i) => <span key={i} style={{ height: `${h}%` }} />)}</div>
            <p className="ghost__kpi"><strong>82.4%</strong>Test accuracy<br />on unseen audio</p>
          </div>
          <h2 className="ghost__title">Measured, not claimed</h2>
          <p className="ghost__copy">
            Every project ships with numbers: 70% fewer tokens in my MCP memory
            server, hybrid retrieval with reranking in my RAG systems.
          </p>
        </aside>
      </div>

      <div className="hero__foot">
        <span className="hero__watermark" aria-hidden="true">ADEEL</span>
        <div className="hero__certs" aria-label="Verified Certifications">
          {heroCerts.map(({ title, Icon, href }) => (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__cert-badge"
            >
              <span className="hero__cert-icon">
                <Icon />
              </span>
              <span>{title}</span>
              <span className="hero__cert-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
