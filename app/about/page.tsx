import { Users, Target, History, Award } from "lucide-react"

const leadership = [
  {
    name: "Dr. Margaret Wilson",
    role: "Principal",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Dr. Wilson brings 20 years of educational leadership experience to Westfield Academy.",
  },
  {
    name: "James Mitchell",
    role: "Vice Principal",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Mr. Mitchell oversees curriculum development and student affairs.",
  },
  {
    name: "Dr. Lisa Chen",
    role: "Academic Director",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Dr. Chen leads our academic programs and teacher development initiatives.",
  },
  {
    name: "Robert Davis",
    role: "Student Services Director",
    image: "/placeholder.svg?height=200&width=200",
    bio: "Mr. Davis ensures comprehensive support for all student needs.",
  },
]

const timeline = [
  { year: "1985", event: "Westfield Academy founded with 150 students" },
  { year: "1992", event: "New science wing and library constructed" },
  { year: "2001", event: "Technology center and computer labs added" },
  { year: "2010", event: "STEM program launched" },
  { year: "2018", event: "New athletic complex completed" },
  { year: "2023", event: "Sustainability initiative and solar panels installed" },
]

export default function About() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">About Westfield Academy</h1>
          <p className="text-xl max-w-3xl mx-auto">
            For nearly four decades, we have been committed to providing exceptional education and nurturing the next
            generation of leaders, thinkers, and innovators.
          </p>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="card p-8">
              <Target className="h-12 w-12 text-blue-800 mb-4" />
              <h2 className="text-3xl font-bold text-blue-800 mb-4">Our Mission</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                To provide a comprehensive, innovative education that empowers students to achieve academic excellence,
                develop critical thinking skills, and become responsible global citizens who contribute positively to
                society.
              </p>
            </div>
            <div className="card p-8">
              <Award className="h-12 w-12 text-blue-800 mb-4" />
              <h2 className="text-3xl font-bold text-blue-800 mb-4">Our Vision</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                To be recognized as a leading educational institution that inspires lifelong learning, fosters
                creativity and innovation, and prepares students to excel in an ever-changing world while maintaining
                strong moral and ethical values.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* School History Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <History className="h-12 w-12 text-blue-800 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-blue-800 mb-4">Our History</h2>
            <p className="text-xl text-gray-600">A journey of growth and excellence</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-blue-800"></div>
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"} mb-8`}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                  <div className="card p-6">
                    <h3 className="text-2xl font-bold text-blue-800 mb-2">{item.year}</h3>
                    <p className="text-gray-700">{item.event}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full border-4 border-white shadow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Users className="h-12 w-12 text-blue-800 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-blue-800 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600">Meet the dedicated professionals leading our school</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((member, index) => (
              <div key={index} className="card p-6 text-center">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-blue-800 mb-2">{member.name}</h3>
                <p className="text-sky-400 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
