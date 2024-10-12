"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/src/components/ui/button"; // ShadCN Button component

export const SignOutButton = () => {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" }); // Redirect after sign out (optional)
  };

  return (
    <Button variant="outline" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
};
