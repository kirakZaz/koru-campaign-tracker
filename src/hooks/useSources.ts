import * as React from 'react'
import type { SourcesData } from '@/data/campaignData.types'

const API_URL = '/api/sources'

const DEFAULT_SOURCES: SourcesData = {
    people: [],
    groups: [],
    companies: [],
    shortlist: [],
    competitors: [],
    countries: ['US', 'UK', 'Israel', 'Канада', 'Австралия', 'Германия', 'Индия', 'Нидерланды']
}

export function useSources() {
    const [sources, setSources] = React.useState<SourcesData>(DEFAULT_SOURCES)
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        const controller = new AbortController()
        ;(async () => {
            try {
                const res = await fetch(API_URL, { signal: controller.signal })
                if (!res.ok) throw new Error('Failed to fetch sources')
                const data = await res.json() as SourcesData
                setSources({ ...DEFAULT_SOURCES, ...data })
            } catch (e) {
                if (e instanceof DOMException && e.name === 'AbortError') return
            } finally {
                setIsLoading(false)
            }
        })()
        return () => controller.abort()
    }, [])

    const saveSources = React.useCallback(async (newSources: SourcesData) => {
        const prev = sources
        setSources(newSources)
        try {
            await fetch(API_URL, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'set-sources', sources: newSources })
            })
        } catch {
            setSources(prev)
        }
    }, [sources])

    return { sources, isLoading: isLoading, saveSources }
}
