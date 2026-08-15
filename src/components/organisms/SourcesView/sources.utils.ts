import { NEXT_ACTION_LABELS } from './sources.constants'

import type { ShortlistPerson, IcpPriority, ShortlistAction, SourcesData, SourceCompetitor, SourcePerson } from './SourcesView.types'

/** Fields that belong to a People record — used to keep People edits clean of funnel data. */
export const PEOPLE_EDIT_KEYS = ['name', 'title', 'linkedinUrl', 'country', 'icpSegment', 'priority', 'activityLevel', 'source', 'status', 'notes', 'cantDm'] as const

/** View a People record through the person-card (ShortlistPerson) shape. */
export function sourcePersonToShortlistView(p: SourcePerson): ShortlistPerson {
    return {
        id: p.id, batch: '', name: p.name, linkedinUrl: p.linkedinUrl,
        country: p.country, icpSegment: p.icpSegment, priority: p.priority,
        dmStatus: 'not_sent', connectionStatus: 'not_sent', source: p.source,
        status: p.status, notes: p.notes, actions: [], completedActions: [],
        history: [], createdAt: p.createdAt, cantDm: p.cantDm
    }
}

export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

export interface MoveToCompetitorOpts {
    name: string
    linkedinUrl?: string
    notes?: string
    type?: string
}

/** Build move-to-competitor opts from either a People (title) or Outreach (source) record. */
export function personToMoveOpts(p: { name: string, linkedinUrl?: string, notes?: string, title?: string, source?: string, icpSegment?: string }): MoveToCompetitorOpts {
    return {
        name: p.name,
        linkedinUrl: p.linkedinUrl,
        notes: [p.title || p.source, p.notes].filter(Boolean).join(' — '),
        type: p.icpSegment
    }
}

/** Pure: new SourcesData with the person turned into a competitor and dropped
 *  from both people and shortlist (matched by LinkedIn URL or name). */
export function movePersonToCompetitors(data: SourcesData, opts: MoveToCompetitorOpts): SourcesData {
    const urlKey = (u?: string) => (u || '').replace(/\/$/, '').toLowerCase()
    const nameKey = (n?: string) => (n || '').trim().toLowerCase()
    const same = (x: { name?: string, linkedinUrl?: string }) =>
        (!!urlKey(x.linkedinUrl) && urlKey(x.linkedinUrl) === urlKey(opts.linkedinUrl)) ||
        (!!nameKey(x.name) && nameKey(x.name) === nameKey(opts.name))
    const competitor: SourceCompetitor = {
        id: generateId(), name: opts.name || '', url: '', type: opts.type || '', pricing: '',
        features: '', missingVsKoru: '', linkedinPerson: opts.linkedinUrl || opts.name || '',
        threatLevel: 'direct', notes: opts.notes || ''
    }
    return {
        ...data,
        competitors: [competitor, ...data.competitors],
        people: data.people.filter(p => !same(p)),
        shortlist: data.shortlist.filter(s => !same(s))
    }
}

export function getNextAction(s: ShortlistPerson): { label: string, color: string } {
    // Terminal states
    if (s.status === 'client') return { label: 'Клиент ✓', color: '#3fb68e' }
    if (s.status === 'beta') return { label: 'В бете ✓', color: '#3fb68e' }
    if (s.status === 'declined') return { label: 'Отказ', color: '#f85149' }

    // Follow-only path
    const fs = s.followStatus || 'not_followed'
    if (fs === 'not_followed' && s.connectionStatus === 'not_sent') return { label: 'Follow / Отправить запрос', color: '#6c8eff' }
    if (fs === 'followed' && s.connectionStatus === 'not_sent') return { label: 'Комментировать посты', color: '#d29922' }
    if (fs === 'follow_back' && s.connectionStatus === 'not_sent') return { label: 'Отправить запрос (follow-back!)', color: '#3fb68e' }

    // Waiting states from funnel
    if (s.connectionStatus === 'sent') return { label: 'Ждём ответ', color: '#d29922' }
    if (s.dmStatus === 'sent') return { label: 'Ждём DM', color: '#d29922' }
    if (s.dmStatus === 'no_reply') return { label: 'Follow up!', color: '#f85149' }
    if (s.dmStatus === 'replied') return { label: 'Назначить demo', color: '#3fb68e' }
    if (s.status === 'demo') return { label: 'Провести demo', color: '#a371f7' }

    // Connected but no DM yet
    if (s.connectionStatus === 'accepted' && s.dmStatus === 'not_sent') return { label: 'Написать DM', color: '#6c8eff' }

    // Next from checklist — first uncompleted planned action
    const planned = s.actions || []
    const completed = s.completedActions || []
    const uncompleted = planned.filter(a => !completed.includes(a))
    if (uncompleted.length > 0) return { label: NEXT_ACTION_LABELS[uncompleted[0]!] || uncompleted[0]!, color: '#6c8eff' }

    // All planned done but funnel not started
    if (planned.length > 0 && uncompleted.length === 0) return { label: 'Все сделано ✓', color: '#3fb68e' }

    // Nothing planned yet
    return { label: 'Запланировать', color: '#8b949e' }
}

export function isWithinLastWeek(dateStr?: string): boolean {
    if (!dateStr) return false
    const d = new Date(dateStr)
    const now = new Date()
    const diff = now.getTime() - d.getTime()
    return diff >= 0 && diff <= 7 * 24 * 60 * 60 * 1000
}

// Auto-assign actions based on campaign week + priority
export function getAutoActions(week: number, priority: IcpPriority): ShortlistAction[] {
    if (week <= 2) {
        // W1-W2: warm up — comment on their posts
        return ['comment_post']
    }
    if (week === 3) {
        // W3: building in public — comment + DM for A, comment for B
        if (priority === 'A') return ['comment_post', 'send_dm']
        return ['comment_post']
    }
    if (week === 4) {
        // W4: reveal + outreach — CR + DM + demo for A, comment + CR for B
        if (priority === 'A') return ['send_cr', 'send_dm', 'invite_demo']
        if (priority === 'B') return ['comment_post', 'send_cr']
        return ['comment_post']
    }
    if (week === 5) {
        // W5: pre-launch — CR + DM + beta for A, CR + DM for B
        if (priority === 'A') return ['send_cr', 'send_dm', 'invite_beta']
        if (priority === 'B') return ['send_cr', 'send_dm']
        return ['send_cr']
    }
    // W6+: launch — DM + demo for all
    if (priority === 'A') return ['send_cr', 'send_dm', 'invite_demo', 'invite_beta']
    if (priority === 'B') return ['send_cr', 'send_dm', 'invite_demo']
    return ['send_cr', 'send_dm']
}
