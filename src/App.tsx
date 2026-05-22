import * as React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { CAMPAIGN_DAYS, TOTAL_CAMPAIGN_DAYS } from '@/data/campaignData'
import type { CampaignTask, CampaignDay, TaskOverride } from '@/data/campaignData.types'
import { useProgress } from '@/hooks/useProgress'
import { getTodayDayIndex } from '@/utils/dateUtils'
import Sidebar from '@/components/organisms/Sidebar/Sidebar'
import DayView from '@/components/organisms/DayView/DayView'
import DayNavigation from '@/components/molecules/DayNavigation/DayNavigation'
import SettingsDialog from '@/components/organisms/SettingsDialog/SettingsDialog'
import EditTaskDialog from '@/components/organisms/EditTaskDialog/EditTaskDialog'

function applyOverride(task: CampaignTask, override: TaskOverride | undefined): CampaignTask {
    if (!override) {
        return task
    }
    return {
        ...task,
        title: override.title ?? task.title,
        description: override.description ?? task.description,
        steps: override.steps ?? task.steps,
        subtasks: override.subtasks ?? task.subtasks,
        assignee: override.assignee ?? task.assignee,
        estimate: override.estimate ?? task.estimate,
        tip: override.tip !== undefined ? override.tip : task.tip,
        warning: override.warning !== undefined ? override.warning : task.warning
    }
}

function App() {
    const { progress, isLoading, error, toggleTask, setStartDate, setNote, isTaskCompleted, saveTaskOverride, getTaskOverride } = useProgress()
    const [currentDayIndex, setCurrentDayIndex] = React.useState(0)
    const [settingsOpen, setSettingsOpen] = React.useState(false)
    const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false)
    const [editingTask, setEditingTask] = React.useState<CampaignTask | null>(null)

    const muiTheme = useTheme()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'))

    const mergedDays = React.useMemo((): CampaignDay[] => {
        return CAMPAIGN_DAYS.map((day) => ({
            ...day,
            tasks: day.tasks.map((task) => applyOverride(task, getTaskOverride(task.id)))
        }))
    }, [getTaskOverride])

    React.useEffect(() => {
        if (!isLoading && progress.startDate) {
            const todayIndex = getTodayDayIndex(progress.startDate, TOTAL_CAMPAIGN_DAYS)
            setCurrentDayIndex(todayIndex)
        }
    }, [isLoading, progress.startDate])

    React.useEffect(() => {
        if (!isLoading && !progress.startDate) {
            setSettingsOpen(true)
        }
    }, [isLoading, progress.startDate])

    const handleGoToToday = React.useCallback(() => {
        if (progress.startDate) {
            const todayIndex = getTodayDayIndex(progress.startDate, TOTAL_CAMPAIGN_DAYS)
            setCurrentDayIndex(todayIndex)
        }
    }, [progress.startDate])

    const handleOpenSettings = React.useCallback(() => {
        setSettingsOpen(true)
    }, [])

    const handleCloseSettings = React.useCallback(() => {
        setSettingsOpen(false)
    }, [])

    const handleDaySelect = React.useCallback((dayIndex: number) => {
        setCurrentDayIndex(dayIndex)
        if (isMobile) {
            setMobileDrawerOpen(false)
        }
    }, [isMobile])

    const handleToggleDrawer = React.useCallback(() => {
        setMobileDrawerOpen((prev) => !prev)
    }, [])

    const handleNoteChange = React.useCallback((note: string) => {
        void setNote(currentDayIndex, note)
    }, [setNote, currentDayIndex])

    const handleEditTask = React.useCallback((task: CampaignTask) => {
        setEditingTask(task)
    }, [])

    const handleCloseEdit = React.useCallback(() => {
        setEditingTask(null)
    }, [])

    const handleSaveEdit = React.useCallback((taskId: string, override: TaskOverride) => {
        void saveTaskOverride(taskId, override)
    }, [saveTaskOverride])

    const currentDay = mergedDays[currentDayIndex]

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: 'background.default' }}>
                <CircularProgress color="primary" />
            </Box>
        )
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: 2, backgroundColor: 'background.default' }}>
                <Typography color="error">{error}</Typography>
                <Button variant="outlined" onClick={() => window.location.reload()}>
                    Перезагрузить
                </Button>
            </Box>
        )
    }

    if (!currentDay) {
        return null
    }

    const sidebarContent = (
        <Sidebar
            days={mergedDays}
            currentDayIndex={currentDayIndex}
            startDate={progress.startDate}
            isTaskCompleted={isTaskCompleted}
            onDaySelect={handleDaySelect}
            onOpenSettings={handleOpenSettings}
        />
    )

    return (
        <Box sx={{ display: 'flex', height: '100vh', backgroundColor: 'background.default' }}>
            {isMobile ? (
                <Drawer
                    open={mobileDrawerOpen}
                    onClose={handleToggleDrawer}
                    sx={{ '& .MuiDrawer-paper': { width: 300, backgroundColor: 'background.default' } }}
                >
                    {sidebarContent}
                </Drawer>
            ) : (
                sidebarContent
            )}

            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <Box sx={{ px: { xs: 2, md: 4 }, pt: 2, display: 'flex', alignItems: 'center', gap: 1, borderBottom: (t) => `1px solid ${t.palette.divider}` }}>
                    {isMobile && (
                        <IconButton onClick={handleToggleDrawer} size="small">
                            <MenuRoundedIcon />
                        </IconButton>
                    )}
                    <Box sx={{ flex: 1 }}>
                        <DayNavigation
                            currentDayIndex={currentDayIndex}
                            totalDays={TOTAL_CAMPAIGN_DAYS}
                            startDate={progress.startDate}
                            onDayChange={setCurrentDayIndex}
                            onGoToToday={handleGoToToday}
                        />
                    </Box>
                </Box>

                <DayView
                    day={currentDay}
                    startDate={progress.startDate}
                    isTaskCompleted={isTaskCompleted}
                    onToggleTask={toggleTask}
                    onEditTask={handleEditTask}
                    note={progress.notes[currentDayIndex] ?? ''}
                    onNoteChange={handleNoteChange}
                />
            </Box>

            <SettingsDialog
                open={settingsOpen}
                onClose={handleCloseSettings}
                startDate={progress.startDate}
                onSetStartDate={setStartDate}
            />

            {editingTask && (
                <EditTaskDialog
                    open={true}
                    task={editingTask}
                    onClose={handleCloseEdit}
                    onSave={handleSaveEdit}
                />
            )}
        </Box>
    )
}

export default App
