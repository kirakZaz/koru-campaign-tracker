import * as React from 'react'
import { getCampaignWeek } from '@/utils/dateUtils'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
// ListItemText kept available for future use
import Badge from '@mui/material/Badge'
import Snackbar from '@mui/material/Snackbar'
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded'
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded'
import PersonModal from './components/PersonModal'
import PeopleTab from './tabs/PeopleTab'
import GroupsTab from './tabs/GroupsTab'
import CompaniesTab from './tabs/CompaniesTab'
import CompetitorsTab from './tabs/CompetitorsTab'
import OutreachTab from './tabs/OutreachTab'
import ArchiveTab from './tabs/ArchiveTab'
import DashboardTab from './tabs/DashboardTab'
import type {
    SourcesViewProps,
    SourcePerson,
    SourceGroup,
    SourceCompany,
    SourceCompetitor,
    ShortlistPerson,
    PersonStatus,
    GroupStatus,
    CompanyStatus,
    CompetitorThreatLevel,
    IcpSegment,
    IcpPriority,
    AccountName,
    DmStatus,
    ConnectionStatus,
    ShortlistAction,
    HistoryEntry,
} from './SourcesView.types'

import {
    ICP_LABELS,
    NEXT_ACTION_LABELS,
    DEFAULT_COUNTRIES,
} from './sources.constants'
import { generateId, isWithinLastWeek, getAutoActions, movePersonToCompetitors, personToMoveOpts, type MoveToCompetitorOpts } from './sources.utils'

