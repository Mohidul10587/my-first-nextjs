import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "your_super_secret_key_change_this_in_production"
);

/**
 * Call this at the top of any API route handler that requires an admin.
 * Returns null if the request is authorized.
 * Returns a 401/403 Response if unauthorized — just return it immediately.
 *
 * Usage:
 *   const authError = await requireAdmin();
 *   if (authError) return authError;
 */
export async function requireAdmin(): Promise<Response | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized: no token" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (payload.role !== "admin") {
      return new Response(JSON.stringify({ error: "Forbidden: admins only" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }
    return null; // authorized
  } catch {
    return new Response(
      JSON.stringify({ error: "Unauthorized: invalid or expired token" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
}
