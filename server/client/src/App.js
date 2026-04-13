import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Firmware from "./Firmware";


function App() {
  const isLoggedIn = localStorage.getItem("token"); // ✅ check login

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🔐 Protected Route */}
        <Route
          path="/firmware"
          element={isLoggedIn ? <Firmware /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;