import { Users } from "lucide-react"

export default function ParentPortal() {
  return (
    <div className="pt-16">
      <section className="py-16 bg-gradient-to-r from-sky-600 to-sky-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Parent Portal Login</h1>
          <p className="text-xl">Monitor your child's progress and stay connected</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-8">
            <div className="text-center mb-6">
              <Users className="h-12 w-12 text-sky-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-sky-600">Parent Login</h2>
            </div>

            <form className="space-y-4">
              <div>
                <label htmlFor="parentEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="parentEmail"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Login to Parent Portal
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
