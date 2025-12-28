import type { Metadata } from 'next'

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
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&display=swap');
      `}</style>
      {children}
    </>
  )
}
