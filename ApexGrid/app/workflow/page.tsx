import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Workflow',
  description: 'Our streamlined workflow process',
}

const workflowSteps = [
  {
    step: 1,
    title: 'Discovery',
    description: 'We start by understanding your business needs and goals',
  },
  {
    step: 2,
    title: 'Planning',
    description: 'We create a detailed plan tailored to your requirements',
  },
  {
    step: 3,
    title: 'Execution',
    description: 'Our team implements the solution with precision and care',
  },
  {
    step: 4,
    title: 'Review',
    description: 'We review and refine to ensure everything meets your expectations',
  },
  {
    step: 5,
    title: 'Launch',
    description: 'We launch your solution and provide ongoing support',
  },
]

export default function Workflow() {
  return (
    <div className="pt-20 min-h-screen">
      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-5xl font-bold text-center mb-6">Our Workflow</h1>
          </div>
          <div>
            <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A streamlined process designed to deliver exceptional results
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-800 hidden md:block" />
            <div className="space-y-12">
              {workflowSteps.map((step, index) => (
                <div>
                  <div className="relative flex items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl z-10 relative">
                      {step.step}
                    </div>
                    <div className="ml-8 flex-1">
                      <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

