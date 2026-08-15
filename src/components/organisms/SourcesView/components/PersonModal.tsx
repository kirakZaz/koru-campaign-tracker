import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import ArchiveRoundedIcon from '@mui/icons-material/ArchiveRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import LockRoundedIcon from '@mui/icons-material/LockRounded'

import { ICP_LABELS, SHORTLIST_ACTION_LABELS } from '../sources.constants'
import { getNextAction } from '../sources.utils'

import type { ShortlistPerson, ShortlistAction } from '../SourcesView.types'

interface PersonModalProps {
    person: ShortlistPerson
    open: boolean
    onClose: () => void
    historyInput: string
    setHistoryInput: (v: string) => void
    copyToClipboard: (text: string, personId?: string) => void
    updateShortlistWithHistory: (id: string, patch: Partial<ShortlistPerson>) => void
    updateShortlistPerson: (id: string, patch: Partial<ShortlistPerson>) => void
    addHistory: (id: string, text: string, auto?: boolean) => void
    onRemoveFromOutreach: () => void
    onDeleteCompletely: () => void
    /** View-only card (no edits, no destructive footer) — used from People and Архив. */
    readOnly?: boolean
}

/** The person detail card (was renderContactModal). Self-contained: funnel,
 *  checklist, Citation Gap loop, tester status, notes, templates, history. The
 *  two destructive actions are delegated to the parent via callbacks so this
 *  component never touches the sources dataset directly. */
