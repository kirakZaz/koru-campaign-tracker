import * as React from 'react'
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
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
// ListItemText kept available for future use
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import Snackbar from '@mui/material/Snackbar'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded'
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import InputAdornment from '@mui/material/InputAdornment'
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import type {
    SourcesViewProps,
    SourcePerson,
    SourceGroup,
    SourceCompany,
    ShortlistPerson,
    PersonStatus,
    GroupStatus,
    CompanyStatus,
    IcpSegment,
    IcpPriority,
    AccountName,
    DmStatus,
    ConnectionStatus,
    ShortlistAction,
    HistoryEntry
} from './SourcesView.types'

const DM_STATUS_LABELS: Record<DmStatus, { label: string, color: string }> = {
    not_sent: { label: '--', color: '#8b949e' },
    sent: { label: 'Sent', color: '#d29922' },
    replied: { label: 'Replied', color: '#3fb68e' },
    no_reply: { label: 'No reply', color: '#f85149' }
}

const CONNECTION_STATUS_LABELS: Record<ConnectionStatus, { label: string, color: string }> = {
    not_sent: { label: '--', color: '#8b949e' },
    sent: { label: 'Sent', color: '#d29922' },
    accepted: { label: 'Accepted', color: '#3fb68e' },
    declined: { label: 'Declined', color: '#f85149' }
}

const PERSON_STATUS_LABELS: Record<PersonStatus, { label: string, color: string }> = {
    new: { label: 'New', color: '#8b949e' },
    connected: { label: 'Connected', color: '#6c8eff' },
    dm_sent: { label: 'DM отпр.', color: '#d29922' },
    replied: { label: 'Replied', color: '#3fb68e' },
    demo: { label: 'Demo', color: '#a371f7' },
    beta: { label: 'Beta', color: '#3fb68e' },
    client: { label: 'Client', color: '#3fb68e' },
    declined: { label: 'Declined', color: '#f85149' }
}

const GROUP_STATUS_LABELS: Record<GroupStatus, { label: string, color: string }> = {
    pending: { label: 'Pending', color: '#d29922' },
    approved: { label: 'Approved', color: '#3fb68e' },
    rejected: { label: 'Rejected', color: '#f85149' }
}

const COMPANY_STATUS_LABELS: Record<CompanyStatus, { label: string, color: string }> = {
    research: { label: 'Research', color: '#8b949e' },
    contacted: { label: 'Contacted', color: '#d29922' },
    in_talks: { label: 'In talks', color: '#6c8eff' },
    partner: { label: 'Partner', color: '#3fb68e' },
    declined: { label: 'Declined', color: '#f85149' }
}

const ICP_LABELS: Record<IcpSegment, string> = {
    freelancer: 'Freelancer',
    small_agency: 'Small Agency',
    in_house: 'In-House',
    other: 'Other'
}

const SHORTLIST_ACTION_LABELS: Record<ShortlistAction, string> = {
    comment_post: 'Прокомментировать пост',
    send_dm: 'Написать DM',
    send_cr: 'Отправить запрос',
    invite_demo: 'Пригласить на демо',
    invite_beta: 'Предложить бета-тест',
    send_email: 'Отправить email',
    add_to_mailing: 'Добавить в рассылку',
    tweet_reply: 'Ответить в Twitter',
    mention_in_post: 'Упомянуть в посте'
}

