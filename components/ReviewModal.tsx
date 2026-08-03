"use client";

import { apiUrl } from "@/app/share/fetch";
import React, { useEffect, useState } from "react";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  review?: any; // if provided, we're in edit mode
}

export default function ReviewModal({
  isOpen,
  onClose,
  onSuccess,
  review,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);

  // Populate fields when editing an existing review
  useEffect(() => {
    if (review) {
      setRating(review.rating);
      setReviewText(review.reviewText);
    } else {
      setRating(0);
      setReviewText("");
    }
  }, [review, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = { rating, reviewText };
    const url = review
      ? `${apiUrl}/review/update/${review._id}`
      : `${apiUrl}/review/create`;
    const method = review ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json();
        alert(err.message || "Something went wrong");
        return;
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert(review ? "Failed to update review" : "Failed to create review");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white">
            {review ? "Edit Review" : "Add New Review"}
          </h2>
          <p className="text-indigo-100 text-sm mt-1">
            {review
              ? "Update the review details below."
              : "Fill in the information below."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Rating (1–5)
            </label>
            <input
              type="number"
              min="1"
              max="5"
              required
              placeholder="Enter rating (1-5)"
              value={rating === 0 ? "" : rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Review Text
            </label>
            <textarea
              rows={5}
              required
              placeholder="Write your review here..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 px-5 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2 font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {loading ? "Saving..." : review ? "Update Review" : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
