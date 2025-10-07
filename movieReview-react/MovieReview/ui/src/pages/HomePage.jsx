
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import MovieCard from "../components/MovieCard";
import Trailer from "../components/Trailer";
import useProfile from "../hooks/useProfile";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const { profile, setProfile, loading: loadingProfile } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        
        const res = await fetch("/api/user/movies", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) setMovies(data);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoadingMovies(false);
      }
    };
    fetchMovies();
  }, []);

  if (loadingProfile) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="bg-black text-white min-h-screen">
      <Hero />

      <section className="px-6 py-10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-red-500">Movies</h3>
          <h2 className="text-2xl md:text-3xl font-bold text-red-500">
            Popular New Movies
          </h2>
        </div>

        {loadingMovies ? (
          <p className="text-center text-gray-400">Loading movies...</p>
        ) : movies.length === 0 ? (
          <p className="text-center text-gray-400">No movies found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        )}
      </section>

      <Trailer />
      
    </div>
  );
}


