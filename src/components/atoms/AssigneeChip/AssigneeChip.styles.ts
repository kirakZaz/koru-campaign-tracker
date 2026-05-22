const assigneeColors: Record<string, string> = {
    'Кира': '#3fb68e',
    'Настя': '#6c8eff',
    'Макс': '#d29922',
    'Кира + Настя': '#da70d6',
    'Кира + Макс': '#f85149',
    'Настя → Кира': '#6c8eff'
}

export const styles = {
    chip: (assignee: string) => ({
        backgroundColor: 'transparent',
        color: assigneeColors[assignee] ?? '#8b949e',
        border: `1px solid ${assigneeColors[assignee] ?? '#8b949e'}44`,
        fontWeight: 600,
        fontSize: '0.75rem'
    })
}
