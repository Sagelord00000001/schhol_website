"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { BookOpen, Users, Calendar, Award, TrendingUp, Settings, Shield, Activity, Database, Plus, X, UserPlus, Trash2 } from 'lucide-react'

type Profile = {
  id: string
  email: string
  full_name: string | null
  role: "student" | "parent" | "staff" | "admin"
  avatar_url: string | null
  created_at?: string
  updated_at?: string
}

type AdminDashboardProps = {
  profile: Profile
}

type SystemStats = {
  totalUsers: number
  totalStudents: number
  totalStaff: number
  totalParents: number
  totalAssignments: number
  totalSubmissions: number
  recentActivity: number
}

type ParentStudentRelationship = {
  id: string
  parent: Profile
  student: Profile
  relationship_type: string
  created_at: string
}

export default function AdminDashboard({ profile }: AdminDashboardProps) {
  const [stats, setStats] = useState<SystemStats>({
    totalUsers: 0,
    totalStudents: 0,
    totalStaff: 0,
    totalParents: 0,
    totalAssignments: 0,
    totalSubmissions: 0,
    recentActivity: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [recentUsers, setRecentUsers] = useState<Profile[]>([])
  const [activeTab, setActiveTab] = useState<"overview" | "students" | "relationships">("overview")

  // Student Management
  const [students, setStudents] = useState<Profile[]>([])
  const [parents, setParents] = useState<Profile[]>([])
  const [relationships, setRelationships] = useState<ParentStudentRelationship[]>([])
  const [showAddRelationship, setShowAddRelationship] = useState(false)
  const [selectedParent, setSelectedParent] = useState("")
  const [selectedStudent, setSelectedStudent] = useState("")

  useEffect(() => {
    fetchSystemStats()
    fetchRecentUsers()
    if (activeTab === "students") {
      fetchStudents()
    }
    if (activeTab === "relationships") {
      fetchParentsAndStudents()
      fetchRelationships()
    }
  }, [activeTab])

  const fetchSystemStats = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch user counts by role
      const { data: profiles, error: profilesError } = await supabase.from("profiles").select("role")

      if (profilesError) throw profilesError

      // Fetch assignment count
      const { count: assignmentCount, error: assignmentError } = await supabase
        .from("assignments")
        .select("*", { count: "exact", head: true })

      if (assignmentError) throw assignmentError

      // Fetch submission count
      const { count: submissionCount, error: submissionError } = await supabase
        .from("submissions")
        .select("*", { count: "exact", head: true })

      if (submissionError) throw submissionError

      // Calculate role counts
      const roleCounts =
        profiles?.reduce(
          (acc, profile) => {
            acc[profile.role] = (acc[profile.role] || 0) + 1
            return acc
          },
          {} as Record<string, number>,
        ) || {}

      setStats({
        totalUsers: profiles?.length || 0,
        totalStudents: roleCounts.student || 0,
        totalStaff: roleCounts.staff || 0,
        totalParents: roleCounts.parent || 0,
        totalAssignments: assignmentCount || 0,
        totalSubmissions: submissionCount || 0,
        recentActivity: Math.floor(Math.random() * 50) + 10, // Mock data
      })
    } catch (err: any) {
      console.error("Failed to fetch system stats:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchRecentUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5)

      if (error) throw error

      setRecentUsers(data || [])
    } catch (err: any) {
      console.error("Failed to fetch recent users:", err)
    }
  }

  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "student")
        .order("full_name", { ascending: true })

      if (error) throw error

      setStudents(data || [])
    } catch (err: any) {
      console.error("Failed to fetch students:", err)
    }
  }

  const fetchParentsAndStudents = async () => {
    try {
      const [parentsResult, studentsResult] = await Promise.all([
        supabase.from("profiles").select("*").eq("role", "parent").order("full_name", { ascending: true }),
        supabase.from("profiles").select("*").eq("role", "student").order("full_name", { ascending: true }),
      ])

      if (parentsResult.error) throw parentsResult.error
      if (studentsResult.error) throw studentsResult.error

      setParents(parentsResult.data || [])
      setStudents(studentsResult.data || [])
    } catch (err: any) {
      console.error("Failed to fetch parents and students:", err)
    }
  }

  const fetchRelationships = async () => {
    try {
      const { data, error } = await supabase
        .from("parent_student_relationships")
        .select(`
          *,
          parent:profiles!parent_student_relationships_parent_id_fkey(*),
          student:profiles!parent_student_relationships_student_id_fkey(*)
        `)
        .order("created_at", { ascending: false })

      if (error) throw error

      setRelationships(data || [])
    } catch (err: any) {
      console.error("Failed to fetch relationships:", err)
    }
  }

  const handleAddRelationship = async () => {
    if (!selectedParent || !selectedStudent) {
      alert("Please select both a parent and a student")
      return
    }

    try {
      const { error } = await supabase.from("parent_student_relationships").insert({
        parent_id: selectedParent,
        student_id: selectedStudent,
        relationship_type: "parent",
      })

      if (error) throw error

      setShowAddRelationship(false)
      setSelectedParent("")
      setSelectedStudent("")
      fetchRelationships()
    } catch (err: any) {
      console.error("Failed to add relationship:", err)
      alert("Error adding relationship: " + err.message)
    }
  }

  const handleDeleteRelationship = async (relationshipId: string) => {
    if (!confirm("Are you sure you want to remove this parent-student relationship?")) {
      return
    }

    try {
      const { error } = await supabase.from("parent_student_relationships").delete().eq("id", relationshipId)

      if (error) throw error

      fetchRelationships()
    } catch (err: any) {
      console.error("Failed to delete relationship:", err)
      alert("Error removing relationship: " + err.message)
    }
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="morphism-card p-6 animate-pulse">
              <div className="h-8 w-8 bg-gray-700 rounded mb-4"></div>
              <div className="h-8 w-16 bg-gray-700 rounded mb-1"></div>
              <div className="h-4 w-24 bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="morphism-card p-8 text-center">
        <p className="text-red-400">Error loading admin dashboard: {error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="morphism-card p-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-3 rounded-xl transition-all duration-300 ${
              activeTab === "overview"
                ? "bg-blue-500/20 text-blue-400 border-2 border-blue-400"
                : "glass-card-dark text-white hover:bg-white/10"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("students")}
            className={`px-6 py-3 rounded-xl transition-all duration-300 ${
              activeTab === "students"
                ? "bg-blue-500/20 text-blue-400 border-2 border-blue-400"
                : "glass-card-dark text-white hover:bg-white/10"
            }`}
          >
            Manage Students
          </button>
          <button
            onClick={() => setActiveTab("relationships")}
            className={`px-6 py-3 rounded-xl transition-all duration-300 ${
              activeTab === "relationships"
                ? "bg-blue-500/20 text-blue-400 border-2 border-blue-400"
                : "glass-card-dark text-white hover:bg-white/10"
            }`}
          >
            Parent-Student Links
          </button>
        </div>
      </div>

      {activeTab === "overview" && (
        <>
          {/* System Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="morphism-card p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <Users className="h-8 w-8 text-blue-400" />
                <TrendingUp className="h-5 w-5 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stats.totalUsers}</h3>
              <p className="text-white/70">Total Users</p>
            </div>

            <div className="morphism-card p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="h-8 w-8 text-green-400" />
                <TrendingUp className="h-5 w-5 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stats.totalStudents}</h3>
              <p className="text-white/70">Students</p>
            </div>

            <div className="morphism-card p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <Shield className="h-8 w-8 text-purple-400" />
                <TrendingUp className="h-5 w-5 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stats.totalStaff}</h3>
              <p className="text-white/70">Staff Members</p>
            </div>

            <div className="morphism-card p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <Users className="h-8 w-8 text-cyan-400" />
                <TrendingUp className="h-5 w-5 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stats.totalParents}</h3>
              <p className="text-white/70">Parents</p>
            </div>

            <div className="morphism-card p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <Calendar className="h-8 w-8 text-yellow-400" />
                <TrendingUp className="h-5 w-5 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stats.totalAssignments}</h3>
              <p className="text-white/70">Assignments</p>
            </div>

            <div className="morphism-card p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <Award className="h-8 w-8 text-orange-400" />
                <TrendingUp className="h-5 w-5 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stats.totalSubmissions}</h3>
              <p className="text-white/70">Submissions</p>
            </div>

            <div className="morphism-card p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <Activity className="h-8 w-8 text-red-400" />
                <TrendingUp className="h-5 w-5 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stats.recentActivity}</h3>
              <p className="text-white/70">Active Today</p>
            </div>

            <div className="morphism-card p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <Database className="h-8 w-8 text-pink-400" />
                <TrendingUp className="h-5 w-5 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">99.9%</h3>
              <p className="text-white/70">System Health</p>
            </div>
          </div>

          {/* Management Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 morphism-card p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Users className="h-6 w-6 mr-2 text-blue-400" />
                Recent Users
              </h2>

              <div className="space-y-4">
                {recentUsers.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-white/70">No recent users found.</p>
                  </div>
                ) : (
                  recentUsers.map((user) => (
                    <div key={user.id} className="p-4 rounded-xl glass-card-dark">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center">
                            <span className="text-sm font-bold text-white">
                              {user.full_name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">{user.full_name || "Unnamed User"}</h3>
                            <p className="text-white/60 text-sm">{user.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              user.role === "admin"
                                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                : user.role === "staff"
                                  ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                                  : user.role === "parent"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                    : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            }`}
                          >
                            {user.role.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Admin Actions */}
            <div className="morphism-card p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Settings className="h-6 w-6 mr-2 text-purple-400" />
                Admin Actions
              </h2>
              <div className="space-y-4">
                <button onClick={() => setActiveTab("students")} className="w-full btn-web3 py-3">
                  <span>Manage Students</span>
                </button>
                <button
                  onClick={() => setActiveTab("relationships")}
                  className="w-full px-6 py-3 rounded-xl glass-card-dark text-white hover:bg-white/10 transition-all duration-300"
                >
                  Parent-Student Links
                </button>
                <button className="w-full px-6 py-3 rounded-xl glass-card-dark text-white hover:bg-white/10 transition-all duration-300">
                  System Settings
                </button>
                <button className="w-full px-6 py-3 rounded-xl glass-card-dark text-white hover:bg-white/10 transition-all duration-300">
                  View Reports
                </button>
                <button className="w-full px-6 py-3 rounded-xl glass-card-dark text-white hover:bg-white/10 transition-all duration-300">
                  Backup Data
                </button>
                <button className="w-full px-6 py-3 rounded-xl glass-card-dark text-white hover:bg-white/10 transition-all duration-300">
                  Security Logs
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "students" && (
        <div className="morphism-card p-6">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <BookOpen className="h-6 w-6 mr-2 text-blue-400" />
            Student Management
          </h2>

          {students.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No students found</h3>
              <p className="text-white/70">Students will appear here once they register.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map((student) => (
                <div key={student.id} className="p-6 rounded-xl glass-card-dark">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center">
                      <span className="text-lg font-bold text-white">
                        {student.full_name?.charAt(0) || student.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{student.full_name || "Unnamed Student"}</h3>
                      <p className="text-white/60 text-sm">{student.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      STUDENT
                    </span>
                    <span className="text-white/60 text-xs">
                      Joined: {student.created_at ? new Date(student.created_at).toLocaleDateString() : "Unknown"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "relationships" && (
        <div className="space-y-6">
          <div className="morphism-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <UserPlus className="h-6 w-6 mr-2 text-green-400" />
                Parent-Student Relationships
              </h2>
              <button onClick={() => setShowAddRelationship(true)} className="btn-web3 px-6 py-3 flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                <span>Add Relationship</span>
              </button>
            </div>

            {/* Add Relationship Form */}
            {showAddRelationship && (
              <div className="mb-6 p-6 bg-white/5 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-white">Link Parent to Student</h3>
                  <button onClick={() => setShowAddRelationship(false)} className="text-white/70 hover:text-white">
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-2">Select Parent</label>
                    <select
                      value={selectedParent}
                      onChange={(e) => setSelectedParent(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl glass-card-dark text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Choose a parent...</option>
                      {parents.map((parent) => (
                        <option key={parent.id} value={parent.id}>
                          {parent.full_name || parent.email}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-2">Select Student</label>
                    <select
                      value={selectedStudent}
                      onChange={(e) => setSelectedStudent(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl glass-card-dark text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Choose a student...</option>
                      {students.map((student) => (
                        <option key={student.id} value={student.id}>
                          {student.full_name || student.email}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button onClick={handleAddRelationship} className="btn-web3 px-6 py-3">
                    <span>Create Link</span>
                  </button>
                  <button
                    onClick={() => setShowAddRelationship(false)}
                    className="px-6 py-3 rounded-xl glass-card-dark text-white hover:bg-white/10 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Relationships List */}
            {relationships.length === 0 ? (
              <div className="text-center py-12">
                <UserPlus className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No relationships found</h3>
                <p className="text-white/70">
                  Create parent-student links to allow parents to track their children's progress.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {relationships.map((relationship) => (
                  <div key={relationship.id} className="p-4 rounded-xl glass-card-dark">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-teal-500 flex items-center justify-center">
                            <span className="text-sm font-bold text-white">
                              {relationship.parent?.full_name?.charAt(0) ||
                                relationship.parent?.email.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">
                              {relationship.parent?.full_name || "Unnamed Parent"}
                            </h3>
                            <p className="text-white/60 text-sm">{relationship.parent?.email}</p>
                          </div>
                        </div>
                        <div className="text-white/50">→</div>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center">
                            <span className="text-sm font-bold text-white">
                              {relationship.student?.full_name?.charAt(0) ||
                                relationship.student?.email.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">
                              {relationship.student?.full_name || "Unnamed Student"}
                            </h3>
                            <p className="text-white/60 text-sm">{relationship.student?.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-white/60 text-sm">
                          Created: {new Date(relationship.created_at).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => handleDeleteRelationship(relationship.id)}
                          className="p-2 rounded-lg glass-card-dark text-red-400 hover:bg-red-500/10 transition-all duration-300"
                          title="Remove Relationship"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
