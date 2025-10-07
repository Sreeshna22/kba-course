import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar2";

export default function EditMoviePage() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [form, setForm] = useState({
    MovieTitle: "",
    Genre: "",
    ReleaseYear: "",
    BoxOfficeCollection: "",
    Synopsis: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const authToken = localStorage.getItem("authToken"); 
        // const res = await fetch(`http://localhost:8000/admin/movies/${id}`, {
        const res = await fetch(`/api/admin/movies/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          credentials: "include",
        });

        if (res.status === 404) {
          alert(" Movie not found");
          navigate("/admin/movies");
          return;
        }

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error(
            `Unexpected response type: ${contentType}. Maybe movie not found.`
          );
        }

        const data = await res.json();
        setForm({
          MovieTitle: data.MovieTitle || "",
          Genre: data.Genre || "",
          ReleaseYear: data.ReleaseYear
            ? new Date(data.ReleaseYear).toISOString().split("T")[0]
            : "",
          BoxOfficeCollection: data.BoxOfficeCollection || "",
          Synopsis: data.Synopsis || "",
        });
      } catch (err) {
        alert(" Error: " + err.message);
        navigate("/admin/MovieList");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, navigate]);

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      if (file) data.append("MovieImage", file);

      const authToken = localStorage.getItem("authToken"); 
      const res = await fetch(
        
          `/api/admin/updateMovie/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          credentials: "include",
          body: data,
        }
      );

      const contentType = res.headers.get("content-type");
      let result;
      if (contentType && contentType.includes("application/json")) {
        result = await res.json();
      } else {
        throw new Error("Unexpected response from server");
      }

      if (res.ok) {
        alert("" + result.msg);
        navigate("/admin/MovieList"); 
      } else {
        alert(" " + (result.msg || "Update failed"));
      }
    } catch (err) {
      alert(" Error: " + err.message);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-400">Loading movie...</p>;
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar title="Edit Movie" backLink="/admin/movies" />

      <div className="max-w-2xl mx-auto mt-10 bg-gray-900 p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-sm mb-1">Movie Title</label>
            <input
              type="text"
              name="MovieTitle"
              value={form.MovieTitle}
              onChange={handleChange}
              className="w-full p-2 rounded bg-black text-white border border-red-600"
              required
            />
          </div>

          
          <div>
            <label className="block text-sm mb-1">Genre</label>
            <input
              type="text"
              name="Genre"
              value={form.Genre}
              onChange={handleChange}
              className="w-full p-2 rounded bg-black text-white border border-red-600"
            />
          </div>

          
          <div>
            <label className="block text-sm mb-1">Release Year</label>
            <input
              type="date"
              name="ReleaseYear"
              value={form.ReleaseYear}
              onChange={handleChange}
              className="w-full p-2 rounded bg-black text-white border border-red-600"
            />
          </div>

          
          <div>
            <label className="block text-sm mb-1">
              Box Office Collection (USD)
            </label>
            <input
              type="number"
              name="BoxOfficeCollection"
              value={form.BoxOfficeCollection}
              onChange={handleChange}
              className="w-full p-2 rounded bg-black text-white border border-red-600"
            />
          </div>

          
          <div>
            <label className="block text-sm mb-1">Synopsis</label>
            <textarea
              rows="3"
              name="Synopsis"
              value={form.Synopsis}
              onChange={handleChange}
              className="w-full p-2 rounded bg-black text-white border border-red-600"
            />
          </div>

          
          <div>
            <label className="block text-sm mb-1">Upload Poster (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full p-2 bg-black text-white border border-red-600 rounded"
            />
          </div>

          
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded text-white font-semibold"
            >
              Update
            </button>
            <a
              href="/admin/movies"
              className="bg-gray-700 hover:bg-gray-800 px-6 py-2 rounded text-white font-semibold"
            >
              Cancel
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
