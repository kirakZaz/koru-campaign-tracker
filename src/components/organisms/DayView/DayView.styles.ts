import type { Theme } from '@mui/material'

export const styles = {
    root: {
        flex: 1,
        overflow: 'auto',
        px: { xs: 2, md: 4 },
        py: 3
    },
    dayHeader: {
        mb: 3
    },
    dayLabel: {
        fontSize: '0.8rem',
        fontWeight: 700,
        color: 'text.secondary',
        letterSpacing: '0.06em',
        textTransform: 'uppercase' as const,
        mb: 0.5
    },
    dayTitle: {
        fontWeight: 800,
        fontSize: { xs: '1.5rem', md: '1.75rem' },
        color: 'text.primary',
        mb: 1
    },
    daySummary: {
        fontSize: '0.95rem',
        color: 'text.secondary',
        lineHeight: 1.6,
        maxWidth: 700
    },
    keyMetric: {
        mt: 2,
        p: 1.5,
        borderRadius: 2,
        backgroundColor: '#6c8eff11',
        border: '1px solid #6c8eff33',
        fontSize: '0.85rem',
        fontWeight: 600,
        color: '#6c8eff'
    },
    tasksList: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2
    },
    noteSection: {
        mt: 4,
        pt: 3,
        borderTop: (theme: Theme) => `1px solid ${theme.palette.divider}`
    },
    noteLabel: {
        fontSize: '0.8rem',
        fontWeight: 700,
        color: 'text.secondary',
        letterSpacing: '0.06em',
        textTransform: 'uppercase' as const,
        mb: 1
    }
}
