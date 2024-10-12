import { auth } from "@/auth";
import { SignOutButton } from "@/src/components/auth/SignOutButton";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    return <p>No active session. Redirecting to login...</p>;
  }

  return (
    <div>
      <h2>Welcome, {session.user?.name}</h2>
      <SignOutButton />
    </div>
  );
}
