import type { CampaignDay, CampaignTask } from '@/data/campaignData.types'

export interface OverdueDay {
    dayIndex: number
    dayLabel: string
    unfinishedCount: number
    highPriorityCount: number
}

export interface DayViewProps {
    day: CampaignDay
    startDate: string | null
    isTaskCompleted: (taskId: string) => boolean
    onToggleTask: (taskId: string) => void
    onEditTask: (task: CampaignTask) => void
    note: string
    onNoteChange: (note: string) => void
    overdueDays: OverdueDay[]
    onGoToDay: (dayIndex: number) => void
    allDays?: CampaignDay[]
    onMoveTask?: (taskId: string, dayIndex: number) => void
    onSaveDayOverride?: (dayIndex: number, override: { title?: string, summary?: string }) => void
}
