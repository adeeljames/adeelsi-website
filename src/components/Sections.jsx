import { useEffect, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  AstronomerIcon,
  ChatGPTIcon,
  ClaudeIcon,
  DataCampIcon,
  DeepLearningIcon,
  FounderzIcon,
  GeminiIcon,
  GitHubIcon,
  GrokIcon,
  LinkedInIcon,
  Logo,
  MicrosoftIcon,
  N8nIcon,
  UdacityIcon,
} from './icons.jsx'
import './Sections.css'

const LINKEDIN_URL = 'https://www.linkedin.com/in/muhammadadeelai/'
const GITHUB_URL = 'https://github.com/adeeljames'

const marqueeLeaders = [
  { org: 'Microsoft', cred: 'Certified Agent Architect', Icon: MicrosoftIcon },
  { org: 'Anthropic', cred: 'Claude Code Partner', Icon: ClaudeIcon },
  { org: 'n8n', cred: 'Verified Template Creator', Icon: N8nIcon },
  { org: 'Google', cred: 'Gemini Certified Student', Icon: GeminiIcon },
  { org: 'DeepLearning.AI', cred: 'Generative AI with LLMs', Icon: DeepLearningIcon },
  { org: 'Udacity · AWS', cred: 'Future AWS AI Programmer', Icon: UdacityIcon },
  { org: 'DataCamp', cred: 'AI Engineer & Data Scientist Associate', Icon: DataCampIcon },
  { org: 'Founderz', cred: 'Certified Agent Architect', Icon: FounderzIcon },
  { org: 'Astronomer', cred: 'Apache Airflow 3 Certified', Icon: AstronomerIcon },
  { org: 'GitHub · Afrium', cred: 'Summer of Code 2026', Icon: GitHubIcon },
]

const flexCertifications = [
  {
    title: 'n8n Verified Creator',
    sub: 'Official Creator Hub · LinkedIn',
    Icon: N8nIcon,
    href: LINKEDIN_URL,
  },
  {
    title: 'Claude Code Partner',
    sub: 'Anthropic Verified · LinkedIn',
    Icon: ClaudeIcon,
    href: LINKEDIN_URL,
  },
  {
    title: 'Microsoft Agent Architect',
    sub: 'Microsoft & Founderz · LinkedIn',
    Icon: MicrosoftIcon,
    href: LINKEDIN_URL,
  },
]

const architectKpis = [
  { value: '12×', label: 'Certifications', tone: 'orange' },
  { value: '12+', label: 'Shipped Systems', tone: 'orange' },
  { value: '70%', label: 'Token Cut (MCP)', tone: 'green' },
  { value: '100%', label: 'n8n Approval', tone: 'blue' },
]

const services = [
  {
    code: '01 // AUTONOMOUS AGENTS',
    title: 'Autonomous AI Agents',
    desc: '24/7 agents for live web research, lead conversion, and WhatsApp voice & PDF booking.',
    tags: ['LangGraph', 'CrewAI', 'MCP'],
    proof: '70% token cut via MCP',
  },
  {
    code: '02 // WORKFLOW ENGINES',
    title: 'End-to-End Automation',
    desc: 'Production pipelines across email ops, CRM sync, meeting intelligence, and publishing.',
    tags: ['n8n Verified', 'Make', 'Zapier'],
    proof: 'Zero-rejection n8n standard',
  },
  {
    code: '03 // PRODUCTION RAG',
    title: 'Context-Aware RAG Systems',
    desc: 'Hybrid retrieval, neural reranking, and context-preserving ingestion over complex reports.',
    tags: ['Qdrant', 'Pinecone', 'Docling'],
    proof: 'Verbatim cited accuracy',
  },
  {
    code: '04 // ML & DEEP LEARNING',
    title: 'Predictive ML, Vision & Audio AI',
    desc: 'Custom classification, YAMNet audio AI, and medical vision with SHAP & Conformal bounds.',
    tags: ['PyTorch', 'LightGBM', 'U-Net & MAML'],
    proof: 'Published on SSRN & Zenodo',
  },
  {
    code: '05 // DASHBOARDS & CLOUD',
    title: 'Decision Dashboards & Cloud Serving',
    desc: 'Executive BI dashboards paired with FastAPI microservices and cloud apps on Azure, Vertex & AWS.',
    tags: ['FastAPI', 'Power BI', 'PostgreSQL'],
    proof: 'End-to-end cloud delivery',
  },
]

