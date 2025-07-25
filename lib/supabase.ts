import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: "student" | "parent" | "staff" | "admin"
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: "student" | "parent" | "staff" | "admin"
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: "student" | "parent" | "staff" | "admin"
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string
          instructor: string
          category: string
          thumbnail_url: string | null
          students_count: number
          duration: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          instructor: string
          category: string
          thumbnail_url?: string | null
          students_count?: number
          duration: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          instructor?: string
          category?: string
          thumbnail_url?: string | null
          students_count?: number
          duration?: string
          created_at?: string
        }
      }
      news: {
        Row: {
          id: string
          title: string
          excerpt: string
          content: string
          image_url: string | null
          category: string
          author: string
          published_at: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          excerpt: string
          content: string
          image_url?: string | null
          category: string
          author: string
          published_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          excerpt?: string
          content?: string
          image_url?: string | null
          category?: string
          author?: string
          published_at?: string
          created_at?: string
        }
      }
    }
  }
}
