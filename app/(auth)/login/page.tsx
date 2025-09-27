"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow">
        <h1 className="text-2xl font-bold text-center">Welcome back</h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Login with your Google account or continue with email
        </p>

        {/* Google login */}
        <div className="flex flex-col gap-3">
          <Button
            variant="outline"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full"
          >
            <svg
              className="mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
              fill="currentColor"
            >
              <path d="M488 261.8c0-17.8-1.6-35-4.6-51.8H249v98.1h135.7c-5.9 
              31.8-23.6 58.7-50.3 76.7v63.7h81.2c47.5-43.8 
              74.4-108.3 74.4-186.7z" />
              <path d="M249 492c67.5 0 124.1-22.4 
              165.5-60.8l-81.2-63.7c-22.5 15.1-51.3 
              24-84.3 24-64.9 0-119.8-43.8-139.5-102.7H27.4v64.5C68.8 
              444.6 152.1 492 249 492z" />
              <path d="M109.5 288.8c-4.8-14.3-7.5-29.5-7.5-45s2.7-30.7 
              7.5-45V134.3H27.4C9.8 171.1 0 209.5 
              0 248.8s9.8 77.7 27.4 114.5l82.1-64.5z" />
              <path d="M249 97.5c36.7 0 69.6 12.6 
              95.6 37.4l71.6-71.6C373.1 24.6 316.5 
              0 249 0 152.1 0 68.8 47.4 27.4 
              134.3l82.1 64.5c19.7-58.9 74.6-102.7 
              139.5-102.7z" />
            </svg>
            Sign in with Google
          </Button>
        </div>

        <div className="my-6 flex items-center">
          <Separator className="flex-1" />
          <span className="px-2 text-sm text-gray-400">Or continue with</span>
          <Separator className="flex-1" />
        </div>

        {/* Email/password form (optional placeholder) */}
        <form className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot your password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