export default function SourcesView({ sources, onSaveSources, startDate, initialTab }: SourcesViewProps) {
    const [tab, setTab] = React.useState(initialTab ?? 0)
    React.useEffect(() => { if (initialTab !== undefined) setTab(initialTab) }, [initialTab])
    const [local, setLocal] = React.useState({ people: sources.people || [], groups: sources.groups || [], companies: sources.companies || [], shortlist: sources.shortlist || [], competitors: sources.competitors || [], countries: sources.countries || [] })
    const saveTimerRef = React.useRef<ReturnType<typeof setTimeout>>()
    const [countriesDialogOpen, setCountriesDialogOpen] = React.useState(false)
    const [newCountry, setNewCountry] = React.useState('')
    const [deleteConfirm, setDeleteConfirm] = React.useState<{ id: string, name: string, type: 'person' | 'group' | 'company' | 'shortlist' | 'competitor' } | null>(null)
    const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())
    const [needsActionFilter, setNeedsActionFilter] = React.useState(false)
    const [_copiedId, setCopiedId] = React.useState<string | null>(null)
    const [modalPersonId, setModalPersonId] = React.useState<string | null>(null)
    const [viewPerson, setViewPerson] = React.useState<ShortlistPerson | null>(null)
    const [selectedPeopleIds, setSelectedPeopleIds] = React.useState<Set<string>>(new Set())
    const [addBestDialogOpen, setAddBestDialogOpen] = React.useState(false)
    const [bestPickIds, setBestPickIds] = React.useState<Set<string>>(new Set())
    const [searchQuery, setSearchQuery] = React.useState('')
    const [historyInput, setHistoryInput] = React.useState('')
    const [snackbarMsg, setSnackbarMsg] = React.useState<string | null>(null)

    const confirmDelete = () => {
        if (!deleteConfirm) return
        const { id, type } = deleteConfirm
        if (type === 'person') deletePerson(id)
        else if (type === 'group') deleteGroup(id)
        else if (type === 'company') deleteCompany(id)
        else if (type === 'shortlist') deleteShortlistPerson(id)
        else if (type === 'competitor') deleteCompetitor(id)
        setDeleteConfirm(null)
    }

    // Sorting is handled per-column by each tab's DataGrid.

    // Filters
    const [filters, setFilters] = React.useState<Record<string, string>>({})
    const setFilter = (key: string, value: string) => {
        setFilters(prev => {
            if (!value) {
                const next = { ...prev }
                delete next[key]
                return next
            }
            return { ...prev, [key]: value }
        })
    }
    const clearFilters = () => setFilters({})

    function filtered<T extends Record<string, any>>(items: T[]): T[] {
        let result = items
        for (const [key, val] of Object.entries(filters)) {
            if (val) result = result.filter(item => String(item[key] ?? '') === val)
        }
        return result
    }

    // Collect unique values for filter dropdowns
    function uniqueVals<T extends Record<string, any>>(items: T[], key: string): string[] {
        const set = new Set<string>()
        for (const item of items) {
            const v = item[key]
            if (v !== undefined && v !== null && v !== '') set.add(String(v))
        }
        return Array.from(set).sort()
    }

    // Reset filters, selection, search, and needsAction filter when switching tabs
    React.useEffect(() => { setFilters({}); setSelectedIds(new Set()); setNeedsActionFilter(false); setSearchQuery(''); setSelectedPeopleIds(new Set()) }, [tab])

    // Search filter — matches name, notes, source, country, linkedinUrl
    function searched<T extends Record<string, any>>(items: T[]): T[] {
        if (!searchQuery.trim()) return items
        const q = searchQuery.toLowerCase()
        return items.filter(item =>
            Object.values(item).some(v => typeof v === 'string' && v.toLowerCase().includes(q))
        )
    }

    const countries = (local.countries && local.countries.length > 0) ? local.countries : DEFAULT_COUNTRIES

    const addCountry = () => {
        const trimmed = newCountry.trim()
        if (trimmed && !countries.includes(trimmed)) {
            const next = { ...local, countries: [...countries, trimmed] }
            save(next)
        }
        setNewCountry('')
    }
    const removeCountry = (c: string) => {
        const next = { ...local, countries: countries.filter(x => x !== c) }
        save(next)
    }

    // Only sync from server on FIRST load — don't overwrite user edits
    const initializedRef = React.useRef(false)
    React.useEffect(() => {
        if (!initializedRef.current) {
            setLocal({
                people: sources.people || [],
                groups: sources.groups || [],
                companies: sources.companies || [],
                shortlist: sources.shortlist || [],
                competitors: sources.competitors || [],
                countries: sources.countries || []
            })
            initializedRef.current = true
        }
    }, [sources])

    const save = React.useCallback((next: typeof local) => {
        setLocal(next)
        clearTimeout(saveTimerRef.current)
        saveTimerRef.current = setTimeout(() => {
            onSaveSources(next)
        }, 800)
    }, [onSaveSources])

    // --- People ---
    const addPerson = () => {
        if (local.people.length > 0 && !local.people[0]!.name?.trim()) { setSnackbarMsg('Заполни имя в предыдущей строке'); return }
        const next = { ...local, people: [{ id: generateId(), name: '', title: '', linkedinUrl: '', country: '', icpSegment: 'freelancer' as IcpSegment, priority: 'B' as IcpPriority, activityLevel: 'medium' as const, source: '', status: 'new' as PersonStatus, notes: '', createdAt: new Date().toISOString() }, ...local.people] }
        save(next)
    }
    const updatePerson = (id: string, patch: Partial<SourcePerson>) => {
        // Duplicate check on linkedinUrl
        if (patch.linkedinUrl) {
            const normalized = patch.linkedinUrl.replace(/\/$/, '').toLowerCase()
            const dup = local.people.find(p => p.id !== id && p.linkedinUrl && p.linkedinUrl.replace(/\/$/, '').toLowerCase() === normalized)
            if (dup) { setSnackbarMsg(`Дубликат: ${dup.name || dup.linkedinUrl} уже в базе`); return }
        }
        const next = { ...local, people: local.people.map(p => p.id === id ? { ...p, ...patch } : p) }
        save(next)
    }
    const deletePerson = (id: string) => {
        const next = { ...local, people: local.people.filter(p => p.id !== id) }
        save(next)
    }

    // --- Groups ---
    const addGroup = () => {
        if (local.groups.length > 0 && !local.groups[0]!.name?.trim()) { setSnackbarMsg('Заполни название в предыдущей строке'); return }
        const next = { ...local, groups: [{ id: generateId(), name: '', url: '', platform: 'LinkedIn', members: '', account: 'Кира' as AccountName, status: 'pending' as GroupStatus, priority: 0, activeMembers: ['', '', '', '', ''], notes: '' }, ...local.groups] }
        save(next)
    }
    const updateGroup = (id: string, patch: Partial<SourceGroup>) => {
        const next = { ...local, groups: local.groups.map(g => g.id === id ? { ...g, ...patch } : g) }
        save(next)
    }
    const deleteGroup = (id: string) => {
        const next = { ...local, groups: local.groups.filter(g => g.id !== id) }
        save(next)
    }

    // --- Shortlist ---
    const nextBatch = React.useMemo(() => {
        const batches = local.shortlist.map(s => parseInt(s.batch) || 0)
        const max = batches.length > 0 ? Math.max(...batches) : 0
        const currentBatchCount = local.shortlist.filter(s => s.batch === String(max)).length
        return currentBatchCount >= 5 ? String(max + 1) : String(Math.max(max, 1))
    }, [local.shortlist])

    const shortlistRecordFor = (person: SourcePerson) => local.shortlist.find(s => (s.linkedinUrl && s.linkedinUrl === person.linkedinUrl) || (s.name && s.name === person.name))
    // "In Outreach" = has an ACTIVE record. Archived ("проверен") records don't count as active.
    const isInShortlist = (person: SourcePerson) => { const r = shortlistRecordFor(person); return !!r && !r.reviewed }
    const isReviewed = (person: SourcePerson) => { const r = shortlistRecordFor(person); return !!r && !!r.reviewed }
    const togglePersonShortlist = (person: SourcePerson) => {
        const record = shortlistRecordFor(person)
        if (record && !record.reviewed) { archiveShortlistPerson(record.id); return }
        if (record && record.reviewed) { reactivateShortlistPerson(record.id); return }
        const autoActions = getAutoActions(campaignWeek, person.priority)
        const now = new Date().toISOString()
        const next = { ...local, shortlist: [...local.shortlist, { id: generateId(), batch: nextBatch, name: person.name, linkedinUrl: person.linkedinUrl, priority: person.priority, dmStatus: 'not_sent' as DmStatus, connectionStatus: 'not_sent' as ConnectionStatus, source: person.source, status: person.status, notes: person.notes, actions: autoActions, completedActions: [] as ShortlistAction[], country: person.country, icpSegment: person.icpSegment, createdAt: now, history: [{ date: now.slice(0, 10), text: `Добавлен в Outreach (W${campaignWeek})`, auto: true }] as HistoryEntry[] }] }
        save(next)
    }
    const addShortlistPerson = () => {
        if (local.shortlist.length > 0 && !local.shortlist[0]!.name?.trim()) { setSnackbarMsg('Заполни имя в предыдущей строке'); return }
        const next = { ...local, shortlist: [{ id: generateId(), batch: nextBatch, name: '', linkedinUrl: '', priority: 'B' as IcpPriority, dmStatus: 'not_sent' as DmStatus, connectionStatus: 'not_sent' as ConnectionStatus, source: '', status: 'new' as PersonStatus, notes: '', actions: [] as ShortlistAction[], createdAt: new Date().toISOString() }, ...local.shortlist] }
        save(next)
    }
    const updateShortlistPerson = (id: string, patch: Partial<ShortlistPerson>) => {
        const next = { ...local, shortlist: local.shortlist.map(s => s.id === id ? { ...s, ...patch } : s) }
        save(next)
    }
    const deleteShortlistPerson = (id: string) => {
        const next = { ...local, shortlist: local.shortlist.filter(s => s.id !== id) }
        save(next)
    }

    // --- Archive ("проверен") helpers ---
    const matchesPerson = (p: SourcePerson, s: ShortlistPerson) =>
        (!!p.linkedinUrl && !!s.linkedinUrl && p.linkedinUrl.replace(/\/$/, '').toLowerCase() === s.linkedinUrl.replace(/\/$/, '').toLowerCase()) ||
        (!!p.name && !!s.name && p.name.toLowerCase() === s.name.toLowerCase())

    const archiveShortlistPerson = (id: string) => {
        const now = new Date().toISOString().slice(0, 10)
        const next = { ...local, shortlist: local.shortlist.map(s => s.id === id ? { ...s, reviewed: true, reviewedAt: now, history: [...(s.history || []), { date: now, text: 'В архив (проверен)', auto: true }] } : s) }
        save(next)
    }
    const reactivateShortlistPerson = (id: string) => {
        const now = new Date().toISOString().slice(0, 10)
        const next = { ...local, shortlist: local.shortlist.map(s => s.id === id ? { ...s, reviewed: false, reviewedAt: undefined, history: [...(s.history || []), { date: now, text: 'Возвращён в Outreach', auto: true }] } : s) }
        save(next)
    }
    // Return an archived person to People: drop the shortlist record; recreate a People
    // row if none matches (e.g. added directly in Outreach).
    const returnArchivedToPeople = (id: string) => {
        const record = local.shortlist.find(s => s.id === id)
        if (!record) return
        const existing = local.people.find(p => matchesPerson(p, record))
        const people = existing ? local.people : [{
            id: generateId(), name: record.name, title: '', linkedinUrl: record.linkedinUrl,
            country: record.country || '', icpSegment: record.icpSegment || 'other' as IcpSegment,
            priority: record.priority || 'C' as IcpPriority, activityLevel: 'low' as const,
            source: record.source || '', status: record.status || 'new' as PersonStatus,
            notes: record.notes || '', createdAt: new Date().toISOString(),
        }, ...local.people]
        save({ ...local, people, shortlist: local.shortlist.filter(s => s.id !== id) })
    }
    // Fully delete an archived person from both People and the shortlist.
    const deleteArchivedCompletely = (id: string) => {
        const record = local.shortlist.find(s => s.id === id)
        const people = record ? local.people.filter(p => !matchesPerson(p, record)) : local.people
        save({ ...local, people, shortlist: local.shortlist.filter(s => s.id !== id) })
    }

    // Open the read-only card for a People row: show its outreach record if it has one,
    // otherwise a minimal view synthesized from the People fields.
    const openReadOnlyForPerson = (person: SourcePerson) => {
        const record = shortlistRecordFor(person)
        setViewPerson(record ?? {
            id: person.id, batch: '', name: person.name, linkedinUrl: person.linkedinUrl,
            country: person.country, icpSegment: person.icpSegment, priority: person.priority,
            dmStatus: 'not_sent', connectionStatus: 'not_sent', source: person.source,
            status: person.status, notes: person.notes, actions: [], completedActions: [],
            history: [], createdAt: person.createdAt,
        })
    }

    // --- History helpers ---
    function addHistory(id: string, text: string, auto = true) {
        const person = local.shortlist.find(s => s.id === id)
        if (!person) return
        const entry: HistoryEntry = { date: new Date().toISOString().slice(0, 10), text, auto }
        const history = [...(person.history || []), entry]
        updateShortlistPerson(id, { history })
    }

    function updateShortlistWithHistory(id: string, patch: Partial<ShortlistPerson>) {
        const person = local.shortlist.find(s => s.id === id)
        if (!person) return
        const historyEntries: HistoryEntry[] = []
        const now = new Date().toISOString().slice(0, 10)

        if (patch.connectionStatus && patch.connectionStatus !== person.connectionStatus) {
            const labels: Record<string, string> = { sent: 'Запрос отправлен', accepted: 'Запрос принят', declined: 'Запрос отклонён' }
            if (labels[patch.connectionStatus]) historyEntries.push({ date: now, text: labels[patch.connectionStatus]!, auto: true })
        }
        if (patch.dmStatus && patch.dmStatus !== person.dmStatus) {
            const labels: Record<string, string> = { sent: 'DM отправлен', replied: 'DM ответил', no_reply: 'DM без ответа' }
            if (labels[patch.dmStatus]) historyEntries.push({ date: now, text: labels[patch.dmStatus]!, auto: true })
        }
        if (patch.status && patch.status !== person.status) {
            const labels: Record<string, string> = { demo: 'Назначен demo', beta: 'Приглашён в beta', client: 'Стал клиентом', declined: 'Отказался' }
            if (labels[patch.status]) historyEntries.push({ date: now, text: labels[patch.status]!, auto: true })
        }

        const fullPatch = historyEntries.length > 0
            ? { ...patch, history: [...(person.history || []), ...historyEntries] }
            : patch
        updateShortlistPerson(id, fullPatch)
    }

    // Bulk actions for Outreach
    const bulkUpdate = (patch: Partial<ShortlistPerson>) => {
        const next = { ...local, shortlist: local.shortlist.map(s => selectedIds.has(s.id) ? { ...s, ...patch } : s) }
        save(next)
        setSelectedIds(new Set())
    }

    // Score and rank candidates for Outreach
    const AI_KEYWORDS = /\b(ai|llm|geo|aeo|generative|ai.?seo|llm.?seo|ai.?search|machine learning|chatgpt|openai|gemini|perplexity|ai overview|answer engine|citation|agent readiness)\b/i
    const STRONG_SEO_KEYWORDS = /\b(seo director|head of seo|vp seo|seo lead|seo manager|content strateg|digital marketing director|growth lead|head of content|head of growth)\b/i

    function candidateScore(p: SourcePerson): number {
        let score = 0
        // Priority: A=30, B=15, C=0
        score += p.priority === 'A' ? 30 : p.priority === 'B' ? 15 : 0
        // Activity: high=25, medium=10, low=-10 (penalty!)
        score += p.activityLevel === 'high' ? 25 : p.activityLevel === 'medium' ? 10 : -10
        // Title relevance: AI/GEO keywords = +25, strong SEO title = +10
        const titleAndNotes = `${p.title || ''} ${p.notes || ''}`
        if (AI_KEYWORDS.test(titleAndNotes)) score += 25
        else if (STRONG_SEO_KEYWORDS.test(titleAndNotes)) score += 10
        // Has notes (personalization possible): +10
        if (p.notes && p.notes.trim().length > 10) score += 10
        // Has LinkedIn URL: +5
        if (p.linkedinUrl && p.linkedinUrl.includes('linkedin')) score += 5
        // ICP segment filled: +5
        if (p.icpSegment && p.icpSegment !== 'other') score += 5
        return score
    }

    const outreachCandidates = React.useMemo(() => {
        return local.people.filter(p =>
            !local.shortlist.some(s => (s.linkedinUrl && s.linkedinUrl === p.linkedinUrl) || (s.name && s.name === p.name))
        ).sort((a, b) => candidateScore(b) - candidateScore(a))
    }, [local.people, local.shortlist])

    const campaignWeek = getCampaignWeek(startDate)
    const WAVE_SIZE = 10

    // Wave logic: people with uncompleted actions = active
    const isPersonDone = (s: ShortlistPerson) => {
        const planned = s.actions || []
        const completed = s.completedActions || []
        if (planned.length === 0) return false
        return planned.every(a => completed.includes(a))
    }
    // Archived ("проверен") people live in local.shortlist too — split them out.
    const activeShortlist = local.shortlist.filter(s => !s.reviewed)
    const reviewedList = React.useMemo(
        () => local.shortlist.filter(s => s.reviewed).sort((a, b) => (b.reviewedAt || '').localeCompare(a.reviewedAt || '')),
        [local.shortlist]
    )
    const activeInOutreach = activeShortlist.filter(s => !isPersonDone(s) && s.status !== 'declined' && s.status !== 'client')
    const doneInOutreach = activeShortlist.filter(s => isPersonDone(s) || s.status === 'declined' || s.status === 'client')
    const canAddNextWave = activeInOutreach.length <= 3 && outreachCandidates.length > 0

    const addPeopleToOutreach = (people: SourcePerson[]) => {
        const now = new Date().toISOString()
        const today = now.slice(0, 10)
        const shortlist = [...local.shortlist]
        const toCreate: SourcePerson[] = []
        let reactivated = 0
        let skipped = 0
        for (const p of people) {
            const idx = shortlist.findIndex(s => matchesPerson(p, s))
            if (idx === -1) { toCreate.push(p); continue }
            if (shortlist[idx]!.reviewed) {
                // Was archived — bring it back to the active list.
                shortlist[idx] = { ...shortlist[idx]!, reviewed: false, reviewedAt: undefined, history: [...(shortlist[idx]!.history || []), { date: today, text: 'Возвращён в Outreach', auto: true }] }
                reactivated++
            } else {
                skipped++ // already active
            }
        }
        if (toCreate.length === 0 && reactivated === 0) { setSnackbarMsg('Все уже в Outreach (дубликаты)'); return }

        const newEntries: ShortlistPerson[] = toCreate.map(p => {
            const autoActions = getAutoActions(campaignWeek, p.priority)
            return {
                id: generateId(), batch: nextBatch, name: p.name, linkedinUrl: p.linkedinUrl,
                country: p.country, icpSegment: p.icpSegment, priority: p.priority,
                dmStatus: 'not_sent' as DmStatus, connectionStatus: 'not_sent' as ConnectionStatus,
                source: p.source, status: p.status, notes: p.notes,
                actions: autoActions, completedActions: [],
                history: [{ date: today, text: `Добавлен в Outreach (W${campaignWeek}). Авто-задачи: ${autoActions.map(a => NEXT_ACTION_LABELS[a]).join(', ')}`, auto: true }],
                createdAt: now
            }
        })
        save({ ...local, shortlist: [...shortlist, ...newEntries] })
        const parts: string[] = []
        if (toCreate.length) parts.push(`добавлено ${toCreate.length}`)
        if (reactivated) parts.push(`возвращено из архива ${reactivated}`)
        if (skipped) parts.push(`пропущено ${skipped}`)
        setSnackbarMsg(parts.join(', '))
    }

    // Needs action filter logic
    const needsAction = (s: ShortlistPerson) =>
        s.connectionStatus === 'not_sent' ||
        (s.connectionStatus === 'accepted' && s.dmStatus === 'not_sent') ||
        s.dmStatus === 'no_reply'

    // Filtered shortlist for display (active only — archived live in the Архив tab)
    const displayShortlist = React.useMemo(() => {
        let result = local.shortlist.filter(s => !s.reviewed)
        if (needsActionFilter) result = result.filter(needsAction)
        // Apply search
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase()
            result = result.filter(item => Object.values(item).some(v => typeof v === 'string' && v.toLowerCase().includes(q)))
        }
        // Apply filters
        for (const [key, val] of Object.entries(filters)) {
            if (val) result = result.filter(item => String((item as any)[key] ?? '') === val)
        }
        return result
    }, [local.shortlist, needsActionFilter, searchQuery, filters])

    // Select-all is handled by the Outreach DataGrid's built-in checkbox column.

    // Copy to clipboard helper
    const copyToClipboard = (text: string, personId?: string) => {
        navigator.clipboard.writeText(text)
        if (personId) {
            setCopiedId(personId)
            setTimeout(() => setCopiedId(null), 1500)
        }
        setSnackbarMsg('Скопировано!')
    }

    // New people badge count (last 7 days)
    const newPeopleCount = React.useMemo(() => local.people.filter(p => isWithinLastWeek(p.createdAt)).length, [local.people])

    // --- Companies ---
    const addCompany = () => {
        if (local.companies.length > 0 && !local.companies[0]!.name?.trim()) { setSnackbarMsg('Заполни название в предыдущей строке'); return }
        const next = { ...local, companies: [{ id: generateId(), name: '', website: '', segment: 'small_agency' as IcpSegment, size: '', contactPerson: '', status: 'research' as CompanyStatus, notes: '' }, ...local.companies] }
        save(next)
    }
    const updateCompany = (id: string, patch: Partial<SourceCompany>) => {
        const next = { ...local, companies: local.companies.map(c => c.id === id ? { ...c, ...patch } : c) }
        save(next)
    }
    const deleteCompany = (id: string) => {
        const next = { ...local, companies: local.companies.filter(c => c.id !== id) }
        save(next)
    }

    // --- Competitors ---
    const addCompetitor = () => {
        if (local.competitors.length > 0 && !local.competitors[0]!.name?.trim()) { setSnackbarMsg('Заполни название в предыдущей строке'); return }
        const next = { ...local, competitors: [{ id: generateId(), name: '', url: '', type: '', pricing: '', features: '', missingVsKoru: '', linkedinPerson: '', threatLevel: 'indirect' as CompetitorThreatLevel, notes: '' }, ...local.competitors] }
        save(next)
    }
    const updateCompetitor = (id: string, patch: Partial<SourceCompetitor>) => {
        const next = { ...local, competitors: local.competitors.map(c => c.id === id ? { ...c, ...patch } : c) }
        save(next)
    }
    const deleteCompetitor = (id: string) => {
        const next = { ...local, competitors: local.competitors.filter(c => c.id !== id) }
        save(next)
    }

    // Move a person (People or Outreach) into Competitors — they're a rival, not a lead.
    const moveToCompetitors = React.useCallback((opts: MoveToCompetitorOpts) => {
        save(movePersonToCompetitors(local, opts))
        setSnackbarMsg(`${opts.name || 'Человек'} → в Конкуренты`)
    }, [local, save])

    return (
        <Box sx={{ flex: 1, overflow: 'auto', px: { xs: 2, md: 4 }, py: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>Sources</Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem', mb: 2.5 }}>
                Все контакты, группы и компании в одном месте. Вместо отдельных логов.
            </Typography>

            <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                sx={{ mb: 2, '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: '0.85rem', minHeight: 40 } }}
            >
                <Tab icon={<PeopleRoundedIcon sx={{ fontSize: '1rem' }} />} iconPosition="start" label={
                    newPeopleCount > 0
                        ? <Badge badgeContent={newPeopleCount} color="primary" sx={{ '& .MuiBadge-badge': { fontSize: '0.65rem', height: 16, minWidth: 16 } }}>{`Люди (${local.people.length})`}</Badge>
                        : `Люди (${local.people.length})`
                } />
                <Tab icon={<GroupsRoundedIcon sx={{ fontSize: '1rem' }} />} iconPosition="start" label={`Группы (${local.groups.length})`} />
                <Tab icon={<BusinessRoundedIcon sx={{ fontSize: '1rem' }} />} iconPosition="start" label={`Компании (${local.companies.length})`} />
                <Tab icon={<TrendingUpRoundedIcon sx={{ fontSize: '1rem' }} />} iconPosition="start" label={`Outreach (${activeShortlist.length})`} />
                <Tab icon={<CompareArrowsRoundedIcon sx={{ fontSize: '1rem' }} />} iconPosition="start" label={`Конкуренты (${local.competitors.length})`} />
                <Tab icon={<Inventory2RoundedIcon sx={{ fontSize: '1rem' }} />} iconPosition="start" label={`Архив (${reviewedList.length})`} />
            </Tabs>

            {tab === 0 && (
                <PeopleTab
                    local={local}
                    save={save}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    filters={filters}
                    setFilter={setFilter}
                    clearFilters={clearFilters}
                    selectedPeopleIds={selectedPeopleIds}
                    setSelectedPeopleIds={setSelectedPeopleIds}
                    countries={countries}
                    setCountriesDialogOpen={setCountriesDialogOpen}
                    setSnackbarMsg={setSnackbarMsg}
                    setDeleteConfirm={setDeleteConfirm}
                    isInShortlist={isInShortlist}
                    isReviewed={isReviewed}
                    openReadOnly={openReadOnlyForPerson}
                    addPeopleToOutreach={addPeopleToOutreach}
                    addPerson={addPerson}
                    updatePerson={updatePerson}
                    togglePersonShortlist={togglePersonShortlist}
                    moveToCompetitors={(p) => moveToCompetitors(personToMoveOpts(p))}
                    uniqueVals={uniqueVals}
                    filtered={filtered}
                    searched={searched}
                />
            )}

            {tab === 1 && (
                <GroupsTab
                    local={local}
                    filters={filters}
                    setFilter={setFilter}
                    clearFilters={clearFilters}
                    addGroup={addGroup}
                    updateGroup={updateGroup}
                    setDeleteConfirm={setDeleteConfirm}
                    uniqueVals={uniqueVals}
                    filtered={filtered}
                />
            )}

            {tab === 3 && (
                <OutreachTab
                    local={local}
                    save={save}
                    setSnackbarMsg={setSnackbarMsg}
                    campaignWeek={campaignWeek}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    needsActionFilter={needsActionFilter}
                    setNeedsActionFilter={setNeedsActionFilter}
                    filters={filters}
                    setFilter={setFilter}
                    clearFilters={clearFilters}
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                    bulkUpdate={bulkUpdate}
                    outreachCandidates={outreachCandidates}
                    canAddNextWave={canAddNextWave}
                    waveSize={WAVE_SIZE}
                    setBestPickIds={setBestPickIds}
                    setAddBestDialogOpen={setAddBestDialogOpen}
                    addShortlistPerson={addShortlistPerson}
                    activeInOutreach={activeInOutreach}
                    doneInOutreach={doneInOutreach}
                    displayShortlist={displayShortlist}
                    setModalPersonId={setModalPersonId}
                />
            )}

            {tab === 2 && (
                <CompaniesTab
                    local={local}
                    filters={filters}
                    setFilter={setFilter}
                    clearFilters={clearFilters}
                    addCompany={addCompany}
                    updateCompany={updateCompany}
                    setDeleteConfirm={setDeleteConfirm}
                    filtered={filtered}
                />
            )}

            {tab === 99 && <DashboardTab local={local} />}

            {tab === 4 && (
                <CompetitorsTab
                    local={local}
                    filters={filters}
                    setFilter={setFilter}
                    clearFilters={clearFilters}
                    addCompetitor={addCompetitor}
                    updateCompetitor={updateCompetitor}
                    setDeleteConfirm={setDeleteConfirm}
                    filtered={filtered}
                />
            )}

            {tab === 5 && (
                <ArchiveTab
                    reviewed={reviewedList}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onView={setViewPerson}
                    onReturnToPeople={returnArchivedToPeople}
                    onDeleteCompletely={deleteArchivedCompletely}
                />
            )}

            <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} PaperProps={{ sx: { backgroundColor: 'background.paper', minWidth: 300 } }}>
                <DialogTitle sx={{ fontSize: '0.95rem', fontWeight: 700 }}>Удалить?</DialogTitle>
                <DialogContent>
                    <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>
                        {deleteConfirm?.name}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteConfirm(null)} sx={{ textTransform: 'none' }}>Отмена</Button>
                    <Button onClick={confirmDelete} color="error" variant="contained" sx={{ textTransform: 'none' }}>Удалить</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={countriesDialogOpen} onClose={() => setCountriesDialogOpen(false)} PaperProps={{ sx: { backgroundColor: 'background.paper', minWidth: 320 } }}>
                <DialogTitle sx={{ fontSize: '1rem', fontWeight: 700 }}>Управление странами</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <TextField
                            size="small"
                            value={newCountry}
                            onChange={e => setNewCountry(e.target.value)}
                            placeholder="Новая страна..."
                            onKeyDown={e => { if (e.key === 'Enter') addCountry() }}
                            sx={{ flex: 1, '& .MuiInputBase-input': { fontSize: '0.85rem' } }}
                        />
                        <Button size="small" variant="outlined" onClick={addCountry} sx={{ textTransform: 'none', fontSize: '0.8rem' }}>
                            Добавить
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                        {countries.map(c => (
                            <Chip
                                key={c}
                                label={c}
                                size="small"
                                onDelete={() => removeCountry(c)}
                                sx={{ fontSize: '0.8rem' }}
                            />
                        ))}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCountriesDialogOpen(false)} sx={{ textTransform: 'none' }}>Закрыть</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={addBestDialogOpen} onClose={() => setAddBestDialogOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { backgroundColor: 'background.paper' } }}>
                <DialogTitle sx={{ fontSize: '1rem', fontWeight: 700 }}>
                    Следующая волна — топ {WAVE_SIZE}
                    <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', mt: 0.5 }}>
                        Активных сейчас: {activeInOutreach.length} · Завершено: {doneInOutreach.length} · В очереди: {outreachCandidates.length}
                    </Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: '#6c8eff', mt: 0.25 }}>
                        Неделя W{campaignWeek} · Задачи назначатся автоматически
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                        {outreachCandidates.slice(0, WAVE_SIZE).map(p => (
                            <Box key={p.id} sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                                <Checkbox size="small" sx={{ p: 0.25 }} checked={bestPickIds.has(p.id)}
                                    onChange={(_, checked) => setBestPickIds(prev => { const n = new Set(prev); checked ? n.add(p.id) : n.delete(p.id); return n })} />
                                <Chip label={p.priority} size="small" sx={{ fontSize: '0.7rem', fontWeight: 700, minWidth: 24, color: p.priority === 'A' ? '#3fb68e' : p.priority === 'B' ? '#d29922' : '#8b949e', backgroundColor: (p.priority === 'A' ? '#3fb68e' : p.priority === 'B' ? '#d29922' : '#8b949e') + '22' }} />
                                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, flex: 1 }}>{p.name || 'Без имени'}</Typography>
                                <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>{p.country}</Typography>
                                <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>{ICP_LABELS[p.icpSegment] || ''}</Typography>
                                <Chip label={`${candidateScore(p)}pt`} size="small" sx={{ fontSize: '0.65rem', height: 18, minWidth: 36, color: candidateScore(p) >= 50 ? '#3fb68e' : '#8b949e', backgroundColor: candidateScore(p) >= 50 ? '#3fb68e22' : '#8b949e22' }} />
                            </Box>
                        ))}
                        {outreachCandidates.length === 0 && <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary', py: 2, textAlign: 'center' }}>Все люди уже в Outreach!</Typography>}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setBestPickIds(new Set(outreachCandidates.slice(0, WAVE_SIZE).map(p => p.id))); }} sx={{ textTransform: 'none', fontSize: '0.8rem' }}>Выбрать всех ({Math.min(WAVE_SIZE, outreachCandidates.length)})</Button>
                    <Button onClick={() => setBestPickIds(new Set())} sx={{ textTransform: 'none', fontSize: '0.8rem', color: 'text.secondary' }}>Снять</Button>
                    <Box sx={{ flex: 1 }} />
                    <Button onClick={() => setAddBestDialogOpen(false)} sx={{ textTransform: 'none' }}>Отмена</Button>
                    <Button variant="contained" disabled={bestPickIds.size === 0} onClick={() => {
                        const people = local.people.filter(p => bestPickIds.has(p.id))
                        addPeopleToOutreach(people)
                        setAddBestDialogOpen(false)
                        setBestPickIds(new Set())
                    }} sx={{ textTransform: 'none' }}>
                        Добавить ({bestPickIds.size})
                    </Button>
                </DialogActions>
            </Dialog>

            {modalPersonId && (() => {
                const person = local.shortlist.find(s => s.id === modalPersonId)
                if (!person) return null
                const closeModal = () => { setModalPersonId(null); setHistoryInput('') }
                return (
                    <PersonModal
                        person={person}
                        open={!!modalPersonId}
                        onClose={closeModal}
                        historyInput={historyInput}
                        setHistoryInput={setHistoryInput}
                        copyToClipboard={copyToClipboard}
                        updateShortlistWithHistory={updateShortlistWithHistory}
                        updateShortlistPerson={updateShortlistPerson}
                        addHistory={addHistory}
                        onRemoveFromOutreach={() => {
                            archiveShortlistPerson(person.id)
                            closeModal()
                        }}
                        onDeleteCompletely={() => {
                            deleteShortlistPerson(person.id)
                            const personInPeople = local.people.find(p => (p.linkedinUrl && person.linkedinUrl && p.linkedinUrl.replace(/\/$/, '').toLowerCase() === person.linkedinUrl.replace(/\/$/, '').toLowerCase()) || (p.name && person.name && p.name.toLowerCase() === person.name.toLowerCase()))
                            if (personInPeople) deletePerson(personInPeople.id)
                            closeModal()
                        }}
                        onMoveToCompetitors={() => {
                            moveToCompetitors(personToMoveOpts(person))
                            closeModal()
                        }}
                    />
                )
            })()}

            {viewPerson && (
                <PersonModal
                    person={viewPerson}
                    open={!!viewPerson}
                    readOnly
                    onClose={() => setViewPerson(null)}
                    historyInput=""
                    setHistoryInput={() => { /* read-only */ }}
                    copyToClipboard={copyToClipboard}
                    updateShortlistWithHistory={() => { /* read-only */ }}
                    updateShortlistPerson={() => { /* read-only */ }}
                    addHistory={() => { /* read-only */ }}
                    onRemoveFromOutreach={() => { /* read-only */ }}
                    onDeleteCompletely={() => { /* read-only */ }}
                />
            )}

            <Snackbar
                open={!!snackbarMsg}
                autoHideDuration={1500}
                onClose={() => setSnackbarMsg(null)}
                message={snackbarMsg}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
        </Box>
    )
}
