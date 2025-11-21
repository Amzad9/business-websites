import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about ZipGrid and our mission to transform businesses.',
}

export default function About() {
  return (
    <div className="pt-20 min-h-screen">
      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-5xl font-bold text-center mb-6">About ZipGrid</h1>
          </div>
          <div>
            <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We are a team of passionate professionals dedicated to delivering exceptional results
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div>
                <h2 className="text-4xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  ZipGrid was founded with a vision to revolutionize how businesses operate in the
                  digital age. We combine innovation, expertise, and dedication to deliver solutions
                  that drive real results.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Our team consists of industry experts who bring years of experience and a
                  passion for excellence to every project. We believe in building long-term
                  partnerships with our clients.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Today, ZipGrid serves clients across various industries, helping them achieve
                  their goals through innovative technology and strategic thinking.
                </p>
              </div>
            </div>
            <div>
              <div
                className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-8 text-white hover:shadow-xl transition-shadow">
                <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg">
                  To empower businesses with innovative solutions that drive growth, efficiency,
                  and success in an ever-evolving digital landscape.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Innovation', description: 'We embrace new ideas and technologies' },
              { title: 'Integrity', description: 'We operate with honesty and transparency' },
              { title: 'Excellence', description: 'We strive for perfection in everything we do' },
            ].map((value, index) => (
              <div>
                <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl">
                  <h3 className="text-2xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

