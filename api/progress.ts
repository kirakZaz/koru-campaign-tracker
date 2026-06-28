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
    team: unknown[]
    overviewOverrides: Record<string, { en: string, ru: string }>
    sources: { people: unknown[], groups: unknown[], companies: unknown[], shortlist: unknown[] }
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

            if (action === 'toggle-task') {
                data.completedTasks[req.body.taskId as string] = req.body.completed as boolean
            } else if (action === 'set-start-date') {
                data.startDate = req.body.startDate as string
            } else if (action === 'set-note') {
                data.notes[req.body.dayIndex as string] = req.body.note as string
            } else if (action === 'set-task-override') {
                data.taskOverrides[req.body.taskId as string] = req.body.override
            } else if (action === 'set-team') {
                data.team = req.body.team as unknown[]
            } else if (action === 'set-overview-section') {
                if (!data.overviewOverrides) data.overviewOverrides = {}
                data.overviewOverrides[req.body.sectionKey as string] = req.body.value as { en: string, ru: string }
            } else if (action === 'set-sources') {
                data.sources = req.body.sources as ProgressData['sources']
            } else if (action === 'set-week-insights') {
                if (!data.weekInsights) data.weekInsights = {}
                data.weekInsights[req.body.phase as string] = req.body.insights
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
