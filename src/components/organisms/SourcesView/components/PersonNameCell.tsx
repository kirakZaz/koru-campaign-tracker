import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import LockRoundedIcon from '@mui/icons-material/LockRounded'

/** Grid name cell with a red 🔒 badge when the person is premium-locked (can't DM).
 *  Shared by the Outreach and Archive tables. */
export default function PersonNameCell({ name, cantDm }: { name?: string, cantDm?: boolean }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 600, minWidth: 0 }}>
            {cantDm && (
                <Tooltip title="Premium — нельзя написать">
                    <LockRoundedIcon sx={{ fontSize: '0.9rem', color: '#f85149', flexShrink: 0 }} />
                </Tooltip>
            )}
            <Box component="span" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {name || '—'}
            </Box>
        </Box>
    )
}
