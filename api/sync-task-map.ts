import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Redis } from '@upstash/redis'

const TASK_MAP_KEY = 'koru-campaign-task-map'

function getRedis() {
    return new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL ?? '',
        token: process.env.UPSTASH_REDIS_REST_TOKEN ?? ''
    })
}

// Frontend sends task map: { assignee -> [dayIndex, dayIndex, ...] }
// and tasksByDay: { dayIndex -> [taskId, taskId, ...] }
export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' })
        return
    }

    try {
        const redis = getRedis()
        const { assigneeMap, tasksByDay } = req.body as {
            assigneeMap: Record<string, number[]>
            tasksByDay: Record<number, string[]>
        }

        await redis.set(TASK_MAP_KEY, { assigneeMap, tasksByDay })
        res.json({ ok: true })
    } catch (e) {
        res.status(500).json({ error: String(e) })
    }
}
