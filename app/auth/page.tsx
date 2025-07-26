// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { useAuth } from "@/components/AuthProvider"
// import { Eye, EyeOff, Mail, Lock, User, UserCheck } from "lucide-react"

// export default function AuthPage() {
//   const [isLogin, setIsLogin] = useState(true)
//   const [showPassword, setShowPassword] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     fullName: "",
//     role: "",
//   })
//   const [error, setError] = useState("")

//   const { signIn, signUp } = useAuth()
//   const router = useRouter()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     setError("")

//     try {
//       if (isLogin) {
//         const { error } = await signIn(formData.email, formData.password)
//         if (error) throw error
//         router.push("/dashboard")
//       } else {
//         const { error } = await signUp(formData.email, formData.password, formData.fullName, formData.role)
//         if (error) throw error
//         router.push("/dashboard")
//       }
//     } catch (error: any) {
//       setError(error.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen pt-20 flex items-center justify-center px-4">
//       <div className="max-w-md w-full">
//         <div className="morphism-card p-8">
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mb-4 flex items-center justify-center">
//               <UserCheck className="h-10 w-10 text-white" />
//             </div>
//             <h2 className="text-3xl font-bold gradient-text mb-2">{isLogin ? "Welcome Back" : "Join Us"}</h2>
//             <p className="text-white/70">{isLogin ? "Sign in to your account" : "Create your account"}</p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {!isLogin && (
//               <div>
//                 <label className="block text-white/80 text-sm font-medium mb-2">Full Name</label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
//                   <input
//                     type="text"
//                     required
//                     value={formData.fullName}
//                     onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//                     className="w-full pl-10 pr-4 py-3 rounded-xl glass-card border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
//                     placeholder="Enter your full name"
//                   />
//                 </div>
//               </div>
//             )}

//             <div>
//               <label className="block text-white/80 text-sm font-medium mb-2">Email Address</label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
//                 <input
//                   type="email"
//                   required
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   className="w-full pl-10 pr-4 py-3 rounded-xl glass-card border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
//                   placeholder="Enter your email"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-white/80 text-sm font-medium mb-2">Password</label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   required
//                   value={formData.password}
//                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                   className="w-full pl-10 pr-12 py-3 rounded-xl glass-card border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
//                 >
//                   {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                 </button>
//               </div>
//             </div>

//             {!isLogin && (
//               <div>
//                 <label className="block text-white/80 text-sm font-medium mb-2">Role</label>
//                 <select
//                   value={formData.role}
//                   onChange={(e) => setFormData({ ...formData, role: e.target.value })}
//                   className="w-full px-4 py-3 rounded-xl glass-card border border-white/20 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
//                 >
//                   <option value="student" className="bg-slate-800">
//                     Student
//                   </option>
//                   <option value="parent" className="bg-slate-800">
//                     Parent
//                   </option>
//                   <option value="staff" className="bg-slate-800">
//                     Staff
//                   </option>
//                 </select>
//               </div>
//             )}

//             {error && (
//               <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-sm">{error}</div>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full btn-web3 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <span>{loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}</span>
//             </button>
//           </form>

//           {/* Toggle */}
//           <div className="text-center mt-6">
//             <button
//               onClick={() => setIsLogin(!isLogin)}
//               className="text-cyan-400 hover:text-purple-400 transition-colors duration-300"
//             >
//               {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/AuthProvider"
import { Eye, EyeOff, Mail, Lock, User, UserCheck } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    role: "",
  })
  const [error, setError] = useState("")

  const { signIn, signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password)
        if (error) throw error
        router.push("/dashboard")
      } else {
        const { error } = await signUp(formData.email, formData.password, formData.fullName, formData.role)
        if (error) throw error

        setSuccess("✅ Please check your email to confirm your account before logging in.")
        setIsLogin(true)
      }
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setError("Please enter your email to reset password.")
      return
    }

    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: `${window.location.origin}/auth/reset`, // or your password reset page
      })

      if (error) throw error

      setSuccess("📧 Password reset link sent to your email.")
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="morphism-card p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mb-4 flex items-center justify-center">
              <UserCheck className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold gradient-text mb-2">{isLogin ? "Welcome Back" : "Join Us"}</h2>
            <p className="text-white/70">{isLogin ? "Sign in to your account" : "Create your account"}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl glass-card border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-card border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 rounded-xl glass-card border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass-card border border-white/20 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
                >
                  <option value="student" className="bg-slate-800">Student</option>
                  <option value="parent" className="bg-slate-800">Parent</option>
                  <option value="staff" className="bg-slate-800">Staff</option>
                </select>
              </div>
            )}

            {error && <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-sm">{error}</div>}
            {success && <div className="p-3 rounded-xl bg-green-500/20 border border-green-500/30 text-green-300 text-sm">{success}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-web3 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}</span>
            </button>
          </form>

          {/* Extra links */}
          <div className="text-center mt-6 space-y-2">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-cyan-400 hover:text-purple-400 transition-colors duration-300"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>

            {isLogin && (
              <button
                onClick={handleForgotPassword}
                className="block text-sm text-white/50 hover:text-white/80 mx-auto mt-2"
              >
                Forgot Password?
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
