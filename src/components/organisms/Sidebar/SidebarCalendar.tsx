import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import type { CampaignDay } from '@/data/campaignData.types'
import { getCampaignDate, getToday } from '@/utils/dateUtils'

interface SidebarCalendarProps {
    days: CampaignDay[]
    startDate: string | null
    currentDayIndex: number
    onDaySelect: (dayIndex: number) => void
}

type CalView = 'month' | 'week'

const WEEKDAYS = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

const isoKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const addDays = (d: Date, n: number) => { const x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); x.setDate(x.getDate() + n); return x }
const startOfWeekSun = (d: Date) => addDays(d, -d.getDay())

interface DayInfo { dayIndex: number; total: number; done: number }

export default function SidebarCalendar({ days, startDate, currentDayIndex, onDaySelect }: SidebarCalendarProps) {
    const [view, setView] = React.useState<CalView>('month')
    const today = React.useMemo(() => getToday(), [])
    const [cursor, setCursor] = React.useState<Date>(() => new Date(today.getFullYear(), today.getMonth(), 1))

    // date (YYYY-MM-DD) → campaign day info
    const byDate = React.useMemo(() => {
        const m = new Map<string, DayInfo>()
        if (!startDate) return m
        for (const d of days) {
            const dt = getCampaignDate(startDate, d.dayIndex, d.calendarDayOffset)
            m.set(isoKey(dt), {
                dayIndex: d.dayIndex,
                total: d.tasks.length,
                done: d.tasks.filter((t) => t.completed).length
            })
        }
        return m
    }, [days, startDate])

    const selectedKey = React.useMemo(() => {
        if (!startDate) return null
        const day = days.find((d) => d.dayIndex === currentDayIndex)
        return day ? isoKey(getCampaignDate(startDate, day.dayIndex, day.calendarDayOffset)) : null
    }, [days, startDate, currentDayIndex])

    const todayKey = isoKey(today)

    const cells = React.useMemo(() => {
        if (view === 'week') {
            const start = startOfWeekSun(cursor)
            return Array.from({ length: 7 }, (_, i) => addDays(start, i))
        }
        const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1)
        const start = startOfWeekSun(first)
        return Array.from({ length: 42 }, (_, i) => addDays(start, i))
    }, [cursor, view])

    const label = view === 'week'
        ? (() => {
            const s = startOfWeekSun(cursor)
            const e = addDays(s, 6)
            return `${s.getDate()} ${MONTHS[s.getMonth()]!.slice(0, 3)} – ${e.getDate()} ${MONTHS[e.getMonth()]!.slice(0, 3)}`
        })()
        : `${MONTHS[cursor.getMonth()]} ${cursor.getFullYear()}`

    const step = React.useCallback((dir: number) => {
        setCursor((prev) => view === 'week'
            ? addDays(prev, dir * 7)
            : new Date(prev.getFullYear(), prev.getMonth() + dir, 1))
    }, [view])

    const goToday = React.useCallback(() => {
        setCursor(view === 'week' ? startOfWeekSun(today) : new Date(today.getFullYear(), today.getMonth(), 1))
    }, [view, today])

    return (
        <Box sx={{ px: 1.5, pt: 1, pb: 0.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                <IconButton size="small" onClick={() => step(-1)} sx={{ color: 'text.secondary' }}>
                    <ChevronLeftRoundedIcon fontSize="small" />
                </IconButton>
                <Typography
                    onClick={goToday}
                    sx={{ flex: 1, textAlign: 'center', fontSize: '0.8rem', fontWeight: 700, textTransform: 'capitalize', cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
                >
                    {label}
                </Typography>
                <IconButton size="small" onClick={() => step(1)} sx={{ color: 'text.secondary' }}>
                    <ChevronRightRoundedIcon fontSize="small" />
                </IconButton>
                <Select
                    value={view}
                    onChange={(e) => setView(e.target.value as CalView)}
                    size="small"
                    sx={{ ml: 0.5, fontSize: '0.7rem', '& .MuiSelect-select': { py: 0.4, pl: 1, pr: '20px !important' } }}
                >
                    <MenuItem value="month" sx={{ fontSize: '0.75rem' }}>Месяц</MenuItem>
                    <MenuItem value="week" sx={{ fontSize: '0.75rem' }}>Неделя</MenuItem>
                </Select>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 0.25 }}>
                {WEEKDAYS.map((w) => (
                    <Typography key={w} sx={{ textAlign: 'center', fontSize: '0.6rem', fontWeight: 700, color: 'text.secondary', pb: 0.5 }}>
                        {w}
                    </Typography>
                ))}
                {cells.map((date) => {
                    const key = isoKey(date)
                    const info = byDate.get(key)
                    const inMonth = view === 'week' || date.getMonth() === cursor.getMonth()
                    const isToday = key === todayKey
                    const isSelected = key === selectedKey
                    const allDone = info ? info.total > 0 && info.done === info.total : false
                    const dotColor = info ? (allDone ? 'success.main' : 'primary.main') : 'transparent'

                    return (
                        <Box
                            key={key}
                            onClick={info ? () => onDaySelect(info.dayIndex) : undefined}
                            sx={{
                                minHeight: 28,
                                py: 0.4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 1,
                                cursor: info ? 'pointer' : 'default',
                                opacity: inMonth ? 1 : 0.35,
                                backgroundColor: isToday ? 'primary.main' : (isSelected ? '#3fb68e22' : 'transparent'),
                                border: isSelected && !isToday ? '1px solid' : '1px solid transparent',
                                borderColor: isSelected && !isToday ? 'primary.main' : 'transparent',
                                transition: 'background-color 120ms ease',
                                '&:hover': info ? { backgroundColor: isToday ? 'primary.main' : '#ffffff10' } : undefined
                            }}
                        >
                            <Typography sx={{
                                fontSize: '0.72rem',
                                lineHeight: 1,
                                fontWeight: isToday || isSelected ? 700 : 500,
                                color: isToday ? '#0d1117' : (info ? 'text.primary' : 'text.secondary')
                            }}>
                                {date.getDate()}
                            </Typography>
                            <Box sx={{ height: 4, mt: 0.25, display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: isToday ? '#0d1117' : dotColor }} />
                            </Box>
                        </Box>
                    )
                })}
            </Box>
        </Box>
    )
}
