# KORU Campaign Tracker

## What this is
Campaign management app for KORU's go-to-market. Current strategy (from Aug 2026, after the LinkedIn-broadcast/launch plan failed): a free public checker (audit + AI-citation) + founder-led LinkedIn outreach — Kira runs the checker on target companies and DMs each prospect their own "who does AI cite instead of you" result. Everything remote (no live calls). Twitter stays dropped. **Product Hunt is BACK (decided 17.08.2026)** — as a ONE-TIME amplifier on top of the steady founder-outreach loop, not a replacement, and gated: a hard 3-condition check (checker stable, landing converts, warm list ≥30) must pass or the launch slips a week. PH launch week lives after the release (dayIndex 1011–1013). React + MUI frontend, Express backend, deployed on Vercel.

## Campaign roles
- **Кира:** runs the AI-citation checker on target companies, DMs each prospect their own result on LinkedIn, posts findings from her personal profile, async follow-up (send full report or a recorded walkthrough — NO live calls). All remote.
- **Макс:** deploy only — ship the platform to production. Nothing else.
- **Настя:** Research + tester recruitment — finds people (Sources → Люди), and runs warm outreach from Kira's account: a short personal note on a LinkedIn connection request → once accepted/replied, offer beta testing. Shared effort with Kira (KORU is a team project, not solo).

## Messaging — source of truth

**Tagline:** Rank in Google. Get cited by AI.

**Core frame — DUAL coverage:** KORU is not "another AI tracker" and not "another SEO tool" — it's both sides in one platform. The client sees how Google finds them AND how AI engines cite them, without paying for two subscriptions. Classic SEO depth (site audit, keyword engine, rank tracking, backlinks) + AI visibility (Citation Gap, AI Reputation, GEO Score, Agent Readiness) — one place. Lead with this: two-in-one, not a single-purpose GEO monitor.

**Competitive context:** Two competitor sets, because KORU spans both worlds.
- GEO / AI-visibility monitors: Profound ($120+/mo), Goodie AI ($495/mo), Bluefish, AirOps, Brandi AI (enterprise), Otterly ($39/mo, lightweight). The GEO market already exists — KORU is NOT the first to do AI visibility. Never say "nobody does this."
- Classic SEO suites: Ahrefs, Semrush, SE Ranking, Moz. Big, established, expensive, and mostly NOT covering AI-visibility per-page. KORU's edge here is the AI layer + finding→task workflow + free entry, not out-crawling them on raw index size.

**Pitch:** Most tools pick a side — SEO suites tell you how Google ranks you; GEO monitors tell you whether AI mentions your brand. KORU does both in one platform. On the SEO side: per-page site audit (crawl + Lighthouse + screenshots + heuristic checks), a keyword engine on real data (volumes, difficulty, ranked keywords) with an LLM layer for intent and semantic clustering, rank tracking including Google AI Mode, and backlinks + Competitor Gap. On the AI side: which engines actually cite your site (AI Reputation), who they cite instead of you and why (Citation Gap), and a 14-rule per-page readiness score (GEO Score). Every finding becomes a task — 9 task types across all modules. Built for agencies: multi-domain, team seats, white-label PDF reports. Starts free — one real report before you pay. Full stack from $19.

**Positioning vs competitors:**
- vs GEO monitors (Profound, Goodie, Bluefish, Otterly): they ask "does AI mention your brand?" KORU asks "why doesn't AI cite THIS page — and who does AI cite instead of you, and why do those pages get cited and not yours?" (Citation Gap) — and pairs it with full classic SEO, which pure GEO monitors don't have.
- vs SEO suites (Ahrefs, Semrush, SE Ranking): they have the SEO depth but treat AI visibility as a bolt-on or skip it. KORU makes AI-citation per-page diagnosis first-class and connects finding → action.
- Finding → action: most tools in either camp only monitor. KORU turns every finding — audit, AI-readiness, keywords, backlinks, rank drop, brief, competitor gap — into a task (9 types). Client gets a "what to fix" list, not a dashboard to drown in.
- Engines: KORU probes the assistants people actually use — ChatGPT, Gemini, Claude, Grok, and Perplexity — on live web search, not training memory. Most monitors check one or two. (Paid = all 5; Free = 4, no Perplexity — see guard rails.)
- Honest, verifiable: every GEO rule ships with proof; every AI citation is real, from live search. We show the actual cited competitors, not generic advice — there are no universal on-page rules (verified across 13 sites). Sells with trust, not promises.
- Price: Free includes GEO Score + a taste of Citation Gap + one AI Reputation brand check + one real audit. Starter $19. Closest AI-side competitor Otterly starts at $39 with less functionality; SEO suites cost far more.

