import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api/API";

const Login = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/login/", {
        phone: phone.trim(),
        password,
      });

      localStorage.setItem("token", res.data.access);
      navigate("/libraries", { replace: true });
    } catch (err) {
      if (err.response) {
        setError("Telefon yoki parol noto‘g‘ri");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-96 bg-gradient  p-8 rounded-2xl shadow-xl space-y-6 border border-red-500"
      >
        <h1 className="text-3xl font-bold text-center text-red-600">
          Ezma Admin
        </h1>

        {error && (
          <p className="text-red-500 text-center text-sm font-medium">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Telefon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          <input
            type="password"
            placeholder="Parol"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-gray-800 text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        <button
          disabled={loading}
          className="w-full p-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition"
        >
          {loading ? "Kuting..." : "KIRISH"}
        </button>
      </form>
    </div>
  );
};

export default Login;
