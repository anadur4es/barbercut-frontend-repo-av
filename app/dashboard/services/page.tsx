"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function SelectServicePage() {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const services = [
    { id: "corte", name: "Corte" },
    { id: "tintura", name: "Tintura" },
    { id: "barba", name: "Barba e bigode" },
    { id: "outro", name: "Outro" },
  ]

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-amber-100 via-amber-50 to-background">
      <div className="w-full max-w-sm">
        <Link href="/dashboard" className="text-primary font-semibold mb-6 block">
          ← Voltar
        </Link>

        <Card className="bg-white shadow-xl rounded-3xl p-8 border-0">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground text-balance">Como podemos ajudar!</h1>
          </div>

          <div className="space-y-3">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`w-full py-4 px-4 rounded-full font-semibold text-lg transition ${
                  selectedService === service.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/20 text-primary hover:bg-primary/30"
                }`}
              >
                {service.name}
              </button>
            ))}
          </div>

          <Link href="/dashboard/scheduling" className="block mt-8">
            <Button
              disabled={!selectedService}
              className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full text-lg disabled:opacity-50"
            >
              Continuar
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  )
}
