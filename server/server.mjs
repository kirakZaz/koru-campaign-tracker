import express from 'express'
import cors from 'cors'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_PATH = join(__dirname, '..', 'data', 'progress.json')
const app = express()
const PORT = 3101

app.use(cors())
app.use(express.json())

function readProgress() {
    if (!existsSync(DATA_PATH)) {
        const initial = { completedTasks: {}, startDate: null, notes: {} }
        writeFileSync(DATA_PATH, JSON.stringify(initial, null, 4))
        return initial
    }
    return JSON.parse(readFileSync(DATA_PATH, 'utf-8'))
}

function saveProgress(data) {
    writeFileSync(DATA_PATH, JSON.stringify(data, null, 4))
}

app.get('/api/progress', (_req, res) => {
    try {
        const data = readProgress()
        res.json(data)
    } catch {
        res.status(500).json({ error: 'Failed to read progress' })
    }
})

app.post('/api/progress', (req, res) => {
    try {
        saveProgress(req.body)
        res.json({ ok: true })
    } catch {
        res.status(500).json({ error: 'Failed to save progress' })
    }
})

app.patch('/api/progress', (req, res) => {
    try {
        const data = readProgress()
        const { action } = req.body

        if (action === 'toggle-task') {
            data.completedTasks[req.body.taskId] = req.body.completed
        } else if (action === 'set-start-date') {
            data.startDate = req.body.startDate
        } else if (action === 'set-note') {
            if (!data.notes) {
                data.notes = {}
            }
            data.notes[req.body.dayIndex] = req.body.note
        } else if (action === 'set-task-override') {
            if (!data.taskOverrides) {
                data.taskOverrides = {}
            }
            data.taskOverrides[req.body.taskId] = req.body.override
        } else if (action === 'set-team') {
            data.team = req.body.team
        } else if (action === 'set-overview-section') {
            if (!data.overviewOverrides) {
                data.overviewOverrides = {}
            }
            data.overviewOverrides[req.body.sectionKey] = req.body.value
        }

        saveProgress(data)
        res.json({ ok: true })
    } catch {
        res.status(500).json({ error: 'Failed to update progress' })
    }
})

app.listen(PORT, () => {
    console.log(`Campaign tracker server running on http://localhost:${PORT}`)
})
