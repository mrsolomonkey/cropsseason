"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function UserMenu() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className="mt-6">
      <p className="mb-2">Signed in as {session.user?.email}</p>
      <Button onClick={() => signOut()} variant="outline">
        Sign out
      </Button>
    </div>
  );
}
