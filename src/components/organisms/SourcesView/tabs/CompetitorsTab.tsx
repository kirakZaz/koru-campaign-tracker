import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'

import { THREAT_LABELS, selectSx } from '../sources.constants'
import { dataGridSx, hideFooterIfFits, editable } from '../sources.dataGrid'
import FilterSelect from '../components/FilterSelect'
import InlineInput from '../components/InlineInput'
import StatusChip from '../components/StatusChip'

import type { SourcesData, SourceCompetitor, CompetitorThreatLevel } from '../SourcesView.types'

type DeleteConfirm = { id: string, name: string, type: 'person' | 'group' | 'company' | 'shortlist' | 'competitor' }

interface CompetitorsTabProps {
    local: SourcesData
    filters: Record<string, string>
    setFilter: (key: string, value: string) => void
    clearFilters: () => void
    addCompetitor: () => void
    updateCompetitor: (id: string, patch: Partial<SourceCompetitor>) => void
    setDeleteConfirm: (v: DeleteConfirm | null) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filtered: <T extends Record<string, any>>(items: T[]) => T[]
}

export default function CompetitorsTab({
    local, filters, setFilter, clearFilters, addCompetitor, updateCompetitor, setDeleteConfirm, filtered,
}: CompetitorsTabProps) {
    const rows = filtered(local.competitors as SourceCompetitor[])

    const columns: GridColDef<SourceCompetitor>[] = [
        { field: 'name', headerName: 'Название', width: 150, renderCell: p => editable(<InlineInput value={p.row.name} onChange={v => updateCompetitor(p.row.id, { name: v })} placeholder="Название" />) },
        { field: 'url', headerName: 'Сайт', width: 160, renderCell: p => editable(<InlineInput value={p.row.url} onChange={v => updateCompetitor(p.row.id, { url: v })} placeholder="https://..." />) },
        { field: 'type', headerName: 'Тип', width: 150, renderCell: p => editable(<InlineInput value={p.row.type} onChange={v => updateCompetitor(p.row.id, { type: v })} placeholder="GEO monitor / SEO agent" />) },
        { field: 'pricing', headerName: 'Цена', width: 100, renderCell: p => editable(<InlineInput value={p.row.pricing} onChange={v => updateCompetitor(p.row.id, { pricing: v })} placeholder="$97/mo" />) },
        { field: 'features', headerName: 'Что делают', width: 170, renderCell: p => editable(<InlineInput value={p.row.features} onChange={v => updateCompetitor(p.row.id, { features: v })} placeholder="Keywords, articles..." />) },
        { field: 'missingVsKoru', headerName: 'Нет vs KORU', width: 170, renderCell: p => editable(<InlineInput value={p.row.missingVsKoru} onChange={v => updateCompetitor(p.row.id, { missingVsKoru: v })} placeholder="No GEO, no AI viz..." />) },
        { field: 'linkedinPerson', headerName: 'LinkedIn', width: 130, renderCell: p => editable(<InlineInput value={p.row.linkedinPerson} onChange={v => updateCompetitor(p.row.id, { linkedinPerson: v })} placeholder="Founder name" />) },
        {
            field: 'threatLevel', headerName: 'Угроза', width: 130, renderCell: p => editable(
                <Select
                    size="small"
                    value={p.row.threatLevel}
                    onChange={e => updateCompetitor(p.row.id, { threatLevel: e.target.value as CompetitorThreatLevel })}
                    sx={selectSx}
                    fullWidth
                    renderValue={(val) => <StatusChip {...THREAT_LABELS[val as CompetitorThreatLevel]} />}
                >
                    {Object.entries(THREAT_LABELS).map(([k, v]) => (
                        <MenuItem key={k} value={k} sx={{ fontSize: '0.8rem' }}><StatusChip {...v} /></MenuItem>
                    ))}
                </Select>
            )
        },
        { field: 'notes', headerName: 'Заметки', flex: 1, minWidth: 120, renderCell: p => editable(<InlineInput value={p.row.notes} onChange={v => updateCompetitor(p.row.id, { notes: v })} placeholder="..." />) },
        {
            field: 'actions', headerName: '', width: 56, sortable: false, resizable: false, filterable: false, disableColumnMenu: true, renderCell: p => (
                <IconButton size="small" onClick={e => { e.stopPropagation(); setDeleteConfirm({ id: p.row.id, name: p.row.name || 'без названия', type: 'competitor' }) }} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}>
                    <DeleteRoundedIcon sx={{ fontSize: '0.9rem' }} />
                </IconButton>
            )
        },
    ]

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                <FilterSelect label="Уровень" value={filters.threatLevel || ''} options={['direct', 'indirect', 'adjacent']} onChange={v => setFilter('threatLevel', v)} />
                {Object.keys(filters).length > 0 && (
                    <IconButton size="small" onClick={clearFilters} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }} title="Сбросить все фильтры">
                        <FilterAltOffRoundedIcon sx={{ fontSize: '1rem' }} />
                    </IconButton>
                )}
                <Box sx={{ flex: 1 }} />
                <Button size="small" startIcon={<AddRoundedIcon />} onClick={addCompetitor} variant="outlined" sx={{ textTransform: 'none', fontSize: '0.8rem' }}>
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
                localeText={{ noRowsLabel: 'Пока пусто. Нажми "Добавить" чтобы внести конкурента.' }}
                sx={dataGridSx}
            />
        </Box>
    )
}
