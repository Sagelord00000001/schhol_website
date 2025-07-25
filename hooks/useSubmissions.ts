"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export type Submission = {
  id: string
  assignment_id: string
  student_id: string
  content: string
  file_url: string | null
  submitted_at: string
  grade: number | null
  feedback: string | null
  graded_at: string | null
  graded_by: string | null
  created_at: string
  updated_at: string
  student?: {
    full_name: string | null
    email: string
  }
  assignment?: {
    title: string
    max_points: number
  }
}

export function useSubmissions(assignmentId?: string, studentId?: string) {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSubmissions()
  }, [assignmentId, studentId])

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase.from("submissions").select(`
          *,
          student:profiles!submissions_student_id_fkey(full_name, email),
          assignment:assignments(title, max_points)
        `)

      if (assignmentId) {
        query = query.eq("assignment_id", assignmentId)
      }

      if (studentId) {
        query = query.eq("student_id", studentId)
      }

      const { data, error } = await query.order("submitted_at", { ascending: false })

      if (error) throw error

      setSubmissions(data || [])
    } catch (err: any) {
      console.error("Failed to fetch submissions:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const createSubmission = async (submissionData: {
    assignment_id: string
    content: string
    file_url?: string
  }) => {
    try {
      const { data, error } = await supabase
        .from("submissions")
        .insert({
          ...submissionData,
          student_id: studentId,
        })
        .select(`
          *,
          student:profiles!submissions_student_id_fkey(full_name, email),
          assignment:assignments(title, max_points)
        `)
        .single()

      if (error) throw error

      setSubmissions((prev) => [data, ...prev])
      return { data, error: null }
    } catch (err: any) {
      console.error("Failed to create submission:", err)
      return { data: null, error: err.message }
    }
  }

  const gradeSubmission = async (id: string, grade: number, feedback?: string) => {
    try {
      const { data, error } = await supabase
        .from("submissions")
        .update({
          grade,
          feedback,
          graded_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select(`
          *,
          student:profiles!submissions_student_id_fkey(full_name, email),
          assignment:assignments(title, max_points)
        `)
        .single()

      if (error) throw error

      setSubmissions((prev) => prev.map((submission) => (submission.id === id ? data : submission)))
      return { data, error: null }
    } catch (err: any) {
      console.error("Failed to grade submission:", err)
      return { data: null, error: err.message }
    }
  }

  return {
    submissions,
    loading,
    error,
    createSubmission,
    gradeSubmission,
    refetch: fetchSubmissions,
  }
}
