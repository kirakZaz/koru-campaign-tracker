import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Chip from '@mui/material/Chip'

type Lang = 'en' | 'ru'

const content = {
    en: {
        title: 'KORU — Team Cheat Sheet',
        subtitle: 'What we do, who we\'re for, how to talk about it. Keep it open.',
        whatIs: {
            heading: 'KORU in one sentence',
            text: 'One platform, several tools you run when you need them — not one button that does everything. Check any page\'s GEO score (how citable it is to AI engines), run a Citation Gap to see who ChatGPT, Gemini, Claude and Grok cite instead of you, check your AI reputation across those engines, run an agent readiness check, find keyword opportunities with intent classification, generate content briefs and drafts, and turn every finding into a task. Built for SEO in the age of AI search.'
        },
        whoFor: {
            heading: 'Who we\'re building for',
            segments: [
                { label: 'Freelancers (main target)', desc: 'Solo SEO consultants with 5-15 clients. They do everything. They pay for tools out of pocket. $300/mo for enterprise tools is a hard sell when you\'re billing $2-5K/month total.' },
                { label: 'Small agencies', desc: '3-15 people. Owner is drowning in spreadsheets. Needs repeatable process, branded reports for clients, and a task board that knows where each task came from.' },
                { label: 'In-house SEO', desc: 'One person doing SEO at a mid-size company. Boss wants results and a deck by Friday. No time for manual clustering.' }
            ]
        },
        problem: {
            heading: 'The pain (use these in conversations)',
            points: [
                '3-4 hours per client just on keyword research. 10 clients = a full work week every month. On research alone.',
                'You get 2,000 keywords from a tool. Now what? Open a spreadsheet, spend 3 hours grouping them by hand. Then open another app to write briefs. Then another for tasks.',
                'Three subscriptions that don\'t know about each other. $250/mo for data silos.',
                'You run an audit. 47 issues. What\'s the priority? Which ones actually matter? Export to CSV, figure it out yourself.',
                'The gap isn\'t data. Everyone has data. The gap is: what do I do with it? That step is still manual everywhere.',
                'Even after all that work — 48% of Google searches now show an AI Overview above the #1 organic result. Organic CTR drops 34.5% when AI Overview appears. Only 38% of AI-cited pages overlap with the traditional top-10. You can rank first and be invisible to the AI answer sitting above you. The question isn\'t just "where do I rank?" anymore. It\'s "am I even in the AI answer?"'
            ]
        },
        how: {
            heading: 'What happens when you paste a URL',
            steps: [
                { step: 'Site audit', desc: 'We crawl the pages, check titles, metas, headings, speed, mobile, Core Web Vitals. AI summarizes what matters and what to fix first.' },
                { step: 'GEO score', desc: 'Check any page\'s AI-citation readiness: 14 rules covering FAQ schema, inverted pyramid lead, citation-worthy claims, entity density, AI crawler access. Score 0-100 with evidence per rule.' },
                { step: 'Citation Gap', desc: 'Ask ChatGPT, Gemini, Claude and Grok your question — with live web search — and see who they cite instead of you, plus what those pages have that yours doesn\'t. Every gap converts to a task.' },
                { step: 'AI Reputation', desc: 'Which AI engines actually cite your brand? A per-engine radar across ChatGPT, Gemini, Claude and Grok — live web search, not training memory.' },
                { step: 'Keyword discovery', desc: 'AI reads your site content first, then pulls keywords with volume, difficulty, and intent. Relevance gate filters out off-topic noise. Semantic clustering by meaning, not word overlap.' },
                { step: 'Gap analysis', desc: 'Maps clusters to your pages. Shows what\'s covered, what\'s missing, where to write. Decision engine: OPTIMIZE, EXPAND, or CREATE.' },
                { step: 'Briefs & drafts', desc: 'Brief based on real top-5 Google results. Full content draft via Claude AI — a working draft for editing, not a published article.' },
                { step: 'Tasks', desc: 'Every finding becomes a task — from audit issues, keywords, backlinks, rank drops, Citation Gap and AI reputation findings. Assign, track, done. Finding → action, not just monitoring.' }
            ]
        },
        keyFeatures: {
            heading: 'Why us (honestly)',
            subtitle: 'We checked. Here\'s what\'s actually true.',
            features: [
                { name: 'Built for 2026 search', desc: 'GEO score measures how citable each page is to AI engines — 14 rules (FAQ schema, inverted pyramid, citation-worthy claims, entity density, AI crawler access). Citation Gap asks ChatGPT, Gemini, Claude and Grok your question and shows who they cite instead of you, and what to fix. AI Reputation is a per-engine radar for your brand. Agent Readiness checks if AI agents can discover your site (llms.txt, markdown negotiation, Content-Signal, JSON-LD). Few tools at this price combine per-page diagnosis with live AI-engine citation checks.' },
                { name: 'AI handles the analysis', desc: 'Intent classification, semantic clustering, relevance scoring, content briefs, content drafts — all through Claude AI. You skip the spreadsheet stage. Other tools give you data and say "figure it out." We give you a plan.' },
                { name: '$0 to start. $19 for the full keyword stack.', desc: 'GEO score, a taste of Citation Gap (3 questions) and one AI Reputation brand check start at $0. Full keyword stack, rank tracking, and content briefs from $19. Comparable capability elsewhere runs $300+/mo across multiple subscriptions. We built for freelancers, not enterprises.' }
            ]
        },
        alsoIncludes: {
            heading: 'What else is in there',
            items: [
                'Rank tracking — daily checks, history graphs, SERP features, desktop + mobile, by country',
                'AI Mode Rank Tracking — does Google AI Mode cite your domain for a tracked keyword? Per-keyword opt-in (PRO+)',
                'Competitor gaps — keywords they rank for and you don\'t',
                'Backlinks — new/lost links, domain authority, change timeline',
                'Content drafts — full article drafts generated from keyword + brief via Claude AI (working drafts for editing, not final copy)',
                'Google Search Console sync — real click data, impressions, CTR',
                'Agency kit — white-label PDFs, client portal, team seats',
                'Agent readiness — llms.txt check, markdown content negotiation, Content-Signal directives, JSON-LD coverage, HTTP Link headers',
                'Readability — on-demand check of how readable your pages are to an AI, with fixes that convert to tasks',
                'llms.txt generator — AI generates a spec-compliant llms.txt for your site so AI agents can discover it'
            ]
        },
        strength: {
            heading: 'What to say and what NOT to say',
            points: [
                'Don\'t say "best audit tool." Dedicated crawlers run 300+ checks. We run ~20 + AI analysis. That\'s fine — our users need clarity, not 300 checks.',
                'Do say "per-page AI-citation diagnosis + Citation Gap." The GEO market already exists (Profound, Goodie, Otterly) — never claim "nobody does this." Our angle: most tools tell you IF AI mentions you; we tell you WHY a page gets skipped, WHO gets cited instead, and what to fix. 14 rules, per page, with evidence.',
                'Do say "built for freelancers, not enterprises." That\'s not a weakness. That\'s a choice.',
                'Do say "$0 to start. $19 for the full keyword stack." That\'s real.',
                'Don\'t say "automatic GEO audit on every page." GEO Score is a separate check you run per page — not embedded in the base crawl.',
                'Don\'t say "one click — everything done." KORU is several separate tools in one platform, not a single automatic pipeline.',
                'Don\'t say "published articles" or "ready-to-publish." We generate content drafts — working material for editing, not final copy.',
                'We probe four engines — ChatGPT, Gemini, Claude and Grok. Don\'t claim we probe Perplexity (parked add-on, not live). Exception: Agent Readiness may name PerplexityBot — that\'s a crawler-access check on the customer\'s own server, not a probing claim.'
            ]
        },
        positioning: {
            heading: 'The pitch (memorize this)',
            statement: 'SEO freelancers optimize for Google rankings. But 48% of searches now show an AI answer first. GEO tools track whether AI mentions your brand — KORU goes further: it shows WHY a page gets cited or skipped (GEO score), WHO the engines cite instead of you (Citation Gap), and your standing across ChatGPT, Gemini, Claude and Grok (AI reputation). Plus intent-first keywords, briefs and drafts. Every finding becomes a task — finding to action, not just monitoring. Free to start. Full keyword stack from $19.',
            tagline: 'Rank in Google. Get cited by AI.',
            notSaying: [
                'Not a replacement for standalone data tools. Different thing. We connect the workflow and add an AI-search layer few tools combine at this price.',
                'Not the deepest audit on the market. The one that measures both Google readiness and AI-citation readiness.',
                'Not for Fortune 500. For the freelancer who needs to answer "am I visible in AI search?" and doesn\'t have $300/mo for it.',
                'GEO score is an on-demand check per page, not an automatic part of every crawl. Be honest about this.'
            ]
        },
        tone: {
            heading: 'How we sound',
            points: [
                'Like a smart colleague, not a brochure. "Here\'s what I found" not "Unlock the power of..."',
                'Numbers, always. "48% of searches show AI Overviews" hits harder than "AI is changing search."',
                'Industry words, not buzzwords. Say "GEO score," "intent classification," "citation-worthy claims." Never say "leverage" or "synergy."',
                'Ask questions in posts. "Do you know if AI engines cite your content?" gets more replies than "Our tool monitors AI."',
                'In comments: add something useful. A stat about AI Overviews. A question about their workflow. Never "Great post! Check out KORU."',
                'About competitors: be straight. "They have more data on classical SEO. We measure AI-citation readiness too — and they don\'t." People respect that.'
            ]
        },
    },
    ru: {
        title: 'KORU — Шпаргалка команды',
        subtitle: 'Что делаем, для кого, как об этом говорить. Держи открытой.',
        whatIs: {
            heading: 'KORU в одном предложении',
            text: 'Одна платформа, несколько отдельных инструментов — не «одна кнопка, которая делает всё». Проверить GEO score любой страницы (насколько она цитируема AI-движками), запустить Citation Gap и увидеть, кого ChatGPT, Gemini, Claude и Grok цитируют вместо тебя, проверить AI reputation по этим движкам, запустить agent readiness, найти ключевые слова с классификацией по intent, сгенерировать брифы и черновики контента, и превратить каждую находку в задачу. Для SEO в эпоху AI-поиска.'
        },
        whoFor: {
            heading: 'Для кого строим',
            segments: [
                { label: 'Фрилансеры (главная аудитория)', desc: 'SEO-консультант на 5-15 клиентов. Делает всё сам. Платит за инструменты из своего кармана. $300/мес за enterprise-инструмент — больно, когда зарабатываешь $2-5K.' },
                { label: 'Маленькие агентства', desc: '3-15 человек. Основатель тонет в таблицах. Нужен повторяемый процесс, брендированные отчёты и task board, который помнит откуда задача взялась.' },
                { label: 'In-house SEO', desc: 'Один человек делает SEO в компании. Босс хочет результат и презентацию к пятнице. Времени на ручную кластеризацию нет.' }
            ]
        },
        problem: {
            heading: 'Боль (используй в разговорах)',
            points: [
                '3-4 часа на клиента только на keyword research. 10 клиентов = полная рабочая неделя каждый месяц. Только на исследование.',
                'Получаешь 2,000 ключевиков. И что дальше? Открываешь таблицу, 3 часа группируешь руками. Потом в другой программе пишешь бриефы. Потом в третьей ведёшь задачи.',
                'Три подписки, которые друг о друге не знают. $250/мес за разрозненные данные.',
                'Запустил аудит. 47 проблем. Что из этого важно? Какой приоритет? Экспортируй в CSV, разбирайся сам.',
                'Проблема не в данных. Данные есть у всех. Проблема: что с ними делать? Этот шаг везде ручной.',
                'И даже после всей этой работы — 48% поисков в Google теперь показывают AI Overview над первым органическим результатом. CTR первого результата падает на 34.5% когда появляется AI Overview. Только 38% страниц, которые цитирует AI, совпадают с классическим топ-10. Можно быть первым и быть невидимым для ответа, который висит над тобой. Вопрос уже не «где я в выдаче», а «я вообще в AI-ответе?»'
            ]
        },
        how: {
            heading: 'Что происходит, когда вставляешь URL',
            steps: [
                { step: 'Аудит сайта', desc: 'Проходим по страницам — заголовки, мета, скорость, мобилка, Core Web Vitals. AI резюмирует что важно и что чинить первым.' },
                { step: 'GEO score', desc: 'Проверка AI-цитируемости любой страницы: 14 правил — FAQ schema, inverted pyramid lead, citation-worthy claims, entity density, AI crawler access. Оценка 0-100 с evidence по каждому правилу.' },
                { step: 'Citation Gap', desc: 'Задай свой вопрос ChatGPT, Gemini, Claude и Grok — с живым веб-поиском — и увидь, кого они цитируют вместо тебя и что у тех страниц есть, чего нет у твоей. Каждый пробел → задача.' },
                { step: 'AI Reputation', desc: 'Какие AI-движки реально цитируют твой бренд? Радар по движкам — ChatGPT, Gemini, Claude и Grok — живой веб-поиск, а не память модели.' },
                { step: 'Поиск keywords', desc: 'AI сначала читает контент сайта, потом тянет ключевики с объёмом, сложностью и intent. Relevance gate фильтрует мусор. Семантическая кластеризация по смыслу, не по совпадению слов.' },
                { step: 'Анализ пробелов', desc: 'Сопоставляем кластеры со страницами. Видно что покрыто, что нет, где нужен контент. Decision engine: OPTIMIZE, EXPAND или CREATE.' },
                { step: 'Бриефы и драфты', desc: 'Бриф на основе реальных топ-5 Google. Полный черновик статьи через Claude AI — рабочий драфт для редактуры, не финальная публикация.' },
                { step: 'Задачи', desc: 'Каждая находка = задача — из аудита, ключевиков, бэклинков, rank drops, находок Citation Gap и AI reputation. Назначил, трекаешь, закрыл. От находки к действию, не просто мониторинг.' }
            ]
        },
        keyFeatures: {
            heading: 'Почему мы (честно)',
            subtitle: 'Мы проверили. Вот что правда.',
            features: [
                { name: 'Построено для поиска 2026', desc: 'GEO score измеряет цитируемость каждой страницы AI-движками — 14 правил (FAQ schema, inverted pyramid, citation-worthy claims, entity density, AI crawler access). Citation Gap задаёт твой вопрос ChatGPT, Gemini, Claude и Grok и показывает, кого они цитируют вместо тебя и что чинить. AI Reputation — радар по движкам для твоего бренда. Agent Readiness проверяет, могут ли AI-агенты найти твой сайт (llms.txt, markdown negotiation, Content-Signal, JSON-LD). Мало кто в этой цене совмещает per-page диагностику с живой проверкой цитирования в AI-движках.' },
                { name: 'AI берёт анализ на себя', desc: 'Классификация intent, семантическая кластеризация, оценка релевантности, контент-бриефы, черновики контента — всё через Claude AI. Этап с таблицей пропускается. Другие дают данные и говорят «разбирайся.» Мы даём план.' },
                { name: '$0 на старте. $19 за полный keyword stack.', desc: 'GEO score, дегустация Citation Gap (3 вопроса) и одна проверка бренда AI Reputation — с $0. Полный keyword stack, rank tracking и контент-бриефы — от $19. Сопоставимые возможности в других местах — от $300/мес через несколько подписок. Мы строили для фрилансеров, не для корпораций.' }
            ]
        },
        alsoIncludes: {
            heading: 'Что ещё внутри',
            items: [
                'Позиции в поиске — ежедневные проверки, графики истории, SERP-фичи, десктоп + мобайл, по странам',
                'AI Mode Rank Tracking — цитирует ли Google AI Mode твой домен по отслеживаемому запросу? Per-keyword opt-in (PRO+)',
                'Анализ конкурентов — по каким словам они в топе, а ты нет',
                'Бэклинки — новые/потерянные ссылки, авторитет домена, таймлайн изменений',
                'Черновики контента — полные черновики статей через Claude AI из ключевика + бриф (рабочие драфты для редактуры, не финальный контент)',
                'Google Search Console — реальные данные по кликам, показам, CTR',
                'Для агентств — white-label PDF, портал для клиентов, командные роли',
                'Agent readiness — проверка llms.txt, markdown content negotiation, Content-Signal directives, JSON-LD coverage, HTTP Link headers',
                'Readability — проверка по запросу, насколько твои страницы читаемы для AI, с фиксами в задачи',
                'Генератор llms.txt — AI создаёт spec-compliant llms.txt для твоего сайта, чтобы AI-агенты могли его обнаружить'
            ]
        },
        strength: {
            heading: 'Что говорить, а что нет',
            points: [
                'Не говори «лучший аудит.» Узкоспециализированные краулеры проверяют 300+ правил. Мы — ~20 + AI-анализ. И это нормально — нашим юзерам нужна ясность, не 300 проверок.',
                'Говори «per-page диагностика AI-цитируемости + Citation Gap.» Рынок GEO уже есть (Profound, Goodie, Otterly) — никогда не говори «никто этого не делает». Наш угол: другие говорят ЕСТЬ ли ты в AI-ответе; мы говорим ПОЧЕМУ страницу пропустили, КОГО цитируют вместо тебя и что чинить. 14 правил, per page, с evidence.',
                'Говори «сделано для фрилансеров, не для корпораций.» Это не слабость. Это выбор.',
                'Говори «$0 на старте. $19 за полный keyword stack.» Это факт.',
                'Не говори «автоматический GEO-аудит каждой страницы.» GEO Score — отдельная проверка per page, не встроена в базовый crawl.',
                'Не говори «в один клик — всё готово.» KORU — это несколько отдельных инструментов в одной платформе, не единый автоматический пайплайн.',
                'Не говори «готовые статьи» или «ready-to-publish.» Мы генерируем контент-драфты — рабочий материал для редактуры, не финальный контент.',
                'Мы пробим четыре движка — ChatGPT, Gemini, Claude и Grok. Не заявляй, что пробим Perplexity (припаркованный add-on, не активен). Исключение: Agent Readiness может называть PerplexityBot — это проверка доступа краулера к серверу клиента, а не заявление о пробинге.'
            ]
        },
        positioning: {
            heading: 'Питч (запомни)',
            statement: 'SEO-фрилансеры оптимизируют для позиций в Google. Но 48% поисков теперь показывают AI-ответ первым. GEO-инструменты следят, упоминает ли AI твой бренд — KORU идёт дальше: показывает ПОЧЕМУ страницу цитируют или пропускают (GEO score), КОГО движки цитируют вместо тебя (Citation Gap) и твоё положение по ChatGPT, Gemini, Claude и Grok (AI reputation). Плюс intent-first ключевики, бриефы и драфты. Каждая находка → задача, от находки к действию, а не просто мониторинг. Бесплатно на старте. Полный keyword stack от $19.',
            tagline: 'Rank in Google. Get cited by AI.',
            notSaying: [
                'Не замена для data-инструментов. Другая задача. Мы связываем workflow и добавляем AI-search слой, который мало кто совмещает за эту цену.',
                'Не самый глубокий аудит. Тот, который измеряет и Google-готовность, и AI-цитируемость.',
                'Не для Fortune 500. Для фрилансера, которому нужно ответить «видим ли я в AI-поиске?» и у которого нет $300/мес на это.',
                'GEO score — это проверка per page по запросу, не автоматическая часть каждого crawl. Будь честен.'
            ]
        },
        tone: {
            heading: 'Как мы звучим',
            points: [
                'Как умный коллега, а не рекламный буклет. «Вот что я нашёл» — не «Раскройте потенциал...»',
                'Цифры — всегда. «48% поисков показывают AI Overview» бьёт сильнее, чем «AI меняет поиск.»',
                'Слова из индустрии, не из маркетинга. «GEO score,» «intent classification,» «citation-worthy claims.» Никогда «синергия.»',
                'В постах задавай вопросы. «Знаете ли вы, цитирует ли AI ваш контент?» цепляет больше, чем «Наш инструмент мониторит AI.»',
                'В комментариях — дай что-то полезное. Факт про AI Overviews. Вопрос про их workflow. Никогда «Классный пост! Попробуй KORU.»',
                'Про конкурентов — прямо. «У них больше данных по классическому SEO. Мы ещё измеряем AI-цитируемость — а они нет.» Люди это уважают.'
            ]
        },
    }
}

