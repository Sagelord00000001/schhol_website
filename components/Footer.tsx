import Link from "next/link"
import { GraduationCap, Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative mt-24">
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <GraduationCap className="h-10 w-10 text-cyan-400" />
                <div className="absolute inset-0 bg-cyan-400 rounded-full blur-lg opacity-20"></div>
              </div>
              <span className="text-2xl font-bold gradient-text">Riverdale</span>
            </div>
            <p className="text-white/70 mb-6 leading-relaxed">
              Pioneering the future of education through innovative technology, personalized learning, and a commitment
              to nurturing tomorrow's leaders in an ever-evolving digital world.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <div
                  key={index}
                  className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer group"
                >
                  <Icon className="h-5 w-5 text-white/70 group-hover:text-cyan-400 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "About Us" },
                { href: "/academics", label: "Academics" },
                { href: "/admissions", label: "Admissions" },
                { href: "/e-learning", label: "E-Learning" },
                { href: "/newsroom", label: "News" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-cyan-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-cyan-400 group-hover:w-4 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Stay Connected</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3 text-white/70">
                <MapPin className="h-4 w-4 text-cyan-400" />
                <span className="text-sm">123 Education Drive, Westfield, CA</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70">
                <Phone className="h-4 w-4 text-cyan-400" />
                <span className="text-sm">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70">
                <Mail className="h-4 w-4 text-cyan-400" />
                <span className="text-sm">info@westfieldacademy.edu</span>
              </div>
            </div>

            <div>
              <p className="text-white/70 mb-4 text-sm">Subscribe to our newsletter</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-xl glass-card border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-r-xl hover:from-purple-500 hover:to-cyan-400 transition-all duration-300">
                  <Mail className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-white/50 text-sm">
            &copy; 2024 Westfield Academy. All rights reserved. |
            <Link href="/privacy" className="hover:text-cyan-400 transition-colors duration-300 ml-1">
              Privacy Policy
            </Link>{" "}
            |
            <Link href="/terms" className="hover:text-cyan-400 transition-colors duration-300 ml-1">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