const projects = [
  {
    n: '01',
    title: '24/7 WhatsApp Rental & Service Booking AI Agent',
    spark: '⚡ Voice Notes + PDF Quote & Receipt',
    text: 'Handles voice notes, sends fleet photos, generates instant PDF quotes, and issues verified booking receipts 24/7.',
    tags: ['FastAPI', 'LangChain', 'WhatsApp API'],
    category: 'agents',
    featured: true,
  },
  {
    n: '02',
    title: 'SBP Monetary Policy — Context-Aware Financial RAG',
    spark: '⚡ Docling + Qdrant + Cohere Rerank',
    text: 'Preserves complex central bank financial tables via Docling with hybrid Qdrant retrieval and verbatim inline citations.',
    tags: ['Docling', 'Qdrant', 'FastAPI'],
    category: 'rag',
    featured: true,
  },
  {
    n: '03',
    title: 'Claude External Memory MCP Server',
    spark: '⚡ 70% Token Cost Reduction',
    text: 'Gives Claude persistent cross-session memory while cutting token consumption by 70% via selective context injection.',
    tags: ['MCP', 'Claude API', 'Python'],
    category: 'rag',
    featured: true,
  },
  {
    n: '04',
    title: 'Lahore Smog Watch — Live Air Quality AI Agent',
    spark: '⚡ WAQI + NASA FIRMS + Open-Meteo',
    text: 'Fuses live station maps, 7-day forecasts, and NASA satellite crop-fire telemetry into plain-language advisories.',
    tags: ['LangGraph', 'FastAPI', 'NASA FIRMS'],
    category: 'agents',
    featured: true,
  },
  {
    n: '05',
    title: 'Bird Voice AI — 10-Species Audio Classification',
    spark: '⚡ 82.4% Unseen Test Accuracy',
    text: 'Transfer learning pipeline using Google YAMNet across 2,100 augmented spectrograms, deployed on HuggingFace.',
    tags: ['TensorFlow', 'YAMNet', 'Librosa'],
    category: 'ml',
    featured: false,
  },
  {
    n: '06',
    title: 'Pakistan Federal Budget Bilingual AI RAG',
    spark: '⚡ 160+ Pages · English & Urdu',
    text: 'Turns 160+ Federal Budget pages into a bilingual English/Urdu assistant using Parent-Document Retrieval on Pinecone.',
    tags: ['LangChain', 'Pinecone', 'Cerebras'],
    category: 'rag',
    featured: false,
  },
  {
    n: '07',
    title: 'Job Lead Converter B2B MCP Server',
    spark: '⚡ Automated Lead Enrichment',
    text: 'Scrapes hiring signals, enriches company firmographics, and surfaces verified decision-maker contacts automatically.',
    tags: ['MCP', 'Agentic AI', 'Python'],
    category: 'ml',
    featured: false,
  },
  {
    n: '08',
    title: 'Real Estate Conversational Property RAG',
    spark: '⚡ 24/7 Conversational Discovery',
    text: 'Enables buyers and renters to search and compare property listings naturally via Jina AI embeddings and Qdrant.',
    tags: ['Qdrant', 'Jina AI', 'Chainlit'],
    category: 'rag',
    featured: false,
  },
  {
    n: '09',
    title: 'Multi-Agent Content Pipeline — CrewAI',
    spark: '⚡ 3 Hours → 60 Seconds',
    text: 'Two-agent CrewAI pipeline where a Researcher agent gathers live web stats and a Writer agent drafts posts in 60s.',
    tags: ['CrewAI', 'Groq LLM', 'Python'],
    category: 'agents',
    featured: false,
  },
  {
    n: '10',
    title: 'Writing Style Cloning Agent — Agno + Pinecone',
    spark: '⚡ Voyage AI + Pinecone Memory',
    text: 'Extracts tone, cadence, and vocabulary from 3–5 writing samples into persistent Pinecone style vectors.',
    tags: ['Agno', 'Pinecone', 'Voyage AI'],
    category: 'agents',
    featured: false,
  },
  {
    n: '11',
    title: 'Autonomous CSV Data Analyst — LangGraph',
    spark: '⚡ CSV → Live Charts → PDF Report',
    text: 'Routes plain-English questions over uploaded CSVs to specialist Analyst and Chart Generator agents with PDF export.',
    tags: ['LangGraph', 'Streamlit', 'Matplotlib'],
    category: 'ml',
    featured: false,
  },
  {
    n: '12',
    title: 'Zero-Framework ReAct Agent & Glaucoma Few-Shot Vision',
    spark: '⚡ PyTorch U-Net + MAML Meta-Learning',
    text: 'First-principles Python ReAct agent paired with clinical glaucoma optic-disc segmentation via U-Net and MAML.',
    tags: ['PyTorch', 'U-Net & MAML', 'Python'],
    category: 'ml',
    featured: false,
  },
]

