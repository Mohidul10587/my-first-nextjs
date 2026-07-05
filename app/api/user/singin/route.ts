import { connectDB } from "@/lib/db";
import { User } from "@/lib/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET!;

export const POST = async (req: Request) => {
  await connectDB();

  const body = await req.json();

  const user = await User.findOne({ phone: body.phone });
  if (!user) {
    return new Response(JSON.stringify({ message: "User Not Found" }), {
      status: 404,
    });
  }

  if (user.password !== body.password) {
    return new Response(JSON.stringify({ message: "Invalid Password" }), {
      status: 401,
    });
  }

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
  console.log(_);
  return new Response(
    JSON.stringify({ message: "Successfully logged in", user: safeUser }),
    { status: 200 }
  );
};
