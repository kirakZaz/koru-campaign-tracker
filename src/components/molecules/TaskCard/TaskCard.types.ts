import type { CampaignTask } from '@/data/campaignData.types'

export interface TaskCardProps {
    task: CampaignTask
    isTaskCompleted: (taskId: string) => boolean
    onToggleTask: (taskId: string) => void
    onEditTask: (task: CampaignTask) => void
}
