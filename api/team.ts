import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Redis } from '@upstash/redis'

const TEAM_KEY = 'koru-campaign-team'
const LEGACY_KEY = 'koru-campaign-progress'

function getRedis() {
    return new Redis({
        url: process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? '',
        token: process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? ''
    })
}

interface TeamMember {
    name: string
    assigneeKey: string
    email: string
    timezone: string
    reminderTime: string
    remindersEnabled: boolean
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const redis = getRedis()

    if (req.method === 'GET') {
        try {
            let data = await redis.get<TeamMember[]>(TEAM_KEY)
            if (!data) {
                // Migration: pull from legacy key on first access
                const legacy = await redis.get<Record<string, unknown>>(LEGACY_KEY)
                if (legacy?.team && Array.isArray(legacy.team) && legacy.team.length > 0) {
                    data = legacy.team as TeamMember[]
                    await redis.set(TEAM_KEY, data)
                } else {
                    data = []
                }
            }
            res.json(data)
        } catch {
            res.status(500).json({ error: 'Failed to read team' })
        }
        return
    }

    if (req.method === 'PATCH') {
        try {
            const { team } = req.body as { team: TeamMember[] }
            await redis.set(TEAM_KEY, team)
            res.json({ ok: true })
        } catch {
            res.status(500).json({ error: 'Failed to update team' })
        }
        return
    }

    res.status(405).json({ error: 'Method not allowed' })
}
