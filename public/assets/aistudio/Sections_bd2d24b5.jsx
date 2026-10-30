import { useEffect } from 'react'
import { ArrowRight } from './icons.jsx'
import './Sections.css'

const work = [
  { n: '01', title: 'Lahore Smog Watch', text: 'An AI agent that explains Lahore’s live air quality in plain language, using the Punjab EPA scale instead of the US one.', tags: ['LangGraph', 'Groq', 'FastAPI', 'NASA FIRMS'] },
  { n: '02', title: 'SBP Monetary Policy RAG', text: 'Table-aware retrieval over a dense central bank report, with hybrid search, reranking and cited answers.', tags: ['Docling', 'Qdrant', 'Cohere Rerank'] },
  { n: '03', title: 'Bird Voice AI', metric: '82.4%', text: 'Classifies 10 bird species from audio using YAMNet transfer learning. Accuracy on 450 unseen clips.', tags: ['TensorFlow', 'YAMNet', 'Gradio'] },
  { n: '04', title: 'Claude External Memory MCP', metric: '70%', text: 'Gives Claude persistent memory across sessions and cuts token usage by retrieving only what matters.', tags: ['MCP', 'Claude API', 'Python'] },
]
const services = [
  { title: 'AI agents', text: 'Support, research and analysis agents that answer on their own and hold anything sensitive for your approval.' },
  { title: 'RAG chatbots', text: 'Answers from your own documents with source citations, built on hybrid retrieval and reranking.' },
  { title: 'Workflow automation', text: 'n8n, Make and FastAPI services that replace repetitive work and run around the clock.' },
]
const creds = [
  'Anthropic: Claude Code badge', 'DataCamp: Data Scientist Associate', 'DataCamp: AI Engineer for Developers',
  'Udacity: Future AWS AI Programmer', 'Founderz: Agent Architect', 'Google: Gemini Certified Student',
  'DeepLearning.AI: Generative AI with LLMs', 'Astronomer: Apache Airflow 3', 'n8n Verified Template Creator',
  'Afrium Summer of Code 2026', 'Published preprint on conformal prediction',
]

export default function Sections() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((e) => e.classList.add('in'))
      return
    }
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    }), { threshold: 0.15 })
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <section className="sec" id="work">
        <p className="sec__eyebrow reveal">Selected work</p>
        <h2 className="sec__title reveal">Shipped, deployed and <em>measured</em></h2>
        <div className="work">
          {work.map((w, i) => (
            <article key={w.n} className="card reveal" style={{ '--d': `${i * 70}ms` }}>
              <span className="card__n">{w.n}</span>
              {w.metric && <span className="card__metric">{w.metric}</span>}
              <h3>{w.title}</h3>
              <p>{w.text}</p>
              <ul className="tags">{w.tags.map((t) => <li key={t}>{t}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="sec" id="services">
        <p className="sec__eyebrow reveal">What I build for you</p>
        <h2 className="sec__title reveal">Systems that work, <em>not just run</em></h2>
        <div className="services">
          {services.map((s, i) => (
            <div key={s.title} className="service reveal" style={{ '--d': `${i * 70}ms` }}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sec" id="credentials">
        <p className="sec__eyebrow reveal">Credentials</p>
        <h2 className="sec__title reveal">Proof, <em>not promises</em></h2>
        <ul className="creds reveal">{creds.map((c) => <li key={c}>{c}</li>)}</ul>
      </section>

      <section className="sec sec--contact" id="contact">
        <h2 className="contact__title reveal">Got a process that<br />eats your <em>week?</em></h2>
        <p className="contact__sub reveal">Tell me what is slow or manual. I’ll tell you what an agent can take off your plate.</p>
        <a className="btn btn--flame contact__go reveal" href="mailto:hello@adeelsi.me">
          hello@adeelsi.me
          <span className="hero__go-dot" aria-hidden="true"><ArrowRight /></span>
        </a>
        <ul className="links reveal">
          <li><a href="https://www.linkedin.com/in/muhammadadeelai/">LinkedIn</a></li>
          <li><a href="https://muhammadadeelai.medium.com">Medium</a></li>
          <li><a href="https://n8n.io/creators/aiadeel/">n8n templates</a></li>
        </ul>
      </section>

      <footer className="foot">© 2026 Muhammad Adeel · Lahore, Pakistan</footer>
    </>
  )
}
