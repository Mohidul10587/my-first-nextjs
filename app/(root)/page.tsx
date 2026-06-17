"use client";
import Address from "@/components/Address";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

export default function Home() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const {
    data: projectArray,
    isLoading,
    error,
  } = useSWR("/api/projects", fetcher);

  const myFun = (index: string) => {
    const indexNum = parseInt(index);
    alert(projectArray[indexNum].title);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading projects.</p>;
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* hero */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-linear-to-br from-blue-50 to-white">
        <Image
          src="/profile_aqwf8h.webp"
          alt="Mohidul Islam"
          width={176}
          height={176}
          className="rounded-full border-4 border-blue-500 shadow-xl mb-6 object-cover"
        />
        <p className="text-blue-600 font-semibold tracking-widest uppercase text-sm mb-2">
          Full Stack Developer
        </p>
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Hi, I&apos;m <span className="text-blue-600">Sakib Islam</span>
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

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {projectArray.map(
          (project: { _id: string; title: string; link: string }) => (
            <div
              key={project._id}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Icon */}
              <div className="relative z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md">
                🚀
              </div>

              {/* Title */}
              <h2 className="relative z-10 mb-3 text-xl font-bold text-slate-800">
                {project.title}
              </h2>

              {/* Description */}
              <p className="relative z-10 mb-5 text-sm text-slate-500">
                Explore the project details, features, and implementation.
              </p>

              {/* Button */}
              <Link
                href={`/projects/${project._id}`}
                className="relative z-10 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 font-medium text-white transition-all duration-300 hover:gap-3 hover:shadow-lg"
              >
                View Project
                <span>→</span>
              </Link>
            </div>
          )
        )}
      </section>

      {/* Footer  */}
      <footer className="bg-blue-900 text-white py-5 text-center text-sm">
        <p>© 2026 Mohidul Islam. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
