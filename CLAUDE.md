# KORU Campaign Tracker

## What this is
Campaign management app for KORU's LinkedIn/Twitter launch campaign. React + MUI frontend, Express backend, deployed on Vercel.

## Campaign roles
- **Кира:** LinkedIn posts, engagement, DMs, connection requests, all outreach
- **Макс:** Twitter cross-posts, Twitter monitoring, landing page, GA/analytics, demo recording, product/tech tasks
- **Настя:** Research ONLY — find people, build database (Sources → Люди), categorize, Friday metrics via Dashboard. No engagement, no connection requests, no DMs.

## Messaging — source of truth

**Tagline:** Rank in Google. Get cited by AI.

**Competitive context:** The GEO market already exists. Profound ($120+/mo), Goodie AI ($495/mo), Bluefish, AirOps, Brandi AI — enterprise GEO platforms. SE Ranking, Semrush — hybrid SEO+GEO suites. Otterly ($39/mo) — lightweight monitor. KORU is NOT the first to do AI visibility. The market knows about GEO. Never position KORU as "nobody does this" — position as the accessible, per-page diagnostic + full pipeline tool.

**Pitch:** GEO tools track whether AI mentions your brand. But they don't check WHY a specific page gets cited or skipped. KORU checks each page against 14 rules and tells you exactly what to fix. Enterprise GEO platforms start at $120/mo and only give you monitoring. KORU gives you per-page diagnosis, intent-first keywords, content briefs, and a task pipeline — starting free. Full stack from $19.

**Positioning vs competitors:**
- Enterprise GEO monitors (Profound, Goodie, Bluefish) = brand-level monitoring, $120-$500+/mo. For big teams.
- KORU = per-page diagnosis + full workflow (audit → keywords → briefs → tasks). For freelancers and small agencies. Free entry.
- Key differentiator: competitors ask "does AI mention your brand?" KORU asks "why doesn't AI cite THIS page, and what do you fix?"
- Second differentiator: most GEO tools are monitors only. KORU connects finding → action (9 task source types).
- Third differentiator: price. Free tier includes GEO Score + AI Brand Visibility. Starter $19. Closest competitor Otterly starts at $39 with less functionality.

## What to say
- GEO Score: 14-rule per-page AI-citation readiness check (FAQ schema, inverted pyramid, citation-worthy claims, entity density, AI crawler access). Score 0-100 with evidence per rule. This is PER PAGE diagnosis — not brand-level monitoring like most GEO tools.
- AI Brand Visibility: monitors whether OpenAI and Gemini recommend your brand. Per-provider trend charts, competitor detection, recommendations that convert to tasks.
- Agent Readiness: checks llms.txt, markdown content negotiation, Content-Signal directives, JSON-LD coverage.
- Intent-first keyword pipeline: AI reads site content first (not start from head-term), then finds opportunities with intent classification, relevance gate (core/adjacent/off_topic), semantic clustering by meaning.
- Content briefs + content drafts via Claude AI.
- AI Mode Rank Tracking: tracks positions in Google AI Mode (PRO+).
- 9 task source types: audit → keywords → backlinks → rank drops → AI brand → agent readiness → competitor gap → brief → tasks.
- Pricing: Free ($0, includes GEO + AI Brand), Starter ($19), Pro ($59), Agency ($179).

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
- **Sidebar:** Overview, Sources, Creatives + day list with collapsible header
- **Overview:** Team cheat sheet (EN/RU) — positioning, pain points, features, tone
- **Sources:** People, Groups (with priority #), Companies, Top-5, Dashboard (auto-calculated stats)
- **Creatives:** 12 HTML visual cards for posts, ready to screenshot
- **Day views:** Tasks with copy blocks, steps, subtasks, assignees

## Tech
- React + TypeScript + MUI
- Express server at `/api/progress`
- Data persisted in `data/progress.json`
- Deployed on Vercel
