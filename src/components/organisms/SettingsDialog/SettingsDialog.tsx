import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Divider from '@mui/material/Divider'
import { getCampaignDate, formatCampaignDate } from '@/utils/dateUtils'
import { TOTAL_CAMPAIGN_DAYS } from '@/data/campaignData'
import type { TeamMember, Assignee } from '@/data/campaignData.types'
import type { SettingsDialogProps } from './SettingsDialog.types'
import { styles } from './SettingsDialog.styles'

const TIMEZONES = [
    { value: 'Europe/Moscow', label: 'Москва (UTC+3)' },
    { value: 'Europe/Kiev', label: 'Киев (UTC+3)' },
    { value: 'Europe/Berlin', label: 'Берлин (UTC+2)' },
    { value: 'Europe/London', label: 'Лондон (UTC+1)' },
    { value: 'America/New_York', label: 'Нью-Йорк (UTC-4)' },
    { value: 'America/Los_Angeles', label: 'Лос-Анджелес (UTC-7)' },
    { value: 'Asia/Dubai', label: 'Дубай (UTC+4)' },
    { value: 'Asia/Jerusalem', label: 'Иерусалим (UTC+3)' },
    { value: 'Asia/Bangkok', label: 'Бангкок (UTC+7)' },
    { value: 'Asia/Tokyo', label: 'Токио (UTC+9)' },
    { value: 'Australia/Sydney', label: 'Сидней (UTC+10)' },
]

const REMINDER_TIMES = [
    '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00'
]

const DEFAULT_TEAM: TeamMember[] = [
    { name: 'Кира', assigneeKey: 'Кира' as Assignee, email: '', timezone: 'Europe/Moscow', reminderTime: '09:00', remindersEnabled: false },
    { name: 'Настя', assigneeKey: 'Настя' as Assignee, email: '', timezone: 'Europe/Moscow', reminderTime: '09:00', remindersEnabled: false },
    { name: 'Макс', assigneeKey: 'Макс' as Assignee, email: '', timezone: 'Europe/Moscow', reminderTime: '09:00', remindersEnabled: false },
]

const SettingsDialog = React.memo(function SettingsDialog({
    open,
    onClose,
    startDate,
    onSetStartDate,
    team,
    onSaveTeam
}: SettingsDialogProps) {
    const [dateValue, setDateValue] = React.useState(startDate ?? '')
    const [teamState, setTeamState] = React.useState<TeamMember[]>(
        team.length > 0 ? team : DEFAULT_TEAM
    )

    React.useEffect(() => {
        setDateValue(startDate ?? '')
    }, [startDate])

    React.useEffect(() => {
        if (team.length > 0) {
            setTeamState(team)
        }
    }, [team])

    const handleDateChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setDateValue(e.target.value)
    }, [])

    const handleMemberChange = React.useCallback((index: number, field: keyof TeamMember, value: string | boolean) => {
        setTeamState((prev) => {
            const next = [...prev]
            next[index] = { ...next[index]!, [field]: value }
            return next
        })
    }, [])

    const handleSave = React.useCallback(() => {
        if (dateValue) {
            onSetStartDate(dateValue)
        }
        onSaveTeam(teamState)
        onClose()
    }, [dateValue, teamState, onSetStartDate, onSaveTeam, onClose])

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
                            onChange={handleDateChange}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            label="Дата старта"
                        />
                        <Typography sx={styles.dateInfo}>
                            Выходные пропускаются автоматически.
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

                    <Divider sx={{ my: 2 }} />

                    <Typography sx={{ fontWeight: 700, fontSize: '1rem', mb: 2 }}>
                        Команда и напоминания
                    </Typography>
                    <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 2 }}>
                        Каждый участник получает утреннее письмо со своими задачами на день. Настрой email, часовой пояс и удобное время.
                    </Typography>

                    {teamState.map((member, idx) => (
                        <Box
                            key={member.name}
                            sx={{
                                p: 2,
                                mb: 2,
                                borderRadius: 2,
                                border: '1px solid',
                                borderColor: 'divider',
                                backgroundColor: member.remindersEnabled ? '#3fb68e08' : 'transparent'
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                                <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>
                                    {member.name}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                                        {member.remindersEnabled ? 'Вкл' : 'Выкл'}
                                    </Typography>
                                    <Switch
                                        checked={member.remindersEnabled}
                                        onChange={(e) => handleMemberChange(idx, 'remindersEnabled', e.target.checked)}
                                        size="small"
                                        color="success"
                                    />
                                </Box>
                            </Box>

                            <TextField
                                label="Email"
                                value={member.email}
                                onChange={(e) => handleMemberChange(idx, 'email', e.target.value)}
                                fullWidth
                                size="small"
                                sx={{ mb: 1.5 }}
                                placeholder="name@example.com"
                            />

                            <Box sx={{ display: 'flex', gap: 1.5 }}>
                                <FormControl size="small" sx={{ flex: 1 }}>
                                    <InputLabel>Часовой пояс</InputLabel>
                                    <Select
                                        value={member.timezone}
                                        label="Часовой пояс"
                                        onChange={(e) => handleMemberChange(idx, 'timezone', e.target.value)}
                                    >
                                        {TIMEZONES.map((tz) => (
                                            <MenuItem key={tz.value} value={tz.value}>{tz.label}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl size="small" sx={{ width: 120 }}>
                                    <InputLabel>Время</InputLabel>
                                    <Select
                                        value={member.reminderTime}
                                        label="Время"
                                        onChange={(e) => handleMemberChange(idx, 'reminderTime', e.target.value)}
                                    >
                                        {REMINDER_TIMES.map((t) => (
                                            <MenuItem key={t} value={t}>{t}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                    ))}
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
