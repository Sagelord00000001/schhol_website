import { Download, FileText, Users, GraduationCap } from "lucide-react"
import Link from "next/link"

const admissionSteps = [
  {
    step: 1,
    title: "Submit Application",
    description: "Complete and submit the online application form with required documents",
  },
  {
    step: 2,
    title: "Document Review",
    description: "Our admissions team reviews your application and supporting materials",
  },
  {
    step: 3,
    title: "Assessment & Interview",
    description: "Participate in academic assessment and family interview",
  },
  {
    step: 4,
    title: "Admission Decision",
    description: "Receive admission decision and enrollment information",
  },
  {
    step: 5,
    title: "Enrollment",
    description: "Complete enrollment process and prepare for the new academic year",
  },
]

const forms = [
  {
    title: "Application Form",
    description: "Complete student application form",
    icon: FileText,
  },
  {
    title: "Transcript Request",
    description: "Official academic records form",
    icon: GraduationCap,
  },
  {
    title: "Recommendation Form",
    description: "Teacher recommendation form",
    icon: Users,
  },
]

const faqs = [
  {
    question: "What is the application deadline?",
    answer:
      "Applications are accepted year-round, but priority consideration is given to applications received by March 1st for the following academic year.",
  },
  {
    question: "What documents are required?",
    answer:
      "Required documents include the completed application, official transcripts, teacher recommendations, and standardized test scores (if applicable).",
  },
  {
    question: "Is there an application fee?",
    answer: "Yes, there is a $50 non-refundable application fee that must be submitted with your application.",
  },
  {
    question: "When will I receive an admission decision?",
    answer: "Admission decisions are typically communicated within 2-3 weeks of receiving a complete application.",
  },
]

export default function Admissions() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Admissions</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join our community of learners and begin your journey toward academic excellence
          </p>
          <Link href="#apply" className="btn-accent text-lg">
            Apply Now
          </Link>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-800 mb-4">Admission Process</h2>
            <p className="text-xl text-gray-600">Follow these simple steps to join our school community</p>
          </div>

          <div className="relative">
            {/* Desktop Timeline */}
            <div className="hidden md:block">
              <div className="flex justify-between items-center mb-8">
                {admissionSteps.map((step, index) => (
                  <div key={step.step} className="flex flex-col items-center text-center max-w-xs">
                    <div className="w-16 h-16 bg-blue-800 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                ))}
              </div>
              <div className="absolute top-8 left-0 right-0 h-0.5 bg-blue-200 -z-10"></div>
            </div>

            {/* Mobile Timeline */}
            <div className="md:hidden space-y-6">
              {admissionSteps.map((step, index) => (
                <div key={step.step} className="flex items-start">
                  <div className="w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center text-lg font-bold mr-4 flex-shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Downloadable Forms */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-800 mb-4">Required Forms</h2>
            <p className="text-xl text-gray-600">Download and complete these forms as part of your application</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {forms.map((form, index) => {
              const IconComponent = form.icon
              return (
                <div key={index} className="card p-6 text-center">
                  <IconComponent className="h-12 w-12 text-blue-800 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">{form.title}</h3>
                  <p className="text-gray-600 mb-4">{form.description}</p>
                  <button className="btn-secondary inline-flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Apply Now CTA */}
      <section id="apply" className="py-16 bg-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Apply?</h2>
          <p className="text-xl mb-8">
            Take the first step toward joining our academic community. Start your application today!
          </p>
          <Link href="/contact" className="btn-accent text-lg">
            Start Application
          </Link>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Get answers to common admission questions</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="card p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
