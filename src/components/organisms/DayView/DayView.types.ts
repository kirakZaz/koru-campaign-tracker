import type { CampaignDay, CampaignTask } from '@/data/campaignData.types'

export interface DayViewProps {
    day: CampaignDay
    startDate: string | null
    isTaskCompleted: (taskId: string) => boolean
    onToggleTask: (taskId: string) => void
    onEditTask: (task: CampaignTask) => void
    note: string
    onNoteChange: (note: string) => void
}
