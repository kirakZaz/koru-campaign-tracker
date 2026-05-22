import { addBusinessDays, format, isToday, isBefore, isAfter, startOfDay, differenceInBusinessDays } from 'date-fns'
import { ru } from 'date-fns/locale'
import type { CampaignDay } from '@/data/campaignData.types'

export function getCampaignDate(startDate: string, dayIndex: number): Date {
    return addBusinessDays(new Date(startDate), dayIndex)
}

export function formatCampaignDate(date: Date): string {
    return format(date, 'd MMMM yyyy, EEEE', { locale: ru })
}

export function formatShortDate(date: Date): string {
    return format(date, 'd MMM', { locale: ru })
}

export function isCampaignDayToday(startDate: string, dayIndex: number): boolean {
    const date = getCampaignDate(startDate, dayIndex)
    return isToday(date)
}

export function isCampaignDayPast(startDate: string, dayIndex: number): boolean {
    const date = getCampaignDate(startDate, dayIndex)
    return isBefore(startOfDay(date), startOfDay(new Date()))
}

export function isCampaignDayFuture(startDate: string, dayIndex: number): boolean {
    const date = getCampaignDate(startDate, dayIndex)
    return isAfter(startOfDay(date), startOfDay(new Date()))
}

export function getTodayDayIndex(startDate: string, days: CampaignDay[]): number {
    const start = startOfDay(new Date(startDate))
    const today = startOfDay(new Date())
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
