"use client";

import { fetcher } from "@/app/share/fetch";
import { useState } from "react";
import useSWR from "swr";

type User = {
  _id: string;
  name: string;
  phone: string;
  role: "user" | "admin";
};

export default function UsersPage() {
  const {
    data: users,
    isLoading,
    error,
    mutate,
  } = useSWR<User[]>("/api/user", fetcher);

  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleRoleUpdate = async (
    id: string,
    currentRole: "user" | "admin"
  ) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    const confirmed = window.confirm(`Change role to "${newRole}"?`);
    if (!confirmed) return;

    setUpdatingId(id);
    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, role: newRole }),
      });

      if (res.ok) {
        await mutate();
      } else {
        alert("Failed to update role");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setUpdatingId(null);
    }
  };

  if (error) {
    return (
      <div className="p-10 text-center text-red-500">Failed to load users</div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">User Management</h1>
          <p className="mt-1 text-slate-500">
            Manage user roles across the platform
          </p>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {isLoading ? (
            <div className="py-20 text-center text-slate-500">
              Loading users...
            </div>
          ) : users?.length === 0 ? (
            <div className="py-20 text-center text-slate-500">
              No users found
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users?.map((user, index) => (
                  <tr
                    key={user._id}
                    className="transition-colors hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 text-slate-400">{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{user.phone}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleRoleUpdate(user._id, user.role)}
                        disabled={updatingId === user._id}
                        className={`rounded-lg px-4 py-2 text-xs font-semibold transition-colors disabled:opacity-50 ${
                          user.role === "admin"
                            ? "bg-red-50 text-red-600 hover:bg-red-100"
                            : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                        }`}
                      >
                        {updatingId === user._id
                          ? "Updating..."
                          : user.role === "admin"
                          ? "Revoke Admin"
                          : "Make Admin"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer count */}
        {!isLoading && users && users.length > 0 && (
          <p className="mt-4 text-right text-sm text-slate-400">
            Total users: {users.length}
          </p>
        )}
      </div>
    </div>
  );
}
