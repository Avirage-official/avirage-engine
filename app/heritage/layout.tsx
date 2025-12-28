import type { Metadata } from 'next'
import { Crimson_Text, Cinzel } from 'next/font/google'

const crimsonText = Crimson_Text({
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-crimson',
})

const cinzel = Cinzel({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cinzel',
})

export const metadata: Metadata = {
  title: 'Cultural Heritage | Avirage',
  description: 'Deep historical context and cultural lineage for your Cultural Code',
}

export default function HeritageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${crimsonText.variable} ${cinzel.variable}`}>
      {children}
    </div>
  )
}
