"use client";

import { apiUrl } from "@/app/share/fetch";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";

type User = {
  _id: string;
  name: string;
  phone: string;
  role: "user" | "admin";
};

const Navbar = () => {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: user, isLoading } = useSWR<User>(
    `${apiUrl}/user/me`,
    (url: string) =>
      fetch(url, { credentials: "include" }).then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      }),
    { shouldRetryOnError: false }
  );

  // dropdown এর বাইরে click করলে বন্ধ হবে
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    setDropdownOpen(false);
    await fetch(`${apiUrl}/user/logout`, {
      method: "POST",
      credentials: "include",
    });
    router.push("/");
    router.refresh();
    setLoggingOut(false);
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-blue-900 text-white sticky top-0 z-50 shadow-lg">
      {/* Logo */}
      <h1 className="text-2xl font-bold tracking-wide">
        Mohidul<span className="text-blue-300">.</span>
      </h1>

      {/* Nav links */}
      <ul className="hidden md:flex gap-8 font-medium">
        <li>
          <Link href="/" className="hover:text-blue-300 transition-colors">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-blue-300 transition-colors">
            About
          </Link>
        </li>
        <li>
          <Link
            href="/projects"
            className="hover:text-blue-300 transition-colors"
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="hover:text-blue-300 transition-colors"
          >
            Contact
          </Link>
        </li>
      </ul>

      {/* Right side */}
      <div className="flex items-center gap-4 text-sm">
        <a
          href="#"
          className="hover:text-blue-300 transition-colors hidden sm:block"
        >
          Facebook
        </a>
        <a
          href="#"
          className="hover:text-blue-300 transition-colors hidden sm:block"
        >
          GitHub
        </a>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="h-8 w-24 animate-pulse rounded-lg bg-white/10" />
        )}

        {/* Not logged in */}
        {!isLoading && !user && (
          <div className="flex items-center gap-2">
            <Link
              href="/sing-in"
              className="px-4 py-1.5 rounded-lg border border-white/30 hover:bg-white/10 transition-colors font-medium"
            >
              Sign In
            </Link>
          </div>
        )}

        {/* Logged in — avatar dropdown */}
        {!isLoading && user && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
            >
              {/* Avatar */}
              <span className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-xs font-black">
                {user.name?.charAt(0).toUpperCase()}
              </span>
              <span className="font-medium max-w-[100px] truncate">
                {user.name}
              </span>
              <span
                className={`text-xs transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              >
                ▾
              </span>
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden">
                {/* User info */}
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="font-semibold text-sm truncate">{user.name}</p>
                  <p className="text-xs text-slate-400 capitalize">
                    {user.role}
                  </p>
                </div>

                {/* Dashboard */}
                <Link
                  href="/dashboard"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <span>📊</span> Dashboard
                </Link>

                {/* Admin panel — only for admins */}
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-blue-300 hover:bg-white/10 transition-colors"
                  >
                    <span>🛡️</span> Admin Panel
                  </Link>
                )}

                <div className="border-t border-white/10">
                  <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                  >
                    {loggingOut ? (
                      <>
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-red-400/40 border-t-red-400" />
                        Logging out...
                      </>
                    ) : (
                      <>
                        <span>🚪</span> Logout
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
