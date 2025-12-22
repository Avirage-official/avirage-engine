import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  return (
    <div style={{ padding: 60, fontFamily: "Inter, sans-serif" }}>
      <h1>Dashboard</h1>
      <p>Welcome! You're logged in as user: {userId}</p>
      <p>Your quiz results will appear here soon.</p>
    </div>
  )
}
