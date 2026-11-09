import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  GitHubIcon,
  LinkedInIcon,
  Logo,
  N8nIcon,
} from './icons.jsx'
import { ADEEL_PORTRAIT_B64 } from './wardmailAssets.js'
import {
  applyDynamicSeo,
  buildArticleJsonLd,
  loadBlogs,
  resolveBlogImageUrl,
  slugifyText,
} from '../utils/blogStore.js'
import './BlogPage.css'

const CAL_URL = 'https://cal.com/adeelsi/20min'
const GITHUB_URL = 'https://github.com/adeeljames'
const LINKEDIN_URL = 'https://www.linkedin.com/in/muhammadadeelai/'

export default function BlogPage({ slug = '', onNavigate }) {
  const [posts, setPosts] = useState(() => loadBlogs())
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [openFaqIdx, setOpenFaqIdx] = useState(0)

  useEffect(() => {
    const refresh = () => setPosts(loadBlogs())
    window.addEventListener('blogs-updated', refresh)
    return () => window.removeEventListener('blogs-updated', refresh)
  }, [])

  const activePost = useMemo(() => {
    if (!slug) return null
    return (
      posts.find((p) => p.slug === slug || p.id === slug) || null
    )
  }, [posts, slug])

  // Dynamic SEO Head & JSON-LD injection
  useEffect(() => {
    if (activePost) {
      const resolvedImg = resolveBlogImageUrl(activePost.coverImage?.url)
      const absImg = resolvedImg.startsWith('http')
        ? resolvedImg
        : `https://adeelsi.me${resolvedImg.startsWith('/') ? '' : '/'}${resolvedImg}`

      applyDynamicSeo({
        title: activePost.seoTitle || `${activePost.title} | Muhammad Adeel`,
        description: activePost.metaDescription || activePost.subtitle || '',
        keywords: activePost.keywords || [],
        canonicalPath: `/blog/${activePost.slug}`,
        ogType: 'article',
        imageUrl: absImg,
        imageAlt: activePost.coverImage?.alt || activePost.title,
        jsonLd: buildArticleJsonLd(activePost),
      })
    } else {
      applyDynamicSeo({
        title: 'AI Automation, n8n Workflows & RAG Engineering Blog | Muhammad Adeel',
        description:
          'Read practical engineering guides and case studies by Muhammad Adeel on 24/7 AI email agents, n8n workflow automation, Context-Aware RAG systems, and Model Context Protocol (MCP).',
        keywords: [
          'AI engineering blog',
          '24/7 AI email agent guide',
          'n8n workflow automation tutorials',
          'Context-Aware RAG systems',
          'Model Context Protocol MCP',
          'Muhammad Adeel blog',
        ],
        canonicalPath: '/blog',
        ogType: 'website',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Muhammad Adeel — AI Engineering & Automation Blog',
          url: 'https://adeelsi.me/blog',
          description:
            'Architectural guides on autonomous AI agents, 24/7 email automation, n8n workflows, and production RAG.',
          author: {
            '@type': 'Person',
            name: 'Muhammad Adeel',
            url: 'https://adeelsi.me/',
          },
          blogPost: posts.map((p) => ({
            '@type': 'BlogPosting',
            headline: p.title,
            url: `https://adeelsi.me/blog/${p.slug}`,
            datePublished: p.publishedAt,
            description: p.metaDescription || p.subtitle,
          })),
        },
      })
    }
  }, [activePost, posts])

  const categories = useMemo(() => {
    const unique = new Set(posts.map((p) => p.category).filter(Boolean))
    return ['All', ...unique]
  }, [posts])

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const catMatch =
        selectedCategory === 'All' || post.category === selectedCategory
      if (!catMatch) return false
      if (!searchQuery.trim()) return true
      const q = searchQuery.toLowerCase()
      return (
        post.title?.toLowerCase().includes(q) ||
        post.subtitle?.toLowerCase().includes(q) ||
        post.metaDescription?.toLowerCase().includes(q) ||
        post.category?.toLowerCase().includes(q) ||
        (post.keywords || []).some((k) => k.toLowerCase().includes(q))
      )
    })
  }, [posts, selectedCategory, searchQuery])

  const featuredPost = useMemo(() => {
    return posts.find((p) => p.featured) || posts[0] || null
  }, [posts])

  const go = (e, path, hash = '') => {
    if (onNavigate) {
      e.preventDefault()
      onNavigate(path, hash)
    }
  }

  // ==================== SINGLE ARTICLE READER (/blog/:slug) ====================
  if (slug) {
    if (!activePost) {
      return (
        <div className="blog-page">
          <div className="blog-wrap blog-notfound">
            <p className="blog-eyebrow">Article Not Found</p>
            <h1 className="blog-h1">We couldn&apos;t find that article.</h1>
            <p className="blog-lede">
              The link may have changed, or you can browse all published guides below.
            </p>
            <div className="blog-notfound__actions">
              <a
                href="/blog"
                className="btn btn--flame"
                onClick={(e) => go(e, '/blog')}
              >
                <span>Back to All Articles</span>
                <span className="hero__go-dot" aria-hidden="true">
                  <ArrowRight />
                </span>
              </a>
            </div>
          </div>
        </div>
      )
    }

    const headings = (activePost.contentBlocks || [])
      .filter((b) => b.type === 'heading' && b.text)
      .map((b) => ({
        id: `sec-${slugifyText(b.text)}`,
        text: b.text,
      }))

    const relatedPosts = posts
      .filter((p) => p.slug !== activePost.slug)
      .slice(0, 3)

    const coverUrl = resolveBlogImageUrl(activePost.coverImage?.url)

    return (
      <div className="blog-page">
        <article className="blog-article" itemScope itemType="https://schema.org/BlogPosting">
          <div className="blog-wrap">
            {/* Breadcrumb Navigation */}
            <nav className="blog-breadcrumb" aria-label="Breadcrumb">
              <a href="/" onClick={(e) => go(e, '/')}>Home</a>
              <span aria-hidden="true">/</span>
              <a href="/blog" onClick={(e) => go(e, '/blog')}>Blog</a>
              <span aria-hidden="true">/</span>
              <span className="blog-breadcrumb__current">{activePost.category || 'Article'}</span>
            </nav>

            {/* Article Header */}
            <header className="blog-article__header">
              <div className="blog-meta-line">
                <span>{activePost.category || 'AI Engineering'}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={activePost.publishedAt} itemProp="datePublished">
                  Published {activePost.publishedAt}
                </time>
                <span aria-hidden="true">·</span>
                <span>{activePost.readTimeMinutes || 5} min read</span>
                <span aria-hidden="true">·</span>
                <span itemProp="author">By Muhammad Adeel</span>
              </div>

              <h1 className="blog-article__h1" itemProp="headline">
                {activePost.title}
              </h1>

              {activePost.subtitle && (
                <p className="blog-article__sub" itemProp="description">
                  {activePost.subtitle}
                </p>
              )}
            </header>

            {/* Cover Picture with SEO Alt Text & Caption */}
            <figure className="blog-cover">
              <div className="blog-cover__frame">
                <img
                  src={coverUrl}
                  alt={activePost.coverImage?.alt || activePost.title}
                  itemProp="image"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
                <div className="blog-cover__fallback" aria-hidden="true">
                  <span>{activePost.title}</span>
                </div>
              </div>
              {activePost.coverImage?.caption && (
                <figcaption className="blog-cover__caption">
                  {activePost.coverImage.caption}
                </figcaption>
              )}
            </figure>

            {/* 2-Column Asymmetric Reader Layout */}
            <div className="blog-reader-grid">
              {/* Left Sticky Rail: Table of Contents + Keywords + Quick CTA */}
              <aside className="blog-rail">
                {headings.length > 0 && (
                  <div className="blog-rail__box">
                    <p className="blog-rail__label">In This Guide</p>
                    <ul className="blog-toc">
                      {headings.map((h) => (
                        <li key={h.id}>
                          <a href={`#${h.id}`}>{h.text}</a>
                        </li>
                      ))}
                      {Array.isArray(activePost.faqs) && activePost.faqs.length > 0 && (
                        <li>
                          <a href="#article-faq">Frequently Asked Questions</a>
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                <div className="blog-rail__box blog-rail__cta">
                  <p className="blog-rail__label">
                    {activePost.ctaType === 'wardmail'
                      ? 'Done-For-You 24/7 AI Inbox'
                      : 'Need a Custom AI System?'}
                  </p>
                  <h3 className="blog-rail__cta-title">
                    {activePost.ctaType === 'wardmail'
                      ? 'Want an AI agent replying to your emails 24/7?'
                      : 'Book a free 20-minute architecture call'}
                  </h3>
                  <p className="blog-rail__cta-text">
                    {activePost.ctaType === 'wardmail'
                      ? 'Keep your current inbox. Update answers from a Google Sheet. We set up & train your team.'
                      : 'Review your workflow with Muhammad Adeel and get a clear roadmap & quote.'}
                  </p>
                  <div className="blog-rail__cta-btns">
                    <a
                      href={CAL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--flame blog-rail__btn"
                    >
                      <span>Book Free 20-Min Call</span>
                      <ArrowUpRight />
                    </a>
                    <a
                      href="/wardmail"
                      className="blog-rail__link"
                      onClick={(e) => go(e, '/wardmail')}
                    >
                      Explore Wardmail 24/7 Email Agent →
                    </a>
                  </div>
                </div>
              </aside>

              {/* Right Main Prose Column */}
              <div className="blog-prose" itemProp="articleBody">
                {(activePost.contentBlocks || []).map((block, idx) => {
                  if (block.type === 'heading') {
                    const secId = `sec-${slugifyText(block.text || `section-${idx}`)}`
                    return (
                      <h2 key={block.id || idx} id={secId} className="blog-prose__h2">
                        {block.text}
                      </h2>
                    )
                  }

                  if (block.type === 'paragraph') {
                    return (
                      <p key={block.id || idx} className="blog-prose__p">
                        {block.text}
                      </p>
                    )
                  }

                  if (block.type === 'list') {
                    return (
                      <ul key={block.id || idx} className="blog-prose__list">
                        {(block.items || []).map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )
                  }

                  if (block.type === 'callout') {
                    return (
                      <div key={block.id || idx} className="blog-prose__callout">
                        {block.title && (
                          <p className="blog-prose__callout-title">{block.title}</p>
                        )}
                        <p className="blog-prose__callout-text">{block.text}</p>
                      </div>
                    )
                  }

                  if (block.type === 'image') {
                    const inlineImgUrl = resolveBlogImageUrl(block.url)
                    return (
                      <figure key={block.id || idx} className="blog-prose__figure">
                        <div className="blog-prose__img-wrap">
                          <img
                            src={inlineImgUrl}
                            alt={block.alt || activePost.title}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        {(block.caption || block.alt) && (
                          <figcaption className="blog-prose__figcaption">
                            {block.caption || block.alt}
                          </figcaption>
                        )}
                      </figure>
                    )
                  }

                  return null
                })}

                {/* Targeted Keywords Reference Line */}
                {Array.isArray(activePost.keywords) && activePost.keywords.length > 0 && (
                  <div className="blog-prose__topics">
                    <span className="blog-prose__topics-label">Topics covered:</span>
                    <span>{activePost.keywords.join(' · ')}</span>
                  </div>
                )}

                {/* Google FAQ Rich Snippets Accordion */}
                {Array.isArray(activePost.faqs) && activePost.faqs.length > 0 && (
                  <section className="blog-faq" id="article-faq" aria-label="Frequently Asked Questions">
                    <p className="blog-eyebrow">Frequently Asked Questions</p>
                    <h2 className="blog-faq__title">Quick answers on this topic</h2>
                    <div className="blog-faq__list">
                      {activePost.faqs.map((faq, i) => {
                        const isOpen = openFaqIdx === i
                        return (
                          <div
                            key={i}
                            className={`blog-faq__item ${isOpen ? 'is-open' : ''}`}
                          >
                            <button
                              type="button"
                              className="blog-faq__q"
                              aria-expanded={isOpen}
                              onClick={() => setOpenFaqIdx(isOpen ? -1 : i)}
                            >
                              <span>{faq.question}</span>
                              <span className="blog-faq__icon" aria-hidden="true">
                                {isOpen ? '−' : '+'}
                              </span>
                            </button>
                            {isOpen && (
                              <p className="blog-faq__a">{faq.answer}</p>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </section>
                )}

                {/* Author Bio & Conversion Banner */}
                <div className="blog-author-card">
                  <img
                    src={ADEEL_PORTRAIT_B64}
                    alt="Muhammad Adeel — AI Engineer and Certified Agent Architect"
                    className="blog-author-card__avatar"
                  />
                  <div className="blog-author-card__body">
                    <p className="blog-author-card__role">
                      Written by Muhammad Adeel · AI Engineer &amp; n8n Verified Creator
                    </p>
                    <h3 className="blog-author-card__name">
                      Want this system built and managed for your team?
                    </h3>
                    <p className="blog-author-card__bio">
                      I build production-grade 24/7 AI email agents (Wardmail), custom n8n workflows, and Context-Aware RAG systems. Book a free 20-minute discovery call to walk through your workflow.
                    </p>
                    <div className="blog-author-card__actions">
                      <a
                        href={CAL_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--flame"
                      >
                        <span>Book Free 20-Min Call</span>
                        <span className="hero__go-dot" aria-hidden="true">
                          <ArrowRight />
                        </span>
                      </a>
                      <a
                        href="/wardmail"
                        className="btn btn--light"
                        onClick={(e) => go(e, '/wardmail')}
                      >
                        <span>See Wardmail 24/7 Agent</span>
                        <ArrowUpRight />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="blog-related">
            <div className="blog-wrap">
              <div className="blog-related__head">
                <div>
                  <p className="blog-eyebrow">Continue Reading</p>
                  <h2 className="blog-h2">More AI Engineering &amp; Automation Guides</h2>
                </div>
                <a
                  href="/blog"
                  className="btn btn--light"
                  onClick={(e) => go(e, '/blog')}
                >
                  <span>All Articles</span>
                  <ArrowUpRight />
                </a>
              </div>

              <div className="blog-grid">
                {relatedPosts.map((post) => {
                  const imgSrc = resolveBlogImageUrl(post.coverImage?.url)
                  const postUrl = `/blog/${post.slug}`
                  return (
                    <article key={post.id || post.slug} className="blog-card">
                      <a
                        href={postUrl}
                        className="blog-card__media"
                        onClick={(e) => go(e, postUrl)}
                      >
                        <img
                          src={imgSrc}
                          alt={post.coverImage?.alt || post.title}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      </a>
                      <div className="blog-card__body">
                        <div className="blog-meta-line">
                          <span>{post.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{post.publishedAt}</span>
                          <span aria-hidden="true">·</span>
                          <span>{post.readTimeMinutes || 5} min read</span>
                        </div>
                        <h3 className="blog-card__title">
                          <a href={postUrl} onClick={(e) => go(e, postUrl)}>
                            {post.title}
                          </a>
                        </h3>
                        <p className="blog-card__desc">
                          {post.metaDescription || post.subtitle}
                        </p>
                        <a
                          href={postUrl}
                          className="blog-card__more"
                          onClick={(e) => go(e, postUrl)}
                        >
                          <span>Read article</span>
                          <ArrowRight />
                        </a>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        <BlogFooter onNavigate={onNavigate} />
      </div>
    )
  }

  // ==================== BLOG HUB INDEX (/blog) ====================
  return (
    <div className="blog-page">
      <section className="blog-hero">
        <div className="blog-wrap">
          <div className="blog-hero__top">
            <div>
              <p className="blog-eyebrow">AI Engineering &amp; Automation Playbooks</p>
              <h1 className="blog-h1">
                Practical guides on <em>24/7 AI agents, n8n &amp; RAG.</em>
              </h1>
              <p className="blog-lede">
                Real architectures, cost benchmarks, and step-by-step breakdowns for founders and teams automating email support, document search, and operations.
              </p>
            </div>
          </div>

          {/* Featured Spotlight Article Split */}
          {featuredPost && selectedCategory === 'All' && !searchQuery.trim() && (
            <article className="blog-spotlight">
              <a
                href={`/blog/${featuredPost.slug}`}
                className="blog-spotlight__media"
                onClick={(e) => go(e, `/blog/${featuredPost.slug}`)}
              >
                <img
                  src={resolveBlogImageUrl(featuredPost.coverImage?.url)}
                  alt={featuredPost.coverImage?.alt || featuredPost.title}
                  referrerPolicy="no-referrer"
                />
              </a>
              <div className="blog-spotlight__content">
                <div className="blog-meta-line">
                  <span>Featured Guide</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredPost.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featuredPost.readTimeMinutes || 5} min read</span>
                </div>
                <h2 className="blog-spotlight__title">
                  <a
                    href={`/blog/${featuredPost.slug}`}
                    onClick={(e) => go(e, `/blog/${featuredPost.slug}`)}
                  >
                    {featuredPost.title}
                  </a>
                </h2>
                <p className="blog-spotlight__desc">
                  {featuredPost.subtitle || featuredPost.metaDescription}
                </p>
                <div className="blog-spotlight__actions">
                  <a
                    href={`/blog/${featuredPost.slug}`}
                    className="btn btn--flame"
                    onClick={(e) => go(e, `/blog/${featuredPost.slug}`)}
                  >
                    <span>Read Featured Guide</span>
                    <span className="hero__go-dot" aria-hidden="true">
                      <ArrowRight />
                    </span>
                  </a>
                </div>
              </div>
            </article>
          )}

          {/* Interactive Filter Tabs & Search Bar */}
          <div className="blog-toolbar">
            <div className="blog-tabs" role="tablist" aria-label="Filter articles by topic">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === cat}
                  className={`blog-tab ${selectedCategory === cat ? 'is-active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="blog-search">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles or keywords..."
                aria-label="Search blog articles"
                className="blog-search__input"
              />
            </div>
          </div>

          {/* 3-Column Articles Grid */}
          {filteredPosts.length === 0 ? (
            <div className="blog-empty">
              <h3>No articles match &ldquo;{searchQuery}&rdquo;</h3>
              <p>Try clearing your search or selecting a different topic tab.</p>
              <button
                type="button"
                className="btn btn--light"
                onClick={() => {
                  setSelectedCategory('All')
                  setSearchQuery('')
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="blog-grid">
              {filteredPosts.map((post) => {
                const imgSrc = resolveBlogImageUrl(post.coverImage?.url)
                const postUrl = `/blog/${post.slug}`
                return (
                  <article key={post.id || post.slug} className="blog-card">
                    <a
                      href={postUrl}
                      className="blog-card__media"
                      onClick={(e) => go(e, postUrl)}
                    >
                      <img
                        src={imgSrc}
                        alt={post.coverImage?.alt || post.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </a>
                    <div className="blog-card__body">
                      <div className="blog-meta-line">
                        <span>{post.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.publishedAt}</span>
                        <span aria-hidden="true">·</span>
                        <span>{post.readTimeMinutes || 5} min read</span>
                      </div>
                      <h2 className="blog-card__title">
                        <a href={postUrl} onClick={(e) => go(e, postUrl)}>
                          {post.title}
                        </a>
                      </h2>
                      <p className="blog-card__desc">
                        {post.metaDescription || post.subtitle}
                      </p>
                      <a
                        href={postUrl}
                        className="blog-card__more"
                        onClick={(e) => go(e, postUrl)}
                      >
                        <span>Read full article</span>
                        <ArrowRight />
                      </a>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <BlogFooter onNavigate={onNavigate} />
    </div>
  )
}

function BlogFooter({ onNavigate }) {
  const go = (e, path, hash = '') => {
    if (onNavigate) {
      e.preventDefault()
      onNavigate(path, hash)
    }
  }

  return (
    <footer className="foot">
      <div className="foot__grid">
        <div className="foot__brand">
          <a className="foot__logo" href="/" onClick={(e) => go(e, '/')}>
            <Logo />
            <span>Muhammad Adeel</span>
          </a>
          <p className="foot__bio">
            AI Engineer &amp; Certified Agent Architect building production-grade autonomous agents, Wardmail 24/7 AI email agents, and workflow automation for teams worldwide.
          </p>
          <div className="foot__socials">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="foot__social-icon"
              aria-label="GitHub (@adeeljames)"
            >
              <GitHubIcon />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="foot__social-icon"
              aria-label="LinkedIn (@muhammadadeelai)"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://n8n.io/creators/aiadeel/"
              target="_blank"
              rel="noopener noreferrer"
              className="foot__social-icon"
              aria-label="n8n Creator Profile"
            >
              <N8nIcon />
            </a>
          </div>
        </div>

        <div>
          <p className="foot__col-title">Navigation</p>
          <ul className="foot__nav">
            <li>
              <a href="/" onClick={(e) => go(e, '/')}>
                <span>Main Portfolio</span>
              </a>
            </li>
            <li>
              <a href="/wardmail" onClick={(e) => go(e, '/wardmail')}>
                <span className="foot__llms-badge">Wardmail ↗</span>
                <span>24/7 Email Agent</span>
              </a>
            </li>
            <li>
              <a href="/whatsapp-agent" onClick={(e) => go(e, '/whatsapp-agent')}>
                <span className="foot__llms-badge">WhatsApp AI ↗</span>
                <span>24/7 Booking Agent</span>
              </a>
            </li>
            <li>
              <a href="/blog" onClick={(e) => go(e, '/blog')}>
                <span>Blog &amp; SEO Guides</span>
              </a>
            </li>
            <li>
              <a href="/#work" onClick={(e) => go(e, '/', '#work')}>
                <span>Selected Work</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="foot__col-title">Work With Adeel</p>
          <ul className="foot__nav">
            <li>
              <a href={CAL_URL} target="_blank" rel="noopener noreferrer">
                <span>Book Free 20-Min Call ↗</span>
              </a>
            </li>
            <li>
              <a href="mailto:hello@adeelsi.me">hello@adeelsi.me</a>
            </li>
          </ul>
        </div>

        <div>
          <p className="foot__col-title">SEO &amp; Admin</p>
          <ul className="foot__nav">
            <li>
              <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">
                <span>sitemap.xml ↗</span>
              </a>
            </li>
            <li>
              <a href="/llms.txt" target="_blank" rel="noopener noreferrer">
                <span>llms.txt ↗</span>
              </a>
            </li>
            <li>
              <a href="/admin" onClick={(e) => go(e, '/admin')}>
                <span>Admin Blog Studio (/admin)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="foot__bottom">
        <span>© 2026 Muhammad Adeel (@muhammadadeelai) · Lahore, Pakistan</span>
        <div className="foot__bottom-links">
          <a href="/" onClick={(e) => go(e, '/')}>Portfolio</a>
          <a href="/wardmail" onClick={(e) => go(e, '/wardmail')}>Wardmail</a>
          <a href="/blog" onClick={(e) => go(e, '/blog')}>Blog</a>
          <a href="/admin" onClick={(e) => go(e, '/admin')}>Admin</a>
        </div>
      </div>
    </footer>
  )
}
