import * as React from 'react'
import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded'
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded'

import { headCellSx } from '../sources.constants'

export default function SortHeader({ label, field, activeField, direction, onSort, children }: { label: string, field: string, activeField: string, direction: 'asc' | 'desc', onSort: (f: string) => void, children?: React.ReactNode }) {
    const active = activeField === field
    return (
        <TableCell sx={headCellSx}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', userSelect: 'none', '&:hover': { color: 'text.primary' } }} onClick={() => onSort(field)}>
                {label}
                {children}
                {active && (direction === 'asc'
                    ? <ArrowUpwardRoundedIcon sx={{ fontSize: '0.65rem' }} />
                    : <ArrowDownwardRoundedIcon sx={{ fontSize: '0.65rem' }} />
                )}
            </Box>
        </TableCell>
    )
}
