"use client";

import DashboardSidebar from "@/components/DashboardSidebar";
import { apiUrl } from "@/app/share/fetch";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

type User = {
  name: string;
  role: "user" | "admin";
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  const { data: user, error, isLoading } = useSWR<User>(
    `${apiUrl}/user/me`,
    (url: string) =>
      fetch(url, { credentials: "include" }).then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      }),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      shouldRetryOnError: false,
    }
  );

  useEffect(() => {
    if (error) router.replace("/sing-in");
  }, [error, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500/30 border-t-blue-500" />
          <p className="text-sm text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !user) return null;

  return (
    <div className="flex min-h-screen bg-slate-100">
      <DashboardSidebar user={user} />
      <main className="flex-1 p-6 md:p-8">{children}</main>
    </div>
  );
}
