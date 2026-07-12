import { connectDB } from "@/lib/db";
import { Project } from "@/lib/models/Project";
import { requireAdmin } from "@/lib/authGuard";

export const POST = async (req: Request) => {
  const authError = await requireAdmin();
  if (authError) return authError;

  await connectDB();
  const projects = await Project.find();
  if (projects.length >= 10) {
    return new Response(
      JSON.stringify({ error: "Maximum number of projects reached" }),
      { status: 400 }
    );
  }
  const body = await req.json();
  const project = await Project.create(body);
  return new Response(JSON.stringify(project), { status: 201 });
};

export const GET = async (req: Request) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const searchText = searchParams.get("searchText");
  console.log("This is search text", searchText);
  const projects = await Project.find({
    title: { $regex: searchText?.toLocaleLowerCase() || "", $options: "i" },
  });
  return new Response(JSON.stringify(projects), { status: 200 });
};
