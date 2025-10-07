
import React from "react";
import { useNavigate } from "react-router-dom";

export default function MovieCard2({ id, title, poster }) {
  const navigate = useNavigate();

  return (
    <div className="bg-red-700 p-5 rounded-lg flex items-center gap-8 shadow-lg hover:shadow-2xl transition duration-300">
      <img
        src={poster || "/placeholder.jpg"}
        alt={title}
        className="w-56 h-44 object-cover rounded"
      />
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <button
          onClick={() => navigate(`/movie/${id}`)} 
          className="mt-3 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          View More
        </button>
      </div>
    </div>
  );
}
