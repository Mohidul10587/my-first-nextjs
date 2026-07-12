"use client";

import { fetcher } from "@/app/share/fetch";
import ProjectModal from "@/components/ProjectModal";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function Page() {
  const [searchText, setSearchText] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const {
    data: projects,
    isLoading,
    error,
    mutate,
  } = useSWR("/api/projects", fetcher);
  useEffect(() => {
    if (projects) {
      const filtered = projects.filter((project: any) =>
        project.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  }, [projects, searchText]);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await mutate();
      } else {
        alert("Failed to delete project");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  if (error) {
    return (
      <div className="p-10 text-center text-red-500">
        Failed to load projects
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50 p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-800">
            Projects Management
          </h1>

          <button
            onClick={() => {
              setSelectedProject(null);
              setOpenModal(true);
            }}
            className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-lg hover:bg-indigo-700"
          >
            + Create Project
          </button>
        </div>
      </div>

      <div>
        <input
          type="text"
          value={searchText || ""}
          placeholder="Search projects..."
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full max-w-6xl mx-auto rounded-xl border p-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      {/* Project List */}
      <div className="max-w-6xl mx-auto mt-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            Projects ({projects?.length || 0})
          </h2>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <p className="text-slate-500">Loading projects...</p>
          </div>
        ) : projects?.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border">
            <p className="text-slate-500">No projects found</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects?.map((project: any) => (
              <div
                key={project._id}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="line-clamp-2 text-lg font-bold text-slate-800">
                      {project.title}
                    </h3>

                    <div className="flex items-center gap-2 opacity-0 transition-all group-hover:opacity-100">
                      <button
                        onClick={() => {
                          setSelectedProject(project);
                          setOpenModal(true);
                        }}
                        className="rounded-lg bg-indigo-50 p-2 text-indigo-600 hover:bg-indigo-100"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(project._id)}
                        className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <p className="mt-3 line-clamp-3 text-sm text-slate-600">
                    {project.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-medium text-indigo-600 hover:text-indigo-800"
                    >
                      Visit Project
                      <ExternalLink size={16} />
                    </a>

                    <span className="text-xs text-slate-400">
                      {project._id?.slice(-6)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <ProjectModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedProject(null);
        }}
        project={selectedProject}
        onSuccess={() => mutate()}
      />
    </div>
  );
}
