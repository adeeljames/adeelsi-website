import { useEffect, useMemo, useState } from 'react'
import {
  applyDynamicSeo,
  autoGenerateSeoFields,
  BLOG_CATEGORIES,
  buildArticleJsonLd,
  compressImageFileToDataUrl,
  downloadTextFile,
  evaluateSeoScore,
  generateSitemapXml,
  loadBlogs,
  loadGitHubCmsConfig,
  publishBlogsToGitHub,
  resetBlogsToBundled,
  resolveBlogImageUrl,
  saveBlogsLocally,
  saveGitHubCmsConfig,
  slugifyText,
} from '../utils/blogStore.js'
import './AdminBlogPanel.css'

const PRESET_COVERS = [
  { key: '__ASSET_BLOG_EMAIL__', label: '24/7 AI Inbox & Email Agent' },
  { key: '__ASSET_BLOG_N8N__', label: 'n8n Workflow Automation Nodes' },
  { key: '__ASSET_BLOG_RAG__', label: 'Context-Aware RAG & Vector Search' },
  { key: '__ASSET_BLOG_MCP__', label: 'MCP Persistent Memory Pathways' },
]

function createBlankPost() {
  const today = new Date().toISOString().slice(0, 10)
  const initial = {
    id: `post-${Date.now()}`,
    slug: 'new-ai-automation-guide',
    title: 'How Custom AI Agents Save Teams 15+ Hours Every Week',
    subtitle:
      'A practical guide for business owners on automating repetitive customer emails, lead qualification, and internal knowledge lookup without losing human oversight.',
    category: 'AI Email Automation',
    publishedAt: today,
    updatedAt: today,
    readTimeMinutes: 4,
    featured: false,
    showOnPortfolio: true,
    showOnWardmail: true,
    ctaType: 'wardmail',
    coverImage: {
      url: '__ASSET_BLOG_EMAIL__',
      alt: '',
      caption: '',
    },
    focusKeyword: 'Custom AI Agents',
    keywords: [],
    seoTitle: '',
    metaDescription: '',
    contentBlocks: [
      {
        id: `blk-${Date.now()}-1`,
        type: 'heading',
        text: 'Why Manual Inbox & Workflow Triage Slows Down Growth',
      },
      {
        id: `blk-${Date.now()}-2`,
        type: 'paragraph',
        text: 'When your team spends hours answering identical pricing, timing, and policy questions every day, high-value leads wait too long for a response.',
      },
      {
        id: `blk-${Date.now()}-3`,
        type: 'heading',
        text: 'How a Done-For-You 24/7 AI Agent Works in Production',
      },
      {
        id: `blk-${Date.now()}-4`,
        type: 'paragraph',
        text: 'By connecting your existing inbox to a structured Google Sheet knowledge base and human-in-the-loop approval panel, routine questions are answered in seconds while sensitive requests wait for one-click approval.',
      },
    ],
    faqs: [],
  }
  return autoGenerateSeoFields(initial, true)
}

const ADMIN_AUTH_SESSION_KEY = 'adeel_admin_auth_v1'
const EXPECTED_USER = String.fromCharCode(97, 100, 101, 101, 108, 48, 49)
const EXPECTED_PASS = String.fromCharCode(97, 100, 101, 101, 108, 53, 51, 52, 36)

