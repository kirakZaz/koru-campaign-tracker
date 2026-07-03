import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Redis } from '@upstash/redis'

const PROGRESS_KEY = 'koru-campaign-progress'

function getRedis() {
    return new Redis({
        url: process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? '',
        token: process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? ''
    })
}

interface ProgressData {
    completedTasks: Record<string, boolean>
    startDate: string | null
    notes: Record<string, string>
    taskOverrides: Record<string, unknown>
    taskDayMoves?: Record<string, number>
    dayOverrides?: Record<string, { title?: string, summary?: string }>
    team: unknown[]
    overviewOverrides: Record<string, { en: string, ru: string }>
    sources: { people: unknown[], groups: unknown[], companies: unknown[], shortlist: unknown[], competitors?: unknown[], countries?: string[] }
    weekInsights?: Record<string, unknown[]>
    campaignState?: {
        version: number
        days: Array<{
            dayIndex: number
            phase: string
            dayLabel: string
            title: string
            summary: string
            tasks: Array<Record<string, unknown>>
            note?: string
            _edited?: boolean
            keyMetric?: string
            calendarDayOffset?: number
        }>
    }
}

const DEFAULT_DATA: ProgressData = { completedTasks: {}, startDate: null, notes: {}, taskOverrides: {}, team: [], overviewOverrides: {}, sources: { people: [], groups: [], companies: [], shortlist: [] } }

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const redis = getRedis()

    if (req.method === 'GET') {
        try {
            const data = await redis.get<ProgressData>(PROGRESS_KEY)
            res.json(data ?? DEFAULT_DATA)
        } catch {
            res.status(500).json({ error: 'Failed to read progress' })
        }
        return
    }

    if (req.method === 'POST') {
        try {
            await redis.set(PROGRESS_KEY, req.body)
            res.json({ ok: true })
        } catch {
            res.status(500).json({ error: 'Failed to save progress' })
        }
        return
    }

    if (req.method === 'PATCH') {
        try {
            const data: ProgressData = (await redis.get<ProgressData>(PROGRESS_KEY)) ?? { ...DEFAULT_DATA }
            const { action } = req.body as { action: string, [key: string]: unknown }

            // === Legacy actions (kept for backward compat) ===
            if (action === 'toggle-task') {
                data.completedTasks[req.body.taskId as string] = req.body.completed as boolean
                // Also update in campaignState if exists
                if (data.campaignState) {
                    for (const day of data.campaignState.days) {
                        const task = day.tasks.find((t: any) => t.id === req.body.taskId)
                        if (task) { task.completed = req.body.completed; break }
                        // Check subtasks
                        for (const t of day.tasks) {
                            if ((t as any).subtasks?.some((st: any) => st.id === req.body.taskId)) {
                                if (!(t as any).completedSubtasks) (t as any).completedSubtasks = {}
                                ;(t as any).completedSubtasks[req.body.taskId as string] = req.body.completed
                                break
                            }
                        }
                    }
                }
            } else if (action === 'set-start-date') {
                data.startDate = req.body.startDate as string
            } else if (action === 'set-note') {
                data.notes[req.body.dayIndex as string] = req.body.note as string
                // Also update in campaignState
                if (data.campaignState) {
                    const day = data.campaignState.days.find(d => d.dayIndex === Number(req.body.dayIndex))
                    if (day) day.note = req.body.note as string
                }
            } else if (action === 'set-task-override') {
                data.taskOverrides[req.body.taskId as string] = req.body.override
            } else if (action === 'set-team') {
                data.team = req.body.team as unknown[]
            } else if (action === 'set-overview-section') {
                if (!data.overviewOverrides) data.overviewOverrides = {} as any
                data.overviewOverrides[req.body.sectionKey as string] = req.body.value as { en: string, ru: string }
            } else if (action === 'set-sources') {
                data.sources = req.body.sources as ProgressData['sources']
            } else if (action === 'set-week-insights') {
                if (!data.weekInsights) data.weekInsights = {}
                data.weekInsights[req.body.phase as string] = req.body.insights
            } else if (action === 'set-task-day-move') {
                if (!data.taskDayMoves) data.taskDayMoves = {}
                data.taskDayMoves[req.body.taskId as string] = req.body.dayIndex as number
            } else if (action === 'set-day-override') {
                if (!data.dayOverrides) data.dayOverrides = {}
                data.dayOverrides[req.body.dayIndex as string] = req.body.override as { title?: string, summary?: string }

            // === Campaign State actions (new single source of truth) ===
            } else if (action === 'seed-campaign-state') {
                // Only seed if not already present or if version is newer
                const incoming = req.body.campaignState as ProgressData['campaignState']
                if (!data.campaignState || (incoming && incoming.version > data.campaignState.version)) {
                    data.campaignState = incoming
                }
            } else if (action === 'save-campaign-state') {
                data.campaignState = req.body.campaignState as ProgressData['campaignState']
            } else if (action === 'move-task-live') {
                if (data.campaignState) {
                    const { taskId, fromDayIndex, toDayIndex } = req.body as { taskId: string, fromDayIndex: number, toDayIndex: number }
                    const fromDay = data.campaignState.days.find(d => d.dayIndex === fromDayIndex)
                    const toDay = data.campaignState.days.find(d => d.dayIndex === toDayIndex)
                    if (fromDay && toDay) {
                        const idx = fromDay.tasks.findIndex((t: any) => t.id === taskId)
                        if (idx !== -1) {
                            const [task] = fromDay.tasks.splice(idx, 1)
                            toDay.tasks.push(task)
                        }
                    }
                }
            } else if (action === 'update-task-live') {
                if (data.campaignState) {
                    const { taskId, patch } = req.body as { taskId: string, patch: Record<string, unknown> }
                    for (const day of data.campaignState.days) {
                        const task = day.tasks.find((t: any) => t.id === taskId)
                        if (task) {
                            Object.assign(task, patch, { _edited: true })
                            break
                        }
                    }
                }
            } else if (action === 'delete-task-live') {
                if (data.campaignState) {
                    const { taskId } = req.body as { taskId: string }
                    for (const day of data.campaignState.days) {
                        const idx = day.tasks.findIndex((t: any) => t.id === taskId)
                        if (idx !== -1) { day.tasks.splice(idx, 1); break }
                    }
                }
            } else if (action === 'create-task-live') {
                if (data.campaignState) {
                    const { dayIndex, task } = req.body as { dayIndex: number, task: Record<string, unknown> }
                    const day = data.campaignState.days.find(d => d.dayIndex === dayIndex)
                    if (day) day.tasks.push(task as any)
                }
            } else if (action === 'update-day-live') {
                if (data.campaignState) {
                    const { dayIndex, patch } = req.body as { dayIndex: number, patch: Record<string, unknown> }
                    const day = data.campaignState.days.find(d => d.dayIndex === dayIndex)
                    if (day) Object.assign(day, patch, { _edited: true })
                }
            }

            await redis.set(PROGRESS_KEY, data)
            res.json({ ok: true })
        } catch {
            res.status(500).json({ error: 'Failed to update progress' })
        }
        return
    }

    res.status(405).json({ error: 'Method not allowed' })
}
