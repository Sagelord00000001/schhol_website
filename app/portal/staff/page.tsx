import { UserCheck } from "lucide-react"

export default function StaffPortal() {
  return (
    <div className="pt-16">
      <section className="py-16 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Staff Portal Login</h1>
          <p className="text-xl">Access teaching resources and administrative tools</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-8">
            <div className="text-center mb-6">
              <UserCheck className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-yellow-600">Staff Login</h2>
            </div>

            <form className="space-y-4">
              <div>
                <label htmlFor="staffId" className="block text-sm font-medium text-gray-700 mb-1">
                  Staff ID
                </label>
                <input
                  type="text"
                  id="staffId"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter your staff ID"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Login to Staff Portal
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
