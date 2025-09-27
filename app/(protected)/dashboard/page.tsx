import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import SignOutButton from "@/components/SignOutButton"
import { CryptoCountsChart } from "@/components/CryptoCountChart"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">{session.user?.name}</h1>
          <p className="text-gray-600">{session.user?.email}</p>
        </div>
        {/* Sign out icon always on the right */}
        <SignOutButton />
      </header>

      {/* Unified Chart */}
      <section>
        <CryptoCountsChart />
      </section>
    </div>
  )
}
