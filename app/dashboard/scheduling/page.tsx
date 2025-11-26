"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/auth"

export default function SchedulingPage() {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      router.push("/login")
    }
  }, [router])

  const dates = ["Hoje disponível", "Amanhã", "27/11/25"]
  const times = ["09:00", "10:30", "14:30", "15:00", "16:00"]

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      localStorage.setItem("scheduling_date", selectedDate)
      localStorage.setItem("scheduling_time", selectedTime)
      router.push("/dashboard/professionals")
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-amber-100 via-amber-50 to-background">
      <div className="w-full max-w-sm">
        <Link href="/dashboard/services" className="text-primary font-semibold mb-6 block">
          ← Voltar
        </Link>

        <Card className="bg-white shadow-xl rounded-3xl p-8 border-0">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground text-balance">
              Agende um atendimento, selecione data e hora e crie um agendamento.
            </h1>
          </div>

          <div className="mb-6">
            <p className="text-sm font-semibold text-primary mb-3">Data</p>
            <div className="grid grid-cols-2 gap-2">
              {dates.map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`py-3 px-2 rounded-full font-semibold text-sm transition ${
                    selectedDate === date
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/20 text-primary hover:bg-primary/30"
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm font-semibold text-primary mb-3">Horário</p>
            <div className="grid grid-cols-3 gap-2">
              {times.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 rounded-full font-semibold text-sm transition ${
                    selectedTime === time
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/20 text-primary hover:bg-primary/30"
                  }`}
                >
                  {time}
                </button>
              ))}
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
              disabled={!selectedDate || !selectedTime}
              onClick={handleContinue}
              className="flex-1 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full disabled:opacity-50"
            >
              Avançar
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
