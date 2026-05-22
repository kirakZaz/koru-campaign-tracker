import * as React from 'react'
import type { ProgressData, TaskOverride } from '@/data/campaignData.types'

const API_URL = '/api/progress'

const DEFAULT_PROGRESS: ProgressData = {
    completedTasks: {},
    startDate: null,
    notes: {}
}

export function useProgress() {
    const [progress, setProgress] = React.useState<ProgressData>(DEFAULT_PROGRESS)
    const [isLoading, setIsLoading] = React.useState(true)
    const [error, setError] = React.useState<string | null>(null)

    const fetchProgress = React.useCallback(async () => {
        try {
            const res = await fetch(API_URL)
            if (!res.ok) {
                throw new Error('Failed to fetch')
            }
            const data = await res.json() as ProgressData
            setProgress(data)
            setError(null)
        } catch {
            setError('Failed to load progress')
        } finally {
            setIsLoading(false)
        }
    }, [])

    React.useEffect(() => {
        void fetchProgress()
    }, [fetchProgress])

    const toggleTask = React.useCallback(async (taskId: string) => {
        const newCompleted = !progress.completedTasks[taskId]
        const updated = {
            ...progress,
            completedTasks: { ...progress.completedTasks, [taskId]: newCompleted }
        }
        setProgress(updated)

        try {
            await fetch(API_URL, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'toggle-task', taskId, completed: newCompleted })
            })
        } catch {
            setProgress(progress)
        }
    }, [progress])

    const setStartDate = React.useCallback(async (date: string) => {
        const updated = { ...progress, startDate: date }
        setProgress(updated)

        try {
            await fetch(API_URL, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'set-start-date', startDate: date })
            })
        } catch {
            setProgress(progress)
        }
    }, [progress])

    const setNote = React.useCallback(async (dayIndex: number, note: string) => {
        const updated = {
            ...progress,
            notes: { ...progress.notes, [dayIndex]: note }
        }
        setProgress(updated)

        try {
            await fetch(API_URL, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'set-note', dayIndex: String(dayIndex), note })
            })
        } catch {
            setProgress(progress)
        }
    }, [progress])

    const isTaskCompleted = React.useCallback((taskId: string): boolean => {
        return progress.completedTasks[taskId] === true
    }, [progress.completedTasks])

    const saveTaskOverride = React.useCallback(async (taskId: string, override: TaskOverride) => {
        const overrides = progress.taskOverrides ?? {}
        const updated = {
            ...progress,
            taskOverrides: { ...overrides, [taskId]: override }
        }
        setProgress(updated)

        try {
            await fetch(API_URL, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'set-task-override', taskId, override })
            })
        } catch {
            setProgress(progress)
        }
    }, [progress])

    const getTaskOverride = React.useCallback((taskId: string): TaskOverride | undefined => {
        return progress.taskOverrides?.[taskId]
    }, [progress.taskOverrides])

    return {
        progress,
        isLoading,
        error,
        toggleTask,
        setStartDate,
        setNote,
        isTaskCompleted,
        saveTaskOverride,
        getTaskOverride,
        refetch: fetchProgress
    }
}
