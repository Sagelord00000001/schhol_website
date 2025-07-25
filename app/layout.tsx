import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { AuthProvider } from "@/components/AuthProvider"
import ParticleBackground from "@/components/ParticleBackground"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Westfield Academy - Next-Gen Education",
  description:
    "Experience the future of education with cutting-edge technology, immersive learning, and innovative teaching methods.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ParticleBackground />
          <Navbar />
          <main className="min-h-screen relative z-10">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
