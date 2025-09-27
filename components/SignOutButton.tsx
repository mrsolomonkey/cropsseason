"use client"

import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="flex items-center justify-center p-2 rounded-md hover:bg-gray-100 text-gray-600"
      aria-label="Sign out"
    >
      <LogOut className="h-5 w-5" />
    </button>
  )
}