const sectionBox = {
    mb: 3,
    p: 2.5,
    borderRadius: 2,
    backgroundColor: '#ffffff05',
    border: '1px solid',
    borderColor: 'divider',
    position: 'relative' as const
}

const sectionHeading = {
    fontWeight: 700,
    fontSize: '1rem',
    color: 'primary.main',
    mb: 1.5
}

const bulletItem = {
    fontSize: '0.9rem',
    color: 'text.secondary',
    lineHeight: 1.7,
    pl: 2,
    position: 'relative' as const,
    '&::before': {
        content: '"—"',
        position: 'absolute',
        left: 0
    }
}

type SectionKey = 'whatIs' | 'whoFor' | 'problem' | 'how' | 'keyFeatures' | 'alsoIncludes' | 'strength' | 'positioning' | 'tone'

function serializeSection(key: SectionKey, langContent: typeof content['en']): string {
    const s = langContent[key]
    if ('text' in s) return s.text
    if ('segments' in s) return s.segments.map((seg) => `${seg.label}\n${seg.desc}`).join('\n\n')
    if ('steps' in s) return s.steps.map((st, i) => `${i + 1}. ${st.step} — ${st.desc}`).join('\n')
    if ('features' in s) return (s.subtitle ? s.subtitle + '\n\n' : '') + s.features.map((f) => `${f.name}\n${f.desc}`).join('\n\n')
    if ('statement' in s) return `${s.statement}\n\n${s.tagline}\n\n${s.notSaying.join('\n')}`
    if ('items' in s) return s.items.join('\n')
    if ('points' in s) return s.points.join('\n')
    return ''
}

