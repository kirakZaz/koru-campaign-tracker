import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import InputAdornment from '@mui/material/InputAdornment'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import Button from '@mui/material/Button'
import PhaseChip from '@/components/atoms/PhaseChip/PhaseChip'
import TaskCard from '@/components/molecules/TaskCard/TaskCard'
import type { Assignee } from '@/data/campaignData.types'
import type { DayViewProps } from './DayView.types'
import { styles } from './DayView.styles'

const ASSIGNEE_FILTERS: Assignee[] = ['Кира', 'Настя', 'Макс', 'Кира + Настя', 'Кира + Макс', 'Настя → Кира']

const DayView = React.memo(function DayView({
    day,
    isTaskCompleted,
    onToggleTask,
    onEditTask,
    note,
    onNoteChange,
    overdueDays,
    onGoToDay,
    allDays,
    onMoveTask,
    onSaveDayOverride
}: DayViewProps) {
    const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
    const [searchQuery, setSearchQuery] = React.useState('')
    const [assigneeFilter, setAssigneeFilter] = React.useState<Assignee | null>(null)

    const handleNoteChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (debounceRef.current) {
            clearTimeout(debounceRef.current)
        }
        debounceRef.current = setTimeout(() => {
            onNoteChange(value)
        }, 500)
    }, [onNoteChange])

    const handleSearchChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }, [])

    const handleAssigneeClick = React.useCallback((assignee: Assignee) => {
        setAssigneeFilter((prev) => prev === assignee ? null : assignee)
    }, [])

    const filteredTasks = React.useMemo(() => {
        let tasks = day.tasks
        if (assigneeFilter) {
            tasks = tasks.filter((t) => t.assignee === assigneeFilter)
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase()
            tasks = tasks.filter((t) =>
                t.title.toLowerCase().includes(q) ||
                t.description.toLowerCase().includes(q) ||
                t.tags.some((tag) => tag.toLowerCase().includes(q))
            )
        }
        return tasks
    }, [day.tasks, assigneeFilter, searchQuery])

    const completedTasks = day.tasks.filter((t) => isTaskCompleted(t.id)).length
    const totalTasks = day.tasks.length

    const usedAssignees = React.useMemo(() => {
        const set = new Set(day.tasks.map((t) => t.assignee))
        return ASSIGNEE_FILTERS.filter((a) => set.has(a))
    }, [day.tasks])

    return (
        <Box sx={styles.root}>
            <Box sx={styles.dayHeader}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                    <PhaseChip phase={day.phase} />
                    <Typography sx={styles.dayLabel}>
                        {day.dayLabel}
                    </Typography>
                    <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', fontWeight: 600 }}>
                        {completedTasks}/{totalTasks} задач
                    </Typography>
                </Box>
                <Typography
                    sx={{ ...styles.dayTitle, cursor: onSaveDayOverride ? 'text' : 'default', '&:hover': onSaveDayOverride ? { outline: '1px solid #30363d', borderRadius: 1, px: 0.5, mx: -0.5 } : {} }}
                    contentEditable={!!onSaveDayOverride}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                        const newTitle = e.currentTarget.textContent || ''
                        if (newTitle !== day.title && onSaveDayOverride) onSaveDayOverride(day.dayIndex, { title: newTitle, summary: day.summary })
                    }}
                >
                    {day.title}
                </Typography>
                <Typography
                    sx={{ ...styles.daySummary, cursor: onSaveDayOverride ? 'text' : 'default', '&:hover': onSaveDayOverride ? { outline: '1px solid #30363d', borderRadius: 1, px: 0.5, mx: -0.5 } : {} }}
                    contentEditable={!!onSaveDayOverride}
                    suppressContentEditableWarning
                    onBlur={(e) => {
                        const newSummary = e.currentTarget.textContent || ''
                        if (newSummary !== day.summary && onSaveDayOverride) onSaveDayOverride(day.dayIndex, { title: day.title, summary: newSummary })
                    }}
                >
                    {day.summary}
                </Typography>
                {day.keyMetric && (
                    <Box sx={styles.keyMetric}>
                        {day.keyMetric}
                    </Box>
                )}
            </Box>

            {overdueDays.length > 0 && (
                <Box sx={{
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: '#f8514911',
                    border: '1px solid #f8514933'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <WarningAmberRoundedIcon sx={{ fontSize: '1rem', color: '#f85149' }} />
                        <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: '#f85149' }}>
                            Незавершённые задачи за прошлые дни
                        </Typography>
                    </Box>
                    {overdueDays.map((od) => (
                        <Box key={od.dayIndex} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 0.5 }}>
                            <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                                {od.dayLabel}: {od.unfinishedCount} незавершённых
                                {od.highPriorityCount > 0 && (
                                    <Typography component="span" sx={{ color: '#f85149', fontWeight: 700, fontSize: '0.8rem', ml: 0.5 }}>
                                        ({od.highPriorityCount} critical)
                                    </Typography>
                                )}
                            </Typography>
                            <Button
                                size="small"
                                onClick={() => onGoToDay(od.dayIndex)}
                                sx={{ fontSize: '0.7rem', fontWeight: 600, minWidth: 0, px: 1 }}
                            >
                                Открыть
                            </Button>
                        </Box>
                    ))}
                </Box>
            )}

            {day.tasks.length > 2 && (
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                    <TextField
                        size="small"
                        placeholder="Поиск задач..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        sx={{ width: 220, '& .MuiOutlinedInput-root': { fontSize: '0.8rem' } }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchRoundedIcon sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                                </InputAdornment>
                            )
                        }}
                    />
                    {usedAssignees.map((assignee) => (
                        <Chip
                            key={assignee}
                            label={assignee}
                            size="small"
                            onClick={() => handleAssigneeClick(assignee)}
                            variant={assigneeFilter === assignee ? 'filled' : 'outlined'}
                            color={assigneeFilter === assignee ? 'primary' : 'default'}
                            sx={{ fontSize: '0.75rem', fontWeight: 600 }}
                        />
                    ))}
                </Box>
            )}

            <Box sx={styles.tasksList}>
                {filteredTasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        isTaskCompleted={isTaskCompleted}
                        onToggleTask={onToggleTask}
                        onEditTask={onEditTask}
                        currentDayIndex={day.dayIndex}
                        allDays={allDays}
                        onMoveTask={onMoveTask}
                    />
                ))}
                {filteredTasks.length === 0 && day.tasks.length > 0 && (
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem', py: 2 }}>
                        Нет задач по фильтру
                    </Typography>
                )}
            </Box>

            <Box sx={styles.noteSection}>
                <Typography sx={styles.noteLabel}>
                    Заметки на день
                </Typography>
                <TextField
                    multiline
                    minRows={2}
                    maxRows={6}
                    fullWidth
                    placeholder="Записать что-то на этот день..."
                    defaultValue={note}
                    onChange={handleNoteChange}
                    variant="outlined"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            fontSize: '0.875rem'
                        }
                    }}
                />
            </Box>
        </Box>
    )
})

export default DayView
