// src/app/api/users/route.ts
import { NextResponse } from "next/server";
import { createUser } from "@/src/db/queries/users/insert";
import { getAllUsers } from "@/src/db/queries/users/select";

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    await createUser({ email, name });

    // Return success response
    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Error creating user", error: error },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const allUsers = await getAllUsers();

    return NextResponse.json(allUsers, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Error fetching users", error: error },
      { status: 500 }
    );
  }
}
