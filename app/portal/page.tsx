import { GraduationCap, Users, UserCheck, ArrowRight } from "lucide-react"
import Link from "next/link"

const portals = [
  {
    title: "Students",
    description: "Access your grades, assignments, schedule, and course materials",
    icon: GraduationCap,
    features: ["View Grades & Progress", "Submit Assignments", "Class Schedule", "Course Resources"],
    link: "/portal/students",
    color: "bg-blue-800 hover:bg-blue-900",
  },
  {
    title: "Parents",
    description: "Monitor your child's academic progress and stay connected with teachers",
    icon: Users,
    features: ["Student Progress Reports", "Teacher Communication", "Event Calendar", "Payment Portal"],
    link: "/portal/parents",
    color: "bg-sky-600 hover:bg-sky-700",
  },
  {
    title: "Staff",
    description: "Access teaching resources, gradebooks, and administrative tools",
    icon: UserCheck,
    features: ["Gradebook Management", "Lesson Planning", "Student Records", "Staff Directory"],
    link: "/portal/staff",
    color: "bg-yellow-600 hover:bg-yellow-700",
  },
]

export default function Portal() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Portal Access</h1>
          <p className="text-xl max-w-3xl mx-auto">Secure access to your personalized dashboard and school resources</p>
        </div>
      </section>

      {/* Portal Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portals.map((portal, index) => {
              const IconComponent = portal.icon
              return (
                <div key={index} className="card p-8 text-center hover:shadow-2xl transition-all duration-300">
                  <div
                    className={`w-20 h-20 ${portal.color} rounded-full flex items-center justify-center mx-auto mb-6 transition-colors`}
                  >
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>

                  <h2 className="text-3xl font-bold text-blue-800 mb-4">{portal.title}</h2>
                  <p className="text-gray-600 mb-6 text-lg">{portal.description}</p>

                  <div className="mb-8">
                    <h3 className="font-semibold text-blue-800 mb-3">Features Include:</h3>
                    <ul className="space-y-2 text-gray-600">
                      {portal.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center justify-center">
                          <ArrowRight className="h-4 w-4 text-sky-400 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={portal.link}
                    className={`btn-primary w-full inline-flex items-center justify-center ${portal.color} transition-colors`}
                  >
                    Access {portal.title} Portal
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">Need Help?</h2>
          <p className="text-lg text-gray-700 mb-8">
            If you're having trouble accessing your portal or need technical support, our IT team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-secondary">
              Contact Support
            </Link>
            <Link href="#" className="btn-primary">
              View Help Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
