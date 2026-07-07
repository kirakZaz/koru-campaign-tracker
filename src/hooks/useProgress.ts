import * as React from 'react'
import type { ProgressData, CampaignState, LiveDay, LiveTask, InsightEntry } from '@/data/campaignData.types'
import { CAMPAIGN_VERSION, buildInitialState } from '@/data/campaignData'

const API_URL = '/api/progress'

const DEFAULT_PROGRESS: ProgressData = {
    completedTasks: {},
    startDate: null,
    notes: {}
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

            // Seed or load campaignState
            if (data.campaignState && data.campaignState.version >= CAMPAIGN_VERSION) {
                setCampaignState(data.campaignState)
            } else {
                const state = buildInitialState({
                    completedTasks: data.completedTasks,
                    notes: data.notes,
                    taskOverrides: data.taskOverrides as any,
                    taskDayMoves: data.taskDayMoves,
                    dayOverrides: data.dayOverrides
                })
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

    // === Campaign State operations (new) ===

    const moveTaskLive = React.useCallback(async (taskId: string, fromDayIndex: number, toDayIndex: number) => {
        setCampaignState(prev => {
            if (!prev) return prev
            const days = prev.days.map(d => ({ ...d, tasks: [...d.tasks] }))
            const fromDay = days.find(d => d.dayIndex === fromDayIndex)
            const toDay = days.find(d => d.dayIndex === toDayIndex)
            if (fromDay && toDay) {
                const idx = fromDay.tasks.findIndex(t => t.id === taskId)
                if (idx !== -1) {
                    const task = fromDay.tasks[idx]!
                    fromDay.tasks = fromDay.tasks.filter((_, i) => i !== idx)
                    toDay.tasks = [...toDay.tasks, task]
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

    const updateTaskLive = React.useCallback(async (taskId: string, patch: Partial<LiveTask>) => {
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

    const deleteTaskLive = React.useCallback(async (taskId: string) => {
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

    const createTaskLive = React.useCallback(async (dayIndex: number, task: LiveTask) => {
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

    const updateDayLive = React.useCallback(async (dayIndex: number, patch: Partial<LiveDay>) => {
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

    const toggleTaskLive = React.useCallback(async (taskId: string) => {
        let newCompleted = false
        setCampaignState(prev => {
            if (!prev) return prev
            return {
                ...prev,
                days: prev.days.map(d => ({
                    ...d,
                    tasks: d.tasks.map(t => {
                        if (t.id === taskId) {
                            newCompleted = !t.completed
                            return { ...t, completed: newCompleted }
                        }
                        // Check subtasks
                        if (t.subtasks.some(st => st.id === taskId)) {
                            newCompleted = !(t.completedSubtasks?.[taskId])
                            return { ...t, completedSubtasks: { ...t.completedSubtasks, [taskId]: newCompleted } }
                        }
                        return t
                    })
                }))
            }
        })
        // Also update legacy completedTasks for backward compat
        setProgress(prev => ({
            ...prev,
            completedTasks: { ...prev.completedTasks, [taskId]: newCompleted }
        }))
        await fetch(API_URL, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'toggle-task', taskId, completed: newCompleted })
        })
    }, [])

    // === Legacy operations (keep for non-campaign features) ===

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

    const setNote = React.useCallback(async (dayIndex: number, note: string) => {
        // Update in campaignState
        setCampaignState(prev => {
            if (!prev) return prev
            return {
                ...prev,
                days: prev.days.map(d => d.dayIndex === dayIndex ? { ...d, note } : d)
            }
        })
        // Also keep legacy
        setProgress(prev => ({ ...prev, notes: { ...prev.notes, [dayIndex]: note } }))
        try {
            await fetch(API_URL, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'set-note', dayIndex: String(dayIndex), note })
            })
        } catch {
            // revert
        }
    }, [])

    const isTaskCompleted = React.useCallback((taskId: string): boolean => {
        // Check campaignState first
        if (campaignState) {
            for (const day of campaignState.days) {
                const task = day.tasks.find(t => t.id === taskId)
                if (task) return !!task.completed
                for (const t of day.tasks) {
                    if (t.completedSubtasks?.[taskId]) return true
                    if (t.subtasks.some(st => st.id === taskId) && !t.completedSubtasks?.[taskId]) return false
                }
            }
        }
        // Fallback to legacy
        return progress.completedTasks[taskId] === true
    }, [campaignState, progress.completedTasks])

    const saveTaskOverride = React.useCallback(async (taskId: string, override: any) => {
        // Update in campaignState directly
        await updateTaskLive(taskId, override)
    }, [updateTaskLive])

    const getTaskOverride = React.useCallback((_taskId: string) => {
        return undefined // No longer needed — campaignState has merged data
    }, [])

    const saveOverviewSection = React.useCallback(async (sectionKey: string, value: { en: string, ru: string }) => {
        setProgress(prev => ({
            ...prev,
            overviewOverrides: { ...(prev.overviewOverrides ?? {}), [sectionKey]: value }
        }))
        try {
            await fetch(API_URL, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'set-overview-section', sectionKey, value })
            })
        } catch {
            setProgress(prev => {
                const overrides = { ...(prev.overviewOverrides ?? {}) }
                delete overrides[sectionKey]
                return { ...prev, overviewOverrides: overrides }
            })
        }
    }, [])

    // Sources moved to useSources hook (/api/sources)

    const saveWeekInsights = React.useCallback(async (phase: string, insights: InsightEntry[]) => {
        setProgress(prev => ({
            ...prev,
            weekInsights: { ...(prev.weekInsights ?? {}), [phase]: insights }
        }))
        try {
            await fetch(API_URL, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'set-week-insights', phase, insights })
            })
        } catch {
            setProgress(prev => ({
                ...prev,
                weekInsights: { ...(prev.weekInsights ?? {}), [phase]: progress.weekInsights?.[phase] ?? [] }
            }))
        }
    }, [progress.weekInsights])

    // Team moved to useTeam hook (/api/team)

    return {
        progress,
        isLoading,
        error,
        toggleTask: toggleTaskLive,
        setStartDate,
        setNote,
        isTaskCompleted,
        saveTaskOverride,
        getTaskOverride,
        saveOverviewSection,
        overviewOverrides: progress.overviewOverrides ?? {},
        weekInsights: progress.weekInsights ?? {},
        saveWeekInsights,
        // New campaign state
        campaignState,
        moveTaskLive,
        updateTaskLive,
        deleteTaskLive,
        createTaskLive,
        updateDayLive,
        refetch: fetchProgress
    }
}
