"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="p-6">
      {!session ? (
        <button
          onClick={() => signIn("google")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Sign in with Google
        </button>
      ) : (
        <div>
          <p>Welcome, {session.user?.name}</p>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-gray-700 text-white rounded"
          >
            Sign out
          </button>
        </div>
      )}
    </main>
  );
}
