'use client'

import { useAdaptiveUI } from './AdaptiveUIProvider'

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
  const { getFeatureOrder, trackInteraction } = useAdaptiveUI()
  
  // Reorder features based on usage frequency
  const featureIds = features.map(f => f.id)
  const orderedIds = getFeatureOrder(featureIds)
  const orderedFeatures = orderedIds.map(id => features.find(f => f.id === id)!).filter(Boolean)
  
  // Ensure all features are included
  const missingFeatures = features.filter(f => !orderedIds.includes(f.id))
  const finalFeatures = [...orderedFeatures, ...missingFeatures]

  const handleFeatureClick = (featureId: string) => {
    trackInteraction(`feature-${featureId}`)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {finalFeatures.map((feature) => (
            <div
              key={feature.id}
              onClick={() => handleFeatureClick(feature.id)}
              className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-black">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
