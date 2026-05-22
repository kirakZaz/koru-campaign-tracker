export interface DayNavigationProps {
    currentDayIndex: number
    totalDays: number
    startDate: string | null
    onDayChange: (dayIndex: number) => void
    onGoToToday: () => void
}
