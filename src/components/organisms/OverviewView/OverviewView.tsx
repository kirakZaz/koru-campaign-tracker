import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

type Lang = 'en' | 'ru'

const content = {
    en: {
        title: 'KORU — Positioning & Messaging',
        subtitle: 'Quick reference for the entire team',
        whatIs: {
            heading: 'What is KORU?',
            text: 'KORU is an SEO platform that turns a URL into a complete keyword strategy in 5 minutes — instead of the 3-4 hours it takes today with manual tools.'
        },
        whoFor: {
            heading: 'Who is it for?',
            segments: [
                { label: 'Segment A (Primary)', desc: 'Freelance SEO consultants managing 5-15 clients. Time is money — they do everything themselves.' },
                { label: 'Segment B', desc: 'Small SEO agencies (3-15 people). Need scalable processes, not more spreadsheets.' },
                { label: 'Segment C', desc: 'In-house SEO managers at mid-size companies. Need to prove ROI and move fast.' }
            ]
        },
        problem: {
            heading: 'The Problem We Solve',
            points: [
                'Keyword research takes 3-4 hours per client — 40 hours/month for someone with 10 clients',
                'Tools give raw data (keyword lists), not strategy (clusters, gaps, briefs)',
                'Workflow is fragmented: Ahrefs + Spreadsheet + Google Docs + Asana — nothing connects',
                'The process hasn\'t changed in 10 years despite tools getting more powerful'
            ]
        },
        how: {
            heading: 'How KORU Solves It',
            steps: [
                { step: 'Paste a URL', desc: 'Start with any website' },
                { step: 'Auto-crawl & extract', desc: 'KORU crawls the site and identifies seed keywords' },
                { step: 'Expand & classify', desc: 'Hundreds of related keywords, classified by search intent' },
                { step: 'Cluster by topic', desc: 'Keywords grouped into logical topic clusters — not a flat list' },
                { step: 'Map to pages', desc: 'Each cluster mapped to existing site pages' },
                { step: 'Identify gaps', desc: 'Missing content opportunities highlighted' },
                { step: 'Generate briefs', desc: 'One-click content briefs for each gap' },
                { step: 'Create tasks', desc: 'Actionable tasks for the team, ready to execute' }
            ]
        },
        strength: {
            heading: 'Our Key Strengths',
            points: [
                'Full pipeline in one tool — from URL to action plan, no switching between apps',
                'Strategy, not data — we give clustered, mapped, prioritized plans, not keyword dumps',
                'Speed — 5 minutes vs 3-4 hours. That\'s 40 hours/month back for a 10-client freelancer',
                'Built by practitioners — we talked to 30+ SEO professionals before writing a line of code'
            ]
        },
        positioning: {
            heading: 'Core Positioning',
            statement: 'KORU is for SEO freelancers and small agencies who spend hours on manual keyword research. Unlike Ahrefs/Semrush which give you data, KORU gives you a ready-made strategy.',
            tagline: 'From URL to keyword strategy in 5 minutes.',
            notSaying: [
                'We are NOT an Ahrefs/Semrush replacement — we complement them',
                'We do NOT promise magic — we automate the manual part of the workflow',
                'We do NOT target enterprise (yet) — focus is freelancers and small agencies'
            ]
        },
        tone: {
            heading: 'Tone of Voice',
            points: [
                'Confident but not arrogant — we know the problem, we built a solution',
                'Data-driven — use numbers: "3-4 hours", "40 hours/month", "$250/month on tools"',
                'Practitioner language — "clusters", "briefs", "audit", not marketing fluff',
                'Curious & engaging — ask questions in posts, invite conversation',
                'Never pitch in comments — add value, share data points, ask sharp questions'
            ]
        }
    },
    ru: {
        title: 'KORU — Позиционирование и Messaging',
        subtitle: 'Шпаргалка для всей команды',
        whatIs: {
            heading: 'Что такое KORU?',
            text: 'KORU — SEO-платформа, которая превращает URL в полную keyword-стратегию за 5 минут. Вместо 3-4 часов ручной работы с таблицами и разрозненными инструментами.'
        },
        whoFor: {
            heading: 'Для кого?',
            segments: [
                { label: 'Сегмент A (основной)', desc: 'Фрилансеры-SEO-консультанты с 5-15 клиентами. Время = деньги, делают всё сами.' },
                { label: 'Сегмент B', desc: 'Небольшие SEO-агентства (3-15 человек). Нужны масштабируемые процессы, а не ещё больше таблиц.' },
                { label: 'Сегмент C', desc: 'In-house SEO-менеджеры в средних компаниях. Нужно показать ROI и двигаться быстро.' }
            ]
        },
        problem: {
            heading: 'Какую проблему решаем',
            points: [
                'Keyword research занимает 3-4 часа на клиента. При 10 клиентах = 40 часов/месяц',
                'Инструменты дают сырые данные (списки keywords), а не стратегию (кластеры, gaps, briefs)',
                'Рабочий процесс фрагментирован: Ahrefs + Таблица + Google Docs + Asana — ничего не связано',
                'Процесс не менялся 10 лет, хотя инструменты стали мощнее'
            ]
        },
        how: {
            heading: 'Как KORU это решает',
            steps: [
                { step: 'Вставь URL', desc: 'Начни с любого сайта' },
                { step: 'Авто-краулинг', desc: 'KORU сканирует сайт и находит seed keywords' },
                { step: 'Расширение и классификация', desc: 'Сотни релевантных keywords, классифицированных по search intent' },
                { step: 'Кластеризация по темам', desc: 'Keywords сгруппированы в логические topic clusters' },
                { step: 'Маппинг на страницы', desc: 'Каждый кластер привязан к существующим страницам сайта' },
                { step: 'Поиск gaps', desc: 'Показываем где нет контента — упущенные возможности' },
                { step: 'Генерация briefs', desc: 'Content briefs в один клик для каждого gap' },
                { step: 'Создание задач', desc: 'Готовые задачи для команды' }
            ]
        },
        strength: {
            heading: 'Наши ключевые преимущества',
            points: [
                'Полный цикл в одном инструменте — от URL до плана действий, без переключений',
                'Стратегия, а не данные — кластеризованные, маппированные, приоритизированные планы',
                'Скорость — 5 минут вместо 3-4 часов. Это 40 часов/месяц назад фрилансеру с 10 клиентами',
                'Создано практиками — поговорили с 30+ SEO-специалистами прежде чем писать код'
            ]
        },
        positioning: {
            heading: 'Core Positioning',
            statement: 'KORU — для SEO-фрилансеров и небольших агентств, которые тратят часы на ручной keyword research. В отличие от Ahrefs/Semrush которые дают данные, KORU даёт готовую стратегию.',
            tagline: 'From URL to keyword strategy in 5 minutes.',
            notSaying: [
                'Мы НЕ замена Ahrefs/Semrush — мы дополняем их',
                'Мы НЕ обещаем магию — мы автоматизируем ручную часть процесса',
                'Мы НЕ целимся в enterprise (пока) — фокус на фрилансерах и малых агентствах'
            ]
        },
        tone: {
            heading: 'Тон коммуникации',
            points: [
                'Уверенный, но не высокомерный — мы знаем проблему и построили решение',
                'Опора на цифры — "3-4 часа", "40 часов/месяц", "$250/мес на инструменты"',
                'Язык практиков — "кластеры", "briefs", "audit", без маркетингового мусора',
                'Любопытство — задавать вопросы в постах, приглашать к разговору',
                'Никогда не питчить в комментариях — добавлять ценность, делиться данными, задавать острые вопросы'
            ]
        }
    }
}

