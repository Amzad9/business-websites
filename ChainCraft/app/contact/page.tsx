'use client'

import AdaptivePageWrapper from '@/components/AdaptivePageWrapper'
import { useAdaptiveUI } from '@/components/AdaptiveUIProvider'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import emailjs from '@emailjs/browser'
import Image from 'next/image'

interface FormData {
  name: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
  projectType?: string
  budget?: string
  timeline?: string
}

export default function Contact() {
  const { trackInteraction } = useAdaptiveUI()
  const [submitted, setSubmitted] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [formStep, setFormStep] = useState(1)
  const [filledData, setFilledData] = useState<Partial<FormData>>({})
  
  const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm<FormData>()

  const watchedSubject = watch('subject', '')
  const watchedName = watch('name', '')
  const watchedEmail = watch('email', '')

  // Progressive form: Check localStorage for existing data
  useEffect(() => {
    const savedData = localStorage.getItem('chaincraft-lead-data')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setFilledData(parsed)
        if (parsed.name) setValue('name', parsed.name)
        if (parsed.email) setValue('email', parsed.email)
        if (parsed.phone) setValue('phone', parsed.phone)
        if (parsed.company) setValue('company', parsed.company)
        if (parsed.subject) setValue('subject', parsed.subject)
        if (parsed.message) setValue('message', parsed.message)
        if (parsed.projectType) setValue('projectType', parsed.projectType)
        if (parsed.budget) setValue('budget', parsed.budget)
        if (parsed.timeline) setValue('timeline', parsed.timeline)
        
        // Progress to next step if basic info exists
        if (parsed.name && parsed.email) {
          setFormStep(2)
        }
      } catch (error) {
        console.error('Error loading saved data:', error)
      }
    }
  }, [setValue])

  // Save form data progressively
  useEffect(() => {
    const dataToSave: Partial<FormData> = {}
    if (watchedName) dataToSave.name = watchedName
    if (watchedEmail) dataToSave.email = watchedEmail
    if (watchedSubject) dataToSave.subject = watchedSubject
    
    if (Object.keys(dataToSave).length > 0) {
      const existingData = localStorage.getItem('chaincraft-lead-data')
      const merged = existingData ? { ...JSON.parse(existingData), ...dataToSave } : dataToSave
      localStorage.setItem('chaincraft-lead-data', JSON.stringify(merged))
      setFilledData(merged)
    }
  }, [watchedName, watchedEmail, watchedSubject])

  // Simple suggestions based on input
  const subjectKeywords: Record<string, string[]> = {
    'web': ['Web Design', 'Web Development', 'Website Redesign'],
    'design': ['UI/UX Design', 'Brand Design', 'Graphic Design'],
    'app': ['Mobile App', 'Application Development'],
    'marketing': ['Digital Marketing', 'SEO', 'Social Media'],
    'help': ['Support', 'Consultation', 'General Inquiry'],
  }

  // Update suggestions
  useEffect(() => {
    if (watchedSubject) {
      const lowerSubject = watchedSubject.toLowerCase()
      const foundSuggestions: string[] = []
      
      Object.entries(subjectKeywords).forEach(([key, values]) => {
        if (lowerSubject.includes(key)) {
          foundSuggestions.push(...values)
        }
      })

      setSuggestions(foundSuggestions.slice(0, 3))
    } else {
      setSuggestions([])
    }
  }, [watchedSubject])

  const onSubmit = async (data: FormData) => {
    try {
      trackInteraction('form-submit')
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      if (!publicKey) {
        console.error('EmailJS public key not configured')
        return
      }

      await emailjs.send(
        'service_id',
        'template_id',
        {
          from_name: data.name,
          from_email: data.email,
          phone: data.phone || 'Not provided',
          company: data.company || 'Not provided',
          subject: data.subject,
          message: data.message,
          projectType: data.projectType || 'Not specified',
          budget: data.budget || 'Not specified',
          timeline: data.timeline || 'Not specified',
        },
        publicKey
      )

      setSubmitted(true)
      reset()
      setSuggestions([])
      localStorage.removeItem('chaincraft-lead-data')
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('Error sending email:', error)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setValue('subject', suggestion)
    setSuggestions([])
    trackInteraction('suggestion-used')
  }

  // Progress to next step
  const handleNextStep = () => {
    if (formStep === 1 && watchedName && watchedEmail) {
      setFormStep(2)
      trackInteraction('form-step-2')
    } else if (formStep === 2 && watchedSubject) {
      setFormStep(3)
      trackInteraction('form-step-3')
    }
  }

  return (
    <AdaptivePageWrapper pageType="contact">
      {/* Hero Section - Text-Only Hero */}
      <section className="relative py-32 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 overflow-hidden">
        {/* Organic Shapes Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-orange-300/30 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-rose-200/30 to-pink-300/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mx-auto">
            {/* Asymmetrical Layout */}
            <div className="grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-7 space-y-8">
                <div className="space-y-6">
                  <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight">
                    <span className="block text-amber-900">Get In</span>
                    <span className="block text-orange-600">Touch</span>
                    <span className="block text-rose-600 text-7xl md:text-8xl lg:text-9xl">With Us</span>
                  </h1>
                  
                  <p className="text-2xl md:text-3xl text-amber-900/80 font-medium max-w-2xl leading-relaxed">
                    Let's discuss how we can transform your business with innovative digital solutions. We'd love to hear from you.
                  </p>
                </div>
              </div>
              
              {/* Image with Organic Shape Overlay */}
              <div className="md:col-span-5 relative">
                <div className="relative aspect-square rounded-3xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=800&fit=crop"
                    alt="Contact Us"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Graphical Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-rose-400/20"></div>
                  {/* Organic Shape Overlay */}
                  <svg className="absolute bottom-0 left-0 w-full h-1/3" viewBox="0 0 400 200" preserveAspectRatio="none">
                    <path d="M0,200 Q100,100 200,150 T400,100 L400,200 Z" fill="rgba(251, 191, 36, 0.3)" className="organic-shape"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form - Progressive Forms (Trend #22) with Big Blocks */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          {/* Form Progress Indicator */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full font-black text-lg transition-all duration-300 ${
                    formStep >= step
                      ? 'bg-gradient-to-br from-amber-600 to-orange-600 text-white shadow-lg scale-110'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {formStep > step ? '✓' : step}
                  </div>
                  {step < 3 && (
                    <div className={`flex-1 h-1 mx-4 rounded-full transition-all duration-300 ${
                      formStep > step ? 'bg-gradient-to-r from-amber-600 to-orange-600' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm font-semibold text-gray-600">
              <span>Basic Info</span>
              <span>Project Details</span>
              <span>Message</span>
            </div>
          </div>

          {/* Big Block Form Container */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-2xl border-4 border-amber-900/20 p-8 md:p-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Step 1: Basic Information */}
              {(formStep === 1 || filledData.name || filledData.email) && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-black text-amber-900 mb-6">Basic Information</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name Field */}
          <div>
                      <label htmlFor="name" className="block text-base font-bold mb-3 text-amber-900">
                        Full Name <span className="text-rose-600">*</span>
                </label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  type="text"
                  id="name"
                        className={`w-full px-6 py-4 rounded-xl border-4 transition-all duration-300 text-lg font-medium ${
                          errors.name 
                            ? 'border-rose-500 bg-rose-50' 
                            : 'border-gray-300 focus:border-amber-600 focus:ring-4 focus:ring-amber-300'
                        } bg-white text-gray-900 outline-none hover:border-amber-400`}
                        placeholder="John Doe"
                />
                {errors.name && (
                        <p className="mt-2 text-sm font-semibold text-rose-600">{errors.name.message}</p>
                )}
              </div>

                    {/* Email Field */}
                    <div>
                      <label htmlFor="email" className="block text-base font-bold mb-3 text-amber-900">
                        Email Address <span className="text-rose-600">*</span>
                </label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  id="email"
                        className={`w-full px-6 py-4 rounded-xl border-4 transition-all duration-300 text-lg font-medium ${
                          errors.email 
                            ? 'border-rose-500 bg-rose-50' 
                            : 'border-gray-300 focus:border-amber-600 focus:ring-4 focus:ring-amber-300'
                        } bg-white text-gray-900 outline-none hover:border-amber-400`}
                        placeholder="john@example.com"
                />
                {errors.email && (
                        <p className="mt-2 text-sm font-semibold text-rose-600">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Phone Field */}
                    <div>
                      <label htmlFor="phone" className="block text-base font-bold mb-3 text-amber-900">
                        Phone Number
                      </label>
                      <input
                        {...register('phone')}
                        type="tel"
                        id="phone"
                        className="w-full px-6 py-4 rounded-xl border-4 border-gray-300 bg-white text-gray-900 focus:border-amber-600 focus:ring-4 focus:ring-amber-300 transition-all duration-300 text-lg font-medium outline-none hover:border-amber-400"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    {/* Company Field - Progressive: Only show if we have name/email */}
                    {(filledData.name || filledData.email || formStep > 1) && (
                      <div>
                        <label htmlFor="company" className="block text-base font-bold mb-3 text-amber-900">
                          Company Name
                        </label>
                        <input
                          {...register('company')}
                          type="text"
                          id="company"
                          className="w-full px-6 py-4 rounded-xl border-4 border-gray-300 bg-white text-gray-900 focus:border-amber-600 focus:ring-4 focus:ring-amber-300 transition-all duration-300 text-lg font-medium outline-none hover:border-amber-400"
                          placeholder="Your Company"
                        />
                      </div>
                    )}
                  </div>

                  {formStep === 1 && (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      disabled={!watchedName || !watchedEmail}
                      className="w-full md:w-auto px-10 py-5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-black text-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-amber-300"
                      style={{ minHeight: '60px' }}
                    >
                      Continue to Project Details
                      <svg className="inline-block ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  )}
                </div>
              )}

              {/* Step 2: Project Details - Progressive: Only show after step 1 */}
              {(formStep >= 2 || (filledData.name && filledData.email)) && (
                <div className="space-y-6 pt-8 border-t-4 border-amber-900/20">
                  <h2 className="text-3xl font-black text-amber-900 mb-6">Project Details</h2>
                  
                  {/* Subject Field with Suggestions */}
                  <div className="relative">
                    <label htmlFor="subject" className="block text-base font-bold mb-3 text-amber-900">
                      Project Type / Subject <span className="text-rose-600">*</span>
                    </label>
                    <input
                      {...register('subject', { required: 'Subject is required' })}
                      type="text"
                      id="subject"
                      className={`w-full px-6 py-4 rounded-xl border-4 transition-all duration-300 text-lg font-medium ${
                        errors.subject 
                          ? 'border-rose-500 bg-rose-50' 
                          : 'border-gray-300 focus:border-amber-600 focus:ring-4 focus:ring-amber-300'
                      } bg-white text-gray-900 outline-none hover:border-amber-400`}
                      placeholder="What project are you interested in?"
                    />
                    
                    {/* Suggestions - Big Blocks */}
                    {suggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border-4 border-amber-900/20 z-10 overflow-hidden">
                        {suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full px-6 py-4 text-left hover:bg-amber-50 font-bold text-amber-900 transition-colors border-b border-gray-200 last:border-0 flex items-center gap-3"
                          >
                            <span className="text-2xl">💡</span>
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}

                    {errors.subject && (
                      <p className="mt-2 text-sm font-semibold text-rose-600">{errors.subject.message}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Project Type */}
                    <div>
                      <label htmlFor="projectType" className="block text-base font-bold mb-3 text-amber-900">
                        Project Type
                      </label>
                      <select
                        {...register('projectType')}
                        id="projectType"
                        className="w-full px-6 py-4 rounded-xl border-4 border-gray-300 bg-white text-gray-900 focus:border-amber-600 focus:ring-4 focus:ring-amber-300 transition-all duration-300 text-lg font-medium outline-none hover:border-amber-400"
                      >
                        <option value="">Select Type</option>
                        <option value="web-design">Web Design</option>
                        <option value="web-development">Web Development</option>
                        <option value="branding">Branding</option>
                        <option value="marketing">Digital Marketing</option>
                        <option value="consulting">Consulting</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Budget - Progressive: Only show if we have subject */}
                    {(filledData.subject || formStep > 2) && (
                      <>
                        <div>
                          <label htmlFor="budget" className="block text-base font-bold mb-3 text-amber-900">
                            Budget Range
                          </label>
                          <select
                            {...register('budget')}
                            id="budget"
                            className="w-full px-6 py-4 rounded-xl border-4 border-gray-300 bg-white text-gray-900 focus:border-amber-600 focus:ring-4 focus:ring-amber-300 transition-all duration-300 text-lg font-medium outline-none hover:border-amber-400"
                          >
                            <option value="">Select Budget</option>
                            <option value="under-10k">Under $10,000</option>
                            <option value="10k-50k">$10,000 - $50,000</option>
                            <option value="50k-100k">$50,000 - $100,000</option>
                            <option value="over-100k">Over $100,000</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="timeline" className="block text-base font-bold mb-3 text-amber-900">
                            Timeline
                          </label>
                          <select
                            {...register('timeline')}
                            id="timeline"
                            className="w-full px-6 py-4 rounded-xl border-4 border-gray-300 bg-white text-gray-900 focus:border-amber-600 focus:ring-4 focus:ring-amber-300 transition-all duration-300 text-lg font-medium outline-none hover:border-amber-400"
                          >
                            <option value="">Select Timeline</option>
                            <option value="asap">ASAP</option>
                            <option value="1-3months">1-3 Months</option>
                            <option value="3-6months">3-6 Months</option>
                            <option value="6-12months">6-12 Months</option>
                            <option value="flexible">Flexible</option>
                          </select>
                        </div>
                      </>
                )}
              </div>

                  {formStep === 2 && (
                    <button
                      type="button"
                      onClick={() => {
                        setFormStep(3)
                        trackInteraction('form-step-3')
                      }}
                      disabled={!watchedSubject}
                      className="w-full md:w-auto px-10 py-5 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-black text-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-amber-300"
                      style={{ minHeight: '60px' }}
                    >
                      Continue to Message
                      <svg className="inline-block ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  )}
                </div>
              )}

              {/* Step 3: Message */}
              {(formStep === 3 || (filledData.subject)) && (
                <div className="space-y-6 pt-8 border-t-4 border-amber-900/20">
                  <h2 className="text-3xl font-black text-amber-900 mb-6">Tell Us More</h2>
                  
                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-base font-bold mb-3 text-amber-900">
                      Project Details / Message <span className="text-rose-600">*</span>
                </label>
                <textarea
                      {...register('message', { 
                        required: 'Message is required',
                        minLength: { value: 20, message: 'Message must be at least 20 characters' }
                      })}
                  id="message"
                      rows={8}
                      className={`w-full px-6 py-4 rounded-xl border-4 resize-none transition-all duration-300 text-lg font-medium ${
                        errors.message 
                          ? 'border-rose-500 bg-rose-50' 
                          : 'border-gray-300 focus:border-amber-600 focus:ring-4 focus:ring-amber-300'
                      } bg-white text-gray-900 outline-none hover:border-amber-400`}
                      placeholder="Tell us about your project, goals, timeline, and any specific requirements. The more details you provide, the better we can help you..."
                />
                {errors.message && (
                      <p className="mt-2 text-sm font-semibold text-rose-600">{errors.message.message}</p>
                )}
              </div>

                  {/* Submit Button - Big Block */}
                  <button
                type="submit"
                    className="w-full px-10 py-6 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white rounded-2xl font-black text-xl hover:from-amber-700 hover:via-orange-700 hover:to-rose-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-amber-300"
                    style={{ minHeight: '64px' }}
              >
                Send Message
                    <svg className="inline-block ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>

                  {/* Success Message - Big Block */}
              {submitted && (
                    <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-4 border-green-500 rounded-2xl shadow-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-black text-green-900 text-xl mb-2">Message Sent Successfully!</p>
                          <p className="text-green-800 font-medium">We'll get back to you within 24 hours. Our team is excited to work with you!</p>
                        </div>
                      </div>
                    </div>
              )}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </AdaptivePageWrapper>
  )
}
