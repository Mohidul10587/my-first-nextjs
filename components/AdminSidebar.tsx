"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard", icon: "🏠" },
  { href: "/admin/projects", label: "Projects", icon: "📁" },
  { href: "/admin/review", label: "Reviews", icon: "⭐" },
];

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col h-full bg-slate-900 text-white w-64 p-4">
      <div className="flex items-center justify-between mb-8">
        <span className="text-xl font-bold text-blue-400">Admin Panel</span>
        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl leading-none">
            ✕
          </button>
        )}
      </div>
      <nav className="flex flex-col gap-1">
        {links.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              pathname === href
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span>{icon}</span>
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-slate-900 text-white p-2 rounded-lg shadow-lg"
      >
        ☰
      </button>

      {/* Mobile drawer overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed top-0 left-0 z-50 h-full transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent onClose={() => setOpen(false)} />
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex h-screen sticky top-0">
        <SidebarContent />
      </aside>
    </>
  );
}