const projectCategories = [
  { id: 'featured', label: 'Featured', count: 4 },
  { id: 'agents', label: 'Autonomous Agents', count: 4 },
  { id: 'rag', label: 'RAG & MCP', count: 4 },
  { id: 'ml', label: 'ML, Vision & Data', count: 4 },
  { id: 'all', label: 'All Projects', count: 12 },
]

const experience = [
  {
    role: 'n8n Verified Template Creator',
    org: 'N8N',
    desc: 'Engineering verified production AI workflows across email operations, meeting intelligence, and multi-channel publishing.',
    date: 'JUN 2026 — PRESENT',
  },
  {
    role: 'AI Engineer — Agentic AI & Automation',
    org: 'EXCELLENCE CODE SOLUTION',
    desc: 'Building applied agentic backends and PyTorch U-Net + MAML few-shot medical computer vision segmentation.',
    date: 'JAN 2026 — PRESENT',
  },
  {
    role: 'AI Native Developer (ASoC 2026)',
    org: 'AFRIUM',
    desc: 'Architected the Dynamic Context Engine feeding real-time codebase and documentation context to autonomous AI agents.',
    date: 'JUL 2026 — PRESENT',
  },
  {
    role: 'Machine Learning Engineering',
    org: 'FLYRANK AI',
    desc: 'Built end-to-end machine learning pipelines, feature engineering, and model deployment workflows on real-world datasets.',
    date: 'JUN 2026 — SEP 2026',
  },
]

const AI_PROMPT =
  'Tell me about Muhammad Adeel (@muhammadadeelai), AI Engineer and Certified Agent Architect based in Lahore, Pakistan. Summarize his 5 production AI services (Autonomous Agents, Workflow Engines, Production RAG, ML & Deep Learning, Dashboards & Cloud), his 12 shipped projects (including 24/7 WhatsApp Booking AI Agent, SBP Financial RAG, Claude External Memory MCP with 70% token cut, Lahore Smog Watch, and Bird Voice AI with 82.4% accuracy), his 4 industry roles (n8n Verified Template Creator, Excellence Code Solution, Afrium ASoC 2026, FlyRank AI), his GitHub (https://github.com/adeeljames), and how to hire him at hello@adeelsi.me.'

const chatbots = [
  {
    name: 'Claude',
    Icon: ClaudeIcon,
    url: `https://claude.ai/new?q=${encodeURIComponent(AI_PROMPT)}`,
  },
  {
    name: 'Gemini',
    Icon: GeminiIcon,
    url: `https://www.google.com/search?udm=50&q=${encodeURIComponent(AI_PROMPT)}`,
  },
  {
    name: 'ChatGPT',
    Icon: ChatGPTIcon,
    url: `https://chatgpt.com/?q=${encodeURIComponent(AI_PROMPT)}`,
  },
  {
    name: 'Grok',
    Icon: GrokIcon,
    url: `https://grok.com/?q=${encodeURIComponent(AI_PROMPT)}`,
  },
]

