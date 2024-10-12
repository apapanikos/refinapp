// app/api/auth/signup/route.ts
import { NextResponse } from "next/server";
import { db } from "@/src/db/drizzle";
import { users, InsertUser } from "@/src/db/schema";
import { hashPassword } from "@/src/lib/auth/utils";
import { eq } from "drizzle-orm";

// API route to handle user sign-up
export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password } = await req.json();

    // Check if user already exists by email
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password before storing it in the database
    const hashedPassword = await hashPassword(password);

    // Create a new user object based on your InsertUser type
    const newUser: InsertUser = {
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      createdAt: new Date(), // Automatically insert the current timestamp
      updatedAt: new Date(), // Automatically insert the current timestamp
    };

    // Insert the new user into the database
    const insertedUser = await db
      .insert(users)
      .values(newUser)
      .returning({ id: users.id });

    return NextResponse.json({ success: true, userId: insertedUser[0].id });
  } catch {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
