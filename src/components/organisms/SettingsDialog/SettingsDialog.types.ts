export interface SettingsDialogProps {
    open: boolean
    onClose: () => void
    startDate: string | null
    onSetStartDate: (date: string) => void
}
