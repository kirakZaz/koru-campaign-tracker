import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import SaveRoundedIcon from '@mui/icons-material/SaveRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded'
import type { InsightEntry, InsightCategory } from '@/data/campaignData.types'

const CATEGORY_LABELS: Record<InsightCategory, { label: string, color: string }> = {
    competitor: { label: 'Конкурент', color: '#f85149' },
    market: { label: 'Рынок', color: '#6c8eff' },
    product: { label: 'Продукт', color: '#a371f7' },
    post_analysis: { label: 'Пост-анализ', color: '#d29922' },
    general: { label: 'Общее', color: '#8b949e' }
}

interface InsightsViewProps {
    phase: string
    insights: InsightEntry[]
    onSave: (phase: string, insights: InsightEntry[]) => void
}

function generateId() {
    return 'ins-' + Math.random().toString(36).slice(2, 9)
}

export default function InsightsView({ phase, insights, onSave }: InsightsViewProps) {
    const [editingId, setEditingId] = React.useState<string | null>(null)
    const [editTitle, setEditTitle] = React.useState('')
    const [editText, setEditText] = React.useState('')
    const [editCategory, setEditCategory] = React.useState<InsightCategory>('general')
    const [collapsed, setCollapsed] = React.useState<Set<string>>(new Set())

    const toggleCollapse = (id: string) => {
        setCollapsed(prev => {
            const next = new Set(prev)
            if (next.has(id)) next.delete(id); else next.add(id)
            return next
        })
    }

    const collapseAll = () => setCollapsed(new Set(insights.map(i => i.id)))
    const expandAll = () => setCollapsed(new Set())

    const addInsight = () => {
        const entry: InsightEntry = {
            id: generateId(),
            date: new Date().toISOString().slice(0, 10),
            category: 'general',
            title: '',
            text: ''
        }
        const next = [entry, ...insights]
        onSave(phase, next)
        setEditingId(entry.id)
        setEditTitle('')
        setEditText('')
        setEditCategory('general')
    }

    const deleteInsight = (id: string) => {
        onSave(phase, insights.filter(i => i.id !== id))
    }

    const startEdit = (entry: InsightEntry) => {
        setEditingId(entry.id)
        setEditTitle(entry.title || '')
        setEditText(entry.text)
        setEditCategory(entry.category)
    }

    const saveEdit = () => {
        if (!editingId) return
        onSave(phase, insights.map(i => i.id === editingId ? { ...i, title: editTitle, text: editText, category: editCategory } : i))
        setEditingId(null)
    }

    const cancelEdit = () => {
        const entry = insights.find(i => i.id === editingId)
        if (entry && !entry.text && !entry.title) {
            onSave(phase, insights.filter(i => i.id !== editingId))
        }
        setEditingId(null)
    }

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, overflow: 'auto', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: 'text.primary' }}>
                    {phase} — Выводы
                </Typography>
                <Chip label={`${insights.length}`} size="small" sx={{ fontSize: '0.75rem', fontWeight: 700 }} />
                <Box sx={{ flex: 1 }} />
                {insights.length > 1 && (
                    <Button size="small" onClick={collapsed.size === insights.length ? expandAll : collapseAll} sx={{ textTransform: 'none', fontSize: '0.75rem', color: 'text.secondary' }}>
                        {collapsed.size === insights.length ? 'Развернуть все' : 'Свернуть все'}
                    </Button>
                )}
                <Button size="small" startIcon={<AddRoundedIcon />} onClick={addInsight} variant="outlined" sx={{ textTransform: 'none', fontSize: '0.8rem' }}>
                    Добавить
                </Button>
            </Box>

            {insights.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 6, color: 'text.secondary' }}>
                    <Typography sx={{ fontSize: '0.9rem' }}>Пока нет выводов для этой недели.</Typography>
                    <Typography sx={{ fontSize: '0.8rem', mt: 0.5 }}>Нажми "Добавить" или попроси Claude записать инсайт.</Typography>
                </Box>
            )}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {insights.map(entry => {
                    const isCollapsed = collapsed.has(entry.id) && editingId !== entry.id
                    const catInfo = CATEGORY_LABELS[entry.category]
                    const displayTitle = entry.title || entry.text?.slice(0, 60) || 'Без заголовка'

                    return (
                        <Box
                            key={entry.id}
                            sx={{
                                border: '1px solid',
                                borderColor: editingId === entry.id ? 'primary.main' : 'divider',
                                borderRadius: 1.5,
                                backgroundColor: '#ffffff03',
                                '&:hover': { backgroundColor: '#ffffff06' },
                                overflow: 'hidden'
                            }}
                        >
                            {editingId === entry.id ? (
                                <Box sx={{ p: 2 }}>
                                    <Box sx={{ display: 'flex', gap: 1, mb: 1.5, alignItems: 'center' }}>
                                        <Select
                                            size="small"
                                            value={editCategory}
                                            onChange={e => setEditCategory(e.target.value as InsightCategory)}
                                            sx={{ fontSize: '0.8rem', minWidth: 140, '& .MuiSelect-select': { py: 0.5 } }}
                                        >
                                            {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                                                <MenuItem key={k} value={k} sx={{ fontSize: '0.8rem' }}>
                                                    <Chip label={v.label} size="small" sx={{ fontSize: '0.7rem', height: 20, backgroundColor: v.color + '22', color: v.color, fontWeight: 600 }} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <Box sx={{ flex: 1 }} />
                                        <IconButton size="small" onClick={saveEdit} sx={{ color: 'success.main' }}><SaveRoundedIcon sx={{ fontSize: '1rem' }} /></IconButton>
                                        <IconButton size="small" onClick={cancelEdit} sx={{ color: 'text.secondary' }}><CloseRoundedIcon sx={{ fontSize: '1rem' }} /></IconButton>
                                    </Box>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={editTitle}
                                        onChange={e => setEditTitle(e.target.value)}
                                        placeholder="Заголовок..."
                                        sx={{ mb: 1.5, '& .MuiInputBase-input': { fontSize: '0.9rem', fontWeight: 700 } }}
                                    />
                                    <TextField
                                        fullWidth
                                        multiline
                                        minRows={3}
                                        value={editText}
                                        onChange={e => setEditText(e.target.value)}
                                        autoFocus
                                        placeholder="Запиши вывод, инсайт, наблюдение..."
                                        sx={{ '& .MuiInputBase-input': { fontSize: '0.85rem', lineHeight: 1.6 } }}
                                        onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) saveEdit() }}
                                    />
                                </Box>
                            ) : (
                                <Box>
                                    {/* Collapsible header */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            px: 2,
                                            py: 1.25,
                                            cursor: 'pointer',
                                            userSelect: 'none',
                                            '&:hover': { backgroundColor: '#ffffff04' }
                                        }}
                                        onClick={() => toggleCollapse(entry.id)}
                                    >
                                        {isCollapsed
                                            ? <ExpandMoreRoundedIcon sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                                            : <ExpandLessRoundedIcon sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                                        }
                                        <Chip
                                            label={catInfo.label}
                                            size="small"
                                            sx={{
                                                fontSize: '0.65rem',
                                                height: 18,
                                                backgroundColor: catInfo.color + '22',
                                                color: catInfo.color,
                                                fontWeight: 600
                                            }}
                                        />
                                        <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: 'text.primary', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {displayTitle}
                                        </Typography>
                                        <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary', flexShrink: 0 }}>{entry.date}</Typography>
                                        <IconButton
                                            size="small"
                                            onClick={e => { e.stopPropagation(); startEdit(entry) }}
                                            sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                                        >
                                            <EditRoundedIcon sx={{ fontSize: '0.8rem' }} />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={e => { e.stopPropagation(); deleteInsight(entry.id) }}
                                            sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}
                                        >
                                            <DeleteRoundedIcon sx={{ fontSize: '0.8rem' }} />
                                        </IconButton>
                                    </Box>

                                    {/* Expandable body */}
                                    {!isCollapsed && (
                                        <Box sx={{ px: 2, pb: 2, pt: 0.5, borderTop: '1px solid', borderColor: 'divider' }}>
                                            <Typography sx={{ fontSize: '0.85rem', color: 'text.primary', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                                                {entry.text || <span style={{ color: '#8b949e', fontStyle: 'italic' }}>Пусто — нажми редактировать</span>}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            )}
                        </Box>
                    )
                })}
            </Box>
        </Box>
    )
}
