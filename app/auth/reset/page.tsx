"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [newPassword, setNewPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    const hash = window.location.hash
    const token = new URLSearchParams(hash.substring(1)).get("access_token")

    if (!token) {
      setError("Invalid or expired reset link.")
    }
  }, [])

  const handleResetPassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }

    setLoading(true)
    setError("")
    setSuccess("")

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccess("✅ Password updated successfully! Redirecting...")
      setTimeout(() => router.push("/auth"), 3000)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-900">
      <div className="max-w-md w-full p-6 rounded-xl glass-card border border-white/20 text-white">
        <h1 className="text-2xl font-bold mb-4">Reset Your Password</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded text-red-300 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded text-green-300 text-sm">
            {success}
          </div>
        )}

        {!success && (
          <>
            <label className="block text-sm font-medium mb-2">New Password</label>
            <input
              type="password"
              className="w-full mb-4 px-4 py-3 rounded-xl bg-gray-800 border border-white/20 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              placeholder="Enter a new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full btn-web3 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
