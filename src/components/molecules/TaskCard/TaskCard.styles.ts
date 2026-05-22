import type { Theme } from '@mui/material'

export const styles = {
    card: (completed: boolean) => ({
        border: (theme: Theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        p: 0,
        opacity: completed ? 0.6 : 1,
        transition: 'all 150ms ease',
        '&:hover': {
            borderColor: 'primary.main'
        }
    }),
    header: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.5,
        p: 2.5,
        cursor: 'pointer',
        userSelect: 'none' as const
    },
    headerLeft: {
        flex: 1,
        minWidth: 0
    },
    titleRow: {
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mb: 0.5
    },
    title: (completed: boolean) => ({
        fontWeight: 700,
        fontSize: '1rem',
        color: completed ? 'text.secondary' : 'text.primary',
        textDecoration: completed ? 'line-through' : 'none'
    }),
    description: {
        color: 'text.secondary',
        fontSize: '0.875rem',
        lineHeight: 1.5,
        mt: 0.5
    },
    chips: {
        display: 'flex',
        gap: 1,
        mt: 1,
        flexWrap: 'wrap' as const
    },
    estimate: {
        color: 'text.secondary',
        fontSize: '0.75rem',
        fontWeight: 600,
        backgroundColor: '#ffffff08',
        px: 1,
        py: 0.25,
        borderRadius: '99px',
        whiteSpace: 'nowrap' as const
    },
    expandedContent: {
        px: 2.5,
        pb: 2.5,
        pt: 0,
        borderTop: (theme: Theme) => `1px solid ${theme.palette.divider}`
    },
    stepsTitle: {
        fontWeight: 700,
        fontSize: '0.8rem',
        color: 'text.secondary',
        letterSpacing: '0.08em',
        textTransform: 'uppercase' as const,
        mt: 2,
        mb: 1
    },
    step: {
        color: 'text.primary',
        fontSize: '0.875rem',
        lineHeight: 1.7,
        whiteSpace: 'pre-wrap' as const,
        pl: 1,
        py: 0.5,
        borderLeft: '2px solid',
        borderColor: 'divider',
        mb: 0.5
    },
    subtaskRow: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 0.5,
        py: 0.25
    },
    subtaskText: (completed: boolean) => ({
        fontSize: '0.875rem',
        color: completed ? 'text.secondary' : 'text.primary',
        textDecoration: completed ? 'line-through' : 'none',
        lineHeight: 1.5
    }),
    tip: {
        mt: 2,
        p: 1.5,
        borderRadius: 1.5,
        backgroundColor: '#3fb68e11',
        border: '1px solid #3fb68e33',
        fontSize: '0.8rem',
        color: '#3fb68e',
        whiteSpace: 'pre-wrap' as const,
        lineHeight: 1.6
    },
    warning: {
        mt: 2,
        p: 1.5,
        borderRadius: 1.5,
        backgroundColor: '#f8514911',
        border: '1px solid #f8514933',
        fontSize: '0.8rem',
        color: '#f85149',
        whiteSpace: 'pre-wrap' as const,
        lineHeight: 1.6
    },
    progressText: {
        fontSize: '0.75rem',
        color: 'text.secondary',
        fontWeight: 600
    }
}
