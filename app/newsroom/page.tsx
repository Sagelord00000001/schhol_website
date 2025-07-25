import Link from "next/link"
import { Calendar, ArrowRight, Tag } from "lucide-react"

const featuredArticle = {
  id: 1,
  title: "Westfield Academy Wins State Science Championship",
  excerpt:
    "Our students have achieved remarkable success at the state-level science competition, bringing home the championship trophy for the third consecutive year.",
  image: "/placeholder.svg?height=400&width=600",
  date: "March 20, 2024",
  category: "Achievement",
  readTime: "5 min read",
}

const articles = [
  {
    id: 2,
    title: "New STEM Lab Opens to Students",
    excerpt: "State-of-the-art laboratory facility enhances hands-on learning opportunities for all grade levels.",
    image: "/placeholder.svg?height=200&width=300",
    date: "March 15, 2024",
    category: "Facilities",
  },
  {
    id: 3,
    title: "Spring Arts Festival Showcase",
    excerpt:
      "Students display their creative talents in our annual arts festival featuring music, drama, and visual arts.",
    image: "/placeholder.svg?height=200&width=300",
    date: "March 12, 2024",
    category: "Events",
  },
  {
    id: 4,
    title: "Community Service Initiative Launch",
    excerpt: "New program connects students with local organizations for meaningful community engagement.",
    image: "/placeholder.svg?height=200&width=300",
    date: "March 8, 2024",
    category: "Community",
  },
  {
    id: 5,
    title: "Athletic Teams Excel in Regional Competition",
    excerpt: "Multiple sports teams advance to state championships following outstanding regional performances.",
    image: "/placeholder.svg?height=200&width=300",
    date: "March 5, 2024",
    category: "Sports",
  },
  {
    id: 6,
    title: "Technology Integration Success Story",
    excerpt: "How our 1:1 device program has transformed learning experiences across all subject areas.",
    image: "/placeholder.svg?height=200&width=300",
    date: "March 1, 2024",
    category: "Technology",
  },
  {
    id: 7,
    title: "Parent-Teacher Conference Highlights",
    excerpt: "Successful conferences strengthen home-school partnerships and student support systems.",
    image: "/placeholder.svg?height=200&width=300",
    date: "February 28, 2024",
    category: "Community",
  },
]

export default function Newsroom() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Newsroom</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Stay updated with the latest news, events, and achievements from our school community
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-auto">
                <img
                  src={featuredArticle.image || "/placeholder.svg"}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  {featuredArticle.date}
                  <span className="mx-2">•</span>
                  <Tag className="h-4 w-4 mr-1" />
                  {featuredArticle.category}
                  <span className="mx-2">•</span>
                  {featuredArticle.readTime}
                </div>
                <h2 className="text-3xl font-bold text-blue-800 mb-4">{featuredArticle.title}</h2>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">{featuredArticle.excerpt}</p>
                <Link href={`/newsroom/${featuredArticle.id}`} className="btn-primary inline-flex items-center w-fit">
                  Read Full Story
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-800 mb-4">Latest News</h2>
            <p className="text-xl text-gray-600">Discover what's happening in our school community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article key={article.id} className="card overflow-hidden">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {article.date}
                    </div>
                    <span className="bg-sky-100 text-sky-800 px-2 py-1 rounded-full text-xs">{article.category}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-3 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                  <Link
                    href={`/newsroom/${article.id}`}
                    className="inline-flex items-center text-sky-400 hover:text-sky-500 font-medium"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="btn-secondary">Load More Articles</button>
          </div>
        </div>
      </section>
    </div>
  )
}
