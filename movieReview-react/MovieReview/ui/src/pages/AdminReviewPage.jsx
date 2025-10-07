import React, { useEffect, useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai"; 

export default function AdminReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/admin/allReviews", {
        credentials: "include", 
        
      });
      const data = await res.json();
      if (res.ok) {
        setReviews(data.reviews || []);
      } else {
        alert(data.msg || "Failed to fetch reviews");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  
  const deleteReview = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      
      const res = await fetch(`/api/admin/deleteReview/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r._id !== id));
      } else {
        alert(data.msg || "Failed to delete review");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-400">Loading...</p>;

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="sticky top-0 bg-red-600 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Reviews</h1>
          <a
            href="/admin/dashboard"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Back to Dashboard
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 bg-gray-900 p-6 rounded-lg shadow-lg overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-red-700 text-left">
              <th className="p-3">SL</th>
              <th className="p-3">Movie</th>
              <th className="p-3">Reviewer</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Review</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-400">
                  No reviews found.
                </td>
              </tr>
            ) : (
              reviews.map((review, index) => (
                <tr key={review._id} className="border-t border-red-600">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{review.movieId?.MovieTitle || "Unknown Movie"}</td>
                  <td className="p-3">{review.userId?.userName || "Unknown User"}</td>
                  <td className="p-3">
                    
<div className="flex items-center space-x-1 text-yellow-400">
    {Array.from({ length: 5 }).map((_, i) =>
      i < review.rating ? <AiFillStar key={i} /> : <AiOutlineStar key={i} />
    )}
  </div>

                  </td>
                  <td className="p-3">{review.reviewText}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => deleteReview(review._id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
