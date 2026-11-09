import seedBlogs from '../data/blogs.json'
import imgEmail from '../assets/images/blog_ai_email_agent_1794141606710.jpg'
import imgN8n from '../assets/images/blog_n8n_automation_1794141606185.jpg'
import imgRag from '../assets/images/blog_rag_financial_systems_1794141607705.jpg'
import imgMcp from '../assets/images/blog_mcp_context_memory_1794141608507.jpg'
import imgWhatsapp from '../assets/images/blog_whatsapp_booking_agent_1794223265406.jpg'

const STORAGE_KEY = 'adeel_seo_blogs_v1'
const GITHUB_CFG_KEY = 'adeel_github_cms_cfg_v1'

export const BUNDLED_BLOG_ASSETS = {
  __ASSET_BLOG_EMAIL__: imgEmail,
  __ASSET_BLOG_WHATSAPP__: imgWhatsapp,
  __ASSET_BLOG_N8N__: imgN8n,
  __ASSET_BLOG_RAG__: imgRag,
  __ASSET_BLOG_MCP__: imgMcp,
}

export const BLOG_CATEGORIES = [
  'WhatsApp AI & Voice Agents',
  'AI Email Automation',
  'n8n & Workflow Automation',
  'Autonomous AI Agents',
  'Production RAG & Search',
  'Machine Learning & Vision',
  'Case Studies & Guides',
]

export function resolveBlogImageUrl(rawUrl) {
  if (!rawUrl) return imgEmail
  if (BUNDLED_BLOG_ASSETS[rawUrl]) {
    return BUNDLED_BLOG_ASSETS[rawUrl]
  }
  return rawUrl
}

export function loadBlogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        const existingIds = new Set(parsed.map((p) => p.id))
        const missingSeeds = seedBlogs.filter((s) => !existingIds.has(s.id))
        return [...parsed, ...missingSeeds]
      }
    }
  } catch {
    // Fallback to bundled seed blogs
  }
  return seedBlogs
}

export function saveBlogsLocally(posts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
    window.dispatchEvent(new CustomEvent('blogs-updated'))
  } catch {
    // Ignore storage quota errors
  }
}

export function resetBlogsToBundled() {
  try {
    localStorage.removeItem(STORAGE_KEY)
    window.dispatchEvent(new CustomEvent('blogs-updated'))
  } catch {
    // Ignore
  }
  return seedBlogs
}

