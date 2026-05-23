import { addBusinessDays, format, differenceInBusinessDays } from 'date-fns'
import { ru } from 'date-fns/locale'
import type { CampaignDay } from '@/data/campaignData.types'

// Parse date string as local date (avoid UTC timezone shift)
function parseLocalDate(dateStr: string): Date {
    const [y, m, d] = dateStr.split('-').map(Number)
    return new Date(y!, m! - 1, d!)
}

// Get today as local date (midnight, no timezone issues)
function getToday(): Date {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

export function getCampaignDate(startDate: string, dayIndex: number): Date {
    return addBusinessDays(parseLocalDate(startDate), dayIndex)
}

export function formatCampaignDate(date: Date): string {
    return format(date, 'd MMMM yyyy, EEEE', { locale: ru })
}

export function formatShortDate(date: Date): string {
    return format(date, 'd MMM', { locale: ru })
}

export function getTodayDayIndex(startDate: string, days: CampaignDay[]): number {
    const start = parseLocalDate(startDate)
    const today = getToday()
    const bizDays = differenceInBusinessDays(today, start)

    // Find the day whose dayIndex is closest to today's business day offset
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
