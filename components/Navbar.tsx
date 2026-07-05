"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/user/logout", { method: "POST" });
    router.push("/sing-in");
    router.refresh();
  };

  return (
    <div>
      <nav className="flex items-center justify-between px-8 py-4 bg-blue-900 text-white sticky top-0 z-50 shadow-lg">
        <h1 className="text-2xl font-bold tracking-wide">
          Mohidul<span className="text-blue-300">.</span>
        </h1>
        <ul className="hidden md:flex gap-8 font-medium">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/projects">Projects</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
        <div className="flex items-center gap-4 text-sm">
          <a href="#" className="hover:text-blue-300">
            Facebook
          </a>
          <a href="#" className="hover:text-blue-300">
            GitHub
          </a>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
