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
    startDate: string | null
    overviewOverrides?: Record<string, { en: string, ru: string }>
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
            note: string
            _edited: boolean
            keyMetric?: string
            calendarDayOffset?: number
        }>
    }
}

const DEFAULT_DATA: ProgressData = { startDate: null }

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

            if (action === 'toggle-task') {
                if (data.campaignState) {
                    const { taskId, completed } = req.body as { taskId: string, completed: boolean }
                    for (const day of data.campaignState.days) {
                        const task = day.tasks.find((t: any) => t.id === taskId)
                        if (task) { task.completed = completed; break }
                        for (const t of day.tasks) {
                            if ((t as any).subtasks?.some((st: any) => st.id === taskId)) {
                                if (!(t as any).completedSubtasks) (t as any).completedSubtasks = {}
                                ;(t as any).completedSubtasks[taskId] = completed
                                break
                            }
                        }
                    }
                }
            } else if (action === 'set-start-date') {
                data.startDate = req.body.startDate as string
            } else if (action === 'set-overview-section') {
                if (!data.overviewOverrides) data.overviewOverrides = {} as any
                data.overviewOverrides[req.body.sectionKey as string] = req.body.value as { en: string, ru: string }
            } else if (action === 'set-week-insights') {
                if (!data.weekInsights) data.weekInsights = {}
                data.weekInsights[req.body.phase as string] = req.body.insights
            } else if (action === 'seed-campaign-state') {
                // Only seed if not already present or if version is newer
                const incoming = req.body.campaignState as ProgressData['campaignState']
                if (!data.campaignState || (incoming && incoming.version > data.campaignState.version)) {
                    data.campaignState = incoming
                    // Clean up legacy fields merged into campaignState
                    delete (data as any).completedTasks
                    delete (data as any).notes
                    delete (data as any).taskOverrides
                    delete (data as any).taskDayMoves
                    delete (data as any).dayOverrides
                    delete (data as any).team
                    delete (data as any).sources
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
