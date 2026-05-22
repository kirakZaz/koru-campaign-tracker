import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Redis } from '@upstash/redis'
import { Resend } from 'resend'

const PROGRESS_KEY = 'koru-campaign-progress'
const TASK_MAP_KEY = 'koru-campaign-task-map'

interface TeamMember {
    name: string
    assigneeKey: string
    email: string
    timezone: string
    reminderTime: string
    remindersEnabled: boolean
}

interface ProgressData {
    completedTasks: Record<string, boolean>
    startDate: string | null
    team: TeamMember[]
}

interface TaskMap {
    assigneeMap: Record<string, number[]>
    tasksByDay: Record<string, string[]>
}

function getRedis() {
    return new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL ?? '',
        token: process.env.UPSTASH_REDIS_REST_TOKEN ?? ''
    })
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

function getUnfinishedInfo(
    member: TeamMember,
    todayIndex: number,
    taskMap: TaskMap,
    completedTasks: Record<string, boolean>
): { todayCount: number, overdueCount: number, overdueCritical: number } {
    const memberDays = taskMap.assigneeMap[member.name] ?? []
    let todayCount = 0
    let overdueCount = 0
    let overdueCritical = 0

    for (const dayIdx of memberDays) {
        const taskIds = taskMap.tasksByDay[String(dayIdx)] ?? []
        const unfinished = taskIds.filter((id) => !completedTasks[id])

        if (dayIdx === todayIndex) {
            todayCount = unfinished.length
        } else if (dayIdx < todayIndex) {
            overdueCount += unfinished.length
        }
    }

    return { todayCount, overdueCount, overdueCritical }
}

function buildEmailHtml(
    member: TeamMember,
    dayLabel: string,
    todayCount: number,
    overdueCount: number
): string {
    const overdueSection = overdueCount > 0
        ? `<div style="background:#f8514911;border:1px solid #f8514933;border-radius:8px;padding:12px 16px;margin-top:12px">
            <span style="color:#f85149;font-weight:700">${overdueCount} незавершённых задач за прошлые дни</span>
           </div>`
        : ''

    const todaySection = todayCount > 0
        ? `<div style="color:#e6edf3;font-size:15px;line-height:1.6">
            У тебя <strong style="color:#3fb68e">${todayCount}</strong> ${todayCount === 1 ? 'задача' : todayCount < 5 ? 'задачи' : 'задач'} на сегодня.
           </div>`
        : `<div style="color:#e6edf3;font-size:15px;line-height:1.6">
            Сегодня новых задач нет, но есть незавершённые за прошлые дни.
           </div>`

    return `
    <div style="background:#0d1117;padding:32px;font-family:sans-serif">
        <div style="max-width:600px;margin:0 auto">
            <div style="text-align:center;margin-bottom:24px">
                <span style="color:#3fb68e;font-size:24px;font-weight:800">KORU</span>
                <span style="color:#8b949e;font-size:14px;display:block;margin-top:4px">Campaign Tracker</span>
            </div>
            <div style="background:#161b22;border-radius:8px;border:1px solid #30363d;padding:24px">
                <div style="color:#8b949e;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">${dayLabel}</div>
                <div style="color:#e6edf3;font-size:18px;font-weight:700;margin-bottom:16px">Привет, ${member.name}!</div>
                ${todaySection}
                ${overdueSection}
            </div>
            <div style="text-align:center;margin-top:24px">
                <a href="https://campaign-tracker-flame.vercel.app" style="background:#3fb68e;color:#0d1117;padding:12px 32px;border-radius:99px;text-decoration:none;font-weight:700;font-size:14px;display:inline-block">Открыть задачи</a>
            </div>
            <div style="text-align:center;margin-top:16px;color:#8b949e;font-size:12px">
                Чтобы отключить — Settings в Campaign Tracker
            </div>
        </div>
    </div>`
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const redis = getRedis()
        const [progress, taskMap] = await Promise.all([
            redis.get<ProgressData>(PROGRESS_KEY),
            redis.get<TaskMap>(TASK_MAP_KEY)
        ])

        if (!progress?.startDate || !progress?.team || progress.team.length === 0) {
            res.json({ sent: 0, reason: 'No start date or team configured' })
            return
        }

        if (!taskMap) {
            res.json({ sent: 0, reason: 'No task map synced yet. Save Settings first.' })
            return
        }

        const startDate = new Date(progress.startDate)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        startDate.setHours(0, 0, 0, 0)
        const dayIndex = differenceInBusinessDays(today, startDate)

        if (dayIndex < 0) {
            res.json({ sent: 0, reason: 'Campaign not started yet' })
            return
        }

        const dayLabel = dayIndex < 3
            ? `Story 0, День ${dayIndex + 1}`
            : `Week ${Math.floor((dayIndex - 3) / 5) + 1}, День ${((dayIndex - 3) % 5) + 1}`

        // QStash sends memberName in body
        const body = req.body as { memberName?: string } | null
        const targetMember = body?.memberName ?? null

        const resend = new Resend(process.env.RESEND_API_KEY)
        let sent = 0
        let skipped = 0
        const errors: string[] = []

        const membersToNotify = targetMember
            ? progress.team.filter((m) => m.name === targetMember)
            : progress.team

        for (const member of membersToNotify) {
            if (!member.remindersEnabled || !member.email) {
                continue
            }

            const { todayCount, overdueCount } = getUnfinishedInfo(
                member, dayIndex, taskMap, progress.completedTasks
            )

            // Skip if no tasks today AND no overdue
            if (todayCount === 0 && overdueCount === 0) {
                skipped++
                continue
            }

            try {
                const subject = overdueCount > 0
                    ? `${member.name}, ${todayCount} задач на сегодня + ${overdueCount} незавершённых — ${dayLabel}`
                    : `${member.name}, ${todayCount} ${todayCount === 1 ? 'задача' : 'задач'} на сегодня — ${dayLabel}`

                await resend.emails.send({
                    from: 'KORU Campaign <onboarding@resend.dev>',
                    to: member.email,
                    subject,
                    html: buildEmailHtml(member, dayLabel, todayCount, overdueCount)
                })
                sent++
            } catch (e) {
                errors.push(`${member.name}: ${String(e)}`)
            }
        }

        res.json({ sent, skipped, dayIndex, dayLabel, errors: errors.length > 0 ? errors : undefined })
    } catch (e) {
        res.status(500).json({ error: String(e) })
    }
}
