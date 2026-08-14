import express from 'express'
import cors from 'cors'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dirname, '..', 'data')
const PROGRESS_PATH = join(DATA_DIR, 'progress.json')
const SOURCES_PATH = join(DATA_DIR, 'sources.json')
const TEAM_PATH = join(DATA_DIR, 'team.json')
const USERS_PATH = join(DATA_DIR, 'users.json')
const UPLOADS_DIR = join(DATA_DIR, 'uploads')

// Load .env for local dev so secrets (seed passwords, KV keys) stay out of code.
const ENV_PATH = join(__dirname, '..', '.env')
if (existsSync(ENV_PATH)) {
    for (const line of readFileSync(ENV_PATH, 'utf-8').split('\n')) {
        const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*?)\s*$/)
        if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '')
    }
}

const app = express()
const PORT = 3101

app.use(cors())
app.use(express.json({ limit: '15mb' }))

if (!existsSync(UPLOADS_DIR)) mkdirSync(UPLOADS_DIR, { recursive: true })
app.use('/api/uploads', express.static(UPLOADS_DIR))

function readJSON(path, fallback) {
    if (!existsSync(path)) {
        writeFileSync(path, JSON.stringify(fallback, null, 4))
        return fallback
    }
    return JSON.parse(readFileSync(path, 'utf-8'))
}

function saveJSON(path, data) {
    writeFileSync(path, JSON.stringify(data, null, 4))
}

// ── /api/auth ──────────────────────────────────────────────────────
// Simple login gate. Users are seeded once (hashed, never plaintext).

// Usernames are emails. Initial passwords come from env (never committed).
// A user is seeded only if its SEED_PASSWORD_* env var is set.
const SEED_SPEC = [
    { username: 'kirka.zaz@gmail.com', name: 'Кира', envKey: 'SEED_PASSWORD_KIRA' },
    { username: 'max@koru-seo.com', name: 'Макс', envKey: 'SEED_PASSWORD_MAX' },
    { username: 'ad.ak091988@gmail.com', name: 'Настя', envKey: 'SEED_PASSWORD_NASTYA' }
]

function hashPassword(password, salt) {
    return scryptSync(password, salt, 64).toString('hex')
}

function makeUser({ username, name, password }) {
    const salt = randomBytes(16).toString('hex')
    return { username, name, salt, hash: hashPassword(password, salt) }
}

function buildSeedUsers() {
    return SEED_SPEC
        .filter((s) => process.env[s.envKey])
        .map((s) => makeUser({ username: s.username, name: s.name, password: process.env[s.envKey] }))
}

function getUsers() {
    if (!existsSync(USERS_PATH)) {
        const seeded = buildSeedUsers()
        saveJSON(USERS_PATH, seeded)
        return seeded
    }
    return JSON.parse(readFileSync(USERS_PATH, 'utf-8'))
}

function verifyPassword(user, password) {
    const attempt = Buffer.from(hashPassword(password, user.salt), 'hex')
    const stored = Buffer.from(user.hash, 'hex')
    return attempt.length === stored.length && timingSafeEqual(attempt, stored)
}

app.post('/api/auth', (req, res) => {
    try {
        const { action, username, password, newPassword } = req.body
        const users = getUsers()
        const uname = String(username ?? '').trim().toLowerCase()

        if (action === 'login') {
            const user = users.find((u) => u.username === uname)
            if (!user || !verifyPassword(user, String(password ?? ''))) {
                return res.status(401).json({ error: 'Invalid username or password' })
            }
            const token = randomBytes(24).toString('hex')
            return res.json({ ok: true, token, user: { username: user.username, name: user.name } })
        }

        if (action === 'set-password') {
            const user = users.find((u) => u.username === uname)
            // Same generic 401 for missing user or wrong password — don't leak which.
            if (!user || !verifyPassword(user, String(password ?? ''))) {
                return res.status(401).json({ error: 'Invalid current password' })
            }
            const np = String(newPassword ?? '')
            if (np.length < 4) return res.status(400).json({ error: 'Password too short' })
            user.salt = randomBytes(16).toString('hex')
            user.hash = hashPassword(np, user.salt)
            saveJSON(USERS_PATH, users)
            return res.json({ ok: true })
        }

        return res.status(400).json({ error: 'Unknown action' })
    } catch {
        res.status(500).json({ error: 'Auth failed' })
    }
})

// ── /api/progress ──────────────────────────────────────────────────

app.get('/api/progress', (_req, res) => {
    try {
        res.json(readJSON(PROGRESS_PATH, { completedTasks: {}, startDate: null, notes: {} }))
    } catch {
        res.status(500).json({ error: 'Failed to read progress' })
    }
})

app.post('/api/progress', (req, res) => {
    try {
        saveJSON(PROGRESS_PATH, req.body)
        res.json({ ok: true })
    } catch {
        res.status(500).json({ error: 'Failed to save progress' })
    }
})

