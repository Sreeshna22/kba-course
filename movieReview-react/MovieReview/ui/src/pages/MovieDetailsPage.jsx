
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import useProfile from "../hooks/useProfile";

export default function MovieDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile } = useProfile();

  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchMovieAndReviews = async () => {
      try {
   
        
         const res = await fetch(`/api/user/movie/${id}`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) setMovie(data.movie);

       
      
        const reviewRes = await fetch(`/api/user/reviews/${id}`, {
          credentials: "include",
        });
        const reviewData = await reviewRes.json();
        if (reviewRes.ok) setReviews(reviewData.reviews || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieAndReviews();
  }, [id]);

  
const submitReview = async (e) => {
  e.preventDefault();

  if (!profile) {
    alert("Please login to add a review");
    navigate("/login"); 
    return;
  }

  if (!reviewText || rating === 0) {
    alert("Enter review and rating");
    return;
  }

  const existingReview = reviews.find((rev) => rev.userId?._id === profile.id);
  if (existingReview) {
    alert("You have already added a review for this movie");
    return;
  }

  setSubmitting(true);
  try {
    
     const res = await fetch("/api/user/addReview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ movieId: id, reviewText, rating }),
    });

    const data = await res.json();
    if (res.ok) {
      setReviews((prev) => [data.review, ...prev]);
      setReviewText("");
      setRating(0);
    } else {
      alert(data.msg || "Failed to add review");
    }
  } catch (err) {
    console.error(err);
    alert("Server error: " + err.message);
  } finally {
    setSubmitting(false);
  }
};

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  if (loading)
    return <p className="text-center mt-10 text-gray-400">Loading...</p>;
  if (!movie)
    return <p className="text-center mt-10 text-gray-400">Movie not found</p>;

  return (
    <div className="bg-black text-white min-h-screen font-sans px-4 py-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-red-900 p-6 rounded-lg shadow-lg">
          <img
            src={movie.MovieImage ? `data:image/jpeg;base64,${movie.MovieImage}` : "/placeholder.jpg"}
            alt={movie.MovieTitle}
            className="w-full h-64 object-cover rounded mb-4"
          />
          <h1 className="text-3xl font-bold mb-2 text-red-500">{movie.MovieTitle}</h1>
          <p className="text-sm text-gray-300 mb-1">
            Genre: {movie.Genre} | Year: {new Date(movie.ReleaseYear).getFullYear()}
          </p>
          {movie.Synopsis && <p className="mb-4 text-gray-200">{movie.Synopsis}</p>}
          {movie.Director && <p className="mb-2"><span className="font-semibold text-red-400">Director:</span> {movie.Director}</p>}
          {movie.BoxOfficeCollection && <p className="mb-2"><span className="font-semibold text-red-400">Box Office:</span> ${movie.BoxOfficeCollection}</p>}

          <div className="flex items-center mt-4 space-x-4">
            <div className="flex items-center">
              <span className="mr-2 font-semibold text-yellow-400">Avg Rating:</span>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) =>
                  i < Math.round(averageRating)
                    ? <AiFillStar key={i} className="text-yellow-400" />
                    : <AiOutlineStar key={i} className="text-yellow-400" />
                )}
              </div>
              <span className="ml-2 text-gray-300">({averageRating.toFixed(1)})</span>
              <span className="ml-2 text-gray-300">| {reviews.length} Reviews</span>
            </div>
          </div>
        </div>

        
        <div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-semibold text-red-400 mb-4">User Reviews</h2>
            {reviews.length === 0 ? (
              <p className="text-gray-400">No reviews yet.</p>
            ) : (
              <ul className="space-y-4 text-gray-200 text-sm">
                {reviews.map((rev) => (
                  <li key={rev._id} className="border-b border-gray-700 pb-2">
                    <p><strong>{rev.userId?.userName || "User"}:</strong> {rev.reviewText}</p>
                    <div className="flex space-x-1">
                      {Array.from({ length: 5 }).map((_, i) =>
                        i < rev.rating
                          ? <AiFillStar key={i} className="text-yellow-400" />
                          : <AiOutlineStar key={i} className="text-yellow-400" />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg mb-4">
            <h3 className="text-lg font-semibold mb-4 text-red-400">Add Your Review</h3>
            <form className="space-y-4" onSubmit={submitReview}>
              <div>
                <label className="block mb-1 text-sm text-gray-300">Your Review</label>
                <textarea
                  className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
                  rows="3"
                  placeholder="Write your review"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-300">Your Rating</label>
                <div className="flex space-x-1 text-yellow-400 text-lg cursor-pointer">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      onMouseEnter={() => setHoverRating(i + 1)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(i + 1)}
                    >
                      {i < (hoverRating || rating) ? <AiFillStar /> : <AiOutlineStar />}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className={`px-6 py-2 rounded shadow bg-red-600 hover:bg-red-700 text-white`}
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
            {!profile && (
              <p className="mt-2 text-gray-400 text-sm">
                You must be logged in to submit a review.
              </p>
            )}


          {profile && (
  <div className="flex justify-end mt-2">
    { <button
      onClick={() => navigate("/user/myReviews")}
      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow transition duration-200">
      View your Reviews
    </button> }
  </div>
)}


            
          </div>
        </div>
      </div>
    </div>
  );
}
