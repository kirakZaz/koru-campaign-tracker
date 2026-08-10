import Chip from '@mui/material/Chip'

export default function StatusChip({ label, color }: { label: string, color: string }) {
    return <Chip label={label} size="small" sx={{ fontSize: '0.7rem', height: 22, fontWeight: 600, backgroundColor: color + '22', color, border: `1px solid ${color}44` }} />
}
