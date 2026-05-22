import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'
import type { ProgressBarProps } from './ProgressBar.types'
import { styles } from './ProgressBar.styles'

const ProgressBar = React.memo(function ProgressBar({ days, isTaskCompleted }: ProgressBarProps) {
    const { completed, total } = React.useMemo(() => {
        let c = 0
        let t = 0
        for (const day of days) {
            for (const task of day.tasks) {
                t++
                if (isTaskCompleted(task.id)) {
                    c++
                }
            }
        }
        return { completed: c, total: t }
    }, [days, isTaskCompleted])

    const percent = total > 0 ? Math.round((completed / total) * 100) : 0

    return (
        <Box sx={styles.root}>
            <Box sx={styles.header}>
                <Typography sx={styles.label}>
                    Прогресс кампании: {completed} из {total} задач
                </Typography>
                <Typography sx={styles.percent}>
                    {percent}%
                </Typography>
            </Box>
            <LinearProgress
                variant="determinate"
                value={percent}
                sx={{ borderRadius: '99px', height: 6 }}
            />
        </Box>
    )
})

export default ProgressBar
