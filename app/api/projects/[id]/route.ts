import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Project } from "@/lib/models/Project";
import { requireAdmin } from "@/lib/authGuard";

type Params = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Params) {
  const authError = await requireAdmin();
  if (authError) return authError;

  await connectDB();
  const { id } = await params;
  const body = await req.json();
  const project = await Project.findByIdAndUpdate(id, body, { new: true });
  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function DELETE(_: Request, { params }: Params) {
  const authError = await requireAdmin();
  if (authError) return authError;

  await connectDB();
  const { id } = await params;
  await Project.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
