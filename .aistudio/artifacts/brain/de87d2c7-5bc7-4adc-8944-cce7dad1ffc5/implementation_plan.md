# Interactive Groq AI Portfolio Chatbot Popup & Cal.com Booking CTA Plan

This update adds an interactive floating AI Portfolio Chatbot popup powered by your 3 Groq models (`openai/gpt-oss-20b`, `openai/gpt-oss-120b`, and `qwen/qwen3.8-27b`) with the API key stored securely in `.env` and accessed via a server-side `/api/chat` proxy route so the secret is never exposed in client-side code or Git, plus a second **"Book a free 20 min call"** CTA button (`https://cal.com/adeelsi/20min`) alongside `hello@adeelsi.me` in the Contact section.

## User Review & Critical Decisions

> [!IMPORTANT]
> Summary of secure `.env` + server-side proxy configuration:

- **Secure `.env` Storage & Server-Side `/api/chat` Proxy**:
  - Store `GROQ_API_KEY` inside `.env` (which is listed in `.gitignore` so it is never committed or exposed) and document `GROQ_API_KEY="YOUR_GROQ_API_KEY"` in `.env.example`.
  - The frontend `ChatWidget` sends messages to `/api/chat` on the backend (`server.ts`), which reads `process.env.GROQ_API_KEY` on the server and calls Groq’s API—ensuring your API key is completely hidden from browser DevTools and client bundles.
  - Automatic server-side model failover across your exact 3 models:
    1. Primary: `openai/gpt-oss-20b`
    2. Fallback 1: `openai/gpt-oss-120b`
    3. Fallback 2: `qwen/qwen3.8-27b`
- **Groq-Powered Portfolio Chatbot Popup (`ChatWidget`)**:
  - Floating bottom-right launcher button (`Ask Adeel's AI`) that opens an ember-and-glass chat popup matching the Fluxora design language on both desktop and mobile.
  - Grounded with complete knowledge of Muhammad Adeel’s 5 AI services, 12 production projects, 4 industry roles, 12 certifications, GitHub (`https://github.com/adeeljames`), LinkedIn (`https://www.linkedin.com/in/muhammadadeelai/`), email (`hello@adeelsi.me`), and Cal.com link (`https://cal.com/adeelsi/20min`).
  - Includes quick starter chips (*"What projects has Adeel built?"*, *"Tell me about his AI agent services"*, *"How can I hire or book a call?"*).
  - Includes a built-in conversion banner inside the popup footer: **"Want an AI like this for your site? Contact me"** with direct links to `#contact` and `https://cal.com/adeelsi/20min`.
- **Dual Contact CTAs (`hello@adeelsi.me` + `Book a free 20 min call`)**:
  - In the final Contact section (`#contact`), displays both the `hello@adeelsi.me` button and a second **"Book a free 20 min call"** button (`https://cal.com/adeelsi/20min`) opening in a new browser tab (`target="_blank" rel="noopener noreferrer"`).

---

## 1. Overview & Core Concept

- **What It Does**: Lets visitors interactively ask questions about Muhammad Adeel’s portfolio in real time via a fast Groq-powered AI assistant popup while keeping the API key strictly protected in `.env` on the server.
- **Key Value**: Protects your Groq API key from public exposure while demonstrating live agentic engineering and converting visitors via direct Cal.com scheduling.

---

## 2. Technical Architecture & Data Strategy *(Technical Reference)*

```
┌───────────────────────────────────────────────────────────────────────────┐
│                         Client Browser (React SPA)                        │
├───────────────────────────────────────────────────────────────────────────┤
│  ├─ Contact Section (#contact):                                           │
│  │   ├─ Primary CTA: "hello@adeelsi.me" (mailto:)                         │
│  │   └─ Secondary CTA: "Book a free 20 min call ↗"                        │
│  │      (https://cal.com/adeelsi/20min in new tab)                        │
│  │                                                                        │
│  └─ Floating AI Chatbot Popup (ChatWidget)                                │
│      ├─ Header, Message Stream, Starter Chips & Input Bar                 │
│      ├─ Conversion Banner: "Want an AI like this for your site?           │
│      │   Contact me · Book a 20-min call ↗"                               │
│      └─ POST /api/chat (No API key in browser bundle)                     │
└─────────────────────────────────────┬─────────────────────────────────────┘
                                      │
                                      ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                    Server-Side Proxy (server.ts + .env)                   │
│  ├─ Reads process.env.GROQ_API_KEY from gitignored .env                   │
│  └─ Calls https://api.groq.com/openai/v1/chat/completions                 │
│      ├─ 1. openai/gpt-oss-20b   (Primary)                                 │
│      ├─ 2. openai/gpt-oss-120b  (Fallback 1)                              │
│      └─ 3. qwen/qwen3.8-27b     (Fallback 2)                              │
└───────────────────────────────────────────────────────────────────────────┘
```
