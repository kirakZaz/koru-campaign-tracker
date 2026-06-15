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
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded'
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
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
    AccountName
} from './SourcesView.types'

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

const DEFAULT_COUNTRIES = ['US', 'UK', 'Israel', 'Канада', 'Австралия', 'Германия', 'Индия', 'Нидерланды']

export default function SourcesView({ sources, onSaveSources }: SourcesViewProps) {
    const [tab, setTab] = React.useState(0)
    const [local, setLocal] = React.useState({ people: sources.people || [], groups: sources.groups || [], companies: sources.companies || [], shortlist: sources.shortlist || [], countries: sources.countries || [] })
    const saveTimerRef = React.useRef<ReturnType<typeof setTimeout>>()
    const [countriesDialogOpen, setCountriesDialogOpen] = React.useState(false)
    const [newCountry, setNewCountry] = React.useState('')
    const [deleteConfirm, setDeleteConfirm] = React.useState<{ id: string, name: string, type: 'person' | 'group' | 'company' | 'shortlist' } | null>(null)

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
            const va = (a[sortKey] ?? '') as string
            const vb = (b[sortKey] ?? '') as string
            const cmp = String(va).localeCompare(String(vb), undefined, { sensitivity: 'base' })
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

    // Reset sort and filters when switching tabs
    React.useEffect(() => { setSortKey(''); setSortDir('asc'); setFilters({}) }, [tab])

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
        const next = { ...local, people: [...local.people, { id: generateId(), name: '', linkedinUrl: '', country: '', icpSegment: 'freelancer' as IcpSegment, priority: 'B' as IcpPriority, activityLevel: 'medium' as const, source: '', status: 'new' as PersonStatus, notes: '' }] }
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
        const next = { ...local, groups: [...local.groups, { id: generateId(), name: '', url: '', platform: 'LinkedIn', members: '', account: 'Кира' as AccountName, status: 'pending' as GroupStatus, activeMembers: ['', '', '', '', ''], notes: '' }] }
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
            const next = { ...local, shortlist: [...local.shortlist, { id: generateId(), batch: nextBatch, name: person.name, linkedinUrl: person.linkedinUrl, source: person.source, status: person.status, notes: person.notes }] }
            save(next)
        }
    }
    const addShortlistPerson = () => {
        const next = { ...local, shortlist: [...local.shortlist, { id: generateId(), batch: nextBatch, name: '', linkedinUrl: '', source: '', status: 'new' as PersonStatus, notes: '' }] }
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

    const shortlistByBatch = React.useMemo(() => {
        const map: Record<string, typeof local.shortlist> = {}
        for (const s of local.shortlist) {
            const b = s.batch || '1'
            if (!map[b]) map[b] = []
            map[b].push(s)
        }
        return Object.entries(map).sort(([a], [b]) => (parseInt(a) || 0) - (parseInt(b) || 0))
    }, [local.shortlist])

    // --- Companies ---
    const addCompany = () => {
        const next = { ...local, companies: [...local.companies, { id: generateId(), name: '', website: '', segment: 'small_agency' as IcpSegment, size: '', contactPerson: '', status: 'research' as CompanyStatus, notes: '' }] }
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
                <Tab icon={<PeopleRoundedIcon sx={{ fontSize: '1rem' }} />} iconPosition="start" label={`Люди (${local.people.length})`} />
                <Tab icon={<GroupsRoundedIcon sx={{ fontSize: '1rem' }} />} iconPosition="start" label={`Группы (${local.groups.length})`} />
                <Tab icon={<BusinessRoundedIcon sx={{ fontSize: '1rem' }} />} iconPosition="start" label={`Компании (${local.companies.length})`} />
                <Tab icon={<StarRoundedIcon sx={{ fontSize: '1rem' }} />} iconPosition="start" label={`Топ-5 (${local.shortlist.length})`} />
            </Tabs>

            {tab === 0 && (
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
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
                        <Button size="small" startIcon={<AddRoundedIcon />} onClick={addPerson} variant="outlined" sx={{ textTransform: 'none', fontSize: '0.8rem' }}>
                            Добавить
                        </Button>
                    </Box>
                    <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#ffffff06' }}>
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
                                        <TableCell colSpan={10} sx={{ ...cellSx, textAlign: 'center', color: 'text.secondary', py: 4 }}>
                                            Пока пусто. Нажми "Добавить" чтобы внести первый контакт.
                                        </TableCell>
                                    </TableRow>
                                )}
                                {sorted(filtered(local.people)).map((p) => (
                                    <TableRow key={p.id} sx={{ '&:hover': { backgroundColor: '#ffffff04' } }}>
                                        <TableCell sx={cellSx}><InlineInput value={p.name} onChange={v => updatePerson(p.id, { name: v })} placeholder="Имя" /></TableCell>
                                        <TableCell sx={cellSx}><InlineInput value={p.linkedinUrl} onChange={v => updatePerson(p.id, { linkedinUrl: v })} placeholder="URL" /></TableCell>
                                        <TableCell sx={cellSx}>
                                            <Select size="small" value={p.country || ''} onChange={e => updatePerson(p.id, { country: e.target.value })} sx={selectSx} displayEmpty>
                                                <MenuItem value="" sx={{ fontSize: '0.8rem', color: '#8b949e' }}>—</MenuItem>
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
                                                <IconButton size="small" onClick={() => togglePersonShortlist(p)} sx={{ color: isInShortlist(p) ? 'warning.main' : 'text.secondary', '&:hover': { color: 'warning.main' } }} title="В Топ-5">
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
                                        <TableCell colSpan={9} sx={{ ...cellSx, textAlign: 'center', color: 'text.secondary', py: 4 }}>
                                            Пока пусто. Нажми "Добавить" чтобы внести группу.
                                        </TableCell>
                                    </TableRow>
                                )}
                                {sorted(filtered(local.groups)).map((g) => (
                                    <TableRow key={g.id} sx={{ '&:hover': { backgroundColor: '#ffffff04' } }}>
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
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                        <Button size="small" startIcon={<AddRoundedIcon />} onClick={addShortlistPerson} variant="outlined" sx={{ textTransform: 'none', fontSize: '0.8rem' }}>
                            Добавить
                        </Button>
                    </Box>
                    {local.shortlist.length === 0 ? (
                        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, py: 4, textAlign: 'center' }}>
                            <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                                Пока пусто. Добавляй лучших людей — они автоматически группируются по 5.
                            </Typography>
                        </Box>
                    ) : (
                        shortlistByBatch.map(([batch, people]) => (
                            <Box key={batch} sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                    <Chip
                                        label={`Группа ${batch}`}
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
                                                <TableCell sx={{ ...headCellSx, width: 60 }}>Группа</TableCell>
                                                <TableCell sx={headCellSx}>Имя</TableCell>
                                                <TableCell sx={headCellSx}>LinkedIn</TableCell>
                                                <TableCell sx={headCellSx}>Источник</TableCell>
                                                <TableCell sx={headCellSx}>Статус</TableCell>
                                                <TableCell sx={headCellSx}>Заметки</TableCell>
                                                <TableCell sx={{ ...headCellSx, width: 40 }} />
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {people.map((s) => (
                                                <TableRow key={s.id} sx={{ '&:hover': { backgroundColor: '#ffffff04' } }}>
                                                    <TableCell sx={cellSx}>
                                                        <Select size="small" value={s.batch} onChange={e => updateShortlistPerson(s.id, { batch: e.target.value })} sx={{ ...selectSx, minWidth: 50 }}>
                                                            {Array.from({ length: 20 }, (_, i) => String(i + 1)).map(v => (
                                                                <MenuItem key={v} value={v} sx={{ fontSize: '0.8rem' }}>{v}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </TableCell>
                                                    <TableCell sx={cellSx}><InlineInput value={s.name} onChange={v => updateShortlistPerson(s.id, { name: v })} placeholder="Имя" /></TableCell>
                                                    <TableCell sx={cellSx}><InlineInput value={s.linkedinUrl} onChange={v => updateShortlistPerson(s.id, { linkedinUrl: v })} placeholder="URL" /></TableCell>
                                                    <TableCell sx={cellSx}><InlineInput value={s.source} onChange={v => updateShortlistPerson(s.id, { source: v })} placeholder="Откуда" /></TableCell>
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
                                                    <TableCell sx={cellSx}><InlineInput value={s.notes} onChange={v => updateShortlistPerson(s.id, { notes: v })} placeholder="..." /></TableCell>
                                                    <TableCell sx={cellSx}>
                                                        <IconButton size="small" onClick={() => setDeleteConfirm({ id: s.id, name: s.name || 'без имени', type: 'shortlist' })} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}>
                                                            <DeleteRoundedIcon sx={{ fontSize: '0.9rem' }} />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
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
