"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Parent",
    content:
      "Westfield Academy has revolutionized my daughter's learning experience. The integration of cutting-edge technology with personalized education is simply remarkable.",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    gradient: "from-pink-400 to-purple-600",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Student",
    content:
      "The immersive STEM program and AI-powered learning tools have opened up incredible opportunities. I feel truly prepared for the future.",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    gradient: "from-cyan-400 to-blue-600",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Alumni",
    content:
      "The innovative approach to education at Westfield Academy gave me the skills and mindset to excel in the tech industry. Forever grateful!",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    gradient: "from-green-400 to-teal-600",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Parent",
    content:
      "The holistic development approach and future-focused curriculum make Westfield Academy the perfect choice for preparing our children for tomorrow's world.",
    image: "/placeholder.svg?height=80&width=80",
    rating: 5,
    gradient: "from-yellow-400 to-orange-600",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-cyan-900/20"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold gradient-text mb-6">Community Voices</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Discover how Westfield Academy is transforming lives and shaping the future
          </p>
        </div>

        <div className="relative">
          <div className="morphism-card p-12 text-center min-h-[400px] flex flex-col justify-center">
            {/* Quote Icon */}
            <div className="mb-8">
              <Quote className="h-16 w-16 text-cyan-400 mx-auto opacity-50" />
            </div>

            {/* Rating Stars */}
            <div className="flex justify-center mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
            </div>

            {/* Testimonial Content */}
            <blockquote className="text-2xl text-white/90 mb-8 leading-relaxed font-light italic">
              "{testimonials[currentIndex].content}"
            </blockquote>

            {/* Author Info */}
            <div className="flex items-center justify-center space-x-4">
              <div className="relative">
                <img
                  src={testimonials[currentIndex].image || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full border-2 border-white/20"
                />
                <div
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${testimonials[currentIndex].gradient} opacity-20 blur-sm`}
                ></div>
              </div>
              <div className="text-left">
                <h4 className="font-bold text-white text-lg">{testimonials[currentIndex].name}</h4>
                <p className="text-cyan-400 font-medium">{testimonials[currentIndex].role}</p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 w-12 h-12 rounded-full glass-card flex items-center justify-center hover:scale-110 transition-all duration-300 pulse-glow"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 w-12 h-12 rounded-full glass-card flex items-center justify-center hover:scale-110 transition-all duration-300 pulse-glow"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setIsAutoPlaying(false)
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-gradient-to-r from-cyan-400 to-purple-500 scale-125"
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
