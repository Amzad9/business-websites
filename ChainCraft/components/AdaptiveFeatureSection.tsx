'use client'

import { useAdaptiveUI } from './AdaptiveUIProvider'
import { motion } from 'framer-motion'
import FadeIn from './FadeIn'

interface Feature {
  title: string
  description: string
  icon: string
  gradient: string
  id: string
}

interface AdaptiveFeatureSectionProps {
  features: Feature[]
  title: string
  subtitle?: string
}

export default function AdaptiveFeatureSection({ 
  features, 
  title, 
  subtitle 
}: AdaptiveFeatureSectionProps) {
  const { getFeatureOrder, animationSpeed, trackInteraction } = useAdaptiveUI()
  
  // Reorder features based on usage frequency
  const featureIds = features.map(f => f.id)
  const orderedIds = getFeatureOrder(featureIds)
  const orderedFeatures = orderedIds.map(id => features.find(f => f.id === id)!).filter(Boolean)
  
  // Ensure all features are included (in case of new features not in behavior)
  const missingFeatures = features.filter(f => !orderedIds.includes(f.id))
  const finalFeatures = [...orderedFeatures, ...missingFeatures]

  const handleFeatureClick = (featureId: string) => {
    trackInteraction(`feature-${featureId}`)
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 * animationSpeed }}
        >
          <h2 className="text-5xl md:text-6xl font-black text-center mb-4 text-black">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-black/80 text-center max-w-3xl mx-auto font-semibold mb-16">
              {subtitle}
            </p>
          )}
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {finalFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.15 * animationSpeed,
                duration: 0.6 * animationSpeed 
              }}
              onClick={() => handleFeatureClick(feature.id)}
              className="group relative p-8 bg-white border-2 border-gray-300 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:border-primary-500 hover:-translate-y-2 hover:scale-105 cursor-pointer"
            >
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} 
              />
              
              <div className="relative z-10">
                <motion.div 
                  className="text-6xl mb-6 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12"
                  whileHover={{ rotate: 15 }}
                  transition={{ duration: 0.3 * animationSpeed }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-3xl font-bold mb-4 text-black group-hover:text-primary-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-black text-lg leading-relaxed font-semibold">
                  {feature.description}
                </p>
              </div>
              
              <div 
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


