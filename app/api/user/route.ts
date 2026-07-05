import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

export const GET = async () => {
  await connectDB();
  const users = await User.find({}, { password: 0 }); // exclude password
  return new Response(JSON.stringify(users), { status: 200 });
};

export const POST = async (req: Request) => {
  await connectDB();
  const body = await req.json();
  const user = await User.create(body);

  // Sign JWT with user id and role
  const token = jwt.sign(
    { id: user._id.toString(), role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  // Set token in HttpOnly cookie
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
  });

  const { password: _, ...safeUser } = user.toObject();
  return new Response(JSON.stringify(safeUser), { status: 201 });
};

export const PATCH = async (req: Request) => {
  await connectDB();
  const { id, role } = await req.json();

  if (!id || !["user", "admin"].includes(role)) {
    return new Response(JSON.stringify({ error: "Invalid id or role" }), {
      status: 400,
    });
  }

  const updated = await User.findByIdAndUpdate(id, { role }, { new: true, select: "-password" });

  if (!updated) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(updated), { status: 200 });
};
