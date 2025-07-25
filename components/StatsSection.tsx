"use client"

import { useState, useEffect } from "react"

const stats = [
  { number: 2500, label: "Active Students", suffix: "+" },
  { number: 150, label: "Expert Faculty", suffix: "+" },
  { number: 98, label: "Success Rate", suffix: "%" },
  { number: 50, label: "Countries Reached", suffix: "+" },
]

export default function StatsSection() {
  const [counters, setCounters] = useState(stats.map(() => 0))
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)

          stats.forEach((stat, index) => {
            let current = 0
            const increment = stat.number / 100
            const timer = setInterval(() => {
              current += increment
              if (current >= stat.number) {
                current = stat.number
                clearInterval(timer)
              }
              setCounters((prev) => {
                const newCounters = [...prev]
                newCounters[index] = Math.floor(current)
                return newCounters
              })
            }, 20)
          })
        }
      },
      { threshold: 0.5 },
    )

    const element = document.getElementById("stats-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [hasAnimated])

  return (
    <section id="stats-section" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-cyan-900/20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold gradient-text mb-6">Our Impact</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Numbers that speak to our commitment to educational excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="morphism-card p-8 hover:scale-105 transition-all duration-500">
                <div className="text-5xl font-black gradient-text mb-4">
                  {counters[index]}
                  {stat.suffix}
                </div>
                <div className="text-white/80 text-lg font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
