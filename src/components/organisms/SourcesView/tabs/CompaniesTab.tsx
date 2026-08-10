import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded'

import { ICP_LABELS, COMPANY_STATUS_LABELS, cellSx, headCellSx, selectSx } from '../sources.constants'
import FilterSelect from '../components/FilterSelect'
import InlineInput from '../components/InlineInput'
import StatusChip from '../components/StatusChip'
import SortHeader from '../components/SortHeader'

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
    sortKey: string
    sortDir: 'asc' | 'desc'
    toggleSort: (key: string) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sorted: <T extends Record<string, any>>(items: T[]) => T[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filtered: <T extends Record<string, any>>(items: T[]) => T[]
}

export default function CompaniesTab({
    local, filters, setFilter, clearFilters, addCompany, updateCompany, setDeleteConfirm,
    sortKey, sortDir, toggleSort, sorted, filtered,
}: CompaniesTabProps) {
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
                        {sorted(filtered(local.companies as SourceCompany[])).map((c) => (
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
    )
}
