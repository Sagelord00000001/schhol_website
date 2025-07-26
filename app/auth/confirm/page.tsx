"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function ConfirmPage() {
  const [message, setMessage] = useState("Confirming your account...")
  const router = useRouter()

  useEffect(() => {
    const hash = window.location.hash
    const type = new URLSearchParams(hash.substring(1)).get("type")

    if (type === "signup") {
      setMessage("🎉 Your email has been confirmed successfully!")
      setTimeout(() => router.push("/dashboard"), 3000)
    } else if (type === "recovery") {
      // redirect to password reset page
      router.push("/auth/reset" + window.location.hash)
    } else {
      setMessage("Invalid confirmation link.")
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full p-6 rounded-xl glass-card border border-white/20 text-white text-center">
        <h1 className="text-xl font-bold mb-4">Account Status</h1>
        <p>{message}</p>
      </div>
    </div>
  )
}
