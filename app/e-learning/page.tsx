import { Monitor, Users, ExternalLink, Lock, Play } from "lucide-react"
import Link from "next/link"

const courses = [
  {
    id: 1,
    title: "Advanced Mathematics",
    thumbnail: "/placeholder.svg?height=200&width=300",
    instructor: "Dr. Sarah Johnson",
    students: 45,
    duration: "12 weeks",
  },
  {
    id: 2,
    title: "Digital Science Lab",
    thumbnail: "/placeholder.svg?height=200&width=300",
    instructor: "Prof. Michael Chen",
    students: 38,
    duration: "10 weeks",
  },
  {
    id: 3,
    title: "Creative Writing Workshop",
    thumbnail: "/placeholder.svg?height=200&width=300",
    instructor: "Ms. Emily Rodriguez",
    students: 52,
    duration: "8 weeks",
  },
]

const platforms = [
  {
    name: "Google Classroom",
    description: "Access assignments, submit work, and collaborate with classmates",
    icon: "/placeholder.svg?height=60&width=60",
    link: "#",
  },
  {
    name: "Moodle LMS",
    description: "Interactive learning modules and course materials",
    icon: "/placeholder.svg?height=60&width=60",
    link: "#",
  },
  {
    name: "Zoom Classroom",
    description: "Live virtual classes and recorded sessions",
    icon: "/placeholder.svg?height=60&width=60",
    link: "#",
  },
]

export default function ELearning() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Monitor className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6">E-Learning Portal</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Access your courses, assignments, and learning resources from anywhere, anytime
          </p>
        </div>
      </section>

      {/* Login Section */}
      <section className="py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-8">
            <div className="text-center mb-6">
              <Lock className="h-12 w-12 text-blue-800 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-blue-800">Student Login</h2>
              <p className="text-gray-600">Access your personalized learning dashboard</p>
            </div>

            <form className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>

              <button type="submit" className="w-full btn-primary">
                Login to Portal
              </button>
            </form>

            <div className="text-center mt-4">
              <Link href="#" className="text-sky-400 hover:text-sky-500 text-sm">
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-800 mb-4">Featured Courses</h2>
            <p className="text-xl text-gray-600">Explore our interactive online learning experiences</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="card overflow-hidden">
                <div className="relative">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-3">Instructor: {course.instructor}</p>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students} students
                    </span>
                    <span>{course.duration}</span>
                  </div>
                  <button className="w-full btn-secondary">Access Course</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Platforms */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-800 mb-4">Learning Platforms</h2>
            <p className="text-xl text-gray-600">Access our integrated learning management systems</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <div key={index} className="card p-6 text-center">
                <img src={platform.icon || "/placeholder.svg"} alt={platform.name} className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-blue-800 mb-3">{platform.name}</h3>
                <p className="text-gray-600 mb-4">{platform.description}</p>
                <Link href={platform.link} className="btn-secondary inline-flex items-center">
                  Access Platform
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
