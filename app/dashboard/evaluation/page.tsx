"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/auth"
import { api } from "@/lib/api"

export default function EvaluationPage() {
  const router = useRouter()
  const [rating, setRating] = useState<number>(0)
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)
  const [userName, setUserName] = useState("Jose Carlos")

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      router.push("/login")
    }

    const fetchUser = async () => {
      const token = auth.getToken()
      if (token) {
        try {
          const user = await api.getUser(token)
          setUserName(user.name || "Jose Carlos")
        } catch (error) {
          console.error("Error fetching user:", error)
        }
      }
    }

    fetchUser()
  }, [router])

  const handleSubmit = async () => {
    if (rating === 0) return

    setLoading(true)
    try {
      const token = auth.getToken()
      const appointmentId = localStorage.getItem("current_appointment_id")

      if (!token || !appointmentId) {
        router.push("/login")
        return
      }

      await api.createReview(token, {
        appointment_id: Number.parseInt(appointmentId),
        rating,
        comment,
      })

      localStorage.removeItem("appointment_data")
      localStorage.removeItem("payment_completed")
      localStorage.removeItem("current_appointment_id")
      router.push("/dashboard")
    } catch (error) {
      console.error("Error submitting review:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-amber-100 via-amber-50 to-background">
      <div className="w-full max-w-sm">
        <Card className="bg-white shadow-xl rounded-3xl p-8 border-0">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground text-balance">
              Si, {userName}, obrigado por realizar este procedimento. Podemos melhor the servir.
            </h1>
          </div>

          <div className="mb-6">
            <p className="text-sm font-semibold text-primary mb-4 text-center">Como foi sua experiência?</p>
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-4xl transition transform hover:scale-110 ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-6">
            {["Péssimo", "Bom", "Ótimo"].map((label, idx) => (
              <button
                key={label}
                onClick={() => setRating(idx + 1)}
                className={`py-2 rounded-full font-semibold text-sm transition ${
                  rating === idx + 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/20 text-primary hover:bg-primary/30"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <label className="text-sm font-semibold text-primary mb-2 block">Breve comentário:</label>
            <Textarea
              placeholder="Deixe seu comentário sobre o serviço..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={loading}
              className="w-full border-2 border-primary rounded-xl px-4 py-3 resize-none disabled:opacity-50"
            />
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              disabled={loading}
              className="flex-1 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary/10 disabled:opacity-50 bg-transparent"
            >
              Cancelar
            </Button>
            <Button
              disabled={rating === 0 || loading}
              onClick={handleSubmit}
              className="flex-1 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Confirmar"}
            </Button>
          </div>

          <Link href="/dashboard" className="block text-center mt-6 text-primary font-semibold hover:underline text-sm">
            Voltar ao menu principal
          </Link>
        </Card>
      </div>
    </div>
  )
}
