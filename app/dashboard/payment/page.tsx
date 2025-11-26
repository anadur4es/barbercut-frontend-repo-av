"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/auth"
import { api } from "@/lib/api"

export default function PaymentPage() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState<"credit" | "pix" | "cash" | null>(null)
  const [loading, setLoading] = useState(false)
  const [appointmentData, setAppointmentData] = useState<any>(null)

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      router.push("/login")
    }

    const data = localStorage.getItem("appointment_data")
    if (data) {
      setAppointmentData(JSON.parse(data))
    }
  }, [router])

  const handlePayment = async () => {
    if (!paymentMethod || !appointmentData) return

    setLoading(true)
    try {
      const token = auth.getToken()
      if (!token) {
        router.push("/login")
        return
      }

      await api.createPayment(token, {
        appointment_id: appointmentData.appointment_id,
        method: paymentMethod,
        amount: appointmentData.amount,
      })

      localStorage.setItem("payment_completed", "true")
      router.push("/dashboard/evaluation")
    } catch (error) {
      console.error("Payment error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-amber-100 via-amber-50 to-background">
      <div className="w-full max-w-sm">
        <Link href="/dashboard/professionals" className="text-primary font-semibold mb-6 block">
          ← Voltar
        </Link>

        <Card className="bg-white shadow-xl rounded-3xl p-8 border-0">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground">Forma de Pagamento</h1>
          </div>

          <div className="space-y-3 mb-6">
            {[
              { value: "credit", label: "💳 Cartão de crédito" },
              { value: "pix", label: "Pix" },
              { value: "cash", label: "💰 Dinheiro na barbearia" },
            ].map((method) => (
              <button
                key={method.value}
                onClick={() => setPaymentMethod(method.value as any)}
                className={`w-full p-4 rounded-xl text-left font-semibold transition ${
                  paymentMethod === method.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/10 text-foreground hover:bg-primary/20"
                }`}
              >
                {method.label}
              </button>
            ))}
          </div>

          <div className="bg-muted p-4 rounded-xl mb-6">
            <p className="text-sm font-semibold text-foreground mb-3">Serviço:</p>
            <p className="text-sm text-foreground mb-4">{appointmentData?.service_name || "Corte de cabelo"}</p>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-primary">Total</span>
              <span className="text-2xl font-bold text-primary">R$ {appointmentData?.amount || "50,00"}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary/10 bg-transparent"
            >
              Cancelar
            </Button>
            <Button
              disabled={!paymentMethod || loading}
              onClick={handlePayment}
              className="flex-1 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full disabled:opacity-50"
            >
              {loading ? "Processando..." : "Confirmar"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
