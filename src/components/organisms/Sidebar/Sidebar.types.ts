import type { CampaignDay } from '@/data/campaignData.types'

export interface SidebarProps {
    days: CampaignDay[]
    currentDayIndex: number
    startDate: string | null
    isTaskCompleted: (taskId: string) => boolean
    onDaySelect: (dayIndex: number) => void
    onOpenSettings: () => void
}
