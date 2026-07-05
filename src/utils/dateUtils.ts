import type { CampaignDay } from '@/data/campaignData.types'

// ─── Viewer timezone (auto-detected from browser) ────────────────────────────

let _viewerTimezone: string | null = null

export function getViewerTimezone(): string {
    if (!_viewerTimezone) {
        try {
            _viewerTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        } catch {
            _viewerTimezone = 'UTC'
        }
    }
    return _viewerTimezone
}

// ─── Core date helpers (pure JS, no libraries) ──────────────────────────────

/** Parse "YYYY-MM-DD" as a local-midnight Date (no UTC shift) */
function parseLocalDate(dateStr: string): Date {
    const [y, m, d] = dateStr.split('-').map(Number)
    return new Date(y!, m! - 1, d!)
}

/** Add N calendar days to a Date */
function addDays(date: Date, days: number): Date {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
}

/** Add N business days (Mon–Fri) to a Date */
function addBusinessDays(date: Date, days: number): Date {
    const result = new Date(date)
    let remaining = days
    const direction = remaining >= 0 ? 1 : -1

    while (remaining !== 0) {
        result.setDate(result.getDate() + direction)
        const dow = result.getDay()
        if (dow !== 0 && dow !== 6) {
            remaining -= direction
        }
    }
    return result
}

/** Count business days between two dates (start exclusive, end inclusive) */
function differenceInBusinessDays(end: Date, start: Date): number {
    let count = 0
    const cursor = new Date(start)
    const forward = end >= start
    const direction = forward ? 1 : -1

    while (true) {
        cursor.setDate(cursor.getDate() + direction)
        if (forward ? cursor > end : cursor < end) break
        const dow = cursor.getDay()
        if (dow !== 0 && dow !== 6) {
            count += direction
        }
    }
    return count
}

// ─── "Now" and "Today" with timezone awareness ─────────────────────────────

/** Get current time as seen in a specific timezone */
export function getNow(timezone?: string): Date {
    const tz = timezone ?? getViewerTimezone()
    const nowStr = new Date().toLocaleString('en-US', { timeZone: tz })
    return new Date(nowStr)
}

/** Get today at midnight in a specific timezone */
export function getToday(timezone?: string): Date {
    const now = getNow(timezone)
    return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

// ─── Campaign date calculation ──────────────────────────────────────────────

/** Calculate the calendar date for a campaign day */
export function getCampaignDate(
    startDate: string,
    dayIndex: number,
    calendarDayOffset?: number
): Date {
    const start = parseLocalDate(startDate)
    if (calendarDayOffset !== undefined) {
        return addDays(start, calendarDayOffset)
    }
    return addBusinessDays(start, dayIndex)
}

/** Find which campaign day corresponds to "today" */
export function getTodayDayIndex(
    startDate: string,
    days: CampaignDay[],
    timezone?: string
): number {
    const start = parseLocalDate(startDate)
    const today = getToday(timezone)
    const bizDays = differenceInBusinessDays(today, start)

    let closestDayIndex = days[0]?.dayIndex ?? 0
    let minDiff = Infinity
    for (const day of days) {
        const diff = Math.abs(day.dayIndex - bizDays)
        if (diff < minDiff) {
            minDiff = diff
            closestDayIndex = day.dayIndex
        }
    }
    return closestDayIndex
}

/** Calculate which campaign week we're in (1-based) */
export function getCampaignWeek(
    startDate: string | null | undefined,
    timezone?: string
): number {
    if (!startDate) return 1
    const start = parseLocalDate(startDate)
    const today = getToday(timezone)
    const diffMs = today.getTime() - start.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    return Math.max(1, Math.ceil((diffDays + 1) / 7))
}

// ─── Formatting (Intl.DateTimeFormat, no libraries) ─────────────────────────

/** Full date: "5 июля 2026, суббота" */
export function formatCampaignDate(date: Date, timezone?: string): string {
    const tz = timezone ?? getViewerTimezone()
    return new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long',
        timeZone: tz
    }).format(date)
}

/** Short date for sidebar: "05 Jul" */
export function formatShortDate(date: Date, timezone?: string): string {
    const tz = timezone ?? getViewerTimezone()
    return new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'short',
        timeZone: tz
    }).format(date)
}

/** Current time in timezone: "14:32" */
export function formatTime(timezone?: string): string {
    const tz = timezone ?? getViewerTimezone()
    return new Intl.DateTimeFormat('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: tz
    }).format(new Date())
}

/** Full date + time: "5 июля 2026, суббота, 14:32" */
export function formatFullDateTime(timezone?: string): string {
    const tz = timezone ?? getViewerTimezone()
    const now = new Date()
    const date = new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long',
        timeZone: tz
    }).format(now)
    const time = new Intl.DateTimeFormat('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: tz
    }).format(now)
    return `${date}, ${time}`
}

/** Time in a specific team member's timezone: "Макс: 14:32 (Иерусалим)" */
export function getTimeInTimezone(timezone: string): string {
    return new Intl.DateTimeFormat('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: timezone
    }).format(new Date())
}

/** Short timezone label: "AEST", "IST", etc. */
export function getTimezoneAbbr(timezone: string): string {
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZoneName: 'short',
        timeZone: timezone
    }).formatToParts(new Date())
    return parts.find(p => p.type === 'timeZoneName')?.value ?? timezone
}
