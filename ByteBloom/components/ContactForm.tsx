'use client'

import { useState } from 'react'
import FadeIn from './FadeIn'

interface FormData {
  name: string
  email: string
  message: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validateEmail = (email: string) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Reset errors
    const newErrors: Partial<FormData> = {}
    
    // Validate
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Here you would typically send the form data to your backend
    // For now, we'll just show a success message
    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
    setErrors({})
    
    setTimeout(() => {
      setSubmitted(false)
    }, 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <FadeIn delay={0.2}>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-none p-8 md:p-12 shadow-2xl border-4 border-gray-900 hover:border-blue-500 transition-all duration-500"
      >
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-bold mb-2 text-gray-900">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 rounded-xl border-2 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 font-semibold`}
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-2 text-sm text-red-600 font-semibold" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-bold mb-2 text-gray-900">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 rounded-xl border-2 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 font-semibold`}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-2 text-sm text-red-600 font-semibold" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="block text-sm font-bold mb-2 text-gray-900">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-6 py-4 rounded-xl border-2 ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  } bg-gray-50 focus:bg-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 font-semibold resize-none`}
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-2 text-sm text-red-600 font-semibold" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full px-8 py-5 bg-gray-900 text-white rounded-none font-black text-lg uppercase tracking-widest border-2 border-gray-900 hover:bg-blue-600 hover:border-blue-600 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                Send Message
              </button>

              {submitted && (
                <div className="mt-6 p-4 bg-green-50 border-2 border-green-500 rounded-none text-center">
                  <p className="text-green-700 font-bold">
                    ✅ Thank you! Your message has been sent. We'll get back to you soon.
                  </p>
                </div>
              )}
            </form>
    </FadeIn>
  )
}