export default function AdminBlogPanel({ onNavigate }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(ADMIN_AUTH_SESSION_KEY) === '1'
    } catch {
      return false
    }
  })
  const [loginUser, setLoginUser] = useState('')
  const [loginPass, setLoginPass] = useState('')
  const [loginError, setLoginError] = useState('')

  const [posts, setPosts] = useState(() => loadBlogs())
  const [activeId, setActiveId] = useState(() => loadBlogs()[0]?.id || '')
  const [statusBanner, setStatusBanner] = useState(null)
  const [quickPasteText, setQuickPasteText] = useState('')
  const [showQuickPaste, setShowQuickPaste] = useState(false)
  const [showSchemaPreview, setShowSchemaPreview] = useState(false)
  const [uploadingTarget, setUploadingTarget] = useState('')

  // GitHub -> Vercel $0 Auto-Publish Config
  const [ghConfig, setGhConfig] = useState(() => loadGitHubCmsConfig())
  const [isPublishingGh, setIsPublishingGh] = useState(false)

  useEffect(() => {
    applyDynamicSeo({
      title: 'SEO Blog Admin Studio | Muhammad Adeel',
      description: 'Automated SEO Blog CMS for adeelsi.me and Wardmail.',
      canonicalPath: '/admin',
      noindex: true,
    })
  }, [])

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    if (loginUser.trim() === EXPECTED_USER && loginPass === EXPECTED_PASS) {
      try {
        sessionStorage.setItem(ADMIN_AUTH_SESSION_KEY, '1')
      } catch {
        // ignore storage errors
      }
      setIsAuthenticated(true)
      setLoginPass('')
      setLoginError('')
    } else {
      setLoginError('Invalid username or password.')
    }
  }

  const handleLogout = () => {
    try {
      sessionStorage.removeItem(ADMIN_AUTH_SESSION_KEY)
    } catch {
      // ignore storage errors
    }
    setIsAuthenticated(false)
    setLoginUser('')
    setLoginPass('')
    setLoginError('')
  }

  const activePost = useMemo(() => {
    return posts.find((p) => p.id === activeId) || posts[0] || createBlankPost()
  }, [posts, activeId])

  const seoEvaluation = useMemo(() => {
    return evaluateSeoScore(activePost)
  }, [activePost])

  const showNotice = (type, message) => {
    setStatusBanner({ type, message })
    setTimeout(() => {
      setStatusBanner((prev) => (prev?.message === message ? null : prev))
    }, 5500)
  }

  const updateActivePost = (updater) => {
    setPosts((prevPosts) => {
      const next = prevPosts.map((p) => {
        if (p.id !== activePost.id) return p
        const updated = typeof updater === 'function' ? updater(p) : { ...p, ...updater }
        return {
          ...updated,
          updatedAt: new Date().toISOString().slice(0, 10),
        }
      })
      saveBlogsLocally(next)
      return next
    })
  }

  const handleAutoSeoMagic = (overwriteAll = true) => {
    updateActivePost((post) => autoGenerateSeoFields(post, overwriteAll))
    showNotice(
      'success',
      'All SEO fields (URL slug, Meta Title, Meta Description, Keywords, Image Alt Text, and FAQ Schema) have been auto-optimized!'
    )
  }

  const handleCreateNewPost = () => {
    const newPost = createBlankPost()
    const next = [newPost, ...posts]
    setPosts(next)
    setActiveId(newPost.id)
    saveBlogsLocally(next)
    showNotice('success', 'Created a new article with pre-filled SEO structure.')
  }

  const handleDuplicatePost = (postToCopy) => {
    const copy = {
      ... JSON.parse(JSON.stringify(postToCopy)),
      id: `post-${Date.now()}`,
      title: `${postToCopy.title} (Copy)`,
      slug: `${postToCopy.slug}-copy`,
      featured: false,
    }
    const next = [copy, ...posts]
    setPosts(next)
    setActiveId(copy.id)
    saveBlogsLocally(next)
    showNotice('success', 'Duplicated article.')
  }

  const handleDeletePost = (idToDelete) => {
    if (posts.length <= 1) {
      showNotice('error', 'Keep at least 1 published article in your blog.')
      return
    }
    const next = posts.filter((p) => p.id !== idToDelete)
    setPosts(next)
    if (activePost.id === idToDelete) {
      setActiveId(next[0]?.id || '')
    }
    saveBlogsLocally(next)
    showNotice('success', 'Deleted article.')
  }

  const handleCoverFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingTarget('cover')
    try {
      const webpDataUrl = await compressImageFileToDataUrl(file, 1200, 0.78)
      updateActivePost((p) => ({
        ...p,
        coverImage: {
          ...(p.coverImage || {}),
          url: webpDataUrl,
          alt:
            p.coverImage?.alt ||
            `${p.focusKeyword || p.category || 'AI Automation'} — ${p.title}`,
        },
      }))
      showNotice(
        'success',
        'Cover image compressed to fast WebP and embedded with SEO Alt Text ($0 storage).'
      )
    } catch (err) {
      showNotice('error', err.message || 'Could not process image file.')
    } finally {
      setUploadingTarget('')
      e.target.value = ''
    }
  }

  const handleInlineImageUpload = async (blockId, e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingTarget(blockId)
    try {
      const webpDataUrl = await compressImageFileToDataUrl(file, 1100, 0.78)
      updateActivePost((p) => ({
        ...p,
        contentBlocks: (p.contentBlocks || []).map((b) =>
          b.id === blockId
            ? {
                ...b,
                url: webpDataUrl,
                alt:
                  b.alt ||
                  `${p.focusKeyword || 'AI Agent'} — ${b.caption || p.title}`,
              }
            : b
        ),
      }))
      showNotice('success', 'Inline picture compressed to WebP and added to article.')
    } catch (err) {
      showNotice('error', err.message || 'Failed to upload inline picture.')
    } finally {
      setUploadingTarget('')
      e.target.value = ''
    }
  }

  const addBlock = (type) => {
    const newId = `blk-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
    let newBlock = { id: newId, type, text: '' }
    if (type === 'heading') {
      newBlock = { id: newId, type: 'heading', text: 'New Section Subheading (H2)' }
    } else if (type === 'paragraph') {
      newBlock = {
        id: newId,
        type: 'paragraph',
        text: 'Write your paragraph here. Include practical examples and clear outcomes for your readers.',
      }
    } else if (type === 'list') {
      newBlock = {
        id: newId,
        type: 'list',
        items: [
          'First key takeaway or step',
          'Second key takeaway or step',
        ],
      }
    } else if (type === 'callout') {
      newBlock = {
        id: newId,
        type: 'callout',
        title: 'Key Takeaway',
        text: 'Highlight an important metric, tip, or architectural rule here.',
      }
    } else if (type === 'image') {
      newBlock = {
        id: newId,
        type: 'image',
        url: '__ASSET_BLOG_N8N__',
        alt: `${activePost.focusKeyword || 'AI Automation'} — workflow diagram`,
        caption: 'Diagram showing how the automated pipeline processes requests 24/7.',
      }
    }

    updateActivePost((p) => ({
      ...p,
      contentBlocks: [...(p.contentBlocks || []), newBlock],
    }))
  }

  const updateBlock = (blockId, patch) => {
    updateActivePost((p) => ({
      ...p,
      contentBlocks: (p.contentBlocks || []).map((b) =>
        b.id === blockId ? { ...b, ...patch } : b
      ),
    }))
  }

  const moveBlock = (index, direction) => {
    updateActivePost((p) => {
      const blocks = [...(p.contentBlocks || [])]
      const targetIndex = index + direction
      if (targetIndex < 0 || targetIndex >= blocks.length) return p
      const temp = blocks[index]
      blocks[index] = blocks[targetIndex]
      blocks[targetIndex] = temp
      return { ...p, contentBlocks: blocks }
    })
  }

  const removeBlock = (blockId) => {
    updateActivePost((p) => ({
      ...p,
      contentBlocks: (p.contentBlocks || []).filter((b) => b.id !== blockId),
    }))
  }

  const handleConvertQuickPaste = () => {
    if (!quickPasteText.trim()) return
    const lines = quickPasteText
      .split(/\n+/)
      .map((l) => l.trim())
      .filter(Boolean)

    const newBlocks = []
    let currentList = null

    lines.forEach((line, i) => {
      const id = `paste-${Date.now()}-${i}`
      if (/^#{1,3}\s+/.test(line) || (line.length < 75 && line.endsWith(':'))) {
        if (currentList) {
          newBlocks.push(currentList)
          currentList = null
        }
        newBlocks.push({
          id,
          type: 'heading',
          text: line.replace(/^#{1,3}\s+/, '').replace(/:$/, ''),
        })
      } else if (/^[-•*]\s+/.test(line)) {
        const cleanItem = line.replace(/^[-•*]\s+/, '')
        if (!currentList) {
          currentList = { id, type: 'list', items: [cleanItem] }
        } else {
          currentList.items.push(cleanItem)
        }
      } else {
        if (currentList) {
          newBlocks.push(currentList)
          currentList = null
        }
        newBlocks.push({
          id,
          type: 'paragraph',
          text: line,
        })
      }
    })

    if (currentList) newBlocks.push(currentList)

    updateActivePost((p) =>
      autoGenerateSeoFields(
        {
          ...p,
          contentBlocks: [...(p.contentBlocks || []), ...newBlocks],
        },
        false
      )
    )
    setQuickPasteText('')
    setShowQuickPaste(false)
    showNotice('success', `Converted ${newBlocks.length} content blocks and updated SEO metadata!`)
  }

  const addFaqItem = () => {
    updateActivePost((p) => ({
      ...p,
      faqs: [
        ...(p.faqs || []),
        {
          question: `How does ${p.focusKeyword || 'this AI agent'} work with our existing tools?`,
          answer:
            'It connects directly to your existing email inbox, Google Sheets, and CRM without requiring any software migration.',
        },
      ],
    }))
  }

  const updateFaqItem = (idx, patch) => {
    updateActivePost((p) => ({
      ...p,
      faqs: (p.faqs || []).map((f, i) => (i === idx ? { ...f, ...patch } : f)),
    }))
  }

  const removeFaqItem = (idx) => {
    updateActivePost((p) => ({
      ...p,
      faqs: (p.faqs || []).filter((_, i) => i !== idx),
    }))
  }

  const handleDownloadSeoPack = () => {
    const optimizedPosts = posts.map((p) =>
      p.id === activePost.id ? autoGenerateSeoFields(p, false) : p
    )
    saveBlogsLocally(optimizedPosts)
    downloadTextFile('blogs.json', JSON.stringify(optimizedPosts, null, 2), 'application/json')
    setTimeout(() => {
      downloadTextFile('sitemap.xml', generateSitemapXml(optimizedPosts), 'application/xml')
    }, 250)
    showNotice(
      'success',
      'Downloaded blogs.json + sitemap.xml! Drop them into src/data/blogs.json and public/sitemap.xml, or use GitHub Auto-Commit below.'
    )
  }

  const handleGitHubAutoPublish = async () => {
    setIsPublishingGh(true)
    try {
      saveGitHubCmsConfig(ghConfig)
      const optimizedPosts = posts.map((p) =>
        p.id === activePost.id ? autoGenerateSeoFields(p, false) : p
      )
      setPosts(optimizedPosts)
      saveBlogsLocally(optimizedPosts)
      await publishBlogsToGitHub(optimizedPosts, ghConfig)
      showNotice(
        'success',
        'Published to GitHub! Vercel is now deploying your updated blogs.json & sitemap.xml live (~20 seconds).'
      )
    } catch (err) {
      showNotice('error', err.message || 'GitHub publish failed. Check your Repo name and Token.')
    } finally {
      setIsPublishingGh(false)
    }
  }

  const go = (e, path) => {
    if (onNavigate) {
      e.preventDefault()
      onNavigate(path)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="adm-auth-screen">
        <div className="adm-auth-card">
          <p className="adm-auth-card__eyebrow">Protected Area</p>
          <h1 className="adm-auth-card__title">Admin Studio Sign In</h1>
          <p className="adm-auth-card__sub">
            Enter your admin username and password to manage and publish SEO blog articles.
          </p>

          <form className="adm-auth-form" onSubmit={handleLoginSubmit} autoComplete="off">
            <div className="adm-field">
              <label htmlFor="adm-login-user">Username</label>
              <input
                id="adm-login-user"
                type="text"
                value={loginUser}
                onChange={(e) => {
                  setLoginUser(e.target.value)
                  if (loginError) setLoginError('')
                }}
                placeholder="Enter username"
                autoComplete="username"
                required
              />
            </div>

            <div className="adm-field">
              <label htmlFor="adm-login-pass">Password</label>
              <input
                id="adm-login-pass"
                type="password"
                value={loginPass}
                onChange={(e) => {
                  setLoginPass(e.target.value)
                  if (loginError) setLoginError('')
                }}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>

            {loginError && (
              <div className="adm-auth-error" role="alert">
                {loginError}
              </div>
            )}

            <button type="submit" className="adm-btn adm-btn--magic adm-auth-submit">
              Sign In to Admin Studio
            </button>
          </form>

          <a href="/" className="adm-auth-back" onClick={(e) => go(e, '/')}>
            ← Return to website
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="adm-page">
      {/* Top Admin Studio Bar */}
      <header className="adm-topbar">
        <div className="adm-topbar__left">
          <a href="/" className="adm-brand" onClick={(e) => go(e, '/')}>
            <span className="adm-brand__title">Adeel</span>
            <span className="adm-brand__sub">/ SEO Blog Admin Studio</span>
          </a>
        </div>

        <div className="adm-topbar__actions">
          <button
            type="button"
            className="adm-btn adm-btn--ghost"
            onClick={handleCreateNewPost}
          >
            + New Article
          </button>

          <button
            type="button"
            className="adm-btn adm-btn--magic"
            onClick={() => handleAutoSeoMagic(true)}
          >
            ⚡ Auto-Fill All SEO (1-Click)
          </button>

          <button
            type="button"
            className="adm-btn adm-btn--ghost"
            onClick={handleDownloadSeoPack}
          >
            Download JSON + Sitemap
          </button>

          <a
            href={`/blog/${activePost.slug}`}
            className="adm-btn adm-btn--primary"
            onClick={(e) => go(e, `/blog/${activePost.slug}`)}
          >
            Preview Live Article ↗
          </a>

          <button
            type="button"
            className="adm-btn adm-btn--ghost"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </header>

      {statusBanner && (
        <div
          className={`adm-toast ${statusBanner.type === 'error' ? 'adm-toast--err' : 'adm-toast--ok'}`}
          role="status"
        >
          <span>{statusBanner.message}</span>
          <button type="button" onClick={() => setStatusBanner(null)}>
            ✕
          </button>
        </div>
      )}

      <div className="adm-workspace">
        {/* 1. LEFT SIDEBAR — ARTICLE LIST */}
        <aside className="adm-sidebar">
          <div className="adm-sidebar__head">
            <span>All Articles ({posts.length})</span>
            <button
              type="button"
              className="adm-link-btn"
              onClick={handleCreateNewPost}
            >
              + Add New
            </button>
          </div>

          <div className="adm-post-list">
            {posts.map((post) => {
              const evalItem = evaluateSeoScore(post)
              const isSelected = post.id === activePost.id
              return (
                <div
                  key={post.id}
                  className={`adm-post-item ${isSelected ? 'is-active' : ''}`}
                >
                  <button
                    type="button"
                    className="adm-post-item__main"
                    onClick={() => setActiveId(post.id)}
                  >
                    <span className="adm-post-item__title">{post.title}</span>
                    <span className="adm-post-item__meta">
                      <span>{post.category}</span>
                      <span>·</span>
                      <span>SEO {evalItem.score}/100</span>
                    </span>
                  </button>
                  <div className="adm-post-item__tools">
                    <button
                      type="button"
                      title="Duplicate article"
                      onClick={() => handleDuplicatePost(post)}
                    >
                      Copy
                    </button>
                    <button
                      type="button"
                      title="Delete article"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      Del
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="adm-sidebar__foot">
            <a
              href="/blog"
              className="adm-link-btn"
              onClick={(e) => go(e, '/blog')}
            >
              View Public /blog Page →
            </a>
            <button
              type="button"
              className="adm-reset-btn"
              onClick={() => {
                const defaults = resetBlogsToBundled()
                setPosts(defaults)
                setActiveId(defaults[0]?.id || '')
                showNotice('success', 'Restored default bundled articles.')
              }}
            >
              Reset Local Drafts
            </button>
          </div>
        </aside>

        {/* 2. CENTER COLUMN — CONTENT, PICTURES & FAQ BUILDER */}
        <section className="adm-editor">
          {/* Card A: Core Headline & Placement */}
          <div className="adm-card">
            <div className="adm-card__head">
              <div>
                <p className="adm-step-kicker">Step 01 · Headline &amp; Topic</p>
                <h2>Write your article title &amp; summary</h2>
              </div>
              <button
                type="button"
                className="adm-btn adm-btn--magic-sm"
                onClick={() => handleAutoSeoMagic(true)}
              >
                ⚡ Auto-Optimize SEO from Title
              </button>
            </div>

            <div className="adm-field">
              <label htmlFor="adm-title">Article Title (H1 Headline)</label>
              <input
                id="adm-title"
                type="text"
                value={activePost.title || ''}
                onChange={(e) =>
                  updateActivePost({
                    title: e.target.value,
                    slug: slugifyText(e.target.value),
                  })
                }
                placeholder="e.g. How a 24/7 AI Email Agent Replies to Customer Emails from Google Sheets"
              />
            </div>

            <div className="adm-field">
              <label htmlFor="adm-sub">Subtitle / Opening Summary</label>
              <textarea
                id="adm-sub"
                rows={2}
                value={activePost.subtitle || ''}
                onChange={(e) => updateActivePost({ subtitle: e.target.value })}
                placeholder="1–2 sentences explaining what the reader will learn and why it matters..."
              />
            </div>

            <div className="adm-row-3">
              <div className="adm-field">
                <label htmlFor="adm-cat">Topic Category</label>
                <select
                  id="adm-cat"
                  value={activePost.category || BLOG_CATEGORIES[0]}
                  onChange={(e) => updateActivePost({ category: e.target.value })}
                >
                  {BLOG_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="adm-field">
                <label htmlFor="adm-date">Publish Date</label>
                <input
                  id="adm-date"
                  type="date"
                  value={activePost.publishedAt || '2026-11-08'}
                  onChange={(e) => updateActivePost({ publishedAt: e.target.value })}
                />
              </div>

              <div className="adm-field">
                <label htmlFor="adm-cta">Article CTA Funnel</label>
                <select
                  id="adm-cta"
                  value={activePost.ctaType || 'wardmail'}
                  onChange={(e) => updateActivePost({ ctaType: e.target.value })}
                >
                  <option value="wardmail">Promote Wardmail (24/7 Email Agent)</option>
                  <option value="portfolio">Promote AI Engineering Discovery Call</option>
                </select>
              </div>
            </div>

            <div className="adm-checks-row">
              <label className="adm-checkbox">
                <input
                  type="checkbox"
                  checked={Boolean(activePost.featured)}
                  onChange={(e) => updateActivePost({ featured: e.target.checked })}
                />
                <span>Featured Spotlight on /blog</span>
              </label>

              <label className="adm-checkbox">
                <input
                  type="checkbox"
                  checked={activePost.showOnPortfolio !== false}
                  onChange={(e) =>
                    updateActivePost({ showOnPortfolio: e.target.checked })
                  }
                />
                <span>Show on Portfolio Homepage</span>
              </label>

              <label className="adm-checkbox">
                <input
                  type="checkbox"
                  checked={activePost.showOnWardmail !== false}
                  onChange={(e) =>
                    updateActivePost({ showOnWardmail: e.target.checked })
                  }
                />
                <span>Show on Wardmail Page</span>
              </label>
            </div>
          </div>

          {/* Card B: Cover Picture + SEO Alt Text */}
          <div className="adm-card">
            <div className="adm-card__head">
              <div>
                <p className="adm-step-kicker">Step 02 · Cover Picture &amp; Image SEO</p>
                <h2>Article Cover Image &amp; Alt Text</h2>
              </div>
              <label className="adm-btn adm-btn--ghost adm-upload-label">
                <span>
                  {uploadingTarget === 'cover'
                    ? 'Compressing WebP...'
                    : 'Upload Picture from Computer'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverFileUpload}
                  hidden
                />
              </label>
            </div>

            <div className="adm-cover-grid">
              <div className="adm-cover-preview">
                <img
                  src={resolveBlogImageUrl(activePost.coverImage?.url)}
                  alt={activePost.coverImage?.alt || activePost.title}
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="adm-cover-fields">
                <div className="adm-field">
                  <label htmlFor="adm-preset-cover">
                    Built-in Editorial Cover (or paste custom Image URL below)
                  </label>
                  <select
                    id="adm-preset-cover"
                    value={
                      PRESET_COVERS.some((c) => c.key === activePost.coverImage?.url)
                        ? activePost.coverImage?.url
                        : 'custom'
                    }
                    onChange={(e) => {
                      if (e.target.value !== 'custom') {
                        updateActivePost({
                          coverImage: {
                            ...(activePost.coverImage || {}),
                            url: e.target.value,
                          },
                        })
                      }
                    }}
                  >
                    {PRESET_COVERS.map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.label}
                      </option>
                    ))}
                    <option value="custom">Custom Uploaded / External URL</option>
                  </select>
                </div>

                <div className="adm-field">
                  <label htmlFor="adm-cover-url">Image URL or Uploaded WebP Data</label>
                  <input
                    id="adm-cover-url"
                    type="text"
                    value={activePost.coverImage?.url || ''}
                    onChange={(e) =>
                      updateActivePost({
                        coverImage: {
                          ...(activePost.coverImage || {}),
                          url: e.target.value,
                        },
                      })
                    }
                    placeholder="https://... or upload from computer above"
                  />
                </div>

                <div className="adm-field">
                  <div className="adm-field__label-row">
                    <label htmlFor="adm-cover-alt">
                      Image Alt Text (Required for Google Images SEO)
                    </label>
                    <button
                      type="button"
                      className="adm-inline-magic"
                      onClick={() =>
                        updateActivePost({
                          coverImage: {
                            ...(activePost.coverImage || {}),
                            alt: `${activePost.focusKeyword || activePost.category} — ${activePost.title} workflow architecture`,
                          },
                        })
                      }
                    >
                      ⚡ Auto-Write Alt Text
                    </button>
                  </div>
                  <input
                    id="adm-cover-alt"
                    type="text"
                    value={activePost.coverImage?.alt || ''}
                    onChange={(e) =>
                      updateActivePost({
                        coverImage: {
                          ...(activePost.coverImage || {}),
                          alt: e.target.value,
                        },
                      })
                    }
                    placeholder="Describe the picture using your target keyword..."
                  />
                </div>

                <div className="adm-field">
                  <label htmlFor="adm-cover-cap">Picture Caption (Optional)</label>
                  <input
                    id="adm-cover-cap"
                    type="text"
                    value={activePost.coverImage?.caption || ''}
                    onChange={(e) =>
                      updateActivePost({
                        coverImage: {
                          ...(activePost.coverImage || {}),
                          caption: e.target.value,
                        },
                      })
                    }
                    placeholder="Caption shown under the cover image..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card C: Article Sections & Inline Pictures Builder */}
          <div className="adm-card">
            <div className="adm-card__head">
              <div>
                <p className="adm-step-kicker">
                  Step 03 · Content Sections &amp; Inline Pictures ({seoEvaluation.bodyWords} words · {activePost.readTimeMinutes || 4} min read)
                </p>
                <h2>Article Body &amp; Visuals</h2>
              </div>
              <button
                type="button"
                className="adm-btn adm-btn--ghost"
                onClick={() => setShowQuickPaste((v) => !v)}
              >
                {showQuickPaste ? 'Close Quick-Paste' : '📋 Quick-Paste Full Draft'}
              </button>
            </div>

            {showQuickPaste && (
              <div className="adm-quickpaste">
                <p className="adm-quickpaste__help">
                  Paste any plain text or Markdown draft below. Lines starting with <code>#</code> become H2 subheadings, lines starting with <code>-</code> become bullet lists, and everything else becomes clean paragraphs.
                </p>
                <textarea
                  rows={6}
                  value={quickPasteText}
                  onChange={(e) => setQuickPasteText(e.target.value)}
                  placeholder="# Why 24/7 Email Replies Matter&#10;Paste your paragraphs here...&#10;- First point&#10;- Second point"
                />
                <div className="adm-quickpaste__actions">
                  <button
                    type="button"
                    className="adm-btn adm-btn--magic"
                    onClick={handleConvertQuickPaste}
                  >
                    Convert Draft into SEO Sections
                  </button>
                </div>
              </div>
            )}

            <div className="adm-blocks">
              {(activePost.contentBlocks || []).map((block, idx) => (
                <div key={block.id || idx} className="adm-block">
                  <div className="adm-block__bar">
                    <span className="adm-block__badge">
                      {idx + 1}. {block.type.toUpperCase()}
                    </span>
                    <div className="adm-block__Move">
                      <button
                        type="button"
                        onClick={() => moveBlock(idx, -1)}
                        disabled={idx === 0}
                        title="Move section up"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => moveBlock(idx, 1)}
                        disabled={idx === (activePost.contentBlocks || []).length - 1}
                        title="Move section down"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        className="adm-block__del"
                        onClick={() => removeBlock(block.id)}
                        title="Remove block"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {block.type === 'heading' && (
                    <input
                      type="text"
                      className="adm-block__h2-input"
                      value={block.text || ''}
                      onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                      placeholder="H2 Subheading (include a keyword naturally)..."
                    />
                  )}

                  {block.type === 'paragraph' && (
                    <textarea
                      rows={3}
                      value={block.text || ''}
                      onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                      placeholder="Write paragraph text..."
                    />
                  )}

                  {block.type === 'list' && (
                    <div className="adm-field">
                      <label>Bullet items (one bullet per line)</label>
                      <textarea
                        rows={4}
                        value={(block.items || []).join('\n')}
                        onChange={(e) =>
                          updateBlock(block.id, {
                            items: e.target.value
                              .split('\n')
                              .map((s) => s.trim())
                              .filter(Boolean),
                          })
                        }
                        placeholder="First bullet point&#10;Second bullet point"
                      />
                    </div>
                  )}

                  {block.type === 'callout' && (
                    <div className="adm-callout-edit">
                      <input
                        type="text"
                        value={block.title || ''}
                        onChange={(e) =>
                          updateBlock(block.id, { title: e.target.value })
                        }
                        placeholder="Callout Title (e.g. Zero Migration Required)"
                      />
                      <textarea
                        rows={2}
                        value={block.text || ''}
                        onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                        placeholder="Callout highlight message..."
                      />
                    </div>
                  )}

                  {block.type === 'image' && (
                    <div className="adm-inline-img-edit">
                      <div className="adm-inline-img-edit__preview">
                        <img
                          src={resolveBlogImageUrl(block.url)}
                          alt={block.alt || 'Inline article preview'}
                          referrerPolicy="no-referrer"
                        />
                        <label className="adm-btn adm-btn--ghost adm-upload-label">
                          <span>
                            {uploadingTarget === block.id
                              ? 'Compressing...'
                              : 'Upload Picture'}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleInlineImageUpload(block.id, e)}
                            hidden
                          />
                        </label>
                      </div>
                      <div className="adm-inline-img-edit__inputs">
                        <input
                          type="text"
                          value={block.url || ''}
                          onChange={(e) =>
                            updateBlock(block.id, { url: e.target.value })
                          }
                          placeholder="Picture URL or Upload from Computer"
                        />
                        <div className="adm-field__label-row">
                          <label>Picture Alt Text (Google Images SEO)</label>
                          <button
                            type="button"
                            className="adm-inline-magic"
                            onClick={() =>
                              updateBlock(block.id, {
                                alt: `${activePost.focusKeyword || 'AI Agent'} — ${block.caption || activePost.title}`,
                              })
                            }
                          >
                            ⚡ Auto-Fill Alt
                          </button>
                        </div>
                        <input
                          type="text"
                          value={block.alt || ''}
                          onChange={(e) =>
                            updateBlock(block.id, { alt: e.target.value })
                          }
                          placeholder="Descriptive Alt Text for Google Images..."
                        />
                        <input
                          type="text"
                          value={block.caption || ''}
                          onChange={(e) =>
                            updateBlock(block.id, { caption: e.target.value })
                          }
                          placeholder="Optional picture caption shown below image..."
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add Block Toolbar */}
            <div className="adm-add-bar">
              <span>+ Add to Article:</span>
              <button type="button" onClick={() => addBlock('heading')}>
                + H2 Subheading
              </button>
              <button type="button" onClick={() => addBlock('paragraph')}>
                + Paragraph
              </button>
              <button type="button" onClick={() => addBlock('image')}>
                + Picture (with Alt Text)
              </button>
              <button type="button" onClick={() => addBlock('list')}>
                + Bullet List
              </button>
              <button type="button" onClick={() => addBlock('callout')}>
                + Highlight Box
              </button>
            </div>
          </div>

          {/* Card D: Google FAQ Rich Snippets */}
          <div className="adm-card">
            <div className="adm-card__head">
              <div>
                <p className="adm-step-kicker">Step 04 · Google FAQ Schema (Rich Snippets)</p>
                <h2>Frequently Asked Questions ({(activePost.faqs || []).length})</h2>
              </div>
              <button
                type="button"
                className="adm-btn adm-btn--ghost"
                onClick={addFaqItem}
              >
                + Add FAQ Pair
              </button>
            </div>

            <div className="adm-faqs">
              {(activePost.faqs || []).map((faq, idx) => (
                <div key={idx} className="adm-faq-row">
                  <div className="adm-faq-row__top">
                    <span>FAQ #{idx + 1}</span>
                    <button type="button" onClick={() => removeFaqItem(idx)}>
                      Remove
                    </button>
                  </div>
                  <input
                    type="text"
                    value={faq.question || ''}
                    onChange={(e) =>
                      updateFaqItem(idx, { question: e.target.value })
                    }
                    placeholder="Question people search on Google..."
                  />
                  <textarea
                    rows={2}
                    value={faq.answer || ''}
                    onChange={(e) => updateFaqItem(idx, { answer: e.target.value })}
                    placeholder="Direct, helpful answer..."
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. RIGHT STICKY RAIL — AUTO-SEO ASSISTANT, GOOGLE SERP PREVIEW & FREE VERCEL PUBLISH */}
        <aside className="adm-seo-rail">
          {/* Live 0-100 SEO Score & 1-Click Auto-Fix */}
          <div className="adm-card adm-seo-score-card">
            <div className="adm-score-top">
              <div>
                <p className="adm-step-kicker">Automated SEO Readiness</p>
                <h3>Google SEO Score</h3>
              </div>
              <div
                className={`adm-score-badge ${
                  seoEvaluation.score >= 85
                    ? 'is-great'
                    : seoEvaluation.score >= 65
                    ? 'is-good'
                    : 'is-low'
                }`}
              >
                <span>{seoEvaluation.score}</span>
                <small>/100</small>
              </div>
            </div>

            <button
              type="button"
              className="adm-btn adm-btn--magic adm-full-btn"
              onClick={() => handleAutoSeoMagic(true)}
            >
              ⚡ Auto-Fill &amp; Fix All SEO Fields Now
            </button>

            <ul className="adm-checklist">
              {seoEvaluation.checks.map((chk) => (
                <li
                  key={chk.id}
                  className={chk.passed ? 'is-pass' : 'is-warn'}
                  title={chk.passed ? 'Passed' : chk.hint}
                >
                  <span className="adm-checklist__icon">
                    {chk.passed ? '✓' : '!'}
                  </span>
                  <div className="adm-checklist__text">
                    <span>{chk.label}</span>
                    {!chk.passed && <small>{chk.hint}</small>}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Live Google Search Result Preview (SERP) */}
          <div className="adm-card">
            <p className="adm-step-kicker">Live Google Search Preview</p>
            <div className="adm-serp">
              <div className="adm-serp__url">
                <span>adeelsi.me</span>
                <span> › blog › </span>
                <span>{activePost.slug || 'article-slug'}</span>
              </div>
              <h4 className="adm-serp__title">
                {activePost.seoTitle || activePost.title}
              </h4>
              <p className="adm-serp__desc">
                {activePost.metaDescription || activePost.subtitle}
              </p>
            </div>

            {/* Auto-Generated SEO Fields (Editable if desired) */}
            <div className="adm-seo-fields">
              <div className="adm-field">
                <label htmlFor="adm-focus-kw">Focus Target Keyword</label>
                <input
                  id="adm-focus-kw"
                  type="text"
                  value={activePost.focusKeyword || ''}
                  onChange={(e) =>
                    updateActivePost({ focusKeyword: e.target.value })
                  }
                  placeholder="e.g. 24/7 AI email agent"
                />
              </div>

              <div className="adm-field">
                <label htmlFor="adm-slug">SEO URL Slug</label>
                <input
                  id="adm-slug"
                  type="text"
                  value={activePost.slug || ''}
                  onChange={(e) =>
                    updateActivePost({ slug: slugifyText(e.target.value) })
                  }
                />
              </div>

              <div className="adm-field">
                <div className="adm-field__label-row">
                  <label htmlFor="adm-seo-title">Meta Title</label>
                  <span className="adm-char-count">
                    {(activePost.seoTitle || '').length}/60 chars
                  </span>
                </div>
                <input
                  id="adm-seo-title"
                  type="text"
                  value={activePost.seoTitle || ''}
                  onChange={(e) =>
                    updateActivePost({ seoTitle: e.target.value })
                  }
                />
              </div>

              <div className="adm-field">
                <div className="adm-field__label-row">
                  <label htmlFor="adm-meta-desc">Meta Description</label>
                  <span className="adm-char-count">
                    {(activePost.metaDescription || '').length}/158 chars
                  </span>
                </div>
                <textarea
                  id="adm-meta-desc"
                  rows={3}
                  value={activePost.metaDescription || ''}
                  onChange={(e) =>
                    updateActivePost({ metaDescription: e.target.value })
                  }
                />
              </div>

              <div className="adm-field">
                <label htmlFor="adm-keywords">
                  Targeted Keywords (comma separated)
                </label>
                <input
                  id="adm-keywords"
                  type="text"
                  value={(activePost.keywords || []).join(', ')}
                  onChange={(e) =>
                    updateActivePost({
                      keywords: e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </div>

              <button
                type="button"
                className="adm-link-btn"
                onClick={() => setShowSchemaPreview((v) => !v)}
              >
                {showSchemaPreview
                  ? 'Hide Auto-Generated JSON-LD Schema'
                  : 'Inspect Auto-Generated Google JSON-LD Schema'}
              </button>

              {showSchemaPreview && (
                <pre className="adm-schema-box">
                  {JSON.stringify(buildArticleJsonLd(activePost), null, 2)}
                </pre>
              )}
            </div>
          </div>

          {/* $0 Forever Vercel Publishing via GitHub Auto-Commit */}
          <div className="adm-card adm-publish-card">
            <p className="adm-step-kicker">$0 Forever Database · Vercel Auto-Deploy</p>
            <h3>Publish to Vercel via GitHub</h3>
            <p className="adm-publish-help">
              Commits <code>src/data/blogs.json</code> and <code>public/sitemap.xml</code> directly to your GitHub repo so Vercel deploys globally in ~20s with zero database bills.
            </p>

            <div className="adm-field">
              <label htmlFor="adm-gh-repo">GitHub Repo (owner/repo)</label>
              <input
                id="adm-gh-repo"
                type="text"
                value={ghConfig.repo || ''}
                onChange={(e) =>
                  setGhConfig((prev) => ({ ...prev, repo: e.target.value }))
                }
                placeholder="adeeljames/your-repo-name"
              />
            </div>

            <div className="adm-field">
              <label htmlFor="adm-gh-branch">Branch</label>
              <input
                id="adm-gh-branch"
                type="text"
                value={ghConfig.branch || 'main'}
                onChange={(e) =>
                  setGhConfig((prev) => ({ ...prev, branch: e.target.value }))
                }
                placeholder="main"
              />
            </div>

            <div className="adm-field">
              <label htmlFor="adm-gh-token">
                GitHub Personal Access Token (saved only in your browser)
              </label>
              <input
                id="adm-gh-token"
                type="password"
                value={ghConfig.token || ''}
                onChange={(e) =>
                  setGhConfig((prev) => ({ ...prev, token: e.target.value }))
                }
                placeholder="ghp_... or github_pat_..."
              />
            </div>

            <button
              type="button"
              className="adm-btn adm-btn--primary adm-full-btn"
              disabled={isPublishingGh}
              onClick={handleGitHubAutoPublish}
            >
              {isPublishingGh
                ? 'Committing to GitHub & Triggering Vercel...'
                : '🚀 Commit to GitHub & Deploy on Vercel'}
            </button>

            <button
              type="button"
              className="adm-btn adm-btn--ghost adm-full-btn"
              onClick={handleDownloadSeoPack}
            >
              📥 Or Download blogs.json + sitemap.xml (1-Click)
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}
