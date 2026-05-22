import * as React from 'react'
import Chip from '@mui/material/Chip'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'
import type { AssigneeChipProps } from './AssigneeChip.types'
import { styles } from './AssigneeChip.styles'

const AssigneeChip = React.memo(function AssigneeChip({ assignee }: AssigneeChipProps) {
    return (
        <Chip
            icon={<PersonOutlineRoundedIcon sx={{ fontSize: '1rem' }} />}
            label={assignee}
            size="small"
            sx={styles.chip(assignee)}
        />
    )
})

export default AssigneeChip
