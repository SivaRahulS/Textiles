"use client";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { userToken, logout } = useContext(AuthContext);
  const router = useRouter();

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-black shadow-lg">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        👕 CustomWear
      </h1>

      <div className="space-x-4">
        {!userToken ? (
          <>
            <button onClick={() => router.push("/login")} className="hover:text-gray-400">
              Login
            </button>
            <button onClick={() => router.push("/register")} className="hover:text-gray-400">
              Register
            </button>
          </>
        ) : (
          <>
            <button onClick={() => router.push("/editor")} className="hover:text-gray-400">
              Editor
            </button>
            <button
              onClick={() => {
                logout();
                router.push("/login");
              }}
              className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
