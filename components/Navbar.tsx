"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, GraduationCap, User, LogOut } from "lucide-react"
import { useAuth } from "./AuthProvider"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, signOut } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/academics", label: "Academics" },
    { href: "/admissions", label: "Admissions" },
    { href: "/e-learning", label: "E-Learning" },
    { href: "/newsroom", label: "Newsroom" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "glass-card border-b border-white/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <GraduationCap className="h-10 w-10 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300" />
              <div className="absolute inset-0 bg-cyan-400 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            </div>
            <span className="text-2xl font-bold gradient-text">Riverdale</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-cyan-400 font-medium transition-all duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}

            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="text-white/80 hover:text-cyan-400 transition-colors">
                  <User className="h-5 w-5" />
                </Link>
                <button onClick={() => signOut()} className="text-white/80 hover:text-red-400 transition-colors">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link href="/auth" className="btn-web3">
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-cyan-400 focus:outline-none transition-colors duration-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 glass-card-dark mt-2 rounded-2xl">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-white/80 hover:text-cyan-400 font-medium transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {!user && (
                <Link
                  href="/auth"
                  className="block px-4 py-3 text-cyan-400 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
