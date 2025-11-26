"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function SplashScreen() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between p-6 bg-gradient-to-b from-amber-100 via-amber-50 to-background relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-primary/20"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-accent/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 gap-12">
        <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center shadow-lg">
          <Image src="/barber-logo.jpg" alt="The Barber Cut Logo" width={100} height={100} className="w-24 h-24" />
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">The BARBER CUT</h1>
          <p className="text-sm text-muted-foreground mt-1">Sua barbearia online</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <Link href="/login" className="w-full">
            <Button className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
              Entrar
            </Button>
          </Link>

          <Link href="/signup" className="w-full">
            <Button className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
              Cadastrar
            </Button>
          </Link>

          <Link href="/services" className="w-full">
            <Button
              variant="outline"
              className="w-full py-6 text-lg font-semibold border-2 border-primary text-primary rounded-full hover:bg-primary/10 bg-transparent"
            >
              Serviços
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center text-sm text-muted-foreground">
        <p>Agendamentos de qualidade</p>
      </div>
    </div>
  )
}
