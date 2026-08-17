import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Redis } from '@upstash/redis'

const SOURCES_KEY = 'koru-campaign-sources'
const LEGACY_KEY = 'koru-campaign-progress'

function getRedis() {
    return new Redis({
        url: process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? '',
        token: process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? ''
    })
}

interface SourcesData {
    people: unknown[]
    groups: unknown[]
    companies: unknown[]
    shortlist: unknown[]
    competitors: unknown[]
    countries: string[]
}

const DEFAULT_SOURCES: SourcesData = {
    people: [],
    groups: [],
    companies: [],
    shortlist: [],
    competitors: [],
    countries: []
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const redis = getRedis()

    if (req.method === 'GET') {
        try {
            let data = await redis.get<SourcesData>(SOURCES_KEY)
            if (!data) {
                // Migration: pull from legacy key on first access
                const legacy = await redis.get<Record<string, unknown>>(LEGACY_KEY)
                if (legacy?.sources) {
                    data = legacy.sources as SourcesData
                    await redis.set(SOURCES_KEY, data)
                } else {
                    data = DEFAULT_SOURCES
                }
            }
            res.json(data)
        } catch {
            res.status(500).json({ error: 'Failed to read sources' })
        }
        return
    }

    if (req.method === 'PATCH') {
        try {
            // Vercel may hand us the body as a raw string for larger payloads —
            // parse it so req.body.sources isn't silently undefined (which made
            // Object.assign a no-op → 200 OK but nothing saved).
            const body = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as { action?: string, [key: string]: unknown }
            if (!body || typeof body !== 'object' || !body.action) {
                res.status(400).json({ error: 'Bad body', bodyType: typeof req.body })
                return
            }
            const data = (await redis.get<SourcesData>(SOURCES_KEY)) ?? { ...DEFAULT_SOURCES }
            const { action } = body

            if (action === 'set-sources') {
                if (!body.sources || typeof body.sources !== 'object') {
                    res.status(400).json({ error: 'set-sources: sources missing/not an object' })
                    return
                }
                Object.assign(data, body.sources as SourcesData)
            } else if (action === 'set-people') {
                data.people = body.people as unknown[]
            } else if (action === 'set-groups') {
                data.groups = body.groups as unknown[]
            } else if (action === 'set-companies') {
                data.companies = body.companies as unknown[]
            } else if (action === 'set-shortlist') {
                data.shortlist = body.shortlist as unknown[]
            } else if (action === 'set-competitors') {
                data.competitors = body.competitors as unknown[]
            } else if (action === 'set-countries') {
                data.countries = body.countries as string[]
            } else {
                res.status(400).json({ error: `Unknown action: ${action}` })
                return
            }

            await redis.set(SOURCES_KEY, data)
            res.json({ ok: true, people: data.people.length, shortlist: data.shortlist.length })
        } catch (e) {
            res.status(500).json({ error: 'Failed to update sources', detail: String(e) })
        }
        return
    }

    res.status(405).json({ error: 'Method not allowed' })
}
