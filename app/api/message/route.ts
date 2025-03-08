import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/user.model";
import mongoose from "mongoose"; // Import mongoose to access DB info

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.message) {
      return NextResponse.json(
        { error: "All fields (firstName, lastName, email, message) are required" },
        { status: 400 }
      );
    }

    // Create the user entry
    const user = await User.create(body);

    return NextResponse.json(
      { message: "Query submitted successfully", user },
      { status: 201 }
    );
  } catch (error) {

    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const queries = await User.find({}).sort({ createdAt: -1 });
    return NextResponse.json(queries);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch queries" },
      { status: 500 }
    );
  }
}