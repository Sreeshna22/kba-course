
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar2";
import { useNavigate } from "react-router-dom";

export default function ViewAllMoviesPage() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
       
 
  const handleEdit = (id) => {              
    navigate(`/admin/edit/${id}`);
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;

    try {
      const res = await fetch(`/api/admin/deleteMovie/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, 
        },
        credentials: "include",
      });

      const result = await res.json();

      if (res.ok) {
        alert("" + result.msg);
        setMovies((prev) => prev.filter((movie) => movie._id !== id)); 
      } else {
        alert("" + (result.msg || "Delete failed"));
      }
    } catch (err) {
      alert(" Error: " + err.message);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        
         const res = await fetch("/api/admin/movies", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, 
          },
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok) {
          setMovies(data);
        } else {
          alert(" " + data.msg);
        }
      } catch (err) {
        alert(" Error: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar title="Movies Added by Admin" backLink="/admin/dashboard" />

      <div className="max-w-6xl mx-auto mt-10 bg-gray-900 p-6 rounded-lg shadow-lg overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-400">Loading movies...</p>
        ) : movies.length === 0 ? (
          <p className="text-center text-gray-400">No movies found</p>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-red-700 text-left">
                <th className="p-3">Sl</th>
                <th className="p-3">Title</th>
                <th className="p-3">Genre</th>
                <th className="p-3">Year</th>
                <th className="p-3">Box Office</th>
                <th className="p-3">Poster</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>                        
            <tbody>
              {movies.map((movie, index) => (
                <tr
                  key={movie._id}
                  className="border-t border-red-600 hover:bg-gray-800"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{movie.MovieTitle}</td>
                  <td className="p-3">{movie.Genre || "-"}</td>
                  <td className="p-3">
                    {movie.ReleaseYear
                      ? new Date(movie.ReleaseYear).getFullYear()
                      : "-"}
                  </td>
                  <td className="p-3">
                    {movie.BoxOfficeCollection
                      ? `$${movie.BoxOfficeCollection.toLocaleString()}`                  
                      : "-"}
                  </td>        
                  <td className="p-3">                              
                    {movie.MovieImage ? (
                      <img
                        src={`data:image/jpeg;base64,${movie.MovieImage}`}
                        alt="poster"
                        className="w-10 h-10 rounded"
                      />
                    ) : (
                      "No Poster"
                    )}
                  </td>
                  <td className="p-3 space-x-2">
                   
                    <button
                      onClick={() => handleEdit(movie._id)}
                      className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>

                 
                    <button
                      onClick={() => handleDelete(movie._id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"    

                    >
                      Delete
                    </button>
                  </td>
                </tr>             
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
