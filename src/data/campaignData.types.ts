export type Assignee = 'Кира' | 'Настя' | 'Макс' | 'Кира + Настя' | 'Кира + Макс' | 'Кира + Настя + Макс' | 'Настя → Кира'

export type Phase = 'Story 0' | 'Week 1' | 'Week 2' | 'Week 3' | 'Week 4' | 'Week 5' | 'Week 6' | 'Week 7' | 'Week 8' | 'Post-launch'

export type Priority = 'high' | 'medium' | 'low'

export type TaskTag = 'setup' | 'linkedin' | 'research' | 'outreach' | 'content' | 'engagement' | 'review' | 'planning' | 'onboarding' | 'landing' | 'branding' | 'monitoring' | 'pricing' | 'launch' | 'product-hunt'

export interface Subtask {
    id: string
    text: string
}

export interface CopyBlock {
    label: string
    text: string
}

export interface CampaignTask {
    id: string
    dayNumber: string
    phaseNumber: string
    title: string
    description: string
    steps: string[]
    subtasks: Subtask[]
    assignee: Assignee
    estimate: string
    priority: Priority
    tags: TaskTag[]
    tip?: string
    warning?: string
    copyBlocks?: CopyBlock[]
    image?: string
    completed: boolean
    completedSubtasks: Record<string, boolean>
    _edited: boolean
}

export interface CampaignDay {
    dayIndex: number
    phase: Phase
    dayLabel: string
    title: string
    summary: string
    tasks: CampaignTask[]
    note: string
    keyMetric?: string
    calendarDayOffset?: number
    _edited: boolean
}

export interface TeamMember {
    name: string
    assigneeKey: Assignee
    email: string
    timezone: string
    reminderTime: string
    remindersEnabled: boolean
}

export interface SourcesData {
    people: unknown[]
    groups: unknown[]
    companies: unknown[]
    shortlist: unknown[]
    competitors: unknown[]
    countries: string[]
}

export type InsightCategory = 'competitor' | 'market' | 'product' | 'post_analysis' | 'general'

export interface InsightEntry {
    id: string
    date: string
    category: InsightCategory
    title: string
    text: string
}

// Template types — used in campaignData.ts before buildInitialState fills runtime fields
export interface TemplateTask {
    id: string
    title: string
    description: string
    steps: string[]
    subtasks: Subtask[]
    assignee: Assignee
    estimate: string
    priority: Priority
    tags: TaskTag[]
    tip?: string
    warning?: string
    copyBlocks?: CopyBlock[]
    image?: string
}

export interface TemplateDay {
    dayIndex: number
    phase: Phase
    dayLabel: string
    title: string
    summary: string
    tasks: TemplateTask[]
    keyMetric?: string
    calendarDayOffset?: number
}

export interface CampaignState {
    version: number
    days: CampaignDay[]
}

export interface ProgressData {
    startDate: string | null
    overviewOverrides?: Record<string, { en: string, ru: string }>
    weekInsights?: Record<string, InsightEntry[]>
    campaignState?: CampaignState
}
