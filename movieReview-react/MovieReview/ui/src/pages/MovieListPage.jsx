
import React, { useEffect, useState } from "react";
import MovieCard2 from "../components/MovieCard2";

export default function MovieListPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        
          const res = await fetch("/api/user/movies", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok) {
          setMovies(data);
        } else {
          alert(data.msg || "Error fetching movies");
        }
      } catch (err) {
        alert("Error fetching movies: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Browse Movies</h1>

      <div className="max-w-6xl mx-auto space-y-8">
        {loading ? (
          <p className="text-center text-gray-400">Loading movies...</p>
        ) : movies.length === 0 ? (
          <p className="text-center text-gray-400">No movies found</p>
        ) : (
          movies.map((movie) => (
            <MovieCard2
              key={movie._id}
              id={movie._id}
              title={movie.MovieTitle}
              poster={
                movie.MovieImage
                  ? `data:image/jpeg;base64,${movie.MovieImage}`
                  : "/placeholder.jpg"
              }
            />
          ))
        )}
      </div>
    </div>
  );
}
