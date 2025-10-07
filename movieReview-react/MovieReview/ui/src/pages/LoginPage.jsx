
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/images/s.png";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      
         const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ UserName: username, Password: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Login Failed");
      }

      
      if (data.userRole === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/homepage");
      }
    } catch (err) {
      setError(err.message || "Login Failed: Please Try Again!");
    }
  };

  return (
    <div className="bg-black text-white flex items-center justify-center min-h-screen">
      <div className="border border-red-500 p-10 max-w-5xl w-full">
        <div className="flex items-center justify-between">
          <div className="w-1/2 flex justify-center">
            <img src={loginImage} alt="Login" className="rounded shadow-lg max-h-80" />
          </div>

          <div className="w-px bg-red-500 mx-6" style={{ height: "400px" }}></div>

          <div className="w-1/2">
            <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
            <p className="mb-6">Please login to your account</p>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleLogin}>
              <label htmlFor="username" className="block mb-1 text-sm text-white">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                className="bg-black border border-red-500 w-full mb-4 p-2 rounded text-white placeholder-red-300"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <label htmlFor="password" className="block mb-1 text-sm text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="bg-black border border-red-500 w-full mb-4 p-2 rounded text-white placeholder-red-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full block text-center mb-4"
              >
                Login
              </button>
            </form>

            <p className="text-sm text-right mb-4 hover:underline cursor-pointer">
              Forgot password?
            </p>

            <div className="text-sm text-center space-y-1">
              <p>Don't have an account?</p>
              <a href="/signup" className="text-red-400 hover:underline cursor-pointer">
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
