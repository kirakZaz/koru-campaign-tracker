import * as React from 'react'
import type { ProgressData, TaskOverride, TeamMember } from '@/data/campaignData.types'
import { CAMPAIGN_DAYS } from '@/data/campaignData'

const API_URL = '/api/progress'

function buildTaskMap() {
    const assigneeMap: Record<string, number[]> = {}
    const tasksByDay: Record<number, string[]> = {}

    for (const day of CAMPAIGN_DAYS) {
        const taskIds: string[] = []
        for (const task of day.tasks) {
            taskIds.push(task.id)
            // Match composite assignees (e.g. "Кира + Настя" → both)
            const names = ['Кира', 'Настя', 'Макс']
            for (const name of names) {
                if (task.assignee.includes(name)) {
                    if (!assigneeMap[name]) {
                        assigneeMap[name] = []
                    }
                    if (!assigneeMap[name]!.includes(day.dayIndex)) {
                        assigneeMap[name]!.push(day.dayIndex)
                    }
                }
            }
        }
        if (taskIds.length > 0) {
            tasksByDay[day.dayIndex] = taskIds
        }
    }
    return { assigneeMap, tasksByDay }
}

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

    const saveOverviewSection = React.useCallback(async (sectionKey: string, value: { en: string, ru: string }) => {
        const overrides = progress.overviewOverrides ?? {}
        const updated = {
            ...progress,
            overviewOverrides: { ...overrides, [sectionKey]: value }
        }
        setProgress(updated)

        try {
            await fetch(API_URL, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'set-overview-section', sectionKey, value })
            })
        } catch {
            setProgress(progress)
        }
    }, [progress])

    const saveTeam = React.useCallback(async (team: TeamMember[]) => {
        const updated = { ...progress, team }
        setProgress(updated)

        try {
            await fetch(API_URL, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'set-team', team })
            })
            // Sync task map for smart reminders
            await fetch('/api/sync-task-map', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(buildTaskMap())
            })
            // Schedule reminders via QStash
            await fetch('/api/schedule-reminders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ team })
            })
        } catch {
            setProgress(progress)
        }
    }, [progress])

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
        saveTeam,
        saveOverviewSection,
        overviewOverrides: progress.overviewOverrides ?? {},
        refetch: fetchProgress
    }
}
