"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, IText, Image as FabricImage } from "fabric";
import { useRouter } from "next/navigation";
import API from "../../services/api";

export default function Editor() {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const router = useRouter();

  const [selectedColor, setSelectedColor] = useState("white");
  const [selectedSize, setSelectedSize] = useState("M");
  const [price, setPrice] = useState(549);
  const [loading, setLoading] = useState(false);

  const sizes = ["S", "M", "L", "XL"];
  const colors = ["white", "black", "red", "blue", "pink"];

  /* =========================
     INIT CANVAS
  ========================= */
  useEffect(() => {
    const canvas = new Canvas(canvasRef.current, {
      width: 260,
      height: 300,
      backgroundColor: "transparent",
    });

    fabricRef.current = canvas;

    return () => canvas.dispose();
  }, []);

  /* =========================
     PRICE BY SIZE
  ========================= */
  useEffect(() => {
    const pricing = {
      S: 499,
      M: 549,
      L: 599,
      XL: 649,
    };
    setPrice(pricing[selectedSize]);
  }, [selectedSize]);

  /* =========================
     ADD RESIZABLE TEXT
  ========================= */
  const addText = () => {
  const canvas = fabricRef.current;

  const text = new IText("Double click to edit", {
    fontSize: 48,
    fill: "#111",
    fontWeight: "bold",
    left: 40,
    top: canvas.height / 2,

    selectable: true,
    hasControls: true,
    hasBorders: true,
    lockScalingFlip: true,
  });

  canvas.add(text);
  canvas.setActiveObject(text);
  canvas.renderAll();
};
  /* =========================
     UPLOAD IMAGE
  ========================= */
  const uploadImage = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      FabricImage.fromURL(reader.result).then((img) => {
        img.scaleToWidth(200);

        img.set({
          originX: "center",
          originY: "center",
          left: fabricRef.current.width / 2,
          top: fabricRef.current.height / 2,
          hasControls: true,
          hasBorders: true,
        });

        fabricRef.current.add(img);
      });
    };

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  /* =========================
     DELETE SELECTED
  ========================= */
  const deleteSelected = () => {
    const active = fabricRef.current.getActiveObject();
    if (active) {
      fabricRef.current.remove(active);
    }
  };

  /* =========================
     SAVE DESIGN (HARDCODED TOKEN)
  ========================= */
  const saveDesign = async () => {
    setLoading(true);

    try {
      const designData = fabricRef.current.toJSON();

      await API.post(
        "/designs",
        {
          productType: "tshirt",
          color: selectedColor,
          size: selectedSize,
          price,
          designData,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcxNDcxYTNjLWU3MzQtNDg2YS1iZWVmLWY0ODY5NjkxZmEyMyIsImlhdCI6MTc3MTE2NzkzOSwiZXhwIjoxNzcxNzcyNzM5fQ.PogNFoa6rxxt465jm_oBNRXqQUK2hONgmF_zSkAo7Hc",
          },
        }
      );

      alert("Design saved successfully 🔥");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to save design");
    } finally {
      setLoading(false);
    }
  };

  const shirtImage = `/images/tshirt-${selectedColor}.png`;

  return (
    <div className="min-h-screen bg-white text-black px-16 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* LEFT SIDE */}
        <div className="flex justify-center items-center">
          <div className="relative">
            <img
              src={shirtImage}
              alt="Tshirt"
              className="w-[420px]"
            />

            <div className="absolute top-[110px] left-[80px]">
              <canvas ref={canvasRef} />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div>
          <h1 className="text-3xl font-bold mb-4">
            Custom Stretch Cotton Tee
          </h1>

          <p className="text-2xl font-bold mb-6">
            ₹{price}
          </p>

          {/* COLOR */}
          <div className="mb-6">
            <p className="mb-2 font-medium">Color</p>
            <div className="flex gap-3">
              {colors.map((color) => (
                <div
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                    selectedColor === color
                      ? "border-black scale-110"
                      : "border-gray-300"
                  } transition`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* SIZE */}
          <div className="mb-6">
            <p className="mb-2 font-medium">Size</p>
            <div className="flex gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* DESIGN TOOLS */}
          <div className="space-y-4 mb-8">
            <button
              onClick={addText}
              className="w-full bg-gray-200 py-3 rounded hover:bg-gray-300 transition"
            >
              ➕ Add Text
            </button>

            <input
              type="file"
              onChange={uploadImage}
              className="w-full border p-2 rounded bg-white"
            />

            <button
              onClick={deleteSelected}
              className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 transition"
            >
              🗑 Delete Selected
            </button>
          </div>

          <button
            onClick={saveDesign}
            disabled={loading}
            className="w-full bg-pink-600 text-white py-4 rounded-lg text-lg hover:bg-pink-700 transition"
          >
            {loading ? "Saving..." : "💾 Save Design"}
          </button>
        </div>
      </div>
    </div>
  );
}
