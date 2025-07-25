"use client"

import { useState } from "react"
import { BookOpen, Microscope, Palette, Globe, Calculator, Music, Dumbbell, Code } from "lucide-react"

const subjects = [
  {
    id: 1,
    title: "Mathematics",
    icon: Calculator,
    category: "STEM",
    description: "Advanced mathematics curriculum from algebra to calculus",
  },
  {
    id: 2,
    title: "Science",
    icon: Microscope,
    category: "STEM",
    description: "Comprehensive science programs including biology, chemistry, and physics",
  },
  {
    id: 3,
    title: "Computer Science",
    icon: Code,
    category: "STEM",
    description: "Programming, web development, and computer science fundamentals",
  },
  {
    id: 4,
    title: "English Literature",
    icon: BookOpen,
    category: "Humanities",
    description: "Critical reading, writing, and analysis of literary works",
  },
  {
    id: 5,
    title: "History",
    icon: Globe,
    category: "Humanities",
    description: "World history, civics, and social studies programs",
  },
  {
    id: 6,
    title: "Arts",
    icon: Palette,
    category: "Arts",
    description: "Visual arts, drama, and creative expression programs",
  },
  {
    id: 7,
    title: "Music",
    icon: Music,
    category: "Arts",
    description: "Band, choir, and individual music instruction",
  },
  {
    id: 8,
    title: "Physical Education",
    icon: Dumbbell,
    category: "Health",
    description: "Sports, fitness, and health education programs",
  },
]

const categories = ["All", "STEM", "Humanities", "Arts", "Health"]

export default function Academics() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredSubjects =
    activeCategory === "All" ? subjects : subjects.filter((subject) => subject.category === activeCategory)

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Academic Programs</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Comprehensive curriculum designed to challenge and inspire students across all disciplines
          </p>
        </div>
      </section>

      {/* Section Intro */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-blue-800 mb-6">Excellence in Every Subject</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Our academic programs are designed to provide students with a well-rounded education that prepares them for
            success in higher education and beyond. We offer rigorous coursework across multiple disciplines, taught by
            experienced and dedicated faculty.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeCategory === category ? "bg-blue-800 text-white" : "bg-white text-blue-800 hover:bg-blue-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Subject Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSubjects.map((subject) => {
              const IconComponent = subject.icon
              return (
                <div key={subject.id} className="card p-6 text-center">
                  <IconComponent className="h-12 w-12 text-blue-800 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">{subject.title}</h3>
                  <span className="inline-block px-3 py-1 bg-sky-100 text-sky-800 text-sm rounded-full mb-3">
                    {subject.category}
                  </span>
                  <p className="text-gray-600">{subject.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
