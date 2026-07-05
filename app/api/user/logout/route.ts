import { cookies } from "next/headers";

export const POST = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  return new Response(JSON.stringify({ message: "Logged out" }), {
    status: 200,
  });
};
