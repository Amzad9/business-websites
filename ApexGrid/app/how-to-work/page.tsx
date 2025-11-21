import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How to Work',
  description: 'Step-by-step process of how we work with clients',
}

const processSteps = [
  {
    step: 'Step 1',
    title: 'Initial Consultation',
    description: 'Schedule a free consultation to discuss your project needs and goals.',
  },
  {
    step: 'Step 2',
    title: 'Proposal & Agreement',
    description: 'We provide a detailed proposal and once approved, we sign the agreement.',
  },
  {
    step: 'Step 3',
    title: 'Project Kickoff',
    description: 'We assemble the team and begin the project with a comprehensive kickoff meeting.',
  },
  {
    step: 'Step 4',
    title: 'Development & Updates',
    description: 'Regular updates and milestones keep you informed throughout the process.',
  },
  {
    step: 'Step 5',
    title: 'Review & Feedback',
    description: 'You review the work and provide feedback for any adjustments needed.',
  },
  {
    step: 'Step 6',
    title: 'Final Delivery',
    description: 'We deliver the final product and provide training and documentation.',
  },
]

export default function HowToWork() {
  return (
    <div className="pt-20 min-h-screen">
      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-5xl font-bold text-center mb-6">How We Work</h1>
          </div>
          <div>
            <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A clear, transparent process from start to finish
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((item, index) => (
              <div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow hover:-translate-y-2">
                  <div className="text-sm font-semibold text-primary-600 mb-2">{item.step}</div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

