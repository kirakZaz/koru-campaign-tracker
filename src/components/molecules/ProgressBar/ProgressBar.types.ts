import type { CampaignDay } from '@/data/campaignData.types'

export interface ProgressBarProps {
    days: CampaignDay[]
    isTaskCompleted: (taskId: string) => boolean
}
