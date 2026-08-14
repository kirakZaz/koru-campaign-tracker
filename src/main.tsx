import * as React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from '@/theme/theme'
import App from '@/App'
import LoginView from '@/components/organisms/LoginView/LoginView'
import { useAuth } from '@/hooks/useAuth'

function Root() {
    const { user, isAuthenticated, login, logout, changePassword } = useAuth()
    if (!isAuthenticated || !user) {
        return <LoginView onLogin={login} />
    }
    return <App currentUser={user} onLogout={logout} onChangePassword={changePassword} />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Root />
        </ThemeProvider>
    </React.StrictMode>
)
