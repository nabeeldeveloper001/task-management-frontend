import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match!" });
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/register`, { email, password });

      toast.success("Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      if (err.response?.data?.errors) {
        const errorObj = {};
        err.response.data.errors.forEach((error) => {
          errorObj[error.field] = error.message;
        });
        setErrors(errorObj);
      } else {
        toast.error(err.response?.data?.message || "Registration failed!");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
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

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-2 border rounded mb-1"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mb-2">{errors.confirmPassword}</p>}

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded mb-2">
            Register
          </button>
        </form>
        <button onClick={() => navigate("/login")} className="w-full bg-gray-500 text-white py-2 rounded">
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default Register;
