const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export const api = {
  // Auth endpoints
  async signup(data: { name: string; email: string; phone: string; password: string }) {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    return response.json()
  },

  // User endpoints
  async getUser(token: string) {
    const response = await fetch(`${API_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.json()
  },

  // Services endpoints
  async getServices() {
    const response = await fetch(`${API_URL}/services`)
    return response.json()
  },

  // Professionals endpoints
  async getProfessionals() {
    const response = await fetch(`${API_URL}/professionals`)
    return response.json()
  },

  // Appointments endpoints
  async createAppointment(
    token: string,
    data: {
      service_id: number
      professional_id: number
      appointment_date: string
      appointment_time: string
    },
  ) {
    const response = await fetch(`${API_URL}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  async getAppointments(token: string) {
    const response = await fetch(`${API_URL}/appointments`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.json()
  },

  // Payments endpoints
  async createPayment(token: string, data: { appointment_id: number; method: string; amount: number }) {
    const response = await fetch(`${API_URL}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  // Reviews endpoints
  async createReview(token: string, data: { appointment_id: number; rating: number; comment?: string }) {
    const response = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    return response.json()
  },

  async getProfessionalReviews(professionalId: number) {
    const response = await fetch(`${API_URL}/reviews/${professionalId}`)
    return response.json()
  },
}
