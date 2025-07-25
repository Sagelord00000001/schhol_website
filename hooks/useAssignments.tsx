"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export type Assignment = {
  id: string
  title: string
  description: string
  due_date: string
  course: string
  max_points: number
  created_by: string
  created_at: string
  updated_at: string
  creator?: {
    full_name: string | null
    email: string
  }
}

export function useAssignments(userId?: string) {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAssignments()
  }, [userId])

  const fetchAssignments = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from("assignments")
        .select(`
          *,
          creator:profiles!assignments_created_by_fkey(full_name, email)
        `)
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

  const createAssignment = async (
    assignmentData: Omit<Assignment, "id" | "created_at" | "updated_at" | "created_by">,
  ) => {
    try {
      const { data, error } = await supabase
        .from("assignments")
        .insert({
          ...assignmentData,
          created_by: userId,
        })
        .select(`
          *,
          creator:profiles!assignments_created_by_fkey(full_name, email)
        `)
        .single()

      if (error) throw error

      setAssignments((prev) => [...prev, data])
      return { data, error: null }
    } catch (err: any) {
      console.error("Failed to create assignment:", err)
      return { data: null, error: err.message }
    }
  }

  const updateAssignment = async (id: string, updates: Partial<Assignment>) => {
    try {
      const { data, error } = await supabase
        .from("assignments")
        .update(updates)
        .eq("id", id)
        .select(`
          *,
          creator:profiles!assignments_created_by_fkey(full_name, email)
        `)
        .single()

      if (error) throw error

      setAssignments((prev) => prev.map((assignment) => (assignment.id === id ? data : assignment)))
      return { data, error: null }
    } catch (err: any) {
      console.error("Failed to update assignment:", err)
      return { data: null, error: err.message }
    }
  }

  const deleteAssignment = async (id: string) => {
    try {
      const { error } = await supabase.from("assignments").delete().eq("id", id)

      if (error) throw error

      setAssignments((prev) => prev.filter((assignment) => assignment.id !== id))
      return { error: null }
    } catch (err: any) {
      console.error("Failed to delete assignment:", err)
      return { error: err.message }
    }
  }

  return {
    assignments,
    loading,
    error,
    createAssignment,
    updateAssignment,
    deleteAssignment,
    refetch: fetchAssignments,
  }
}
