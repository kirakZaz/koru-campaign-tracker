import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { getCampaignDate, formatCampaignDate } from '@/utils/dateUtils'
import { TOTAL_CAMPAIGN_DAYS } from '@/data/campaignData'
import type { SettingsDialogProps } from './SettingsDialog.types'
import { styles } from './SettingsDialog.styles'

const SettingsDialog = React.memo(function SettingsDialog({
    open,
    onClose,
    startDate,
    onSetStartDate
}: SettingsDialogProps) {
    const [dateValue, setDateValue] = React.useState(startDate ?? '')

    React.useEffect(() => {
        setDateValue(startDate ?? '')
    }, [startDate])

    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setDateValue(e.target.value)
    }, [])

    const handleSave = React.useCallback(() => {
        if (dateValue) {
            onSetStartDate(dateValue)
        }
        onClose()
    }, [dateValue, onSetStartDate, onClose])

    const endDate = dateValue
        ? formatCampaignDate(getCampaignDate(dateValue, TOTAL_CAMPAIGN_DAYS - 1))
        : null

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 700 }}>
                Настройки кампании
            </DialogTitle>
            <DialogContent>
                <Box sx={styles.content}>
                    <Box>
                        <Typography sx={{ fontWeight: 600, mb: 1 }}>
                            Дата старта кампании (Story 0, День 1)
                        </Typography>
                        <TextField
                            type="date"
                            value={dateValue}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            label="Дата старта"
                        />
                        <Typography sx={styles.dateInfo}>
                            Все дни кампании будут привязаны к рабочим дням начиная с этой даты. Выходные пропускаются автоматически.
                        </Typography>
                    </Box>

                    {dateValue && (
                        <Box sx={styles.currentDate}>
                            Старт: {formatCampaignDate(new Date(dateValue))}
                            <br />
                            Финиш: {endDate}
                            <br />
                            Всего: {TOTAL_CAMPAIGN_DAYS} рабочих дней
                        </Box>
                    )}
                </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose} color="inherit">
                    Отмена
                </Button>
                <Button onClick={handleSave} variant="contained" disabled={!dateValue}>
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    )
})

export default SettingsDialog