## What to say
- These are SEPARATE tools inside one platform, each run on demand — not a single "paste a URL and everything flows automatically" pipeline. Say "one platform, several tools," never "one click — everything done."
- GEO Score: 14-rule per-page AI-citation readiness check (FAQ schema, inverted pyramid, citation-worthy claims, entity density, AI crawler access). Score 0-100 with evidence per rule. This is PER PAGE diagnosis — not brand-level monitoring like most GEO tools. On-demand per page, not embedded in the base crawl.
- Citation Gap: ask ChatGPT, Gemini, Claude, Grok and Perplexity your target question — with live web search — capture who they actually cite, then read each of those pages and see exactly why they got cited — the engines' own reasoning plus the on-page signals (schema, depth, comparison, sources). Answers "who does AI cite instead of me, and why?" Free plan gets a taste (3 questions, 4 engines — no Perplexity).
- AI Reputation: asks the same engines — on live web search, not training memory — what they say about your brand, and shows which of them actually cite your site (a per-engine radar). Free plan gets one brand check per website. (Replaces the old "AI Brand Visibility" probe — retired.)
- Agent Readiness: checks llms.txt, robots, markdown content negotiation, Content-Signal directives, JSON-LD coverage, HTTP Link headers.
- Site audit (classic SEO): crawls pages + Lighthouse + screenshots + heuristic SEO checks. Per-page breakdown with evidence, not a shallow score.
- Keyword engine (classic SEO): real data (volumes, difficulty, ideas, ranked keywords) + an LLM layer on top — intent classification, relevance gate (core/adjacent/off_topic), semantic clustering by meaning not word match. AI reads site content first, then finds opportunities.
- Rank tracking (classic SEO): positions in classic Google + Google AI Mode (PRO+) — which most trackers still don't have.
- Backlinks + Competitor Gap (classic SEO): whose profile is stronger and which queries a competitor beats you on.
- Readability: on-demand check of how readable your pages are to an AI ("what an AI can actually read"), with fixes that convert to tasks.
- Content briefs + content drafts via Claude AI (working drafts, not final copy).
- Tasks — the main differentiator: every finding, from ANY module, becomes a task. 9 task types (audit, AI-readiness, keywords, backlinks, rank drop, brief, competitor gap, etc.). Finding → action, not just monitoring.
- Built for agencies: multi-domain, team seats, white-label PDF reports, progress reports — one platform serves all the agency's clients under the agency's branding, not ours.
- Pricing: Free ($0, includes GEO Score + 3 Citation questions + 1 AI Reputation brand check + one real audit), Starter ($19), Pro ($59), Agency ($179), Custom (metered).

## What NOT to say — guard rails
- **Never say "nobody tracks AI visibility" or "most SEO tools don't measure this."** The GEO market exists (Profound, Goodie, SE Ranking, Semrush AI, Otterly, etc.). Saying "nobody does this" destroys credibility with anyone who knows the space.
- **Never say "we're the first" or "we invented GEO."** GEO as a category is established. KORU's angle is per-page diagnosis + full pipeline + free entry — not "first mover."
- **Never say "published articles" or "ready-to-publish."** KORU generates content drafts — working material for editing, not final copy.
- **Never say "5 minutes."** Processing time depends on site size. Don't promise specific timing.
- **Engines: 5 on paid (ChatGPT, Gemini, Claude, Grok, Perplexity), 4 on Free (no Perplexity).** Perplexity (Sonar) went live 16.08.2026 — naming it is now FINE. But on Free-tier copy do NOT promise the 5th engine; Free = 4. (The old "never say Perplexity" rule is RETIRED.)
- **Never say "automatic GEO audit on every page."** GEO Score is an on-demand check per page, not embedded in the base crawl.
- **Never say "one click — everything done."** Audit, GEO, AI Reputation, keywords, Agent Readiness are separate actions in one platform.
- **Never say "no universal on-page fix" is a weakness — it's the honest angle.** There are no universal on-page rules (verified across 13 sites); KORU shows the actual cited competitors and per-page proof, not generic advice.

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
