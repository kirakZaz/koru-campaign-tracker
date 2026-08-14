import * as React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'

interface LoginViewProps {
    onLogin: (username: string, password: string) => Promise<void>
}

export default function LoginView({ onLogin }: LoginViewProps) {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            await onLogin(username.trim(), password)
        } catch {
            setError('Неверный логин или пароль')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                backgroundColor: 'background.default'
            }}
        >
            <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 380 }}>
                <Typography sx={{ fontWeight: 800, fontSize: '1.5rem', color: 'primary.main', letterSpacing: '-0.02em' }}>
                    KORU
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600, fontSize: '0.7rem' }}>
                    Campaign Tracker
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Email"
                        type="email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoFocus
                        fullWidth
                        autoComplete="username"
                    />
                    <TextField
                        label="Пароль"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        autoComplete="current-password"
                    />
                    {error && <Alert severity="error">{error}</Alert>}
                    <Button type="submit" variant="contained" size="large" disabled={loading || !username || !password}>
                        {loading ? 'Вход…' : 'Войти'}
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}
