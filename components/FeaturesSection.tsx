import { Brain, Zap, Globe, Shield, Rocket, Users } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description: "Personalized education paths powered by advanced artificial intelligence",
    gradient: "from-purple-400 to-pink-600",
  },
  {
    icon: Zap,
    title: "Immersive Technology",
    description: "VR/AR experiences that bring learning to life in unprecedented ways",
    gradient: "from-cyan-400 to-blue-600",
  },
  {
    icon: Globe,
    title: "Global Connectivity",
    description: "Connect with students and educators worldwide through our platform",
    gradient: "from-green-400 to-teal-600",
  },
  {
    icon: Shield,
    title: "Secure Environment",
    description: "Enterprise-grade security ensuring safe and protected learning experiences",
    gradient: "from-red-400 to-orange-600",
  },
  {
    icon: Rocket,
    title: "Future-Ready Skills",
    description: "Curriculum designed to prepare students for tomorrow's challenges",
    gradient: "from-yellow-400 to-red-600",
  },
  {
    icon: Users,
    title: "Collaborative Learning",
    description: "Foster teamwork and communication through interactive group projects",
    gradient: "from-indigo-400 to-purple-600",
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold gradient-text mb-6">Revolutionary Features</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Experience education reimagined with cutting-edge technology and innovative teaching methods
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="morphism-card p-8 group hover:scale-105 transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:gradient-text transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
