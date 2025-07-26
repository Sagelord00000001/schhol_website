"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useSubmissions } from "@/hooks/useSubmissions"
import { Users, BookOpen, Award, TrendingUp, Calendar, User } from 'lucide-react'

type Profile = {
  id: string
  email: string
  full_name: string | null
  role: "student" | "parent" | "staff" | "admin"
  avatar_url: string | null
}

type ParentDashboardProps = {
  profile: Profile
}

type Student = {
  id: string
  full_name: string | null
  email: string
}

export default function ParentDashboard({ profile }: ParentDashboardProps) {
  const [students, setStudents] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { submissions, loading: submissionsLoading } = useSubmissions(undefined, selectedStudent || undefined)

  useEffect(() => {
    fetchStudents()
  }, [])

//   const fetchStudents = async () => {
//     try {
//       setLoading(true)
//       setError(null)

// const { data, error } = await supabase
//   .from("parent_student_view")
//   .select(`
//     student_id,
//     student_name,
//     student_email
//   `)
//   .eq("parent_id", profile.id)

//       if (error) throw error

//       // Fix the data structure - extract students from the nested array
//     //   const studentList: Student[] = data?.map((item: any) => item.student).filter(Boolean) || []
//     const studentList: Student[] = data?.map((item: any) => ({
//   id: item.student_id,
//   full_name: item.student_name,
//   email: item.student_email,
// })) || []
//       setStudents(studentList)

//       if (studentList.length > 0 && !selectedStudent) {
//         setSelectedStudent(studentList[0].id)
//       }
//     } catch (err: any) {
//       console.error("Failed to fetch students:", err)
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

const fetchStudents = async () => {
  try {
    setLoading(true)
    setError(null)

    console.log("Fetching students for parent ID:", profile.id)

const { data, error } = await supabase
  .from("parent_student_view")
  .select("*")
  .eq("parent_id", profile.id)



    console.log("Raw fetch result:", { data, error })

    if (error) throw error

    // Transform the data to match the Student type

const studentList = data?.map((item) => ({
  id: item.student_profile_id,
  full_name: item.student_name,
  email: item.student_email,
})) || []



    console.log("Transformed student list:", studentList)

    setStudents(studentList)

    if (studentList.length > 0 && !selectedStudent) {
      setSelectedStudent(studentList[0].id)
    }
  } catch (err: any) {
    console.error("Failed to fetch students:", err)
    setError(err.message)
  } finally {
    setLoading(false)
  }
}


  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
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
        <p className="text-red-400">Error loading parent dashboard: {error}</p>
      </div>
    )
  }

  if (students.length === 0) {
    return (
      <div className="morphism-card p-12 text-center">
        <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">No students linked</h3>
        <p className="text-white/70">Contact the school administrator to link your children to your account.</p>
      </div>
    )
  }

  const selectedStudentData = students.find((s) => s.id === selectedStudent)
  const gradedSubmissions = submissions.filter((s) => s.grade !== null)
  const pendingSubmissions = submissions.filter((s) => s.grade === null)
  const averageGrade =
    gradedSubmissions.length > 0
      ? gradedSubmissions.reduce((sum, s) => sum + (s.grade || 0), 0) / gradedSubmissions.length
      : 0

  return (
    <div className="space-y-8">
      {/* Student Selector */}
      <div className="morphism-card p-6">
        <h2 className="text-xl font-bold text-white mb-4">Select Student</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {students.map((student) => (
            <button
              key={student.id || student.email}
              onClick={() => setSelectedStudent(student.id)}
              className={`p-4 rounded-xl transition-all duration-300 ${
                selectedStudent === student.id
                  ? "bg-blue-500/20 border-2 border-blue-400"
                  : "glass-card-dark hover:bg-white/10"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center">
<span className="text-sm font-bold text-white">
  {student.full_name?.charAt(0)
    || (typeof student.email === 'string' ? student.email.charAt(0).toUpperCase() : '?')}
</span>
                </div>
                <div className="text-left">
                  <h3 className="text-white font-semibold">{student.full_name || "Unnamed Student"}</h3>
                  <p className="text-white/60 text-sm">{student.email}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedStudentData && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="morphism-card p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <BookOpen className="h-8 w-8 text-blue-400" />
                <TrendingUp className="h-5 w-5 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{submissions.length}</h3>
              <p className="text-white/70">Total Submissions</p>
            </div>

            <div className="morphism-card p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <Award className="h-8 w-8 text-green-400" />
                <TrendingUp className="h-5 w-5 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{gradedSubmissions.length}</h3>
              <p className="text-white/70">Graded</p>
            </div>

            <div className="morphism-card p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <Calendar className="h-8 w-8 text-yellow-400" />
                <TrendingUp className="h-5 w-5 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{pendingSubmissions.length}</h3>
              <p className="text-white/70">Pending Grade</p>
            </div>

            <div className="morphism-card p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="h-8 w-8 text-purple-400" />
                <TrendingUp className="h-5 w-5 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{averageGrade.toFixed(1)}%</h3>
              <p className="text-white/70">Average Grade</p>
            </div>
          </div>

          {/* Student Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="morphism-card p-6">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <User className="h-6 w-6 mr-2 text-blue-400" />
                {selectedStudentData.full_name}'s Progress
              </h2>

              {submissionsLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-700 rounded animate-pulse"></div>
                  ))}
                </div>
              ) : submissions.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-white/70">No submissions found for this student.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {submissions.slice(0, 5).map((submission) => (
                    <div key={submission.id} className="p-4 rounded-xl glass-card-dark">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-white font-semibold">{submission.assignment?.title}</h3>
                          <p className="text-white/60 text-sm">
                            Submitted: {new Date(submission.submitted_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          {submission.grade !== null ? (
                            <div>
                              <span className="text-green-400 font-bold">
                                {submission.grade}/{submission.assignment?.max_points}
                              </span>
                              <p className="text-white/60 text-sm">
                                {((submission.grade / (submission.assignment?.max_points || 1)) * 100).toFixed(1)}%
                              </p>
                            </div>
                          ) : (
                            <span className="text-yellow-400 text-sm">Pending</span>
                          )}
                        </div>
                      </div>
                      {submission.feedback && (
                        <div className="mt-3 p-3 bg-blue-500/10 rounded-lg">
                          <p className="text-white/70 text-sm">{submission.feedback}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Course Performance */}
            <div className="morphism-card p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Course Performance</h2>

              {gradedSubmissions.length === 0 ? (
                <div className="text-center py-8">
                  <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-white/70">No graded assignments yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Course breakdown would go here */}
                  <div className="p-4 rounded-xl glass-card-dark">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">Overall Performance</span>
                      <span className="text-green-400 font-bold">{averageGrade.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(averageGrade, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl glass-card-dark text-center">
                      <h3 className="text-2xl font-bold text-green-400">{gradedSubmissions.length}</h3>
                      <p className="text-white/70 text-sm">Completed</p>
                    </div>
                    <div className="p-4 rounded-xl glass-card-dark text-center">
                      <h3 className="text-2xl font-bold text-yellow-400">{pendingSubmissions.length}</h3>
                      <p className="text-white/70 text-sm">In Progress</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
