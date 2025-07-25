"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, ArrowRight, Eye, Heart } from "lucide-react"
import { supabase } from "@/lib/supabase"

type NewsItem = {
  id: string
  title: string
  excerpt: string
  image_url: string | null
  category: string
  author: string
  published_at: string
}

export default function LatestNews() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("published_at", { ascending: false })
        .limit(3)

      if (error) throw error
      setNews(data || [])
    } catch (error) {
      console.error("Error fetching news:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="morphism-card p-6 animate-pulse">
                <div className="h-48 bg-white/10 rounded-xl mb-4"></div>
                <div className="h-4 bg-white/10 rounded mb-2"></div>
                <div className="h-4 bg-white/10 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold gradient-text mb-6">Latest News</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Stay connected with the pulse of innovation and achievement at Westfield Academy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <article
              key={item.id}
              className="morphism-card overflow-hidden group hover:scale-105 transition-all duration-500"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image_url || "/placeholder.svg?height=200&width=400"}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-400 to-purple-500 text-white">
                    {item.category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <div className="flex items-center space-x-1 text-white/80">
                    <Eye className="h-4 w-4" />
                    <span className="text-xs">{Math.floor(Math.random() * 500) + 100}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-white/80">
                    <Heart className="h-4 w-4" />
                    <span className="text-xs">{Math.floor(Math.random() * 50) + 10}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-white/60 text-sm mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(item.published_at).toLocaleDateString()}
                  <span className="mx-2">•</span>
                  <span>{item.author}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:gradient-text transition-all duration-300">
                  {item.title}
                </h3>
                <p className="text-white/70 mb-4 line-clamp-3">{item.excerpt}</p>
                <Link
                  href={`/newsroom/${item.id}`}
                  className="inline-flex items-center text-cyan-400 hover:text-purple-400 font-medium transition-colors duration-300"
                >
                  Read More{" "}
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/newsroom" className="btn-web3">
            <span>View All News</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
