export interface DayNavigationProps {
    currentDayIndex: number
    allDayIndexes: number[]
    startDate: string | null
    onDayChange: (dayIndex: number) => void
    onGoToToday: () => void
}
