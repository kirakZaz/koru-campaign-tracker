import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'

const sectionBox = {
    mb: 3,
    p: 2.5,
    borderRadius: 2,
    backgroundColor: '#ffffff05',
    border: '1px solid',
    borderColor: 'divider',
}

const tipBox = {
    p: 2,
    borderRadius: 1.5,
    backgroundColor: '#3fb68e0a',
    border: '1px solid',
    borderColor: '#3fb68e33',
    mb: 1.5,
}

interface TemplateCard {
    id: string
    title: string
    dimensions: string
    description: string
    canvaUrl: string
    use: string
}

const CANVA_TEMPLATES: TemplateCard[] = [
    {
        id: 'stat-card',
        title: 'Stat Card',
        dimensions: '1200 x 1200',
        description: 'Одна цифра + подпись. Для постов с ключевой статистикой.',
        canvaUrl: 'https://www.canva.com/design/new?type=social-media&size=1200x1200',
        use: 'Пост 1 ("8 hours per client"), Пост 2 ("48% AI Overviews")',
    },
    {
        id: 'checklist',
        title: 'Checklist / GEO Score Rules',
        dimensions: '1200 x 1500',
        description: '6-8 пунктов с галочками. Для постов с чеклистами и правилами.',
        canvaUrl: 'https://www.canva.com/design/new?type=social-media&size=1200x1500',
        use: 'Пост 4 ("14 GEO checks"), Пост 5 ("4 agent readiness checks")',
    },
    {
        id: 'comparison',
        title: 'Before / After',
        dimensions: '1200 x 1200',
        description: 'Разделённая карточка: левая часть (проблема) / правая (решение).',
        canvaUrl: 'https://www.canva.com/design/new?type=social-media&size=1200x1200',
        use: 'Пост 2 (старый SEO vs новый), reveal posts',
    },
    {
        id: 'pipeline',
        title: 'Pipeline / Flow',
        dimensions: '1200 x 1500',
        description: 'Вертикальный поток: шаг 1 → шаг 2 → ... → результат.',
        canvaUrl: 'https://www.canva.com/design/new?type=social-media&size=1200x1500',
        use: 'Пост 7 ("URL → crawl → cluster → brief → task")',
    },
    {
        id: 'quote',
        title: 'Quote / Hot Take',
        dimensions: '1200 x 1200',
        description: 'Крупный текст на тёмном фоне. Для контроверсий и цитат.',
        canvaUrl: 'https://www.canva.com/design/new?type=social-media&size=1200x1200',
        use: 'Пост 5 ("No SEO tool gives you finished work")',
    },
]

const WORKFLOW_STEPS = [
    { step: '1', text: 'Canva → LinkedIn Post template (1200x1200 или 1200x1500)', time: '30 сек' },
    { step: '2', text: 'Выбрать тёмный фон (#0d1117 или #161b22), акцент #3fb68e', time: '15 сек' },
    { step: '3', text: 'Вбить текст (цифра + подпись ИЛИ 6-8 пунктов ИЛИ flow)', time: '1-2 мин' },
    { step: '4', text: 'Скачать PNG → вставить в LinkedIn пост', time: '15 сек' },
]

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

function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = React.useState(false)
    return (
        <IconButton
            size="small"
            onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
            sx={{ color: copied ? '#3fb68e' : 'text.secondary', '&:hover': { color: 'primary.main' } }}
            title="Copy"
        >
            <ContentCopyRoundedIcon sx={{ fontSize: '0.8rem' }} />
        </IconButton>
    )
}

export default function CreativesView() {
    return (
        <Box sx={{ flex: 1, overflow: 'auto', px: { xs: 2, md: 4 }, py: 3, maxWidth: 900 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
                Creatives
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem', mb: 3 }}>
                Шаблоны, цвета и workflow для создания картинок к постам за 2-3 минуты.
            </Typography>

            <Box sx={tipBox}>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#3fb68e', mb: 0.5 }}>
                    Быстрый workflow: Canva → 2 минуты → PNG → LinkedIn
                </Typography>
                <Box component="ol" sx={{ m: 0, pl: 2.5 }}>
                    {WORKFLOW_STEPS.map(s => (
                        <Typography component="li" key={s.step} sx={{ fontSize: '0.8rem', color: 'text.secondary', lineHeight: 1.8 }}>
                            {s.text} <Chip label={s.time} size="small" sx={{ fontSize: '0.65rem', height: 18, ml: 0.5 }} />
                        </Typography>
                    ))}
                </Box>
            </Box>

            <Box sx={sectionBox}>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, mb: 1.5 }}>
                    Brand Colors
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {BRAND_COLORS.map(c => (
                        <Box key={c.hex} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, backgroundColor: c.hex, px: 1.5, py: 0.75, borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                            <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: c.text }}>{c.name}</Typography>
                            <Typography sx={{ fontSize: '0.65rem', color: c.text, opacity: 0.7 }}>{c.hex}</Typography>
                            <CopyButton text={c.hex} />
                        </Box>
                    ))}
                </Box>
            </Box>

            <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, mb: 1.5 }}>
                Templates
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 3 }}>
                {CANVA_TEMPLATES.map(t => (
                    <Box key={t.id} sx={sectionBox}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                            <Box>
                                <Typography sx={{ fontSize: '0.85rem', fontWeight: 700 }}>{t.title}</Typography>
                                <Chip label={t.dimensions} size="small" sx={{ fontSize: '0.65rem', height: 18, mt: 0.5 }} />
                            </Box>
                            <IconButton
                                size="small"
                                onClick={() => window.open(t.canvaUrl, '_blank')}
                                sx={{ color: 'primary.main' }}
                                title="Open in Canva"
                            >
                                <OpenInNewRoundedIcon sx={{ fontSize: '0.9rem' }} />
                            </IconButton>
                        </Box>
                        <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary', mb: 1 }}>{t.description}</Typography>
                        <Typography sx={{ fontSize: '0.72rem', color: '#3fb68e' }}>{t.use}</Typography>
                    </Box>
                ))}
            </Box>

            <Box sx={sectionBox}>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, mb: 1 }}>
                    Правила
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                    {[
                        'Тёмный фон (#0d1117) + зелёный акцент (#3fb68e) — наш стиль',
                        'Одна карточка = одна мысль. Не перегружать текстом.',
                        'Числа крупно (48%, 8 hours, 14 rules). Текст мелко.',
                        'Без логотипа KORU до Week 4. После — маленький в углу.',
                        'Без stock photos. Данные > декорации.',
                        'LinkedIn рекомендует 1200x1200 (квадрат) или 1200x1500 (вертикаль).',
                        'Не тратить больше 3 минут. Если дольше — упрощай.',
                    ].map((rule, i) => (
                        <Typography component="li" key={i} sx={{ fontSize: '0.8rem', color: 'text.secondary', lineHeight: 1.8 }}>
                            {rule}
                        </Typography>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}
