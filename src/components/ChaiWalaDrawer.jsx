import React, { useEffect, useRef, useMemo } from "react";

// Add this CSS to your index.css or global styles:
/*
.apple-glass {
  background: rgba(30, 30, 30, 0.6);
  border: 1.5px solid rgba(200,200,200,0.09);
  box-shadow: 0 4px 32px 0 rgba(0,0,0,0.24), 0 1.5px 8px 0 #e7548035;
  backdrop-filter: blur(18px) saturate(1.3);
  -webkit-backdrop-filter: blur(18px) saturate(1.3);
}
.apple-card {
  background: rgba(39,39,44, 0.79);
  border: 1px solid rgba(255,255,255,0.10);
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.10);
  transition: box-shadow .17s cubic-bezier(.4,0,.2,1), transform .18s;
}
.apple-card:hover, .apple-card.active {
  box-shadow: 0 6px 24px 0 #82aaff40, 0 0px 20px 0 #cba6f7cc;
  transform: translateY(-2px) scale(1.015);
  border-color: #cba6f7;
  background: rgba(80,79,105, 0.95);
}
.apple-title {
  font-weight: 700;
  color: #fff;
  font-size: 1.1rem;
  letter-spacing: -0.03em;
  line-height: 1.15;
  margin-bottom: 0.2rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.14);
}
*/

export default function ChaiWalaDrawer({ pois = [], activePlaceId, onClose, onItemClick }) {
  const containerRef = useRef(null);

  const chaiwalas = useMemo(() => {
    return pois.filter(
      (p) =>
        p.name?.toLowerCase().includes("chai") ||
        p.name?.toLowerCase().includes("tea")
    );
  }, [pois]);

  useEffect(() => {
    const handleScrollToPOI = (e) => {
      const { placeId } = e.detail;
      const el = document.getElementById(`chaiwala-${placeId}`);
      if (el && containerRef.current) {
        containerRef.current.scrollTo({
          top: el.offsetTop - 60,
          behavior: "smooth",
        });
        el.classList.add("apple-card", "active");
        setTimeout(() => {
          el.classList.remove("active");
        }, 1300);
      }
    };

    window.addEventListener("scroll-to-chaiwala", handleScrollToPOI);
    return () =>
      window.removeEventListener("scroll-to-chaiwala", handleScrollToPOI);
  }, []);

  return (
    <div
      className="absolute top-16 right-4 w-80 max-w-[96vw] h-[72vh] rounded-2xl z-40 p-5 overflow-y-auto apple-glass"
      ref={containerRef}
      style={{
        transition: "box-shadow .18s cubic-bezier(.4,0,.2,1), background .16s",
        borderRadius: "22px"
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="apple-title drop-shadow">Chai Wala List</h2>
        <button
          onClick={onClose}
          className="text-lg text-gray-300 hover:text-blue-300 px-2 py-0.5 rounded-full transition"
          title="Close"
        >
          ✖
        </button>
      </div>

      {chaiwalas.length === 0 ? (
        <p className="text-gray-400 italic text-sm">No chaiwalas found.</p>
      ) : (
        <ul className="space-y-4">
          {chaiwalas.map((poi) => (
            <li
              key={poi.place_id}
              id={`chaiwala-${poi.place_id}`}
              onClick={() => onItemClick && onItemClick(poi)}
              className={`apple-card relative group p-4 rounded-xl cursor-pointer border transition-all
                ${activePlaceId === poi.place_id ? "active border-blue-400 ring-1 ring-blue-300" : ""}
              `}
            >
              {/* POI Icon */}
              <div className="absolute -top-4 left-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/40 shadow border border-white/15">
                  <img
                    src={poi.icon || "https://cdn-icons-png.flaticon.com/512/3075/3075977.png"}
                    alt="POI"
                    className="w-5 h-5 object-contain"
                  />
                </div>
              </div>
              {/* Name */}
              <div className="ml-10">
                <h3 className="apple-title">{poi.name}</h3>
                {/* Address */}
                <p className="text-xs text-gray-200 truncate">{poi.vicinity || poi.formatted_address}</p>
                {/* Info row */}
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-yellow-400 text-base">★</span>
                  <span className="font-semibold text-base text-white">{poi.rating || "N/A"}</span>
                  {poi.user_ratings_total && (
                    <span className="text-xs text-gray-300">({poi.user_ratings_total})</span>
                  )}
                  {poi.opening_hours && (
                    <span className={`ml-2 text-xs font-bold ${poi.opening_hours.open_now ? "text-green-400" : "text-red-400"}`}>
                      {poi.opening_hours.open_now ? "OPEN NOW" : "CLOSED"}
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
