import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Redis } from '@upstash/redis'
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto'

const USERS_KEY = 'koru-campaign-users'

function getRedis() {
    return new Redis({
        url: process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? '',
        token: process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? ''
    })
}

interface StoredUser {
    username: string
    name: string
    salt: string
    hash: string
}

const SEED_USERS = [
    { username: 'kira', name: 'Кира', password: 'REMOVED' },
    { username: 'max', name: 'Макс', password: 'REMOVED' },
    { username: 'nastya', name: 'Настя', password: 'REMOVED' }
]

function hashPassword(password: string, salt: string): string {
    return scryptSync(password, salt, 64).toString('hex')
}

function makeUser(u: { username: string; name: string; password: string }): StoredUser {
    const salt = randomBytes(16).toString('hex')
    return { username: u.username, name: u.name, salt, hash: hashPassword(u.password, salt) }
}

function verifyPassword(user: StoredUser, password: string): boolean {
    const attempt = Buffer.from(hashPassword(password, user.salt), 'hex')
    const stored = Buffer.from(user.hash, 'hex')
    return attempt.length === stored.length && timingSafeEqual(attempt, stored)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' })
        return
    }

    const redis = getRedis()
    try {
        const { action, username, password, newPassword } = req.body as {
            action?: string
            username?: string
            password?: string
            newPassword?: string
        }

        let users = await redis.get<StoredUser[]>(USERS_KEY)
        if (!users || users.length === 0) {
            users = SEED_USERS.map(makeUser)
            await redis.set(USERS_KEY, users)
        }

        const uname = String(username ?? '').trim().toLowerCase()

        if (action === 'login') {
            const user = users.find((u) => u.username === uname)
            if (!user || !verifyPassword(user, String(password ?? ''))) {
                res.status(401).json({ error: 'Invalid username or password' })
                return
            }
            const token = randomBytes(24).toString('hex')
            res.json({ ok: true, token, user: { username: user.username, name: user.name } })
            return
        }

        if (action === 'set-password') {
            const user = users.find((u) => u.username === uname)
            // Same generic 401 for missing user or wrong password — don't leak which.
            if (!user || !verifyPassword(user, String(password ?? ''))) {
                res.status(401).json({ error: 'Invalid current password' })
                return
            }
            const np = String(newPassword ?? '')
            if (np.length < 4) {
                res.status(400).json({ error: 'Password too short' })
                return
            }
            user.salt = randomBytes(16).toString('hex')
            user.hash = hashPassword(np, user.salt)
            await redis.set(USERS_KEY, users)
            res.json({ ok: true })
            return
        }

        res.status(400).json({ error: 'Unknown action' })
    } catch {
        res.status(500).json({ error: 'Auth failed' })
    }
}
