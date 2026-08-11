import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import Tooltip from '@mui/material/Tooltip'
import InputAdornment from '@mui/material/InputAdornment'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'

import { DM_STATUS_LABELS, CONNECTION_STATUS_LABELS, FOLLOW_STATUS_LABELS } from '../sources.constants'
import { dataGridSx, hideFooterIfFits } from '../sources.dataGrid'
import StatusChip from '../components/StatusChip'
import OutreachSignals from '../components/OutreachSignals'

import type { ShortlistPerson, FollowStatus } from '../SourcesView.types'

interface ArchiveTabProps {
    reviewed: ShortlistPerson[]
    searchQuery: string
    setSearchQuery: (v: string) => void
    onView: (person: ShortlistPerson) => void
    onReturnToPeople: (id: string) => void
    onDeleteCompletely: (id: string) => void
}

export default function ArchiveTab({
    reviewed, searchQuery, setSearchQuery, onView, onReturnToPeople, onDeleteCompletely,
}: ArchiveTabProps) {
    const rows = searchQuery.trim()
        ? reviewed.filter(s => Object.values(s).some(v => typeof v === 'string' && v.toLowerCase().includes(searchQuery.toLowerCase())))
        : reviewed

    const columns: GridColDef<ShortlistPerson>[] = [
        { field: 'name', headerName: 'Имя', width: 160, renderCell: p => <Box sx={{ fontWeight: 600 }}>{p.row.name || '—'}</Box> },
        {
            field: 'priority', headerName: 'Priority', width: 90, renderCell: p => {
                const prColor = p.row.priority === 'A' ? '#3fb68e' : p.row.priority === 'B' ? '#d29922' : '#8b949e'
                return <Chip label={p.row.priority || 'B'} size="small" sx={{ fontSize: '0.7rem', fontWeight: 800, height: 20, minWidth: 24, backgroundColor: prColor + '22', color: prColor, border: `1px solid ${prColor}44` }} />
            }
        },
        { field: 'followStatus', headerName: 'Follow', width: 110, renderCell: p => <StatusChip {...FOLLOW_STATUS_LABELS[(p.row.followStatus || 'not_followed') as FollowStatus]} /> },
        { field: 'connectionStatus', headerName: 'Запрос', width: 110, renderCell: p => <StatusChip {...CONNECTION_STATUS_LABELS[p.row.connectionStatus || 'not_sent']} /> },
        { field: 'dmStatus', headerName: 'DM', width: 100, renderCell: p => <StatusChip {...DM_STATUS_LABELS[p.row.dmStatus || 'not_sent']} /> },
        { field: 'signals', headerName: 'Отметки', width: 140, sortable: false, renderCell: p => <OutreachSignals person={p.row} /> },
        { field: 'reviewedAt', headerName: 'Проверен', width: 110, renderCell: p => <Box sx={{ fontSize: '0.75rem', color: 'text.secondary', fontFamily: 'monospace' }}>{p.row.reviewedAt || '—'}</Box> },
        {
            field: 'actions', headerName: '', width: 110, sortable: false, resizable: false, filterable: false, disableColumnMenu: true, renderCell: p => (
                <Box sx={{ display: 'flex', gap: 0.25 }}>
                    <Tooltip title="Посмотреть карточку">
                        <IconButton size="small" onClick={(e) => { e.stopPropagation(); onView(p.row) }} sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                            <VisibilityRoundedIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Вернуть в People">
                        <IconButton size="small" onClick={(e) => { e.stopPropagation(); onReturnToPeople(p.row.id) }} sx={{ color: 'text.secondary', '&:hover': { color: '#3fb68e' } }}>
                            <ReplyRoundedIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Удалить совсем">
                        <IconButton size="small" onClick={(e) => {
                            e.stopPropagation()
                            if (window.confirm(`Удалить «${p.row.name || 'без имени'}» полностью — из People и из архива?`)) onDeleteCompletely(p.row.id)
                        }} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}>
                            <DeleteRoundedIcon sx={{ fontSize: '0.9rem' }} />
                        </IconButton>
                    </Tooltip>
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
                <Box sx={{ flex: 1 }} />
                <Typography sx={{ fontSize: '0.75rem', color: '#3fb68e' }}>Проверено: <b>{reviewed.length}</b></Typography>
            </Box>
            {rows.length === 0 ? (
                <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, py: 4, textAlign: 'center' }}>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                        Архив пуст. Проверенные из Outreach появятся здесь.
                    </Typography>
                </Box>
            ) : (
                <DataGrid
                    rows={rows}
                    columns={columns}
                    density="compact"
                    autoHeight
                    disableRowSelectionOnClick
                    onRowClick={(params) => onView(params.row)}
                    hideFooter={hideFooterIfFits(rows.length)}
                    pageSizeOptions={[25, 50, 100]}
                    initialState={{ pagination: { paginationModel: { pageSize: 100 } } }}
                    sx={{ ...dataGridSx, '& .MuiDataGrid-row': { cursor: 'pointer' } }}
                />
            )}
        </Box>
    )
}
