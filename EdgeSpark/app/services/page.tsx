import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Comprehensive services to transform your business.',
}

const services = [
  {
    title: 'Consulting',
    description: 'Strategic consulting to help you make informed decisions',
    icon: '💼',
  },
  {
    title: 'Development',
    description: 'Custom software development tailored to your needs',
    icon: '💻',
  },
  {
    title: 'Design',
    description: 'Beautiful, user-friendly designs that convert',
    icon: '🎨',
  },
  {
    title: 'Marketing',
    description: 'Digital marketing strategies to grow your business',
    icon: '📢',
  },
  {
    title: 'Analytics',
    description: 'Data-driven insights to optimize performance',
    icon: '📊',
  },
  {
    title: 'Support',
    description: '24/7 support to keep your business running smoothly',
    icon: '🛟',
  },
]

export default function Services() {
  return (
    <div className="pt-20 min-h-screen">
      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-5xl font-bold text-center mb-6">Our Services</h1>
          </div>
          <div>
            <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive solutions to help your business thrive
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div>
                <div
                  className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
                >
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

