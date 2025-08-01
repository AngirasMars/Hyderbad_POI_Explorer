// src/components/FloatingToolBar.jsx
import React from "react";

export default function FloatingToolbar({ onOpenPOI }) {
  return (
    <div className="absolute top-4 right-4 z-50">
      <button
        onClick={onOpenPOI}
        className="bg-black text-white px-4 py-2 rounded-xl shadow-md hover:bg-gray-800 transition"
      >
        🗺️ POIs
      </button>
    </div>
  );
}
