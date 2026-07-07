import * as React from 'react'
import type { ProgressData, CampaignState, CampaignDay, CampaignTask, InsightEntry } from '@/data/campaignData.types'
import { CAMPAIGN_VERSION, buildInitialState } from '@/data/campaignData'

const API_URL = '/api/progress'

const DEFAULT_PROGRESS: ProgressData = {
    startDate: null
}

export function useProgress() {
    const [progress, setProgress] = React.useState<ProgressData>(DEFAULT_PROGRESS)
    const [campaignState, setCampaignState] = React.useState<CampaignState | null>(null)
    const [isLoading, setIsLoading] = React.useState(true)
    const [error, setError] = React.useState<string | null>(null)

    const fetchProgress = React.useCallback(async (signal?: AbortSignal) => {
        try {
            const res = await fetch(API_URL, { signal })
            if (!res.ok) throw new Error('Failed to fetch')
            const data = await res.json() as ProgressData
            setProgress(data)
            setError(null)

            if (data.campaignState && data.campaignState.version >= CAMPAIGN_VERSION) {
                setCampaignState(data.campaignState)
            } else {
                const state = buildInitialState()
                // Migrate: carry over completed status and notes from old campaignState if present
                if (data.campaignState) {
                    for (const oldDay of data.campaignState.days) {
                        const newDay = state.days.find(d => d.dayIndex === oldDay.dayIndex)
                        if (!newDay) continue
                        if (oldDay.note) newDay.note = oldDay.note
                        if (oldDay._edited) newDay._edited = oldDay._edited
                        if (oldDay.title !== newDay.title && oldDay._edited) newDay.title = oldDay.title
                        if (oldDay.summary !== newDay.summary && oldDay._edited) newDay.summary = oldDay.summary
                        for (const oldTask of oldDay.tasks) {
                            const newTask = newDay.tasks.find(t => t.id === oldTask.id)
                            if (!newTask) {
                                // Task was created by user — keep it
                                newDay.tasks.push({ ...oldTask, dayNumber: String(oldDay.dayIndex), phaseNumber: oldDay.phase } as CampaignTask)
                                continue
                            }
                            if (oldTask.completed) newTask.completed = true
                            if (oldTask.completedSubtasks) Object.assign(newTask.completedSubtasks, oldTask.completedSubtasks)
                            if (oldTask._edited) {
                                Object.assign(newTask, oldTask, { dayNumber: String(oldDay.dayIndex), phaseNumber: oldDay.phase })
                            }
                        }
                    }
                }
                setCampaignState(state)
                await fetch(API_URL, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'seed-campaign-state', campaignState: state }),
                    signal
                })
            }
        } catch (e) {
            if (e instanceof DOMException && e.name === 'AbortError') return
            setError('Failed to load progress')
        } finally {
            setIsLoading(false)
        }
    }, [])

    React.useEffect(() => {
        const controller = new AbortController()
        void fetchProgress(controller.signal)
        return () => controller.abort()
    }, [fetchProgress])

    // === Task operations ===

    const toggleTask = React.useCallback(async (taskId: string) => {
        // Find current value BEFORE setState
        let newCompleted = false
        if (campaignState) {
            for (const day of campaignState.days) {
                const task = day.tasks.find(t => t.id === taskId)
                if (task) { newCompleted = !task.completed; break }
                for (const t of day.tasks) {
                    if (t.subtasks.some(st => st.id === taskId)) {
                        newCompleted = !t.completedSubtasks[taskId]; break
                    }
                }
            }
        }
        setCampaignState(prev => {
            if (!prev) return prev
            return {
                ...prev,
                days: prev.days.map(d => ({
                    ...d,
                    tasks: d.tasks.map(t => {
                        if (t.id === taskId) return { ...t, completed: newCompleted }
                        if (t.subtasks.some(st => st.id === taskId)) {
                            return { ...t, completedSubtasks: { ...t.completedSubtasks, [taskId]: newCompleted } }
                        }
                        return t
                    })
                }))
            }
        })
        await fetch(API_URL, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'toggle-task', taskId, completed: newCompleted })
        })
    }, [campaignState])

    const moveTask = React.useCallback(async (taskId: string, fromDayIndex: number, toDayIndex: number) => {
        setCampaignState(prev => {
            if (!prev) return prev
            const days = prev.days.map(d => ({ ...d, tasks: [...d.tasks] }))
            const fromDay = days.find(d => d.dayIndex === fromDayIndex)
            const toDay = days.find(d => d.dayIndex === toDayIndex)
            if (fromDay && toDay) {
                const idx = fromDay.tasks.findIndex(t => t.id === taskId)
                if (idx !== -1) {
                    const task = { ...fromDay.tasks[idx]!, dayNumber: String(toDayIndex), phaseNumber: toDay.phase }
                    fromDay.tasks.splice(idx, 1)
                    toDay.tasks.push(task)
                }
            }
            return { ...prev, days }
        })
        await fetch(API_URL, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'move-task-live', taskId, fromDayIndex, toDayIndex })
        })
    }, [])

    const updateTask = React.useCallback(async (taskId: string, patch: Partial<CampaignTask>) => {
        setCampaignState(prev => {
            if (!prev) return prev
            return {
                ...prev,
                days: prev.days.map(d => ({
                    ...d,
                    tasks: d.tasks.map(t => t.id === taskId ? { ...t, ...patch, _edited: true } : t)
                }))
            }
        })
        await fetch(API_URL, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'update-task-live', taskId, patch })
        })
    }, [])

    const deleteTask = React.useCallback(async (taskId: string) => {
        setCampaignState(prev => {
            if (!prev) return prev
            return {
                ...prev,
                days: prev.days.map(d => ({
                    ...d,
                    tasks: d.tasks.filter(t => t.id !== taskId)
                }))
            }
        })
        await fetch(API_URL, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'delete-task-live', taskId })
        })
    }, [])

    const createTask = React.useCallback(async (dayIndex: number, task: CampaignTask) => {
        setCampaignState(prev => {
            if (!prev) return prev
            return {
                ...prev,
                days: prev.days.map(d =>
                    d.dayIndex === dayIndex ? { ...d, tasks: [...d.tasks, task] } : d
                )
            }
        })
        await fetch(API_URL, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'create-task-live', dayIndex, task })
        })
    }, [])

    // === Day operations ===

    const updateDay = React.useCallback(async (dayIndex: number, patch: Partial<CampaignDay>) => {
        setCampaignState(prev => {
            if (!prev) return prev
            return {
                ...prev,
                days: prev.days.map(d =>
                    d.dayIndex === dayIndex ? { ...d, ...patch, _edited: true } : d
                )
            }
        })
        await fetch(API_URL, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'update-day-live', dayIndex, patch })
        })
    }, [])

    const setNote = React.useCallback(async (dayIndex: number, note: string) => {
        await updateDay(dayIndex, { note })
    }, [updateDay])

    // === Progress operations ===

    const setStartDate = React.useCallback(async (date: string) => {
        setProgress(prev => ({ ...prev, startDate: date }))
        try {
            await fetch(API_URL, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'set-start-date', startDate: date })
            })
        } catch {
            setProgress(prev => ({ ...prev, startDate: progress.startDate }))
        }
    }, [progress.startDate])

    const isTaskCompleted = React.useCallback((taskId: string): boolean => {
        if (!campaignState) return false
        for (const day of campaignState.days) {
            const task = day.tasks.find(t => t.id === taskId)
            if (task) return task.completed
            for (const t of day.tasks) {
                if (t.subtasks.some(st => st.id === taskId)) return !!t.completedSubtasks[taskId]
            }
        }
        return false
    }, [campaignState])

    const saveOverviewSection = React.useCallback(async (sectionKey: string, value: { en: string, ru: string }) => {
        setProgress(prev => ({
            ...prev,
            overviewOverrides: { ...(prev.overviewOverrides ?? {}), [sectionKey]: value }
        }))
        await fetch(API_URL, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'set-overview-section', sectionKey, value })
        })
    }, [])

    const saveWeekInsights = React.useCallback(async (phase: string, insights: InsightEntry[]) => {
        setProgress(prev => ({
            ...prev,
            weekInsights: { ...(prev.weekInsights ?? {}), [phase]: insights }
        }))
        await fetch(API_URL, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'set-week-insights', phase, insights })
        })
    }, [])

    return {
        progress,
        isLoading,
        error,
        campaignState,
        toggleTask,
        setStartDate,
        setNote,
        isTaskCompleted,
        saveTaskOverride: updateTask,
        saveOverviewSection,
        overviewOverrides: progress.overviewOverrides ?? {},
        weekInsights: progress.weekInsights ?? {},
        saveWeekInsights,
        moveTask,
        updateTask,
        deleteTask,
        createTask,
        updateDay,
    }
}
