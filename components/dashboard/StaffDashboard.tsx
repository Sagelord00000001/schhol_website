"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useAssignments, type Assignment } from "@/hooks/useAssignments"
import { useSubmissions } from "@/hooks/useSubmissions"
import { BookOpen, Plus, Edit, Trash2, Users, Calendar, Award, Eye, X, Save } from 'lucide-react'
import { supabase } from "@/lib/supabase"

type Profile = {
  id: string
  email: string
  full_name: string | null
  role: "student" | "parent" | "staff" | "admin"
  avatar_url: string | null
}

type StaffDashboardProps = {
  profile: Profile
}

type AssignmentFormData = {
  title: string
  description: string
  due_date: string
  course: string
  max_points: number
}

export default function StaffDashboard({ profile }: StaffDashboardProps) {
  const { assignments, loading, error, createAssignment, updateAssignment, deleteAssignment } = useAssignments(
    profile.id,
  )
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [studentCount, setStudentCount] = useState(0)
  const [editingAssignment, setEditingAssignment] = useState<string | null>(null)
  const [viewingSubmissions, setViewingSubmissions] = useState<string | null>(null)
  const [formData, setFormData] = useState<AssignmentFormData>({
    title: "",
    description: "",
    due_date: "",
    course: "",
    max_points: 100,
  })

    useEffect(() => {
    const fetchStudentCount = async () => {
      const { count, error } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("role", "student")
      if (!error) setStudentCount(count || 0)
    }
    fetchStudentCount()
  }, [])

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await createAssignment(formData)
    if (result.error) {
      alert("Error creating assignment: " + result.error)
    } else {
      setShowCreateForm(false)
      setFormData({
        title: "",
        description: "",
        due_date: "",
        course: "",
        max_points: 100,
      })
    }
  }

  const handleUpdate = async (id: string, updates: Partial<Assignment>) => {
    const result = await updateAssignment(id, updates)
    if (result.error) {
      alert("Error updating assignment: " + result.error)
    } else {
      setEditingAssignment(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this assignment?")) {
      const result = await deleteAssignment(id)
      if (result.error) {
        alert("Error deleting assignment: " + result.error)
      }
    }
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
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
        <p className="text-red-400">Error loading staff dashboard: {error}</p>
      </div>
    )
  }

  const upcomingAssignments = assignments.filter((a) => new Date(a.due_date) > new Date())
  const overdueAssignments = assignments.filter((a) => new Date(a.due_date) <= new Date())

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="morphism-card p-6 group hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <BookOpen className="h-8 w-8 text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{assignments.length}</h3>
          <p className="text-white/70">Total Assignments</p>
        </div>

        <div className="morphism-card p-6 group hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="h-8 w-8 text-green-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{upcomingAssignments.length}</h3>
          <p className="text-white/70">Upcoming</p>
        </div>

        <div className="morphism-card p-6 group hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <Award className="h-8 w-8 text-red-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{overdueAssignments.length}</h3>
          <p className="text-white/70">Overdue</p>
        </div>

        <div className="morphism-card p-6 group hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <Users className="h-8 w-8 text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{studentCount}</h3>
          <p className="text-white/70">Students</p>
        </div>
      </div>

      {/* Create Assignment Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">My Assignments</h2>
        <button onClick={() => setShowCreateForm(true)} className="btn-web3 px-6 py-3 flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          <span>Create Assignment</span>
        </button>
      </div>

      {/* Create Assignment Form */}
      {showCreateForm && (
        <div className="morphism-card p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Create New Assignment</h3>
            <button onClick={() => setShowCreateForm(false)} className="text-white/70 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass-card-dark text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Assignment title"
                  required
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Course</label>
                <input
                  type="text"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass-card-dark text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Course name"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl glass-card-dark text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Assignment description"
                rows={4}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Due Date</label>
                <input
                  type="date"
                  value={formData.due_date}
                  onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl glass-card-dark text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Max Points</label>
                <input
                  type="number"
                  value={formData.max_points}
                  onChange={(e) => setFormData({ ...formData, max_points: Number.parseInt(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl glass-card-dark text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  required
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <button type="submit" className="btn-web3 px-6 py-3">
                <span>Create Assignment</span>
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-6 py-3 rounded-xl glass-card-dark text-white hover:bg-white/10 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Assignments List */}
      <div className="space-y-6">
        {assignments.map((assignment) => (
          <AssignmentCard
            key={assignment.id}
            assignment={assignment}
            isEditing={editingAssignment === assignment.id}
            onEdit={() => setEditingAssignment(assignment.id)}
            onSave={(updates) => handleUpdate(assignment.id, updates)}
            onCancel={() => setEditingAssignment(null)}
            onDelete={() => handleDelete(assignment.id)}
            onViewSubmissions={() => setViewingSubmissions(assignment.id)}
          />
        ))}

        {assignments.length === 0 && (
          <div className="morphism-card p-12 text-center">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No assignments yet</h3>
            <p className="text-white/70 mb-6">Create your first assignment to get started.</p>
            <button onClick={() => setShowCreateForm(true)} className="btn-web3 px-6 py-3">
              <span>Create Assignment</span>
            </button>
          </div>
        )}
      </div>

      {/* Submissions Modal */}
      {viewingSubmissions && (
        <SubmissionsModal assignmentId={viewingSubmissions} onClose={() => setViewingSubmissions(null)} />
      )}
    </div>
  )
}

type AssignmentCardProps = {
  assignment: Assignment
  isEditing: boolean
  onEdit: () => void
  onSave: (updates: Partial<Assignment>) => void
  onCancel: () => void
  onDelete: () => void
  onViewSubmissions: () => void
}

function AssignmentCard({ assignment, isEditing, onEdit, onSave, onCancel, onDelete, onViewSubmissions }: AssignmentCardProps) {
  const [editData, setEditData] = useState<AssignmentFormData>({
    title: assignment.title,
    description: assignment.description,
    due_date: assignment.due_date,
    course: assignment.course,
    max_points: assignment.max_points,
  })

  const isOverdue = new Date(assignment.due_date) <= new Date()

  if (isEditing) {
    return (
      <div className="morphism-card p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl glass-card-dark text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={editData.course}
              onChange={(e) => setEditData({ ...editData, course: e.target.value })}
              className="w-full px-4 py-3 rounded-xl glass-card-dark text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            className="w-full px-4 py-3 rounded-xl glass-card-dark text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              value={editData.due_date}
              onChange={(e) => setEditData({ ...editData, due_date: e.target.value })}
              className="w-full px-4 py-3 rounded-xl glass-card-dark text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              value={editData.max_points}
              onChange={(e) => setEditData({ ...editData, max_points: Number.parseInt(e.target.value) })}
              className="w-full px-4 py-3 rounded-xl glass-card-dark text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-4">
            <button onClick={() => onSave(editData)} className="btn-web3 px-4 py-2 flex items-center">
              <Save className="h-4 w-4 mr-2" />
              <span>Save</span>
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-xl glass-card-dark text-white hover:bg-white/10 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="morphism-card p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-xl font-bold text-white">{assignment.title}</h3>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
              {assignment.course}
            </span>
            {isOverdue && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                Overdue
              </span>
            )}
          </div>
          <p className="text-white/70 mb-4">{assignment.description}</p>
          <div className="flex items-center space-x-6 text-sm text-white/60">
            <span>Due: {new Date(assignment.due_date).toLocaleDateString()}</span>
            <span>Max Points: {assignment.max_points}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onViewSubmissions}
            className="p-2 rounded-lg glass-card-dark text-white hover:bg-white/10 transition-all duration-300"
            title="View Submissions"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={onEdit}
            className="p-2 rounded-lg glass-card-dark text-white hover:bg-white/10 transition-all duration-300"
            title="Edit Assignment"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 rounded-lg glass-card-dark text-red-400 hover:bg-red-500/10 transition-all duration-300"
            title="Delete Assignment"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

type SubmissionsModalProps = {
  assignmentId: string
  onClose: () => void
}

function SubmissionsModal({ assignmentId, onClose }: SubmissionsModalProps) {
  const { submissions, loading, gradeSubmission } = useSubmissions(assignmentId)
  const [gradingSubmission, setGradingSubmission] = useState<string | null>(null)
  const [gradeData, setGradeData] = useState({ grade: 0, feedback: "" })

  const handleGrade = async (submissionId: string) => {
    const result = await gradeSubmission(submissionId, gradeData.grade, gradeData.feedback)
    if (result.error) {
      alert("Error grading submission: " + result.error)
    } else {
      setGradingSubmission(null)
      setGradeData({ grade: 0, feedback: "" })
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="morphism-card p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Student Submissions</h2>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-8">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-white/70">No submissions yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div key={submission.id} className="p-4 rounded-xl glass-card-dark">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-white font-semibold">{submission.student?.full_name || "Unknown Student"}</h3>
                    <p className="text-white/60 text-sm">{submission.student?.email}</p>
                    <p className="text-white/60 text-sm">
                      Submitted: {new Date(submission.submitted_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    {submission.grade !== null ? (
                      <div>
                        <span className="text-green-400 font-bold">
                          {submission.grade}/{submission.assignment?.max_points}
                        </span>
                        <p className="text-white/60 text-sm">Graded</p>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setGradingSubmission(submission.id)
                          setGradeData({ grade: 0, feedback: "" })
                        }}
                        className="btn-web3 px-4 py-2"
                      >
                        <span>Grade</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-white font-medium mb-2">Submission:</h4>
                  <p className="text-white/70 bg-white/5 p-3 rounded-lg">{submission.content}</p>
                </div>

                {submission.feedback && (
                  <div className="mb-4">
                    <h4 className="text-white font-medium mb-2">Feedback:</h4>
                    <p className="text-white/70 bg-blue-500/10 p-3 rounded-lg">{submission.feedback}</p>
                  </div>
                )}

                {gradingSubmission === submission.id && (
                  <div className="mt-4 p-4 bg-white/5 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-white/70 text-sm font-medium mb-2">
                          Grade (out of {submission.assignment?.max_points})
                        </label>
                        <input
                          type="number"
                          value={gradeData.grade}
                          onChange={(e) => setGradeData({ ...gradeData, grade: Number.parseInt(e.target.value) })}
                          className="w-full px-4 py-3 rounded-xl glass-card-dark text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min="0"
                          max={submission.assignment?.max_points}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-white/70 text-sm font-medium mb-2">Feedback</label>
                      <textarea
                        value={gradeData.feedback}
                        onChange={(e) => setGradeData({ ...gradeData, feedback: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass-card-dark text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder="Optional feedback for the student"
                      />
                    </div>
                    <div className="flex space-x-4">
                      <button onClick={() => handleGrade(submission.id)} className="btn-web3 px-4 py-2">
                        <span>Submit Grade</span>
                      </button>
                      <button
                        onClick={() => setGradingSubmission(null)}
                        className="px-4 py-2 rounded-xl glass-card-dark text-white hover:bg-white/10 transition-all duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
