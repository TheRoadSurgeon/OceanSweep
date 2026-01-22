
import { signIn } from "@/auth";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

type Role = "VOLUNTEER" | "EXPERT" | "ORGANIZER" | "CONSULTANT";

interface SignupRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: Role;
  zipcode: string;
}

export async function POST(req: Request): Promise<NextResponse> {
  const {
    firstName,
    lastName,
    email,
    password,
    role,
    zipcode,
  }: SignupRequestBody = await req.json();

  // Basic validation for required fields
  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  // Check if the user already exists
  const existingUser = await prisma.users.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 409 }
    );
  }

  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    // Create the user
    const newUser = await prisma.users.create({
      data: {
        firstname: firstName,
        lastname: lastName,
        email,
        username: email, // Add the username property
        hashedpassword: hashedPassword,
        zip: zipcode,
        userrole: role, // Ensure role is valid
        discardflag: "NO", // If discard_flag is required and has a default value
        status: "ACTIVE", // Add the status property with a default value
      },
    });

    await signIn('credentials', {
        email: newUser.email,
        password: password, // Use plain text password
        redirect: false,    // Prevent automatic redirect
    });
    

    // Remove password from the response for security purposes
    //const { password: _, ...userWithoutPassword }: UserWithoutPassword = newUser;

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