export function slugifyText(input = '') {
  return input
    .toString()
    .toLowerCase()
    .trim()
    .replace(/['’"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 88)
}

export function extractPlainTextFromBlocks(contentBlocks = []) {
  return contentBlocks
    .map((block) => {
      if (block.type === 'list' && Array.isArray(block.items)) {
        return block.items.join(' ')
      }
      if (block.type === 'callout') {
        return `${block.title || ''} ${block.text || ''}`
      }
      return block.text || block.caption || ''
    })
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function calculateReadTime(post) {
  const fullText = [
    post.title || '',
    post.subtitle || '',
    extractPlainTextFromBlocks(post.contentBlocks || []),
    ...(post.faqs || []).map((f) => `${f.question || ''} ${f.answer || ''}`),
  ].join(' ')
  const words = fullText.trim().split(/\s+/).filter(Boolean).length
  return Math.max(2, Math.round(words / 185))
}

const STOP_WORDS = new Set([
  'the', 'and', 'for', 'with', 'that', 'this', 'from', 'your', 'into', 'how',
  'why', 'what', 'when', 'where', 'who', 'will', 'can', 'are', 'was', 'were',
  'have', 'has', 'had', 'not', 'but', 'you', 'our', 'out', 'all', 'any', 'more',
  'most', 'some', 'such', 'no', 'nor', 'too', 'very', 'just', 'than', 'then',
  'now', 'only', 'also', 'over', 'under', 'after', 'before', 'between', 'through',
  'during', 'without', 'within', 'along', 'following', 'across', 'behind', 'beyond',
  'plus', 'except', 'about', 'using', 'every', 'their', 'they', 'them', 'these',
])

/**
 * Automated SEO Generator:
 * Built for users with zero SEO experience. Takes whatever title, subtitle, category,
 * and content blocks exist and synthesizes optimal Google SEO metadata, keywords,
 * image alt texts, and FAQ Rich Snippets.
 */
export function autoGenerateSeoFields(draft, forceOverwrite = false) {
  const title = (draft.title || 'AI Automation & Agent Engineering Guide').trim()
  const subtitle = (draft.subtitle || '').trim()
  const category = (draft.category || 'AI Email Automation').trim()
  const bodyText = extractPlainTextFromBlocks(draft.contentBlocks || [])

  // 1. Focus Keyword extraction
  let focusKeyword = (draft.focusKeyword || '').trim()
  if (!focusKeyword || forceOverwrite) {
    const titleWords = title
      .replace(/[^\w\s/-]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOP_WORDS.has(w.toLowerCase()))
    focusKeyword =
      titleWords.slice(0, 4).join(' ') ||
      category ||
      'AI Automation Agent'
  }

  // 2. Clean SEO URL Slug
  const slug =
    !draft.slug || forceOverwrite
      ? slugifyText(`${focusKeyword} ${title}`.slice(0, 95)) || slugifyText(title)
      : slugifyText(draft.slug)

  // 3. SEO Title (optimal 50-60 characters)
  let seoTitle = (draft.seoTitle || '').trim()
  if (!seoTitle || forceOverwrite) {
    const brandSuffix = ' | Muhammad Adeel'
    const maxBase = 60 - brandSuffix.length
    let baseTitle = title
    if (!baseTitle.toLowerCase().includes(focusKeyword.toLowerCase())) {
      baseTitle = `${focusKeyword}: ${title}`
    }
    if (baseTitle.length > maxBase) {
      baseTitle = `${baseTitle.slice(0, maxBase - 1).trim()}…`
    }
    seoTitle = `${baseTitle}${brandSuffix}`
  }

  // 4. Meta Description (optimal 140-158 characters)
  let metaDescription = (draft.metaDescription || '').trim()
  if (!metaDescription || forceOverwrite) {
    const sourceSummary = subtitle || bodyText || `Learn how ${focusKeyword} helps businesses automate workflows and scale operations 24/7.`
    let candidate = sourceSummary
    if (!candidate.toLowerCase().includes(focusKeyword.toLowerCase())) {
      candidate = `${focusKeyword}: ${candidate}`
    }
    if (candidate.length < 125) {
      candidate = `${candidate} Built by Muhammad Adeel — book a free 20-minute discovery call today.`
    }
    if (candidate.length > 158) {
      candidate = `${candidate.slice(0, 155).trim()}...`
    }
    metaDescription = candidate
  }

  // 5. Targeted Keywords Array (6-8 high-intent terms)
  let keywords = Array.isArray(draft.keywords) ? draft.keywords.filter(Boolean) : []
  if (keywords.length < 4 || forceOverwrite) {
    const freqMap = new Map()
    const combinedWords = `${title} ${subtitle} ${bodyText}`
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length >= 4 && !STOP_WORDS.has(w))

    combinedWords.forEach((w) => {
      freqMap.set(w, (freqMap.get(w) || 0) + 1)
    })

    const topTerms = [...freqMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([w]) => w)

    const generatedKeywords = [
      focusKeyword,
      category,
      `${focusKeyword} guide`,
      topTerms.slice(0, 2).join(' '),
      'AI Agent Architect',
      'Wardmail 24/7 AI Email Agent',
      'n8n AI workflow automation',
    ].filter((k) => k && k.trim().length > 2)

    keywords = [...new Set(generatedKeywords)].slice(0, 7)
  }

  // 6. Cover Image Alt Text & Caption
  const coverImage = { ...(draft.coverImage || {}) }
  if (!coverImage.url) {
    coverImage.url = '__ASSET_BLOG_EMAIL__'
  }
  if (!coverImage.alt || forceOverwrite) {
    coverImage.alt = `${focusKeyword} — ${title} architectural diagram and workflow overview`
  }
  if (!coverImage.caption) {
    coverImage.caption = `${title} — engineered for 24/7 production reliability.`
  }

  // 7. Auto-fill missing Alt Text on any inline image blocks
  let lastHeading = title
  const contentBlocks = (draft.contentBlocks || []).map((block, index) => {
    if (block.type === 'heading' && block.text) {
      lastHeading = block.text
    }
    if (block.type === 'image') {
      return {
        ...block,
        alt:
          !block.alt || forceOverwrite
            ? `${focusKeyword} — ${block.caption || lastHeading || `visual illustration ${index + 1}`}`
            : block.alt,
      }
    }
    return block
  })

  // 8. Auto-generate Google Rich Snippet FAQs if empty
  let faqs = Array.isArray(draft.faqs) ? draft.faqs.filter((f) => f.question && f.answer) : []
  if (faqs.length === 0) {
    faqs = [
      {
        question: `How does ${focusKeyword} improve daily business operations?`,
        answer:
          subtitle ||
          `${focusKeyword} automates repetitive manual responses and workflows 24/7 while keeping your team in control of sensitive decisions.`,
      },
      {
        question: `Do I need technical or coding skills to manage this system?`,
        answer:
          'No. Everything is set up done-for-you with a clean Admin Panel, Google Sheet knowledge sync, and live team training.',
      },
      {
        question: `How can I get a custom setup and quote for my workflow?`,
        answer:
          'You can book a free 20-minute discovery call at cal.com/adeelsi/20min or email hello@adeelsi.me for a tailored walkthrough and quote.',
      },
    ]
  }

  const updatedPost = {
    ...draft,
    slug,
    focusKeyword,
    seoTitle,
    metaDescription,
    keywords,
    coverImage,
    contentBlocks,
    faqs,
    updatedAt: new Date().toISOString().slice(0, 10),
  }

  updatedPost.readTimeMinutes = calculateReadTime(updatedPost)
  return updatedPost
}

/**
 * Evaluates a BlogPost against 8 Google On-Page & Technical SEO Checks (0-100 score).
 */
export function evaluateSeoScore(post) {
  const focus = (post.focusKeyword || '').trim().toLowerCase()
  const title = (post.title || '').trim()
  const seoTitle = (post.seoTitle || '').trim()
  const metaDesc = (post.metaDescription || '').trim()
  const slug = (post.slug || '').trim()
  const coverAlt = (post.coverImage?.alt || '').trim()
  const blocks = post.contentBlocks || []
  const bodyWords = extractPlainTextFromBlocks(blocks)
    .split(/\s+/)
    .filter(Boolean).length
  const headingsCount = blocks.filter((b) => b.type === 'heading' && b.text?.trim()).length
  const imageBlocks = blocks.filter((b) => b.type === 'image')
  const allInlineAltsFilled = imageBlocks.every((img) => img.alt && img.alt.trim().length >= 8)

  const checks = [
    {
      id: 'focus-in-title',
      label: 'Target keyword appears naturally in Headline / SEO Title',
      points: 15,
      passed:
        Boolean(focus) &&
        (title.toLowerCase().includes(focus) || seoTitle.toLowerCase().includes(focus)),
      hint: 'Click "Auto-Fill All SEO" to weave your target keyword into the SEO Title.',
    },
    {
      id: 'seo-title-len',
      label: `SEO Meta Title length (${seoTitle.length}/60 chars)`,
      points: 15,
      passed: seoTitle.length >= 35 && seoTitle.length <= 65,
      hint: 'Keep Meta Title between 35 and 60 characters so Google does not truncate it.',
    },
    {
      id: 'meta-desc-len',
      label: `Meta Description length (${metaDesc.length}/158 chars)`,
      points: 15,
      passed: metaDesc.length >= 110 && metaDesc.length <= 165,
      hint: 'Aim for 120–158 characters summarizing the value and call to action.',
    },
    {
      id: 'clean-slug',
      label: 'Clean, hyphenated URL slug configured',
      points: 10,
      passed: slug.length >= 10 && /^[a-z0-9-]+$/.test(slug),
      hint: 'URL slug should use lowercase words separated by hyphens.',
    },
    {
      id: 'image-alt',
      label: 'Cover image & all content pictures have descriptive Alt Text',
      points: 15,
      passed: coverAlt.length >= 12 && allInlineAltsFilled,
      hint: 'Every picture needs descriptive Alt Text for Google Images SEO and accessibility.',
    },
    {
      id: 'headings-depth',
      label: `Structured H2 subheadings (${headingsCount}) & article depth (${bodyWords} words)`,
      points: 10,
      passed: headingsCount >= 2 && bodyWords >= 120,
      hint: 'Include at least 2 H2 subheadings and 120+ words of helpful content.',
    },
    {
      id: 'keywords-tags',
      label: `Targeted SEO keywords configured (${(post.keywords || []).length} keywords)`,
      points: 10,
      passed: Array.isArray(post.keywords) && post.keywords.length >= 4,
      hint: 'Include 4–7 targeted keywords to reinforce topic relevance.',
    },
    {
      id: 'faq-schema',
      label: `Google FAQ Rich Snippet schema (${(post.faqs || []).length} FAQs)`,
      points: 10,
      passed: Array.isArray(post.faqs) && post.faqs.length >= 2,
      hint: 'Adding 2+ FAQs generates FAQPage JSON-LD schema for expandable Google search results.',
    },
  ]

  const score = checks.reduce((sum, item) => sum + (item.passed ? item.points : 0), 0)
  return { score, checks, bodyWords, headingsCount }
}

/**
 * Compresses a user-selected image file in the browser into a compact WebP data URL
 * so images can be stored directly in JSON / GitHub without paying for cloud storage.
 */
export function compressImageFileToDataUrl(file, maxWidth = 1200, quality = 0.78) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'))
      return
    }
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Failed to read image file'))
    reader.onload = (e) => {
      const img = new Image()
      img.onerror = () => reject(new Error('Invalid image format'))
      img.onload = () => {
        const scale = img.width > maxWidth ? maxWidth / img.width : 1
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        const dataUrl = canvas.toDataURL('image/webp', quality)
        resolve(dataUrl)
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}

/**
 * Generates a valid XML Sitemap for Google Search Console covering main routes + all blog posts.
 */
export function generateSitemapXml(posts = []) {
  const today = new Date().toISOString().slice(0, 10)
  const urls = [
    { loc: 'https://adeelsi.me/', lastmod: today, changefreq: 'weekly', priority: '1.0' },
    { loc: 'https://adeelsi.me/wardmail', lastmod: today, changefreq: 'weekly', priority: '0.95' },
    { loc: 'https://adeelsi.me/whatsapp-agent', lastmod: today, changefreq: 'weekly', priority: '0.95' },
    { loc: 'https://adeelsi.me/blog', lastmod: today, changefreq: 'daily', priority: '0.9' },
    ...posts.map((p) => ({
      loc: `https://adeelsi.me/blog/${p.slug}`,
      lastmod: p.updatedAt || p.publishedAt || today,
      changefreq: 'monthly',
      priority: '0.85',
    })),
  ]

  const xmlItems = urls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlItems}\n</urlset>\n`
}

export function downloadTextFile(filename, content, mimeType = 'application/json') {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function loadGitHubCmsConfig() {
  try {
    const raw = localStorage.getItem(GITHUB_CFG_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore
  }
  return {
    repo: 'adeeljames/portfolio',
    branch: 'main',
    token: '',
  }
}

export function saveGitHubCmsConfig(cfg) {
  try {
    localStorage.setItem(GITHUB_CFG_KEY, JSON.stringify(cfg))
  } catch {
    // ignore
  }
}

function toBase64Utf8(str) {
  const bytes = new TextEncoder().encode(str)
  let binary = ''
  bytes.forEach((b) => {
    binary += String.fromCharCode(b)
  })
  return btoa(binary)
}

async function putGitHubFile({ repo, branch, token, path, content, commitMessage }) {
  const cleanRepo = repo.trim().replace(/^https?:\/\/github\.com\//i, '').replace(/\.git$/i, '').replace(/\/+$/, '')
  const apiUrl = `https://api.github.com/repos/${cleanRepo}/contents/${path}`
  const headers = {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token.trim()}`,
    'X-GitHub-Api-Version': '2022-11-28',
  }

  // Check if file already exists to get its sha
  let existingSha = undefined
  const getRes = await fetch(`${apiUrl}?ref=${encodeURIComponent(branch || 'main')}`, {
    method: 'GET',
    headers,
  })
  if (getRes.ok) {
    const existingData = await getRes.json()
    existingSha = existingData.sha
  } else if (getRes.status !== 404) {
    const errBody = await getRes.json().catch(() => ({}))
    throw new Error(errBody.message || `GitHub API error (${getRes.status}) when checking ${path}`)
  }

  const putRes = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: commitMessage,
      content: toBase64Utf8(content),
      branch: branch || 'main',
      ...(existingSha ? { sha: existingSha } : {}),
    }),
  })

  if (!putRes.ok) {
    const errBody = await putRes.json().catch(() => ({}))
    throw new Error(errBody.message || `GitHub commit failed (${putRes.status}) on ${path}`)
  }

  return putRes.json()
}

/**
 * Commits both `src/data/blogs.json` and `public/sitemap.xml` directly to the user's
 * GitHub repository. Vercel automatically detects the commit and deploys the updated
 * SEO blog globally in ~20 seconds at $0 database cost.
 */
export async function publishBlogsToGitHub(posts, config) {
  if (!config?.repo || !config?.token) {
    throw new Error('Please enter your GitHub Repository (e.g. username/repo) and Personal Access Token.')
  }

  const jsonContent = JSON.stringify(posts, null, 2)
  const sitemapContent = generateSitemapXml(posts)

  await putGitHubFile({
    repo: config.repo,
    branch: config.branch || 'main',
    token: config.token,
    path: 'src/data/blogs.json',
    content: jsonContent,
    commitMessage: `chore(seo-blog): update blogs.json (${posts.length} articles) via /admin CMS`,
  })

  await putGitHubFile({
    repo: config.repo,
    branch: config.branch || 'main',
    token: config.token,
    path: 'public/sitemap.xml',
    content: sitemapContent,
    commitMessage: 'chore(seo): update public/sitemap.xml via /admin CMS',
  })

  return true
}

/**
 * Dynamically updates document `<head>` SEO tags (Title, Description, Keywords,
 * Canonical URL, OpenGraph, Twitter Card, and Schema.org JSON-LD) on route change.
 * @param {{
 *   title: string,
 *   description: string,
 *   keywords?: string[],
 *   canonicalPath?: string,
 *   ogType?: string,
 *   imageUrl?: string,
 *   imageAlt?: string,
 *   jsonLd?: Record<string, unknown> | null,
 *   noindex?: boolean
 * }} options
 */
export function applyDynamicSeo({
  title,
  description,
  keywords = [],
  canonicalPath = '/',
  ogType = 'website',
  imageUrl = 'https://adeelsi.me/og-cover.png',
  imageAlt = 'Muhammad Adeel — AI Engineer & Certified Agent Architect',
  jsonLd = null,
  noindex = false,
}) {
  if (typeof document === 'undefined') return

  document.title = title

  const setMeta = (selector, attrName, attrValue, content) => {
    let el = document.head.querySelector(selector)
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute(attrName, attrValue)
      document.head.appendChild(el)
    }
    el.setAttribute('content', content)
  }

  setMeta('meta[name="description"]', 'name', 'description', description)
  if (keywords.length > 0) {
    setMeta('meta[name="keywords"]', 'name', 'keywords', keywords.join(', '))
  }
  setMeta(
    'meta[name="robots"]',
    'name',
    'robots',
    noindex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  )

  const canonicalUrl = `https://adeelsi.me${canonicalPath === '/' ? '' : canonicalPath}`
  let canonicalEl = document.head.querySelector('link[rel="canonical"]')
  if (!canonicalEl) {
    canonicalEl = document.createElement('link')
    canonicalEl.setAttribute('rel', 'canonical')
    document.head.appendChild(canonicalEl)
  }
  canonicalEl.setAttribute('href', canonicalUrl)

  // OpenGraph
  setMeta('meta[property="og:type"]', 'property', 'og:type', ogType)
  setMeta('meta[property="og:title"]', 'property', 'og:title', title)
  setMeta('meta[property="og:description"]', 'property', 'og:description', description)
  setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl)
  setMeta('meta[property="og:image"]', 'property', 'og:image', imageUrl)
  setMeta('meta[property="og:image:alt"]', 'property', 'og:image:alt', imageAlt)

  // Twitter
  setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
  setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl)

  // Dynamic JSON-LD Schema
  let ldScript = document.getElementById('dynamic-seo-jsonld')
  if (jsonLd) {
    if (!ldScript) {
      ldScript = document.createElement('script')
      ldScript.id = 'dynamic-seo-jsonld'
      ldScript.type = 'application/ld+json'
      document.head.appendChild(ldScript)
    }
    ldScript.textContent = JSON.stringify(jsonLd)
  } else if (ldScript) {
    ldScript.remove()
  }
}

