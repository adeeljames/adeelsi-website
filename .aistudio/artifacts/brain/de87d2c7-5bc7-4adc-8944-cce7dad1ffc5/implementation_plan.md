# Wardmail Minimal Conversion & Mobile UX Polish Plan

This update removes mobile screen clutter, fixes the Hero interactive inbox widget disappearing on hover/tap, consolidates the Pricing and Team Training section into a single compact high-converting card (removing the 3 example price cards), simplifies the Non-Technical Google Sheet section into a visual 2-row spreadsheet-to-reply preview, and removes the certification chips from the Meet Adeel card.

## User Review & Critical Decisions

> [!IMPORTANT]
> Both layout choices have been confirmed from your selections:
> 1. **Single Minimal Custom Quote + Team Training Card**: Remove the 3 example baseline price cards (`$250`, `~$173`, `$150`) and replace the multi-card pricing/training blocks with one clean, high-converting card combining the 4 custom quote factors, concise hands-on team training & done-for-you handover bullets, and the Free 20-Minute Call / Email CTA.
> 2. **Compact Visual Google Sheet Preview -> Instant Reply**: Redesign the Non-Technical Google Sheet section into a compact 2-row visual Google Sheet table flowing directly into 1 instant 24/7 AI reply bubble with minimal text.

- **Confirmed Decision 1 (Remove Mobile Floating Bar)**: Completely remove the fixed bottom floating CTA bar (`Ready for an inbox that answers 24/7? Book 20-Min Call`) so mobile screens stay clean and unobstructed.
- **Confirmed Decision 2 (Fix Hero Widget Vanishing on Hover/Tap)**: Fix the bug where hovering or tapping `"Approve and send"` in the Hero live inbox widget caused React's state update to overwrite the scroll-reveal `.in` class and make the widget invisible (`opacity: 0`).
- **Confirmed Decision 3 (Remove Certification Badges in Meet Adeel)**: Remove both certification chips (`Certified n8n template creator` and `Microsoft & Founderz Certified Agent Architect`) from the Meet Adeel card.

---

## 1. Overview & Core Concept

- **What It Does**: Streamlines the Wardmail page (`https://www.adeelsi.me/wardmail` and `https://www.wardmail.adeelsi.me/`) so every section communicates value with minimal words and strong visual clarity on both mobile and desktop.
- **Target Audience / Persona**: Busy business owners scanning on mobile who want immediate clarity on how Wardmail works, how they update answers in a Google Sheet, and how to book a free 20-minute call for a custom quote.
- **Key Value**: Zero floating bar overlap on mobile, a rock-solid interactive Hero widget that never vanishes on hover/tap, and concise, high-converting Google Sheet and Custom Quote sections.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Clean Mobile Viewport**: Users scroll through the Wardmail page without any floating bottom CTA bar covering content or the `Ask Adeel's AI` button.
  2. **Hero Interactive Widget (`Approve and send`)**: When a user hovers (desktop) or taps (mobile) `"Approve and send"`, the Hero widget remains at full opacity (`opacity: 1`) and smoothly flips to the concise confirmation card (*"See? Learning to run Wardmail is really this easy."*) with a `"Back to live inbox preview"` button.
  3. **Minimal Visual Google Sheet Section (`#sheet`)**: Users tap a topic tab (`Pricing`, `Timings`, or `Refund Policy`) and see a compact 2-row Google Sheet table (`Row 1: Header`, `Row 2: Active Question & Your Answer`) flowing directly into a single live 24/7 AI reply bubble.
  4. **Single Compact Pricing & Team Training Card (`#offer`)**: Instead of scrolling past 4 separate blocks and 3 example price cards, users see one clean, structured card showing:
     - **Left column**: Custom-built service tailored to your workflow (the 4 quote factors: Email volume, Knowledge base complexity, Integration requirements, Desired SLA & support level) + concise **We Train Your Team & Handle Everything** summary (setup, 24/7 server, live team training, and 3-month maintenance).
     - **Right column**: Direct Free 20-Minute Discovery Call CTA (`cal.com/adeelsi/20min ↗`) and quick estimate email (`hello@adeelsi.me`).
  5. **Clean Meet Adeel Section (`#meet`)**: Displays Adeel's portrait, concise bio, and portfolio/LinkedIn buttons without the two certification chips.

- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Editorial dark obsidian (`#070504`) with warm ember accents (`#FF5722`) and crisp hairline borders (`rgba(255, 130, 70, 0.16)`).
  - *Typography & Hierarchy*: Tight mobile section subheadings (`11.5px`) and scannable one-line bullet points instead of multi-paragraph explanations.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Root-Cause Fix for Hero Widget Vanishing**
  - *Chosen Approach*: Remove the imperative `.reveal` class from the stateful `.wm-mock` element (and enforce `opacity: 1; transform: none;` on `.wm-mock` and `.wm-mock--easy`).
  - *Why*: Previously, `IntersectionObserver` added `.in` via `classList.add('in')`. When `isEasyRevealed` changed on hover/tap, React re-rendered `className="wm-mock reveal wm-mock--easy"`, stripping `.in` and reverting `.reveal` to `opacity: 0`. Keeping `.wm-mock` independent of `.reveal` guarantees it never disappears on state changes.

- **Decision 2: Single Consolidated Custom Quote + Team Training Card**
  - *Chosen Approach*: Remove the 3 example baseline pricing cards (`$250`, `~$173`, `$150`) and merge Custom Quote factors, Team Training, and Done-For-You responsibilities into one unified two-column card.
  - *Why*: Eliminates repetitive pricing disclaimers and long vertical scrolling on mobile while keeping every conversion point clear in one glance.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        Wardmail Landing Page                             │
├──────────────────────────────────────────────────────────────────────────┤
│  1. Hero Interactive Mockup (.wm-mock)                                   │
│     ├── Static visibility (no .reveal class wipe on React re-render)     │
│     └── Hover/Tap "Approve and send" ──► Concise Easy Confirmation View  │
│                                                                          │
│  2. Minimal Google Sheet Section (#sheet)                                │
│     ├── Topic Pill Tabs (Pricing · Timings · Refund Policy)              │
│     ├── Compact 2-Row Visual Sheet Grid (Column A: Question | B: Answer) │
│     └── Flow Arrow ──► Single Instant 24/7 AI Reply Bubble               │
│                                                                          │
│  3. Single Compact Custom Quote & Team Training Card (#offer)            │
│     ├── Left: 4 Workflow Factors + "We Train Your Team & Run Everything" │
│     └── Right: Free 20-Min Call (cal.com/adeelsi/20min) + Email Estimate │
│                                                                          │
│  4. Meet Adeel Teaser (#meet)                                            │
│     └── Portrait + Bio + Links (2 certification badges removed)          │
│                                                                          │
│  5. Mobile Viewport Cleanup                                              │
│     └── Floating bottom sticky CTA (.wm-sticky) completely removed       │
└──────────────────────────────────────────────────────────────────────────┘
```