export default function Sections() {
  const [activeCategory, setActiveCategory] = useState('featured')
  const [copiedBot, setCopiedBot] = useState('')

  const filteredProjects = projects.filter((p) => {
    if (activeCategory === 'featured') return p.featured
    if (activeCategory === 'all') return true
    return p.category === activeCategory
  })

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
      { threshold: 0.12 }
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])

  const handleBotClick = (botName) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(AI_PROMPT).catch(() => {})
    }
    setCopiedBot(`Pre-filled prompt ready for ${botName}`)
    setTimeout(() => setCopiedBot(''), 3500)
  }

  return (
    <>
      {/* MOVING LOGO MARQUEE BELOW HERO */}
      <section className="marquee-sec" aria-label="Certifications Marquee">
        <p className="marquee-sec__title">Certified from the industry leaders</p>
        <div className="marquee-viewport">
          <div className="marquee-track">
            {[...marqueeLeaders, ...marqueeLeaders].map((item, idx) => {
              const Icon = item.Icon
              return (
                <a
                  key={`${item.org}-${idx}`}
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="marquee-item"
                >
                  <span className="marquee-item__logo">
                    <Icon />
                  </span>
                  <span className="marquee-item__org">{item.org}</span>
                  <span className="marquee-item__sep" aria-hidden="true">·</span>
                  <span className="marquee-item__cred">{item.cred}</span>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* 01 // SERVICES · WHAT I BUILD (3 + 2 Bento Grid) */}
      <section className="sec" id="services">
        <div className="sec__head">
          <p className="sec__eyebrow reveal">[ 01 // SERVICES · WHAT I BUILD ]</p>
          <h2 className="sec__title reveal">
            Custom AI systems built<br />
            for ROI, <em>not demos.</em>
          </h2>
          <p className="sec__sub reveal">
            5 production systems engineered to eliminate manual bottlenecks and scale your operations 24/7.
          </p>
        </div>

        <div className="srv-grid">
          {services.map((s, i) => (
            <article
              key={s.code}
              className="srv-card reveal"
              style={{ '--d': `${i * 60}ms` }}
            >
              <ul className="srv-card__tags">
                {s.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>

              <div className="srv-card__body">
                <span className="srv-card__code">{s.code}</span>
                <h3 className="srv-card__title">{s.title}</h3>
                <p className="srv-card__desc">{s.desc}</p>
              </div>

              <div className="srv-card__foot">
                <span className="srv-card__proof">
                  <span className="srv-card__dot" aria-hidden="true" />
                  {s.proof}
                </span>
                <a className="srv-card__cta" href="#contact">
                  Build <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 02 // CERTIFIED AGENT ARCHITECT (Dedicated Section matching Screenshot 2) */}
      <section className="sec" id="architect">
        <div className="arch-wrap">
          <div className="arch-portrait reveal">
            <img
              className="arch-portrait__img"
              src="/assets/aistudio/Professional_Portrait_in_a_Warm_Modern_Studio_39773486.png"
              alt="Muhammad Adeel — Certified Agent Architect"
              loading="lazy"
            />
            <div className="arch-portrait__scrim" aria-hidden="true" />

            <div className="arch-portrait__top">
              <span className="arch-pill--amber">
                <span className="arch-pill__green-dot" aria-hidden="true" />
                Build · Automate
              </span>
              <span className="arch-pill--dark">@muhammadadeelai</span>
            </div>
          </div>

          <div className="arch-content">
            <p className="sec__eyebrow reveal">[ 02 // CERTIFIED AGENT ARCHITECT ]</p>

            <h2 className="arch-statement reveal">
              Yes — I am an officially Certified Agent Architect by Microsoft and Founderz, an Anthropic Claude Code Partner Badge holder, and an n8n Verified Template Creator engineering autonomous systems that replace manual work 24/7.
            </h2>

            <p className="arch-sub reveal">
              I combine <strong>FastAPI backends</strong>, <strong>LangChain</strong>, <strong>LangGraph</strong>, <strong>CrewAI &amp; Agno agents</strong>, and <strong>Qdrant &amp; Pinecone vector databases</strong> into cohesive systems that scale effortlessly.
            </p>

            {/* 3 Flex Certification Badges -> Redirect to LinkedIn */}
            <div className="arch-certs reveal">
              {flexCertifications.map(({ title, sub, Icon, href }) => (
                <a
                  key={title}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arch-cert-card"
                >
                  <span className="arch-cert-card__icon">
                    <Icon />
                  </span>
                  <span className="arch-cert-card__meta">
                    <span className="arch-cert-card__title">{title}</span>
                    <span className="arch-cert-card__sub">{sub}</span>
                  </span>
                  <span className="arch-cert-card__arrow" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>

            {/* 4 Color-Coded KPI Boxes matching Screenshot 2 */}
            <ul className="arch-kpis reveal">
              {architectKpis.map((k) => (
                <li key={k.label} className="arch-kpi">
                  <span className={`arch-kpi__val arch-kpi__val--${k.tone}`}>
                    {k.value}
                  </span>
                  <span className="arch-kpi__label">{k.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 03 // SELECTED WORK (COMPACT LIST WITH CATEGORY TABS) */}
      <section className="sec" id="work">
        <div className="work-header">
          <div className="sec__head">
            <p className="sec__eyebrow reveal">[ 03 // SELECTED WORK · 12 PRODUCTION SYSTEMS ]</p>
            <h2 className="sec__title reveal">
              Shipped, deployed and <em>measured</em>
            </h2>
          </div>

          <div className="work-tabs reveal" role="tablist" aria-label="Project categories">
            {projectCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`work-tab ${activeCategory === cat.id ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.label}</span>
                <span className="work-tab__count">({cat.count})</span>
              </button>
            ))}
          </div>
        </div>

        <ul className="work-list reveal">
          {filteredProjects.map((w) => (
            <li key={w.n} className="work-row">
              <span className="work-row__num">{w.n}</span>

              <div className="work-row__main">
                <div className="work-row__top">
                  <h3 className="work-row__title">{w.title}</h3>
                  <span className="work-row__spark">{w.spark}</span>
                </div>
                <p className="work-row__desc">{w.text}</p>
              </div>

              <div className="work-row__meta">
                <ul className="work-row__tags">
                  {w.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <a
                  className="work-row__link"
                  href="#contact"
                  aria-label={`Inquire about ${w.title}`}
                >
                  <ArrowUpRight />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 04 // PROFESSIONAL EXPERIENCE (Minimal Hairline Rows matching Screenshot 1) */}
      <section className="sec" id="experience">
        <div className="sec__head">
          <p className="sec__eyebrow reveal">[ 04 // PROFESSIONAL EXPERIENCE ]</p>
          <h2 className="sec__title reveal">
            4 industry roles across<br />
            <em>global AI ecosystems.</em>
          </h2>
          <p className="sec__sub reveal">
            Verified workflow engineering, applied medical computer vision R&amp;D, and open-source context infrastructure.
          </p>
        </div>

        <ul className="exp-table">
          {experience.map((item, i) => (
            <li
              key={item.role}
              className="exp-row reveal"
              style={{ '--d': `${i * 60}ms` }}
            >
              <div className="exp-row__left">
                <h3 className="exp-row__role">{item.role}</h3>
                <span className="exp-row__org">{item.org}</span>
              </div>
              <p className="exp-row__desc">{item.desc}</p>
              <span className="exp-row__date">{item.date}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* CONTACT + ASK ABOUT ME WITH YOUR FAVOURITE CHATBOT */}
      <section className="sec sec--contact" id="contact">
        <h2 className="contact__title reveal">
          Got a process that<br />
          eats your <em>week?</em>
        </h2>
        <p className="contact__sub reveal">
          Tell me what is slow or manual. I’ll tell you what an agent can take off your plate.
        </p>
        <div className="contact__actions reveal">
          <a className="btn btn--flame contact__go" href="mailto:hello@adeelsi.me">
            hello@adeelsi.me
            <span className="hero__go-dot" aria-hidden="true">
              <ArrowRight />
            </span>
          </a>
          <a
            className="btn btn--light contact__call"
            href="https://cal.com/adeelsi/20min"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a free 20 min call
            <span className="contact__call-dot" aria-hidden="true">
              <ArrowUpRight />
            </span>
          </a>
        </div>

        <div className="ai-ask reveal">
          <p className="ai-ask__eyebrow">AI-Native Discovery</p>
          <h3 className="ai-ask__title">Ask about me with your favourite chatbot</h3>
          <p className="ai-ask__sub">
            Click any AI assistant to open a pre-filled prompt about my engineering work, projects, and stack.
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
      </section>

      {/* PROPER MULTI-COLUMN FOOTER WITH GITHUB & LLMS.TXT */}
      <footer className="foot">
        <div className="foot__grid">
          <div className="foot__brand">
            <a className="foot__logo" href="#main">
              <Logo />
              <span>Muhammad Adeel</span>
            </a>
            <p className="foot__bio">
              AI Engineer &amp; Certified Agent Architect building production-grade autonomous agents, context-aware RAG systems, and workflow automation for teams worldwide.
            </p>
            <span className="foot__status">
              <span className="srv-card__dot" aria-hidden="true" />
              Based in Lahore, Pakistan · Open to freelance &amp; global roles
            </span>
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
              <li><a href="#services">01 // Services</a></li>
              <li><a href="#architect">02 // Agent Architect</a></li>
              <li><a href="#work">03 // Selected Work (12)</a></li>
              <li><a href="#experience">04 // Experience</a></li>
              <li><a href="#contact">Contact &amp; Hire</a></li>
            </ul>
          </div>

          <div>
            <p className="foot__col-title">Profiles &amp; Proof</p>
            <ul className="foot__nav">
              <li>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                  <GitHubIcon />
                  <span>GitHub (@adeeljames) ↗</span>
                </a>
              </li>
              <li>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                  <LinkedInIcon />
                  <span>LinkedIn ↗</span>
                </a>
              </li>
              <li>
                <a href="https://muhammadadeelai.medium.com" target="_blank" rel="noopener noreferrer">
                  <span>Medium Articles ↗</span>
                </a>
              </li>
              <li>
                <a href="https://n8n.io/creators/aiadeel/" target="_blank" rel="noopener noreferrer">
                  <span>n8n Verified Templates ↗</span>
                </a>
              </li>
              <li>
                <a href="mailto:hello@adeelsi.me">hello@adeelsi.me</a>
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
          <span>© 2026 Muhammad Adeel (@muhammadadeelai) · Lahore, Pakistan</span>
          <div className="foot__bottom-links">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="/llms.txt" target="_blank" rel="noopener noreferrer">llms.txt</a>
            <a href="#main">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </>
  )
}
