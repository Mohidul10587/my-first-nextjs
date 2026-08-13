"use client";

import { apiUrl } from "@/app/share/fetch";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/dashboard", label: "Overview", icon: "📊" },
  { href: "/dashboard/profile", label: "My Profile", icon: "👤" },
  { href: "/dashboard/reviews", label: "My Reviews", icon: "⭐" },
  { href: "/dashboard/settings", label: "Settings", icon: "⚙️" },
];

type User = {
  name: string;
  role: "user" | "admin";
};

export default function UserSidebarContent({
  user,
  onClose,
}: {
  user: User;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch(`${apiUrl}/user/logout`, {
      method: "POST",
      credentials: "include",
    });
    onClose?.();
    router.push("/");
    router.refresh();
    setLoggingOut(false);
  };

  return (
    <div className="flex flex-col h-full w-64 bg-white border-r border-slate-200 shadow-sm p-5">

      {/* Branding */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-black">
            M
          </div>
          <span className="font-bold text-slate-800 text-lg">My Portal</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-xl leading-none"
          >
            ✕
          </button>
        )}
      </div>

      {/* User profile card */}
      <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-3 mb-6">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-black shrink-0">
          {user.name?.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-slate-800 text-sm truncate">
            {user.name}
          </p>
          <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-600 font-medium capitalize">
            {user.role}
          </span>
        </div>
      </div>

      {/* Nav links */}
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 px-1">
        Dashboard
      </p>
      <nav className="flex flex-col gap-1 flex-1">
        {links.map(({ href, label, icon }) => (
          <Link
            key={href}
            href={href}
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              pathname === href
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <span>{icon}</span>
            {label}
          </Link>
        ))}

        {/* Divider + public links */}
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-5 mb-2 px-1">
          Explore
        </p>
        <Link
          href="/projects"
          onClick={onClose}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            pathname === "/projects"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <span>📁</span> Projects
        </Link>
        <Link
          href="/contact"
          onClick={onClose}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            pathname === "/contact"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <span>✉️</span> Contact
        </Link>
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-200 pt-4 mt-4">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {loggingOut ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-300 border-t-red-500" />
              Logging out...
            </>
          ) : (
            <>
              <span>🚪</span>
              Logout
            </>
          )}
        </button>
      </div>
    </div>
  );
}
