import { auth } from "@/auth";
import { SignOutButton } from "@/src/components/auth/sign-out-button";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    return <p>No active session. Redirecting to login...</p>;
  }

  return (
    <div>
      <h2>
        Welcome, {session?.user?.name}!
        {session?.user && (
          <ul>
            {Object.entries(session.user).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value ?? "N/A"}
              </li>
            ))}
          </ul>
        )}
      </h2>
      <SignOutButton />
    </div>
  );
}
