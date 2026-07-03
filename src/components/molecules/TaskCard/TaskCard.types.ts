import type { CampaignTask, CampaignDay, LiveTask } from '@/data/campaignData.types'

export interface TaskCardProps {
    task: CampaignTask
    isTaskCompleted: (taskId: string) => boolean
    onToggleTask: (taskId: string) => void
    onEditTask: (task: CampaignTask) => void
    currentDayIndex?: number
    allDays?: CampaignDay[]
    onMoveTask?: (taskId: string, dayIndex: number) => void
    onUpdateTask?: (taskId: string, patch: Partial<LiveTask>) => void
    onDeleteTask?: (taskId: string) => void
}
