import type { Theme } from '@mui/material'

export const styles = {
    root: {
        width: { xs: '100%', md: 300 },
        borderRight: { md: (theme: Theme) => `1px solid ${theme.palette.divider}` },
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden'
    },
    header: {
        p: 2.5,
        borderBottom: (theme: Theme) => `1px solid ${theme.palette.divider}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logo: {
        fontWeight: 800,
        fontSize: '1.25rem',
        color: 'primary.main',
        letterSpacing: '-0.02em'
    },
    subtitle: {
        fontSize: '0.7rem',
        color: 'text.secondary',
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase' as const
    },
    daysList: {
        flex: 1,
        overflow: 'auto',
        py: 0.5
    },
    phaseHeader: {
        px: 2,
        py: 0.75,
        fontSize: '0.7rem',
        fontWeight: 700,
        color: 'text.secondary',
        letterSpacing: '0.1em',
        textTransform: 'uppercase' as const,
        mt: 0.5,
        position: 'sticky' as const,
        top: 0,
        backgroundColor: 'background.default',
        zIndex: 1
    },
    dayItem: (isActive: boolean, isCompleted: boolean) => ({
        px: 2,
        py: 1,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        backgroundColor: isActive ? '#3fb68e18' : 'transparent',
        borderLeft: isActive ? '3px solid' : '3px solid transparent',
        borderColor: isActive ? 'primary.main' : 'transparent',
        opacity: isCompleted && !isActive ? 0.6 : 1,
        transition: 'all 120ms ease',
        '&:hover': {
            backgroundColor: isActive ? '#3fb68e18' : '#ffffff06'
        }
    }),
    dayNumber: {
        fontSize: '0.6rem',
        fontWeight: 700,
        color: 'text.secondary',
        minWidth: 38,
        textAlign: 'center' as const,
        lineHeight: 1.2
    },
    dayTitle: (isActive: boolean) => ({
        fontSize: '0.8rem',
        fontWeight: isActive ? 700 : 500,
        color: isActive ? 'text.primary' : 'text.secondary',
        flex: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap' as const
    }),
    dayProgress: {
        fontSize: '0.65rem',
        fontWeight: 600,
        color: 'text.secondary',
        whiteSpace: 'nowrap' as const
    }
}