const cellSx = { fontSize: '0.8rem', py: 0.75, px: 1, borderColor: 'divider' }
const headCellSx = { ...cellSx, fontWeight: 700, color: 'text.secondary', fontSize: '0.7rem', textTransform: 'uppercase' as const, whiteSpace: 'nowrap' as const }
const inputSx = { '& .MuiInputBase-input': { fontSize: '0.8rem', py: 0.5, px: 0.75 }, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' }, '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' } }
const selectSx = { fontSize: '0.8rem', '& .MuiSelect-select': { py: 0.5, px: 0.75 }, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' } }

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

function InlineInput({ value, onChange, placeholder }: { value: string, onChange: (v: string) => void, placeholder?: string }) {
    return (
        <TextField
            size="small"
            fullWidth
            variant="outlined"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            sx={inputSx}
        />
    )
}

function StatusChip({ label, color }: { label: string, color: string }) {
    return <Chip label={label} size="small" sx={{ fontSize: '0.7rem', height: 22, fontWeight: 600, backgroundColor: color + '22', color, border: `1px solid ${color}44` }} />
}

function SortHeader({ label, field, activeField, direction, onSort, children }: { label: string, field: string, activeField: string, direction: 'asc' | 'desc', onSort: (f: string) => void, children?: React.ReactNode }) {
    const active = activeField === field
    return (
        <TableCell sx={headCellSx}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', userSelect: 'none', '&:hover': { color: 'text.primary' } }} onClick={() => onSort(field)}>
                {label}
                {children}
                {active && (direction === 'asc'
                    ? <ArrowUpwardRoundedIcon sx={{ fontSize: '0.65rem' }} />
                    : <ArrowDownwardRoundedIcon sx={{ fontSize: '0.65rem' }} />
                )}
            </Box>
        </TableCell>
    )
}

function FilterSelect({ label, value, options, onChange }: { label: string, value: string, options: string[], onChange: (v: string) => void }) {
    return (
        <Select
            size="small"
            value={value}
            onChange={e => onChange(e.target.value)}
            displayEmpty
            endAdornment={value ? (
                <IconButton size="small" onClick={(e) => { e.stopPropagation(); onChange('') }} sx={{ p: 0, mr: 1.5, color: 'text.secondary', '&:hover': { color: 'error.main' } }}>
                    <CloseRoundedIcon sx={{ fontSize: '0.75rem' }} />
                </IconButton>
            ) : null}
            sx={{ fontSize: '0.75rem', minWidth: 90, height: 28, '& .MuiSelect-select': { py: 0.25, px: 1, pr: value ? '32px !important' : undefined }, '& .MuiOutlinedInput-notchedOutline': { borderColor: value ? 'primary.main' : 'divider' } }}
        >
            <MenuItem value="" sx={{ fontSize: '0.75rem' }}>{label}: все</MenuItem>
            {options.map(o => <MenuItem key={o} value={o} sx={{ fontSize: '0.75rem' }}>{o}</MenuItem>)}
        </Select>
    )
}

const NEXT_ACTION_LABELS: Record<ShortlistAction, string> = {
    comment_post: 'Коммент к посту',
    send_cr: 'Отправить запрос',
    send_dm: 'Написать DM',
    invite_demo: 'Пригласить на демо',
    invite_beta: 'Предложить бета',
    send_email: 'Отправить email',
    add_to_mailing: 'В рассылку',
    tweet_reply: 'Ответить в Twitter',
    mention_in_post: 'Упомянуть в посте'
}

function getNextAction(s: ShortlistPerson): { label: string, color: string } {
    // Terminal states
    if (s.status === 'client') return { label: 'Клиент ✓', color: '#3fb68e' }
    if (s.status === 'beta') return { label: 'В бете ✓', color: '#3fb68e' }
    if (s.status === 'declined') return { label: 'Отказ', color: '#f85149' }

    // Waiting states from funnel
    if (s.connectionStatus === 'sent') return { label: 'Ждём ответ', color: '#d29922' }
    if (s.dmStatus === 'sent') return { label: 'Ждём DM', color: '#d29922' }
    if (s.dmStatus === 'no_reply') return { label: 'Follow up!', color: '#f85149' }
    if (s.dmStatus === 'replied') return { label: 'Назначить demo', color: '#3fb68e' }
    if (s.status === 'demo') return { label: 'Провести demo', color: '#a371f7' }

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

function isWithinLastWeek(dateStr?: string): boolean {
    if (!dateStr) return false
    const d = new Date(dateStr)
    const now = new Date()
    const diff = now.getTime() - d.getTime()
    return diff >= 0 && diff <= 7 * 24 * 60 * 60 * 1000
}

const DEFAULT_COUNTRIES = ['US', 'UK', 'Israel', 'Канада', 'Австралия', 'Германия', 'Индия', 'Нидерланды']

// Auto-assign actions based on campaign week + priority
function getAutoActions(week: number, priority: IcpPriority): ShortlistAction[] {
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

function getCampaignWeek(startDate: string | null | undefined): number {
    if (!startDate) return 1
    const start = new Date(startDate)
    const now = new Date()
    const diffMs = now.getTime() - start.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    return Math.max(1, Math.ceil((diffDays + 1) / 7))
}

export default function SourcesView({ sources, onSaveSources, startDate }: SourcesViewProps) {
    const [tab, setTab] = React.useState(0)
    const [local, setLocal] = React.useState({ people: sources.people || [], groups: sources.groups || [], companies: sources.companies || [], shortlist: sources.shortlist || [], countries: sources.countries || [] })
    const saveTimerRef = React.useRef<ReturnType<typeof setTimeout>>()
    const [countriesDialogOpen, setCountriesDialogOpen] = React.useState(false)
    const [newCountry, setNewCountry] = React.useState('')
    const [deleteConfirm, setDeleteConfirm] = React.useState<{ id: string, name: string, type: 'person' | 'group' | 'company' | 'shortlist' } | null>(null)
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

    React.useEffect(() => {
        setLocal({
            people: sources.people || [],
            groups: sources.groups || [],
            companies: sources.companies || [],
            shortlist: sources.shortlist || [],
            countries: sources.countries || []
        })
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
        const next = { ...local, people: [{ id: generateId(), name: '', linkedinUrl: '', country: '', icpSegment: 'freelancer' as IcpSegment, priority: 'B' as IcpPriority, activityLevel: 'medium' as const, source: '', status: 'new' as PersonStatus, notes: '', createdAt: new Date().toISOString() }, ...local.people] }
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
    function candidateScore(p: SourcePerson): number {
        let score = 0
        // Priority: A=30, B=15, C=0
        score += p.priority === 'A' ? 30 : p.priority === 'B' ? 15 : 0
        // Activity: high=20, medium=10, low=0
        score += p.activityLevel === 'high' ? 20 : p.activityLevel === 'medium' ? 10 : 0
        // Has notes (personalization possible): +15
        if (p.notes && p.notes.trim().length > 10) score += 15
        // Has LinkedIn URL: +10
        if (p.linkedinUrl && p.linkedinUrl.includes('linkedin')) score += 10
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
        const now = new Date().toISOString()
        const newEntries: ShortlistPerson[] = people.map(p => {
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

    // --- Contact Modal ---
    function renderContactModal() {
        const person = local.shortlist.find(s => s.id === modalPersonId)
        if (!person) return null

        const nextAction = getNextAction(person)
        const firstName = person.name.split(' ')[0] || person.name
        const notesRef = person.notes ? person.notes.slice(0, 50) : 'your work'
        const priorityColor = person.priority === 'A' ? '#3fb68e' : person.priority === 'B' ? '#d29922' : '#8b949e'

        const crDone = person.connectionStatus === 'sent' || person.connectionStatus === 'accepted' || person.connectionStatus === 'declined'
        const crAccepted = person.connectionStatus === 'accepted'
        const dmDone = person.dmStatus === 'sent' || person.dmStatus === 'replied' || person.dmStatus === 'no_reply'
        const dmReplied = person.dmStatus === 'replied'
        const isDemo = person.status === 'demo' || person.status === 'beta' || person.status === 'client'
        const isBeta = person.status === 'beta' || person.status === 'client'

        const funnelChip = (label: string, done: boolean, onClick: () => void) => (
            <Chip
                label={label}
                size="small"
                onClick={onClick}
                sx={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    height: 28,
                    cursor: 'pointer',
                    backgroundColor: done ? '#3fb68e22' : '#8b949e15',
                    color: done ? '#3fb68e' : '#8b949e',
                    border: `1px solid ${done ? '#3fb68e44' : '#8b949e33'}`,
                    '&:hover': { backgroundColor: done ? '#3fb68e33' : '#8b949e25' }
                }}
            />
        )

        const templates = [
            {
                label: 'Шаблон запроса',
                text: `Hi ${firstName}, ${person.notes ? person.notes + '.' : ''} I'm building KORU \u2014 an SEO platform that audits for both Google and AI search engines. GEO score, AI brand visibility, intent-first keywords. Would love to connect.`
            },
            {
                label: 'DM first touch',
                text: `Hey ${firstName},\n\nReally appreciated your content \u2014 especially ${notesRef}.\n\nQuick question \u2014 have you looked into how your clients' content performs in AI answers specifically?\n\nI've been building a tool that checks AI-citation readiness per page \u2014 14 rules, scored 0-100. Would love your take on it.\n\nHappy to share access if you're curious.`
            },
            {
                label: 'DM follow-up',
                text: `Hey ${firstName},\n\nFollowing up \u2014 did you get a chance to look at the GEO score concept?\n\nNo pressure at all. Just thought it might be relevant given your work in ${notesRef}.\n\nHappy to do a quick 15-min walkthrough if easier.`
            },
            {
                label: 'Demo invite',
                text: `Hey ${firstName},\n\nWould love to show you KORU in action \u2014 I can run it on your site so you see real results, not a generic demo.\n\n15 minutes, no pitch. Just want your honest feedback.\n\nWant me to send a calendar link?`
            }
        ]

        const historyEntries = [...(person.history || [])].reverse()

        return (
            <Dialog
                open={!!modalPersonId}
                onClose={() => { setModalPersonId(null); setHistoryInput('') }}
                maxWidth="sm"
                fullWidth
                PaperProps={{ sx: { backgroundColor: '#0d1117', border: '1px solid', borderColor: 'divider', maxHeight: '90vh' } }}
            >
                <DialogContent sx={{ p: 0 }}>
                    {/* Close button */}
                    <IconButton
                        size="small"
                        onClick={() => { setModalPersonId(null); setHistoryInput('') }}
                        sx={{ position: 'absolute', top: 8, right: 8, color: 'text.secondary', zIndex: 1 }}
                    >
                        <CloseRoundedIcon sx={{ fontSize: '1.1rem' }} />
                    </IconButton>

                    {/* Header */}
                    <Box sx={{ p: 2.5, pb: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Typography sx={{ fontSize: '1.25rem', fontWeight: 800 }}>{person.name || 'Без имени'}</Typography>
                            <Chip
                                label={person.priority}
                                size="small"
                                sx={{ fontSize: '0.7rem', fontWeight: 800, height: 22, backgroundColor: priorityColor + '22', color: priorityColor, border: `1px solid ${priorityColor}44` }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                            {person.linkedinUrl && (
                                <Button
                                    size="small"
                                    startIcon={<OpenInNewRoundedIcon sx={{ fontSize: '0.8rem' }} />}
                                    onClick={() => window.open(person.linkedinUrl.startsWith('http') ? person.linkedinUrl : `https://${person.linkedinUrl}`, '_blank')}
                                    sx={{ textTransform: 'none', fontSize: '0.75rem', height: 26, color: '#6c8eff' }}
                                >
                                    LinkedIn
                                </Button>
                            )}
                            {person.country && (
                                <Chip label={person.country} size="small" sx={{ fontSize: '0.7rem', height: 22 }} />
                            )}
                            {person.icpSegment && (
                                <Chip label={ICP_LABELS[person.icpSegment]} size="small" sx={{ fontSize: '0.7rem', height: 22, backgroundColor: '#6c8eff22', color: '#6c8eff' }} />
                            )}
                        </Box>
                        {person.source && (
                            <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mt: 0.75 }}>
                                Источник: {person.source}
                            </Typography>
                        )}
                    </Box>

                    {/* Next action block */}
                    <Box sx={{ mx: 2.5, mb: 2, p: 1.5, borderRadius: 1.5, backgroundColor: nextAction.color + '15', border: `1px solid ${nextAction.color}33` }}>
                        <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary', textTransform: 'uppercase', fontWeight: 700, mb: 0.5 }}>
                            Следующее действие
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: nextAction.color }}>
                                {nextAction.label}
                            </Typography>
                            {nextAction.label === 'Написать DM' && (
                                <Button
                                    size="small"
                                    startIcon={<ContentCopyRoundedIcon sx={{ fontSize: '0.7rem' }} />}
                                    onClick={() => copyToClipboard(templates[1]!.text)}
                                    sx={{ textTransform: 'none', fontSize: '0.7rem', height: 24, ml: 'auto' }}
                                >
                                    DM шаблон
                                </Button>
                            )}
                            {nextAction.label === 'Отправить запрос' && (
                                <Button
                                    size="small"
                                    startIcon={<ContentCopyRoundedIcon sx={{ fontSize: '0.7rem' }} />}
                                    onClick={() => copyToClipboard(templates[0]!.text)}
                                    sx={{ textTransform: 'none', fontSize: '0.7rem', height: 24, ml: 'auto' }}
                                >
                                    Шаблон запроса
                                </Button>
                            )}
                        </Box>
                    </Box>

                    <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }} />

                    {/* Funnel section */}
                    <Box sx={{ p: 2.5, pb: 1.5 }}>
                        <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1 }}>Воронка</Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.75 }}>
                            {funnelChip('Запрос отправлен', crDone, () => {
                                if (crDone && !crAccepted) {
                                    updateShortlistWithHistory(person.id, { connectionStatus: 'not_sent' })
                                } else if (!crDone) {
                                    updateShortlistWithHistory(person.id, { connectionStatus: 'sent' })
                                }
                            })}
                            {funnelChip('Запрос принят', crAccepted, () => {
                                if (crAccepted) {
                                    updateShortlistWithHistory(person.id, { connectionStatus: 'sent' })
                                } else {
                                    updateShortlistWithHistory(person.id, { connectionStatus: 'accepted' })
                                }
                            })}
                            {funnelChip('DM отправлен', dmDone, () => {
                                if (dmDone && !dmReplied) {
                                    updateShortlistWithHistory(person.id, { dmStatus: 'not_sent' })
                                } else if (!dmDone) {
                                    updateShortlistWithHistory(person.id, { dmStatus: 'sent' })
                                }
                            })}
                            {funnelChip('DM ответил', dmReplied, () => {
                                if (dmReplied) {
                                    updateShortlistWithHistory(person.id, { dmStatus: 'sent' })
                                } else {
                                    updateShortlistWithHistory(person.id, { dmStatus: 'replied' })
                                }
                            })}
                            {funnelChip('Demo', isDemo, () => {
                                if (isDemo && person.status === 'demo') {
                                    updateShortlistWithHistory(person.id, { status: 'new' })
                                } else if (!isDemo) {
                                    updateShortlistWithHistory(person.id, { status: 'demo' })
                                }
                            })}
                            {funnelChip('Beta / Client', isBeta, () => {
                                if (isBeta && person.status === 'beta') {
                                    updateShortlistWithHistory(person.id, { status: 'demo' })
                                } else if (!isBeta) {
                                    updateShortlistWithHistory(person.id, { status: 'beta' })
                                }
                            })}
                        </Box>
                    </Box>

                    <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }} />

                    {/* Checklist section */}
                    <Box sx={{ p: 2.5, pb: 1.5 }}>
                        <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1 }}>Чеклист</Typography>
                        {(person.actions || []).length === 0 && (
                            <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 1 }}>Нет действий. Добавьте ниже.</Typography>
                        )}
                        {(person.actions || []).map(action => {
                            const completed = (person.completedActions || []).includes(action)
                            return (
                                <Box
                                    key={action}
                                    sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25, cursor: 'pointer', '&:hover': { backgroundColor: '#ffffff06' }, borderRadius: 0.5, px: 0.5 }}
                                    onClick={() => {
                                        const current = person.completedActions || []
                                        const next = completed
                                            ? current.filter(a => a !== action)
                                            : [...current, action]
                                        updateShortlistPerson(person.id, { completedActions: next })
                                    }}
                                >
                                    <Checkbox
                                        size="small"
                                        checked={completed}
                                        sx={{ p: 0.25, color: completed ? '#3fb68e' : '#8b949e', '&.Mui-checked': { color: '#3fb68e' } }}
                                    />
                                    <Typography sx={{ fontSize: '0.8rem', color: completed ? '#3fb68e' : 'text.primary', textDecoration: completed ? 'line-through' : 'none' }}>
                                        {SHORTLIST_ACTION_LABELS[action]}
                                    </Typography>
                                </Box>
                            )
                        })}
                        <Select
                            size="small"
                            value=""
                            displayEmpty
                            onChange={e => {
                                const action = e.target.value as ShortlistAction
                                if (action && !(person.actions || []).includes(action)) {
                                    updateShortlistPerson(person.id, { actions: [...(person.actions || []), action] })
                                }
                            }}
                            sx={{ fontSize: '0.75rem', mt: 0.5, height: 28, minWidth: 160, '& .MuiSelect-select': { py: 0.25, px: 1 }, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' } }}
                        >
                            <MenuItem value="" sx={{ fontSize: '0.75rem', color: '#8b949e' }}>+ Добавить действие</MenuItem>
                            {(Object.entries(SHORTLIST_ACTION_LABELS) as [ShortlistAction, string][])
                                .filter(([key]) => !(person.actions || []).includes(key))
                                .map(([key, label]) => (
                                    <MenuItem key={key} value={key} sx={{ fontSize: '0.75rem' }}>{label}</MenuItem>
                                ))}
                        </Select>
                    </Box>

                    <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }} />

                    {/* Notes section */}
                    <Box sx={{ p: 2.5, pb: 1.5 }}>
                        <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1 }}>Заметки</Typography>
                        <TextField
                            size="small"
                            fullWidth
                            multiline
                            minRows={2}
                            maxRows={5}
                            variant="outlined"
                            value={person.notes}
                            onChange={e => updateShortlistPerson(person.id, { notes: e.target.value })}
                            placeholder="Заметки о контакте..."
                            sx={{ '& .MuiInputBase-input': { fontSize: '0.8rem' }, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' } }}
                        />
                    </Box>

                    <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }} />

                    {/* Templates section */}
                    <Box sx={{ p: 2.5, pb: 1.5 }}>
                        <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1 }}>Шаблоны</Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.75 }}>
                            {templates.map(t => (
                                <Button
                                    key={t.label}
                                    size="small"
                                    variant="outlined"
                                    startIcon={<ContentCopyRoundedIcon sx={{ fontSize: '0.7rem' }} />}
                                    onClick={() => copyToClipboard(t.text)}
                                    sx={{ textTransform: 'none', fontSize: '0.72rem', justifyContent: 'flex-start', height: 32, borderColor: 'divider', color: 'text.secondary', '&:hover': { borderColor: 'primary.main', color: 'primary.main' } }}
                                >
                                    {t.label}
                                </Button>
                            ))}
                        </Box>
                    </Box>

                    <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }} />

                    {/* History section */}
                    <Box sx={{ p: 2.5, pb: 2.5 }}>
                        <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1 }}>История</Typography>
                        <Box sx={{ display: 'flex', gap: 0.75, mb: 1.5 }}>
                            <TextField
                                size="small"
                                fullWidth
                                variant="outlined"
                                value={historyInput}
                                onChange={e => setHistoryInput(e.target.value)}
                                placeholder="Добавить запись..."
                                onKeyDown={e => {
                                    if (e.key === 'Enter' && historyInput.trim()) {
                                        addHistory(person.id, historyInput.trim(), false)
                                        setHistoryInput('')
                                    }
                                }}
                                sx={{ '& .MuiInputBase-input': { fontSize: '0.8rem', py: 0.75 }, '& .MuiOutlinedInput-notchedOutline': { borderColor: 'divider' } }}
                            />
                            <Button
                                size="small"
                                variant="outlined"
                                disabled={!historyInput.trim()}
                                onClick={() => {
                                    if (historyInput.trim()) {
                                        addHistory(person.id, historyInput.trim(), false)
                                        setHistoryInput('')
                                    }
                                }}
                                sx={{ textTransform: 'none', fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                            >
                                Добавить
                            </Button>
                        </Box>
                        {historyEntries.length === 0 ? (
                            <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>Пока нет записей.</Typography>
                        ) : (
                            <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
                                {historyEntries.map((entry, i) => (
                                    <Box key={i} sx={{ display: 'flex', gap: 1, mb: 0.5, alignItems: 'baseline' }}>
                                        <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary', whiteSpace: 'nowrap', fontFamily: 'monospace' }}>
                                            {entry.date}
                                        </Typography>
                                        <Typography sx={{ fontSize: '0.75rem', color: entry.auto ? '#8b949e' : 'text.primary' }}>
                                            {entry.text}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Box>
                </DialogContent>
            </Dialog>
        )
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
                <Tab icon={<BarChartRoundedIcon sx={{ fontSize: '1rem' }} />} iconPosition="start" label="Dashboard" />
            </Tabs>

            {tab === 0 && (
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                        <TextField size="small" placeholder="Поиск..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                            InputProps={{ startAdornment: <InputAdornment position="start"><SearchRoundedIcon sx={{ fontSize: '0.9rem', color: 'text.secondary' }} /></InputAdornment> }}
                            sx={{ width: 160, '& .MuiInputBase-input': { fontSize: '0.8rem', py: 0.5 }, '& .MuiOutlinedInput-notchedOutline': { borderColor: searchQuery ? 'primary.main' : 'divider' } }}
                        />
                        <FilterSelect label="Страна" value={filters.country || ''} options={uniqueVals(local.people, 'country')} onChange={v => setFilter('country', v)} />
                        <FilterSelect label="ICP" value={filters.icpSegment || ''} options={Object.keys(ICP_LABELS)} onChange={v => setFilter('icpSegment', v)} />
                        <FilterSelect label="Priority" value={filters.priority || ''} options={['A', 'B', 'C']} onChange={v => setFilter('priority', v)} />
                        <FilterSelect label="Activity" value={filters.activityLevel || ''} options={['high', 'medium', 'low']} onChange={v => setFilter('activityLevel', v)} />
                        <FilterSelect label="Статус" value={filters.status || ''} options={uniqueVals(local.people, 'status')} onChange={v => setFilter('status', v)} />
                        <FilterSelect label="Источник" value={filters.source || ''} options={uniqueVals(local.people, 'source')} onChange={v => setFilter('source', v)} />
                        {Object.keys(filters).length > 0 && (
                            <IconButton size="small" onClick={clearFilters} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }} title="Сбросить все фильтры">
                                <FilterAltOffRoundedIcon sx={{ fontSize: '1rem' }} />
                            </IconButton>
                        )}
                        <Box sx={{ flex: 1 }} />
                        {selectedPeopleIds.size > 0 && (
                            <Button size="small" variant="contained" onClick={() => {
                                const people = local.people.filter(p => selectedPeopleIds.has(p.id) && !isInShortlist(p))
                                if (people.length > 0) addPeopleToOutreach(people)
                                setSelectedPeopleIds(new Set())
                            }} sx={{ textTransform: 'none', fontSize: '0.8rem', mr: 0.5 }}>
                                В Outreach ({selectedPeopleIds.size})
                            </Button>
                        )}
                        <Button size="small" startIcon={<AddRoundedIcon />} onClick={addPerson} variant="outlined" sx={{ textTransform: 'none', fontSize: '0.8rem' }}>
                            Добавить
                        </Button>
                    </Box>
                    <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#ffffff06' }}>
                                    <TableCell sx={{ ...headCellSx, width: 36, px: 0.5 }}>
                                        <Checkbox size="small" sx={{ p: 0.25 }}
                                            checked={sorted(filtered(local.people)).length > 0 && sorted(filtered(local.people)).every(p => selectedPeopleIds.has(p.id))}
                                            indeterminate={sorted(filtered(local.people)).some(p => selectedPeopleIds.has(p.id)) && !sorted(filtered(local.people)).every(p => selectedPeopleIds.has(p.id))}
                                            onChange={(_, checked) => {
                                                const visible = sorted(filtered(local.people)).map(p => p.id)
                                                setSelectedPeopleIds(checked ? new Set(visible) : new Set())
                                            }}
                                        />
                                    </TableCell>
                                    <SortHeader label="Имя" field="name" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                    <TableCell sx={headCellSx}>LinkedIn</TableCell>
                                    <SortHeader label="Страна" field="country" activeField={sortKey} direction={sortDir} onSort={toggleSort}>
                                        <IconButton size="small" onClick={(e) => { e.stopPropagation(); setCountriesDialogOpen(true) }} sx={{ color: 'text.secondary', p: 0 }}>
                                            <EditRoundedIcon sx={{ fontSize: '0.7rem' }} />
                                        </IconButton>
                                    </SortHeader>
                                    <SortHeader label="ICP" field="icpSegment" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                    <SortHeader label="Priority" field="priority" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                    <SortHeader label="Activity" field="activityLevel" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                    <SortHeader label="Источник" field="source" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                    <SortHeader label="Статус" field="status" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                    <TableCell sx={headCellSx}>Заметки</TableCell>
                                    <TableCell sx={{ ...headCellSx, width: 40 }} />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {local.people.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={11} sx={{ ...cellSx, textAlign: 'center', color: 'text.secondary', py: 4 }}>
                                            Пока пусто. Нажми "Добавить" чтобы внести первый контакт.
                                        </TableCell>
                                    </TableRow>
                                )}
                                {sorted(searched(filtered(local.people))).map((p) => (
                                    <TableRow key={p.id} sx={{ '&:hover': { backgroundColor: '#ffffff04' }, backgroundColor: isInShortlist(p) ? '#3fb68e08' : undefined }}>
                                        <TableCell sx={{ ...cellSx, px: 0.5, width: 36 }}>
                                            <Checkbox size="small" sx={{ p: 0.25 }} checked={selectedPeopleIds.has(p.id)} onChange={(_, checked) => {
                                                setSelectedPeopleIds(prev => { const n = new Set(prev); checked ? n.add(p.id) : n.delete(p.id); return n })
                                            }} />
                                        </TableCell>
                                        <TableCell sx={cellSx}><InlineInput value={p.name} onChange={v => updatePerson(p.id, { name: v })} placeholder="Имя" /></TableCell>
                                        <TableCell sx={cellSx}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                                                <InlineInput value={p.linkedinUrl} onChange={v => updatePerson(p.id, { linkedinUrl: v })} placeholder="URL" />
                                                {p.linkedinUrl && (
                                                    <IconButton size="small" onClick={() => window.open(p.linkedinUrl.startsWith('http') ? p.linkedinUrl : `https://${p.linkedinUrl}`, '_blank')} sx={{ color: 'primary.main', p: 0.25 }}>
                                                        <OpenInNewRoundedIcon sx={{ fontSize: '0.85rem' }} />
                                                    </IconButton>
                                                )}
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={cellSx}>
                                            <Select size="small" value={p.country || ''} onChange={e => updatePerson(p.id, { country: e.target.value })} sx={selectSx} displayEmpty>
                                                <MenuItem value="" sx={{ fontSize: '0.8rem', color: '#8b949e' }}>{'\u2014'}</MenuItem>
                                                {countries.map(c => <MenuItem key={c} value={c} sx={{ fontSize: '0.8rem' }}>{c}</MenuItem>)}
                                            </Select>
                                        </TableCell>
                                        <TableCell sx={cellSx}>
                                            <Select size="small" value={p.icpSegment} onChange={e => updatePerson(p.id, { icpSegment: e.target.value as IcpSegment })} sx={selectSx}>
                                                {Object.entries(ICP_LABELS).map(([k, v]) => <MenuItem key={k} value={k} sx={{ fontSize: '0.8rem' }}>{v}</MenuItem>)}
                                            </Select>
                                        </TableCell>
                                        <TableCell sx={cellSx}>
                                            <Select size="small" value={p.priority} onChange={e => updatePerson(p.id, { priority: e.target.value as IcpPriority })} sx={selectSx}>
                                                {(['A', 'B', 'C'] as IcpPriority[]).map(v => (
                                                    <MenuItem key={v} value={v} sx={{ fontSize: '0.8rem', fontWeight: 700, color: v === 'A' ? '#3fb68e' : v === 'B' ? '#d29922' : '#8b949e' }}>{v}</MenuItem>
                                                ))}
                                            </Select>
                                        </TableCell>
                                        <TableCell sx={cellSx}>
                                            <Select size="small" value={p.activityLevel} onChange={e => updatePerson(p.id, { activityLevel: e.target.value as 'high' | 'medium' | 'low' })} sx={selectSx}>
                                                <MenuItem value="high" sx={{ fontSize: '0.8rem' }}>High</MenuItem>
                                                <MenuItem value="medium" sx={{ fontSize: '0.8rem' }}>Medium</MenuItem>
                                                <MenuItem value="low" sx={{ fontSize: '0.8rem' }}>Low</MenuItem>
                                            </Select>
                                        </TableCell>
                                        <TableCell sx={cellSx}><InlineInput value={p.source} onChange={v => updatePerson(p.id, { source: v })} placeholder="Группа, поиск..." /></TableCell>
                                        <TableCell sx={cellSx}>
                                            <Select
                                                size="small"
                                                value={p.status}
                                                onChange={e => updatePerson(p.id, { status: e.target.value as PersonStatus })}
                                                sx={selectSx}
                                                renderValue={(val) => <StatusChip {...PERSON_STATUS_LABELS[val as PersonStatus]} />}
                                            >
                                                {Object.entries(PERSON_STATUS_LABELS).map(([k, v]) => (
                                                    <MenuItem key={k} value={k} sx={{ fontSize: '0.8rem' }}><StatusChip {...v} /></MenuItem>
                                                ))}
                                            </Select>
                                        </TableCell>
                                        <TableCell sx={cellSx}><InlineInput value={p.notes} onChange={v => updatePerson(p.id, { notes: v })} placeholder="..." /></TableCell>
                                        <TableCell sx={cellSx}>
                                            <Box sx={{ display: 'flex', gap: 0.25 }}>
                                                <IconButton size="small" onClick={() => togglePersonShortlist(p)} sx={{ color: isInShortlist(p) ? 'warning.main' : 'text.secondary', '&:hover': { color: 'warning.main' } }} title="В Outreach">
                                                    <StarRoundedIcon sx={{ fontSize: '0.9rem' }} />
                                                </IconButton>
                                                <IconButton size="small" onClick={() => setDeleteConfirm({ id: p.id, name: p.name || 'без имени', type: 'person' })} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}>
                                                    <DeleteRoundedIcon sx={{ fontSize: '0.9rem' }} />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}

            {tab === 1 && (
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                        <FilterSelect label="Платформа" value={filters.platform || ''} options={uniqueVals(local.groups, 'platform')} onChange={v => setFilter('platform', v)} />
                        <FilterSelect label="Аккаунт" value={filters.account || ''} options={['Кира', 'Настя']} onChange={v => setFilter('account', v)} />
                        <FilterSelect label="Статус" value={filters.status || ''} options={['pending', 'approved', 'rejected']} onChange={v => setFilter('status', v)} />
                        {Object.keys(filters).length > 0 && (
                            <IconButton size="small" onClick={clearFilters} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }} title="Сбросить все фильтры">
                                <FilterAltOffRoundedIcon sx={{ fontSize: '1rem' }} />
                            </IconButton>
                        )}
                        <Box sx={{ flex: 1 }} />
                        <Button size="small" startIcon={<AddRoundedIcon />} onClick={addGroup} variant="outlined" sx={{ textTransform: 'none', fontSize: '0.8rem' }}>
                            Добавить
                        </Button>
                    </Box>
                    <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#ffffff06' }}>
                                    <SortHeader label="#" field="priority" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                    <SortHeader label="Название" field="name" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                    <TableCell sx={headCellSx}>Ссылка</TableCell>
                                    <SortHeader label="Платформа" field="platform" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                    <TableCell sx={headCellSx}>Участников</TableCell>
                                    <SortHeader label="Аккаунт" field="account" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                    <SortHeader label="Статус" field="status" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                    <TableCell sx={headCellSx}>Активные (5)</TableCell>
                                    <TableCell sx={headCellSx}>Заметки</TableCell>
                                    <TableCell sx={{ ...headCellSx, width: 40 }} />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {local.groups.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={10} sx={{ ...cellSx, textAlign: 'center', color: 'text.secondary', py: 4 }}>
                                            Пока пусто. Нажми "Добавить" чтобы внести группу.
                                        </TableCell>
                                    </TableRow>
                                )}
                                {sorted(filtered(local.groups)).map((g) => (
                                    <TableRow key={g.id} sx={{ '&:hover': { backgroundColor: '#ffffff04' } }}>
                                        <TableCell sx={{ ...cellSx, width: 50 }}>
                                            <TextField size="small" type="number" variant="outlined" value={g.priority || 0} onChange={e => updateGroup(g.id, { priority: parseInt(e.target.value) || 0 })} sx={{ ...inputSx, width: 45, '& .MuiInputBase-input': { fontSize: '0.8rem', py: 0.25, px: 0.5, textAlign: 'center' } }} inputProps={{ min: 0, max: 99 }} />
                                        </TableCell>
                                        <TableCell sx={cellSx}><InlineInput value={g.name} onChange={v => updateGroup(g.id, { name: v })} placeholder="SEO Professionals" /></TableCell>
                                        <TableCell sx={cellSx}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                                                <TextField size="small" fullWidth variant="outlined" value={g.url || ''} onChange={e => updateGroup(g.id, { url: e.target.value })} placeholder="URL" sx={{ ...inputSx, '& .MuiInputBase-input': { fontSize: '0.7rem', py: 0.25, px: 0.5 } }} />
                                                {(g.url || '') && (
                                                    <IconButton size="small" onClick={() => window.open(g.url.startsWith('http') ? g.url : `https://${g.url}`, '_blank')} sx={{ color: 'primary.main', p: 0.25 }}>
                                                        <OpenInNewRoundedIcon sx={{ fontSize: '0.85rem' }} />
                                                    </IconButton>
                                                )}
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={cellSx}>
                                            <Select size="small" value={g.platform} onChange={e => updateGroup(g.id, { platform: e.target.value })} sx={selectSx}>
                                                <MenuItem value="LinkedIn" sx={{ fontSize: '0.8rem' }}>LinkedIn</MenuItem>
                                                <MenuItem value="Facebook" sx={{ fontSize: '0.8rem' }}>Facebook</MenuItem>
                                                <MenuItem value="Slack" sx={{ fontSize: '0.8rem' }}>Slack</MenuItem>
                                                <MenuItem value="Discord" sx={{ fontSize: '0.8rem' }}>Discord</MenuItem>
                                                <MenuItem value="Reddit" sx={{ fontSize: '0.8rem' }}>Reddit</MenuItem>
                                                <MenuItem value="Other" sx={{ fontSize: '0.8rem' }}>Other</MenuItem>
                                            </Select>
                                        </TableCell>
                                        <TableCell sx={cellSx}><InlineInput value={g.members} onChange={v => updateGroup(g.id, { members: v })} placeholder="10k" /></TableCell>
                                        <TableCell sx={cellSx}>
                                            <Select size="small" value={g.account} onChange={e => updateGroup(g.id, { account: e.target.value as AccountName })} sx={selectSx}>
                                                <MenuItem value="Кира" sx={{ fontSize: '0.8rem' }}>Кира</MenuItem>
                                                <MenuItem value="Настя" sx={{ fontSize: '0.8rem' }}>Настя</MenuItem>
                                            </Select>
                                        </TableCell>
                                        <TableCell sx={cellSx}>
                                            <Select
                                                size="small"
                                                value={g.status}
                                                onChange={e => updateGroup(g.id, { status: e.target.value as GroupStatus })}
                                                sx={selectSx}
                                                renderValue={(val) => <StatusChip {...GROUP_STATUS_LABELS[val as GroupStatus]} />}
                                            >
                                                {Object.entries(GROUP_STATUS_LABELS).map(([k, v]) => (
                                                    <MenuItem key={k} value={k} sx={{ fontSize: '0.8rem' }}><StatusChip {...v} /></MenuItem>
                                                ))}
                                            </Select>
                                        </TableCell>
                                        <TableCell sx={cellSx}>
                                            <TextField
                                                size="small"
                                                fullWidth
                                                variant="outlined"
                                                value={(g.activeMembers || []).filter(Boolean).join(', ')}
                                                onChange={(e) => {
                                                    const parts = e.target.value.split(',').map(s => s.trim()).slice(0, 5)
                                                    const arr = [...parts, ...Array(5 - parts.length).fill('')]
                                                    updateGroup(g.id, { activeMembers: arr.slice(0, 5) })
                                                }}
                                                placeholder="Имя1, Имя2, ..."
                                                sx={{ ...inputSx, '& .MuiInputBase-input': { fontSize: '0.75rem', py: 0.25, px: 0.5 } }}
                                            />
                                        </TableCell>
                                        <TableCell sx={cellSx}><InlineInput value={g.notes} onChange={v => updateGroup(g.id, { notes: v })} placeholder="..." /></TableCell>
                                        <TableCell sx={cellSx}>
                                            <IconButton size="small" onClick={() => setDeleteConfirm({ id: g.id, name: g.name || 'без названия', type: 'group' })} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}>
                                                <DeleteRoundedIcon sx={{ fontSize: '0.9rem' }} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
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
                                        <SortHeader label="Запрос" field="connectionStatus" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                        <SortHeader label="DM" field="dmStatus" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                        <TableCell sx={headCellSx}>Next</TableCell>
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
                                                    <StatusChip {...CONNECTION_STATUS_LABELS[s.connectionStatus || 'not_sent']} />
                                                </TableCell>
                                                <TableCell sx={cellSx}>
                                                    <StatusChip {...DM_STATUS_LABELS[s.dmStatus || 'not_sent']} />
                                                </TableCell>
                                                <TableCell sx={cellSx}>
                                                    <StatusChip label={nextAction.label} color={nextAction.color} />
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
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                        <FilterSelect label="Сегмент" value={filters.segment || ''} options={Object.keys(ICP_LABELS)} onChange={v => setFilter('segment', v)} />
                        <FilterSelect label="Статус" value={filters.status || ''} options={['research', 'contacted', 'in_talks', 'partner', 'declined']} onChange={v => setFilter('status', v)} />
                        {Object.keys(filters).length > 0 && (
                            <IconButton size="small" onClick={clearFilters} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }} title="Сбросить все фильтры">
                                <FilterAltOffRoundedIcon sx={{ fontSize: '1rem' }} />
                            </IconButton>
                        )}
                        <Box sx={{ flex: 1 }} />
                        <Button size="small" startIcon={<AddRoundedIcon />} onClick={addCompany} variant="outlined" sx={{ textTransform: 'none', fontSize: '0.8rem' }}>
                            Добавить
                        </Button>
                    </Box>
                    <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#ffffff06' }}>
                                    <SortHeader label="Название" field="name" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                    <TableCell sx={headCellSx}>Сайт</TableCell>
                                    <SortHeader label="Сегмент" field="segment" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                    <TableCell sx={headCellSx}>Размер</TableCell>
                                    <SortHeader label="Контакт" field="contactPerson" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                    <SortHeader label="Статус" field="status" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                    <TableCell sx={headCellSx}>Заметки</TableCell>
                                    <TableCell sx={{ ...headCellSx, width: 40 }} />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {local.companies.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={8} sx={{ ...cellSx, textAlign: 'center', color: 'text.secondary', py: 4 }}>
                                            Пока пусто. Нажми "Добавить" чтобы внести компанию.
                                        </TableCell>
                                    </TableRow>
                                )}
                                {sorted(filtered(local.companies)).map((c) => (
                                    <TableRow key={c.id} sx={{ '&:hover': { backgroundColor: '#ffffff04' } }}>
                                        <TableCell sx={cellSx}><InlineInput value={c.name} onChange={v => updateCompany(c.id, { name: v })} placeholder="Agency X" /></TableCell>
                                        <TableCell sx={cellSx}><InlineInput value={c.website} onChange={v => updateCompany(c.id, { website: v })} placeholder="https://..." /></TableCell>
                                        <TableCell sx={cellSx}>
                                            <Select size="small" value={c.segment} onChange={e => updateCompany(c.id, { segment: e.target.value as IcpSegment })} sx={selectSx}>
                                                {Object.entries(ICP_LABELS).map(([k, v]) => <MenuItem key={k} value={k} sx={{ fontSize: '0.8rem' }}>{v}</MenuItem>)}
                                            </Select>
                                        </TableCell>
                                        <TableCell sx={cellSx}><InlineInput value={c.size} onChange={v => updateCompany(c.id, { size: v })} placeholder="3-15" /></TableCell>
                                        <TableCell sx={cellSx}><InlineInput value={c.contactPerson} onChange={v => updateCompany(c.id, { contactPerson: v })} placeholder="Имя" /></TableCell>
                                        <TableCell sx={cellSx}>
                                            <Select
                                                size="small"
                                                value={c.status}
                                                onChange={e => updateCompany(c.id, { status: e.target.value as CompanyStatus })}
                                                sx={selectSx}
                                                renderValue={(val) => <StatusChip {...COMPANY_STATUS_LABELS[val as CompanyStatus]} />}
                                            >
                                                {Object.entries(COMPANY_STATUS_LABELS).map(([k, v]) => (
                                                    <MenuItem key={k} value={k} sx={{ fontSize: '0.8rem' }}><StatusChip {...v} /></MenuItem>
                                                ))}
                                            </Select>
                                        </TableCell>
                                        <TableCell sx={cellSx}><InlineInput value={c.notes} onChange={v => updateCompany(c.id, { notes: v })} placeholder="..." /></TableCell>
                                        <TableCell sx={cellSx}>
                                            <IconButton size="small" onClick={() => setDeleteConfirm({ id: c.id, name: c.name || 'без названия', type: 'company' })} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}>
                                                <DeleteRoundedIcon sx={{ fontSize: '0.9rem' }} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}

            {tab === 4 && (() => {
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
                            <Box sx={statBox}><Typography sx={{ ...statNum, color: '#3fb68e' }}>{addedThisWeek}</Typography><Typography sx={statLabel}>{'Настя: добавлено за неделю'}</Typography></Box>
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

            {modalPersonId && renderContactModal()}

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
