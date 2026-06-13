import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div>
      {" "}
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
        <div className="flex gap-4 text-sm">
          <a href="#" className="hover:text-blue-300">
            Facebook
          </a>
          <a href="#" className="hover:text-blue-300">
            GitHub
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
