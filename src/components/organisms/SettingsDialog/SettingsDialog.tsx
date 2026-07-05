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
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { getCampaignDate, formatCampaignDate, getViewerTimezone, getTimezoneAbbr } from '@/utils/dateUtils'
import { CAMPAIGN_DAYS } from '@/data/campaignData'
import type { TeamMember, Assignee } from '@/data/campaignData.types'
import type { SettingsDialogProps } from './SettingsDialog.types'
import { styles } from './SettingsDialog.styles'

const TIMEZONES = [
    { value: 'Europe/Lisbon', label: 'Лиссабон (WET, UTC+0 / +1 летом)' },
    { value: 'Europe/London', label: 'Лондон (GMT, UTC+0 / +1 летом)' },
    { value: 'Europe/Berlin', label: 'Берлин (CET, UTC+1 / +2 летом)' },
    { value: 'Europe/Paris', label: 'Париж (CET, UTC+1 / +2 летом)' },
    { value: 'Europe/Kiev', label: 'Киев (EET, UTC+2 / +3 летом)' },
    { value: 'Europe/Moscow', label: 'Москва (MSK, UTC+3)' },
    { value: 'Europe/Istanbul', label: 'Стамбул (TRT, UTC+3)' },
    { value: 'Asia/Jerusalem', label: 'Иерусалим (IST, UTC+2 / +3 летом)' },
    { value: 'Asia/Dubai', label: 'Дубай (GST, UTC+4)' },
    { value: 'Asia/Kolkata', label: 'Индия (IST, UTC+5:30)' },
    { value: 'Asia/Bangkok', label: 'Бангкок (ICT, UTC+7)' },
    { value: 'Asia/Tokyo', label: 'Токио (JST, UTC+9)' },
    { value: 'Australia/Sydney', label: 'Сидней (AEST, UTC+10 / +11 летом)' },
    { value: 'America/New_York', label: 'Нью-Йорк (EST, UTC-5 / -4 летом)' },
    { value: 'America/Chicago', label: 'Чикаго (CST, UTC-6 / -5 летом)' },
    { value: 'America/Los_Angeles', label: 'Лос-Анджелес (PST, UTC-8 / -7 летом)' },
]

const REMINDER_TIMES = [
    '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00'
]

const DEFAULT_TEAM: TeamMember[] = [
    { name: 'Кира', assigneeKey: 'Кира' as Assignee, email: '', timezone: 'Australia/Sydney', reminderTime: '09:00', remindersEnabled: false },
    { name: 'Настя', assigneeKey: 'Настя' as Assignee, email: '', timezone: 'Europe/Lisbon', reminderTime: '09:00', remindersEnabled: false },
    { name: 'Макс', assigneeKey: 'Макс' as Assignee, email: '', timezone: 'Asia/Jerusalem', reminderTime: '09:00', remindersEnabled: false },
]

const SettingsDialog = React.memo(function SettingsDialog({
    open,
    onClose,
    startDate,
    onSetStartDate,
    team,
    onSaveTeam
}: SettingsDialogProps) {
    const [activeTab, setActiveTab] = React.useState(0)
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

    const handleTabChange = React.useCallback((_: React.SyntheticEvent, val: number) => {
        setActiveTab(val)
    }, [])

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
        ? formatCampaignDate(getCampaignDate(dateValue, CAMPAIGN_DAYS[CAMPAIGN_DAYS.length - 1]!.dayIndex))
        : null

    const memberColors: Record<string, string> = {
        'Кира': '#3fb68e',
        'Настя': '#6c8eff',
        'Макс': '#d29922'
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 700, pb: 0 }}>
                Настройки
            </DialogTitle>
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                sx={{ px: 3, borderBottom: 1, borderColor: 'divider' }}
            >
                <Tab label="Кампания" sx={{ fontWeight: 600, fontSize: '0.85rem', textTransform: 'none' }} />
                {teamState.map((m) => (
                    <Tab
                        key={m.name}
                        label={m.name}
                        sx={{
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            textTransform: 'none',
                            color: memberColors[m.name],
                            '&.Mui-selected': { color: memberColors[m.name] }
                        }}
                    />
                ))}
            </Tabs>
            <DialogContent sx={{ minHeight: 320 }}>
                {activeTab === 0 && (
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
                                Выходные пропускаются автоматически. Часовой пояс: {getViewerTimezone()} ({getTimezoneAbbr(getViewerTimezone())})
                            </Typography>
                        </Box>
                        {dateValue && (
                            <Box sx={styles.currentDate}>
                                Старт: {formatCampaignDate(new Date(dateValue))}
                                <br />
                                Финиш: {endDate}
                                <br />
                                Всего: {CAMPAIGN_DAYS.length} дней (включая Story 0)
                            </Box>
                        )}
                    </Box>
                )}

                {teamState.map((member, idx) => activeTab === idx + 1 && (
                    <Box key={member.name} sx={{ pt: 2 }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            mb: 3,
                            pb: 2,
                            borderBottom: '1px solid',
                            borderColor: 'divider'
                        }}>
                            <Box sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                backgroundColor: `${memberColors[member.name]}22`,
                                border: `2px solid ${memberColors[member.name]}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 800,
                                fontSize: '1rem',
                                color: memberColors[member.name]
                            }}>
                                {member.name[0]}
                            </Box>
                            <Box>
                                <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                                    {member.name}
                                </Typography>
                                <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                                    Assignee: {member.assigneeKey}
                                </Typography>
                            </Box>
                        </Box>

                        <TextField
                            label="Email"
                            value={member.email}
                            onChange={(e) => handleMemberChange(idx, 'email', e.target.value)}
                            fullWidth
                            sx={{ mb: 2.5 }}
                            placeholder="name@example.com"
                            helperText="На этот email придут утренние напоминания"
                        />

                        <FormControl fullWidth sx={{ mb: 2.5 }}>
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

                        <FormControl fullWidth sx={{ mb: 2.5 }}>
                            <InputLabel>Время напоминания</InputLabel>
                            <Select
                                value={member.reminderTime}
                                label="Время напоминания"
                                onChange={(e) => handleMemberChange(idx, 'reminderTime', e.target.value)}
                            >
                                {REMINDER_TIMES.map((t) => (
                                    <MenuItem key={t} value={t}>{t} (по твоему времени)</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            p: 2,
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: member.remindersEnabled ? 'success.main' : 'divider',
                            backgroundColor: member.remindersEnabled ? '#3fb68e08' : 'transparent'
                        }}>
                            <Box>
                                <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                                    Утренние напоминания
                                </Typography>
                                <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                                    {member.remindersEnabled
                                        ? `Каждый рабочий день в ${member.reminderTime}`
                                        : 'Выключены'}
                                </Typography>
                            </Box>
                            <Switch
                                checked={member.remindersEnabled}
                                onChange={(e) => handleMemberChange(idx, 'remindersEnabled', e.target.checked)}
                                color="success"
                            />
                        </Box>

                        {member.remindersEnabled && !member.email && (
                            <Typography sx={{ mt: 1, fontSize: '0.8rem', color: 'error.main', fontWeight: 600 }}>
                                Введи email чтобы напоминания работали
                            </Typography>
                        )}
                    </Box>
                ))}
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={onClose} color="inherit">
                    Отмена
                </Button>
                <Button onClick={handleSave} variant="contained">
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    )
})

export default SettingsDialog
