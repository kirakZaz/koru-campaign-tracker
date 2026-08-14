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
import Chip from '@mui/material/Chip'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import TableChartRoundedIcon from '@mui/icons-material/TableChartRounded'
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded'
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import { OVERVIEW_INDEX, SOURCES_INDEX, PLAYBOOK_INDEX, DASHBOARD_INDEX, INSIGHTS_PHASES, getInsightsIndex } from '@/App'
import { formatShortDate, getViewerTimezone, getCampaignDate } from '@/utils/dateUtils'
import ProgressBar from '@/components/molecules/ProgressBar/ProgressBar'
import SidebarCalendar from './SidebarCalendar'
import type { SidebarProps } from './Sidebar.types'
import { styles } from './Sidebar.styles'

/** Date as "10/08" (DD/MM) for week-range labels. */
const formatDayMonth = (date: Date) =>
    new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', timeZone: getViewerTimezone() }).format(date)

/** Forward (пайплайн + релиз) weeks sit on top; historical campaign is archived below. */
const isForwardPhase = (phase: string) => phase.startsWith('Пайплайн') || phase === 'Релиз'

const Sidebar = React.memo(function Sidebar({
    days,
    currentDayIndex,
    startDate,
    isTaskCompleted,
    onDaySelect,
    onOpenSettings,
    globalAssigneeFilter,
    onGlobalAssigneeFilterChange,
    currentUser,
    onLogout
}: SidebarProps) {
    const activeRef = React.useRef<HTMLDivElement>(null)
    const [headerCollapsed, setHeaderCollapsed] = React.useState(false)
    const [railCollapsed, setRailCollapsed] = React.useState(false)
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

    // Forward weeks (пайплайн + релиз) on top in chronological order; the finished
    // campaign (Story 0 → Week 8) is archived below, newest-first.
    const orderedPhases = React.useMemo(() => {
        const forward = daysByPhase.filter((g) => isForwardPhase(g.phase))
        const past = daysByPhase.filter((g) => !isForwardPhase(g.phase))
        return [...forward, ...past.reverse()]
    }, [daysByPhase])

    const activePhase = React.useMemo(
        () => days.find((d) => d.dayIndex === currentDayIndex)?.phase ?? null,
        [days, currentDayIndex]
    )

    const [collapsedPhases, setCollapsedPhases] = React.useState<Set<string>>(new Set())
    const didInitCollapse = React.useRef(false)

    // First load: collapse every week except the one holding the active day.
    React.useEffect(() => {
        if (didInitCollapse.current || daysByPhase.length === 0) return
        didInitCollapse.current = true
        const initial = new Set(daysByPhase.map((g) => g.phase))
        if (activePhase) initial.delete(activePhase)
        setCollapsedPhases(initial)
    }, [daysByPhase, activePhase])

    // When the active day moves to another week, auto-open that week.
    React.useEffect(() => {
        if (!didInitCollapse.current || !activePhase) return
        setCollapsedPhases((prev) => {
            if (!prev.has(activePhase)) return prev
            const next = new Set(prev)
            next.delete(activePhase)
            return next
        })
    }, [activePhase])

    const togglePhase = React.useCallback((phase: string) => {
        setCollapsedPhases((prev) => {
            const next = new Set(prev)
            if (next.has(phase)) next.delete(phase)
            else next.add(phase)
            return next
        })
    }, [])

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

    const railNav = (index: number, Icon: typeof InfoOutlinedIcon, label: string) => (
        <Tooltip title={label} placement="right" key={label}>
            <IconButton
                onClick={() => onDaySelect(index)}
                size="small"
                sx={{ color: currentDayIndex === index ? 'primary.main' : 'text.secondary' }}
            >
                <Icon fontSize="small" />
            </IconButton>
        </Tooltip>
    )

    return (
        <Box sx={{ position: 'relative', height: '100%', flexShrink: 0, overflow: 'hidden', width: railCollapsed ? 56 : { xs: '100%', md: 300 }, transition: 'width 240ms cubic-bezier(0.4, 0, 0.2, 1)', borderRight: (t) => `1px solid ${t.palette.divider}` }}>
            <Box sx={{ ...styles.root, width: { xs: '100%', md: 300 }, borderRight: 'none', opacity: railCollapsed ? 0 : 1, transition: 'opacity 140ms ease', pointerEvents: railCollapsed ? 'none' : 'auto' }}>
            <Box sx={styles.header}>
                <Box>
                    <Typography sx={styles.logo}>KORU</Typography>
                    <Typography sx={styles.subtitle}>Campaign Tracker</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Tooltip title="Свернуть в полоску">
                        <IconButton size="small" onClick={() => setRailCollapsed(true)} sx={{ color: 'text.secondary' }}>
                            <KeyboardDoubleArrowLeftRoundedIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <IconButton size="small" onClick={() => setHeaderCollapsed(c => !c)} sx={{ color: 'text.secondary' }}>
                        {headerCollapsed ? <ExpandMoreRoundedIcon fontSize="small" /> : <ExpandLessRoundedIcon fontSize="small" />}
                    </IconButton>
                </Box>
            </Box>

            {!headerCollapsed && <Box sx={{ px: 2, pt: 1 }}>
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
                <Box sx={{ display: 'flex', gap: 0.5, mb: 1.5, flexWrap: 'wrap' }}>
                    {['Кира', 'Настя', 'Макс'].map((name) => (
                        <Chip
                            key={name}
                            label={name}
                            size="small"
                            onClick={() => onGlobalAssigneeFilterChange(globalAssigneeFilter === name ? null : name)}
                            variant={globalAssigneeFilter === name ? 'filled' : 'outlined'}
                            color={globalAssigneeFilter === name ? 'primary' : 'default'}
                            sx={{ fontSize: '0.7rem', fontWeight: 600, height: 24 }}
                        />
                    ))}
                </Box>
                <ProgressBar days={days} isTaskCompleted={isTaskCompleted} />
            </Box>}

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
                <>
                <Box sx={styles.pinnedNav}>
                    <Box
                        sx={styles.dayItem(currentDayIndex === OVERVIEW_INDEX, false)}
                        onClick={() => onDaySelect(OVERVIEW_INDEX)}
                    >
                        <InfoOutlinedIcon sx={{ fontSize: '0.9rem', color: currentDayIndex === OVERVIEW_INDEX ? 'primary.main' : 'text.secondary' }} />
                        <Typography sx={styles.dayTitle(currentDayIndex === OVERVIEW_INDEX)}>
                            Overview
                        </Typography>
                    </Box>
                    <Box
                        sx={styles.dayItem(currentDayIndex === SOURCES_INDEX, false)}
                        onClick={() => onDaySelect(SOURCES_INDEX)}
                    >
                        <TableChartRoundedIcon sx={{ fontSize: '0.9rem', color: currentDayIndex === SOURCES_INDEX ? 'primary.main' : 'text.secondary' }} />
                        <Typography sx={styles.dayTitle(currentDayIndex === SOURCES_INDEX)}>
                            Sources
                        </Typography>
                    </Box>
                    <Box
                        sx={styles.dayItem(currentDayIndex === PLAYBOOK_INDEX, false)}
                        onClick={() => onDaySelect(PLAYBOOK_INDEX)}
                    >
                        <MenuBookRoundedIcon sx={{ fontSize: '0.9rem', color: currentDayIndex === PLAYBOOK_INDEX ? 'primary.main' : 'text.secondary' }} />
                        <Typography sx={styles.dayTitle(currentDayIndex === PLAYBOOK_INDEX)}>
                            Playbook
                        </Typography>
                    </Box>
                    <Box
                        sx={styles.dayItem(currentDayIndex === DASHBOARD_INDEX, false)}
                        onClick={() => onDaySelect(DASHBOARD_INDEX)}
                    >
                        <BarChartRoundedIcon sx={{ fontSize: '0.9rem', color: currentDayIndex === DASHBOARD_INDEX ? 'primary.main' : 'text.secondary' }} />
                        <Typography sx={styles.dayTitle(currentDayIndex === DASHBOARD_INDEX)}>
                            Dashboard
                        </Typography>
                    </Box>
                </Box>
                <SidebarCalendar
                    days={days}
                    startDate={startDate}
                    currentDayIndex={currentDayIndex}
                    onDaySelect={onDaySelect}
                />
                <Box sx={styles.daysList}>
                    {orderedPhases.map((group) => {
                        const phaseIdx = INSIGHTS_PHASES.indexOf(group.phase as typeof INSIGHTS_PHASES[number])
                        const insightsIndex = phaseIdx >= 0 ? getInsightsIndex(phaseIdx) : null
                        const insightsActive = insightsIndex !== null && currentDayIndex === insightsIndex
                        const isCollapsed = collapsedPhases.has(group.phase)
                        const phaseCompleted = group.days.reduce((n, d) => n + d.tasks.filter((t) => isTaskCompleted(t.id)).length, 0)
                        const phaseTotal = group.days.reduce((n, d) => n + d.tasks.length, 0)

                        // Week range from the real campaign dates of this group's days.
                        const groupDates = startDate ? group.days.map((d) => getCampaignDate(startDate, d.dayIndex, d.calendarDayOffset)) : []
                        let weekRange = ''
                        if (groupDates.length) {
                            const times = groupDates.map((d) => d.getTime())
                            weekRange = `${formatDayMonth(new Date(Math.min(...times)))}-${formatDayMonth(new Date(Math.max(...times)))}`
                        }

                        return (
                            <React.Fragment key={group.phase}>
                                <Box
                                    sx={{ ...styles.phaseHeader, display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', userSelect: 'none', '&:hover': { color: 'text.primary' } }}
                                    onClick={() => togglePhase(group.phase)}
                                >
                                    {isCollapsed ? <ExpandMoreRoundedIcon sx={{ fontSize: '0.9rem' }} /> : <ExpandLessRoundedIcon sx={{ fontSize: '0.9rem' }} />}
                                    <Box component="span" sx={{ flex: 1 }}>{group.phase}{weekRange ? ` · ${weekRange}` : ''}</Box>
                                    <Box component="span" sx={{ fontWeight: 600, opacity: 0.85 }}>{phaseCompleted}/{phaseTotal}</Box>
                                </Box>
                                {!isCollapsed && group.days.map((day) => {
                                    const isActive = day.dayIndex === currentDayIndex
                                    const completedCount = day.tasks.filter((t) => isTaskCompleted(t.id)).length
                                    const totalCount = day.tasks.length
                                    const allDone = completedCount === totalCount && totalCount > 0

                                    // Real campaign date for this day (matches the calendar + week title).
                                    const dayDate = startDate ? getCampaignDate(startDate, day.dayIndex, day.calendarDayOffset) : null

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
                                                    {dayDate ? formatShortDate(dayDate) : day.dayIndex + 1}
                                                </Typography>
                                            )}
                                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                                <Typography sx={styles.dayTitle(isActive)}>
                                                    {day.title}
                                                </Typography>
                                            </Box>
                                            <Typography sx={styles.dayProgress}>
                                                {completedCount}/{totalCount}
                                            </Typography>
                                        </Box>
                                    )
                                })}
                                {!isCollapsed && insightsIndex !== null && (
                                    <Box
                                        sx={{
                                            ...styles.dayItem(insightsActive, false),
                                            pl: 3,
                                            opacity: insightsActive ? 1 : 0.7,
                                            '&:hover': { opacity: 1, backgroundColor: '#ffffff06' }
                                        }}
                                        onClick={() => onDaySelect(insightsIndex)}
                                    >
                                        <LightbulbOutlinedIcon sx={{ fontSize: '0.8rem', color: insightsActive ? '#d29922' : 'text.secondary' }} />
                                        <Typography sx={{
                                            fontSize: '0.75rem',
                                            fontWeight: insightsActive ? 700 : 500,
                                            color: insightsActive ? '#d29922' : 'text.secondary'
                                        }}>
                                            Выводы
                                        </Typography>
                                    </Box>
                                )}
                            </React.Fragment>
                        )
                    })}
                </Box>
                </>
            )}

            <Box
                sx={{
                    p: 1.5,
                    borderTop: (t) => `1px solid ${t.palette.divider}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}
            >
                <Tooltip title="Настройки">
                    <IconButton onClick={onOpenSettings} size="small" sx={{ color: 'text.secondary' }}>
                        <SettingsRoundedIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Typography sx={{ flex: 1, fontSize: '0.8rem', fontWeight: 600, color: 'text.secondary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {currentUser.name}
                </Typography>
                <Button
                    size="small"
                    onClick={onLogout}
                    startIcon={<LogoutRoundedIcon sx={{ fontSize: '0.9rem' }} />}
                    sx={{ color: 'text.secondary', fontSize: '0.7rem', textTransform: 'none' }}
                >
                    Выйти
                </Button>
            </Box>
            </Box>

            <Box sx={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 56, display: 'flex', flexDirection: 'column', alignItems: 'center', py: 1, gap: 0.5, backgroundColor: 'background.default', opacity: railCollapsed ? 1 : 0, transition: 'opacity 180ms ease', pointerEvents: railCollapsed ? 'auto' : 'none' }}>
                <Tooltip title="Развернуть" placement="right">
                    <IconButton onClick={() => setRailCollapsed(false)} size="small" sx={{ color: 'text.secondary' }}>
                        <KeyboardDoubleArrowRightRoundedIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Box sx={{ height: 8 }} />
                {railNav(OVERVIEW_INDEX, InfoOutlinedIcon, 'Overview')}
                {railNav(SOURCES_INDEX, TableChartRoundedIcon, 'Sources')}
                {railNav(PLAYBOOK_INDEX, MenuBookRoundedIcon, 'Playbook')}
                {railNav(DASHBOARD_INDEX, BarChartRoundedIcon, 'Dashboard')}
                <Box sx={{ flex: 1 }} />
                <Tooltip title="Настройки" placement="right">
                    <IconButton onClick={onOpenSettings} size="small" sx={{ color: 'text.secondary' }}>
                        <SettingsRoundedIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    )
})

export default Sidebar