const sectionBox = {
    mb: 3,
    p: 2.5,
    borderRadius: 2,
    backgroundColor: '#ffffff05',
    border: '1px solid',
    borderColor: 'divider'
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

export default function OverviewView() {
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

            {/* What is KORU */}
            <Box sx={sectionBox}>
                <Typography sx={sectionHeading}>{c.whatIs.heading}</Typography>
                <Typography sx={{ fontSize: '1rem', color: 'text.primary', lineHeight: 1.7, fontWeight: 500 }}>
                    {c.whatIs.text}
                </Typography>
            </Box>

            {/* Who is it for */}
            <Box sx={sectionBox}>
                <Typography sx={sectionHeading}>{c.whoFor.heading}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {c.whoFor.segments.map((seg) => (
                        <Box key={seg.label}>
                            <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: 'text.primary' }}>
                                {seg.label}
                            </Typography>
                            <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary', lineHeight: 1.6 }}>
                                {seg.desc}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Problem */}
            <Box sx={sectionBox}>
                <Typography sx={sectionHeading}>{c.problem.heading}</Typography>
                {c.problem.points.map((p, i) => (
                    <Typography key={i} sx={bulletItem}>{p}</Typography>
                ))}
            </Box>

            {/* How KORU solves it */}
            <Box sx={sectionBox}>
                <Typography sx={sectionHeading}>{c.how.heading}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {c.how.steps.map((s, i) => (
                        <Box key={i} sx={{ display: 'flex', gap: 1.5, alignItems: 'baseline' }}>
                            <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, color: 'primary.main', minWidth: 20, textAlign: 'right' }}>
                                {i + 1}.
                            </Typography>
                            <Box>
                                <Typography component="span" sx={{ fontSize: '0.9rem', fontWeight: 700, color: 'text.primary' }}>
                                    {s.step}
                                </Typography>
                                <Typography component="span" sx={{ fontSize: '0.9rem', color: 'text.secondary' }}>
                                    {' — '}{s.desc}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Strengths */}
            <Box sx={sectionBox}>
                <Typography sx={sectionHeading}>{c.strength.heading}</Typography>
                {c.strength.points.map((p, i) => (
                    <Typography key={i} sx={bulletItem}>{p}</Typography>
                ))}
            </Box>

            {/* Positioning */}
            <Box sx={{ ...sectionBox, borderColor: 'primary.main', backgroundColor: '#3fb68e08' }}>
                <Typography sx={sectionHeading}>{c.positioning.heading}</Typography>
                <Typography sx={{ fontSize: '0.95rem', color: 'text.primary', lineHeight: 1.7, mb: 2, fontStyle: 'italic' }}>
                    "{c.positioning.statement}"
                </Typography>
                <Typography sx={{ fontSize: '1.1rem', fontWeight: 800, color: 'primary.main', mb: 2 }}>
                    {c.positioning.tagline}
                </Typography>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: 'text.secondary', mb: 1, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {lang === 'ru' ? 'Чего мы НЕ говорим' : 'What we\'re NOT saying'}
                </Typography>
                {c.positioning.notSaying.map((p, i) => (
                    <Typography key={i} sx={{ ...bulletItem, fontSize: '0.85rem' }}>{p}</Typography>
                ))}
            </Box>

            {/* Tone */}
            <Box sx={sectionBox}>
                <Typography sx={sectionHeading}>{c.tone.heading}</Typography>
                {c.tone.points.map((p, i) => (
                    <Typography key={i} sx={bulletItem}>{p}</Typography>
                ))}
            </Box>
        </Box>
    )
}
