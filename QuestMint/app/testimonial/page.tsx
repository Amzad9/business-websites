import { Metadata } from 'next'
import TestimonialContent from '@/components/TestimonialContent'

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'What our clients say about QuestMint',
}

export default function Testimonial() {
  return (
    <>
      <TestimonialContent />
    </>
  )
}
