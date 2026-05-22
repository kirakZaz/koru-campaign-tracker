import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Redis } from '@upstash/redis'
import { Resend } from 'resend'

const PROGRESS_KEY = 'koru-campaign-progress'

interface TeamMember {
    name: string
    assigneeKey: string
    email: string
    timezone: string
    reminderTime: string
    remindersEnabled: boolean
}

interface CampaignTask {
    id: string
    title: string
    description: string
    assignee: string
}

interface CampaignDay {
    dayIndex: number
    dayLabel: string
    title: string
    tasks: CampaignTask[]
}

interface ProgressData {
    completedTasks: Record<string, boolean>
    startDate: string | null
    team: TeamMember[]
}

function getRedis() {
    return new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL ?? '',
        token: process.env.UPSTASH_REDIS_REST_TOKEN ?? ''
    })
}

function addBusinessDays(start: Date, days: number): Date {
    const result = new Date(start)
    let added = 0
    while (added < days) {
        result.setDate(result.getDate() + 1)
        const dow = result.getDay()
        if (dow !== 0 && dow !== 6) {
            added++
        }
    }
    return result
}

function differenceInBusinessDays(a: Date, b: Date): number {
    let count = 0
    const start = new Date(Math.min(a.getTime(), b.getTime()))
    const end = new Date(Math.max(a.getTime(), b.getTime()))
    const cursor = new Date(start)
    while (cursor < end) {
        cursor.setDate(cursor.getDate() + 1)
        const dow = cursor.getDay()
        if (dow !== 0 && dow !== 6) {
            count++
        }
    }
    return a >= b ? count : -count
}

function getCurrentTimeInTimezone(tz: string): { hours: number, minutes: number } {
    const now = new Date()
    const timeStr = now.toLocaleTimeString('en-US', { timeZone: tz, hour12: false, hour: '2-digit', minute: '2-digit' })
    const [h, m] = timeStr.split(':').map(Number)
    return { hours: h ?? 0, minutes: m ?? 0 }
}

function shouldSendNow(member: TeamMember): boolean {
    if (!member.remindersEnabled || !member.email) {
        return false
    }
    const { hours, minutes } = getCurrentTimeInTimezone(member.timezone)
    const [targetH, targetM] = member.reminderTime.split(':').map(Number)
    // Send if within 30-minute window of target time (cron runs every 30 min)
    const currentMin = (hours ?? 0) * 60 + (minutes ?? 0)
    const targetMin = (targetH ?? 9) * 60 + (targetM ?? 0)
    return currentMin >= targetMin && currentMin < targetMin + 30
}

function getTasksForMember(day: CampaignDay, member: TeamMember, completedTasks: Record<string, boolean>): CampaignTask[] {
    return day.tasks.filter((task) => {
        if (completedTasks[task.id]) {
            return false
        }
        const assignee = task.assignee
        return assignee === member.assigneeKey ||
            assignee.includes(member.name) ||
            (member.assigneeKey === 'Кира' && assignee.includes('Кира')) ||
            (member.assigneeKey === 'Настя' && assignee.includes('Настя')) ||
            (member.assigneeKey === 'Макс' && assignee.includes('Макс'))
    })
}

