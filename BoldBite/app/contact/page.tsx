'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import emailjs from '@emailjs/browser'

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
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
          phone: data.phone,
          subject: data.subject,
          message: data.message,
        },
        publicKey
      )

      setSubmitted(true)
      reset()
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('Error sending email:', error)
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-20 min-h-[60vh] relative overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=1080&fit=crop&q=80"
            alt="Contact"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 via-primary-700/80 to-primary-800/90"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50 w-full">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
              Get In <span className="text-primary-200">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-white font-semibold">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-0 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-accent-400/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-50 w-full">
          <div className="max-w-4xl mx-auto">
            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold mb-2 text-black">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-black font-semibold focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 outline-none"
                      placeholder="Your Name"
                      aria-invalid={errors.name ? 'true' : 'false'}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 font-semibold" role="alert">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold mb-2 text-black">
                      Email <span className="text-red-500">*</span>
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
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-black font-semibold focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 outline-none"
                      placeholder="your.email@example.com"
                      aria-invalid={errors.email ? 'true' : 'false'}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 font-semibold" role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold mb-2 text-black">
                      Phone
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-black font-semibold focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 outline-none"
                      placeholder="+91 123 456 7890"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-bold mb-2 text-black">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register('subject', { required: 'Subject is required' })}
                      type="text"
                      id="subject"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-black font-semibold focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 outline-none"
                      placeholder="General Inquiry"
                      aria-invalid={errors.subject ? 'true' : 'false'}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600 font-semibold" role="alert">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-bold mb-2 text-black">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-black font-semibold focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 outline-none resize-none"
                    placeholder="Tell us how we can help..."
                    aria-invalid={errors.message ? 'true' : 'false'}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600 font-semibold" role="alert">
                      {errors.message.message}
                    </p>
                  )}
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

                {submitted && (
                  <div className="mt-6 p-4 bg-green-50 border-2 border-green-500 rounded-xl text-center">
                    <p className="text-green-700 font-bold">Thank you! Your message has been sent.</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

