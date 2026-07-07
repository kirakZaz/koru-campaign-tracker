import express from 'express'
import cors from 'cors'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = join(__dirname, '..', 'data')
const PROGRESS_PATH = join(DATA_DIR, 'progress.json')
const SOURCES_PATH = join(DATA_DIR, 'sources.json')
const TEAM_PATH = join(DATA_DIR, 'team.json')
const app = express()
const PORT = 3101

app.use(cors())
app.use(express.json({ limit: '5mb' }))

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

// ────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
    console.log(`Campaign tracker server running on http://localhost:${PORT}`)
})
