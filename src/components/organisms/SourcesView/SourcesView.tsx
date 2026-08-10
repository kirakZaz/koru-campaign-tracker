import * as React from 'react'
import { getCampaignWeek } from '@/utils/dateUtils'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
// ListItemText kept available for future use
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import Snackbar from '@mui/material/Snackbar'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded'
import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import InputAdornment from '@mui/material/InputAdornment'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded'
import OutreachSignals from './components/OutreachSignals'
import PersonModal from './components/PersonModal'
import PeopleTab from './tabs/PeopleTab'
import GroupsTab from './tabs/GroupsTab'
import CompaniesTab from './tabs/CompaniesTab'
import CompetitorsTab from './tabs/CompetitorsTab'
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
    FollowStatus
} from './SourcesView.types'

import StatusChip from './components/StatusChip'
import SortHeader from './components/SortHeader'
import FilterSelect from './components/FilterSelect'
import {
    DM_STATUS_LABELS,
    CONNECTION_STATUS_LABELS,
    FOLLOW_STATUS_LABELS,
    ICP_LABELS,
    NEXT_ACTION_LABELS,
    cellSx,
    headCellSx,
    DEFAULT_COUNTRIES,
} from './sources.constants'
import { generateId, getNextAction, isWithinLastWeek, getAutoActions } from './sources.utils'

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

    const [sortKey, setSortKey] = React.useState<string>('')
    const [sortDir, setSortDir] = React.useState<'asc' | 'desc'>('asc')

    const toggleSort = React.useCallback((key: string) => {
        if (sortKey === key) {
            setSortDir(prev => prev === 'asc' ? 'desc' : 'asc')
        } else {
            setSortKey(key)
            setSortDir('asc')
        }
    }, [sortKey])

    function sorted<T extends Record<string, any>>(items: T[]): T[] {
        if (!sortKey) return items
        return [...items].sort((a, b) => {
            const va = a[sortKey] ?? ''
            const vb = b[sortKey] ?? ''
            const cmp = typeof va === 'number' && typeof vb === 'number'
                ? va - vb
                : String(va).localeCompare(String(vb), undefined, { sensitivity: 'base' })
            return sortDir === 'asc' ? cmp : -cmp
        })
    }

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

    // Reset sort, filters, selection, search, and needsAction filter when switching tabs
    React.useEffect(() => { setSortKey(''); setSortDir('asc'); setFilters({}); setSelectedIds(new Set()); setNeedsActionFilter(false); setSearchQuery(''); setSelectedPeopleIds(new Set()) }, [tab])

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

    const isInShortlist = (person: SourcePerson) => local.shortlist.some(s => (s.linkedinUrl && s.linkedinUrl === person.linkedinUrl) || (s.name && s.name === person.name))
    const togglePersonShortlist = (person: SourcePerson) => {
        if (isInShortlist(person)) {
            const next = { ...local, shortlist: local.shortlist.filter(s => !((s.linkedinUrl && s.linkedinUrl === person.linkedinUrl) || (s.name && s.name === person.name))) }
            save(next)
        } else {
            const autoActions = getAutoActions(campaignWeek, person.priority)
            const now = new Date().toISOString()
            const next = { ...local, shortlist: [...local.shortlist, { id: generateId(), batch: nextBatch, name: person.name, linkedinUrl: person.linkedinUrl, priority: person.priority, dmStatus: 'not_sent' as DmStatus, connectionStatus: 'not_sent' as ConnectionStatus, source: person.source, status: person.status, notes: person.notes, actions: autoActions, completedActions: [] as ShortlistAction[], country: person.country, icpSegment: person.icpSegment, createdAt: now, history: [{ date: now.slice(0, 10), text: `Добавлен в Outreach (W${campaignWeek})`, auto: true }] as HistoryEntry[] }] }
            save(next)
        }
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
    const activeInOutreach = local.shortlist.filter(s => !isPersonDone(s) && s.status !== 'declined' && s.status !== 'client')
    const doneInOutreach = local.shortlist.filter(s => isPersonDone(s) || s.status === 'declined' || s.status === 'client')
    const canAddNextWave = activeInOutreach.length <= 3 && outreachCandidates.length > 0

    const addPeopleToOutreach = (people: SourcePerson[]) => {
        // Deduplicate: skip people already in Outreach (by LinkedIn URL or name)
        const filtered = people.filter(p =>
            !local.shortlist.some(s =>
                (s.linkedinUrl && p.linkedinUrl && s.linkedinUrl.replace(/\/$/, '').toLowerCase() === p.linkedinUrl.replace(/\/$/, '').toLowerCase()) ||
                (s.name && p.name && s.name.toLowerCase() === p.name.toLowerCase())
            )
        )
        if (filtered.length === 0) { setSnackbarMsg('Все уже в Outreach (дубликаты)'); return }
        if (filtered.length < people.length) setSnackbarMsg(`Пропущено ${people.length - filtered.length} дубликатов`)

        const now = new Date().toISOString()
        const newEntries: ShortlistPerson[] = filtered.map(p => {
            const autoActions = getAutoActions(campaignWeek, p.priority)
            return {
                id: generateId(), batch: nextBatch, name: p.name, linkedinUrl: p.linkedinUrl,
                country: p.country, icpSegment: p.icpSegment, priority: p.priority,
                dmStatus: 'not_sent' as DmStatus, connectionStatus: 'not_sent' as ConnectionStatus,
                source: p.source, status: p.status, notes: p.notes,
                actions: autoActions, completedActions: [],
                history: [{ date: now.slice(0, 10), text: `Добавлен в Outreach (W${campaignWeek}). Авто-задачи: ${autoActions.map(a => NEXT_ACTION_LABELS[a]).join(', ')}`, auto: true }],
                createdAt: now
            }
        })
        const next = { ...local, shortlist: [...local.shortlist, ...newEntries] }
        save(next)
    }

    // Needs action filter logic
    const needsAction = (s: ShortlistPerson) =>
        s.connectionStatus === 'not_sent' ||
        (s.connectionStatus === 'accepted' && s.dmStatus === 'not_sent') ||
        s.dmStatus === 'no_reply'

    // Filtered shortlist for display
    const displayShortlist = React.useMemo(() => {
        let result = local.shortlist
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

    // All visible IDs for select-all checkbox
    const allVisibleIds = React.useMemo(() => displayShortlist.map(s => s.id), [displayShortlist])
    const allSelected = allVisibleIds.length > 0 && allVisibleIds.every(id => selectedIds.has(id))
    const someSelected = allVisibleIds.some(id => selectedIds.has(id))

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
                <Tab icon={<TrendingUpRoundedIcon sx={{ fontSize: '1rem' }} />} iconPosition="start" label={`Outreach (${local.shortlist.length})`} />
                <Tab icon={<CompareArrowsRoundedIcon sx={{ fontSize: '1rem' }} />} iconPosition="start" label={`Конкуренты (${local.competitors.length})`} />
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
                    sortKey={sortKey}
                    sortDir={sortDir}
                    toggleSort={toggleSort}
                    countries={countries}
                    setCountriesDialogOpen={setCountriesDialogOpen}
                    setSnackbarMsg={setSnackbarMsg}
                    setDeleteConfirm={setDeleteConfirm}
                    isInShortlist={isInShortlist}
                    addPeopleToOutreach={addPeopleToOutreach}
                    addPerson={addPerson}
                    updatePerson={updatePerson}
                    togglePersonShortlist={togglePersonShortlist}
                    uniqueVals={uniqueVals}
                    sorted={sorted}
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
                    sortKey={sortKey}
                    sortDir={sortDir}
                    toggleSort={toggleSort}
                    uniqueVals={uniqueVals}
                    sorted={sorted}
                    filtered={filtered}
                />
            )}

            {tab === 3 && (
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                        <TextField size="small" placeholder="Поиск..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                            InputProps={{ startAdornment: <InputAdornment position="start"><SearchRoundedIcon sx={{ fontSize: '0.9rem', color: 'text.secondary' }} /></InputAdornment> }}
                            sx={{ width: 160, '& .MuiInputBase-input': { fontSize: '0.8rem', py: 0.5 }, '& .MuiOutlinedInput-notchedOutline': { borderColor: searchQuery ? 'primary.main' : 'divider' } }}
                        />
                        <Button
                            size="small"
                            variant={needsActionFilter ? 'contained' : 'outlined'}
                            onClick={() => setNeedsActionFilter(prev => !prev)}
                            sx={{ textTransform: 'none', fontSize: '0.75rem', height: 28 }}
                        >
                            Нужно действие
                        </Button>
                        <FilterSelect label="Priority" value={filters.priority || ''} options={['A', 'B', 'C']} onChange={v => setFilter('priority', v)} />
                        <FilterSelect label="Запрос" value={filters.connectionStatus || ''} options={['not_sent', 'sent', 'accepted', 'declined']} onChange={v => setFilter('connectionStatus', v)} />
                        <FilterSelect label="DM" value={filters.dmStatus || ''} options={['not_sent', 'sent', 'replied', 'no_reply']} onChange={v => setFilter('dmStatus', v)} />
                        {Object.keys(filters).length > 0 && (
                            <IconButton size="small" onClick={clearFilters} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }} title="Сбросить все фильтры">
                                <FilterAltOffRoundedIcon sx={{ fontSize: '1rem' }} />
                            </IconButton>
                        )}
                        {selectedIds.size > 0 && (
                            <>
                                <Button size="small" variant="outlined" onClick={() => bulkUpdate({ connectionStatus: 'sent' })} sx={{ textTransform: 'none', fontSize: '0.7rem', height: 26 }}>
                                    Запрос отпр. ({selectedIds.size})
                                </Button>
                                <Button size="small" variant="outlined" onClick={() => bulkUpdate({ connectionStatus: 'accepted' })} sx={{ textTransform: 'none', fontSize: '0.7rem', height: 26 }}>
                                    Запрос принят ({selectedIds.size})
                                </Button>
                                <Button size="small" variant="outlined" onClick={() => bulkUpdate({ dmStatus: 'sent' })} sx={{ textTransform: 'none', fontSize: '0.7rem', height: 26 }}>
                                    DM отпр. ({selectedIds.size})
                                </Button>
                                <Button size="small" variant="outlined" onClick={() => bulkUpdate({ dmStatus: 'replied' })} sx={{ textTransform: 'none', fontSize: '0.7rem', height: 26 }}>
                                    DM ответил ({selectedIds.size})
                                </Button>
                                <Button size="small" variant="outlined" onClick={() => setSelectedIds(new Set())} sx={{ textTransform: 'none', fontSize: '0.7rem', height: 26, color: 'text.secondary' }}>
                                    Снять выбор
                                </Button>
                            </>
                        )}
                        <Box sx={{ flex: 1 }} />
                        <Button size="small" variant="outlined" onClick={() => {
                            const now = new Date().toISOString().slice(0, 10)
                            let updated = 0
                            const nextShortlist = local.shortlist.map(s => {
                                const newActions = getAutoActions(campaignWeek, s.priority)
                                const existing = s.actions || []
                                const toAdd = newActions.filter(a => !existing.includes(a))
                                if (toAdd.length === 0) return s
                                updated++
                                return { ...s, actions: [...existing, ...toAdd], history: [...(s.history || []), { date: now, text: `Обновлено на W${campaignWeek}: +${toAdd.map(a => NEXT_ACTION_LABELS[a]).join(', ')}`, auto: true }] }
                            })
                            if (updated > 0) { save({ ...local, shortlist: nextShortlist }); setSnackbarMsg(`Обновлено: ${updated} человек (W${campaignWeek})`) }
                            else setSnackbarMsg(`Все задачи актуальны (W${campaignWeek})`)
                        }} sx={{ textTransform: 'none', fontSize: '0.75rem', height: 28, mr: 0.5, borderColor: '#6c8eff44', color: '#6c8eff', '&:hover': { borderColor: '#6c8eff', backgroundColor: '#6c8eff11' } }}>
                            Обновить задачи (W{campaignWeek})
                        </Button>
                        {local.shortlist.length > 0 && (
                            <Button size="small" variant="outlined" onClick={() => {
                                if (window.confirm(`Удалить всех ${local.shortlist.length} человек из Outreach? Это не удалит их из People.`)) {
                                    save({ ...local, shortlist: [] })
                                    setSelectedIds(new Set())
                                    setSnackbarMsg('Outreach очищен')
                                }
                            }} sx={{ textTransform: 'none', fontSize: '0.7rem', height: 26, mr: 0.5, borderColor: '#f8514944', color: '#f85149', '&:hover': { borderColor: '#f85149', backgroundColor: '#f8514911' } }}>
                                Сбросить всё ({local.shortlist.length})
                            </Button>
                        )}
                        {(() => {
                            const seen = new Set<string>()
                            const dups = local.shortlist.filter(s => {
                                const key = (s.linkedinUrl || s.name || '').toLowerCase().replace(/\/$/, '')
                                if (!key) return false
                                if (seen.has(key)) return true
                                seen.add(key)
                                return false
                            })
                            return dups.length > 0 ? (
                                <Button size="small" variant="outlined" onClick={() => {
                                    const seen2 = new Set<string>()
                                    const deduped = local.shortlist.filter(s => {
                                        const key = (s.linkedinUrl || s.name || '').toLowerCase().replace(/\/$/, '')
                                        if (!key) return true
                                        if (seen2.has(key)) return false
                                        seen2.add(key)
                                        return true
                                    })
                                    save({ ...local, shortlist: deduped })
                                    setSnackbarMsg(`Удалено ${local.shortlist.length - deduped.length} дубликатов`)
                                }} sx={{ textTransform: 'none', fontSize: '0.7rem', height: 26, mr: 0.5, borderColor: '#d2992244', color: '#d29922' }}>
                                    Убрать дубликаты ({dups.length})
                                </Button>
                            ) : null
                        })()}
                        {outreachCandidates.length > 0 && (
                            <Button size="small" variant={canAddNextWave ? 'contained' : 'outlined'} onClick={() => {
                                const top = outreachCandidates.slice(0, WAVE_SIZE)
                                setBestPickIds(new Set(top.map(p => p.id)))
                                setAddBestDialogOpen(true)
                            }} sx={{ textTransform: 'none', fontSize: '0.8rem', mr: 0.5, ...(canAddNextWave ? { backgroundColor: '#3fb68e', '&:hover': { backgroundColor: '#2d9e72' } } : { borderColor: '#3fb68e44', color: '#3fb68e', '&:hover': { borderColor: '#3fb68e', backgroundColor: '#3fb68e11' } }) }}>
                                {canAddNextWave ? `Следующая волна (${Math.min(WAVE_SIZE, outreachCandidates.length)})` : `+ Волна из People (${Math.min(WAVE_SIZE, outreachCandidates.length)})`}
                            </Button>
                        )}
                        <Button size="small" startIcon={<AddRoundedIcon />} onClick={addShortlistPerson} variant="outlined" sx={{ textTransform: 'none', fontSize: '0.8rem' }}>
                            Добавить
                        </Button>
                    </Box>
                    {local.shortlist.length > 0 && (
                        <Box sx={{ display: 'flex', gap: 2, mb: 1.5, px: 1 }}>
                            <Typography sx={{ fontSize: '0.75rem', color: '#6c8eff' }}>
                                Активных: <b>{activeInOutreach.length}</b>
                            </Typography>
                            <Typography sx={{ fontSize: '0.75rem', color: '#3fb68e' }}>
                                Завершено: <b>{doneInOutreach.length}</b>
                            </Typography>
                            <Typography sx={{ fontSize: '0.75rem', color: '#8b949e' }}>
                                Всего: <b>{local.shortlist.length}</b>
                            </Typography>
                            <Typography sx={{ fontSize: '0.75rem', color: '#8b949e' }}>
                                W{campaignWeek}
                            </Typography>
                        </Box>
                    )}
                    {displayShortlist.length === 0 ? (
                        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, py: 4, textAlign: 'center' }}>
                            <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                                {needsActionFilter
                                    ? 'Нет людей, требующих действия.'
                                    : 'Пока пусто. Добавляй лучших людей \u2014 они появятся здесь.'}
                            </Typography>
                        </Box>
                    ) : (
                        <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: '#ffffff06' }}>
                                        <TableCell sx={{ ...headCellSx, width: 36, px: 0.5 }}>
                                            <Checkbox
                                                size="small"
                                                checked={allSelected}
                                                indeterminate={someSelected && !allSelected}
                                                onChange={() => {
                                                    if (allSelected) {
                                                        setSelectedIds(new Set())
                                                    } else {
                                                        setSelectedIds(new Set(allVisibleIds))
                                                    }
                                                }}
                                                sx={{ p: 0.25 }}
                                            />
                                        </TableCell>
                                        <SortHeader label="Имя" field="name" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                        <SortHeader label="Priority" field="priority" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                        <SortHeader label="Follow" field="followStatus" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                        <SortHeader label="Запрос" field="connectionStatus" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                        <SortHeader label="DM" field="dmStatus" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                        <TableCell sx={headCellSx}>Next</TableCell>
                                        <TableCell sx={headCellSx}>Отметки</TableCell>
                                        <TableCell sx={{ ...headCellSx, width: 40 }} />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {sorted(displayShortlist).map((s) => {
                                        const nextAction = getNextAction(s)
                                        const prColor = s.priority === 'A' ? '#3fb68e' : s.priority === 'B' ? '#d29922' : '#8b949e'
                                        return (
                                            <TableRow
                                                key={s.id}
                                                sx={{ '&:hover': { backgroundColor: '#ffffff04' }, backgroundColor: selectedIds.has(s.id) ? '#6c8eff08' : undefined, cursor: 'pointer' }}
                                                onClick={(e) => {
                                                    // Don't open modal when clicking on checkbox cell
                                                    const target = e.target as HTMLElement
                                                    if (target.closest('[data-checkbox-cell]')) return
                                                    setModalPersonId(s.id)
                                                }}
                                            >
                                                <TableCell sx={{ ...cellSx, px: 0.5 }} data-checkbox-cell>
                                                    <Checkbox
                                                        size="small"
                                                        checked={selectedIds.has(s.id)}
                                                        onChange={() => {
                                                            setSelectedIds(prev => {
                                                                const next = new Set(prev)
                                                                if (next.has(s.id)) next.delete(s.id)
                                                                else next.add(s.id)
                                                                return next
                                                            })
                                                        }}
                                                        sx={{ p: 0.25 }}
                                                    />
                                                </TableCell>
                                                <TableCell sx={{ ...cellSx, fontWeight: 600 }}>{s.name || '\u2014'}</TableCell>
                                                <TableCell sx={cellSx}>
                                                    <Chip
                                                        label={s.priority || 'B'}
                                                        size="small"
                                                        sx={{ fontSize: '0.7rem', fontWeight: 800, height: 20, minWidth: 24, backgroundColor: prColor + '22', color: prColor, border: `1px solid ${prColor}44` }}
                                                    />
                                                </TableCell>
                                                <TableCell sx={cellSx}>
                                                    <StatusChip {...FOLLOW_STATUS_LABELS[(s.followStatus || 'not_followed') as FollowStatus]} />
                                                </TableCell>
                                                <TableCell sx={cellSx}>
                                                    <StatusChip {...CONNECTION_STATUS_LABELS[s.connectionStatus || 'not_sent']} />
                                                </TableCell>
                                                <TableCell sx={cellSx}>
                                                    <StatusChip {...DM_STATUS_LABELS[s.dmStatus || 'not_sent']} />
                                                </TableCell>
                                                <TableCell sx={cellSx}>
                                                    <StatusChip label={nextAction.label} color={nextAction.color} />
                                                </TableCell>
                                                <TableCell sx={cellSx}>
                                                    <OutreachSignals person={s} />
                                                </TableCell>
                                                <TableCell sx={cellSx}>
                                                    <Tooltip title="Открыть карточку">
                                                        <IconButton
                                                            size="small"
                                                            onClick={(e) => { e.stopPropagation(); setModalPersonId(s.id) }}
                                                            sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                                                        >
                                                            <ChevronRightRoundedIcon sx={{ fontSize: '1.1rem' }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
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
                    sortKey={sortKey}
                    sortDir={sortDir}
                    toggleSort={toggleSort}
                    sorted={sorted}
                    filtered={filtered}
                />
            )}

            {tab === 99 && (() => {
                const totalPeople = local.people.length
                const priorityA = local.people.filter(p => p.priority === 'A').length
                const priorityB = local.people.filter(p => p.priority === 'B').length
                const priorityC = local.people.filter(p => p.priority === 'C').length
                const bySegment = {
                    freelancer: local.people.filter(p => p.icpSegment === 'freelancer').length,
                    small_agency: local.people.filter(p => p.icpSegment === 'small_agency').length,
                    in_house: local.people.filter(p => p.icpSegment === 'in_house').length,
                    other: local.people.filter(p => p.icpSegment === 'other').length,
                }
                const byActivity = {
                    high: local.people.filter(p => p.activityLevel === 'high').length,
                    medium: local.people.filter(p => p.activityLevel === 'medium').length,
                    low: local.people.filter(p => p.activityLevel === 'low').length,
                }
                const groupsApproved = local.groups.filter(g => g.status === 'approved').length
                const groupsPending = local.groups.filter(g => g.status === 'pending').length
                const groupsRejected = local.groups.filter(g => g.status === 'rejected').length
                const shortlistTotal = local.shortlist.length
                const crSent = local.shortlist.filter(s => s.connectionStatus === 'sent').length
                const crAccepted = local.shortlist.filter(s => s.connectionStatus === 'accepted').length
                const crDeclined = local.shortlist.filter(s => s.connectionStatus === 'declined').length
                const dmSent = local.shortlist.filter(s => s.dmStatus === 'sent').length
                const dmReplied = local.shortlist.filter(s => s.dmStatus === 'replied').length
                const dmNoReply = local.shortlist.filter(s => s.dmStatus === 'no_reply').length
                const demoCount = local.shortlist.filter(s => s.status === 'demo').length
                const betaCount = local.shortlist.filter(s => s.status === 'beta').length
                const clientCount = local.shortlist.filter(s => s.status === 'client').length
                const countryCounts: Record<string, number> = {}
                for (const p of local.people) { if (p.country) countryCounts[p.country] = (countryCounts[p.country] || 0) + 1 }
                const topCountries = Object.entries(countryCounts).sort((a, b) => b[1] - a[1]).slice(0, 8)
                const addedThisWeek = local.people.filter(p => isWithinLastWeek(p.createdAt)).length

                const statBox = { p: 2, borderRadius: 2, backgroundColor: '#ffffff05', border: '1px solid', borderColor: 'divider' }
                const statNum = { fontSize: '1.8rem', fontWeight: 800, color: 'primary.main', lineHeight: 1 }
                const statLabel = { fontSize: '0.7rem', color: 'text.secondary', textTransform: 'uppercase' as const, fontWeight: 600, mt: 0.5 }
                const barSx = (color: string, pct: number) => ({ height: 6, borderRadius: 3, backgroundColor: color + '22', position: 'relative' as const, overflow: 'hidden', '&::after': { content: '""', position: 'absolute', left: 0, top: 0, height: '100%', width: `${Math.min(pct, 100)}%`, backgroundColor: color, borderRadius: 3 } })

                return (
                    <Box>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 1.5, mb: 3 }}>
                            <Box sx={statBox}><Typography sx={statNum}>{totalPeople}</Typography><Typography sx={statLabel}>People total</Typography></Box>
                            <Box sx={statBox}><Typography sx={{ ...statNum, color: '#3fb68e' }}>{priorityA}</Typography><Typography sx={statLabel}>Priority A</Typography></Box>
                            <Box sx={statBox}><Typography sx={{ ...statNum, color: '#d29922' }}>{priorityB}</Typography><Typography sx={statLabel}>Priority B</Typography></Box>
                            <Box sx={statBox}><Typography sx={{ ...statNum, color: '#8b949e' }}>{priorityC}</Typography><Typography sx={statLabel}>Priority C</Typography></Box>
                            <Box sx={statBox}><Typography sx={{ ...statNum, color: '#6c8eff' }}>{shortlistTotal}</Typography><Typography sx={statLabel}>Outreach</Typography></Box>
                            <Box sx={statBox}><Typography sx={{ ...statNum, color: '#a371f7' }}>{local.groups.length}</Typography><Typography sx={statLabel}>Groups total</Typography></Box>
                            <Box sx={statBox}><Typography sx={{ ...statNum, color: '#3fb68e' }}>{addedThisWeek}</Typography><Typography sx={statLabel}>Добавлено за неделю</Typography></Box>
                        </Box>

                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 3 }}>
                            <Box sx={statBox}>
                                <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1.5 }}>Outreach Funnel</Typography>
                                {[
                                    { label: 'In Outreach', count: shortlistTotal, color: '#6c8eff' },
                                    { label: 'Запрос отпр.', count: crSent, color: '#d29922' },
                                    { label: `Запрос принят${crSent + crAccepted + crDeclined > 0 ? ` (${Math.round((crAccepted / (crSent + crAccepted + crDeclined)) * 100)}%)` : ''}`, count: crAccepted, color: '#3fb68e' },
                                    { label: 'DM отпр.', count: dmSent, color: '#a371f7' },
                                    { label: `DM ответил${dmSent + dmReplied + dmNoReply > 0 ? ` (${Math.round((dmReplied / (dmSent + dmReplied + dmNoReply)) * 100)}%)` : ''}`, count: dmReplied, color: '#3fb68e' },
                                    { label: 'Demo', count: demoCount, color: '#a371f7' },
                                    { label: 'Beta', count: betaCount, color: '#3fb68e' },
                                    { label: 'Client', count: clientCount, color: '#3fb68e' },
                                ].map(r => (
                                    <Box key={r.label} sx={{ mb: 1 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.3 }}>
                                            <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{r.label}</Typography>
                                            <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: r.color }}>{r.count}</Typography>
                                        </Box>
                                        <Box sx={barSx(r.color, shortlistTotal > 0 ? (r.count / shortlistTotal) * 100 : 0)} />
                                    </Box>
                                ))}
                            </Box>

                            <Box sx={statBox}>
                                <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1.5 }}>ICP Segments</Typography>
                                {[
                                    { label: 'Freelancer', count: bySegment.freelancer, color: '#3fb68e' },
                                    { label: 'Small Agency', count: bySegment.small_agency, color: '#6c8eff' },
                                    { label: 'In-House', count: bySegment.in_house, color: '#d29922' },
                                    { label: 'Other', count: bySegment.other, color: '#8b949e' },
                                ].filter(r => r.count > 0).map(r => (
                                    <Box key={r.label} sx={{ mb: 1 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.3 }}>
                                            <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{r.label}</Typography>
                                            <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: r.color }}>{r.count}</Typography>
                                        </Box>
                                        <Box sx={barSx(r.color, totalPeople > 0 ? (r.count / totalPeople) * 100 : 0)} />
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
                            <Box sx={statBox}>
                                <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1.5 }}>Groups</Typography>
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    <Chip label={`Approved ${groupsApproved}`} size="small" sx={{ fontSize: '0.7rem', backgroundColor: '#3fb68e22', color: '#3fb68e' }} />
                                    <Chip label={`Pending ${groupsPending}`} size="small" sx={{ fontSize: '0.7rem', backgroundColor: '#d2992222', color: '#d29922' }} />
                                    {groupsRejected > 0 && <Chip label={`Rejected ${groupsRejected}`} size="small" sx={{ fontSize: '0.7rem', backgroundColor: '#f8514922', color: '#f85149' }} />}
                                </Box>
                            </Box>

                            <Box sx={statBox}>
                                <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1.5 }}>Запросы на связь (Outreach)</Typography>
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    <Chip label={`Sent ${crSent}`} size="small" sx={{ fontSize: '0.7rem', backgroundColor: '#d2992222', color: '#d29922' }} />
                                    <Chip label={`Accepted ${crAccepted}`} size="small" sx={{ fontSize: '0.7rem', backgroundColor: '#3fb68e22', color: '#3fb68e' }} />
                                    {crDeclined > 0 && <Chip label={`Declined ${crDeclined}`} size="small" sx={{ fontSize: '0.7rem', backgroundColor: '#f8514922', color: '#f85149' }} />}
                                </Box>
                                {crSent + crAccepted > 0 && <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary', mt: 1 }}>Accept rate: {crAccepted + crSent > 0 ? Math.round((crAccepted / (crAccepted + crSent + crDeclined)) * 100) : 0}%</Typography>}
                            </Box>

                            <Box sx={statBox}>
                                <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1.5 }}>DMs (Outreach)</Typography>
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    <Chip label={`Sent ${dmSent}`} size="small" sx={{ fontSize: '0.7rem', backgroundColor: '#d2992222', color: '#d29922' }} />
                                    <Chip label={`Replied ${dmReplied}`} size="small" sx={{ fontSize: '0.7rem', backgroundColor: '#3fb68e22', color: '#3fb68e' }} />
                                    {dmNoReply > 0 && <Chip label={`No reply ${dmNoReply}`} size="small" sx={{ fontSize: '0.7rem', backgroundColor: '#f8514922', color: '#f85149' }} />}
                                </Box>
                                {dmSent + dmReplied > 0 && <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary', mt: 1 }}>Reply rate: {dmReplied + dmSent + dmNoReply > 0 ? Math.round((dmReplied / (dmReplied + dmSent + dmNoReply)) * 100) : 0}%</Typography>}
                            </Box>
                        </Box>

                        {topCountries.length > 0 && (
                            <Box sx={{ ...statBox, mt: 2 }}>
                                <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1.5 }}>Top Countries</Typography>
                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    {topCountries.map(([country, count]) => (
                                        <Chip key={country} label={`${country} (${count})`} size="small" sx={{ fontSize: '0.7rem' }} />
                                    ))}
                                </Box>
                            </Box>
                        )}

                        <Box sx={{ ...statBox, mt: 2 }}>
                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1 }}>Activity Level</Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Typography sx={{ fontSize: '0.75rem', color: '#3fb68e' }}>High: {byActivity.high}</Typography>
                                <Typography sx={{ fontSize: '0.75rem', color: '#d29922' }}>Medium: {byActivity.medium}</Typography>
                                <Typography sx={{ fontSize: '0.75rem', color: '#8b949e' }}>Low: {byActivity.low}</Typography>
                            </Box>
                        </Box>
                    </Box>
                )
            })()}

            {tab === 4 && (
                <CompetitorsTab
                    local={local}
                    filters={filters}
                    setFilter={setFilter}
                    clearFilters={clearFilters}
                    addCompetitor={addCompetitor}
                    updateCompetitor={updateCompetitor}
                    setDeleteConfirm={setDeleteConfirm}
                    sortKey={sortKey}
                    sortDir={sortDir}
                    toggleSort={toggleSort}
                    sorted={sorted}
                    filtered={filtered}
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
                            const personInPeople = local.people.find(p => (p.linkedinUrl && person.linkedinUrl && p.linkedinUrl.replace(/\/$/, '').toLowerCase() === person.linkedinUrl.replace(/\/$/, '').toLowerCase()) || (p.name && person.name && p.name.toLowerCase() === person.name.toLowerCase()))
                            if (personInPeople) {
                                const withoutPerson = local.people.filter(p => p.id !== personInPeople.id)
                                const next = { ...local, people: [...withoutPerson, { ...personInPeople, status: 'declined' as PersonStatus }], shortlist: local.shortlist.filter(s => s.id !== person.id) }
                                save(next)
                            } else {
                                const newPerson = { id: generateId(), name: person.name, title: '', linkedinUrl: person.linkedinUrl, country: person.country || '', icpSegment: person.icpSegment || 'other' as IcpSegment, priority: person.priority || 'C' as IcpPriority, activityLevel: 'low' as const, source: person.source || '', status: 'declined' as PersonStatus, notes: person.notes || '' }
                                const next = { ...local, people: [...local.people, newPerson], shortlist: local.shortlist.filter(s => s.id !== person.id) }
                                save(next)
                            }
                            closeModal()
                        }}
                        onDeleteCompletely={() => {
                            deleteShortlistPerson(person.id)
                            const personInPeople = local.people.find(p => (p.linkedinUrl && person.linkedinUrl && p.linkedinUrl.replace(/\/$/, '').toLowerCase() === person.linkedinUrl.replace(/\/$/, '').toLowerCase()) || (p.name && person.name && p.name.toLowerCase() === person.name.toLowerCase()))
                            if (personInPeople) deletePerson(personInPeople.id)
                            closeModal()
                        }}
                    />
                )
            })()}

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
