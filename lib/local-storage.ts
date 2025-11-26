// Sistema de autenticação local usando localStorage
// Sem dependência de backend - tudo funciona no browser

export interface User {
  id: string
  name: string
  email: string
  phone: string
  password: string
}

export interface LocalStorageService {
  getUsers: () => User[]
  getUserByEmail: (email: string) => User | null
  saveUser: (user: Omit<User, "id">) => User
  loginUser: (email: string, password: string) => User | null
  getCurrentUser: () => User | null
  setCurrentUser: (user: User | null) => void
  logout: () => void
}

const STORAGE_KEY = "barber_users"
const CURRENT_USER_KEY = "barber_current_user"

export const localStorageService: LocalStorageService = {
  getUsers: () => {
    try {
      const users = localStorage.getItem(STORAGE_KEY)
      return users ? JSON.parse(users) : []
    } catch {
      return []
    }
  },

  getUserByEmail: (email: string) => {
    const users = localStorageService.getUsers()
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null
  },

  saveUser: (userData) => {
    const users = localStorageService.getUsers()
    const newUser: User = {
      id: Date.now().toString(),
      ...userData,
    }
    users.push(newUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
    return newUser
  },

  loginUser: (email: string, password: string) => {
    const user = localStorageService.getUserByEmail(email)
    if (user && user.password === password) {
      return user
    }
    return null
  },

  getCurrentUser: () => {
    try {
      const user = localStorage.getItem(CURRENT_USER_KEY)
      return user ? JSON.parse(user) : null
    } catch {
      return null
    }
  },

  setCurrentUser: (user: User | null) => {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(CURRENT_USER_KEY)
    }
  },

  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY)
  },
}
