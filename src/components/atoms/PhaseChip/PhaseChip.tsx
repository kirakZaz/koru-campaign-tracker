import * as React from 'react'
import Chip from '@mui/material/Chip'
import type { PhaseChipProps } from './PhaseChip.types'
import { styles } from './PhaseChip.styles'

const PhaseChip = React.memo(function PhaseChip({ phase }: PhaseChipProps) {
    return (
        <Chip
            label={phase}
            size="small"
            sx={styles.chip(phase)}
        />
    )
})

export default PhaseChip
