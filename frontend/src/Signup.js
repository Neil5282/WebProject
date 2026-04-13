import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/signup", form);
      alert("Signup successful");
      navigate("/");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">

      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 w-80 shadow-xl text-white">

        <h2 className="text-2xl font-bold text-center mb-2">Create Account</h2>
        <p className="text-center text-sm mb-6 text-gray-300">
          Sign up to get started.
        </p>

        {/* Username */}
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300 focus:outline-none"
        />

        {/* Email */}
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300 focus:outline-none"
        />

        {/* Password */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300 focus:outline-none"
        />

        {/* Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-blue-500 hover:bg-blue-600 transition p-3 rounded-lg font-semibold"
        >
          Signup →
        </button>

        {/* Link to login */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-blue-300 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Signup;