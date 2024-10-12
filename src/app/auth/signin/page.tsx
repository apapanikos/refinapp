/* eslint-disable @typescript-eslint/no-explicit-any */
import { SignInForm } from "@/src/components/auth/signin-form";
// import { useSession } from "next-auth/react";
// import { redirect } from "next/navigation";

export default function SignInPage() {
  // const session = useSession();

  // if (session) {
  //   // If already signed in, redirect to the dashboard
  //   return redirect("/dashboard");
  // }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md space-y-6">
        {/* <h1 className="text-2xl font-semibold">Sign In</h1> */}
        <SignInForm />
      </div>
    </div>
  );
}
