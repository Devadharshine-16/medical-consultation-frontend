import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return setMessage("❌ Passwords do not match");
    }

    setIsLoading(true);

    try {
      await api.post("/auth/register", form);
      setMessage("✅ Registration successful!");

      setTimeout(() => navigate("/login"), 1200);

    } catch (err) {
      setMessage(err.response?.data?.msg || "❌ Error registering");
    }

    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card glass">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <button disabled={isLoading}>
            {isLoading ? "Creating..." : "Register"}
          </button>
        </form>

        {message && <p>{message}</p>}

        <p>
          Already have an account?  
          <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
