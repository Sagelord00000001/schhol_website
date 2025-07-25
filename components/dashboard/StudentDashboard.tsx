"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { useSubmissions } from "@/hooks/useSubmissions"
import { BookOpen, Calendar, Award, TrendingUp, Send, FileText, Clock, CheckCircle } from 'lucide-react'

type Profile = {
  id: string
  email: string
  full_name: string | null
  role: "student" | "parent" | "staff" | "admin"
  avatar_url: string | null
}

type StudentDashboardProps = {
  profile: Profile
}

type Assignment = {
  id: string
  title: string
  description: string
  due_date: string
  course: string
  max_points: number
  created_by: string
  created_at: string
}

export default function StudentDashboard({ profile }: StudentDashboardProps) {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submittingAssignment, setSubmittingAssignment] = useState<string | null>(null)
  const [submissionContent, setSubmissionContent] = useState("")

  const { submissions, loading: submissionsLoading, createSubmission } = useSubmissions(undefined, profile.id)

  useEffect(() => {
    fetchAssignments()
  }, [])

  const fetchAssignments = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from("assignments")
        .select("*")
        .order("due_date", { ascending: true })

      if (error) throw error

      setAssignments(data || [])
    } catch (err: any) {
      console.error("Failed to fetch assignments:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitAssignment = async (assignmentId: string) => {
    if (!submissionContent.trim()) {
      alert("Please enter your submission content")
      return
    }

    const result = await createSubmission({
      assignment_id: assignmentId,
      content: submissionContent,
    })

    if (result.error) {
      alert("Error submitting assignment: " + result.error)
    } else {
      setSubmittingAssignment(null)
      setSubmissionContent("")
    }
  }

  const getSubmissionForAssignment = (assignmentId: string) => {
    return submissions.find((s) => s.assignment_id === assignmentId)
  }

  if (loading || submissionsLoading) {
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
        <p className="text-red-400">Error loading student dashboard: {error}</p>
      </div>
    )
  }

  const submittedAssignments = submissions.length
  const gradedAssignments = submissions.filter((s) => s.grade !== null).length
  const pendingAssignments = assignments.length - submittedAssignments
  const averageGrade = gradedAssignments > 0 
    ? submissions.filter(s => s.grade !== null).reduce((sum, s) => sum + (s.grade || 0), 0) / gradedAssignments 
    : 0

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="morphism-card p-6 group hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <BookOpen className="h-8 w-8 text-blue-400" />
            <TrendingUp className="h-5 w-5 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{assignments.length}</h3>
          <p className="text-white/70">Total Assignments</p>
        </div>

        <div className="morphism-card p-6 group hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="h-8 w-8 text-green-400" />
            <TrendingUp className="h-5 w-5 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{submittedAssignments}</h3>
          <p className="text-white/70">Submitted</p>
        </div>

        <div className="morphism-card p-6 group hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <Clock className="h-8 w-8 text-yellow-400" />
            <TrendingUp className="h-5 w-5 text-yellow-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{pendingAssignments}</h3>
          <p className="text-white/70">Pending</p>
        </div>

        <div className="morphism-card p-6 group hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <Award className="h-8 w-8 text-purple-400" />
            <TrendingUp className="h-5 w-5 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{averageGrade.toFixed(1)}%</h3>
          <p className="text-white/70">Average Grade</p>
        </div>
      </div>

      {/* Assignments List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="morphism-card p-6">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Calendar className="h-6 w-6 mr-2 text-blue-400" />
            Available Assignments
          </h2>

          {assignments.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-white/70">No assignments available yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {assignments.map((assignment) => {
                const submission = getSubmissionForAssignment(assignment.id)
                const isOverdue = new Date(assignment.due_date) <= new Date()
                const isSubmitted = !!submission

                return (
                  <div key={assignment.id} className="p-4 rounded-xl glass-card-dark">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-bold text-white">{assignment.title}</h3>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                            {assignment.course}
                          </span>
                          {isSubmitted && (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                              Submitted
                            </span>
                          )}
                          {isOverdue && !isSubmitted && (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                              Overdue
                            </span>
                          )}
                        </div>
                        <p className="text-white/70 mb-3">{assignment.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-white/60">
                          <span>Due: {new Date(assignment.due_date).toLocaleDateString()}</span>
                          <span>Max Points: {assignment.max_points}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        {submission ? (
                          <div>
                            {submission.grade !== null ? (
                              <div>
                                <span className="text-green-400 font-bold text-xl">
                                  {submission.grade}/{assignment.max_points}
                                </span>
                                <p className="text-white/60 text-sm">
                                  {((submission.grade / assignment.max_points) * 100).toFixed(1)}%
                                </p>
                              </div>
                            ) : (
                              <span className="text-yellow-400 text-sm">Pending Grade</span>
                            )}
                          </div>
                        ) : (
                          <button
                            onClick={() => setSubmittingAssignment(assignment.id)}
                            className="btn-web3 px-4 py-2 flex items-center"
                            disabled={isOverdue}
                          >
                            <Send className="h-4 w-4 mr-2" />
                            <span>Submit</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Submission Form */}
                    {submittingAssignment === assignment.id && (
                      <div className="mt-4 p-4 bg-white/5 rounded-lg">
                        <h4 className="text-white font-medium mb-3">Submit Your Work</h4>
                        <textarea
                          value={submissionContent}
                          onChange={(e) => setSubmissionContent(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl glass-card-dark text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={4}
                          placeholder="Enter your submission here..."
                        />
                        <div className="flex space-x-4 mt-4">
                          <button
                            onClick={() => handleSubmitAssignment(assignment.id)}
                            className="btn-web3 px-6 py-2"
                          >
                            <span>Submit Assignment</span>
                          </button>
                          <button
                            onClick={() => {
                              setSubmittingAssignment(null)
                              setSubmissionContent("")
                            }}
                            className="px-6 py-2 rounded-xl glass-card-dark text-white hover:bg-white/10 transition-all duration-300"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Show feedback if graded */}
                    {submission?.feedback && (
                      <div className="mt-4 p-4 bg-blue-500/10 rounded-lg">
                        <h4 className="text-white font-medium mb-2">Teacher Feedback:</h4>
                        <p className="text-white/80">{submission.feedback}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* My Submissions */}
        <div className="morphism-card p-6">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <FileText className="h-6 w-6 mr-2 text-green-400" />
            My Submissions
          </h2>

          {submissions.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-white/70">No submissions yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {submissions.slice(0, 5).map((submission) => (
                <div key={submission.id} className="p-4 rounded-xl glass-card-dark">
                  <div className="flex justify-between items-start mb-3">
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
                  
                  <div className="text-white/70 text-sm bg-white/5 p-3 rounded-lg mb-3">
                    {submission.content}
                  </div>

                  {submission.feedback && (
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <p className="text-blue-300 text-sm font-medium mb-1">Teacher Feedback:</p>
                      <p className="text-white/80 text-sm">{submission.feedback}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
