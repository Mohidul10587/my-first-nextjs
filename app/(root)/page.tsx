"use client";
import Address from "@/components/Address";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const projectArray = [
    {
      id: "1",
      title: "E-Commerce Website",
    },
    {
      id: "2",
      title: "Portfolio Website",
    },
    {
      id: "3",
      title: "Food Delivery App",
    },
    {
      id: "4",
      title: "Food Delivery App 4",
    },
    {
      id: "5",
      title: "Food Delivery App 5",
    },
  ];
  const myFun = (index: string) => {
    const indexNum = parseInt(index);
    alert(projectArray[indexNum].title);
  };

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
      {/* projects */}
      <div className="flex justify-center items-center my-10">
        <button
          onClick={() => {
            myFun("0");
          }}
          className="border border-amber-700 rounded-2xl p-2 hover:bg-amber-700 hover:text-white  "
        >
          Click Me 0
        </button>
        <button
          onClick={() => {
            myFun("1");
          }}
          className="border border-amber-700 rounded-2xl p-2 hover:bg-amber-700 hover:text-white  "
        >
          Click Me 1
        </button>
        <button
          onClick={() => {
            myFun("2");
          }}
          className="border border-amber-700 rounded-2xl p-2 hover:bg-amber-700 hover:text-white  "
        >
          Click Me 2
        </button>
      </div>
      <section className="p-4 flex gap-x-4">
        {projectArray.map((project) => (
          <div
            key={project.id}
            className="border border-gray-300 p-4 rounded-lg shadow-md"
          >
            <h2 className="text-lg font-semibold">{project.title}</h2>
            <Link
              href={`/projects/${project.id}`}
              className="text-blue-600 hover:underline"
            >
              View Project
            </Link>
          </div>
        ))}
      </section>
      <Address
        address={{
          name: "John Doe",
          street: "123 Main St",
          city: "Anytown",
          state: "CA",
          zip: "12345",
        }}
      />
      {/* Footer  */}
      <footer className="bg-blue-900 text-white py-5 text-center text-sm">
        <p>© 2026 Mohidul Islam. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