function buildEmailHtml(member: TeamMember, day: CampaignDay, tasks: CampaignTask[]): string {
    const taskList = tasks.map((t) =>
        `<tr>
            <td style="padding:8px 12px;border-bottom:1px solid #30363d;color:#3fb68e;font-weight:700;width:50px;vertical-align:top">${t.id}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #30363d">
                <div style="font-weight:600;color:#e6edf3">${t.title.replace(/^\d+\.\s*/, '').replace(/^(Кира|Настя|Макс)[:\s]+/i, '')}</div>
                <div style="font-size:13px;color:#8b949e;margin-top:4px">${t.description.substring(0, 150)}${t.description.length > 150 ? '...' : ''}</div>
            </td>
        </tr>`
    ).join('')

    return `
    <div style="background:#0d1117;padding:32px;font-family:sans-serif">
        <div style="max-width:600px;margin:0 auto">
            <div style="text-align:center;margin-bottom:24px">
                <span style="color:#3fb68e;font-size:24px;font-weight:800">KORU</span>
                <span style="color:#8b949e;font-size:14px;display:block;margin-top:4px">Campaign Tracker</span>
            </div>
            <div style="background:#161b22;border-radius:8px;border:1px solid #30363d;padding:24px;margin-bottom:16px">
                <div style="color:#8b949e;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">${day.dayLabel}</div>
                <div style="color:#e6edf3;font-size:20px;font-weight:700;margin-bottom:12px">${day.title}</div>
                <div style="color:#e6edf3;font-size:15px;margin-bottom:4px">Привет, ${member.name}! У тебя <strong style="color:#3fb68e">${tasks.length}</strong> ${tasks.length === 1 ? 'задача' : tasks.length < 5 ? 'задачи' : 'задач'} на сегодня:</div>
            </div>
            <table style="width:100%;border-collapse:collapse;background:#161b22;border-radius:8px;border:1px solid #30363d">
                ${taskList}
            </table>
            <div style="text-align:center;margin-top:24px">
                <a href="https://campaign-tracker-flame.vercel.app" style="background:#3fb68e;color:#0d1117;padding:12px 32px;border-radius:99px;text-decoration:none;font-weight:700;font-size:14px;display:inline-block">Открыть Campaign Tracker</a>
            </div>
            <div style="text-align:center;margin-top:16px;color:#8b949e;font-size:12px">
                Чтобы отключить напоминания — зайди в Settings на сайте
            </div>
        </div>
    </div>`
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Verify cron secret (Vercel sets this header for cron jobs)
    const authHeader = req.headers.authorization
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        // Allow without secret in dev, but log warning
        if (process.env.NODE_ENV === 'production' && process.env.CRON_SECRET) {
            res.status(401).json({ error: 'Unauthorized' })
            return
        }
    }

    try {
        const redis = getRedis()
        const progress = await redis.get<ProgressData>(PROGRESS_KEY)

        if (!progress?.startDate || !progress?.team || progress.team.length === 0) {
            res.json({ sent: 0, reason: 'No start date or team configured' })
            return
        }

        // Dynamic import of campaign data is not possible in serverless,
        // so we fetch it from the deployed site
        const campaignRes = await fetch('https://campaign-tracker-flame.vercel.app')
        // We can't import the data directly, so we compute today's day index
        const startDate = new Date(progress.startDate)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        startDate.setHours(0, 0, 0, 0)

        const dayIndex = differenceInBusinessDays(today, startDate)

        if (dayIndex < 0) {
            res.json({ sent: 0, reason: 'Campaign not started yet' })
            return
        }

        // We need campaign data - fetch from a bundled JSON endpoint or hardcode total
        // For now, we'll call the progress API to get basic info and construct minimal day info
        // The actual task data lives in the frontend bundle, not accessible from serverless
        // WORKAROUND: We'll include a minimal task index

        const resend = new Resend(process.env.RESEND_API_KEY)
        let sent = 0
        const errors: string[] = []

        for (const member of progress.team) {
            if (!shouldSendNow(member)) {
                continue
            }

            try {
                // Since we can't access campaign data from serverless easily,
                // send a generic "you have tasks today" reminder with link
                const dayLabel = dayIndex < 3 ? `Story 0, День ${dayIndex + 1}` :
                    `Week ${Math.floor((dayIndex - 3) / 5) + 1}, День ${((dayIndex - 3) % 5) + 1}`

                const html = `
                <div style="background:#0d1117;padding:32px;font-family:sans-serif">
                    <div style="max-width:600px;margin:0 auto">
                        <div style="text-align:center;margin-bottom:24px">
                            <span style="color:#3fb68e;font-size:24px;font-weight:800">KORU</span>
                            <span style="color:#8b949e;font-size:14px;display:block;margin-top:4px">Campaign Tracker</span>
                        </div>
                        <div style="background:#161b22;border-radius:8px;border:1px solid #30363d;padding:24px">
                            <div style="color:#8b949e;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">${dayLabel}</div>
                            <div style="color:#e6edf3;font-size:18px;font-weight:700;margin-bottom:16px">Привет, ${member.name}!</div>
                            <div style="color:#e6edf3;font-size:15px;line-height:1.6">
                                У тебя есть задачи на сегодня. Открой Campaign Tracker чтобы увидеть что нужно сделать.
                            </div>
                        </div>
                        <div style="text-align:center;margin-top:24px">
                            <a href="https://campaign-tracker-flame.vercel.app" style="background:#3fb68e;color:#0d1117;padding:12px 32px;border-radius:99px;text-decoration:none;font-weight:700;font-size:14px;display:inline-block">Открыть задачи на сегодня</a>
                        </div>
                        <div style="text-align:center;margin-top:16px;color:#8b949e;font-size:12px">
                            Чтобы отключить — Settings в Campaign Tracker
                        </div>
                    </div>
                </div>`

                await resend.emails.send({
                    from: 'KORU Campaign <onboarding@resend.dev>',
                    to: member.email,
                    subject: `${member.name}, у тебя задачи на сегодня — ${dayLabel}`,
                    html
                })
                sent++
            } catch (e) {
                errors.push(`Failed to send to ${member.name}: ${String(e)}`)
            }
        }

        res.json({ sent, errors: errors.length > 0 ? errors : undefined })
    } catch (e) {
        res.status(500).json({ error: String(e) })
    }
}
