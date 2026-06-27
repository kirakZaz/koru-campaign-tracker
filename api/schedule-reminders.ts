import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Client } from '@upstash/qstash'

interface TeamMember {
    name: string
    assigneeKey: string
    email: string
    timezone: string
    reminderTime: string
    remindersEnabled: boolean
}

function getQStash() {
    return new Client({
        token: process.env.QSTASH_TOKEN ?? ''
    })
}

function toUtcCron(localTime: string, timezone: string): string {
    const [h, m] = localTime.split(':').map(Number)
    // Find current UTC offset for the timezone
    const ref = new Date()
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: 'numeric',
        minute: 'numeric',
        hourCycle: 'h23'
    }).formatToParts(ref)
    const localH = Number(parts.find((p) => p.type === 'hour')?.value ?? 0)
    const localM = Number(parts.find((p) => p.type === 'minute')?.value ?? 0)
    const offsetMin = (localH * 60 + localM) - (ref.getUTCHours() * 60 + ref.getUTCMinutes())

    let targetUtcMin = (h! * 60 + m!) - offsetMin
    if (targetUtcMin < 0) targetUtcMin += 1440
    if (targetUtcMin >= 1440) targetUtcMin -= 1440

    return `${targetUtcMin % 60} ${Math.floor(targetUtcMin / 60)} * * *`
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' })
        return
    }

    try {
        const { team } = req.body as { team: TeamMember[] }
        const qstash = getQStash()
        const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
            ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
            : 'https://campaign-tracker-flame.vercel.app'

        const results: { name: string, action: string, scheduleId?: string }[] = []

        for (const member of team) {
            const scheduleId = `koru-reminder-${member.name}`

            if (!member.remindersEnabled || !member.email) {
                // Try to delete existing schedule
                try {
                    const schedules = await qstash.schedules.list()
                    const existing = schedules.find((s) => s.scheduleId === scheduleId)
                    if (existing) {
                        await qstash.schedules.delete(existing.scheduleId)
                        results.push({ name: member.name, action: 'deleted' })
                    } else {
                        results.push({ name: member.name, action: 'skipped (disabled)' })
                    }
                } catch {
                    results.push({ name: member.name, action: 'skipped' })
                }
                continue
            }

            const cron = toUtcCron(member.reminderTime, member.timezone)

            try {
                // Delete existing schedule if any
                const schedules = await qstash.schedules.list()
                const existing = schedules.find((s) =>
                    s.destination === `${baseUrl}/api/cron/daily-reminder` &&
                    s.body?.includes(member.name)
                )
                if (existing) {
                    await qstash.schedules.delete(existing.scheduleId)
                }

                // Create new schedule
                const schedule = await qstash.schedules.create({
                    destination: `${baseUrl}/api/cron/daily-reminder`,
                    cron,
                    body: JSON.stringify({ memberName: member.name }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Upstash-Cron-Timezone': member.timezone
                    },
                    retries: 1
                })

                results.push({ name: member.name, action: 'scheduled', scheduleId: schedule.scheduleId })
            } catch (e) {
                results.push({ name: member.name, action: `error: ${String(e)}` })
            }
        }

        res.json({ ok: true, results })
    } catch (e) {
        res.status(500).json({ error: String(e) })
    }
}
