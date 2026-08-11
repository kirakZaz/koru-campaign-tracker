import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import InputAdornment from '@mui/material/InputAdornment'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import { DataGrid, type GridColDef, type GridRowSelectionModel } from '@mui/x-data-grid'

import {
    DM_STATUS_LABELS,
    CONNECTION_STATUS_LABELS,
    FOLLOW_STATUS_LABELS,
    NEXT_ACTION_LABELS,
} from '../sources.constants'
import { dataGridSx, hideFooterIfFits } from '../sources.dataGrid'
import { getAutoActions, getNextAction } from '../sources.utils'
import FilterSelect from '../components/FilterSelect'
import StatusChip from '../components/StatusChip'
import OutreachSignals from '../components/OutreachSignals'

import type { SourcesData, SourcePerson, ShortlistPerson, FollowStatus } from '../SourcesView.types'

interface OutreachTabProps {
    local: SourcesData
    save: (next: SourcesData) => void
    setSnackbarMsg: (v: string | null) => void
    campaignWeek: number
    searchQuery: string
    setSearchQuery: (v: string) => void
    needsActionFilter: boolean
    setNeedsActionFilter: React.Dispatch<React.SetStateAction<boolean>>
    filters: Record<string, string>
    setFilter: (key: string, value: string) => void
    clearFilters: () => void
    selectedIds: Set<string>
    setSelectedIds: React.Dispatch<React.SetStateAction<Set<string>>>
    bulkUpdate: (patch: Partial<ShortlistPerson>) => void
    outreachCandidates: SourcePerson[]
    canAddNextWave: boolean
    waveSize: number
    setBestPickIds: React.Dispatch<React.SetStateAction<Set<string>>>
    setAddBestDialogOpen: (v: boolean) => void
    addShortlistPerson: () => void
    activeInOutreach: ShortlistPerson[]
    doneInOutreach: ShortlistPerson[]
    displayShortlist: ShortlistPerson[]
    setModalPersonId: (v: string | null) => void
}

export default function OutreachTab({
    local, save, setSnackbarMsg, campaignWeek,
    searchQuery, setSearchQuery, needsActionFilter, setNeedsActionFilter,
    filters, setFilter, clearFilters, selectedIds, setSelectedIds, bulkUpdate,
    outreachCandidates, canAddNextWave, waveSize, setBestPickIds, setAddBestDialogOpen,
    addShortlistPerson, activeInOutreach, doneInOutreach, displayShortlist,
    setModalPersonId,
}: OutreachTabProps) {
    const columns: GridColDef<ShortlistPerson>[] = [
        { field: 'name', headerName: 'Имя', width: 160, renderCell: p => <Box sx={{ fontWeight: 600 }}>{p.row.name || '—'}</Box> },
        {
            field: 'priority', headerName: 'Priority', width: 90, renderCell: p => {
                const prColor = p.row.priority === 'A' ? '#3fb68e' : p.row.priority === 'B' ? '#d29922' : '#8b949e'
                return <Chip label={p.row.priority || 'B'} size="small" sx={{ fontSize: '0.7rem', fontWeight: 800, height: 20, minWidth: 24, backgroundColor: prColor + '22', color: prColor, border: `1px solid ${prColor}44` }} />
            }
        },
        { field: 'followStatus', headerName: 'Follow', width: 120, renderCell: p => <StatusChip {...FOLLOW_STATUS_LABELS[(p.row.followStatus || 'not_followed') as FollowStatus]} /> },
        { field: 'connectionStatus', headerName: 'Запрос', width: 120, renderCell: p => <StatusChip {...CONNECTION_STATUS_LABELS[p.row.connectionStatus || 'not_sent']} /> },
        { field: 'dmStatus', headerName: 'DM', width: 110, renderCell: p => <StatusChip {...DM_STATUS_LABELS[p.row.dmStatus || 'not_sent']} /> },
        {
            field: 'next', headerName: 'Next', width: 150, sortable: false, renderCell: p => {
                const nextAction = getNextAction(p.row)
                return <StatusChip label={nextAction.label} color={nextAction.color} />
            }
        },
        { field: 'signals', headerName: 'Отметки', width: 140, sortable: false, renderCell: p => <OutreachSignals person={p.row} /> },
        {
            field: 'actions', headerName: '', width: 56, sortable: false, resizable: false, filterable: false, disableColumnMenu: true, renderCell: p => (
                <Tooltip title="Открыть карточку">
                    <IconButton size="small" onClick={(e) => { e.stopPropagation(); setModalPersonId(p.row.id) }} sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                        <ChevronRightRoundedIcon sx={{ fontSize: '1.1rem' }} />
                    </IconButton>
                </Tooltip>
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
                        const top = outreachCandidates.slice(0, waveSize)
                        setBestPickIds(new Set(top.map(p => p.id)))
                        setAddBestDialogOpen(true)
                    }} sx={{ textTransform: 'none', fontSize: '0.8rem', mr: 0.5, ...(canAddNextWave ? { backgroundColor: '#3fb68e', '&:hover': { backgroundColor: '#2d9e72' } } : { borderColor: '#3fb68e44', color: '#3fb68e', '&:hover': { borderColor: '#3fb68e', backgroundColor: '#3fb68e11' } }) }}>
                        {canAddNextWave ? `Следующая волна (${Math.min(waveSize, outreachCandidates.length)})` : `+ Волна из People (${Math.min(waveSize, outreachCandidates.length)})`}
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
                            : 'Пока пусто. Добавляй лучших людей — они появятся здесь.'}
                    </Typography>
                </Box>
            ) : (
                <DataGrid
                    rows={displayShortlist}
                    columns={columns}
                    density="compact"
                    autoHeight
                    checkboxSelection
                    disableRowSelectionOnClick
                    rowSelectionModel={Array.from(selectedIds)}
                    onRowSelectionModelChange={(model: GridRowSelectionModel) => setSelectedIds(new Set(model as string[]))}
                    onRowClick={(params, event) => {
                        if ((event.target as HTMLElement).closest('.MuiDataGrid-cellCheckbox')) return
                        setModalPersonId(params.row.id)
                    }}
                    hideFooter={hideFooterIfFits(displayShortlist.length)}
                    pageSizeOptions={[25, 50, 100]}
                    initialState={{ pagination: { paginationModel: { pageSize: 100 } } }}
                    sx={{ ...dataGridSx, '& .MuiDataGrid-row': { cursor: 'pointer' } }}
                />
            )}
        </Box>
    )
}
