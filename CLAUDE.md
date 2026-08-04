# KORU Campaign Tracker

## What this is
Campaign management app for KORU's go-to-market. Current strategy (from Aug 2026, after the LinkedIn-broadcast/launch plan failed): a free public AI-citation checker + founder-led LinkedIn outreach — Kira runs the checker on target companies and DMs each prospect their own "who does AI cite instead of you" result. Everything remote (no live calls). Twitter and the big-launch/Product-Hunt play are dropped. React + MUI frontend, Express backend, deployed on Vercel.

## Campaign roles
- **Кира:** runs the AI-citation checker on target companies, DMs each prospect their own result on LinkedIn, posts findings from her personal profile, async follow-up (send full report or a recorded walkthrough — NO live calls). All remote.
- **Макс:** deploy only — ship the platform to production. Nothing else.
- **Настя:** Research ONLY — find people, build the database (Sources → Люди), categorize. No engagement, no DMs, no outreach.

## Messaging — source of truth

**Tagline:** Rank in Google. Get cited by AI.

**Competitive context:** The GEO market already exists. Profound ($120+/mo), Goodie AI ($495/mo), Bluefish, AirOps, Brandi AI — enterprise GEO platforms. SE Ranking, Semrush — hybrid SEO+GEO suites. Otterly ($39/mo) — lightweight monitor. KORU is NOT the first to do AI visibility. The market knows about GEO. Never position KORU as "nobody does this" — position as the accessible, per-page diagnostic + full pipeline tool.

**Pitch:** GEO tools track whether AI mentions your brand. But they don't check WHY a specific page gets cited or skipped — or who the engines cite instead of you. KORU checks each page against 14 rules and tells you exactly what to fix (GEO Score), shows which AI engines actually cite your site (AI Reputation), and reveals who they cite instead of you and why those pages get cited — the engines' reasoning plus the on-page signals (Citation Gap). Enterprise GEO platforms start at $120/mo and only give you monitoring. KORU gives you per-page diagnosis, intent-first keywords, content briefs, and a task pipeline — starting free. Full stack from $19.

**Positioning vs competitors:**
- Enterprise GEO monitors (Profound, Goodie, Bluefish) = brand-level monitoring, $120-$500+/mo. For big teams.
- KORU = per-page diagnosis + full workflow (audit → keywords → briefs → tasks). For freelancers and small agencies. Free entry.
- Key differentiator: competitors ask "does AI mention your brand?" KORU asks "why doesn't AI cite THIS page — and who does AI cite instead of you, and why do those pages get cited and not yours?" (Citation Gap).
- Second differentiator: most GEO tools are monitors only. KORU connects finding → action (every finding becomes a task).
- Third differentiator: KORU probes four assistants people actually use — ChatGPT, Gemini, Claude and Grok — with live web search, not training memory. Most monitors check one or two.
- Fourth differentiator: price. Free tier includes GEO Score + a taste of Citation Gap + one AI Reputation brand check. Starter $19. Closest competitor Otterly starts at $39 with less functionality.

## What to say
- These are SEPARATE tools inside one platform, each run on demand — not a single "paste a URL and everything flows automatically" pipeline. Say "one platform, several tools," never "one click — everything done."
- GEO Score: 14-rule per-page AI-citation readiness check (FAQ schema, inverted pyramid, citation-worthy claims, entity density, AI crawler access). Score 0-100 with evidence per rule. This is PER PAGE diagnosis — not brand-level monitoring like most GEO tools. On-demand per page, not embedded in the base crawl.
- Citation Gap: ask ChatGPT, Gemini, Claude and Grok your target question — with live web search — capture who they actually cite, then read each of those pages and see exactly why they got cited — the engines' own reasoning plus the on-page signals (schema, depth, comparison, sources). Answers "who does AI cite instead of me, and why?" Free plan gets a taste (3 questions).
- AI Reputation: asks the same four engines — on live web search, not training memory — what they say about your brand, and shows which of them actually cite your site (a per-engine radar). Free plan gets one brand check per website. (Replaces the old "AI Brand Visibility" probe — retired.)
- Agent Readiness: checks llms.txt, markdown content negotiation, Content-Signal directives, JSON-LD coverage, HTTP Link headers.
- Readability: on-demand check of how readable your pages are to an AI ("what an AI can actually read"), with fixes that convert to tasks.
- Intent-first keywords: AI reads site content first (not start from head-term), then finds opportunities with intent classification, relevance gate (core/adjacent/off_topic), semantic clustering by meaning.
- Content briefs + content drafts via Claude AI (working drafts, not final copy).
- AI Mode Rank Tracking: tracks positions in Google AI Mode (PRO+).
- Tasks: every finding — from any of the tools above — becomes a task. Finding → action, not just monitoring.
- Pricing: Free ($0, includes GEO Score + 3 Citation questions + 1 AI Reputation brand check), Starter ($19), Pro ($59), Agency ($179), Custom (metered).

## What NOT to say — guard rails
- **Never say "nobody tracks AI visibility" or "most SEO tools don't measure this."** The GEO market exists (Profound, Goodie, SE Ranking, Semrush AI, Otterly, etc.). Saying "nobody does this" destroys credibility with anyone who knows the space.
- **Never say "we're the first" or "we invented GEO."** GEO as a category is established. KORU's angle is per-page diagnosis + full pipeline + free entry — not "first mover."
- **Never say "published articles" or "ready-to-publish."** KORU generates content drafts — working material for editing, not final copy.
- **Never say "5 minutes."** Processing time depends on site size. Don't promise specific timing.
- **Never say "Perplexity."** That provider is commented out in code (TODO). Say "OpenAI and Gemini" or "major AI engines."
- **Never say "automatic GEO audit on every page."** GEO Score is an on-demand check per page, not embedded in the base crawl.
- **Never say "one click — everything done."** Audit, GEO, AI Brand, Agent Readiness are separate actions in one platform.

## Key stats used in posts
- 48% of Google searches show AI Overviews (2026)
- AI Overviews cut organic CTR by 34.5% on first result
- Only 38% of AI-cited pages overlap with the traditional top-10
- 84% of AI-cited pages come from earned media
- Average AI Mode query is 3x longer than classical search
- 1 in 6 US searches is voice or image

## App structure
- **Sidebar:** Overview, Sources, Playbook, Dashboard + collapsible weekly day list (weeks collapse/expand; active week open)
- **Overview:** Team cheat sheet (EN/RU) — positioning, pain points, features, tone
- **Sources:** People, Groups (with priority #), Companies, Outreach, Competitors, Dashboard (auto-calculated stats). Outreach tracks per person: «Прогнал»/«Послал» + result screenshot (uploaded to data/uploads via /api/upload)
- **Day views:** Tasks with copy blocks, steps, subtasks, assignees. The new-strategy weekly loop lives in Week 8 (from 3 Aug) and repeats under "Дальше"
- (Creatives section removed — post visuals are now real report screenshots, not designed cards)

## Tech
- React + TypeScript + MUI
- Express server at `/api/progress`
- Data persisted in `data/progress.json`
- Deployed on Vercel
