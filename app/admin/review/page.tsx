"use client";

import { apiUrl, fetcher } from "@/app/share/fetch";
import ReviewModal from "@/components/ReviewModal";
import { Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";
import useSWR from "swr";

const Page = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any>(null);

  const {
    data: reviews,
    isLoading,
    error,
    mutate,
  } = useSWR(`${apiUrl}/review/getAllReviews`, fetcher);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${apiUrl}/review/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await mutate();
      } else {
        alert("Failed to delete review");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="h-16 w-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p>Loading Reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Failed to load reviews.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 p-6">
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-800">
            Reviews Management
          </h1>
          <button
            onClick={() => {
              setSelectedReview(null);
              setOpenModal(true);
            }}
            className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-lg hover:bg-indigo-700 transition-colors"
          >
            + Add Review
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="max-w-3xl mx-auto space-y-4">
        {reviews?.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border">
            <p className="text-slate-500">No reviews yet. Add one!</p>
          </div>
        ) : (
          reviews?.map((review: any) => (
            <div
              key={review._id}
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 flex items-center justify-between gap-4"
            >
              <div>
                <div className="text-lg font-semibold mb-1">
                  {"⭐".repeat(review.rating)}{" "}
                  <span className="text-gray-500 text-sm font-normal">
                    ({review.rating}/5)
                  </span>
                </div>
                <p className="text-gray-700">{review.reviewText}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setSelectedReview(review);
                    setOpenModal(true);
                  }}
                  className="rounded-lg bg-indigo-50 p-2 text-indigo-600 hover:bg-indigo-100 transition-colors"
                  title="Edit review"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100 transition-colors"
                  title="Delete review"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal — handles both create and edit */}
      <ReviewModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedReview(null);
        }}
        review={selectedReview}
        onSuccess={() => mutate()}
      />
    </div>
  );
};

export default Page;
