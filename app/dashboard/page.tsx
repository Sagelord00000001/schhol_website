"use client"

import { useEffect, useState, Suspense } from "react"
import { useAuth } from "@/components/AuthProvider"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { AlertCircle } from "lucide-react"
import StaffDashboard from "@/components/dashboard/StaffDashboard"
import StudentDashboard from "@/components/dashboard/StudentDashboard"
import ParentDashboard from "@/components/dashboard/ParentDashboard"
import AdminDashboard from "@/components/dashboard/AdminDashboard"
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton"

type Profile = {
  id: string
  email: string
  full_name: string | null
  role: "student" | "parent" | "staff" | "admin"
  avatar_url: string | null
}

export default function Dashboard() {
  const { user, loading } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [profileLoading, setProfileLoading] = useState(true)
  const [profileError, setProfileError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth")
      return
    }

    if (user) {
      fetchProfile()
    }
  }, [user, loading, router])

  const fetchProfile = async () => {
    if (!user) return

    try {
      setProfileLoading(true)
      setProfileError(null)

      const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle()

      if (error) {
        console.error("Profile fetch error:", error)
        setProfileError(error.message)
        return
      }

      if (data) {
        setProfile(data)
      } else {
        await createProfile()
      }
    } catch (err: any) {
      console.error("Profile fetch error:", err)
      setProfileError(err.message)
    } finally {
      setProfileLoading(false)
    }
  }

  const createProfile = async () => {
    if (!user) return

    try {
      const profileData = {
        id: user.id,
        email: user.email || "",
        full_name: user.user_metadata?.full_name || null,
        role: (user.user_metadata?.role as "student" | "parent" | "staff" | "admin") || "student",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      const { data, error } = await supabase.from("profiles").insert(profileData).select().single()

      if (error) {
        if (error.code === "23505") {
          const { data: existingProfile } = await supabase.from("profiles").select("*").eq("id", user.id).single()
          if (existingProfile) {
            setProfile(existingProfile)
            return
          }
        }
        throw error
      }

      setProfile(data)
    } catch (err: any) {
      console.error("Profile creation failed:", err)
      setProfileError("Failed to create profile: " + err.message)
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "student":
        return "from-blue-400 to-cyan-500"
      case "parent":
        return "from-green-400 to-teal-500"
      case "staff":
        return "from-purple-400 to-pink-500"
      case "admin":
        return "from-red-400 to-orange-500"
      default:
        return "from-gray-400 to-gray-500"
    }
  }

  if (loading || profileLoading) {
    return <DashboardSkeleton />
  }

  if (profileError) {
    return (
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto py-8">
          <div className="morphism-card p-8 text-center">
            <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Dashboard Error</h2>
            <p className="text-white/70 mb-6">{profileError}</p>
            <div className="space-x-4">
              <button onClick={fetchProfile} className="btn-web3 px-6 py-3">
                <span>Try Again</span>
              </button>
              <button
                onClick={() => router.push("/")}
                className="px-6 py-3 rounded-xl glass-card-dark text-white hover:bg-white/10 transition-all duration-300"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const displayProfile = profile || {
    id: user.id,
    email: user.email || "",
    full_name: user.user_metadata?.full_name || null,
    role: "student" as const,
    avatar_url: null,
  }

  const renderRoleSpecificDashboard = () => {
    switch (displayProfile.role) {
      case "staff":
        return (
          <Suspense fallback={<DashboardSkeleton />}>
            <StaffDashboard profile={displayProfile} />
          </Suspense>
        )
      case "student":
        return (
          <Suspense fallback={<DashboardSkeleton />}>
            <StudentDashboard profile={displayProfile} />
          </Suspense>
        )
      case "parent":
        return (
          <Suspense fallback={<DashboardSkeleton />}>
            <ParentDashboard profile={displayProfile} />
          </Suspense>
        )
      case "admin":
        return (
          <Suspense fallback={<DashboardSkeleton />}>
            <AdminDashboard profile={displayProfile} />
          </Suspense>
        )
      default:
        return (
          <Suspense fallback={<DashboardSkeleton />}>
            <StudentDashboard profile={displayProfile} />
          </Suspense>
        )
    }
  }

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="morphism-card p-8 mb-8">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div
                className={`w-20 h-20 rounded-full bg-gradient-to-r ${getRoleColor(displayProfile.role)} flex items-center justify-center`}
              >
                <span className="text-2xl font-bold text-white">
                  {displayProfile.full_name?.charAt(0) || displayProfile.email.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">Welcome back, {displayProfile.full_name || "User"}!</h1>
              <p className="text-white/70 text-lg capitalize">{displayProfile.role} Dashboard</p>
              <div className="flex items-center mt-2 space-x-4">
                <span className="text-sm text-white/60">{displayProfile.email}</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getRoleColor(displayProfile.role)} text-white`}
                >
                  {displayProfile.role.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Role-specific Dashboard Content */}
        {renderRoleSpecificDashboard()}
      </div>
    </div>
  )
}
