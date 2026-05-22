import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import { getCampaignDate, formatShortDate } from '@/utils/dateUtils'
import ProgressBar from '@/components/molecules/ProgressBar/ProgressBar'
import type { SidebarProps } from './Sidebar.types'
import { styles } from './Sidebar.styles'

const Sidebar = React.memo(function Sidebar({
    days,
    currentDayIndex,
    startDate,
    isTaskCompleted,
    onDaySelect,
    onOpenSettings
}: SidebarProps) {
    const activeRef = React.useRef<HTMLDivElement>(null)
    const [globalSearch, setGlobalSearch] = React.useState('')

    React.useEffect(() => {
        if (activeRef.current && !globalSearch) {
            activeRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
        }
    }, [currentDayIndex, globalSearch])

    const daysByPhase = React.useMemo(() => {
        const groups: { phase: string, days: typeof days }[] = []
        let currentPhase = ''
        for (const day of days) {
            if (day.phase !== currentPhase) {
                currentPhase = day.phase
                groups.push({ phase: currentPhase, days: [] })
            }
            groups[groups.length - 1]!.days.push(day)
        }
        return groups
    }, [days])

    const searchResults = React.useMemo(() => {
        if (!globalSearch.trim()) {
            return null
        }
        const q = globalSearch.toLowerCase()
        const results: { dayIndex: number, dayTitle: string, taskId: string, taskTitle: string }[] = []
        for (const day of days) {
            for (const task of day.tasks) {
                if (
                    task.id.toLowerCase().includes(q) ||
                    task.title.toLowerCase().includes(q) ||
                    task.description.toLowerCase().includes(q) ||
                    task.assignee.toLowerCase().includes(q) ||
                    task.tags.some((t) => t.toLowerCase().includes(q))
                ) {
                    results.push({
                        dayIndex: day.dayIndex,
                        dayTitle: day.dayLabel,
                        taskId: task.id,
                        taskTitle: task.title
                    })
                }
            }
        }
        return results
    }, [globalSearch, days])

    const handleSearchChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setGlobalSearch(e.target.value)
    }, [])

    const handleClearSearch = React.useCallback(() => {
        setGlobalSearch('')
    }, [])

    const handleResultClick = React.useCallback((dayIndex: number) => {
        onDaySelect(dayIndex)
        setGlobalSearch('')
    }, [onDaySelect])

    return (
        <Box sx={styles.root}>
            <Box sx={styles.header}>
                <Box>
                    <Typography sx={styles.logo}>KORU</Typography>
                    <Typography sx={styles.subtitle}>Campaign Tracker</Typography>
                </Box>
                <IconButton onClick={onOpenSettings} size="small" sx={{ color: 'text.secondary' }}>
                    <SettingsRoundedIcon />
                </IconButton>
            </Box>

            <Box sx={{ px: 2, pt: 2 }}>
                <TextField
                    size="small"
                    fullWidth
                    placeholder="Поиск по всем задачам... (номер, текст, assignee)"
                    value={globalSearch}
                    onChange={handleSearchChange}
                    sx={{ mb: 1.5, '& .MuiOutlinedInput-root': { fontSize: '0.8rem' } }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchRoundedIcon sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                            </InputAdornment>
                        ),
                        endAdornment: globalSearch ? (
                            <InputAdornment position="end">
                                <IconButton size="small" onClick={handleClearSearch}>
                                    <CloseRoundedIcon sx={{ fontSize: '0.9rem' }} />
                                </IconButton>
                            </InputAdornment>
                        ) : null
                    }}
                />
                <ProgressBar days={days} isTaskCompleted={isTaskCompleted} />
            </Box>

            {searchResults ? (
                <Box sx={styles.daysList}>
                    <Typography sx={{ ...styles.phaseHeader, color: 'primary.main' }}>
                        Результаты: {searchResults.length}
                    </Typography>
                    {searchResults.length === 0 && (
                        <Typography sx={{ px: 2, py: 1, color: 'text.secondary', fontSize: '0.8rem' }}>
                            Ничего не найдено
                        </Typography>
                    )}
                    {searchResults.map((r) => (
                        <Box
                            key={`${r.dayIndex}-${r.taskId}`}
                            sx={{
                                px: 2,
                                py: 1,
                                cursor: 'pointer',
                                borderLeft: '3px solid transparent',
                                '&:hover': { backgroundColor: '#ffffff06' }
                            }}
                            onClick={() => handleResultClick(r.dayIndex)}
                        >
                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'text.primary' }}>
                                {r.taskTitle}
                            </Typography>
                            <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>
                                {r.dayTitle}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            ) : (
                <Box sx={styles.daysList}>
                    {daysByPhase.map((group) => (
                        <React.Fragment key={group.phase}>
                            <Typography sx={styles.phaseHeader}>
                                {group.phase}
                            </Typography>
                            {group.days.map((day) => {
                                const isActive = day.dayIndex === currentDayIndex
                                const completedCount = day.tasks.filter((t) => isTaskCompleted(t.id)).length
                                const totalCount = day.tasks.length
                                const allDone = completedCount === totalCount && totalCount > 0

                                return (
                                    <Box
                                        key={day.dayIndex}
                                        ref={isActive ? activeRef : undefined}
                                        sx={styles.dayItem(isActive, allDone)}
                                        onClick={() => onDaySelect(day.dayIndex)}
                                    >
                                        {allDone ? (
                                            <CheckCircleRoundedIcon sx={{ fontSize: '0.9rem', color: 'success.main' }} />
                                        ) : (
                                            <Typography sx={styles.dayNumber}>
                                                {day.dayIndex + 1}
                                            </Typography>
                                        )}
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Typography sx={styles.dayTitle(isActive)}>
                                                {day.title}
                                            </Typography>
                                            {startDate && (
                                                <Typography sx={styles.dateLabel}>
                                                    {formatShortDate(getCampaignDate(startDate, day.dayIndex))}
                                                </Typography>
                                            )}
                                        </Box>
                                        <Typography sx={styles.dayProgress}>
                                            {completedCount}/{totalCount}
                                        </Typography>
                                    </Box>
                                )
                            })}
                        </React.Fragment>
                    ))}
                </Box>
            )}
        </Box>
    )
})

export default Sidebar
