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
    { name: 'Background', hex: '#0d1117', text: 'white' },
    { name: 'Surface', hex: '#161b22', text: 'white' },
    { name: 'Accent', hex: '#3fb68e', text: 'black' },
    { name: 'Blue', hex: '#6c8eff', text: 'black' },
    { name: 'Yellow', hex: '#d29922', text: 'black' },
    { name: 'Red', hex: '#f85149', text: 'black' },
    { name: 'Text', hex: '#e6edf3', text: 'black' },
    { name: 'Muted', hex: '#8b949e', text: 'black' },
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
const cardBase: React.CSSProperties = {
    width: 600,
    height: 600,
    backgroundColor: '#1c2333',
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
                    <div style={{ fontSize: 96, fontWeight: 900, color: '#3fb68e', lineHeight: 1 }}>8h</div>
                    <div style={{ fontSize: 18, color: '#8b949e', marginTop: 8, fontWeight: 500 }}>per client, per month</div>
                    <div style={{ fontSize: 16, color: '#8b949e', marginTop: 2 }}>keyword research + content creation</div>
                    <div style={{ width: 60, height: 2, backgroundColor: '#3fb68e33', margin: '24px auto' }} />
                    <div style={{ fontSize: 72, fontWeight: 900, color: '#f85149', lineHeight: 1, marginTop: 8 }}>48%</div>
                    <div style={{ fontSize: 18, color: '#8b949e', marginTop: 8, fontWeight: 500 }}>of Google searches now show</div>
                    <div style={{ fontSize: 18, color: '#e6edf3', fontWeight: 700 }}>an AI answer above your #1 result</div>
                    <div style={{ fontSize: 14, color: '#8b949e44', marginTop: 32 }}>Are you optimizing for a click that's disappearing?</div>
                </div>
            </div>
        ),
    },
    {
        id: 'post2',
        postNumber: 2,
        title: 'Checklist — AI-citation readiness',
        card: (
            <div id="card-post2" style={tallCardBase}>
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#e6edf3' }}>Is your page citable by AI?</div>
                    <div style={{ fontSize: 14, color: '#8b949e', marginTop: 4 }}>6 signals AI engines look for</div>
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
                            <div style={{ fontSize: 16, fontWeight: 700, color: '#e6edf3' }}>{item.text}</div>
                            <div style={{ fontSize: 13, color: '#8b949e' }}>{item.sub}</div>
                        </div>
                    </div>
                ))}
                <div style={{ marginTop: 'auto', textAlign: 'center' }}>
                    <div style={{ fontSize: 13, color: '#8b949e44' }}>Only 38% of AI-cited pages overlap with the top-10</div>
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
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#e6edf3' }}>SEO in 2026</div>
                    <div style={{ fontSize: 14, color: '#8b949e', marginTop: 4 }}>What keeps you up at night?</div>
                </div>
                {[
                    { num: '1', text: 'AI Overviews stealing organic clicks', color: '#f85149' },
                    { num: '2', text: 'Not knowing if AI engines cite me', color: '#d29922' },
                    { num: '3', text: 'Clients asking about "AI SEO"', color: '#6c8eff' },
                    { num: '4', text: 'Still doing KW research the old way', color: '#8b949e' },
                ].map((item) => (
                    <div key={item.num} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14, width: '100%', padding: '12px 16px', backgroundColor: '#161b22', borderRadius: 8, border: `1px solid ${item.color}33` }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: item.color + '22', color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, flexShrink: 0 }}>
                            {item.num}
                        </div>
                        <div style={{ fontSize: 15, color: '#e6edf3', fontWeight: 500 }}>{item.text}</div>
                    </div>
                ))}
            </div>
        ),
    },
    {
        id: 'post4',
        postNumber: 4,
        title: 'GEO Score — 14 rules breakdown',
        card: (
            <div id="card-post4" style={tallCardBase}>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <div style={{ fontSize: 64, fontWeight: 900, color: '#f85149', lineHeight: 1 }}>34</div>
                    <div style={{ fontSize: 14, color: '#8b949e', marginTop: 2 }}>out of 100</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#e6edf3', marginTop: 8 }}>AI-Citation Readiness Score</div>
                </div>
                <div style={{ width: '100%', height: 8, backgroundColor: '#161b22', borderRadius: 4, marginBottom: 24, overflow: 'hidden' }}>
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
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 8, padding: '6px 10px', backgroundColor: r.fail ? '#f8514909' : '#3fb68e09', borderRadius: 6, border: `1px solid ${r.fail ? '#f8514922' : '#3fb68e22'}` }}>
                        <div style={{ fontSize: 13, color: r.fail ? '#f85149' : '#3fb68e', fontWeight: 500 }}>{r.rule}</div>
                        <div style={{ fontSize: 13, color: r.fail ? '#f85149' : '#3fb68e', fontWeight: 700 }}>{r.pts}</div>
                    </div>
                ))}
                <div style={{ marginTop: 'auto', fontSize: 12, color: '#8b949e44', textAlign: 'center' }}>Ranked #3 on Google. Not cited in any AI answer.</div>
            </div>
        ),
    },
    {
        id: 'post5',
        postNumber: 5,
        title: 'Agent Readiness — 4 checks',
        card: (
            <div id="card-post5" style={cardBase}>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: '#e6edf3' }}>Is your site agent-ready?</div>
                    <div style={{ fontSize: 14, color: '#8b949e', marginTop: 4 }}>4 things AI agents look for in 2026</div>
                </div>
                {[
                    { label: '/llms.txt', desc: 'Structured site summary for AI crawlers', icon: '1' },
                    { label: 'text/markdown', desc: 'Can your server respond with clean markdown?', icon: '2' },
                    { label: 'Content-Signal', desc: 'robots.txt: explicit AI permission', icon: '3' },
                    { label: 'JSON-LD', desc: 'Structured data for page understanding', icon: '4' },
                ].map((item) => (
                    <div key={item.icon} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 18, width: '100%' }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#6c8eff22', color: '#6c8eff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, flexShrink: 0 }}>
                            {item.icon}
                        </div>
                        <div>
                            <div style={{ fontSize: 16, fontWeight: 700, color: '#e6edf3', fontFamily: 'monospace' }}>{item.label}</div>
                            <div style={{ fontSize: 13, color: '#8b949e' }}>{item.desc}</div>
                        </div>
                    </div>
                ))}
                <div style={{ marginTop: 24, padding: '10px 16px', backgroundColor: '#f8514911', borderRadius: 8, border: '1px solid #f8514922', textAlign: 'center', width: '100%' }}>
                    <div style={{ fontSize: 14, color: '#f85149', fontWeight: 600 }}>Most sites fail all four.</div>
                </div>
            </div>
        ),
    },
    {
        id: 'post6',
        postNumber: 6,
        title: 'Earned Media — 84% stat',
        card: (
            <div id="card-post6" style={cardBase}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 96, fontWeight: 900, color: '#6c8eff', lineHeight: 1 }}>84%</div>
                    <div style={{ fontSize: 18, color: '#e6edf3', marginTop: 12, fontWeight: 600 }}>of AI-cited pages come from</div>
                    <div style={{ fontSize: 24, color: '#6c8eff', fontWeight: 800, marginTop: 4 }}>earned media</div>
                    <div style={{ width: 60, height: 2, backgroundColor: '#6c8eff33', margin: '28px auto' }} />
                    <div style={{ fontSize: 15, color: '#8b949e', lineHeight: 1.7 }}>
                        Industry publications. Reviews.<br />
                        Reddit. YouTube. Wikipedia.<br /><br />
                        Not your own blog.
                    </div>
                </div>
            </div>
        ),
    },
]

export default function CreativesView() {
    return (
        <Box sx={{ flex: 1, overflow: 'auto', px: { xs: 2, md: 4 }, py: 3 }}>
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
                    <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, display: 'inline-block', overflow: 'hidden' }}>
                        {pv.card}
                    </Box>
                </Box>
            ))}

            <Box sx={{ ...sectionBox, backgroundColor: '#3fb68e0a', borderColor: '#3fb68e33' }}>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#3fb68e', mb: 0.5 }}>Как использовать</Typography>
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
