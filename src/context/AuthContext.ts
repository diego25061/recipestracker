import type { LoginUserData } from '@/models/Auth'
import { isDefinedNotEmpty } from '@/utils/common'
import { create } from 'zustand'

const JWT_KEY = 'jwt'
const USERDATA_KEY = 'user_data'

interface AuthContextType {
    jwt: string | null
    setJwt: (token: string | null) => void
    isAuthenticated: boolean
    logout: () => void

    userData: LoginUserData | null
    setUserData: (userData: LoginUserData) => void
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
        localStorage.removeItem(USERDATA_KEY)
        set({ jwt: null, isAuthenticated: false, userData: null })
    },

    userData: isDefinedNotEmpty(localStorage.getItem(USERDATA_KEY)) ? JSON.parse(localStorage.getItem(USERDATA_KEY)!) : null,
    setUserData: (userData) => {
        if (userData) {
            localStorage.setItem(USERDATA_KEY, JSON.stringify(userData))
            set({ userData })
        } else {
            localStorage.removeItem(USERDATA_KEY)
            set({ userData: null })
        }
    }

}))
