import type { CampaignDay } from '@/data/campaignData.types'
import type { AuthUser } from '@/hooks/useAuth'

export interface SidebarProps {
    days: CampaignDay[]
    currentDayIndex: number
    startDate: string | null
    isTaskCompleted: (taskId: string) => boolean
    onDaySelect: (dayIndex: number) => void
    onOpenSettings: () => void
    globalAssigneeFilter: string | null
    onGlobalAssigneeFilterChange: (assignee: string | null) => void
    currentUser: AuthUser
    onLogout: () => void
}
