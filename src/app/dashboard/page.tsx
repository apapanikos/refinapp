"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "../../../auth";

export default function Page() {
  return (
    <div>
      <h1>Dashboard - Test Authentication Flows</h1>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
}
