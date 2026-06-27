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
import ListItemText from '@mui/material/ListItemText'
import Badge from '@mui/material/Badge'
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
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
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
    ShortlistAction
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
    dm_sent: { label: 'DM sent', color: '#d29922' },
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
    send_cr: 'Отправить CR',
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

function getNextAction(s: ShortlistPerson): { label: string, color: string } {
    if (s.status === 'demo' || s.status === 'beta' || s.status === 'client') return { label: '\u2713', color: '#3fb68e' }
    if (s.status === 'declined') return { label: '\u2717', color: '#f85149' }
    if (s.connectionStatus === 'not_sent') return { label: '\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C CR', color: '#6c8eff' }
    if (s.connectionStatus === 'sent') return { label: '\u0416\u0434\u0451\u043C CR', color: '#d29922' }
    if (s.connectionStatus === 'declined') return { label: 'CR \u043E\u0442\u043A\u043B\u043E\u043D\u0451\u043D', color: '#f85149' }
    if (s.connectionStatus === 'accepted' && (s.dmStatus === 'not_sent')) return { label: '\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C DM', color: '#a371f7' }
    if (s.dmStatus === 'sent') return { label: '\u0416\u0434\u0451\u043C DM', color: '#d29922' }
    if (s.dmStatus === 'no_reply') return { label: 'Follow up', color: '#f85149' }
    if (s.dmStatus === 'replied') return { label: '\u041D\u0430\u0437\u043D\u0430\u0447\u0438\u0442\u044C demo', color: '#3fb68e' }
    return { label: '--', color: '#8b949e' }
}

function isWithinLastWeek(dateStr?: string): boolean {
    if (!dateStr) return false
    const d = new Date(dateStr)
    const now = new Date()
    const diff = now.getTime() - d.getTime()
    return diff >= 0 && diff <= 7 * 24 * 60 * 60 * 1000
}

const DEFAULT_COUNTRIES = ['US', 'UK', 'Israel', '\u041A\u0430\u043D\u0430\u0434\u0430', '\u0410\u0432\u0441\u0442\u0440\u0430\u043B\u0438\u044F', '\u0413\u0435\u0440\u043C\u0430\u043D\u0438\u044F', '\u0418\u043D\u0434\u0438\u044F', '\u041D\u0438\u0434\u0435\u0440\u043B\u0430\u043D\u0434\u044B']

