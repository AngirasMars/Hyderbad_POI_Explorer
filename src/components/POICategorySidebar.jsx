// src/components/POICategorySidebar.jsx
import React from "react";

const categories = [
  { id: "chai", label: "Chai Wala ☕" },
];

export default function POICategorySidebar({ onSelectCategory, onClose }) {
  return (
    <div className="absolute top-16 right-4 w-64 bg-[#1e1e1e] text-white shadow-xl z-40 p-4 rounded-xl border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">POI Categories</h2>
        <button onClick={onClose} className="text-sm text-gray-400 hover:text-white">✖</button>
      </div>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              onClick={() => onSelectCategory(cat.id)}
              className="w-full text-left px-3 py-2 bg-gray-800 rounded hover:bg-gray-700 transition"
            >
              {cat.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 