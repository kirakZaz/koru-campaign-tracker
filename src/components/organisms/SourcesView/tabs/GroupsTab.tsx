import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'

import { GROUP_STATUS_LABELS, inputSx, selectSx } from '../sources.constants'
import { dataGridSx, hideFooterIfFits, editable } from '../sources.dataGrid'
import FilterSelect from '../components/FilterSelect'
import InlineInput from '../components/InlineInput'
import StatusChip from '../components/StatusChip'

import type { SourcesData, SourceGroup, AccountName, GroupStatus } from '../SourcesView.types'

type DeleteConfirm = { id: string, name: string, type: 'person' | 'group' | 'company' | 'shortlist' | 'competitor' }

interface GroupsTabProps {
    local: SourcesData
    filters: Record<string, string>
    setFilter: (key: string, value: string) => void
    clearFilters: () => void
    addGroup: () => void
    updateGroup: (id: string, patch: Partial<SourceGroup>) => void
    setDeleteConfirm: (v: DeleteConfirm | null) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    uniqueVals: <T extends Record<string, any>>(items: T[], key: string) => string[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filtered: <T extends Record<string, any>>(items: T[]) => T[]
}

export default function GroupsTab({
    local, filters, setFilter, clearFilters, addGroup, updateGroup, setDeleteConfirm,
    uniqueVals, filtered,
}: GroupsTabProps) {
    const rows = filtered(local.groups as SourceGroup[])

    const columns: GridColDef<SourceGroup>[] = [
        {
            field: 'priority', headerName: '#', width: 60, type: 'number', renderCell: p => editable(
                <TextField size="small" type="number" variant="outlined" value={p.row.priority || 0} onChange={e => updateGroup(p.row.id, { priority: parseInt(e.target.value) || 0 })} sx={{ ...inputSx, width: 45, '& .MuiInputBase-input': { fontSize: '0.8rem', py: 0.25, px: 0.5, textAlign: 'center' } }} inputProps={{ min: 0, max: 99 }} />
            )
        },
        { field: 'name', headerName: 'Название', width: 160, renderCell: p => editable(<InlineInput value={p.row.name} onChange={v => updateGroup(p.row.id, { name: v })} placeholder="SEO Professionals" />) },
        {
            field: 'url', headerName: 'Ссылка', width: 160, renderCell: p => editable(
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, width: '100%' }}>
                    <TextField size="small" fullWidth variant="outlined" value={p.row.url || ''} onChange={e => updateGroup(p.row.id, { url: e.target.value })} placeholder="URL" sx={{ ...inputSx, '& .MuiInputBase-input': { fontSize: '0.7rem', py: 0.25, px: 0.5 } }} />
                    {(p.row.url || '') && (
                        <IconButton size="small" onClick={() => window.open(p.row.url.startsWith('http') ? p.row.url : `https://${p.row.url}`, '_blank')} sx={{ color: 'primary.main', p: 0.25 }}>
                            <OpenInNewRoundedIcon sx={{ fontSize: '0.85rem' }} />
                        </IconButton>
                    )}
                </Box>
            )
        },
        {
            field: 'platform', headerName: 'Платформа', width: 120, renderCell: p => editable(
                <Select size="small" value={p.row.platform} onChange={e => updateGroup(p.row.id, { platform: e.target.value })} sx={selectSx} fullWidth>
                    <MenuItem value="LinkedIn" sx={{ fontSize: '0.8rem' }}>LinkedIn</MenuItem>
                    <MenuItem value="Facebook" sx={{ fontSize: '0.8rem' }}>Facebook</MenuItem>
                    <MenuItem value="Slack" sx={{ fontSize: '0.8rem' }}>Slack</MenuItem>
                    <MenuItem value="Discord" sx={{ fontSize: '0.8rem' }}>Discord</MenuItem>
                    <MenuItem value="Reddit" sx={{ fontSize: '0.8rem' }}>Reddit</MenuItem>
                    <MenuItem value="Other" sx={{ fontSize: '0.8rem' }}>Other</MenuItem>
                </Select>
            )
        },
        { field: 'members', headerName: 'Участников', width: 100, renderCell: p => editable(<InlineInput value={p.row.members} onChange={v => updateGroup(p.row.id, { members: v })} placeholder="10k" />) },
        {
            field: 'account', headerName: 'Аккаунт', width: 110, renderCell: p => editable(
                <Select size="small" value={p.row.account} onChange={e => updateGroup(p.row.id, { account: e.target.value as AccountName })} sx={selectSx} fullWidth>
                    <MenuItem value="Кира" sx={{ fontSize: '0.8rem' }}>Кира</MenuItem>
                    <MenuItem value="Настя" sx={{ fontSize: '0.8rem' }}>Настя</MenuItem>
                </Select>
            )
        },
        {
            field: 'status', headerName: 'Статус', width: 130, renderCell: p => editable(
                <Select
                    size="small"
                    value={p.row.status}
                    onChange={e => updateGroup(p.row.id, { status: e.target.value as GroupStatus })}
                    sx={selectSx}
                    fullWidth
                    renderValue={(val) => <StatusChip {...GROUP_STATUS_LABELS[val as GroupStatus]} />}
                >
                    {Object.entries(GROUP_STATUS_LABELS).map(([k, v]) => (
                        <MenuItem key={k} value={k} sx={{ fontSize: '0.8rem' }}><StatusChip {...v} /></MenuItem>
                    ))}
                </Select>
            )
        },
        {
            field: 'activeMembers', headerName: 'Активные (5)', width: 160, sortable: false, renderCell: p => editable(
                <TextField
                    size="small"
                    fullWidth
                    variant="outlined"
                    value={(p.row.activeMembers || []).filter(Boolean).join(', ')}
                    onChange={(e) => {
                        const parts = e.target.value.split(',').map(s => s.trim()).slice(0, 5)
                        const arr = [...parts, ...Array(5 - parts.length).fill('')]
                        updateGroup(p.row.id, { activeMembers: arr.slice(0, 5) })
                    }}
                    placeholder="Имя1, Имя2, ..."
                    sx={{ ...inputSx, '& .MuiInputBase-input': { fontSize: '0.75rem', py: 0.25, px: 0.5 } }}
                />
            )
        },
        { field: 'notes', headerName: 'Заметки', flex: 1, minWidth: 120, renderCell: p => editable(<InlineInput value={p.row.notes} onChange={v => updateGroup(p.row.id, { notes: v })} placeholder="..." />) },
        {
            field: 'actions', headerName: '', width: 56, sortable: false, resizable: false, filterable: false, disableColumnMenu: true, renderCell: p => (
                <IconButton size="small" onClick={e => { e.stopPropagation(); setDeleteConfirm({ id: p.row.id, name: p.row.name || 'без названия', type: 'group' }) }} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}>
                    <DeleteRoundedIcon sx={{ fontSize: '0.9rem' }} />
                </IconButton>
            )
        },
    ]

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                <FilterSelect label="Платформа" value={filters.platform || ''} options={uniqueVals(local.groups as SourceGroup[], 'platform')} onChange={v => setFilter('platform', v)} />
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
            <DataGrid
                rows={rows}
                columns={columns}
                density="compact"
                autoHeight
                disableRowSelectionOnClick
                hideFooter={hideFooterIfFits(rows.length)}
                pageSizeOptions={[25, 50, 100]}
                initialState={{ pagination: { paginationModel: { pageSize: 100 } } }}
                localeText={{ noRowsLabel: 'Пока пусто. Нажми "Добавить" чтобы внести группу.' }}
                sx={dataGridSx}
            />
        </Box>
    )
}
