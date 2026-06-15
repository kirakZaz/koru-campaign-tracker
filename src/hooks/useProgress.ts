import * as React from 'react'
import type { ProgressData, TaskOverride, TeamMember, SourcesData } from '@/data/campaignData.types'
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
        let newCompleted = false
        setProgress(prev => {
            newCompleted = !prev.completedTasks[taskId]
            return { ...prev, completedTasks: { ...prev.completedTasks, [taskId]: newCompleted } }
        })

        try {
            await fetch(API_URL, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'toggle-task', taskId, completed: newCompleted })
            })
        } catch {
            setProgress(prev => ({ ...prev, completedTasks: { ...prev.completedTasks, [taskId]: !newCompleted } }))
        }
    }, [])

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
        setProgress(prev => ({ ...prev, notes: { ...prev.notes, [dayIndex]: note } }))

        try {
            await fetch(API_URL, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'set-note', dayIndex: String(dayIndex), note })
            })
        } catch {
            setProgress(prev => {
                const notes = { ...prev.notes }
                delete notes[dayIndex]
                return { ...prev, notes }
            })
        }
    }, [])

    const isTaskCompleted = React.useCallback((taskId: string): boolean => {
        return progress.completedTasks[taskId] === true
    }, [progress.completedTasks])

    const saveTaskOverride = React.useCallback(async (taskId: string, override: TaskOverride) => {
        setProgress(prev => ({
            ...prev,
            taskOverrides: { ...(prev.taskOverrides ?? {}), [taskId]: override }
        }))

        try {
            await fetch(API_URL, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'set-task-override', taskId, override })
            })
        } catch {
            setProgress(prev => {
                const overrides = { ...(prev.taskOverrides ?? {}) }
                delete overrides[taskId]
                return { ...prev, taskOverrides: overrides }
            })
        }
    }, [])

    const getTaskOverride = React.useCallback((taskId: string): TaskOverride | undefined => {
        return progress.taskOverrides?.[taskId]
    }, [progress.taskOverrides])

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

    const saveSources = React.useCallback(async (sources: SourcesData) => {
        setProgress(prev => ({ ...prev, sources }))

        try {
            await fetch(API_URL, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'set-sources', sources })
            })
        } catch {
            setProgress(prev => ({ ...prev, sources: progress.sources }))
        }
    }, [progress.sources])

    const saveTeam = React.useCallback(async (team: TeamMember[]) => {
        setProgress(prev => ({ ...prev, team }))

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
            setProgress(prev => ({ ...prev, team: progress.team ?? [] }))
        }
    }, [progress.team])

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
        saveSources,
        saveOverviewSection,
        overviewOverrides: progress.overviewOverrides ?? {},
        sources: { people: [], groups: [], companies: [], shortlist: [], ...(progress.sources ?? {}) },
        refetch: fetchProgress
    }
}
