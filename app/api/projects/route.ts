import { connectDB } from "@/lib/db";
import { Project } from "@/lib/models/Project";

export const POST = async (req: Request) => {
  await connectDB();
  const body = await req.json();
  const project = await Project.create(body);
  return new Response(JSON.stringify(project), { status: 201 });
};

export const GET = async () => {
  await connectDB();
  const projects = await Project.find();
  return new Response(JSON.stringify(projects), { status: 200 });
};
