'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ConversationalInterface() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I can help you navigate our website, answer questions, or assist with bookings. How can I help you today?',
    },
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      role: 'user',
      content: input,
    }
    setMessages([...messages, userMessage])
    setInput('')

    // Simple AI-like responses based on keywords
    setTimeout(() => {
      const lowerInput = input.toLowerCase()
      let response = "I'm here to help! Could you tell me more about what you're looking for?"

      if (lowerInput.includes('service') || lowerInput.includes('what do you offer')) {
        response = 'We offer Web Design, Development, UI/UX Design, and Consulting services. Would you like to learn more about any specific service?'
      } else if (lowerInput.includes('contact') || lowerInput.includes('get in touch')) {
        response = 'You can contact us through our contact page or email us at info@chaincraft.com. Would you like me to take you to the contact page?'
      } else if (lowerInput.includes('portfolio') || lowerInput.includes('work')) {
        response = 'Check out our portfolio to see examples of our work. We have projects across various industries. Would you like to see it?'
      } else if (lowerInput.includes('price') || lowerInput.includes('cost')) {
        response = 'Our pricing varies based on project scope. I recommend scheduling a consultation for a customized quote. Shall I help you schedule one?'
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        response = 'Hello! Welcome to ChainCraft. How can I assist you today?'
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
      }
      setMessages((prev) => [...prev, assistantMessage])
    }, 500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Chat Toggle Button - Show when chat is closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="chat-button-fixed bg-blue-600 text-white rounded-full shadow-xl hover:bg-blue-700 hover:shadow-2xl transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 group"
          style={{ 
            position: 'fixed',
            bottom: '16px',
            right: '16px',
            width: '56px',
            height: '56px',
            minWidth: '56px', 
            minHeight: '56px',
            maxWidth: '56px',
            maxHeight: '56px',
            padding: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            margin: 0,
            border: 'none',
            cursor: 'pointer',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            WebkitTransform: 'translateZ(0)',
            isolation: 'isolate'
          } as React.CSSProperties}
          aria-label=""
        >
          <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg
              className="w-6 h-6 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {/* Pulse animation - 1.2s duration */}
            <span 
              className="absolute inset-0 rounded-full bg-blue-600 pulse-chat opacity-75 group-hover:opacity-0"
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            ></span>
          </div>
        </button>
      )}
      
      {/* Chat Window - Show when chat is open */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-6 right-4 z-50 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col max-h-[600px] overflow-hidden"
        >
          {/* Chat Header - Modern Design */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white px-5 py-4 rounded-t-2xl flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-sm">Chat Assistant</h3>
                <p className="text-xs text-blue-100">We're here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 hover:rotate-90"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages - Clean Modern Design */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-gray-50 to-white custom-scrollbar">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl rounded-br-md px-4 py-3 shadow-md'
                      : 'bg-white text-gray-800 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-gray-100'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input - Modern Design */}
          <div className="p-4 bg-white border-t border-gray-100 flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm placeholder-gray-400"
                aria-label="Chat input"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                style={{ minHeight: '48px', minWidth: '48px' }}
                aria-label="Send message"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}

