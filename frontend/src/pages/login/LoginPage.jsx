import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "./../../lib/axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      // console.log(response);

      if (response && response.status === 200 && response.data) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/employee");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fd68c9] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl p-10 w-full max-w-md text-center border-1 border-gray-400">
        <img
          src="/logomain.svg"
          alt="Logo"
          className="mx-auto w-50 h-50 object-contain mb-2"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Login</h2>
        <p className="text-gray-500 text-sm mb-6">
          Hey, Enter your details to get sign in to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your company Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Passcode"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 rounded-md transition duration-300"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
