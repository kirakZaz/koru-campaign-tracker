import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import TextField from '@mui/material/TextField'
import AssigneeChip from '@/components/atoms/AssigneeChip/AssigneeChip'
import type { TaskCardProps } from './TaskCard.types'
import { styles } from './TaskCard.styles'


const EditableCopyBlock = React.memo(function EditableCopyBlock({ label, text, editable, onSave }: { label: string, text: string, editable: boolean, onSave: (text: string) => void }) {
    const [editing, setEditing] = React.useState(false)
    const [value, setValue] = React.useState(text)
    const [copied, setCopied] = React.useState(false)

    React.useEffect(() => { setValue(text) }, [text])

    if (editing) {
        return (
            <Box sx={{ mt: 2, mb: 1 }}>
                <Typography sx={styles.stepsTitle}>{label}</Typography>
                <TextField
                    multiline fullWidth size="small" autoFocus value={value}
                    onChange={e => setValue(e.target.value)}
                    onBlur={() => { onSave(value); setEditing(false) }}
                    onKeyDown={e => { if (e.key === 'Escape') { setValue(text); setEditing(false) } }}
                    sx={{ '& .MuiInputBase-input': { fontSize: '0.85rem', fontFamily: '"Raleway", sans-serif', lineHeight: 1.7, color: '#e6edf3' }, '& .MuiOutlinedInput-root': { backgroundColor: '#0d1117', border: '1px solid #30363d', borderRadius: 1.5 }, '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
                />
            </Box>
        )
    }

    return (
        <Box sx={{ mt: 2, mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography sx={styles.stepsTitle}>{label}</Typography>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {editable && (
                        <IconButton size="small" onClick={() => setEditing(true)} sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                            <EditRoundedIcon sx={{ fontSize: '0.8rem' }} />
                        </IconButton>
                    )}
                    <IconButton size="small" onClick={() => { void navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }} sx={{ color: copied ? 'success.main' : 'text.secondary' }}>
                        {copied ? <CheckRoundedIcon fontSize="small" /> : <ContentCopyRoundedIcon fontSize="small" />}
                    </IconButton>
                </Box>
            </Box>
            <Box sx={{ p: 2, borderRadius: 1.5, backgroundColor: '#0d1117', border: '1px solid #30363d', whiteSpace: 'pre-wrap' as const, fontSize: '0.85rem', lineHeight: 1.7, color: '#e6edf3', fontFamily: '"Raleway", sans-serif', maxHeight: 400, overflow: 'auto', cursor: editable ? 'pointer' : 'default', '&:hover': editable ? { borderColor: 'primary.main' } : {} }}
                onDoubleClick={editable ? () => setEditing(true) : undefined}
                onClick={() => { void navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
            >
                {text}
            </Box>
            {copied && <Typography sx={{ fontSize: '0.7rem', color: 'success.main', mt: 0.5, fontWeight: 600 }}>Скопировано!</Typography>}
        </Box>
    )
})

const TaskCard = React.memo(function TaskCard({ task, isTaskCompleted, onToggleTask, onEditTask, currentDayIndex, allDays, onMoveTask, onUpdateTask, onDeleteTask }: TaskCardProps) {
    const [expanded, setExpanded] = React.useState(false)

    const taskCompleted = isTaskCompleted(task.id)
    const completedSubtasks = task.subtasks.filter((st) => isTaskCompleted(st.id)).length
    const totalSubtasks = task.subtasks.length

    const handleToggleExpand = React.useCallback(() => {
        setExpanded((prev) => !prev)
    }, [])

    const handleToggleMainTask = React.useCallback((e: React.MouseEvent) => {
        e.stopPropagation()
        onToggleTask(task.id)
    }, [onToggleTask, task.id])

    const handleToggleSubtask = React.useCallback((subtaskId: string) => {
        return (e: React.MouseEvent) => {
            e.stopPropagation()
            onToggleTask(subtaskId)
        }
    }, [onToggleTask])

    return (
        <Paper elevation={0} sx={styles.card(taskCompleted)}>
            <Box sx={styles.header} onClick={handleToggleExpand}>
                <Checkbox
                    checked={taskCompleted}
                    onClick={handleToggleMainTask}
                    sx={{ p: 0, mt: 0.25 }}
                    color="success"
                />
                <Box sx={styles.headerLeft}>
                    <Box sx={styles.titleRow}>
                        <Typography
                            sx={{ ...styles.title(taskCompleted), cursor: onUpdateTask ? 'text' : 'default', '&:hover': onUpdateTask ? { outline: '1px solid #30363d', borderRadius: 1 } : {} }}
                            contentEditable={!!onUpdateTask}
                            suppressContentEditableWarning
                            onClick={onUpdateTask ? (e: React.MouseEvent) => e.stopPropagation() : undefined}
                            onBlur={onUpdateTask ? (e: React.FocusEvent) => { const v = e.currentTarget.textContent || ''; if (v !== task.title) onUpdateTask(task.id, { title: v }) } : undefined}
                        >
                            {task.title}
                        </Typography>
                    </Box>
                    <Typography
                        sx={{ ...styles.description, cursor: onUpdateTask ? 'text' : 'default', '&:hover': onUpdateTask ? { outline: '1px solid #30363d', borderRadius: 1 } : {} }}
                        contentEditable={!!onUpdateTask}
                        suppressContentEditableWarning
                        onClick={onUpdateTask ? (e: React.MouseEvent) => e.stopPropagation() : undefined}
                        onBlur={onUpdateTask ? (e: React.FocusEvent) => { const v = e.currentTarget.textContent || ''; if (v !== task.description) onUpdateTask(task.id, { description: v }) } : undefined}
                    >
                        {task.description}
                    </Typography>
                    <Box sx={styles.chips}>
                        <AssigneeChip assignee={task.assignee} />
                        <Box component="span" sx={styles.estimate}>{task.estimate}</Box>
                        {totalSubtasks > 0 && (
                            <Box component="span" sx={styles.progressText}>
                                {completedSubtasks}/{totalSubtasks}
                            </Box>
                        )}
                        {!expanded && (task.tip || task.warning) && (
                            <ChatBubbleOutlineRoundedIcon sx={{ fontSize: '0.85rem', color: task.warning ? 'warning.main' : 'info.main', ml: 0.5 }} />
                        )}
                        {allDays && onMoveTask && (() => {
                            const phases = [...new Set(allDays.map(d => d.phase))]
                            const currentPhase = allDays.find(d => d.dayIndex === currentDayIndex)?.phase ?? phases[0]
                            const daysInPhase = allDays.filter(d => d.phase === currentPhase)
                            const selectSx = { fontSize: '0.7rem', height: 24, minWidth: 0, '& .MuiSelect-select': { py: 0, px: 0.75, fontSize: '0.7rem' }, '& .MuiOutlinedInput-notchedOutline': { borderColor: '#30363d' } }
                            return (
                                <Box sx={{ display: 'flex', gap: 0.5, ml: 0.5 }} onClick={e => e.stopPropagation()}>
                                    <Select size="small" value={currentPhase} onChange={e => { const firstDay = allDays.find(d => d.phase === e.target.value); if (firstDay) onMoveTask(task.id, firstDay.dayIndex) }} sx={selectSx}>
                                        {phases.map(p => <MenuItem key={p} value={p} sx={{ fontSize: '0.7rem' }}>{p}</MenuItem>)}
                                    </Select>
                                    <Select size="small" value={currentDayIndex ?? ''} onChange={e => onMoveTask(task.id, Number(e.target.value))} sx={selectSx}>
                                        {daysInPhase.map(d => <MenuItem key={d.dayIndex} value={d.dayIndex} sx={{ fontSize: '0.7rem' }}>{d.dayLabel.split(', ')[1] || d.dayLabel}</MenuItem>)}
                                    </Select>
                                </Box>
                            )
                        })()}
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <IconButton size="small" sx={{ color: 'text.secondary' }}>
                        {expanded ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
                    </IconButton>
                    <IconButton
                        size="small"
                        sx={{ color: 'text.secondary' }}
                        onClick={(e) => { e.stopPropagation(); onEditTask(task) }}
                    >
                        <EditRoundedIcon fontSize="small" />
                    </IconButton>
                    {onDeleteTask && (
                        <IconButton
                            size="small"
                            sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}
                            onClick={(e) => { e.stopPropagation(); if (window.confirm('Удалить задачу?')) onDeleteTask(task.id) }}
                        >
                            <DeleteOutlineRoundedIcon fontSize="small" />
                        </IconButton>
                    )}
                </Box>
            </Box>

            <Collapse in={expanded}>
                <Box sx={styles.expandedContent}>
                    {task.warning && (
                        <Box sx={styles.warning}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                <WarningAmberRoundedIcon sx={{ fontSize: '1rem', mt: 0.25 }} />
                                <span>{task.warning}</span>
                            </Box>
                        </Box>
                    )}

                    <Typography sx={styles.stepsTitle}>
                        Шаги
                    </Typography>
                    {task.steps.map((step, i) => (
                        <Box key={i} sx={styles.step}>
                            <Typography component="span" sx={{ fontWeight: 700, color: 'primary.main', mr: 1 }}>
                                {i + 1}.
                            </Typography>
                            {step}
                        </Box>
                    ))}

                    {task.image && (
                        <Box sx={{ mb: 1.5, p: 1.5, borderRadius: 1.5, backgroundColor: '#3fb68e0a', border: '1px solid', borderColor: '#3fb68e33', display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#3fb68e' }}>
                                Creatives → {task.image}
                            </Typography>
                            <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>
                                Скриншот карточки для поста
                            </Typography>
                        </Box>
                    )}

                    {task.copyBlocks && task.copyBlocks.length > 0 && task.copyBlocks.map((block, idx) => (
                        <EditableCopyBlock key={idx} label={block.label} text={block.text} editable={!!onUpdateTask} onSave={(newText) => {
                            if (onUpdateTask && newText !== block.text) {
                                const newBlocks = [...(task.copyBlocks || [])]
                                newBlocks[idx] = { ...block, text: newText }
                                onUpdateTask(task.id, { copyBlocks: newBlocks })
                            }
                        }} />
                    ))}

                    {totalSubtasks > 0 && (
                        <>
                            <Typography sx={styles.stepsTitle}>
                                Чек-лист ({completedSubtasks}/{totalSubtasks})
                            </Typography>
                            {task.subtasks.map((st) => (
                                <Box key={st.id} sx={styles.subtaskRow}>
                                    <Checkbox
                                        checked={isTaskCompleted(st.id)}
                                        onClick={handleToggleSubtask(st.id)}
                                        size="small"
                                        sx={{ p: 0, mt: 0.25 }}
                                        color="success"
                                    />
                                    <Typography sx={styles.subtaskText(isTaskCompleted(st.id))}>
                                        {st.text}
                                    </Typography>
                                </Box>
                            ))}
                        </>
                    )}

                    {task.tip && (
                        <Box sx={styles.tip}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                                <LightbulbOutlinedIcon sx={{ fontSize: '1rem', mt: 0.25 }} />
                                <span>{task.tip}</span>
                            </Box>
                        </Box>
                    )}
                </Box>
            </Collapse>
        </Paper>
    )
})

export default TaskCard
