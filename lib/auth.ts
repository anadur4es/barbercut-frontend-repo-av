import { localStorageService } from "./local-storage"

export const auth = {
  async signup(data: { name: string; email: string; phone: string; password: string }) {
    // Check if email already exists
    const existingUser = localStorageService.getUserByEmail(data.email)
    if (existingUser) {
      return { error: "Email já cadastrado" }
    }

    // Save new user
    const user = localStorageService.saveUser(data)
    localStorageService.setCurrentUser(user)
    return { message: "Cadastro realizado com sucesso", user }
  },

  async login(email: string, password: string) {
    const user = localStorageService.loginUser(email, password)
    if (!user) {
      return { error: "Email ou senha incorretos" }
    }

    localStorageService.setCurrentUser(user)
    return { message: "Login realizado com sucesso", user }
  },

  logout() {
    localStorageService.logout()
  },

  isAuthenticated() {
    return !!localStorageService.getCurrentUser()
  },

  getCurrentUser() {
    return localStorageService.getCurrentUser()
  },
}
