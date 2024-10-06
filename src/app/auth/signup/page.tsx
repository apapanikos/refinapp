"use client";

import { SignUpForm } from "@/src/components/auth/signup-form";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md space-y-6">
        {/* <h1 className="text-2xl font-semibold">Sign In</h1> */}
        <SignUpForm />
      </div>
    </div>
  );
}
