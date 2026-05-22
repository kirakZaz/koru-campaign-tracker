import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#3fb68e'
        },
        secondary: {
            main: '#6c8eff'
        },
        background: {
            default: '#0d1117',
            paper: '#161b22'
        },
        text: {
            primary: '#e6edf3',
            secondary: '#8b949e'
        },
        divider: '#30363d',
        error: {
            main: '#f85149'
        },
        warning: {
            main: '#d29922'
        },
        success: {
            main: '#3fb68e'
        },
        info: {
            main: '#6c8eff'
        }
    },
    typography: {
        fontFamily: '"Raleway", sans-serif',
        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 600 },
        h4: { fontWeight: 600 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 }
    },
    shape: {
        borderRadius: 8
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#30363d #0d1117'
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none'
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    fontWeight: 600
                }
            }
        }
    }
})
