import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import SignOutButton from "@/components/SignOutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-4 sm:p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">User Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Welcome back, {session.user?.name}!
      </p>
      <p className="text-sm text-gray-500">Email: {session.user?.email}</p>

      <div className="mt-6">
        <SignOutButton />
      </div>
    </div>
  );
}
