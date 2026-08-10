import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

export default function FilterSelect({ label, value, options, onChange }: { label: string, value: string, options: string[], onChange: (v: string) => void }) {
    return (
        <Select
            size="small"
            value={value}
            onChange={e => onChange(e.target.value)}
            displayEmpty
            endAdornment={value ? (
                <IconButton size="small" onClick={(e) => { e.stopPropagation(); onChange('') }} sx={{ p: 0, mr: 1.5, color: 'text.secondary', '&:hover': { color: 'error.main' } }}>
                    <CloseRoundedIcon sx={{ fontSize: '0.75rem' }} />
                </IconButton>
            ) : null}
            sx={{ fontSize: '0.75rem', minWidth: 90, height: 28, '& .MuiSelect-select': { py: 0.25, px: 1, pr: value ? '32px !important' : undefined }, '& .MuiOutlinedInput-notchedOutline': { borderColor: value ? 'primary.main' : 'divider' } }}
        >
            <MenuItem value="" sx={{ fontSize: '0.75rem' }}>{label}: все</MenuItem>
            {options.map(o => <MenuItem key={o} value={o} sx={{ fontSize: '0.75rem' }}>{o}</MenuItem>)}
        </Select>
    )
}
