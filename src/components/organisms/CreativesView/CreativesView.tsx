import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'

const sectionBox = {
    mb: 3,
    p: 2.5,
    borderRadius: 2,
    backgroundColor: '#ffffff05',
    border: '1px solid',
    borderColor: 'divider',
}

const BRAND_COLORS = [
    { name: 'Background', hex: '#fbfbf3', text: '#2E3633' },
    { name: 'Surface', hex: '#f0ede8', text: '#2E3633' },
    { name: 'Green', hex: '#3FB68E', text: 'white' },
    { name: 'Brown', hex: '#B56B3F', text: 'white' },
    { name: 'Red', hex: '#B5423F', text: 'white' },
    { name: 'Dark', hex: '#2E3633', text: 'white' },
    { name: 'Dark Brown', hex: '#36312E', text: 'white' },
    { name: 'Blue', hex: '#4a7fb5', text: 'white' },
    { name: 'Text', hex: '#2E3633', text: 'white' },
    { name: 'Muted', hex: '#6b6b6b', text: 'white' },
]

function CopyHex({ hex }: { hex: string }) {
    const [copied, setCopied] = React.useState(false)
    return (
        <IconButton
            size="small"
            onClick={() => { navigator.clipboard.writeText(hex); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
            sx={{ color: copied ? '#3fb68e' : 'text.secondary', p: 0.25 }}
        >
            <ContentCopyRoundedIcon sx={{ fontSize: '0.7rem' }} />
        </IconButton>
    )
}

function downloadCard(id: string, _filename: string) {
    const el = document.getElementById(id)
    if (!el) return
    // Fallback: select the card visually so user can screenshot
    const range = document.createRange()
    range.selectNode(el)
    const sel = window.getSelection()
    sel?.removeAllRanges()
    sel?.addRange(range)
    alert('Card selected — use Cmd+Shift+4 (Mac) or Snipping Tool (Win) to screenshot the card.')
}

// ── Visual card base styles ──
// Palette: ivory bg, dark text, earthy accents
const C = {
    bg: '#fbfbf3',
    surface: '#f0ede8',
    text: '#2E3633',
    muted: '#6b6b6b',
    green: '#3FB68E',
    brown: '#B56B3F',
    red: '#B5423F',
    dark: '#2E3633',
    darkBrown: '#36312E',
    blue: '#4a7fb5',
}

const cardBase: React.CSSProperties = {
    width: 600,
    height: 600,
    backgroundColor: C.bg,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 48,
    boxSizing: 'border-box',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    position: 'relative',
    overflow: 'hidden',
}

const tallCardBase: React.CSSProperties = {
    ...cardBase,
    height: 750,
    justifyContent: 'flex-start',
    paddingTop: 40,
}

interface PostVisual {
    id: string
    postNumber: number
    title: string
    tall?: boolean
    card: React.ReactNode
}

const POST_VISUALS: PostVisual[] = [
    {
        id: 'post1',
        postNumber: 1,
        title: 'Stat Card — 8 hours + AI answer',
        card: (
            <div id="card-post1" style={cardBase}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 96, fontWeight: 900, color: '#3FB68E', lineHeight: 1 }}>8h</div>
                    <div style={{ fontSize: 18, color: '#6b6b6b', marginTop: 8, fontWeight: 500 }}>per client, per month</div>
                    <div style={{ fontSize: 16, color: '#6b6b6b', marginTop: 2 }}>keyword research + content creation</div>
                    <div style={{ width: 60, height: 2, backgroundColor: '#3FB68E55', margin: '24px auto' }} />
                    <div style={{ fontSize: 72, fontWeight: 900, color: '#B5423F', lineHeight: 1, marginTop: 8 }}>48%</div>
                    <div style={{ fontSize: 18, color: '#6b6b6b', marginTop: 8, fontWeight: 500 }}>of Google searches now show</div>
                    <div style={{ fontSize: 18, color: '#2E3633', fontWeight: 700 }}>an AI answer above your #1 result</div>
                    <div style={{ fontSize: 14, color: '#6b6b6b44', marginTop: 32 }}>Are you optimizing for a click that's disappearing?</div>
                </div>
            </div>
        ),
    },
    {
        id: 'post2',
        postNumber: 2,
        title: 'Checklist — AI-citation readiness',
        tall: true,
        card: (
            <div id="card-post2" style={tallCardBase}>
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#2E3633' }}>Is your page citable by AI?</div>
                    <div style={{ fontSize: 14, color: '#6b6b6b', marginTop: 4 }}>6 signals AI engines look for</div>
                </div>
                {[
                    { text: 'FAQ / HowTo schema', sub: 'most-cited format in AI Overviews' },
                    { text: 'Inverted pyramid lead', sub: 'answer the question in paragraph 1' },
                    { text: 'Question-shaped H2s', sub: '"What is...", "How does..."' },
                    { text: 'Citation-worthy claims', sub: 'numbers, dates, named entities' },
                    { text: 'AI crawlers allowed', sub: 'GPTBot, ClaudeBot not blocked' },
                    { text: 'Author attribution', sub: 'E-E-A-T signal in JSON-LD' },
                ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16, width: '100%' }}>
                        <div style={{ width: 28, height: 28, borderRadius: 6, border: '2px solid #3fb68e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                            <div style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: '#3fb68e' }} />
                        </div>
                        <div>
                            <div style={{ fontSize: 16, fontWeight: 700, color: '#2E3633' }}>{item.text}</div>
                            <div style={{ fontSize: 13, color: '#6b6b6b' }}>{item.sub}</div>
                        </div>
                    </div>
                ))}
                <div style={{ marginTop: 'auto', textAlign: 'center' }}>
                    <div style={{ fontSize: 13, color: '#6b6b6b44' }}>Only 38% of AI-cited pages overlap with the top-10</div>
                </div>
            </div>
        ),
    },
    {
        id: 'post3',
        postNumber: 3,
        title: 'Poll — AI search concerns',
        card: (
            <div id="card-post3" style={cardBase}>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#2E3633' }}>SEO in 2026</div>
                    <div style={{ fontSize: 14, color: '#6b6b6b', marginTop: 4 }}>What keeps you up at night?</div>
                </div>
                {[
                    { num: '1', text: 'AI Overviews stealing organic clicks', color: '#B5423F' },
                    { num: '2', text: 'Not knowing if AI engines cite me', color: '#B56B3F' },
                    { num: '3', text: 'Clients asking about "AI SEO"', color: '#4a7fb5' },
                    { num: '4', text: 'Still doing KW research the old way', color: '#6b6b6b' },
                ].map((item) => (
                    <div key={item.num} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14, width: '100%', padding: '12px 16px', backgroundColor: '#f0ede8', borderRadius: 8, border: `1px solid ${item.color}33` }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: item.color + '22', color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, flexShrink: 0 }}>
                            {item.num}
                        </div>
                        <div style={{ fontSize: 15, color: '#2E3633', fontWeight: 500 }}>{item.text}</div>
                    </div>
                ))}
            </div>
        ),
    },
    {
        id: 'post4',
        postNumber: 4,
        title: 'GEO Score — 14 rules breakdown',
        tall: true,
        card: (
            <div id="card-post4" style={tallCardBase}>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <div style={{ fontSize: 64, fontWeight: 900, color: '#B5423F', lineHeight: 1 }}>34</div>
                    <div style={{ fontSize: 14, color: '#6b6b6b', marginTop: 2 }}>out of 100</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#2E3633', marginTop: 8 }}>AI-Citation Readiness Score</div>
                </div>
                <div style={{ width: '100%', height: 8, backgroundColor: '#f0ede8', borderRadius: 4, marginBottom: 24, overflow: 'hidden' }}>
                    <div style={{ width: '34%', height: '100%', backgroundColor: '#f85149', borderRadius: 4 }} />
                </div>
                {[
                    { rule: 'FAQ / HowTo schema', pts: '0 / 15', fail: true },
                    { rule: 'Inverted pyramid lead', pts: '4 / 10', fail: true },
                    { rule: 'Definition pattern', pts: '0 / 10', fail: true },
                    { rule: 'Citation-worthy claims', pts: '4 / 8', fail: false },
                    { rule: 'Heading hierarchy', pts: '6 / 8', fail: false },
                    { rule: 'AI crawler access', pts: '6 / 6', fail: false },
                    { rule: 'Author attribution', pts: '0 / 8', fail: true },
                    { rule: 'Meta description', pts: '5 / 5', fail: false },
                ].map((r, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 8, padding: '6px 10px', backgroundColor: r.fail ? '#B5423F15' : '#3FB68E15', borderRadius: 6, border: `1px solid ${r.fail ? '#B5423F33' : '#3FB68E22'}` }}>
                        <div style={{ fontSize: 13, color: r.fail ? '#f85149' : '#3fb68e', fontWeight: 500 }}>{r.rule}</div>
                        <div style={{ fontSize: 13, color: r.fail ? '#f85149' : '#3fb68e', fontWeight: 700 }}>{r.pts}</div>
                    </div>
                ))}
                <div style={{ marginTop: 'auto', fontSize: 12, color: '#6b6b6b44', textAlign: 'center' }}>Ranked #3 on Google. Not cited in any AI answer.</div>
            </div>
        ),
    },
    {
        id: 'post5',
        postNumber: 5,
        title: 'Agent Readiness — /llms.txt',
        card: (
            <div id="card-post5" style={{ ...cardBase, justifyContent: 'center', minHeight: 400 }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#6b6b6b', letterSpacing: 2, textTransform: 'uppercase' as const, marginBottom: 32 }}>Quick test</div>
                    <div style={{ fontFamily: 'monospace', fontSize: 28, fontWeight: 800, color: '#2E3633', lineHeight: 1.3 }}>yoursite.com<span style={{ color: '#4a7fb5' }}>/llms.txt</span></div>
                    <div style={{ width: 60, height: 3, backgroundColor: '#B5423F', margin: '28px auto' }} />
                    <div style={{ fontSize: 36, fontWeight: 900, color: '#B5423F', marginBottom: 8 }}>Got a 404?</div>
                    <div style={{ fontSize: 16, color: '#6b6b6b', marginTop: 24 }}>Most sites do.</div>
                </div>
            </div>
        ),
    },
    {
        id: 'post6',
        postNumber: 6,
        title: '14 GEO Rules — full checklist',
        tall: true,
        card: (
            <div id="card-post7" style={tallCardBase}>
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#2E3633' }}>GEO Score: 14 Rules</div>
                    <div style={{ fontSize: 13, color: '#6b6b6b', marginTop: 4 }}>AI-Citation Readiness Checklist</div>
                </div>
                {[
                    { rule: 'FAQ / HowTo schema', pts: 15 },
                    { rule: 'Inverted pyramid lead', pts: 10 },
                    { rule: 'Definition / answer pattern', pts: 10 },
                    { rule: 'Citation-worthy claims', pts: 8 },
                    { rule: 'Article / Product schema', pts: 8 },
                    { rule: 'Author attribution', pts: 8 },
                    { rule: 'Heading hierarchy', pts: 8 },
                    { rule: 'AI crawler access', pts: 6 },
                    { rule: 'Meta description', pts: 5 },
                    { rule: 'Entity density', pts: 5 },
                    { rule: 'Date markup', pts: 5 },
                    { rule: 'No paywall / JS blockers', pts: 5 },
                    { rule: 'Content freshness', pts: 4 },
                    { rule: 'Canonical URL', pts: 3 },
                ].map((r, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 5, padding: '5px 10px', backgroundColor: '#f0ede8', borderRadius: 5 }}>
                        <div style={{ fontSize: 12, color: '#2E3633', fontWeight: 500 }}>{i + 1}. {r.rule}</div>
                        <div style={{ fontSize: 12, color: '#3FB68E', fontWeight: 700 }}>{r.pts} pts</div>
                    </div>
                ))}
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', width: '100%', paddingTop: 8 }}>
                    <div style={{ fontSize: 12, color: '#6b6b6b' }}>Total: 100 points</div>
                    <div style={{ fontSize: 12, color: '#B5423F' }}>Most sites: 25-45</div>
                </div>
            </div>
        ),
    },
    {
        id: 'post7',
        postNumber: 7,
        title: 'Earned Media — 84% stat',
        card: (
            <div id="card-post7" style={cardBase}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 96, fontWeight: 900, color: '#4a7fb5', lineHeight: 1 }}>84%</div>
                    <div style={{ fontSize: 18, color: '#2E3633', marginTop: 12, fontWeight: 600 }}>of AI-cited pages come from</div>
                    <div style={{ fontSize: 24, color: '#4a7fb5', fontWeight: 800, marginTop: 4 }}>earned media</div>
                    <div style={{ width: 60, height: 2, backgroundColor: '#4a7fb555', margin: '28px auto' }} />
                    <div style={{ fontSize: 15, color: '#6b6b6b', lineHeight: 1.7 }}>
                        Industry publications. Reviews.<br />
                        Reddit. YouTube. Wikipedia.<br /><br />
                        Not your own blog.
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: 'post8',
        postNumber: 8,
        title: 'KORU Pipeline — full flow',
        tall: true,
        card: (
            <div id="card-post8" style={tallCardBase}>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#2E3633' }}>The KORU Pipeline</div>
                    <div style={{ fontSize: 13, color: '#6b6b6b', marginTop: 2 }}>Classical SEO + AI Search. Connected.</div>
                </div>
                {[
                    { step: 'Site Audit', desc: 'Crawl + AI summary', color: '#3FB68E' },
                    { step: 'GEO Score', desc: '14 rules, per page', color: '#3FB68E' },
                    { step: 'AI Brand Visibility', desc: 'OpenAI + Gemini tracking', color: '#4a7fb5' },
                    { step: 'Keywords', desc: 'Intent classification + relevance gate', color: '#B56B3F' },
                    { step: 'Semantic Clustering', desc: 'By meaning, not word overlap', color: '#B56B3F' },
                    { step: 'Briefs + Drafts', desc: 'From top-5 Google results', color: '#a371f7' },
                    { step: 'Tasks', desc: '9 source types → action', color: '#a371f7' },
                    { step: 'Agent Readiness', desc: 'llms.txt, JSON-LD, Content-Signal', color: '#4a7fb5' },
                ].map((item, i) => (
                    <div key={i} style={{ width: '100%', marginBottom: 2 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', backgroundColor: '#f0ede8', borderRadius: 6, border: `1px solid ${item.color}22` }}>
                            <div style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: item.color + '22', color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 11, flexShrink: 0 }}>{i + 1}</div>
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: '#2E3633' }}>{item.step}</div>
                                <div style={{ fontSize: 11, color: '#6b6b6b' }}>{item.desc}</div>
                            </div>
                        </div>
                        {i < 7 && <div style={{ width: 2, height: 8, backgroundColor: item.color + '33', marginLeft: 22 }} />}
                    </div>
                ))}
            </div>
        ),
    },
    {
        id: 'post9',
        postNumber: 9,
        title: 'AI Brand Visibility — ChatGPT vs Gemini',
        card: (
            <div id="card-post9" style={cardBase}>
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#2E3633' }}>Is AI recommending your brand?</div>
                </div>
                <div style={{ width: '100%', marginBottom: 16, padding: '14px 16px', backgroundColor: '#f0ede8', borderRadius: 8, border: '1px solid #3FB68E55' }}>
                    <div style={{ fontSize: 12, color: '#6b6b6b', marginBottom: 6, fontWeight: 600 }}>ChatGPT: "Best SEO tool for freelancers?"</div>
                    {['1. Ahrefs', '2. Semrush', '3. Surfer SEO', '4. SE Ranking', '5. Mangools'].map((item, i) => (
                        <div key={i} style={{ fontSize: 13, color: '#2E3633', lineHeight: 1.6, paddingLeft: 8 }}>{item}</div>
                    ))}
                    <div style={{ fontSize: 13, color: '#B5423F', marginTop: 8, fontWeight: 600 }}>Your brand: not listed</div>
                </div>
                <div style={{ width: '100%', padding: '14px 16px', backgroundColor: '#f0ede8', borderRadius: 8, border: '1px solid #4a7fb555' }}>
                    <div style={{ fontSize: 12, color: '#6b6b6b', marginBottom: 6, fontWeight: 600 }}>Gemini: same question</div>
                    {['1. Semrush', '2. Ahrefs', '3. Moz', '4. Ubersuggest', '5. Surfer SEO'].map((item, i) => (
                        <div key={i} style={{ fontSize: 13, color: '#2E3633', lineHeight: 1.6, paddingLeft: 8 }}>{item}</div>
                    ))}
                    <div style={{ fontSize: 13, color: '#B5423F', marginTop: 8, fontWeight: 600 }}>Your brand: not listed</div>
                </div>
                <div style={{ marginTop: 20, fontSize: 14, color: '#B56B3F', fontWeight: 600, textAlign: 'center' }}>You can't fix what you can't see.</div>
            </div>
        ),
    },
    {
        id: 'post10',
        postNumber: 10,
        title: 'Meet KORU — reveal card',
        card: (
            <div id="card-post10" style={cardBase}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 42, fontWeight: 900, color: '#3FB68E', letterSpacing: 6, lineHeight: 1 }}>KORU</div>
                    <div style={{ fontSize: 15, color: '#2E3633', marginTop: 12, fontWeight: 500 }}>Rank in Google. Get cited by AI.</div>
                    <div style={{ width: 60, height: 2, backgroundColor: '#3FB68E55', margin: '20px auto' }} />
                    <div style={{ fontSize: 13, color: '#6b6b6b', lineHeight: 1.8, marginTop: 8 }}>
                        GEO Score — 14-rule AI-citation readiness<br />
                        AI Brand Visibility — OpenAI + Gemini tracking<br />
                        Agent Readiness — llms.txt, JSON-LD<br />
                        Intent-first keywords + briefs + tasks
                    </div>
                    <div style={{ marginTop: 24, padding: '10px 24px', backgroundColor: '#3fb68e', borderRadius: 8, display: 'inline-block' }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#fbfbf3' }}>GEO score starts free</div>
                    </div>
                    <div style={{ marginTop: 12, fontSize: 12, color: '#6b6b6b' }}>koru-seo.com</div>
                </div>
            </div>
        ),
    },
    {
        id: 'post11',
        postNumber: 11,
        title: '4 out of 50 — AI readiness data',
        card: (
            <div id="card-post11" style={cardBase}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 8 }}>
                        <div style={{ fontSize: 96, fontWeight: 900, color: '#B5423F', lineHeight: 1 }}>4</div>
                        <div style={{ fontSize: 32, fontWeight: 600, color: '#6b6b6b' }}>/</div>
                        <div style={{ fontSize: 96, fontWeight: 900, color: '#6b6b6b44', lineHeight: 1 }}>50</div>
                    </div>
                    <div style={{ fontSize: 16, color: '#2E3633', marginTop: 8, fontWeight: 600 }}>SEO agency sites ready for AI crawlers</div>
                    <div style={{ width: 60, height: 2, backgroundColor: '#B5423F44', margin: '20px auto' }} />
                    <div style={{ textAlign: 'left', maxWidth: 380, margin: '0 auto' }}>
                        {[
                            { check: 'llms.txt', result: '0 / 50', color: '#B5423F' },
                            { check: 'Markdown negotiation', result: '3 / 50', color: '#B5423F' },
                            { check: 'robots.txt AI directives', result: '8 / 50', color: '#B56B3F' },
                            { check: 'HTTP Link headers', result: '1 / 50', color: '#B5423F' },
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, lineHeight: 2.2, color: '#2E3633' }}>
                                <span>{item.check}</span>
                                <span style={{ color: item.color, fontWeight: 700 }}>{item.result}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: 'post12',
        postNumber: 12,
        title: 'Demo — product screenshot',
        card: (
            <div id="card-post12" style={cardBase}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 42, fontWeight: 900, color: '#3FB68E', letterSpacing: 6, lineHeight: 1 }}>KORU</div>
                    <div style={{ fontSize: 16, color: '#2E3633', marginTop: 16, fontWeight: 600 }}>30-second demo</div>
                    <div style={{ width: 60, height: 2, backgroundColor: '#3FB68E55', margin: '20px auto' }} />
                    <div style={{ textAlign: 'left', maxWidth: 380, margin: '0 auto' }}>
                        {[
                            'Paste URL',
                            'Audit + AI summary',
                            'GEO score — 14 rules',
                            'AI Brand check — OpenAI + Gemini',
                            'Keywords + intent + clusters',
                            'Brief + content draft',
                            'Every finding → task',
                        ].map((step, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#2E3633', lineHeight: 2.2 }}>
                                <div style={{ width: 22, height: 22, borderRadius: 6, backgroundColor: '#3FB68E22', color: '#3FB68E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 11, flexShrink: 0 }}>{i + 1}</div>
                                {step}
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: 20, padding: '8px 20px', backgroundColor: '#3FB68E22', borderRadius: 6, display: 'inline-block', border: '1px solid #3FB68E55' }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#3FB68E' }}>Attach demo GIF from task 060</div>
                    </div>
                </div>
            </div>
        ),
    },
]

function CardWrapper({ children, tall }: { children: React.ReactNode, tall?: boolean }) {
    const outerRef = React.useRef<HTMLDivElement>(null)
    const innerRef = React.useRef<HTMLDivElement>(null)
    const [scale, setScale] = React.useState(1)
    const origH = tall ? 750 : 600

    React.useEffect(() => {
        const el = outerRef.current
        if (!el) return
        const update = () => {
            const w = el.clientWidth
            setScale(w >= 600 ? 1 : w / 600)
        }
        update()
        const ro = new ResizeObserver(update)
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    return (
        <Box ref={outerRef} sx={{ width: '100%', maxWidth: 600, border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden', height: origH * scale }}>
            <div ref={innerRef} style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: 600 }}>
                {children}
            </div>
        </Box>
    )
}

export default function CreativesView() {
    return (
        <Box sx={{ flex: 1, overflow: 'auto', px: { xs: 1, md: 4 }, py: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
                Creatives
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem', mb: 3 }}>
                Готовые карточки для постов. Заскриншоть или скачай — и вставляй в LinkedIn.
            </Typography>

            <Box sx={sectionBox}>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, mb: 1 }}>Brand Colors</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {BRAND_COLORS.map(c => (
                        <Box key={c.hex} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, backgroundColor: c.hex, px: 1.5, py: 0.5, borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                            <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: c.text }}>{c.name}</Typography>
                            <Typography sx={{ fontSize: '0.65rem', color: c.text, opacity: 0.7 }}>{c.hex}</Typography>
                            <CopyHex hex={c.hex} />
                        </Box>
                    ))}
                </Box>
            </Box>

            {POST_VISUALS.map((pv) => (
                <Box key={pv.id} sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                        <Chip label={`Post ${pv.postNumber}`} size="small" sx={{ fontWeight: 700, fontSize: '0.75rem' }} />
                        <Typography sx={{ fontSize: '0.85rem', fontWeight: 600 }}>{pv.title}</Typography>
                        <Box sx={{ flex: 1 }} />
                        <IconButton
                            size="small"
                            onClick={() => downloadCard(`card-${pv.id}`, `post-${pv.postNumber}.png`)}
                            sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                            title="Download PNG"
                        >
                            <DownloadRoundedIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                    </Box>
                    <CardWrapper tall={pv.tall}>
                        {pv.card}
                    </CardWrapper>
                </Box>
            ))}

            <Box sx={{ ...sectionBox, backgroundColor: '#3fb68e0a', borderColor: '#3FB68E55' }}>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#3FB68E', mb: 0.5 }}>Как использовать</Typography>
                <Box component="ol" sx={{ m: 0, pl: 2.5 }}>
                    {[
                        'Скриншот карточки (Cmd+Shift+4 на Mac) — обрезать по рамке',
                        'Или нажми кнопку Download (нужен npm i html-to-image)',
                        'Вставить в LinkedIn пост как изображение',
                        'Без логотипа KORU до Week 4. После — добавить мелко в угол',
                    ].map((s, i) => (
                        <Typography component="li" key={i} sx={{ fontSize: '0.78rem', color: 'text.secondary', lineHeight: 1.8 }}>{s}</Typography>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}
