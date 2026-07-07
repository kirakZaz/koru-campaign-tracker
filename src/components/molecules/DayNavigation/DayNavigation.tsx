import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import TodayRoundedIcon from '@mui/icons-material/TodayRounded'
import { getCampaignDate, formatCampaignDate, formatFullDateTime } from '@/utils/dateUtils'
import type { DayNavigationProps } from './DayNavigation.types'
import { styles } from './DayNavigation.styles'

const DayNavigation = React.memo(function DayNavigation({
    currentDayIndex,
    allDayIndexes,
    calendarDayOffsets,
    startDate,
    onDayChange,
    onGoToToday
}: DayNavigationProps) {
    const currentPos = allDayIndexes.indexOf(currentDayIndex)
    const [clock, setClock] = React.useState(() => formatFullDateTime())

    React.useEffect(() => {
        const id = setInterval(() => setClock(formatFullDateTime()), 60_000)
        return () => clearInterval(id)
    }, [])

    const handlePrev = React.useCallback(() => {
        if (currentPos > 0) {
            onDayChange(allDayIndexes[currentPos - 1]!)
        }
    }, [currentPos, allDayIndexes, onDayChange])

    const handleNext = React.useCallback(() => {
        if (currentPos < allDayIndexes.length - 1) {
            onDayChange(allDayIndexes[currentPos + 1]!)
        }
    }, [currentPos, allDayIndexes, onDayChange])

    const dateLabel = startDate
        ? formatCampaignDate(getCampaignDate(startDate, currentDayIndex, calendarDayOffsets[currentDayIndex]))
        : `День ${currentDayIndex}`

    return (
        <Box sx={styles.root}>
            <IconButton onClick={handlePrev} disabled={currentPos <= 0} size="small">
                <ChevronLeftRoundedIcon />
            </IconButton>
            <Typography sx={styles.dateText}>
                {dateLabel}
            </Typography>
            <IconButton onClick={handleNext} disabled={currentPos >= allDayIndexes.length - 1} size="small">
                <ChevronRightRoundedIcon />
            </IconButton>
            {startDate && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<TodayRoundedIcon />}
                        onClick={onGoToToday}
                        sx={styles.todayButton}
                    >
                        Сегодня
                    </Button>
                    <Typography sx={{
                        fontSize: '0.72rem',
                        color: 'text.secondary',
                        whiteSpace: 'nowrap',
                        fontWeight: 500
                    }}>
                        {clock}
                    </Typography>
                </Box>
            )}
        </Box>
    )
})

export default DayNavigation
