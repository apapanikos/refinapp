import { signOut, useSession } from "next-auth/react";
import { Button } from "@/src/components/ui/button";
import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    return <p>No active session. Redirecting to login...</p>;
  }

  return (
    <div>
      <h2>Welcome, {session.user?.name}</h2>
      {/* <Button onClick={async () => await signOut()}>Sign out</Button> */}
    </div>
  );
}
