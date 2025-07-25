import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

export default function Contact() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Get in touch with us. We're here to help and answer any questions you may have.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card p-8">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a subject</option>
                    <option value="admissions">Admissions Inquiry</option>
                    <option value="academics">Academic Information</option>
                    <option value="general">General Question</option>
                    <option value="support">Technical Support</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Please provide details about your inquiry..."
                  ></textarea>
                </div>

                <button type="submit" className="w-full btn-primary inline-flex items-center justify-center">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information & Map */}
            <div className="space-y-8">
              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="card p-6 text-center">
                  <MapPin className="h-8 w-8 text-blue-800 mx-auto mb-3" />
                  <h3 className="font-semibold text-blue-800 mb-2">Address</h3>
                  <p className="text-gray-600 text-sm">
                    123 Education Drive
                    <br />
                    Westfield, CA 90210
                  </p>
                </div>

                <div className="card p-6 text-center">
                  <Phone className="h-8 w-8 text-blue-800 mx-auto mb-3" />
                  <h3 className="font-semibold text-blue-800 mb-2">Phone</h3>
                  <p className="text-gray-600 text-sm">
                    Main: (555) 123-4567
                    <br />
                    Admissions: (555) 123-4568
                  </p>
                </div>

                <div className="card p-6 text-center">
                  <Mail className="h-8 w-8 text-blue-800 mx-auto mb-3" />
                  <h3 className="font-semibold text-blue-800 mb-2">Email</h3>
                  <p className="text-gray-600 text-sm">
                    info@westfieldacademy.edu
                    <br />
                    admissions@westfieldacademy.edu
                  </p>
                </div>

                <div className="card p-6 text-center">
                  <Clock className="h-8 w-8 text-blue-800 mx-auto mb-3" />
                  <h3 className="font-semibold text-blue-800 mb-2">Office Hours</h3>
                  <p className="text-gray-600 text-sm">
                    Mon-Fri: 8:00 AM - 4:00 PM
                    <br />
                    Sat: 9:00 AM - 12:00 PM
                  </p>
                </div>
              </div>

              {/* Embedded Map */}
              <div className="card overflow-hidden">
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p>Interactive Map</p>
                    <p className="text-sm">123 Education Drive, Westfield, CA 90210</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