export function buildArticleJsonLd(post) {
  const articleUrl = `https://adeelsi.me/blog/${post.slug}`
  const resolvedImg = resolveBlogImageUrl(post.coverImage?.url)
  const absoluteImg = resolvedImg.startsWith('http')
    ? resolvedImg
    : `https://adeelsi.me${resolvedImg.startsWith('/') ? '' : '/'}${resolvedImg}`

  const graph = [
    {
      '@type': 'BlogPosting',
      '@id': `${articleUrl}#article`,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': articleUrl,
      },
      headline: post.seoTitle || post.title,
      name: post.title,
      description: post.metaDescription || post.subtitle,
      image: {
        '@type': 'ImageObject',
        url: absoluteImg,
        caption: post.coverImage?.alt || post.title,
      },
      datePublished: post.publishedAt || '2026-11-01',
      dateModified: post.updatedAt || post.publishedAt || '2026-11-08',
      author: {
        '@type': 'Person',
        name: 'Muhammad Adeel',
        url: 'https://adeelsi.me/',
        jobTitle: 'AI Engineer & Certified Agent Architect',
      },
      publisher: {
        '@type': 'Person',
        name: 'Muhammad Adeel',
        url: 'https://adeelsi.me/',
      },
      keywords: (post.keywords || []).join(', '),
      articleSection: post.category || 'AI Engineering',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://adeelsi.me/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog & SEO Guides',
          item: 'https://adeelsi.me/blog',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: articleUrl,
        },
      ],
    },
  ]

  if (Array.isArray(post.faqs) && post.faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: post.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    })
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}
