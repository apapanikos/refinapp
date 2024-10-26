import { Card, CardFooter, CardHeader } from "@/src/components/ui/card";
import Link from "next/link";

// TODO: Fix UI later

export const ErrorCard = () => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <h2 className="text-2xl">Error</h2>
        <p>There was an error processing your request.</p>
      </CardHeader>
      <CardFooter>
        <Link href="/auth/signin">
          <p className="text-blue-500">Go back to login</p>
        </Link>
      </CardFooter>
    </Card>
  );
};
