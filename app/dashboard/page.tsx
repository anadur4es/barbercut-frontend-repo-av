"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { localStorageService } from "@/lib/local-storage"

export default function DashboardPage() {
  const router = useRouter()
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const currentUser = localStorageService.getCurrentUser()
    if (!currentUser) {
      router.push("/login")
      return
    }
    setUserName(currentUser.name)
  }, [router])

  const handleLogout = () => {
    localStorageService.logout()
    router.push("/")
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-amber-100 via-amber-50 to-background">
      <div className="w-full max-w-sm">
        <Card className="bg-white shadow-xl rounded-3xl p-8 border-0">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground text-balance">Ola {userName}, escolha uma janela!</h1>
          </div>

          <div className="space-y-4">
            <Link href="/dashboard/services" className="block">
              <Button className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
                Serviços
              </Button>
            </Link>

            <Link href="/dashboard/scheduling" className="block">
              <Button className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
                Agendamento
              </Button>
            </Link>

            <Link href="/dashboard/evaluation" className="block">
              <Button className="w-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-full">
                Avaliação
              </Button>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <button onClick={handleLogout} className="text-primary font-semibold hover:underline text-sm">
              Sair
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}
