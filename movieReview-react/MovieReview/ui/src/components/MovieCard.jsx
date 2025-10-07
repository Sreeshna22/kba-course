















import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  
  const averageRating = movie?.averageRating;

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      
      <div
        className="cursor-pointer overflow-hidden"
        onClick={() => navigate(`/user/movie/${movie._id}`)}
      >
        <img
          src={
            movie?.MovieImage
              ? `data:image/jpeg;base64,${movie.MovieImage}`
              : "/placeholder.jpg"
          }
          alt={movie?.MovieTitle || "Movie Poster"}
          className="w-full h-69 object-cover transition duration-300 hover:opacity-80"
        />
      </div>

      
      <div className="p-4 flex flex-col items-center">
        <h3 className="text-red-500 text-lg font-semibold mb-2 text-center">
          {movie?.MovieTitle || "Untitled"}
        </h3>

        
        {averageRating !== null ? (
          <div className="flex items-center mb-3">
            {Array.from({ length: 5 }).map((_, i) =>
              i < Math.round(averageRating) ? (
                <AiFillStar key={i} className="text-yellow-400" />
              ) : (
                <AiOutlineStar key={i} className="text-yellow-400" />
              )
            )}
            <span className="text-gray-300 text-sm ml-2">
              {averageRating.toFixed(1)}
            </span>
          </div>
        ) : (
          <p className="text-gray-400 text-sm mb-3">No rating yet</p>
        )}

      
        <button
  onClick={() => navigate(`/movie/${movie._id}`)} 
  className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-6 py-2 rounded-full shadow-md transition duration-300"
>
  Read More
</button>
      </div>
    </div>
  );
}


