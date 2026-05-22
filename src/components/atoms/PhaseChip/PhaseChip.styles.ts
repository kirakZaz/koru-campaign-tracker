const phaseColors: Record<string, { bg: string, text: string }> = {
    'Story 0': { bg: '#3fb68e22', text: '#3fb68e' },
    'Week 1': { bg: '#6c8eff22', text: '#6c8eff' },
    'Week 2': { bg: '#6c8eff22', text: '#6c8eff' },
    'Week 3': { bg: '#d2992222', text: '#d29922' },
    'Week 4': { bg: '#f8514922', text: '#f85149' },
    'Week 5': { bg: '#f8514922', text: '#f85149' },
    'Week 6': { bg: '#da70d622', text: '#da70d6' },
    'Week 7+': { bg: '#8b949e22', text: '#8b949e' }
}

export const styles = {
    chip: (phase: string) => {
        const colors = phaseColors[phase] ?? { bg: '#8b949e22', text: '#8b949e' }
        return {
            backgroundColor: colors.bg,
            color: colors.text,
            fontWeight: 700,
            fontSize: '0.75rem',
            letterSpacing: '0.04em',
            borderRadius: '99px',
            border: `1px solid ${colors.text}33`
        }
    }
}
