"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/login" })}
      variant="destructive"
      className="w-full sm:w-auto"
    >
      Sign out
    </Button>
  );
}
