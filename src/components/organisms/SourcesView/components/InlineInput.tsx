import TextField from '@mui/material/TextField'

import { inputSx } from '../sources.constants'

export default function InlineInput({ value, onChange, placeholder }: { value: string, onChange: (v: string) => void, placeholder?: string }) {
    return (
        <TextField
            size="small"
            fullWidth
            variant="outlined"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            sx={inputSx}
        />
    )
}
