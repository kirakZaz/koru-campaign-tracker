import type { CampaignTask, TaskOverride } from '@/data/campaignData.types'

export interface EditTaskDialogProps {
    open: boolean
    task: CampaignTask
    onClose: () => void
    onSave: (taskId: string, override: TaskOverride) => void
}
