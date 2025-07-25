"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, Sparkles, Zap, Globe } from "lucide-react"

export default function Hero() {
  const [currentText, setCurrentText] = useState(0)
  const texts = [
    "Next-Generation Education",
    "Immersive Learning Experience",
    "Future-Ready Students",
    "Innovation in Every Classroom",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      <div className="absolute inset-0 particle-bg"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 floating-card">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20 blur-xl"></div>
      </div>
      <div className="absolute top-40 right-20 floating-card" style={{ animationDelay: "2s" }}>
        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 opacity-20 blur-xl"></div>
      </div>
      <div className="absolute bottom-40 left-20 floating-card" style={{ animationDelay: "4s" }}>
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-400 to-cyan-500 opacity-20 blur-xl"></div>
      </div>

      <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4">
        {/* Main Heading */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-7xl font-black mb-4 pt-14 leading-tight">
            Welcome to <span className="gradient-text block">Riverdale</span>
          </h1>

          {/* Animated Subheading */}
          <div className="h-16 flex items-center justify-center">
            <p className="text-2xl md:text-4xl font-light text-white/90 transition-all duration-1000">
              {texts[currentText]}
            </p>
          </div>
        </div>

        {/* Feature Icons */}
        <div className="flex justify-center space-x-8 mb-12">
          <div className="flex flex-col items-center group">
            <div className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="h-8 w-8 text-cyan-400" />
            </div>
            <span className="text-sm text-white/70">Innovation</span>
          </div>
          <div className="flex flex-col items-center group">
            <div className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
              <Zap className="h-8 w-8 text-purple-400" />
            </div>
            <span className="text-sm text-white/70">Excellence</span>
          </div>
          <div className="flex flex-col items-center group">
            <div className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
              <Globe className="h-8 w-8 text-pink-400" />
            </div>
            <span className="text-sm text-white/70">Global</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Link href="/admissions" className="btn-web3 text-xl px-12 py-6">
            <span>Enroll Now</span>
          </Link>
          <Link
            href="/virtual-tour"
            className="px-12 py-6 rounded-2xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-all duration-300 text-xl backdrop-blur-sm"
          >
            Virtual Tour
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white/50" />
        </div>
      </div>
    </section>
  )
}
