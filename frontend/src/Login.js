import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://gsm-backend-xj0i.onrender.com/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/firmware");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">

      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 w-80 shadow-xl text-white">

        <h2 className="text-2xl font-bold text-center mb-2"> WELCOME USER </h2>
        <p className="text-center text-sm mb-6 text-gray-300">
          Please enter your details to sign in.
        </p>

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
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 transition p-3 rounded-lg font-semibold"
        >
          Login →
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-500"></div>
          <span className="px-2 text-sm text-gray-300">OR</span>
          <div className="flex-grow h-px bg-gray-500"></div>
        </div>

        {/* Signup Link */}
        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-300 cursor-pointer hover:underline"
          >
            Create Account
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;

