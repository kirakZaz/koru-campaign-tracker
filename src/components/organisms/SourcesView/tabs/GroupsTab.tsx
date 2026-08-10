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
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded'

import { GROUP_STATUS_LABELS, cellSx, headCellSx, inputSx, selectSx } from '../sources.constants'
import FilterSelect from '../components/FilterSelect'
import InlineInput from '../components/InlineInput'
import StatusChip from '../components/StatusChip'
import SortHeader from '../components/SortHeader'

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
    sortKey: string
    sortDir: 'asc' | 'desc'
    toggleSort: (key: string) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    uniqueVals: <T extends Record<string, any>>(items: T[], key: string) => string[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sorted: <T extends Record<string, any>>(items: T[]) => T[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filtered: <T extends Record<string, any>>(items: T[]) => T[]
}

export default function GroupsTab({
    local, filters, setFilter, clearFilters, addGroup, updateGroup, setDeleteConfirm,
    sortKey, sortDir, toggleSort, uniqueVals, sorted, filtered,
}: GroupsTabProps) {
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
            <TableContainer sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#ffffff06' }}>
                            <SortHeader label="#" field="priority" activeField={sortKey} direction={sortDir} onSort={toggleSort} />
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
                                <TableCell colSpan={10} sx={{ ...cellSx, textAlign: 'center', color: 'text.secondary', py: 4 }}>
                                    Пока пусто. Нажми "Добавить" чтобы внести группу.
                                </TableCell>
                            </TableRow>
                        )}
                        {sorted(filtered(local.groups as SourceGroup[])).map((g) => (
                            <TableRow key={g.id} sx={{ '&:hover': { backgroundColor: '#ffffff04' } }}>
                                <TableCell sx={{ ...cellSx, width: 50 }}>
                                    <TextField size="small" type="number" variant="outlined" value={g.priority || 0} onChange={e => updateGroup(g.id, { priority: parseInt(e.target.value) || 0 })} sx={{ ...inputSx, width: 45, '& .MuiInputBase-input': { fontSize: '0.8rem', py: 0.25, px: 0.5, textAlign: 'center' } }} inputProps={{ min: 0, max: 99 }} />
                                </TableCell>
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
    )
}
