import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage("✅ Login successful!");
      setTimeout(() => navigate("/dashboard"), 1200);

    } catch (err) {
      setMessage("❌ Invalid email or password");
    }

    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card glass fade-in-up">
        <h2>Welcome Back</h2>
        <p>Sign in to continue</p>

        <form onSubmit={handleSubmit}>
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

          <button disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {message && <p>{message}</p>}

        <p>
          Don’t have an account?  
          <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
