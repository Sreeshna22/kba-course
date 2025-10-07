
import React, { useEffect, useState } from "react";

export default function ManageUser() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        
           const res = await fetch("/api/admin/feedbacks", {
          credentials: "include",
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setFeedbacks(data);
      } catch (err) {
        console.error("Error fetching feedbacks:", err.message);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;
    try {
      
        const res = await fetch(`/api/admin/feedback/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setFeedbacks((prev) => prev.filter((f) => f._id !== id));
      } else {
        alert(data.msg || "Failed to delete feedback");
      }
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Server error");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="bg-red-600 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Feedbacks</h1>
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
              <th className="p-3">Sl</th>
              <th className="p-3">User Name</th>
              <th className="p-3">Feedback</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-400">
                  No feedbacks found.
                </td>
              </tr>
            ) : (
              feedbacks.map((f, idx) => (
                <tr key={f._id} className="border-t border-red-600 hover:bg-gray-800">
                  <td className="p-3">{idx + 1}</td>
            <td className="p-3">{f.userId?.userName || "Unknown"}</td>



                  <td className="p-3">{f.feedback}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(f._id)}
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
