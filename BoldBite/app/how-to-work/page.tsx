import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Work',
  description: 'Step-by-step process of how we work with clients',
}

const processSteps = [
  {
    step: 'Step 1',
    title: 'Initial Consultation',
    description: 'Schedule a free consultation to discuss your project needs, goals, and expectations in detail.',
    icon: '📞',
    gradient: 'from-primary-500 to-primary-600',
  },
  {
    step: 'Step 2',
    title: 'Proposal & Agreement',
    description: 'We provide a detailed proposal with timeline and pricing. Once approved, we sign the agreement.',
    icon: '📝',
    gradient: 'from-accent-400 to-accent-500',
  },
  {
    step: 'Step 3',
    title: 'Project Kickoff',
    description: 'We assemble the perfect team and begin your project with a comprehensive kickoff meeting.',
    icon: '🚀',
    gradient: 'from-primary-400 to-accent-500',
  },
  {
    step: 'Step 4',
    title: 'Development & Updates',
    description: 'Regular updates and milestone reviews keep you informed and involved throughout the process.',
    icon: '⚡',
    gradient: 'from-accent-500 to-primary-600',
  },
  {
    step: 'Step 5',
    title: 'Review & Feedback',
    description: 'You review the work and provide feedback. We make adjustments to ensure perfection.',
    icon: '🔍',
    gradient: 'from-primary-500 to-accent-500',
  },
  {
    step: 'Step 6',
    title: 'Final Delivery',
    description: 'We deliver the final product and provide comprehensive training and documentation.',
    icon: '🎉',
    gradient: 'from-accent-400 to-primary-600',
  },
]

export default function HowToWork() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-20 min-h-[60vh] relative overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop&q=80"
            alt="How to Work"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 via-primary-700/80 to-primary-800/90"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50 w-full">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
              How We <span className="text-primary-200">Work</span>
            </h1>
            <p className="text-xl md:text-2xl text-white font-semibold">
              A clear, transparent process from start to finish
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-0 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-accent-400/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((item, index) => (
              <div>
                <div className="group relative p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl border-2 border-gray-200 hover:border-primary-500 transition-all duration-500 hover:-translate-y-2">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className="text-5xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500">
                      {item.icon}
                    </div>
                    <div className="text-sm font-black text-primary-600 mb-2 uppercase tracking-wider">
                      {item.step}
                    </div>
                    <h3 className="text-2xl font-black mb-3 text-white group-hover:text-primary-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-black/80 leading-relaxed font-semibold">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-400/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50 w-full">
          <div>
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-black mb-6 text-black">
                Get In <span className="text-primary-700">Touch</span>
              </h2>
              <p className="text-xl text-black/80 max-w-3xl mx-auto font-semibold">
                Ready to get started? Contact us today and let's begin your journey.
              </p>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div>
              <form className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold mb-2 text-black">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-black font-semibold focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 outline-none"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold mb-2 text-black">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-black font-semibold focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 outline-none"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold mb-2 text-black">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-black font-semibold focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 outline-none"
                      placeholder="+91 123 456 7890"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-bold mb-2 text-black">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-black font-semibold focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 outline-none"
                      placeholder="Project Inquiry"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-bold mb-2 text-black">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-black font-semibold focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 outline-none resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                
                <div className="text-center">
                  <button
                    type="submit"
                    className="group relative px-12 py-5 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl font-bold text-lg hover:from-primary-500 hover:to-primary-400 transition-all duration-300 shadow-2xl hover:shadow-primary-500/50 transform hover:scale-110 active:scale-95 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-xl"></span>
                    <span className="relative z-10 flex items-center justify-center">
                      Send Message
                      <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
