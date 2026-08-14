import * as React from 'react'

export interface AuthUser {
    username: string
    name: string
}

interface StoredAuth {
    token: string
    user: AuthUser
}

const STORAGE_KEY = 'koru-auth'

function readStored(): StoredAuth | null {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return null
        const parsed = JSON.parse(raw)
        if (parsed && typeof parsed.token === 'string' && parsed.user?.username) {
            return parsed as StoredAuth
        }
        return null
    } catch {
        return null
    }
}

export function useAuth() {
    const [auth, setAuth] = React.useState<StoredAuth | null>(() => readStored())

    const login = React.useCallback(async (username: string, password: string) => {
        const res = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'login', username, password })
        })
        if (!res.ok) {
            throw new Error('Login failed')
        }
        const data = (await res.json()) as StoredAuth
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: data.token, user: data.user }))
        setAuth({ token: data.token, user: data.user })
    }, [])

    const logout = React.useCallback(() => {
        localStorage.removeItem(STORAGE_KEY)
        setAuth(null)
    }, [])

    const changePassword = React.useCallback(async (username: string, currentPassword: string, newPassword: string) => {
        const res = await fetch('/api/auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'set-password', username, password: currentPassword, newPassword })
        })
        if (!res.ok) {
            throw new Error('Failed to change password')
        }
    }, [])

    return { user: auth?.user ?? null, isAuthenticated: !!auth, login, logout, changePassword }
}
