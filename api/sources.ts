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
            const data = (await redis.get<SourcesData>(SOURCES_KEY)) ?? { ...DEFAULT_SOURCES }
            const { action } = req.body as { action: string, [key: string]: unknown }

            if (action === 'set-sources') {
                const incoming = req.body.sources as SourcesData
                Object.assign(data, incoming)
            } else if (action === 'set-people') {
                data.people = req.body.people as unknown[]
            } else if (action === 'set-groups') {
                data.groups = req.body.groups as unknown[]
            } else if (action === 'set-companies') {
                data.companies = req.body.companies as unknown[]
            } else if (action === 'set-shortlist') {
                data.shortlist = req.body.shortlist as unknown[]
            } else if (action === 'set-competitors') {
                data.competitors = req.body.competitors as unknown[]
            } else if (action === 'set-countries') {
                data.countries = req.body.countries as string[]
            }

            await redis.set(SOURCES_KEY, data)
            res.json({ ok: true })
        } catch {
            res.status(500).json({ error: 'Failed to update sources' })
        }
        return
    }

    res.status(405).json({ error: 'Method not allowed' })
}
