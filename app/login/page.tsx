"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { localStorageService } from "@/lib/local-storage"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const user = localStorageService.loginUser(formData.email, formData.password)

      if (!user) {
        setError("Email ou senha incorretos")
        setLoading(false)
        return
      }

      localStorageService.setCurrentUser(user)
      router.push("/dashboard")
    } catch (err) {
      console.error("[v0] Login error:", err)
      setError("Erro ao fazer login. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-amber-100 via-amber-50 to-background">
      <div className="w-full max-w-sm">
        <Link href="/" className="text-primary font-semibold mb-6 block">
          ← Voltar
        </Link>

        <Card className="bg-white shadow-xl rounded-3xl p-8 border-0">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-full w-24 h-24 flex items-center justify-center mx-auto shadow-lg mb-4">
              <div className="text-white text-2xl font-bold">S</div>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Login</h1>
          </div>

          {error && <div className="bg-destructive/20 text-destructive p-3 rounded-lg mb-4 text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-primary mb-2 block">Email</label>
              <Input
                type="email"
                name="email"
                placeholder="josecarlos@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full bg-white border-2 border-primary rounded-full px-4 py-3 text-foreground placeholder:text-muted-foreground disabled:opacity-50"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-primary mb-2 block">Senha</label>
              <Input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full bg-white border-2 border-primary rounded-full px-4 py-3 text-foreground placeholder:text-muted-foreground disabled:opacity-50"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full text-lg disabled:opacity-50"
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>

            <div className="text-center mt-6">
              <p className="text-muted-foreground">
                Não tem conta?{" "}
                <Link href="/signup" className="text-primary font-semibold hover:underline">
                  Cadastrar
                </Link>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
