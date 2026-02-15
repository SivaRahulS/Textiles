"use client";

import { useState } from "react";
import API from "../../services/api";
import { useRouter } from "next/navigation";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await API.post("/auth/register", form);
      router.push("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-20">
      <div className="bg-white text-black p-8 rounded w-96">
        <h2 className="text-xl mb-4">Register</h2>

        {error && (
          <div className="bg-red-500 text-white p-2 mb-3 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" required placeholder="Name"
            className="w-full p-2 border rounded"
            onChange={(e)=>setForm({...form,name:e.target.value})}
          />
          <input type="email" required placeholder="Email"
            className="w-full p-2 border rounded"
            onChange={(e)=>setForm({...form,email:e.target.value})}
          />
          <input type="password" required placeholder="Password"
            className="w-full p-2 border rounded"
            onChange={(e)=>setForm({...form,password:e.target.value})}
          />
          <button disabled={loading}
            className="w-full bg-black text-white p-2 rounded">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
