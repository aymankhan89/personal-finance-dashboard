import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../../../packages/database/lib/db";

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(request: NextRequest) {
  try {
    console.log("📝 Registration API called");

    const body = await request.json();
    console.log("📦 Request body:", { ...body, password: "[HIDDEN]" });

    const { firstName, lastName, email, password } = registerSchema.parse(body);
    console.log("✅ Validation passed");

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("❌ User already exists:", email);
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    console.log("🔐 Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    console.log("👤 Creating user in database...");
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    console.log("✅ User created successfully:", user.id);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { message: "User created successfully", user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error("💥 Registration error:", error);

    if (error instanceof z.ZodError) {
      console.log("❌ Validation error:", error.errors);
      return NextResponse.json(
        { message: "Invalid input", errors: error.errors },
        { status: 400 }
      );
    }

    // Log the specific error for debugging
    if (error instanceof Error) {
      console.error("Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
