
import React, { useState } from "react";

export default function ContactPage() {
  const [feedback, setFeedback] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback) return setMsg("Feedback cannot be empty!");

    setLoading(true);
    try {
      
        const res = await fetch("/api/user/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ feedback }),
      });

      const data = await res.json();
      if (res.ok) {
        setMsg(data.msg || "Feedback submitted successfully");
        setFeedback("");
        setTimeout(() => setMsg(""), 4000);
      } else {
        setMsg(data.msg || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      setMsg("Server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center px-4 mt-16 mb-16">
    
      <div className="text-center mb-6 max-w-lg">
        <h1 className="text-3xl font-extrabold text-red-600 mb-2">
           Contact Us
        </h1>
        <p className="text-gray-300 italic">
          “Movies touch our hearts and open our minds.  
          Your feedback helps us make this experience better.”
        </p>
      </div>


      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-red-700 to-red-900 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700"
      >
        <h2 className="text-xl font-semibold mb-6 text-white text-center">
          Share Your Feedback
        </h2>

        <textarea
          id="feedback"
          rows="4"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write your feedback..."
          className="w-full p-3 mb-6 rounded-lg bg-black/80 text-white border border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black/90 text-white py-2 rounded-lg hover:bg-red-800 hover:scale-105 transition transform"
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>

        {msg && (
          <p className="text-center mt-4 text-green-300 font-medium">{msg}</p>
        )}
      </form>

     
      <div className="mt-10 text-center text-gray-400 max-w-lg">
        <p className="italic">“The audience is the best critic.”</p>
        <p className="italic">“Your words make the reel world real.”</p>
      </div>
    </div>
  );
}
