import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Redis } from '@upstash/redis'

const PROGRESS_KEY = 'koru-campaign-progress'

function getRedis() {
    return new Redis({
        url: process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? '',
        token: process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? ''
    })
}

const DEFAULT_DATA: Record<string, unknown> = { completedTasks: {}, startDate: null, notes: {}, taskOverrides: {} }

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const redis = getRedis()

    if (req.method === 'GET') {
        try {
            const data = await redis.get(PROGRESS_KEY)
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
            const data = (await redis.get<typeof DEFAULT_DATA>(PROGRESS_KEY)) ?? { ...DEFAULT_DATA }
            const { action } = req.body

            if (action === 'toggle-task') {
                data.completedTasks[req.body.taskId as string] = req.body.completed
            } else if (action === 'set-start-date') {
                data.startDate = req.body.startDate
            } else if (action === 'set-note') {
                if (!data.notes) {
                    data.notes = {}
                }
                (data.notes as Record<string, string>)[req.body.dayIndex as string] = req.body.note
            } else if (action === 'set-task-override') {
                if (!data.taskOverrides) {
                    data.taskOverrides = {}
                }
                (data.taskOverrides as Record<string, unknown>)[req.body.taskId as string] = req.body.override
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
