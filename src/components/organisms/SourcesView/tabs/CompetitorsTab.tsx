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

import { THREAT_LABELS, cellSx, headCellSx, selectSx } from '../sources.constants'
import FilterSelect from '../components/FilterSelect'
import InlineInput from '../components/InlineInput'
import StatusChip from '../components/StatusChip'
import SortHeader from '../components/SortHeader'

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
    sortKey: string
    sortDir: 'asc' | 'desc'
    toggleSort: (key: string) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sorted: <T extends Record<string, any>>(items: T[]) => T[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filtered: <T extends Record<string, any>>(items: T[]) => T[]
}

export default function CompetitorsTab({
    local, filters, setFilter, clearFilters, addCompetitor, updateCompetitor, setDeleteConfirm,
    sortKey, sortDir, toggleSort, sorted, filtered,
}: CompetitorsTabProps) {
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
            <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#ffffff06' }}>
                            <SortHeader label="Название" field="name" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                            <TableCell sx={headCellSx}>Сайт</TableCell>
                            <TableCell sx={headCellSx}>Тип</TableCell>
                            <TableCell sx={headCellSx}>Цена</TableCell>
                            <TableCell sx={headCellSx}>Что делают</TableCell>
                            <TableCell sx={headCellSx}>Нет vs KORU</TableCell>
                            <TableCell sx={headCellSx}>LinkedIn</TableCell>
                            <SortHeader label="Угроза" field="threatLevel" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
                            <TableCell sx={headCellSx}>Заметки</TableCell>
                            <TableCell sx={{ ...headCellSx, width: 40 }} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {local.competitors.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={10} sx={{ ...cellSx, textAlign: 'center', color: 'text.secondary', py: 4 }}>
                                    Пока пусто. Нажми "Добавить" чтобы внести конкурента.
                                </TableCell>
                            </TableRow>
                        )}
                        {sorted(filtered(local.competitors as SourceCompetitor[])).map((c: SourceCompetitor) => (
                            <TableRow key={c.id} sx={{ '&:hover': { backgroundColor: '#ffffff04' } }}>
                                <TableCell sx={{ ...cellSx, fontWeight: 600 }}><InlineInput value={c.name} onChange={v => updateCompetitor(c.id, { name: v })} placeholder="Название" /></TableCell>
                                <TableCell sx={cellSx}><InlineInput value={c.url} onChange={v => updateCompetitor(c.id, { url: v })} placeholder="https://..." /></TableCell>
                                <TableCell sx={cellSx}><InlineInput value={c.type} onChange={v => updateCompetitor(c.id, { type: v })} placeholder="GEO monitor / SEO agent" /></TableCell>
                                <TableCell sx={cellSx}><InlineInput value={c.pricing} onChange={v => updateCompetitor(c.id, { pricing: v })} placeholder="$97/mo" /></TableCell>
                                <TableCell sx={cellSx}><InlineInput value={c.features} onChange={v => updateCompetitor(c.id, { features: v })} placeholder="Keywords, articles..." /></TableCell>
                                <TableCell sx={cellSx}><InlineInput value={c.missingVsKoru} onChange={v => updateCompetitor(c.id, { missingVsKoru: v })} placeholder="No GEO, no AI viz..." /></TableCell>
                                <TableCell sx={cellSx}><InlineInput value={c.linkedinPerson} onChange={v => updateCompetitor(c.id, { linkedinPerson: v })} placeholder="Founder name" /></TableCell>
                                <TableCell sx={cellSx}>
                                    <Select
                                        size="small"
                                        value={c.threatLevel}
                                        onChange={e => updateCompetitor(c.id, { threatLevel: e.target.value as CompetitorThreatLevel })}
                                        sx={selectSx}
                                        renderValue={(val) => <StatusChip {...THREAT_LABELS[val as CompetitorThreatLevel]} />}
                                    >
                                        {Object.entries(THREAT_LABELS).map(([k, v]) => (
                                            <MenuItem key={k} value={k} sx={{ fontSize: '0.8rem' }}><StatusChip {...v} /></MenuItem>
                                        ))}
                                    </Select>
                                </TableCell>
                                <TableCell sx={cellSx}><InlineInput value={c.notes} onChange={v => updateCompetitor(c.id, { notes: v })} placeholder="..." /></TableCell>
                                <TableCell sx={cellSx}>
                                    <IconButton size="small" onClick={() => setDeleteConfirm({ id: c.id, name: c.name || 'без названия', type: 'competitor' })} sx={{ color: 'text.secondary', '&:hover': { color: 'error.main' } }}>
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
