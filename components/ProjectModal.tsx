"use client";

import React, { useEffect, useState } from "react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  project?: any;
}

export default function ProjectModal({
  isOpen,
  onClose,
  onSuccess,
  project,
}: ProjectModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setLink(project.link);
    } else {
      setTitle("No title");
      setDescription("");
      setLink("");
    }
  }, [project]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        title,
        description,
        link,
      };

      const response = await fetch(
        project ? `/api/projects/${project._id}` : "/api/projects",
        {
          method: project ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || "Something went wrong");
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert(project ? "Failed to update project" : "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  if (isOpen === false) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white">
            {project ? "Edit Project" : "Create Project"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Project Title
            </label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border p-3"
              placeholder="Project Title"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border p-3"
              placeholder="Description"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Project Link
            </label>

            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full rounded-xl border p-3"
              placeholder="https://example.com"
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-5 py-2"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-2 text-white"
            >
              {loading
                ? "Saving..."
                : project
                ? "Update Project"
                : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
