"use client";
import { fetcher } from "@/app/share/fetch";
import React, { useState } from "react";
import useSWR from "swr";

const Page = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const { data: projects, isLoading, error } = useSWR("/api/projects", fetcher);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      title,
      description,
      link,
    };

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Project created successfully");
        setTitle("");
        setDescription("");
        setLink("");
      } else {
        alert("Failed to create Project");
      }
    } catch (error) {
      console.error("Error creating Project:", error);
    }
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-5">
            <h2 className="text-xl font-semibold text-white">
              Create New Project
            </h2>
            <p className="text-indigo-100 text-sm mt-1">
              Fill in the details below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block mb-2 font-medium text-gray-700"
              >
                Project Title
              </label>

              <input
                type="text"
                id="title"
                placeholder="Enter project title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block mb-2 font-medium text-gray-700"
              >
                Description
              </label>

              <textarea
                rows={5}
                id="description"
                placeholder="Write project description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none resize-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label
                htmlFor="link"
                className="block mb-2 font-medium text-gray-700"
              >
                Project Link
              </label>

              <input
                type="url"
                id="link"
                placeholder="https://example.com"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              Create Project 🚀
            </button>
          </form>
        </div>
      </div>

      <div>
        <p>Projects List</p>
        {projects?.map((project: any) => (
          <div key={project._id}>
            <p>{project.title}</p>
            <p>{project.description}</p>
            <p>{project.link}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
