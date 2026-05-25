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
            text: 'You paste a URL. KORU audits the site, finds keywords, clusters them, spots gaps, writes briefs, and turns it all into tasks. One tool instead of four. Five minutes instead of four hours.'
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
                'The gap isn\'t data. Everyone has data. The gap is: what do I do with it? That step is still manual everywhere.'
            ]
        },
        how: {
            heading: 'What happens when you paste a URL',
            steps: [
                { step: 'Site audit', desc: 'We crawl the pages, check titles, metas, headings, speed, mobile, Core Web Vitals. Quick health check.' },
                { step: 'AI reads it', desc: 'No more scrolling through error tables. AI says: "Your main problem is X. Fix Y first. Here\'s why."' },
                { step: 'Keyword discovery', desc: 'Pulls hundreds of keywords with volume, difficulty, and intent. Automatically.' },
                { step: 'Clustering', desc: 'Groups keywords into topics. Not a flat list — actual clusters you can act on.' },
                { step: 'Gap analysis', desc: 'Maps clusters to your pages. Shows what\'s covered, what\'s missing, where to write.' },
                { step: 'Briefs', desc: 'One click → brief based on real top-5 Google results for that keyword. Not generic AI filler.' },
                { step: 'Tasks', desc: 'Every finding becomes a task. With a link to where it came from. Assign, track, done.' }
            ]
        },
        keyFeatures: {
            heading: 'Why us (honestly)',
            subtitle: 'We checked. Here\'s what\'s actually true.',
            features: [
                { name: 'Everything connects', desc: 'Audit finds a problem → keyword analysis finds the opportunity → brief gets written → task gets created. One flow. Other platforms have some of these features but in separate tabs you switch between manually. Here, diagnosis leads straight to action.' },
                { name: 'AI does the grunt work', desc: 'Intent classification, clustering, prioritization, brief writing — all automated. You skip the spreadsheet phase entirely. Other tools give you data and say "good luck." We give you a plan.' },
                { name: '$19 for the full thing', desc: 'Comparable setups elsewhere run $300+/mo. Our full platform starts at $19. We didn\'t strip features to get there — we just built for freelancers, not enterprises.' }
            ]
        },
        alsoIncludes: {
            heading: 'What else is in there',
            items: [
                'Rank tracking — positions, SERP features (snippets, PAA), desktop + mobile, by country',
                'Competitor gaps — show me keywords they rank for and I don\'t',
                'Backlinks — who links to you, domain authority, which links you lost',
                'AI brand monitoring — are you mentioned in ChatGPT/Gemini answers? (others offer this too — not unique to us, but it\'s included)',
                'Google Search Console sync — pull your real click data',
                'Agency kit — white-label PDFs, client portal, team roles',
                'Agent readiness check — is your site ready for AI bots? (new space, few tools do this yet)'
            ]
        },
        strength: {
            heading: 'What to say and what NOT to say',
            points: [
                'Don\'t say "best audit tool." Dedicated crawlers run 300+ checks. We run ~20. Ours is a health check, not a deep scan. That\'s fine — our users don\'t need 300 checks.',
                'Do say "the tool that tells you what to do after the audit." That\'s the gap. Everyone has audits. Nobody connects them to action.',
                'Do say "built for freelancers, not enterprises." That\'s not a weakness. That\'s a choice.',
                'Do say "$19 for what costs $300 elsewhere." That\'s real.'
            ]
        },
        positioning: {
            heading: 'The pitch (memorize this)',
            statement: 'SEO freelancers run an audit in one tool, research keywords in another, cluster them in a spreadsheet, write briefs in Google Docs, and track tasks in Asana. Five tools, nothing connected. KORU does it all in one place — audit to tasks — with AI handling the busywork. Starting at $19.',
            tagline: 'From URL to keyword strategy in 5 minutes.',
            notSaying: [
                'Not a replacement for standalone data tools. Different thing. We connect the workflow.',
                'Not the deepest audit on the market. The most connected one.',
                'Not for Fortune 500. For the freelancer who\'s tired of spreadsheets.',
                'AI brand visibility isn\'t our invention. But it\'s included in the platform, not a separate bill.'
            ]
        },
        tone: {
            heading: 'How we sound',
            points: [
                'Like a smart colleague, not a brochure. "Here\'s what I found" not "Unlock the power of..."',
                'Numbers, always. "3-4 hours" hits harder than "a lot of time."',
                'Industry words, not buzzwords. Say "clusters" and "briefs." Never say "leverage" or "synergy."',
                'Ask questions in posts. "How long does yours take?" gets more replies than "Our tool saves time."',
                'In comments: add something useful. A stat. A question. Never "Great post! Check out KORU."',
                'About competitors: be straight. "They have more data. We have a better workflow." People respect that.'
            ]
        },
    },
    ru: {
        title: 'KORU — Шпаргалка команды',
        subtitle: 'Что делаем, для кого, как об этом говорить. Держи открытой.',
        whatIs: {
            heading: 'KORU в одном предложении',
            text: 'Вставляешь URL. KORU проверяет сайт, находит ключевые слова, группирует их, показывает пробелы, пишет бриефы и превращает всё в задачи. Один инструмент вместо четырёх. Пять минут вместо четырёх часов.'
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
                'Проблема не в данных. Данные есть у всех. Проблема: что с ними делать? Этот шаг везде ручной.'
            ]
        },
        how: {
            heading: 'Что происходит, когда вставляешь URL',
            steps: [
                { step: 'Аудит сайта', desc: 'Проходим по страницам — заголовки, мета, скорость, мобилка, Core Web Vitals. Быстрый чекап.' },
                { step: 'AI разбирает результат', desc: 'Не надо листать таблицу ошибок. AI говорит: "Главная проблема — X. Начни с Y. Вот почему."' },
                { step: 'Поиск keywords', desc: 'Сотни ключевых слов с объёмом, сложностью и типом запроса. Автоматически.' },
                { step: 'Кластеризация', desc: 'Слова группируются по темам. Не плоский список — готовые кластеры, с которыми можно работать.' },
                { step: 'Анализ пробелов', desc: 'Сопоставляем кластеры со страницами. Видно что покрыто, что нет, где нужен контент.' },
                { step: 'Бриефы', desc: 'Один клик — бриф на основе реальных топ-5 Google по этому запросу. Не шаблонный текст от AI.' },
                { step: 'Задачи', desc: 'Каждая находка = задача. Со ссылкой на источник. Назначил, трекаешь, закрыл.' }
            ]
        },
        keyFeatures: {
            heading: 'Почему мы (честно)',
            subtitle: 'Мы проверили. Вот что правда.',
            features: [
                { name: 'Всё связано в одну цепочку', desc: 'Аудит нашёл проблему → анализ нашёл возможность → бриф написан → задача создана. Один поток. В других платформах эти фичи разбросаны по отдельным вкладкам. У нас диагноз ведёт напрямую к действию.' },
                { name: 'AI берёт рутину на себя', desc: 'Классификация запросов, кластеризация, расстановка приоритетов, написание бриефов — автоматом. Этап с таблицей просто пропускается. Другие дают данные и говорят "разбирайся." Мы даём план.' },
                { name: '$19 за всё', desc: 'Сопоставимый набор в других местах — от $300/мес. Наша полная платформа — от $19. Мы не урезали фичи. Мы просто строили для фрилансеров, а не для корпораций.' }
            ]
        },
        alsoIncludes: {
            heading: 'Что ещё внутри',
            items: [
                'Позиции в поиске — трекинг, SERP-фичи (сниппеты, PAA), десктоп + мобайл, по странам',
                'Анализ конкурентов — покажи, по каким словам они в топе, а я нет',
                'Бэклинки — кто ссылается, авторитет домена, какие ссылки потерялись',
                'AI-мониторинг бренда — упоминает ли тебя ChatGPT/Gemini? (другие тоже это делают — не уникально, но у нас включено)',
                'Google Search Console — подключение и реальные данные по кликам',
                'Для агентств — white-label PDF, портал для клиентов, роли в команде',
                'Проверка готовности к AI-агентам — насколько сайт подходит для ботов (тема новая, мало кто делает)'
            ]
        },
        strength: {
            heading: 'Что говорить, а что нет',
            points: [
                'Не говори "лучший аудит." Узкоспециализированные краулеры проверяют 300+ правил. Мы — примерно 20. У нас чекап, не глубокое сканирование. И это нормально — нашим юзерам 300 проверок не нужны.',
                'Говори "инструмент, который говорит что делать после аудита." Вот где дыра. Аудиты есть у всех. Связать их с действием — ни у кого.',
                'Говори "сделано для фрилансеров, не для корпораций." Это не слабость. Это выбор.',
                'Говори "$19 за то, что в другом месте стоит $300." Это факт.'
            ]
        },
        positioning: {
            heading: 'Питч (запомни)',
            statement: 'SEO-фрилансер запускает аудит в одном инструменте, ищет ключевики в другом, кластеризует в таблице, пишет бриефы в Google Docs, ведёт задачи в Asana. Пять инструментов, ничего не связано. KORU делает всё это в одном месте — от аудита до задач — и AI берёт на себя рутину. От $19.',
            tagline: 'From URL to keyword strategy in 5 minutes.',
            notSaying: [
                'Не замена для data-инструментов. Другая задача. Мы связываем workflow.',
                'Не самый глубокий аудит. Самый связный.',
                'Не для Fortune 500. Для фрилансера, которому надоели таблицы.',
                'AI-мониторинг бренда — не наше изобретение. Но включён в платформу, а не за отдельные деньги.'
            ]
        },
        tone: {
            heading: 'Как мы звучим',
            points: [
                'Как умный коллега, а не рекламный буклет. "Вот что я нашёл" — не "Раскройте потенциал..."',
                'Цифры — всегда. "3-4 часа" бьёт сильнее, чем "много времени."',
                'Слова из индустрии, не из маркетинга. "Кластеры" и "бриефы" — да. "Синергия" — нет.',
                'В постах задавай вопросы. "Сколько у тебя уходит?" цепляет больше, чем "Наш инструмент экономит время."',
                'В комментариях — дай что-то полезное. Факт. Статистику. Вопрос. Никогда "Классный пост! Попробуй KORU."',
                'Про конкурентов — прямо. "У них больше данных. У нас лучше workflow." Люди это уважают.'
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
