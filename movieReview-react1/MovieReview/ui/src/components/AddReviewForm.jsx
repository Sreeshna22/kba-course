import React from "react";

function AddReviewForm() {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-red-400">Add Your Review</h3>
      <form className="space-y-4">
        <div>
          <label className="block mb-1 text-sm text-gray-300">Your Review</label>
          <textarea
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
            rows="3"
            placeholder="Write your review"
          ></textarea>
        </div>
        <div>
          <label className="block mb-1 text-sm text-gray-300">Your Rating</label>
          <input
            type="text"
            className="w-24 p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
            placeholder="4.5"
          />
        </div>
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded shadow inline-block"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default AddReviewForm;
