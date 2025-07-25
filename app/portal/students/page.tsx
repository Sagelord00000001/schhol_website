import { User } from "lucide-react"

export default function StudentPortal() {
  return (
    <div className="pt-16">
      <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Student Portal Login</h1>
          <p className="text-xl">Access your grades, assignments, and course materials</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-8">
            <div className="text-center mb-6">
              <User className="h-12 w-12 text-blue-800 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-blue-800">Student Login</h2>
            </div>

            <form className="space-y-4">
              <div>
                <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
                  Student ID
                </label>
                <input
                  type="text"
                  id="studentId"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your student ID"
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
                Login to Student Portal
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
