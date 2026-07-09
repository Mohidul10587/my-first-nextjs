"use client";

import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "../share/fetch";

type Project = {
  _id: string;
  title: string;
  link: string;
  img: string;
};

type Review = {
  _id: string;
  rating: string;
  reviewText: string;
};

export default function Home() {
  const { data: projects, isLoading, error } = useSWR("/api/projects", fetcher);

  const {
    data: reviews,
    isLoading: reviewLoading,
    error: reviewError,
  } = useSWR("/api/review", fetcher);

  if (isLoading || reviewLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="h-16 w-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p>Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || reviewError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Failed to load data.
      </div>
    );
  }

  return (
    <main className="bg-slate-950 text-white overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950" />

        <div className="absolute top-20 left-10 md:left-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-20 right-10 md:right-20 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div>
            <span className="inline-block px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm">
              Full Stack Developer
            </span>

            <h1 className="mt-6 text-5xl md:text-7xl font-black leading-tight">
              Hi, I&apos;m
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Mohidul Islam
              </span>
            </h1>

            <p className="mt-6 text-slate-300 text-lg max-w-xl">
              I build modern, scalable and high-performance web applications
              using Next.js, React, TypeScript, Node.js and MongoDB.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <a
                href="#projects"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-semibold shadow-lg hover:scale-105 transition"
              >
                View Projects
              </a>

              <a
                href="#contact"
                className="px-8 py-4 rounded-xl border border-white/20 hover:bg-white/10 transition"
              >
                Contact Me
              </a>
            </div>

            {/* TECH STACK */}
            <div className="flex flex-wrap gap-3 mt-12">
              {[
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "MongoDB",
                "Tailwind",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 rounded-full" />

              <Image
                src="/profile_aqwf8h.webp"
                alt="Mohidul Islam"
                width={400}
                height={400}
                className="relative rounded-full border-8 border-white/10 shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            ["50+", "Projects"],
            ["3+", "Years Experience"],
            ["20+", "Clients"],
            ["100%", "Commitment"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-xl"
            >
              <h3 className="text-4xl font-black text-blue-400">{value}</h3>
              <p className="text-slate-400 mt-2">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-8">About Me</h2>

          <p className="text-slate-300 text-lg leading-8">
            I&apos;m a Full Stack Developer passionate about building beautiful,
            scalable, and high-performance web applications. I specialize in
            React, Next.js, TypeScript, Node.js, Express.js, and MongoDB. I
            enjoy solving real-world problems through clean and efficient code.
          </p>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-16">
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project: Project) => (
              <div
                key={project._id}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="h-48 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  <Image
                    src={project.img || "/default_project_image.jpg"}
                    alt={project.title}
                    width={400}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>

                  <p className="text-slate-400 mb-6">
                    Explore project details, technologies used and live
                    implementation.
                  </p>

                  <Link
                    href={`/projects/${project._id}`}
                    className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:gap-4 transition-all"
                  >
                    Explore Project →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-16">
            Client Reviews
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews?.map((review: Review) => (
              <div
                key={review._id}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
              >
                <div className="text-2xl mb-4">
                  {"⭐".repeat(Number(review.rating))}
                </div>

                <p className="text-slate-300 italic leading-7">
                  &quot;{review.reviewText}&quot;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="contact"
        className="py-32 px-6 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10" />

        <div className="relative max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black">
            Let&apos;s Build Something Amazing
          </h2>

          <p className="text-slate-400 mt-6 text-lg">
            Have a project in mind? Let&apos;s work together and create
            something extraordinary.
          </p>

          <div className="mt-10">
            <a
              href="mailto:youremail@example.com"
              className="inline-block px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-bold shadow-xl hover:scale-105 transition"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 text-center text-slate-500">
        © 2026 Mohidul Islam. All Rights Reserved.
      </footer>
    </main>
  );
}
