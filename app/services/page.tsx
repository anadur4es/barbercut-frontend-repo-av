"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ServicesPage() {
  const services = [
    { id: 1, name: "Corte", description: "Corte de cabelo profissional" },
    { id: 2, name: "Tintura", description: "Tingimento de cabelo" },
    { id: 3, name: "Barba e Bigode", description: "Design de barba e bigode" },
    { id: 4, name: "Outro", description: "Outros serviços" },
  ]

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-amber-100 via-amber-50 to-background">
      <div className="w-full max-w-sm">
        {/* Back button */}
        <Link href="/" className="text-primary font-semibold mb-6 block">
          ← Voltar
        </Link>

        <Card className="bg-white shadow-xl rounded-3xl p-8 border-0">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground text-balance">Nossos Serviços</h1>
          </div>

          <div className="space-y-3">
            {services.map((service) => (
              <Button
                key={service.id}
                variant="outline"
                className="w-full py-6 text-base font-semibold border-2 border-primary text-primary rounded-full hover:bg-primary/10 text-left justify-start bg-transparent"
              >
                {service.name}
              </Button>
            ))}
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Faça login para agendar seus serviços</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
