import type { CampaignTask } from '@/data/campaignData.types'

export interface EditTaskDialogProps {
    open: boolean
    task: CampaignTask
    onClose: () => void
    onSave: (taskId: string, patch: Partial<CampaignTask>) => void
}
