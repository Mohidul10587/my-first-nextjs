import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-blue-900 text-white sticky top-0 z-50 shadow-lg">
        <h1 className="text-2xl font-bold tracking-wide">
          Mohidul<span className="text-blue-300">.</span>
        </h1>
        <ul className="hidden md:flex gap-8 font-medium">
          <li>
            <a
              href="index.html"
              className="text-blue-300 border-b-2 border-blue-300 pb-0.5"
            >
              Home
            </a>
          </li>
          <li>
            <a href="about.html">About</a>
          </li>
          <li>
            <a href="projects.html">Projects</a>
          </li>
          <li>
            <a href="contact.html">Contact</a>
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

      {/* hero */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-blue-50 to-white">
        <img
          src="/profile_aqwf8h.webp"
          alt="Mohidul Islam"
          className="w-44 h-44 rounded-full border-4 border-blue-500 shadow-xl mb-6 object-cover"
        />
        <p className="text-blue-600 font-semibold tracking-widest uppercase text-sm mb-2">
          Full Stack Developer
        </p>
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Hi, I&apos;m <span className="text-blue-600">Mohidul Islam</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mb-8">
          Building fast, clean & modern web apps with React, Next.js, Node.js
          and MongoDB.
        </p>
        <div className="flex gap-4">
          <a
            href="contact.html"
            className="bg-blue-600 text-white px-7 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
          >
            Hire Me
          </a>
          <a
            href="#"
            className="border-2 border-blue-600 text-blue-600 px-7 py-3 rounded-full font-semibold hover:bg-blue-50 transition"
          >
            Download CV
          </a>
        </div>
        {/* Quick skill badges */}
        <div className="mt-14 flex flex-wrap justify-center gap-3">
          <span className="bg-white border border-gray-200 text-gray-600 px-4 py-1.5 rounded-full text-sm shadow-sm">
            React.js
          </span>
          <span className="bg-white border border-gray-200 text-gray-600 px-4 py-1.5 rounded-full text-sm shadow-sm">
            Next.js
          </span>
          <span className="bg-white border border-gray-200 text-gray-600 px-4 py-1.5 rounded-full text-sm shadow-sm">
            Node.js
          </span>
          <span className="bg-white border border-gray-200 text-gray-600 px-4 py-1.5 rounded-full text-sm shadow-sm">
            MongoDB
          </span>
          <span className="bg-white border border-gray-200 text-gray-600 px-4 py-1.5 rounded-full text-sm shadow-sm">
            TypeScript
          </span>
          <span className="bg-white border border-gray-200 text-gray-600 px-4 py-1.5 rounded-full text-sm shadow-sm">
            Tailwind CSS
          </span>
        </div>
      </section>

      {/* Footer  */}
      <footer className="bg-blue-900 text-white py-5 text-center text-sm">
        <p>© 2026 Mohidul Islam. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
