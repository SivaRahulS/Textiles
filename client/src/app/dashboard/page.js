"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../services/api";

export default function Dashboard() {
  const [designs, setDesigns] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  /* =========================
     Fetch Designs
  ========================= */
  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const { data } = await API.get("/designs");
        setDesigns(data);
      } catch (err) {
        setError("Failed to load designs");
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  /* =========================
     Delete Design
  ========================= */
  const deleteDesign = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this design?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/designs/${id}`);

      setDesigns((prev) =>
        prev.filter((design) => design.id !== id)
      );
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="p-10 min-h-screen bg-gray-900 text-white">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Designs 👕</h1>

        <button
          onClick={() => router.push("/editor")}
          className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          + Create Design
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-500 p-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* LOADING */}
      {loading && <p>Loading designs...</p>}

      {/* EMPTY STATE */}
      {!loading && designs.length === 0 && (
        <p className="text-gray-400">
          No designs found. Click &quot;Create Design&quot; to get started.
        </p>
      )}

      {/* DESIGN GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {designs.map((design) => (
          <div
            key={design.id}
            className="bg-white text-black p-6 rounded-xl shadow-lg hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold capitalize mb-2">
              {design.productType}
            </h2>

            <p><strong>Color:</strong> {design.color}</p>
            <p><strong>Size:</strong> {design.size}</p>
            <p><strong>Price:</strong> ₹{design.price}</p>

            <button
              onClick={() => deleteDesign(design.id)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