export default function PersonModal({
    person,
    open,
    onClose,
    historyInput,
    setHistoryInput,
    copyToClipboard,
    updateShortlistWithHistory,
    updateShortlistPerson,
    addHistory,
    onRemoveFromOutreach,
    onDeleteCompletely,
    readOnly = false,
}: PersonModalProps) {
    const nextAction = getNextAction(person)
    const firstName = person.name.split(' ')[0] || person.name
    const notesRef = person.notes ? person.notes.slice(0, 50) : 'your work'
    const priorityColor = person.priority === 'A' ? '#3fb68e' : person.priority === 'B' ? '#d29922' : '#8b949e'

    const followSt = person.followStatus || 'not_followed'
    const isFollowed = followSt === 'followed' || followSt === 'follow_back'
    const isFollowBack = followSt === 'follow_back'
    const crDone = person.connectionStatus === 'sent' || person.connectionStatus === 'accepted' || person.connectionStatus === 'declined'
    const crAccepted = person.connectionStatus === 'accepted'
    const dmDone = person.dmStatus === 'sent' || person.dmStatus === 'replied' || person.dmStatus === 'no_reply'
    const dmReplied = person.dmStatus === 'replied'
    const isBeta = person.status === 'beta' || person.status === 'client'

    const funnelChip = (label: string, done: boolean, onClick: () => void) => (
        <Chip
            label={label}
            size="small"
            onClick={readOnly ? undefined : onClick}
            sx={{
                fontSize: '0.75rem',
                fontWeight: 600,
                height: 28,
                cursor: readOnly ? 'default' : 'pointer',
                backgroundColor: done ? '#3fb68e22' : '#8b949e15',
                color: done ? '#3fb68e' : '#8b949e',
                border: `1px solid ${done ? '#3fb68e44' : '#8b949e33'}`,
                '&:hover': readOnly ? {} : { backgroundColor: done ? '#3fb68e33' : '#8b949e25' }
            }}
        />
    )

    const templates = [
        {
            label: 'Шаблон запроса',
            text: `Hi ${firstName}, ${person.notes ? person.notes + '.' : ''} I'm building KORU — an SEO platform that audits for both Google and AI search engines. GEO score, Citation Gap, intent-first keywords. Would love to connect.`
        },
        {
            label: 'DM first touch',
            text: `Hey ${firstName},\n\nReally appreciated your content — especially ${notesRef}.\n\nQuick question — have you looked into how your clients' content performs in AI answers specifically?\n\nI've been building a tool that checks AI-citation readiness per page — 14 rules, scored 0-100. Would love your take on it.\n\nHappy to share access if you're curious.`
        },
        {
            label: 'DM follow-up',
            text: `Hey ${firstName},\n\nFollowing up — did you get a chance to look at the GEO score concept?\n\nNo pressure at all. Just thought it might be relevant given your work in ${notesRef}.\n\nHappy to do a quick 15-min walkthrough if easier.`
        },
        {
            label: 'Demo invite',
            text: `Hey ${firstName},\n\nWould love to show you KORU in action — I can run it on your site so you see real results, not a generic demo.\n\n15 minutes, no pitch. Just want your honest feedback.\n\nWant me to send a calendar link?`
        }
    ]

    const historyEntries = [...(person.history || [])].reverse()

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{ sx: { backgroundColor: '#0d1117', border: '1px solid', borderColor: 'divider', maxHeight: '90vh' } }}
        >
            <DialogContent sx={{ p: 0 }}>
                {/* Close button */}
                <IconButton
                    size="small"
                    onClick={onClose}
                    sx={{ position: 'absolute', top: 8, right: 8, color: 'text.secondary', zIndex: 1 }}
                >
                    <CloseRoundedIcon sx={{ fontSize: '1.1rem' }} />
                </IconButton>

                {/* Header */}
                <Box sx={{ p: 2.5, pb: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography sx={{ fontSize: '1.25rem', fontWeight: 800 }}>{person.name || 'Без имени'}</Typography>
                        <Chip
                            label={person.priority}
                            size="small"
                            sx={{ fontSize: '0.7rem', fontWeight: 800, height: 22, backgroundColor: priorityColor + '22', color: priorityColor, border: `1px solid ${priorityColor}44` }}
                        />
                        {person.reviewed && (
                            <Chip
                                icon={<CheckCircleRoundedIcon sx={{ fontSize: '0.85rem !important', color: '#3fb68e !important' }} />}
                                label={person.reviewedAt ? `Проверен · ${person.reviewedAt}` : 'Проверен'}
                                size="small"
                                sx={{ fontSize: '0.7rem', fontWeight: 700, height: 22, backgroundColor: '#3fb68e18', color: '#3fb68e', border: '1px solid #3fb68e44' }}
                            />
                        )}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        {person.linkedinUrl && (
                            <Button
                                size="small"
                                startIcon={<OpenInNewRoundedIcon sx={{ fontSize: '0.8rem' }} />}
                                onClick={() => window.open(person.linkedinUrl.startsWith('http') ? person.linkedinUrl : `https://${person.linkedinUrl}`, '_blank')}
                                sx={{ textTransform: 'none', fontSize: '0.75rem', height: 26, color: '#6c8eff' }}
                            >
                                LinkedIn
                            </Button>
                        )}
                        {person.country && (
                            <Chip label={person.country} size="small" sx={{ fontSize: '0.7rem', height: 22 }} />
                        )}
                        {person.icpSegment && (
                            <Chip label={ICP_LABELS[person.icpSegment]} size="small" sx={{ fontSize: '0.7rem', height: 22, backgroundColor: '#6c8eff22', color: '#6c8eff' }} />
                        )}
                    </Box>
                    {person.source && (
                        <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mt: 0.75 }}>
                            Источник: {person.source}
                        </Typography>
                    )}
                </Box>

                {/* Premium / can't-DM flag */}
                <Box sx={{ mx: 2.5, mb: 2 }}>
                    <Button
                        fullWidth
                        variant={person.cantDm ? 'contained' : 'outlined'}
                        startIcon={<LockRoundedIcon sx={{ fontSize: '1rem' }} />}
                        onClick={readOnly ? undefined : () => updateShortlistPerson(person.id, { cantDm: !person.cantDm })}
                        disableElevation
                        sx={{
                            textTransform: 'none',
                            fontWeight: 700,
                            fontSize: '0.8rem',
                            ...(person.cantDm
                                ? { backgroundColor: '#f85149', color: '#fff', '&:hover': { backgroundColor: '#e5484d' } }
                                : { color: '#f85149', borderColor: '#f85149', '&:hover': { borderColor: '#e5484d', backgroundColor: '#f8514912' } })
                        }}
                    >
                        {person.cantDm ? 'Premium — нельзя написать (снять флаг)' : 'Отметить: Premium — нельзя написать'}
                    </Button>
                </Box>

                {/* Next action block */}
                <Box sx={{ mx: 2.5, mb: 2, p: 1.5, borderRadius: 1.5, backgroundColor: nextAction.color + '15', border: `1px solid ${nextAction.color}33` }}>
                    <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary', textTransform: 'uppercase', fontWeight: 700, mb: 0.5 }}>
                        Следующее действие
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: nextAction.color }}>
                            {nextAction.label}
                        </Typography>
                        {nextAction.label === 'Написать DM' && (
                            <Button
                                size="small"
                                startIcon={<ContentCopyRoundedIcon sx={{ fontSize: '0.7rem' }} />}
                                onClick={() => copyToClipboard(templates[1]!.text)}
                                sx={{ textTransform: 'none', fontSize: '0.7rem', height: 24, ml: 'auto' }}
                            >
                                DM шаблон
                            </Button>
                        )}
                        {(nextAction.label === 'Отправить запрос' || nextAction.label.includes('Отправить запрос') || nextAction.label.includes('Follow / Отправить')) && (
                            <Button
                                size="small"
                                startIcon={<ContentCopyRoundedIcon sx={{ fontSize: '0.7rem' }} />}
                                onClick={() => copyToClipboard(templates[0]!.text)}
                                sx={{ textTransform: 'none', fontSize: '0.7rem', height: 24, ml: 'auto' }}
                            >
                                Шаблон запроса
                            </Button>
                        )}
                    </Box>
                </Box>

                <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }} />

                {/* Funnel section */}
                <Box sx={{ p: 2.5, pb: 1.5 }}>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1 }}>Воронка</Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.75 }}>
                        {funnelChip('Followed', isFollowed, () => {
                            if (isFollowed && !isFollowBack) {
                                updateShortlistWithHistory(person.id, { followStatus: 'not_followed' })
                            } else if (!isFollowed) {
                                updateShortlistWithHistory(person.id, { followStatus: 'followed' })
                            }
                        })}
                        {funnelChip('Follow-back', isFollowBack, () => {
                            if (isFollowBack) {
                                updateShortlistWithHistory(person.id, { followStatus: 'followed' })
                            } else {
                                updateShortlistWithHistory(person.id, { followStatus: 'follow_back' })
                            }
                        })}
                        {funnelChip('Запрос отправлен', crDone, () => {
                            if (crDone && !crAccepted) {
                                updateShortlistWithHistory(person.id, { connectionStatus: 'not_sent' })
                            } else if (!crDone) {
                                updateShortlistWithHistory(person.id, { connectionStatus: 'sent' })
                            }
                        })}
                        {funnelChip('Запрос принят', crAccepted, () => {
                            if (crAccepted) {
                                updateShortlistWithHistory(person.id, { connectionStatus: 'sent' })
                            } else {
                                updateShortlistWithHistory(person.id, { connectionStatus: 'accepted' })
                            }
                        })}
                        {funnelChip('DM отправлен', dmDone, () => {
                            if (dmDone && !dmReplied) {
                                updateShortlistWithHistory(person.id, { dmStatus: 'not_sent' })
                            } else if (!dmDone) {
                                updateShortlistWithHistory(person.id, { dmStatus: 'sent' })
                            }
                        })}
                        {funnelChip('DM ответил', dmReplied, () => {
                            if (dmReplied) {
                                updateShortlistWithHistory(person.id, { dmStatus: 'sent' })
                            } else {
                                updateShortlistWithHistory(person.id, { dmStatus: 'replied' })
                            }
                        })}
                        {funnelChip('Beta / Client', isBeta, () => {
                            if (isBeta && person.status === 'beta') {
                                updateShortlistWithHistory(person.id, { status: 'demo' })
                            } else if (!isBeta) {
                                updateShortlistWithHistory(person.id, { status: 'beta' })
                            }
                        })}
                    </Box>
                </Box>

                <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }} />

                {/* Checklist section */}
                <Box sx={{ p: 2.5, pb: 1.5 }}>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1 }}>Чеклист</Typography>
                    {(person.actions || []).length === 0 && (
                        <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 1 }}>Нет действий. Добавьте ниже.</Typography>
                    )}
                    {(person.actions || []).map(action => {
                        const completed = (person.completedActions || []).includes(action)
                        return (
                            <Box
                                key={action}
                                sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25, cursor: readOnly ? 'default' : 'pointer', '&:hover': readOnly ? {} : { backgroundColor: '#ffffff06' }, borderRadius: 0.5, px: 0.5 }}
                                onClick={readOnly ? undefined : () => {
                                    const current = person.completedActions || []
                                    const next = completed
                                        ? current.filter(a => a !== action)
                                        : [...current, action]
                                    updateShortlistPerson(person.id, { completedActions: next })
                                }}
                            >
                                <Checkbox
                                    size="small"
                                    checked={completed}
                                    disabled={readOnly}
                                    sx={{ p: 0.25, color: completed ? '#3fb68e' : '#8b949e', '&.Mui-checked': { color: '#3fb68e' } }}
                                />
                                <Typography sx={{ fontSize: '0.8rem', color: completed ? '#3fb68e' : 'text.primary', textDecoration: completed ? 'line-through' : 'none' }}>
                                    {SHORTLIST_ACTION_LABELS[action]}
                                </Typography>
                            </Box>
                        )
                    })}
                    {!readOnly && (
                        <Select
                            size="small"
                            value=""
                            displayEmpty
                            onChange={e => {
                                const action = e.target.value as ShortlistAction
                                if (action && !(person.actions || []).includes(action)) {
                                    updateShortlistPerson(person.id, { actions: [...(person.actions || []), action] })
                                }
                            }}
                            sx={{ fontSize: '0.75rem', mt: 0.5, height: 28, minWidth: 160, '& .MuiSelect-select': { py: 0.25, px: 1 }, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' } }}
                        >
                            <MenuItem value="" sx={{ fontSize: '0.75rem', color: '#8b949e' }}>+ Добавить действие</MenuItem>
                            {(Object.entries(SHORTLIST_ACTION_LABELS) as [ShortlistAction, string][])
                                .filter(([key]) => !(person.actions || []).includes(key))
                                .map(([key, label]) => (
                                    <MenuItem key={key} value={key} sx={{ fontSize: '0.75rem' }}>{label}</MenuItem>
                                ))}
                        </Select>
                    )}
                </Box>

                <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }} />

                {/* Citation Gap section — outreach loop: прогнал / послал / скриншот */}
                <Box sx={{ p: 2.5, pb: 1.5 }}>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1 }}>Citation Gap</Typography>
                    {([['checkRan', 'Прогнал проверку'], ['resultSent', 'Послал результат']] as ['checkRan' | 'resultSent', string][]).map(([key, label]) => {
                        const done = !!person[key]
                        return (
                            <Box
                                key={key}
                                sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25, cursor: readOnly ? 'default' : 'pointer', '&:hover': readOnly ? {} : { backgroundColor: '#ffffff06' }, borderRadius: 0.5, px: 0.5 }}
                                onClick={readOnly ? undefined : () => updateShortlistPerson(person.id, { [key]: !done } as Partial<ShortlistPerson>)}
                            >
                                <Checkbox size="small" checked={done} disabled={readOnly} sx={{ p: 0.25, color: done ? '#3fb68e' : '#8b949e', '&.Mui-checked': { color: '#3fb68e' } }} />
                                <Typography sx={{ fontSize: '0.8rem', color: done ? '#3fb68e' : 'text.primary' }}>{label}</Typography>
                            </Box>
                        )
                    })}
                    <Box sx={{ mt: 1 }}>
                        {person.resultImage ? (
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                <Box component="a" href={person.resultImage} target="_blank" rel="noopener noreferrer" sx={{ display: 'block', lineHeight: 0 }}>
                                    <Box component="img" src={person.resultImage} alt="результат" sx={{ maxWidth: 160, maxHeight: 120, borderRadius: 1, border: '1px solid', borderColor: 'divider' }} />
                                </Box>
                                {!readOnly && (
                                    <Button size="small" onClick={() => updateShortlistPerson(person.id, { resultImage: undefined })} sx={{ fontSize: '0.72rem', color: '#B5423F', minWidth: 0 }}>Удалить</Button>
                                )}
                            </Box>
                        ) : readOnly ? (
                            <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>Скриншот не загружен</Typography>
                        ) : (
                            <Button component="label" size="small" variant="outlined" sx={{ fontSize: '0.75rem', textTransform: 'none', borderColor: 'divider', color: 'text.secondary' }}>
                                Загрузить скриншот
                                <input type="file" accept="image/*" hidden onChange={async (e) => {
                                    const file = e.target.files?.[0]
                                    e.target.value = ''
                                    if (!file) return
                                    const reader = new FileReader()
                                    reader.onload = async () => {
                                        try {
                                            const res = await fetch('/api/upload', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ dataUrl: reader.result }) })
                                            const data = await res.json()
                                            if (data.url) updateShortlistPerson(person.id, { resultImage: data.url })
                                        } catch { /* upload failed — ignore */ }
                                    }
                                    reader.readAsDataURL(file)
                                }} />
                            </Button>
                        )}
                    </Box>
                </Box>

                <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }} />

                {/* Tester status section */}
                <Box sx={{ p: 2.5, pb: 1.5 }}>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1 }}>Тестер</Typography>
                    {([['agreedToTest', 'Согласился тестить'], ['loggedIn', 'Залогинился'], ['feedbackReceived', 'Дал фидбек']] as ['agreedToTest' | 'loggedIn' | 'feedbackReceived', string][]).map(([key, label]) => {
                        const done = !!person[key]
                        return (
                            <Box
                                key={key}
                                sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25, cursor: readOnly ? 'default' : 'pointer', '&:hover': readOnly ? {} : { backgroundColor: '#ffffff06' }, borderRadius: 0.5, px: 0.5 }}
                                onClick={readOnly ? undefined : () => updateShortlistPerson(person.id, { [key]: !done } as Partial<ShortlistPerson>)}
                            >
                                <Checkbox size="small" checked={done} disabled={readOnly} sx={{ p: 0.25, color: done ? '#3fb68e' : '#8b949e', '&.Mui-checked': { color: '#3fb68e' } }} />
                                <Typography sx={{ fontSize: '0.8rem', color: done ? '#3fb68e' : 'text.primary' }}>{label}</Typography>
                            </Box>
                        )
                    })}
                </Box>

                <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }} />

                {/* Notes section */}
                <Box sx={{ p: 2.5, pb: 1.5 }}>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1 }}>Заметки</Typography>
                    <TextField
                        size="small"
                        fullWidth
                        multiline
                        minRows={2}
                        maxRows={5}
                        variant="outlined"
                        value={person.notes}
                        onChange={e => updateShortlistPerson(person.id, { notes: e.target.value })}
                        placeholder={readOnly ? '—' : 'Заметки о контакте...'}
                        InputProps={{ readOnly }}
                        sx={{ '& .MuiInputBase-input': { fontSize: '0.8rem' }, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' } }}
                    />
                </Box>

                <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }} />

                {/* Templates section */}
                <Box sx={{ p: 2.5, pb: 1.5 }}>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1 }}>Шаблоны</Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.75 }}>
                        {templates.map(t => (
                            <Button
                                key={t.label}
                                size="small"
                                variant="outlined"
                                startIcon={<ContentCopyRoundedIcon sx={{ fontSize: '0.7rem' }} />}
                                onClick={() => copyToClipboard(t.text)}
                                sx={{ textTransform: 'none', fontSize: '0.72rem', justifyContent: 'flex-start', height: 32, borderColor: 'divider', color: 'text.secondary', '&:hover': { borderColor: 'primary.main', color: 'primary.main' } }}
                            >
                                {t.label}
                            </Button>
                        ))}
                    </Box>
                </Box>

                <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }} />

                {/* History section */}
                <Box sx={{ p: 2.5, pb: 2.5 }}>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1 }}>История</Typography>
                    {!readOnly && (
                        <Box sx={{ display: 'flex', gap: 0.75, mb: 1.5 }}>
                            <TextField
                                size="small"
                                fullWidth
                                variant="outlined"
                                value={historyInput}
                                onChange={e => setHistoryInput(e.target.value)}
                                placeholder="Добавить запись..."
                                onKeyDown={e => {
                                    if (e.key === 'Enter' && historyInput.trim()) {
                                        addHistory(person.id, historyInput.trim(), false)
                                        setHistoryInput('')
                                    }
                                }}
                                sx={{ '& .MuiInputBase-input': { fontSize: '0.8rem', py: 0.75 }, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' } }}
                            />
                            <Button
                                size="small"
                                variant="outlined"
                                disabled={!historyInput.trim()}
                                onClick={() => {
                                    if (historyInput.trim()) {
                                        addHistory(person.id, historyInput.trim(), false)
                                        setHistoryInput('')
                                    }
                                }}
                                sx={{ textTransform: 'none', fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                            >
                                Добавить
                            </Button>
                        </Box>
                    )}
                    {historyEntries.length === 0 ? (
                        <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>Пока нет записей.</Typography>
                    ) : (
                        <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
                            {historyEntries.map((entry, i) => (
                                <Box key={i} sx={{ display: 'flex', gap: 1, mb: 0.5, alignItems: 'baseline' }}>
                                    <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary', whiteSpace: 'nowrap', fontFamily: 'monospace' }}>
                                        {entry.date}
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.75rem', color: entry.auto ? '#8b949e' : 'text.primary' }}>
                                        {entry.text}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>

                {!readOnly && (
                    <>
                        <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }} />

                        {/* Archive / delete actions */}
                        <Box sx={{ p: 2.5, display: 'flex', gap: 1 }}>
                            <Button
                                size="small"
                                variant="outlined"
                                color="warning"
                                startIcon={<ArchiveRoundedIcon sx={{ fontSize: '0.8rem' }} />}
                                onClick={onRemoveFromOutreach}
                                sx={{ textTransform: 'none', fontSize: '0.75rem', borderColor: '#d2992244', color: '#d29922', '&:hover': { borderColor: '#d29922', backgroundColor: '#d2992211' } }}
                            >
                                В архив (проверен)
                            </Button>
                            <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                startIcon={<DeleteRoundedIcon sx={{ fontSize: '0.8rem' }} />}
                                onClick={onDeleteCompletely}
                                sx={{ textTransform: 'none', fontSize: '0.75rem', borderColor: '#f8514944', color: '#f85149', '&:hover': { borderColor: '#f85149', backgroundColor: '#f8514911' } }}
                            >
                                Удалить совсем
                            </Button>
                        </Box>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
