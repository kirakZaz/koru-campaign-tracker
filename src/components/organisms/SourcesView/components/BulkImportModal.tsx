import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import { parsePeopleBulk, personDedupKey } from '../sources.utils'
import type { SourcePerson } from '../SourcesView.types'

const FORMAT = `Для каждого человека — ОДНА строка. Поля разделяй вертикальной чертой « | »:
Имя | Ссылка | Должность | Страна | Сегмент | Заметки
Правила: Имя и Ссылка обязательны. Сегмент — одно из: agency / freelancer / in-house / other. Если поле неизвестно — оставь пустым, но сохрани « | ». Любую доп. инфо добавляй новыми полями через « | » (напр. …| Подписчики: 5k) — она попадёт в заметки. Выведи только строки, без заголовков и лишнего текста.`

interface BulkImportModalProps {
    open: boolean
    onClose: () => void
    existingKeys: Set<string>
    sourceTag: string
    onAdd: (rows: Array<Omit<SourcePerson, 'id'>>) => number
}

export default function BulkImportModal({ open, onClose, existingKeys, sourceTag, onAdd }: BulkImportModalProps) {
    const [text, setText] = React.useState('')
    const [copied, setCopied] = React.useState(false)

    const rows = React.useMemo(() => {
        const seen = new Set<string>()
        return parsePeopleBulk(text, sourceTag).map((r) => {
            const key = personDedupKey(r.person)
            const dup = r.valid && (existingKeys.has(key) || seen.has(key))
            if (r.valid) seen.add(key)
            return { ...r, dup }
        })
    }, [text, sourceTag, existingKeys])

    const toAdd = rows.filter((r) => r.valid && !r.dup)
    const dupCount = rows.filter((r) => r.dup).length
    const errCount = rows.filter((r) => !r.valid).length

    const copyFormat = () => { navigator.clipboard.writeText(FORMAT); setCopied(true); setTimeout(() => setCopied(false), 1500) }
    const handleAdd = () => { onAdd(toAdd.map((r) => r.person)); setText(''); onClose() }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 700 }}>Импорт списком</DialogTitle>
            <DialogContent>
                <Typography variant="body2" sx={{ mb: 1.5, color: 'text.secondary' }}>
                    Дай своему AI задание ниже + сырые данные, вставь его ответ в поле.
                </Typography>

                <Box sx={{ position: 'relative', backgroundColor: '#ffffff08', borderRadius: 1, p: 1.5, pr: 4, mb: 2 }}>
                    <IconButton size="small" onClick={copyFormat} sx={{ position: 'absolute', top: 4, right: 4, color: 'text.secondary' }} title="Скопировать формат">
                        <ContentCopyRoundedIcon fontSize="small" />
                    </IconButton>
                    <Typography sx={{ fontSize: '0.75rem', whiteSpace: 'pre-line', color: 'text.primary' }}>{FORMAT}</Typography>
                    {copied && <Typography sx={{ fontSize: '0.65rem', color: 'success.main', mt: 0.5 }}>Скопировано</Typography>}
                </Box>

                <TextField
                    multiline
                    minRows={5}
                    fullWidth
                    placeholder={'Вставь ответ AI сюда…\nИмя | Ссылка | Должность | Страна | Сегмент | Заметки'}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    sx={{ mb: 1.5, '& textarea': { fontSize: '0.8rem', fontFamily: 'monospace' } }}
                />

                {rows.length > 0 && (
                    <>
                        <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 0.5 }}>
                            Распознано {toAdd.length} · дублей {dupCount} · с ошибками {errCount}
                        </Typography>
                        <Box sx={{ maxHeight: 200, overflow: 'auto', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                            {rows.map((r) => (
                                <Box key={r.lineNo} sx={{ display: 'flex', gap: 1, alignItems: 'center', px: 1, py: 0.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                                    <Box component="span" sx={{ fontSize: '0.85rem' }}>{r.valid ? (r.dup ? '🔁' : '✅') : '⚠️'}</Box>
                                    <Box sx={{ minWidth: 0, flex: 1 }}>
                                        <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {r.person.name || '(без имени)'}
                                        </Typography>
                                        <Typography sx={{ fontSize: '0.65rem', color: r.valid ? 'text.secondary' : 'warning.main', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {r.valid ? (r.dup ? 'дубль — пропустим' : r.person.linkedinUrl) : r.reason}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    </>
                )}
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose} color="inherit">Отмена</Button>
                <Button onClick={handleAdd} variant="contained" disabled={toAdd.length === 0}>
                    Добавить {toAdd.length || ''}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
