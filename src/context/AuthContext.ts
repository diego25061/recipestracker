import { create } from 'zustand'

const JWT_KEY = 'jwt'

interface AuthContextType {
    jwt: string | null
    setJwt: (token: string | null) => void
    isAuthenticated: boolean
    logout: () => void
}

export const useAuthStore = create<AuthContextType>((set) => ({
    jwt: localStorage.getItem(JWT_KEY),
    isAuthenticated: !!localStorage.getItem(JWT_KEY),

    setJwt: (token) => {
        if (token) {
            localStorage.setItem(JWT_KEY, token)
            set({ jwt: token, isAuthenticated: true })
        } else {
            localStorage.removeItem(JWT_KEY)
            set({ jwt: null, isAuthenticated: false })
        }
    },

    logout: () => {
        localStorage.removeItem(JWT_KEY)
        set({ jwt: null, isAuthenticated: false })
    }
}))
