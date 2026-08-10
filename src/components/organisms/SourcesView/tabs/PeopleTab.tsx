import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'

import { ICP_LABELS, PERSON_STATUS_LABELS, cellSx, headCellSx, selectSx } from '../sources.constants'
import FilterSelect from '../components/FilterSelect'
import InlineInput from '../components/InlineInput'
import StatusChip from '../components/StatusChip'
import SortHeader from '../components/SortHeader'

import type { SourcesData, SourcePerson, IcpSegment, IcpPriority, PersonStatus } from '../SourcesView.types'

type DeleteConfirm = { id: string, name: string, type: 'person' | 'group' | 'company' | 'shortlist' | 'competitor' }

interface PeopleTabProps {
    local: SourcesData
    save: (next: SourcesData) => void
    searchQuery: string
    setSearchQuery: (v: string) => void
    filters: Record<string, string>
    setFilter: (key: string, value: string) => void
    clearFilters: () => void
    selectedPeopleIds: Set<string>
    setSelectedPeopleIds: React.Dispatch<React.SetStateAction<Set<string>>>
    sortKey: string
    sortDir: 'asc' | 'desc'
    toggleSort: (key: string) => void
    countries: string[]
    setCountriesDialogOpen: (v: boolean) => void
    setSnackbarMsg: (v: string | null) => void
    setDeleteConfirm: (v: DeleteConfirm | null) => void
    isInShortlist: (person: SourcePerson) => boolean
    addPeopleToOutreach: (people: SourcePerson[]) => void
    addPerson: () => void
    updatePerson: (id: string, patch: Partial<SourcePerson>) => void
    togglePersonShortlist: (person: SourcePerson) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    uniqueVals: <T extends Record<string, any>>(items: T[], key: string) => string[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sorted: <T extends Record<string, any>>(items: T[]) => T[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filtered: <T extends Record<string, any>>(items: T[]) => T[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    searched: <T extends Record<string, any>>(items: T[]) => T[]
}

export default function PeopleTab({
    local, save, searchQuery, setSearchQuery, filters, setFilter, clearFilters,
    selectedPeopleIds, setSelectedPeopleIds, sortKey, sortDir, toggleSort, countries,
    setCountriesDialogOpen, setSnackbarMsg, setDeleteConfirm, isInShortlist,
    addPeopleToOutreach, addPerson, updatePerson, togglePersonShortlist,
    uniqueVals, sorted, filtered, searched,
}: PeopleTabProps) {
    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                <TextField size="small" placeholder="Поиск..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position="start"><SearchRoundedIcon sx={{ fontSize: '0.9rem', color: 'text.secondary' }} /></InputAdornment> }}
                    sx={{ width: 160, '& .MuiInputBase-input': { fontSize: '0.8rem', py: 0.5 }, '& .MuiOutlinedInput-notchedOutline': { borderColor: searchQuery ? 'primary.main' : 'divider' } }}
                />
                <FilterSelect label="Страна" value={filters.country || ''} options={uniqueVals(local.people as SourcePerson[], 'country')} onChange={v => setFilter('country', v)} />
                <FilterSelect label="ICP" value={filters.icpSegment || ''} options={Object.keys(ICP_LABELS)} onChange={v => setFilter('icpSegment', v)} />
                <FilterSelect label="Priority" value={filters.priority || ''} options={['A', 'B', 'C']} onChange={v => setFilter('priority', v)} />
                <FilterSelect label="Activity" value={filters.activityLevel || ''} options={['high', 'medium', 'low']} onChange={v => setFilter('activityLevel', v)} />
                <FilterSelect label="Статус" value={filters.status || ''} options={uniqueVals(local.people as SourcePerson[], 'status')} onChange={v => setFilter('status', v)} />
                <FilterSelect label="Источник" value={filters.source || ''} options={uniqueVals(local.people as SourcePerson[], 'source')} onChange={v => setFilter('source', v)} />
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
                {(() => {
                    const seen = new Set<string>()
                    const dups = local.people.filter(p => {
                        const key = (p.linkedinUrl || '').toLowerCase().replace(/\/$/, '')
                        if (!key) return false
                        if (seen.has(key)) return true
                        seen.add(key)
                        return false
                    })
                    return dups.length > 0 ? (
                        <Button size="small" variant="outlined" onClick={() => {
                            const seen2 = new Set<string>()
                            const deduped = local.people.filter(p => {
                                const key = (p.linkedinUrl || '').toLowerCase().replace(/\/$/, '')
                                if (!key) return true
                                if (seen2.has(key)) return false
                                seen2.add(key)
                                return true
                            })
                            save({ ...local, people: deduped })
                            setSnackbarMsg(`Удалено ${local.people.length - deduped.length} дубликатов`)
                        }} sx={{ textTransform: 'none', fontSize: '0.7rem', height: 26, mr: 0.5, borderColor: '#d2992244', color: '#d29922' }}>
                            Убрать дубликаты ({dups.length})
                        </Button>
                    ) : null
                })()}
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
                                    checked={sorted(filtered(local.people as SourcePerson[])).length > 0 && sorted(filtered(local.people as SourcePerson[])).every(p => selectedPeopleIds.has(p.id))}
                                    indeterminate={sorted(filtered(local.people as SourcePerson[])).some(p => selectedPeopleIds.has(p.id)) && !sorted(filtered(local.people as SourcePerson[])).every(p => selectedPeopleIds.has(p.id))}
                                    onChange={(_, checked) => {
                                        const visible = sorted(filtered(local.people as SourcePerson[])).map(p => p.id)
                                        setSelectedPeopleIds(checked ? new Set(visible) : new Set())
                                    }}
                                />
                            </TableCell>
                            <SortHeader label="Имя" field="name" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                            <SortHeader label="Должность" field="title" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
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
                                <TableCell colSpan={12} sx={{ ...cellSx, textAlign: 'center', color: 'text.secondary', py: 4 }}>
                                    Пока пусто. Нажми "Добавить" чтобы внести первый контакт.
                                </TableCell>
                            </TableRow>
                        )}
                        {sorted(searched(filtered(local.people as SourcePerson[]))).map((p) => (
                            <TableRow key={p.id} sx={{ '&:hover': { backgroundColor: '#ffffff04' }, backgroundColor: isInShortlist(p) ? '#3fb68e08' : undefined }}>
                                <TableCell sx={{ ...cellSx, px: 0.5, width: 36 }}>
                                    <Checkbox size="small" sx={{ p: 0.25 }} checked={selectedPeopleIds.has(p.id)} onChange={(_, checked) => {
                                        setSelectedPeopleIds(prev => { const n = new Set(prev); if (checked) n.add(p.id); else n.delete(p.id); return n })
                                    }} />
                                </TableCell>
                                <TableCell sx={cellSx}><InlineInput value={p.name} onChange={v => updatePerson(p.id, { name: v })} placeholder="Имя" /></TableCell>
                                <TableCell sx={cellSx}><InlineInput value={p.title || ''} onChange={v => updatePerson(p.id, { title: v })} placeholder="Должность" /></TableCell>
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
                                        <MenuItem value="" sx={{ fontSize: '0.8rem', color: '#8b949e' }}>{'—'}</MenuItem>
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
    )
}
