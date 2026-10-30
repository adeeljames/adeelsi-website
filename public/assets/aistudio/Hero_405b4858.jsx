import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Globe } from './icons.jsx'
import './Hero.css'

const stats = [
  { value: '11', label: 'AI projects built' },
  { value: '12', label: 'Certifications' },
]
const bars = [34, 52, 44, 70, 88]
const stack = ['LangGraph', 'Qdrant', 'FastAPI', 'n8n', 'PyTorch']

export default function Hero() {
  const videoRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const play = video.play()
    if (play?.catch) play.catch(() => {})
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause()
      setReady(true)
    }
  }, [])

  return (
    <section className="hero">
      <div className="hero__media">
        <video ref={videoRef} className={`hero__video ${ready ? 'is-ready' : ''}`} src="/hero-loop.mp4"
          autoPlay muted loop playsInline preload="auto" aria-hidden="true" onCanPlay={() => setReady(true)} />
        <div className="hero__scrim" aria-hidden="true" />
        <div className="hero__rules" aria-hidden="true"><span /><span /><span /></div>
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
              <img className="hero__avatar" src="/adeel.png" alt="Muhammad Adeel" width="40" height="40" />
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
        <div className="hero__partners">
          <span className="hero__partners-label">Built with</span>
          <ul>{stack.map((n) => <li key={n}><span>{n}</span></li>)}</ul>
        </div>
      </div>
    </section>
  )
}
