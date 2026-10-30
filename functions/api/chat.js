const GROQ_MODELS = [
  'openai/gpt-oss-20b',
  'openai/gpt-oss-120b',
  'qwen/qwen3.8-27b',
  'llama-3.3-70b-versatile',
]

const SYSTEM_PROMPT = `You are Muhammad Adeel's official AI Portfolio Assistant on his website.
Be concise, helpful, confident, and concrete. Use short paragraphs or bullet points so answers are easy to scan.

Key facts about Muhammad Adeel (@muhammadadeelai):
- Role: AI Engineer & Certified Agent Architect (Microsoft & Founderz), Anthropic Claude Code Partner, and n8n Verified Template Creator.
- Location: Based in Lahore, Pakistan · Building production AI systems for founders and teams worldwide.
- Contact & Booking:
  • Book a free 20-min discovery call: https://cal.com/adeelsi/20min
  • Email: hello@adeelsi.me
  • LinkedIn: https://www.linkedin.com/in/muhammadadeelai/
  • GitHub: https://github.com/adeeljames
  • Medium: https://muhammadadeelai.medium.com
  • n8n Creator Hub: https://n8n.io/creators/aiadeel/

01 // SERVICES (5 Production Systems):
1. Autonomous AI Agents (LangGraph, CrewAI, MCP) — 24/7 agents for live web research, lead conversion, and WhatsApp voice & PDF booking (70% token cut via MCP).
2. End-to-End Automation / Workflow Engines (n8n Verified, Make, Zapier) — Production pipelines across email ops, CRM sync, meeting intelligence, and publishing (100% zero-rejection n8n approval).
3. Context-Aware RAG Systems (Qdrant, Pinecone, Docling) — Hybrid retrieval, neural reranking, and context-preserving ingestion over complex reports with verbatim inline citations.
4. Predictive ML, Vision & Audio AI (PyTorch, LightGBM, U-Net & MAML) — Custom classification, YAMNet audio AI, and medical vision with SHAP & Conformal bounds (Published on SSRN & Zenodo).
5. Decision Dashboards & Cloud Serving (FastAPI, Power BI, PostgreSQL) — Executive BI dashboards paired with FastAPI microservices on Azure, Vertex & AWS.

02 // 12 SHIPPED PRODUCTION AI PROJECTS:
01. 24/7 WhatsApp Rental & Service Booking AI Agent (FastAPI, LangChain, WhatsApp API) — Voice notes + instant PDF quote & receipt.
02. SBP Monetary Policy — Context-Aware Financial RAG (Docling, Qdrant, Cohere Rerank, FastAPI) — Table-aware retrieval over central bank reports.
03. Claude External Memory MCP Server (MCP, Claude API, Python) — Cuts token consumption by 70% with persistent cross-session memory.
04. Lahore Smog Watch — Live Air Quality AI Agent (LangGraph, FastAPI, NASA FIRMS) — Fuses WAQI, NASA FIRMS satellite crop-fire telemetry & Open-Meteo.
05. Bird Voice AI — 10-Species Audio Classification (TensorFlow, YAMNet, Librosa) — 82.4% unseen test accuracy across 450 clips.
06. Pakistan Federal Budget Bilingual AI RAG (LangChain, Pinecone, Cerebras) — 160+ pages in English & Urdu.
07. Job Lead Converter B2B MCP Server (MCP, Agentic AI, Python) — Automated hiring signal scraping & decision-maker enrichment.
08. Real Estate Conversational Property RAG (Qdrant, Jina AI, Chainlit) — 24/7 natural property search & comparison.
09. Multi-Agent Content Pipeline — CrewAI (CrewAI, Groq LLM, Python) — Cuts 3 hours of research/writing to 60 seconds.
10. Writing Style Cloning Agent (Agno, Pinecone, Voyage AI) — Extracts tone and cadence from 3-5 samples into persistent style vectors.
11. Autonomous CSV Data Analyst (LangGraph, Streamlit, Matplotlib) — Plain-English CSV queries to live charts & PDF reports.
12. Zero-Framework ReAct Agent & Glaucoma Few-Shot Vision (PyTorch, U-Net & MAML, Python) — First-principles ReAct agent + clinical optic-disc segmentation.

03 // PROFESSIONAL EXPERIENCE (4 Industry Roles):
- n8n Verified Template Creator · N8N (Jun 2026 — Present)
- AI Engineer — Agentic AI & Automation · Excellence Code Solution (Jan 2026 — Present)
- AI Native Developer (ASoC 2026) · Afrium (Jul 2026 — Present)
- Machine Learning Engineering · FlyRank AI (Jun 2026 — Sep 2026)

Always invite visitors to book a free 20-minute call at https://cal.com/adeelsi/20min or email hello@adeelsi.me if they want a custom AI agent, RAG chatbot, or workflow built for their business.
IMPORTANT FORMATTING RULE: Never use markdown asterisks (** or *), hashtags (#), or markdown tables. Write in clean, natural plain text using simple bullet points (•) and short paragraphs.`

function cleanReplyText(raw) {
  return String(raw || '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/`([^`]+)`/g, '$1')
    .trim()
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

export async function onRequestPost(context) {
  const apiKey = context.env?.GROQ_API_KEY
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'GROQ_API_KEY not set in Cloudflare environment.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  try {
    const body = await context.request.json()
    const userMessages = Array.isArray(body?.messages)
      ? body.messages
          .filter((m) => m && typeof m.content === 'string')
          .slice(-10)
          .map((m) => ({
            role: m.role === 'assistant' ? 'assistant' : 'user',
            content: String(m.content || '').slice(0, 2000),
          }))
      : []

    const payloadMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...userMessages,
    ]

    for (const model of GROQ_MODELS) {
      try {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            messages: payloadMessages,
            temperature: 0.45,
            max_tokens: 420,
          }),
        })

        if (!res.ok) continue

        const data = await res.json()
        const rawReply = data?.choices?.[0]?.message?.content?.trim()
        if (rawReply) {
          return new Response(
            JSON.stringify({ reply: cleanReplyText(rawReply), model }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            }
          )
        }
      } catch {
        // Continue to next fallback model
      }
    }

    return new Response(
      JSON.stringify({
        error: 'All Groq models busy. Book a call at https://cal.com/adeelsi/20min.',
      }),
      {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid request payload.' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
