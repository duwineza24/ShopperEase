import { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaCheckCircle,
  FaStore,
  FaShoppingCart,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:2000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        return setError(data.message || "Invalid email or password");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setLoading(false);

      if (data.user.role === "customer") {
        navigate("/customer");
      } else if (data.user.role === "seller") {
        navigate("/seller");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-50">
      {/* ================= LEFT CONTENT ================= */}
      <div className="hidden md:flex flex-col justify-center px-14 bg-black text-white">
        <h1 className="text-4xl font-extrabold mb-4">Welcome Back </h1>
        <p className="text-gray-300 mb-10 max-w-md">
          Log in to continue shopping, manage your orders, or grow your business
          as a seller. Everything you need is waiting for you.
        </p>

        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-green-400" />
            <span>Secure & private login</span>
          </div>
          <div className="flex items-center gap-3">
            <FaShoppingCart className="text-blue-400" />
            <span>Track orders & purchases</span>
          </div>
          <div className="flex items-center gap-3">
            <FaStore className="text-yellow-400" />
            <span>Manage products & sales</span>
          </div>
        </div>

        <div className="mt-12 text-sm text-gray-400">
          Need help? Contact support or create a new account.
        </div>
      </div>

      {/* ================= LOGIN FORM (UNCHANGED) ================= */}
      <div className="flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white/60 backdrop-blur-lg border p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl font-bold text-center mb-2">
            Login to Your Account
          </h2>
          <p className="text-center text-gray-600 mb-6 text-sm">
            Enter your credentials to continue
          </p>

          {error && (
            <p className="text-red-600 text-center mb-4 font-semibold">
              {error}
            </p>
          )}

          <div className="relative mb-4">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full pl-10 p-3 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
              required
            />
          </div>

          <div className="relative mb-6">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 p-3 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-lg font-semibold text-white bg-gray-800 rounded-lg hover:bg-black transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* ================= GUIDANCE LINKS ================= */}
          <div className="mt-6 text-center text-sm space-y-2">
            <p>
              New here?
              <span
                onClick={() => navigate("/register")}
                className="font-semibold cursor-pointer hover:underline ml-1"
              >
                Create an account
              </span>
            </p>

            <p>
              <span
                onClick={() => navigate("/")}
                className="cursor-pointer hover:underline"
              >
                Back to Home
              </span>
            </p>
          </div>

          {/* ================= TRUST NOTE ================= */}
          <p className="mt-6 text-xs text-center text-gray-500">
            🔒 Your information is encrypted and never shared
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
