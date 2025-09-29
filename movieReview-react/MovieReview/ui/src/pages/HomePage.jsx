

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState({}); 
  const [userReviews, setUserReviews] = useState({});    
  const navigate = useNavigate();

  useEffect(() => {                                             
  
    fetch("/api/user/movies", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch(() => setMovies([]));

    fetch("/api/user/myReviews", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        const map = {};
        data.reviews?.forEach((r) => (map[r.movieId] = r));
        setUserReviews(map);
      })
      .catch(() => setUserReviews({}));
  }, []);

  const handleAddReview = (movieId) => {
    const reviewText = reviews[movieId];
    if (!reviewText) return alert("Enter a review");

    fetch("/api/user/addReview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ movieId, reviewText,  }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserReviews({ ...userReviews, [movieId]: data.review });
        setReviews({ ...reviews, [movieId]: "" }); 
      })
      .catch((err) => alert(err.message));
  };

  const handleViewReview = (reviewId) => {
    navigate(`/editReview/${reviewId}`); 
  };
                                              
  const handleViewAllReviews = () => {       
    navigate("/editReview");          
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">All Movies</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition duration-300 flex flex-col justify-between"
          >
            <MovieCard
              title={movie.MovieTitle}         
              poster={movie.Poster ? `data:image/jpeg;base64,${movie.Poster}` : ""}
              year={movie.ReleaseYear}
              type={movie.Type}     
            />          

            <div className="mt-4">
              {userReviews[movie._id] ? (
                <div className="space-y-2">
                  <p className="text-black font-semibold">
                    Your Review: {userReviews[movie._id].reviewText}
                  </p>
                 
                </div>
              ) : (
                <div className="space-y-2">
                  <textarea
                    value={reviews[movie._id] || ""}
                    onChange={(e) =>
                      setReviews({ ...reviews, [movie._id]: e.target.value })
                    }
                    placeholder="Write your review..."
                    className="w-full border rounded p-2"
                  />
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded w-full "
                    onClick={() => handleAddReview(movie._id)}
                  >
                    Add Review
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

 
      <div className="mt-6 text-center">
        
      </div>
    </div>
  );
};

export default Home;

