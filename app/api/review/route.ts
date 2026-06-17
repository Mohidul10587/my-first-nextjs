import { connectDB } from "@/lib/db";
import { Review } from "@/lib/models/Review";

export const POST = async (req: Request) => {
  await connectDB();
  const body = await req.json();
  const review = await Review.create(body);
  return new Response(JSON.stringify(review), { status: 201 });
};

export const GET = async () => {
  await connectDB();
  const Reviews = await Review.find();
  return new Response(JSON.stringify(Reviews), { status: 200 });
};
