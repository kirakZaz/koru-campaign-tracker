import type { CampaignTask, CampaignDay } from '@/data/campaignData.types'

export interface TaskCardProps {
    task: CampaignTask
    isTaskCompleted: (taskId: string) => boolean
    onToggleTask: (taskId: string) => void
    onEditTask: (task: CampaignTask) => void
    currentDayIndex?: number
    allDays?: CampaignDay[]
    onMoveTask?: (taskId: string, dayIndex: number) => void
    onUpdateTask?: (taskId: string, patch: Partial<CampaignTask>) => void
    onDeleteTask?: (taskId: string) => void
}
