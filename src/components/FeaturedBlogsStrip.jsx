import { useEffect, useState } from 'react'
import { ArrowRight, ArrowUpRight } from './icons.jsx'
import { loadBlogs, resolveBlogImageUrl } from '../utils/blogStore.js'
import './FeaturedBlogsStrip.css'

export default function FeaturedBlogsStrip({
  variant = 'portfolio',
  onNavigate,
}) {
  const [posts, setPosts] = useState(() => loadBlogs())

  useEffect(() => {
    const refresh = () => setPosts(loadBlogs())
    window.addEventListener('blogs-updated', refresh)
    return () => window.removeEventListener('blogs-updated', refresh)
  }, [])

  const filteredPosts = posts
    .filter((p) =>
      variant === 'wardmail'
        ? p.showOnWardmail !== false
        : p.showOnPortfolio !== false
    )
    .slice(0, 3)

  const displayPosts = filteredPosts.length > 0 ? filteredPosts : posts.slice(0, 3)

  const handleGoBlog = (e, path) => {
    if (onNavigate) {
      e.preventDefault()
      onNavigate(path)
    }
  }

  return (
    <section
      className={`fblog-sec ${variant === 'wardmail' ? 'fblog-sec--wardmail' : ''}`}
      id="blog"
      aria-labelledby="featured-blog-heading"
    >
      <div className="fblog-wrap">
        <div className="fblog-head">
          <div>
            <p className="fblog-eyebrow">
              {variant === 'wardmail'
                ? 'AI Email Automation Guides & Case Studies'
                : 'Engineering Articles & Practical Guides'}
            </p>
            <h2 className="fblog-title" id="featured-blog-heading">
              {variant === 'wardmail' ? (
                <>
                  How modern teams automate <em>their inbox 24/7.</em>
                </>
              ) : (
                <>
                   Deep-dive playbooks on <em>agents, RAG &amp; automation.</em>
                </>
              )}
            </h2>
            <p className="fblog-sub">
              {variant === 'wardmail'
                ? 'Plain-English breakdowns on running a 24/7 AI email agent from Google Sheets, keeping human approval on sensitive threads, and scaling support.'
                : 'Architectural guides on building production n8n workflows, Context-Aware RAG systems, MCP memory servers, and 24/7 AI email agents.'}
            </p>
          </div>

          <div className="fblog-head__actions">
            <a
              href="/blog"
              className="btn btn--light fblog-all-btn"
              onClick={(e) => handleGoBlog(e, '/blog')}
            >
              <span>View All Articles ({posts.length})</span>
              <ArrowUpRight />
            </a>
          </div>
        </div>

        <div className="fblog-grid">
          {displayPosts.map((post) => {
            const imgSrc = resolveBlogImageUrl(post.coverImage?.url)
            const articlePath = `/blog/${post.slug}`
            return (
              <article key={post.id || post.slug} className="fblog-card">
                <a
                  href={articlePath}
                  className="fblog-card__media"
                  onClick={(e) => handleGoBlog(e, articlePath)}
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
                  <div className="fblog-card__fallback" aria-hidden="true">
                    <span>{post.category || 'AI Engineering'}</span>
                  </div>
                </a>

                <div className="fblog-card__body">
                  {/* Unboxed editorial metadata with typographic separators */}
                  <div className="fblog-card__meta">
                    <span>{post.category || 'AI Automation'}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.publishedAt || '2026'}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTimeMinutes || 5} min read</span>
                  </div>

                  <h3 className="fblog-card__h3">
                    <a
                      href={articlePath}
                      onClick={(e) => handleGoBlog(e, articlePath)}
                    >
                      {post.title}
                    </a>
                  </h3>

                  <p className="fblog-card__excerpt">
                    {post.metaDescription || post.subtitle}
                  </p>

                  <a
                    href={articlePath}
                    className="fblog-card__link"
                    onClick={(e) => handleGoBlog(e, articlePath)}
                  >
                    <span>Read full guide</span>
                    <ArrowRight />
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