app.patch('/api/progress', (req, res) => {
    try {
        const data = readJSON(PROGRESS_PATH, { completedTasks: {}, startDate: null, notes: {} })
        const { action } = req.body

        if (action === 'toggle-task') {
            data.completedTasks[req.body.taskId] = req.body.completed
        } else if (action === 'set-start-date') {
            data.startDate = req.body.startDate
        } else if (action === 'set-note') {
            if (!data.notes) data.notes = {}
            data.notes[req.body.dayIndex] = req.body.note
        } else if (action === 'set-task-override') {
            if (!data.taskOverrides) data.taskOverrides = {}
            data.taskOverrides[req.body.taskId] = req.body.override
        } else if (action === 'set-overview-section') {
            if (!data.overviewOverrides) data.overviewOverrides = {}
            data.overviewOverrides[req.body.sectionKey] = req.body.value
        } else if (action === 'set-week-insights') {
            if (!data.weekInsights) data.weekInsights = {}
            data.weekInsights[req.body.phase] = req.body.insights
        } else if (action === 'seed-campaign-state') {
            const incoming = req.body.campaignState
            if (!data.campaignState || (incoming && incoming.version > data.campaignState.version)) {
                data.campaignState = incoming
                delete data.completedTasks
                delete data.notes
                delete data.taskOverrides
                delete data.taskDayMoves
                delete data.dayOverrides
                delete data.team
                delete data.sources
            }
        } else if (action === 'save-campaign-state') {
            data.campaignState = req.body.campaignState
        } else if (action === 'move-task-live') {
            if (data.campaignState) {
                const { taskId, fromDayIndex, toDayIndex } = req.body
                const fromDay = data.campaignState.days.find(d => d.dayIndex === fromDayIndex)
                const toDay = data.campaignState.days.find(d => d.dayIndex === toDayIndex)
                if (fromDay && toDay) {
                    const idx = fromDay.tasks.findIndex(t => t.id === taskId)
                    if (idx !== -1) {
                        const [task] = fromDay.tasks.splice(idx, 1)
                        toDay.tasks.push(task)
                    }
                }
            }
        } else if (action === 'update-task-live') {
            if (data.campaignState) {
                const { taskId, patch } = req.body
                for (const day of data.campaignState.days) {
                    const task = day.tasks.find(t => t.id === taskId)
                    if (task) { Object.assign(task, patch, { _edited: true }); break }
                }
            }
        } else if (action === 'delete-task-live') {
            if (data.campaignState) {
                for (const day of data.campaignState.days) {
                    const idx = day.tasks.findIndex(t => t.id === req.body.taskId)
                    if (idx !== -1) { day.tasks.splice(idx, 1); break }
                }
            }
        } else if (action === 'create-task-live') {
            if (data.campaignState) {
                const day = data.campaignState.days.find(d => d.dayIndex === req.body.dayIndex)
                if (day) day.tasks.push(req.body.task)
            }
        } else if (action === 'update-day-live') {
            if (data.campaignState) {
                const day = data.campaignState.days.find(d => d.dayIndex === req.body.dayIndex)
                if (day) Object.assign(day, req.body.patch, { _edited: true })
            }
        }

        saveJSON(PROGRESS_PATH, data)
        res.json({ ok: true })
    } catch {
        res.status(500).json({ error: 'Failed to update progress' })
    }
})

// ── /api/sources ───────────────────────────────────────────────────

const DEFAULT_SOURCES = { people: [], groups: [], companies: [], shortlist: [], competitors: [], countries: [] }

app.get('/api/sources', (_req, res) => {
    try {
        let data = readJSON(SOURCES_PATH, null)
        if (!data) {
            // Migration: pull from legacy progress.json
            const legacy = readJSON(PROGRESS_PATH, {})
            data = legacy.sources ?? DEFAULT_SOURCES
            saveJSON(SOURCES_PATH, data)
        }
        res.json(data)
    } catch {
        res.status(500).json({ error: 'Failed to read sources' })
    }
})

app.patch('/api/sources', (req, res) => {
    try {
        const data = readJSON(SOURCES_PATH, { ...DEFAULT_SOURCES })
        const { action } = req.body

        if (action === 'set-sources') {
            Object.assign(data, req.body.sources)
        } else if (action === 'set-people') {
            data.people = req.body.people
        } else if (action === 'set-groups') {
            data.groups = req.body.groups
        } else if (action === 'set-companies') {
            data.companies = req.body.companies
        } else if (action === 'set-shortlist') {
            data.shortlist = req.body.shortlist
        } else if (action === 'set-competitors') {
            data.competitors = req.body.competitors
        } else if (action === 'set-countries') {
            data.countries = req.body.countries
        }

        saveJSON(SOURCES_PATH, data)
        res.json({ ok: true })
    } catch {
        res.status(500).json({ error: 'Failed to update sources' })
    }
})

// ── /api/team ──────────────────────────────────────────────────────

app.get('/api/team', (_req, res) => {
    try {
        let data = readJSON(TEAM_PATH, null)
        if (!data) {
            const legacy = readJSON(PROGRESS_PATH, {})
            data = legacy.team ?? []
            saveJSON(TEAM_PATH, data)
        }
        res.json(data)
    } catch {
        res.status(500).json({ error: 'Failed to read team' })
    }
})

app.patch('/api/team', (req, res) => {
    try {
        saveJSON(TEAM_PATH, req.body.team)
        res.json({ ok: true })
    } catch {
        res.status(500).json({ error: 'Failed to update team' })
    }
})

// ── /api/upload ─────────────────────────────────────────────────────
// Accepts an image as a base64 data URL, writes it to data/uploads/,
// returns its URL (served under /api/uploads, which vite proxies).

const EXT_BY_MIME = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/jpg': 'jpg', 'image/webp': 'webp', 'image/gif': 'gif' }

app.post('/api/upload', (req, res) => {
    try {
        const { dataUrl } = req.body
        const m = typeof dataUrl === 'string' && dataUrl.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/)
        if (!m) return res.status(400).json({ error: 'Expected an image data URL' })
        const ext = EXT_BY_MIME[m[1]] || 'png'
        const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`
        writeFileSync(join(UPLOADS_DIR, name), Buffer.from(m[2], 'base64'))
        res.json({ url: `/api/uploads/${name}` })
    } catch {
        res.status(500).json({ error: 'Failed to upload' })
    }
})

// ────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
    console.log(`Campaign tracker server running on http://localhost:${PORT}`)
})