export default function SourcesView({ sources, onSaveSources }: SourcesViewProps) {
    const [tab, setTab] = React.useState(0)
    const [local, setLocal] = React.useState({ people: sources.people || [], groups: sources.groups || [], companies: sources.companies || [], shortlist: sources.shortlist || [], countries: sources.countries || [] })
    const saveTimerRef = React.useRef<ReturnType<typeof setTimeout>>()
    const [countriesDialogOpen, setCountriesDialogOpen] = React.useState(false)
    const [newCountry, setNewCountry] = React.useState('')
    const [deleteConfirm, setDeleteConfirm] = React.useState<{ id: string, name: string, type: 'person' | 'group' | 'company' | 'shortlist' } | null>(null)
    const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())
    const [needsActionFilter, setNeedsActionFilter] = React.useState(false)
    const [copiedId, setCopiedId] = React.useState<string | null>(null)

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

    // Reset sort, filters, selection, and needsAction filter when switching tabs
    React.useEffect(() => { setSortKey(''); setSortDir('asc'); setFilters({}); setSelectedIds(new Set()); setNeedsActionFilter(false) }, [tab])

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
        const next = { ...local, people: local.people.map(p => p.id === id ? { ...p, ...patch } : p) }
        save(next)
    }
    const deletePerson = (id: string) => {
        const next = { ...local, people: local.people.filter(p => p.id !== id) }
        save(next)
    }

    // --- Groups ---
    const addGroup = () => {
        const next = { ...local, groups: [{ id: generateId(), name: '', url: '', platform: 'LinkedIn', members: '', account: '\u041A\u0438\u0440\u0430' as AccountName, status: 'pending' as GroupStatus, priority: 0, activeMembers: ['', '', '', '', ''], notes: '' }, ...local.groups] }
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
            const next = { ...local, shortlist: [...local.shortlist, { id: generateId(), batch: nextBatch, name: person.name, linkedinUrl: person.linkedinUrl, priority: person.priority, dmStatus: 'not_sent' as DmStatus, connectionStatus: 'not_sent' as ConnectionStatus, source: person.source, status: person.status, notes: person.notes, actions: [] as ShortlistAction[], country: person.country, icpSegment: person.icpSegment, createdAt: new Date().toISOString() }] }
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

    // Bulk actions for Outreach
    const bulkUpdate = (patch: Partial<ShortlistPerson>) => {
        const next = { ...local, shortlist: local.shortlist.map(s => selectedIds.has(s.id) ? { ...s, ...patch } : s) }
        save(next)
        setSelectedIds(new Set())
    }

    // Needs action filter logic
    const needsAction = (s: ShortlistPerson) =>
        s.connectionStatus === 'not_sent' ||
        (s.connectionStatus === 'accepted' && s.dmStatus === 'not_sent') ||
        s.dmStatus === 'no_reply'

    // Filtered shortlist for display
    const displayShortlist = React.useMemo(() => {
        if (!needsActionFilter) return local.shortlist
        return local.shortlist.filter(needsAction)
    }, [local.shortlist, needsActionFilter])

    const displayShortlistByBatch = React.useMemo(() => {
        const map: Record<string, ShortlistPerson[]> = {}
        for (const s of displayShortlist) {
            const b = s.batch || '1'
            if (!map[b]) map[b] = []
            map[b].push(s)
        }
        return Object.entries(map).sort(([a], [b]) => (parseInt(a) || 0) - (parseInt(b) || 0))
    }, [displayShortlist])

    // All visible IDs for select-all checkbox
    const allVisibleIds = React.useMemo(() => displayShortlist.map(s => s.id), [displayShortlist])
    const allSelected = allVisibleIds.length > 0 && allVisibleIds.every(id => selectedIds.has(id))
    const someSelected = allVisibleIds.some(id => selectedIds.has(id))

    // Copy CR template
    const copyCrTemplate = (s: ShortlistPerson) => {
        const firstName = s.name.split(' ')[0] || s.name
        const notesPart = s.notes ? ` ${s.notes}.` : ''
        const template = `Hi ${firstName},${notesPart} I'm building KORU \u2014 an SEO platform that audits for both Google and AI search engines. GEO score, AI brand visibility, intent-first keywords. Would love to connect.`
        navigator.clipboard.writeText(template)
        setCopiedId(s.id)
        setTimeout(() => setCopiedId(null), 1500)
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
                        ? <Badge badgeContent={newPeopleCount} color="primary" sx={{ '& .MuiBadge-badge': { fontSize: '0.65rem', height: 16, minWidth: 16 } }}>{`\u041B\u044E\u0434\u0438 (${local.people.length})`}</Badge>
                        : `\u041B\u044E\u0434\u0438 (${local.people.length})`
                } />
                <Tab icon={<GroupsRoundedIcon sx={{ fontSize: '1rem' }} />} iconPosition="start" label={`\u0413\u0440\u0443\u043F\u043F\u044B (${local.groups.length})`} />
                <Tab icon={<BusinessRoundedIcon sx={{ fontSize: '1rem' }} />} iconPosition="start" label={`\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u0438 (${local.companies.length})`} />
                <Tab icon={<TrendingUpRoundedIcon sx={{ fontSize: '1rem' }} />} iconPosition="start" label={`Outreach (${local.shortlist.length})`} />
                <Tab icon={<BarChartRoundedIcon sx={{ fontSize: '1rem' }} />} iconPosition="start" label="Dashboard" />
            </Tabs>

            {tab === 0 && (
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                        <FilterSelect label="\u0421\u0442\u0440\u0430\u043D\u0430" value={filters.country || ''} options={uniqueVals(local.people, 'country')} onChange={v => setFilter('country', v)} />
                        <FilterSelect label="ICP" value={filters.icpSegment || ''} options={Object.keys(ICP_LABELS)} onChange={v => setFilter('icpSegment', v)} />
                        <FilterSelect label="Priority" value={filters.priority || ''} options={['A', 'B', 'C']} onChange={v => setFilter('priority', v)} />
                        <FilterSelect label="Activity" value={filters.activityLevel || ''} options={['high', 'medium', 'low']} onChange={v => setFilter('activityLevel', v)} />
                        <FilterSelect label="\u0421\u0442\u0430\u0442\u0443\u0441" value={filters.status || ''} options={uniqueVals(local.people, 'status')} onChange={v => setFilter('status', v)} />
                        <FilterSelect label="\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A" value={filters.source || ''} options={uniqueVals(local.people, 'source')} onChange={v => setFilter('source', v)} />
                        {Object.keys(filters).length > 0 && (
                            <IconButton size="small" onClick={clearFilters} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }} title="\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0432\u0441\u0435 \u0444\u0438\u043B\u044C\u0442\u0440\u044B">
                                <FilterAltOffRoundedIcon sx={{ fontSize: '1rem' }} />
                            </IconButton>
                        )}
                        <Box sx={{ flex: 1 }} />
                        <Button size="small" startIcon={<AddRoundedIcon />} onClick={addPerson} variant="outlined" sx={{ textTransform: 'none', fontSize: '0.8rem' }}>
                            Добавить
                        </Button>
                    </Box>
                    <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#ffffff06' }}>
                                    <SortHeader label="\u0418\u043C\u044F" field="name" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                    <TableCell sx={headCellSx}>LinkedIn</TableCell>
                                    <SortHeader label="\u0421\u0442\u0440\u0430\u043D\u0430" field="country" activeField={sortKey} direction={sortDir} onSort={toggleSort}>
                                        <IconButton size="small" onClick={(e) => { e.stopPropagation(); setCountriesDialogOpen(true) }} sx={{ color: 'text.secondary', p: 0 }}>
                                            <EditRoundedIcon sx={{ fontSize: '0.7rem' }} />
                                        </IconButton>
                                    </SortHeader>
                                    <SortHeader label="ICP" field="icpSegment" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                    <SortHeader label="Priority" field="priority" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                    <SortHeader label="Activity" field="activityLevel" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                    <SortHeader label="\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A" field="source" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                    <SortHeader label="\u0421\u0442\u0430\u0442\u0443\u0441" field="status" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                    <TableCell sx={headCellSx}>\u0417\u0430\u043C\u0435\u0442\u043A\u0438</TableCell>
                                    <TableCell sx={{ ...headCellSx, width: 40 }} />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {local.people.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={10} sx={{ ...cellSx, textAlign: 'center', color: 'text.secondary', py: 4 }}>
                                            Пока пусто. Нажми "Добавить" чтобы внести первый контакт.
                                        </TableCell>
                                    </TableRow>
                                )}
                                {sorted(filtered(local.people)).map((p) => (
                                    <TableRow key={p.id} sx={{ '&:hover': { backgroundColor: '#ffffff04' } }}>
                                        <TableCell sx={cellSx}><InlineInput value={p.name} onChange={v => updatePerson(p.id, { name: v })} placeholder="\u0418\u043C\u044F" /></TableCell>
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
                                                <MenuItem value="" sx={{ fontSize: '0.8rem', color: '#8b949e' }}>\u2014</MenuItem>
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
                                        <TableCell sx={cellSx}><InlineInput value={p.source} onChange={v => updatePerson(p.id, { source: v })} placeholder="\u0413\u0440\u0443\u043F\u043F\u0430, \u043F\u043E\u0438\u0441\u043A..." /></TableCell>
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
                                                <IconButton size="small" onClick={() => togglePersonShortlist(p)} sx={{ color: isInShortlist(p) ? 'warning.main' : 'text.secondary', '&:hover': { color: 'warning.main' } }} title="\u0412 Outreach">
                                                    <StarRoundedIcon sx={{ fontSize: '0.9rem' }} />
                                                </IconButton>
                                                <IconButton size="small" onClick={() => setDeleteConfirm({ id: p.id, name: p.name || '\u0431\u0435\u0437 \u0438\u043C\u0435\u043D\u0438', type: 'person' })} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}>
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
                        <FilterSelect label="\u041F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430" value={filters.platform || ''} options={uniqueVals(local.groups, 'platform')} onChange={v => setFilter('platform', v)} />
                        <FilterSelect label="\u0410\u043A\u043A\u0430\u0443\u043D\u0442" value={filters.account || ''} options={['\u041A\u0438\u0440\u0430', '\u041D\u0430\u0441\u0442\u044F']} onChange={v => setFilter('account', v)} />
                        <FilterSelect label="\u0421\u0442\u0430\u0442\u0443\u0441" value={filters.status || ''} options={['pending', 'approved', 'rejected']} onChange={v => setFilter('status', v)} />
                        {Object.keys(filters).length > 0 && (
                            <IconButton size="small" onClick={clearFilters} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }} title="\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0432\u0441\u0435 \u0444\u0438\u043B\u044C\u0442\u0440\u044B">
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
                                    <SortHeader label="\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435" field="name" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                    <TableCell sx={headCellSx}>\u0421\u0441\u044B\u043B\u043A\u0430</TableCell>
                                    <SortHeader label="\u041F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430" field="platform" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                    <TableCell sx={headCellSx}>\u0423\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432</TableCell>
                                    <SortHeader label="\u0410\u043A\u043A\u0430\u0443\u043D\u0442" field="account" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                    <SortHeader label="\u0421\u0442\u0430\u0442\u0443\u0441" field="status" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                    <TableCell sx={headCellSx}>\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0435 (5)</TableCell>
                                    <TableCell sx={headCellSx}>\u0417\u0430\u043C\u0435\u0442\u043A\u0438</TableCell>
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
                                                <MenuItem value="\u041A\u0438\u0440\u0430" sx={{ fontSize: '0.8rem' }}>\u041A\u0438\u0440\u0430</MenuItem>
                                                <MenuItem value="\u041D\u0430\u0441\u0442\u044F" sx={{ fontSize: '0.8rem' }}>\u041D\u0430\u0441\u0442\u044F</MenuItem>
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
                                                placeholder="\u0418\u043C\u044F1, \u0418\u043C\u044F2, ..."
                                                sx={{ ...inputSx, '& .MuiInputBase-input': { fontSize: '0.75rem', py: 0.25, px: 0.5 } }}
                                            />
                                        </TableCell>
                                        <TableCell sx={cellSx}><InlineInput value={g.notes} onChange={v => updateGroup(g.id, { notes: v })} placeholder="..." /></TableCell>
                                        <TableCell sx={cellSx}>
                                            <IconButton size="small" onClick={() => setDeleteConfirm({ id: g.id, name: g.name || '\u0431\u0435\u0437 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044F', type: 'group' })} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}>
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
                        <Button
                            size="small"
                            variant={needsActionFilter ? 'contained' : 'outlined'}
                            onClick={() => setNeedsActionFilter(prev => !prev)}
                            sx={{ textTransform: 'none', fontSize: '0.75rem', height: 28 }}
                        >
                            Нужно действие
                        </Button>
                        {selectedIds.size > 0 && (
                            <>
                                <Button size="small" variant="outlined" onClick={() => bulkUpdate({ connectionStatus: 'sent' })} sx={{ textTransform: 'none', fontSize: '0.7rem', height: 26 }}>
                                    CR sent ({selectedIds.size})
                                </Button>
                                <Button size="small" variant="outlined" onClick={() => bulkUpdate({ connectionStatus: 'accepted' })} sx={{ textTransform: 'none', fontSize: '0.7rem', height: 26 }}>
                                    CR accepted ({selectedIds.size})
                                </Button>
                                <Button size="small" variant="outlined" onClick={() => bulkUpdate({ dmStatus: 'sent' })} sx={{ textTransform: 'none', fontSize: '0.7rem', height: 26 }}>
                                    DM sent ({selectedIds.size})
                                </Button>
                                <Button size="small" variant="outlined" onClick={() => bulkUpdate({ dmStatus: 'replied' })} sx={{ textTransform: 'none', fontSize: '0.7rem', height: 26 }}>
                                    DM replied ({selectedIds.size})
                                </Button>
                                <Button size="small" variant="outlined" onClick={() => setSelectedIds(new Set())} sx={{ textTransform: 'none', fontSize: '0.7rem', height: 26, color: 'text.secondary' }}>
                                    Снять выбор
                                </Button>
                            </>
                        )}
                        <Box sx={{ flex: 1 }} />
                        <Button size="small" startIcon={<AddRoundedIcon />} onClick={addShortlistPerson} variant="outlined" sx={{ textTransform: 'none', fontSize: '0.8rem' }}>
                            Добавить
                        </Button>
                    </Box>
                    {displayShortlist.length === 0 ? (
                        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, py: 4, textAlign: 'center' }}>
                            <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                                {needsActionFilter
                                    ? 'Нет людей, требующих действия.'
                                    : 'Пока пусто. Добавляй лучших людей \u2014 они автоматически группируются по 5.'}
                            </Typography>
                        </Box>
                    ) : (
                        displayShortlistByBatch.map(([batch, people]) => (
                            <Box key={batch} sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                    <Chip
                                        label={`\u0413\u0440\u0443\u043F\u043F\u0430 ${batch}`}
                                        size="small"
                                        sx={{ fontWeight: 700, fontSize: '0.75rem', backgroundColor: '#3fb68e22', color: '#3fb68e', border: '1px solid #3fb68e44' }}
                                    />
                                    <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                                        {people.length}/5
                                    </Typography>
                                </Box>
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
                                                <TableCell sx={{ ...headCellSx, width: 60 }}>Группа</TableCell>
                                                <TableCell sx={headCellSx}>Имя</TableCell>
                                                <TableCell sx={headCellSx}>LinkedIn</TableCell>
                                                <TableCell sx={headCellSx}>Priority</TableCell>
                                                <TableCell sx={headCellSx}>DM</TableCell>
                                                <TableCell sx={headCellSx}>Запрос</TableCell>
                                                <TableCell sx={headCellSx}>Источник</TableCell>
                                                <TableCell sx={headCellSx}>Статус</TableCell>
                                                <TableCell sx={headCellSx}>Действия</TableCell>
                                                <TableCell sx={headCellSx}>Next</TableCell>
                                                <TableCell sx={headCellSx}>Заметки</TableCell>
                                                <TableCell sx={{ ...headCellSx, width: 60 }} />
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {people.map((s) => {
                                                const nextAction = getNextAction(s)
                                                return (
                                                <TableRow key={s.id} sx={{ '&:hover': { backgroundColor: '#ffffff04' }, backgroundColor: selectedIds.has(s.id) ? '#6c8eff08' : undefined }}>
                                                    <TableCell sx={{ ...cellSx, px: 0.5 }}>
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
                                                    <TableCell sx={cellSx}>
                                                        <Select size="small" value={s.batch} onChange={e => updateShortlistPerson(s.id, { batch: e.target.value })} sx={{ ...selectSx, minWidth: 50 }}>
                                                            {Array.from({ length: 20 }, (_, i) => String(i + 1)).map(v => (
                                                                <MenuItem key={v} value={v} sx={{ fontSize: '0.8rem' }}>{v}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </TableCell>
                                                    <TableCell sx={cellSx}><InlineInput value={s.name} onChange={v => updateShortlistPerson(s.id, { name: v })} placeholder="\u0418\u043C\u044F" /></TableCell>
                                                    <TableCell sx={cellSx}><InlineInput value={s.linkedinUrl} onChange={v => updateShortlistPerson(s.id, { linkedinUrl: v })} placeholder="URL" /></TableCell>
                                                    <TableCell sx={cellSx}>
                                                        <Select size="small" value={s.priority || 'B'} onChange={e => updateShortlistPerson(s.id, { priority: e.target.value as IcpPriority })} sx={selectSx}>
                                                            {(['A', 'B', 'C'] as IcpPriority[]).map(v => (
                                                                <MenuItem key={v} value={v} sx={{ fontSize: '0.8rem', fontWeight: 700, color: v === 'A' ? '#3fb68e' : v === 'B' ? '#d29922' : '#8b949e' }}>{v}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </TableCell>
                                                    <TableCell sx={cellSx}>
                                                        <Select
                                                            size="small"
                                                            value={s.dmStatus || 'not_sent'}
                                                            onChange={e => updateShortlistPerson(s.id, { dmStatus: e.target.value as DmStatus })}
                                                            sx={selectSx}
                                                            renderValue={(val) => <StatusChip {...DM_STATUS_LABELS[val as DmStatus]} />}
                                                        >
                                                            {Object.entries(DM_STATUS_LABELS).map(([k, v]) => (
                                                                <MenuItem key={k} value={k} sx={{ fontSize: '0.8rem' }}><StatusChip {...v} /></MenuItem>
                                                            ))}
                                                        </Select>
                                                    </TableCell>
                                                    <TableCell sx={cellSx}>
                                                        <Select
                                                            size="small"
                                                            value={s.connectionStatus || 'not_sent'}
                                                            onChange={e => updateShortlistPerson(s.id, { connectionStatus: e.target.value as ConnectionStatus })}
                                                            sx={selectSx}
                                                            renderValue={(val) => <StatusChip {...CONNECTION_STATUS_LABELS[val as ConnectionStatus]} />}
                                                        >
                                                            {Object.entries(CONNECTION_STATUS_LABELS).map(([k, v]) => (
                                                                <MenuItem key={k} value={k} sx={{ fontSize: '0.8rem' }}><StatusChip {...v} /></MenuItem>
                                                            ))}
                                                        </Select>
                                                    </TableCell>
                                                    <TableCell sx={cellSx}><InlineInput value={s.source} onChange={v => updateShortlistPerson(s.id, { source: v })} placeholder="\u041E\u0442\u043A\u0443\u0434\u0430" /></TableCell>
                                                    <TableCell sx={cellSx}>
                                                        <Select
                                                            size="small"
                                                            value={s.status}
                                                            onChange={e => updateShortlistPerson(s.id, { status: e.target.value as PersonStatus })}
                                                            sx={selectSx}
                                                            renderValue={(val) => <StatusChip {...PERSON_STATUS_LABELS[val as PersonStatus]} />}
                                                        >
                                                            {Object.entries(PERSON_STATUS_LABELS).map(([k, v]) => (
                                                                <MenuItem key={k} value={k} sx={{ fontSize: '0.8rem' }}><StatusChip {...v} /></MenuItem>
                                                            ))}
                                                        </Select>
                                                    </TableCell>
                                                    <TableCell sx={cellSx}>
                                                        <Select
                                                            size="small"
                                                            multiple
                                                            value={s.actions || []}
                                                            onChange={e => updateShortlistPerson(s.id, { actions: e.target.value as ShortlistAction[] })}
                                                            sx={{ ...selectSx, minWidth: 130 }}
                                                            renderValue={(selected) => (selected as ShortlistAction[]).length === 0
                                                                ? <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>--</Typography>
                                                                : <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.3 }}>
                                                                    {(selected as ShortlistAction[]).map(a => (
                                                                        <Chip key={a} label={SHORTLIST_ACTION_LABELS[a]} size="small" sx={{ fontSize: '0.65rem', height: 18, backgroundColor: '#3fb68e22', color: '#3fb68e', border: '1px solid #3fb68e44' }} />
                                                                    ))}
                                                                </Box>
                                                            }
                                                        >
                                                            {(Object.entries(SHORTLIST_ACTION_LABELS) as [ShortlistAction, string][]).map(([key, label]) => (
                                                                <MenuItem key={key} value={key} sx={{ fontSize: '0.8rem', py: 0.25 }}>
                                                                    <Checkbox checked={(s.actions || []).includes(key)} size="small" sx={{ p: 0.25 }} />
                                                                    <ListItemText primary={label} primaryTypographyProps={{ fontSize: '0.8rem', ml: 0.5 }} />
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </TableCell>
                                                    <TableCell sx={cellSx}>
                                                        <StatusChip label={nextAction.label} color={nextAction.color} />
                                                    </TableCell>
                                                    <TableCell sx={cellSx}><InlineInput value={s.notes} onChange={v => updateShortlistPerson(s.id, { notes: v })} placeholder="..." /></TableCell>
                                                    <TableCell sx={cellSx}>
                                                        <Box sx={{ display: 'flex', gap: 0.25, alignItems: 'center' }}>
                                                            <IconButton size="small" onClick={() => copyCrTemplate(s)} sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }} title="Copy CR template">
                                                                <ContentCopyRoundedIcon sx={{ fontSize: '0.85rem' }} />
                                                            </IconButton>
                                                            {copiedId === s.id && <Typography sx={{ fontSize: '0.65rem', color: '#3fb68e', whiteSpace: 'nowrap' }}>Copied!</Typography>}
                                                            <IconButton size="small" onClick={() => setDeleteConfirm({ id: s.id, name: s.name || '\u0431\u0435\u0437 \u0438\u043C\u0435\u043D\u0438', type: 'shortlist' })} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}>
                                                                <DeleteRoundedIcon sx={{ fontSize: '0.9rem' }} />
                                                            </IconButton>
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        ))
                    )}
                </Box>
            )}

            {tab === 2 && (
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                        <FilterSelect label="\u0421\u0435\u0433\u043C\u0435\u043D\u0442" value={filters.segment || ''} options={Object.keys(ICP_LABELS)} onChange={v => setFilter('segment', v)} />
                        <FilterSelect label="\u0421\u0442\u0430\u0442\u0443\u0441" value={filters.status || ''} options={['research', 'contacted', 'in_talks', 'partner', 'declined']} onChange={v => setFilter('status', v)} />
                        {Object.keys(filters).length > 0 && (
                            <IconButton size="small" onClick={clearFilters} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }} title="\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0432\u0441\u0435 \u0444\u0438\u043B\u044C\u0442\u0440\u044B">
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
                                    <SortHeader label="\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435" field="name" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                    <TableCell sx={headCellSx}>\u0421\u0430\u0439\u0442</TableCell>
                                    <SortHeader label="\u0421\u0435\u0433\u043C\u0435\u043D\u0442" field="segment" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                    <TableCell sx={headCellSx}>\u0420\u0430\u0437\u043C\u0435\u0440</TableCell>
                                    <SortHeader label="\u041A\u043E\u043D\u0442\u0430\u043A\u0442" field="contactPerson" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                    <SortHeader label="\u0421\u0442\u0430\u0442\u0443\u0441" field="status" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                                    <TableCell sx={headCellSx}>\u0417\u0430\u043C\u0435\u0442\u043A\u0438</TableCell>
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
                                        <TableCell sx={cellSx}><InlineInput value={c.contactPerson} onChange={v => updateCompany(c.id, { contactPerson: v })} placeholder="\u0418\u043C\u044F" /></TableCell>
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
                                            <IconButton size="small" onClick={() => setDeleteConfirm({ id: c.id, name: c.name || '\u0431\u0435\u0437 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044F', type: 'company' })} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}>
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
                            <Box sx={statBox}><Typography sx={{ ...statNum, color: '#3fb68e' }}>{addedThisWeek}</Typography><Typography sx={statLabel}>{'\u041D\u0430\u0441\u0442\u044F: \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E \u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E'}</Typography></Box>
                        </Box>

                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 3 }}>
                            <Box sx={statBox}>
                                <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1.5 }}>Outreach Funnel</Typography>
                                {[
                                    { label: 'In Outreach', count: shortlistTotal, color: '#6c8eff' },
                                    { label: 'CR sent', count: crSent, color: '#d29922' },
                                    { label: `CR accepted${crSent + crAccepted + crDeclined > 0 ? ` (${Math.round((crAccepted / (crSent + crAccepted + crDeclined)) * 100)}%)` : ''}`, count: crAccepted, color: '#3fb68e' },
                                    { label: 'DM sent', count: dmSent, color: '#a371f7' },
                                    { label: `DM replied${dmSent + dmReplied + dmNoReply > 0 ? ` (${Math.round((dmReplied / (dmSent + dmReplied + dmNoReply)) * 100)}%)` : ''}`, count: dmReplied, color: '#3fb68e' },
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
                                <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, mb: 1.5 }}>Connection Requests (Outreach)</Typography>
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
        </Box>
    )
}
