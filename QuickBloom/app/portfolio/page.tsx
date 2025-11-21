import { Metadata } from 'next'
import PortfolioContent from '@/components/PortfolioContent'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Explore our portfolio of successful projects',
}

export default function Portfolio() {
  return (
    <>
      <PortfolioContent />
    </>
  )
}
