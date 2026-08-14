import type { TeamMember } from '@/data/campaignData.types'

export interface SettingsDialogProps {
    open: boolean
    onClose: () => void
    startDate: string | null
    onSetStartDate: (date: string) => void
    team: TeamMember[]
    onSaveTeam: (team: TeamMember[]) => void
    onChangePassword: (username: string, currentPassword: string, newPassword: string) => Promise<void>
}
