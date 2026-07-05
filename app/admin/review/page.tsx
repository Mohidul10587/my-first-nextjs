"use client";
import React from "react";

const Page = () => {
  const [rating, setRating] = React.useState(0);
  const [reviewText, setReviewText] = React.useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the review data to your backend API
    const data = {
      rating,
      reviewText,
    };

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Review created successfully");
      } else {
        alert("Failed to create Review");
      }
    } catch (error) {
      console.error("Error creating Review:", error);
    }
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-100 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-linear-to-r from-indigo-600 to-purple-600 p-5">
            <h2 className="text-white text-xl font-semibold">Add New Review</h2>
            <p className="text-indigo-100 text-sm mt-1">
              Fill in the information below.
            </p>
          </div>

          <form className="p-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Rating
              </label>
              <input
                type="number"
                min="1"
                max="5"
                placeholder="Enter rating (1-5)"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Review Text
              </label>
              <textarea
                rows={5}
                placeholder="Write your review here..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all resize-none"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:scale-[1.02] transition-transform shadow-lg hover:shadow-xl"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
