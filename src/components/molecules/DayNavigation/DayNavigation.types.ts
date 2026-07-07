export interface DayNavigationProps {
    currentDayIndex: number
    allDayIndexes: number[]
    calendarDayOffsets: Record<number, number | undefined>
    startDate: string | null
    onDayChange: (dayIndex: number) => void
    onGoToToday: () => void
}
