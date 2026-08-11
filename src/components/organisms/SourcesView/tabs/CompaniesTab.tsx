import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'

import { ICP_LABELS, COMPANY_STATUS_LABELS, selectSx } from '../sources.constants'
import { dataGridSx, hideFooterIfFits, editable } from '../sources.dataGrid'
import FilterSelect from '../components/FilterSelect'
import InlineInput from '../components/InlineInput'
import StatusChip from '../components/StatusChip'

import type { SourcesData, SourceCompany, IcpSegment, CompanyStatus } from '../SourcesView.types'

type DeleteConfirm = { id: string, name: string, type: 'person' | 'group' | 'company' | 'shortlist' | 'competitor' }

interface CompaniesTabProps {
    local: SourcesData
    filters: Record<string, string>
    setFilter: (key: string, value: string) => void
    clearFilters: () => void
    addCompany: () => void
    updateCompany: (id: string, patch: Partial<SourceCompany>) => void
    setDeleteConfirm: (v: DeleteConfirm | null) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filtered: <T extends Record<string, any>>(items: T[]) => T[]
}

export default function CompaniesTab({
    local, filters, setFilter, clearFilters, addCompany, updateCompany, setDeleteConfirm, filtered,
}: CompaniesTabProps) {
    const rows = filtered(local.companies as SourceCompany[])
    const columns: GridColDef<SourceCompany>[] = [
        { field: 'name', headerName: 'Название', width: 160, renderCell: p => editable(<InlineInput value={p.row.name} onChange={v => updateCompany(p.row.id, { name: v })} placeholder="Agency X" />) },
        { field: 'website', headerName: 'Сайт', width: 180, renderCell: p => editable(<InlineInput value={p.row.website} onChange={v => updateCompany(p.row.id, { website: v })} placeholder="https://..." />) },
        {
            field: 'segment', headerName: 'Сегмент', width: 140, renderCell: p => editable(
                <Select size="small" value={p.row.segment} onChange={e => updateCompany(p.row.id, { segment: e.target.value as IcpSegment })} sx={selectSx} fullWidth>
                    {Object.entries(ICP_LABELS).map(([k, v]) => <MenuItem key={k} value={k} sx={{ fontSize: '0.8rem' }}>{v}</MenuItem>)}
                </Select>
            )
        },
        { field: 'size', headerName: 'Размер', width: 90, renderCell: p => editable(<InlineInput value={p.row.size} onChange={v => updateCompany(p.row.id, { size: v })} placeholder="3-15" />) },
        { field: 'contactPerson', headerName: 'Контакт', width: 140, renderCell: p => editable(<InlineInput value={p.row.contactPerson} onChange={v => updateCompany(p.row.id, { contactPerson: v })} placeholder="Имя" />) },
        {
            field: 'status', headerName: 'Статус', width: 150, renderCell: p => editable(
                <Select
                    size="small"
                    value={p.row.status}
                    onChange={e => updateCompany(p.row.id, { status: e.target.value as CompanyStatus })}
                    sx={selectSx}
                    fullWidth
                    renderValue={(val) => <StatusChip {...COMPANY_STATUS_LABELS[val as CompanyStatus]} />}
                >
                    {Object.entries(COMPANY_STATUS_LABELS).map(([k, v]) => (
                        <MenuItem key={k} value={k} sx={{ fontSize: '0.8rem' }}><StatusChip {...v} /></MenuItem>
                    ))}
                </Select>
            )
        },
        { field: 'notes', headerName: 'Заметки', flex: 1, minWidth: 120, renderCell: p => editable(<InlineInput value={p.row.notes} onChange={v => updateCompany(p.row.id, { notes: v })} placeholder="..." />) },
        {
            field: 'actions', headerName: '', width: 56, sortable: false, resizable: false, filterable: false, disableColumnMenu: true, renderCell: p => (
                <IconButton size="small" onClick={e => { e.stopPropagation(); setDeleteConfirm({ id: p.row.id, name: p.row.name || 'без названия', type: 'company' }) }} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}>
                    <DeleteRoundedIcon sx={{ fontSize: '0.9rem' }} />
                </IconButton>
            )
        },
    ]

    return (
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
            <DataGrid
                rows={rows}
                columns={columns}
                density="compact"
                autoHeight
                disableRowSelectionOnClick
                hideFooter={hideFooterIfFits(rows.length)}
                pageSizeOptions={[25, 50, 100]}
                initialState={{ pagination: { paginationModel: { pageSize: 100 } } }}
                localeText={{ noRowsLabel: 'Пока пусто. Нажми "Добавить" чтобы внести компанию.' }}
                sx={dataGridSx}
            />
        </Box>
    )
}
