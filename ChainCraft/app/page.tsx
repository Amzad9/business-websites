import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import HomeContent from '@/components/HomeContent'

export const metadata: Metadata = {
  title: 'Home - ChainCraft Digital Agency',
  description: 'ChainCraft is a leading digital agency delivering innovative web design, development, and marketing solutions that transform businesses.',
}

export default function Home() {
  return <HomeContent />
}
