import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, { email, password });
      localStorage.setItem("authToken", response.data.token);
      toast.success("Login successful!");
      navigate("/tasks");
    } catch (err) {
      if (err.response?.data?.errors) {
        const errorObj = {};
        err.response.data.errors.forEach((error) => {
          errorObj[error.field] = error.message;
        });
        setErrors(errorObj);
      } else {
        toast.error(err.response?.data?.message || "Invalid credentials!");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            autoFocus
            className="w-full p-2 border rounded mb-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded mb-2">
            Login
          </button>
        </form>
        <button onClick={() => navigate("/register")} className="w-full bg-gray-500 text-white py-2 rounded">
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
