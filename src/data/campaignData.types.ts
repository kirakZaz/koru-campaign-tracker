export type Assignee = 'Кира' | 'Настя' | 'Макс' | 'Кира + Настя' | 'Кира + Макс' | 'Настя → Кира'

export type Phase = 'Story 0' | 'Week 1' | 'Week 2' | 'Week 3' | 'Week 4' | 'Week 5' | 'Week 6' | 'Week 7+'

export type Priority = 'high' | 'medium' | 'low'

export type TaskTag = 'setup' | 'linkedin' | 'research' | 'outreach' | 'content' | 'engagement' | 'review' | 'planning' | 'onboarding' | 'landing' | 'branding' | 'monitoring'

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
}

export interface CampaignDay {
    dayIndex: number
    phase: Phase
    dayLabel: string
    title: string
    summary: string
    tasks: CampaignTask[]
    keyMetric?: string
}

export interface TaskOverride {
    title?: string
    description?: string
    steps?: string[]
    subtasks?: Subtask[]
    assignee?: Assignee
    estimate?: string
    tip?: string
    warning?: string
}

export interface ProgressData {
    completedTasks: Record<string, boolean>
    startDate: string | null
    notes: Record<string, string>
    taskOverrides?: Record<string, TaskOverride>
}
