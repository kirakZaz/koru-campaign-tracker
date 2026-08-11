import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from '@mui/material/InputAdornment'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { DataGrid, type GridColDef, type GridRowSelectionModel } from '@mui/x-data-grid'

import { ICP_LABELS, PERSON_STATUS_LABELS, selectSx } from '../sources.constants'
import { dataGridSx, hideFooterIfFits, editable } from '../sources.dataGrid'
import FilterSelect from '../components/FilterSelect'
import InlineInput from '../components/InlineInput'
import StatusChip from '../components/StatusChip'

import type { SourcesData, SourcePerson, IcpSegment, IcpPriority, PersonStatus } from '../SourcesView.types'

type DeleteConfirm = { id: string, name: string, type: 'person' | 'group' | 'company' | 'shortlist' | 'competitor' }

const headerLabelSx = { fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' as const, color: 'text.secondary' }

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
    countries: string[]
    setCountriesDialogOpen: (v: boolean) => void
    setSnackbarMsg: (v: string | null) => void
    setDeleteConfirm: (v: DeleteConfirm | null) => void
    isInShortlist: (person: SourcePerson) => boolean
    isReviewed: (person: SourcePerson) => boolean
    openReadOnly: (person: SourcePerson) => void
    addPeopleToOutreach: (people: SourcePerson[]) => void
    addPerson: () => void
    updatePerson: (id: string, patch: Partial<SourcePerson>) => void
    togglePersonShortlist: (person: SourcePerson) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    uniqueVals: <T extends Record<string, any>>(items: T[], key: string) => string[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filtered: <T extends Record<string, any>>(items: T[]) => T[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    searched: <T extends Record<string, any>>(items: T[]) => T[]
}

export default function PeopleTab({
    local, save, searchQuery, setSearchQuery, filters, setFilter, clearFilters,
    selectedPeopleIds, setSelectedPeopleIds, countries,
    setCountriesDialogOpen, setSnackbarMsg, setDeleteConfirm, isInShortlist, isReviewed, openReadOnly,
    addPeopleToOutreach, addPerson, updatePerson, togglePersonShortlist,
    uniqueVals, filtered, searched,
}: PeopleTabProps) {
    const rows = searched(filtered(local.people as SourcePerson[]))

    const columns: GridColDef<SourcePerson>[] = [
        { field: 'name', headerName: 'Имя', width: 140, renderCell: p => editable(<InlineInput value={p.row.name} onChange={v => updatePerson(p.row.id, { name: v })} placeholder="Имя" />) },
        { field: 'title', headerName: 'Должность', width: 140, renderCell: p => editable(<InlineInput value={p.row.title || ''} onChange={v => updatePerson(p.row.id, { title: v })} placeholder="Должность" />) },
        {
            field: 'linkedinUrl', headerName: 'LinkedIn', width: 150, renderCell: p => editable(
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, width: '100%' }}>
                    <InlineInput value={p.row.linkedinUrl} onChange={v => updatePerson(p.row.id, { linkedinUrl: v })} placeholder="URL" />
                    {p.row.linkedinUrl && (
                        <IconButton size="small" onClick={() => window.open(p.row.linkedinUrl.startsWith('http') ? p.row.linkedinUrl : `https://${p.row.linkedinUrl}`, '_blank')} sx={{ color: 'primary.main', p: 0.25 }}>
                            <OpenInNewRoundedIcon sx={{ fontSize: '0.85rem' }} />
                        </IconButton>
                    )}
                </Box>
            )
        },
        {
            field: 'country', headerName: 'Страна', width: 120,
            renderHeader: () => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box component="span" sx={headerLabelSx}>Страна</Box>
                    <IconButton size="small" onClick={(e) => { e.stopPropagation(); setCountriesDialogOpen(true) }} sx={{ color: 'text.secondary', p: 0 }}>
                        <EditRoundedIcon sx={{ fontSize: '0.7rem' }} />
                    </IconButton>
                </Box>
            ),
            renderCell: p => editable(
                <Select size="small" value={p.row.country || ''} onChange={e => updatePerson(p.row.id, { country: e.target.value })} sx={selectSx} fullWidth displayEmpty>
                    <MenuItem value="" sx={{ fontSize: '0.8rem', color: '#8b949e' }}>{'—'}</MenuItem>
                    {countries.map(c => <MenuItem key={c} value={c} sx={{ fontSize: '0.8rem' }}>{c}</MenuItem>)}
                </Select>
            )
        },
        {
            field: 'icpSegment', headerName: 'ICP', width: 120, renderCell: p => editable(
                <Select size="small" value={p.row.icpSegment} onChange={e => updatePerson(p.row.id, { icpSegment: e.target.value as IcpSegment })} sx={selectSx} fullWidth>
                    {Object.entries(ICP_LABELS).map(([k, v]) => <MenuItem key={k} value={k} sx={{ fontSize: '0.8rem' }}>{v}</MenuItem>)}
                </Select>
            )
        },
        {
            field: 'priority', headerName: 'Priority', width: 90, renderCell: p => editable(
                <Select size="small" value={p.row.priority} onChange={e => updatePerson(p.row.id, { priority: e.target.value as IcpPriority })} sx={selectSx} fullWidth>
                    {(['A', 'B', 'C'] as IcpPriority[]).map(v => (
                        <MenuItem key={v} value={v} sx={{ fontSize: '0.8rem', fontWeight: 700, color: v === 'A' ? '#3fb68e' : v === 'B' ? '#d29922' : '#8b949e' }}>{v}</MenuItem>
                    ))}
                </Select>
            )
        },
        {
            field: 'activityLevel', headerName: 'Activity', width: 100, renderCell: p => editable(
                <Select size="small" value={p.row.activityLevel} onChange={e => updatePerson(p.row.id, { activityLevel: e.target.value as 'high' | 'medium' | 'low' })} sx={selectSx} fullWidth>
                    <MenuItem value="high" sx={{ fontSize: '0.8rem' }}>High</MenuItem>
                    <MenuItem value="medium" sx={{ fontSize: '0.8rem' }}>Medium</MenuItem>
                    <MenuItem value="low" sx={{ fontSize: '0.8rem' }}>Low</MenuItem>
                </Select>
            )
        },
        { field: 'source', headerName: 'Источник', width: 130, renderCell: p => editable(<InlineInput value={p.row.source} onChange={v => updatePerson(p.row.id, { source: v })} placeholder="Группа, поиск..." />) },
        {
            field: 'status', headerName: 'Статус', width: 130, renderCell: p => editable(
                <Select
                    size="small"
                    value={p.row.status}
                    onChange={e => updatePerson(p.row.id, { status: e.target.value as PersonStatus })}
                    sx={selectSx}
                    fullWidth
                    renderValue={(val) => <StatusChip {...PERSON_STATUS_LABELS[val as PersonStatus]} />}
                >
                    {Object.entries(PERSON_STATUS_LABELS).map(([k, v]) => (
                        <MenuItem key={k} value={k} sx={{ fontSize: '0.8rem' }}><StatusChip {...v} /></MenuItem>
                    ))}
                </Select>
            )
        },
        { field: 'notes', headerName: 'Заметки', flex: 1, minWidth: 120, renderCell: p => editable(<InlineInput value={p.row.notes} onChange={v => updatePerson(p.row.id, { notes: v })} placeholder="..." />) },
        {
            field: 'actions', headerName: '', width: 110, sortable: false, resizable: false, filterable: false, disableColumnMenu: true, renderCell: p => (
                <Box sx={{ display: 'flex', gap: 0.25 }}>
                    <IconButton size="small" onClick={e => { e.stopPropagation(); openReadOnly(p.row) }} sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }} title="Посмотреть карточку">
                        <VisibilityRoundedIcon sx={{ fontSize: '0.95rem' }} />
                    </IconButton>
                    <IconButton size="small" onClick={e => { e.stopPropagation(); togglePersonShortlist(p.row) }} sx={{ color: isInShortlist(p.row) ? 'warning.main' : 'text.secondary', '&:hover': { color: 'warning.main' } }} title={isReviewed(p.row) ? 'Вернуть в Outreach' : 'В Outreach'}>
                        <StarRoundedIcon sx={{ fontSize: '0.9rem' }} />
                    </IconButton>
                    <IconButton size="small" onClick={e => { e.stopPropagation(); setDeleteConfirm({ id: p.row.id, name: p.row.name || 'без имени', type: 'person' }) }} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}>
                        <DeleteRoundedIcon sx={{ fontSize: '0.9rem' }} />
                    </IconButton>
                </Box>
            )
        },
    ]

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
            <DataGrid
                rows={rows}
                columns={columns}
                density="compact"
                autoHeight
                checkboxSelection
                disableRowSelectionOnClick
                rowSelectionModel={Array.from(selectedPeopleIds)}
                onRowSelectionModelChange={(model: GridRowSelectionModel) => setSelectedPeopleIds(new Set(model as string[]))}
                getRowClassName={p => isReviewed(p.row) ? 'row-reviewed' : isInShortlist(p.row) ? 'row-in-shortlist' : ''}
                hideFooter={hideFooterIfFits(rows.length)}
                pageSizeOptions={[25, 50, 100]}
                initialState={{ pagination: { paginationModel: { pageSize: 100 } } }}
                localeText={{ noRowsLabel: 'Пока пусто. Нажми "Добавить" чтобы внести первый контакт.' }}
                sx={{
                    ...dataGridSx,
                    '& .row-in-shortlist': { backgroundColor: '#3fb68e08' },
                    '& .row-reviewed': { backgroundColor: '#8b949e14', opacity: 0.72 },
                }}
            />
        </Box>
    )
}
