"use client";

import UserSidebarContent from "@/components/UserSidebarContent";
import { useState } from "react";

type User = {
  name: string;
  role: "user" | "admin";
};

export default function DashboardSidebar({ user }: { user: User }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white border border-slate-200 text-slate-700 p-2 rounded-lg shadow-md"
      >
        ☰
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed top-0 left-0 z-50 h-full transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <UserSidebarContent user={user} onClose={() => setOpen(false)} />
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex h-screen sticky top-0">
        <UserSidebarContent user={user} />
      </aside>
    </>
  );
}
