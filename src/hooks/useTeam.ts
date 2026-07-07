import * as React from 'react'
import type { TeamMember } from '@/data/campaignData.types'

const API_URL = '/api/team'

export function useTeam() {
    const [team, setTeam] = React.useState<TeamMember[]>([])
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        const controller = new AbortController()
        ;(async () => {
            try {
                const res = await fetch(API_URL, { signal: controller.signal })
                if (!res.ok) throw new Error('Failed to fetch team')
                const data = await res.json() as TeamMember[]
                setTeam(data)
            } catch (e) {
                if (e instanceof DOMException && e.name === 'AbortError') return
            } finally {
                setIsLoading(false)
            }
        })()
        return () => controller.abort()
    }, [])

    const saveTeam = React.useCallback(async (newTeam: TeamMember[]) => {
        const prev = team
        setTeam(newTeam)
        try {
            await fetch(API_URL, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ team: newTeam })
            })
        } catch {
            setTeam(prev)
        }
    }, [team])

    return { team, isLoading, saveTeam }
}
