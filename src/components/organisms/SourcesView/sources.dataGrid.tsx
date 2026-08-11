import Box from '@mui/material/Box'
import type { ReactNode } from 'react'

/** Shared sx for the DataGrid-based tables — compact, dark, matches the app's
 *  table look. Column resizing is on by default (MUI X Community v7+). */
export const dataGridSx = {
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 1,
    '& .MuiDataGrid-columnHeaders': { backgroundColor: '#ffffff06' },
    '& .MuiDataGrid-columnHeaderTitle': {
        fontSize: '0.7rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        color: 'text.secondary',
    },
    '& .MuiDataGrid-cell': {
        fontSize: '0.8rem',
        display: 'flex',
        alignItems: 'center',
    },
    '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
        outline: 'none',
    },
}

/** Community DataGrid always paginates (max 100 rows/page). Hide the footer only
 *  while everything fits on one page; once rows exceed 100 the footer must show so
 *  the extra rows stay reachable. */
export const hideFooterIfFits = (rowCount: number) => rowCount <= 100

/** Stop DataGrid from hijacking clicks/keys so the always-open inline editors
 *  inside cells behave like normal inputs. */
export const editable = (node: ReactNode) => (
    <Box onClick={e => e.stopPropagation()} onKeyDown={e => e.stopPropagation()} sx={{ width: '100%' }}>
        {node}
    </Box>
)