function RenderOverrideText({ text }: { text: string }) {
    return (
        <>
            {text.split('\n').map((line, i) => (
                <Typography key={i} sx={{ fontSize: '0.9rem', color: line.trim() === '' ? undefined : 'text.secondary', lineHeight: 1.7, minHeight: line.trim() === '' ? '0.5em' : undefined }}>
                    {line || '\u00A0'}
                </Typography>
            ))}
        </>
    )
}

interface Props {
    overrides: Record<string, { en: string, ru: string }>
    onSaveSection: (key: string, value: { en: string, ru: string }) => void
}

function EditableSection({ sectionKey, heading, lang, overrides, onSave, highlight, children }: {
    sectionKey: SectionKey
    heading: string
    lang: Lang
    overrides: Record<string, { en: string, ru: string }>
    onSave: (key: string, value: { en: string, ru: string }) => void
    highlight?: boolean
    children: (overrideText: string | null) => React.ReactNode
}) {
    const [editing, setEditing] = React.useState(false)
    const [draft, setDraft] = React.useState('')
    const override = overrides[sectionKey]
    const overrideText = override?.[lang] ?? null

    const handleEdit = () => {
        const defaultContent = serializeSection(sectionKey, content[lang])
        setDraft(overrideText ?? defaultContent)
        setEditing(true)
    }

    const handleSave = () => {
        const other = lang === 'en' ? 'ru' : 'en'
        const otherVal = override?.[other] ?? ''
        onSave(sectionKey, { ...override, [lang]: draft, [other]: otherVal } as { en: string, ru: string })
        setEditing(false)
    }

    const handleReset = () => {
        const other = lang === 'en' ? 'ru' : 'en'
        const otherVal = override?.[other] ?? ''
        onSave(sectionKey, { [lang]: '', [other]: otherVal } as { en: string, ru: string })
        setEditing(false)
    }

    return (
        <Box sx={{ ...sectionBox, ...(highlight ? { borderColor: 'primary.main', backgroundColor: '#3fb68e08' } : {}) }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                <Typography sx={{ ...sectionHeading, mb: 0 }}>{heading}</Typography>
                {!editing && (
                    <Typography
                        onClick={handleEdit}
                        sx={{ fontSize: '0.7rem', color: 'text.secondary', cursor: 'pointer', opacity: 0.5, '&:hover': { opacity: 1, color: 'primary.main' }, flexShrink: 0, mt: 0.3 }}
                    >
                        edit
                    </Typography>
                )}
            </Box>
            {editing ? (
                <Box>
                    <textarea
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        style={{
                            width: '100%',
                            minHeight: 200,
                            background: '#0d1117',
                            color: '#c9d1d9',
                            border: '1px solid #30363d',
                            borderRadius: 8,
                            padding: 12,
                            fontSize: '0.85rem',
                            lineHeight: 1.7,
                            fontFamily: 'inherit',
                            resize: 'vertical',
                            outline: 'none'
                        }}
                    />
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        <Typography
                            onClick={handleSave}
                            sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'primary.main', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                        >
                            Save
                        </Typography>
                        <Typography
                            onClick={() => setEditing(false)}
                            sx={{ fontSize: '0.75rem', color: 'text.secondary', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                        >
                            Cancel
                        </Typography>
                        {overrideText && (
                            <Typography
                                onClick={handleReset}
                                sx={{ fontSize: '0.75rem', color: 'error.main', cursor: 'pointer', opacity: 0.7, '&:hover': { textDecoration: 'underline', opacity: 1 } }}
                            >
                                Reset to default
                            </Typography>
                        )}
                    </Box>
                </Box>
            ) : (
                overrideText ? <RenderOverrideText text={overrideText} /> : children(null)
            )}
        </Box>
    )
}

export default function OverviewView({ overrides, onSaveSection }: Props) {
    const [lang, setLang] = React.useState<Lang>('ru')
    const c = content[lang]

    return (
        <Box sx={{ flex: 1, overflow: 'auto', px: { xs: 2, md: 4 }, py: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 1 }}>
                <Box>
                    <Typography sx={{ fontWeight: 800, fontSize: { xs: '1.5rem', md: '1.75rem' }, color: 'text.primary', mb: 0.5 }}>
                        {c.title}
                    </Typography>
                    <Typography sx={{ fontSize: '0.9rem', color: 'text.secondary' }}>
                        {c.subtitle}
                    </Typography>
                </Box>
                <ToggleButtonGroup
                    value={lang}
                    exclusive
                    onChange={(_, v) => v && setLang(v as Lang)}
                    size="small"
                    sx={{ '& .MuiToggleButton-root': { px: 1.5, py: 0.5, fontSize: '0.75rem', fontWeight: 700 } }}
                >
                    <ToggleButton value="ru">RU</ToggleButton>
                    <ToggleButton value="en">EN</ToggleButton>
                </ToggleButtonGroup>
            </Box>

            <EditableSection sectionKey="whatIs" heading={c.whatIs.heading} lang={lang} overrides={overrides} onSave={onSaveSection}>
                {() => (
                    <Typography sx={{ fontSize: '1rem', color: 'text.primary', lineHeight: 1.7, fontWeight: 500 }}>
                        {c.whatIs.text}
                    </Typography>
                )}
            </EditableSection>

            <EditableSection sectionKey="whoFor" heading={c.whoFor.heading} lang={lang} overrides={overrides} onSave={onSaveSection}>
                {() => (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {c.whoFor.segments.map((seg) => (
                            <Box key={seg.label}>
                                <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: 'text.primary' }}>{seg.label}</Typography>
                                <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary', lineHeight: 1.6 }}>{seg.desc}</Typography>
                            </Box>
                        ))}
                    </Box>
                )}
            </EditableSection>

            <EditableSection sectionKey="problem" heading={c.problem.heading} lang={lang} overrides={overrides} onSave={onSaveSection}>
                {() => <>{c.problem.points.map((p, i) => <Typography key={i} sx={bulletItem}>{p}</Typography>)}</>}
            </EditableSection>

            <EditableSection sectionKey="how" heading={c.how.heading} lang={lang} overrides={overrides} onSave={onSaveSection}>
                {() => (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {c.how.steps.map((s, i) => (
                            <Box key={i} sx={{ display: 'flex', gap: 1.5, alignItems: 'baseline' }}>
                                <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, color: 'primary.main', minWidth: 20, textAlign: 'right' }}>{i + 1}.</Typography>
                                <Box>
                                    <Typography component="span" sx={{ fontSize: '0.9rem', fontWeight: 700, color: 'text.primary' }}>{s.step}</Typography>
                                    <Typography component="span" sx={{ fontSize: '0.9rem', color: 'text.secondary' }}>{' — '}{s.desc}</Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                )}
            </EditableSection>

            <EditableSection sectionKey="keyFeatures" heading={c.keyFeatures.heading} lang={lang} overrides={overrides} onSave={onSaveSection} highlight>
                {() => (
                    <>
                        <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 2, fontStyle: 'italic' }}>{c.keyFeatures.subtitle}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {c.keyFeatures.features.map((f, i) => (
                                <Box key={i}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                        <Chip label={i + 1} size="small" color="primary" sx={{ fontWeight: 800, height: 22, minWidth: 22 }} />
                                        <Typography sx={{ fontSize: '0.95rem', fontWeight: 700, color: 'text.primary' }}>{f.name}</Typography>
                                    </Box>
                                    <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary', lineHeight: 1.7, pl: 4.5 }}>{f.desc}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </>
                )}
            </EditableSection>

            <EditableSection sectionKey="alsoIncludes" heading={c.alsoIncludes.heading} lang={lang} overrides={overrides} onSave={onSaveSection}>
                {() => <>{c.alsoIncludes.items.map((item, i) => <Typography key={i} sx={bulletItem}>{item}</Typography>)}</>}
            </EditableSection>

            <EditableSection sectionKey="strength" heading={c.strength.heading} lang={lang} overrides={overrides} onSave={onSaveSection}>
                {() => <>{c.strength.points.map((p, i) => <Typography key={i} sx={bulletItem}>{p}</Typography>)}</>}
            </EditableSection>

            <EditableSection sectionKey="positioning" heading={c.positioning.heading} lang={lang} overrides={overrides} onSave={onSaveSection} highlight>
                {() => (
                    <>
                        <Typography sx={{ fontSize: '0.95rem', color: 'text.primary', lineHeight: 1.7, mb: 2, fontStyle: 'italic' }}>&ldquo;{c.positioning.statement}&rdquo;</Typography>
                        <Typography sx={{ fontSize: '1.1rem', fontWeight: 800, color: 'primary.main', mb: 2 }}>{c.positioning.tagline}</Typography>
                        <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: 'text.secondary', mb: 1, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            {lang === 'ru' ? 'Чего мы НЕ говорим' : 'What we\'re NOT saying'}
                        </Typography>
                        {c.positioning.notSaying.map((p, i) => <Typography key={i} sx={{ ...bulletItem, fontSize: '0.85rem' }}>{p}</Typography>)}
                    </>
                )}
            </EditableSection>

            <EditableSection sectionKey="tone" heading={c.tone.heading} lang={lang} overrides={overrides} onSave={onSaveSection}>
                {() => <>{c.tone.points.map((p, i) => <Typography key={i} sx={bulletItem}>{p}</Typography>)}</>}
            </EditableSection>
        </Box>
    )
}
