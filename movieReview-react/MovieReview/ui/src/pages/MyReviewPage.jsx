
import React, { useEffect, useState } from "react";

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState(null);
  const [updatedText, setUpdatedText] = useState("");
  const [updatedRating, setUpdatedRating] = useState(0);

  const fetchMyReviews = async () => {
    try {
      const res = await fetch("/api/user/myReviews", {
        method: "GET",
        credentials: "include",
        cache: "no-store"
      });
      if (!res.ok) throw new Error("Failed to fetch reviews");
      const data = await res.json();
      setReviews(data.reviews || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyReviews();
  }, []);

  const handleEdit = (review) => {
    setEditingReview(review._id);
    setUpdatedText(review.reviewText);
    setUpdatedRating(review.rating);
  };

  const saveEdit = async (id) => {
    try {
      const res = await fetch(`/api/user/updateReview/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text: updatedText, rating: updatedRating })
      });
      if (!res.ok) throw new Error("Failed to update review");
      setEditingReview(null);
      fetchMyReviews();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteReview = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      
         const res = await fetch(`/api/user/deleteReview/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (!res.ok) throw new Error("Failed to delete review");
      fetchMyReviews();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4">My Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-400 text-center">No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="bg-gray-900 p-5 rounded-lg mb-4">
              {editingReview === review._id ? (
                <>
                  <textarea
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                    className="w-full p-2 text-white rounded mb-2"
                  />
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={updatedRating}
                    onChange={(e) => setUpdatedRating(parseInt(e.target.value))}
                    className="w-20 p-2 text-black rounded mb-2"
                  />
                  <div className="space-x-2">
                    <button onClick={() => saveEdit(review._id)} className="bg-green-600 px-4 py-1 rounded">Save</button>
                    <button onClick={() => setEditingReview(null)} className="bg-gray-600 px-4 py-1 rounded">Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-2">
                    {review.movieId?.MovieTitle || "Unknown Movie"}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    By: {review.userId?.userName || "Unknown User"}
                  </p>
                  <p className="mb-2 text-gray-200">{review.reviewText}</p>
                  <div className="flex text-yellow-400 text-sm space-x-1 mb-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <i key={i} className={i < review.rating ? "fas fa-star" : "far fa-star"}></i>
                    ))}
                  </div>
                  <div className="space-x-2">
                    <button onClick={() => handleEdit(review)} className="bg-green-600 px-4 py-1 rounded">Edit</button>
                    <button onClick={() => deleteReview(review._id)} className="bg-red-600 px-4 py-1 rounded">Delete</button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
