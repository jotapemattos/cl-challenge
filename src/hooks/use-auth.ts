import { create } from 'zustand'

const USERNAME_KEY = 'username'

interface AuthState {
  username: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (username: string) => void
  logout: () => void
  initialize: () => void
}

export const useAuth = create<AuthState>((set) => ({
  username: null,
  isAuthenticated: false,
  isLoading: true,

  initialize: () => {
    const storedUsername = localStorage.getItem(USERNAME_KEY)
    set({
      username: storedUsername,
      isAuthenticated: !!storedUsername,
      isLoading: false,
    })
  },

  login: (username: string) => {
    localStorage.setItem(USERNAME_KEY, username)
    set({
      username,
      isAuthenticated: true,
    })
  },

  logout: () => {
    localStorage.removeItem(USERNAME_KEY)
    set({
      username: null,
      isAuthenticated: false,
    })
  },
}))

// Initialize auth state on module load
useAuth.getState().initialize()
