"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ProfessionalsPage() {
  const [selectedProfessional, setSelectedProfessional] = useState<string | null>(null)

  const professionals = [
    { id: 1, name: "Sergio Reis", specialty: "Corte, Tintura", image: "👨‍💼" },
    { id: 2, name: "Rafael Ribeiro", specialty: "Corte, Barba", image: "👨‍💼" },
    { id: 3, name: "Pedro Baldraia", specialty: "Tintura, Barba", image: "👨‍💼" },
  ]

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-amber-100 via-amber-50 to-background">
      <div className="w-full max-w-sm">
        <Link href="/dashboard/scheduling" className="text-primary font-semibold mb-6 block">
          ← Voltar
        </Link>

        <Card className="bg-white shadow-xl rounded-3xl p-8 border-0">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground text-balance">
              Agende um barbeiro, selecione o barbeiro disponível.
            </h1>
          </div>

          <div className="space-y-3">
            {professionals.map((prof) => (
              <button
                key={prof.id}
                onClick={() => setSelectedProfessional(prof.id.toString())}
                className={`w-full p-4 rounded-2xl font-semibold transition flex items-center gap-3 ${
                  selectedProfessional === prof.id.toString()
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/10 text-foreground hover:bg-primary/20"
                }`}
              >
                <span className="text-3xl">{prof.image}</span>
                <div className="text-left">
                  <p className="font-bold">{prof.name}</p>
                  <p className="text-xs opacity-75">{prof.specialty}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="flex gap-3 mt-8">
            <Button
              variant="outline"
              className="flex-1 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary/10 bg-transparent"
            >
            <Link href="/dashboard/scheduling" className="text-primary font-semibold mb-6 block"></Link>
              Cancelar
            </Button>
            <Link href="/dashboard/payment" className="flex-1">
              <Button
                disabled={!selectedProfessional}
                className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full disabled:opacity-50"
              >
                Confirmar
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
