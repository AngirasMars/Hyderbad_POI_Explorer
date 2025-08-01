// src/App.jsx
import React, { useState, useEffect } from "react";
import MapView from "./components/MapView";
import FloatingToolbar from "./components/FloatingToolBar";
import POICategorySidebar from "./components/POICategorySidebar";
import ChaiWalaDrawer from "./components/ChaiWalaDrawer";
import MapPOIRenderer from "./components/MapPOIRenderer";
import pois from './data/pois.json';

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showChaiDrawer, setShowChaiDrawer] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [activePlaceId, setActivePlaceId] = useState(null);

  const handleOpenPOI = () => setShowSidebar(true);
  const handleCloseSidebar = () => setShowSidebar(false);

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setShowChaiDrawer(cat === "chai");
    setShowSidebar(false);
  };

  // Listen for pin clicks to open drawer and scroll to POI
  useEffect(() => {
    const handlePinClick = (e) => {
      setShowChaiDrawer(true);
    };
    window.addEventListener("scroll-to-chaiwala", handlePinClick);
    return () => window.removeEventListener("scroll-to-chaiwala", handlePinClick);
  }, []);

  // Listen for fly-to-poi events to update active pin
  useEffect(() => {
    const handler = (e) => {
      if (e.detail && e.detail.placeId) setActivePlaceId(e.detail.placeId);
    };
    window.addEventListener("fly-to-poi", handler);
    return () => window.removeEventListener("fly-to-poi", handler);
  }, []);

  // Filter POIs based on selected category
  const filteredPOIs =
    selectedCategory === "chai"
      ? pois.filter(
          (p) =>
            (p.name && (
              p.name.toLowerCase().includes("chai") ||
              p.name.toLowerCase().includes("tea")
            ))
        )
      : [];

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <MapView onMapLoad={setMapInstance} />
      <FloatingToolbar onOpenPOI={handleOpenPOI} />

      {showSidebar && (
        <POICategorySidebar
          onClose={handleCloseSidebar}
          onSelectCategory={handleSelectCategory}
        />
      )}

      {/* Render pins when map and POIs are ready */}
      {mapInstance && filteredPOIs.length > 0 && (
        <MapPOIRenderer
          map={mapInstance}
          pois={filteredPOIs}
          activePlaceId={activePlaceId}
          onPinClick={(poi) => {
            setActivePlaceId(poi.place_id);
            window.dispatchEvent(
              new CustomEvent("scroll-to-chaiwala", {
                detail: { placeId: poi.place_id },
              })
            );
          }}
        />
      )}

      {/* Show drawer with correct chaiwala list */}
      {showChaiDrawer && (
        <ChaiWalaDrawer
          pois={filteredPOIs}
          activePlaceId={activePlaceId}
          onClose={() => setShowChaiDrawer(false)}
          onItemClick={(poi) => {
            setActivePlaceId(poi.place_id);
            window.dispatchEvent(
              new CustomEvent("fly-to-poi", {
                detail: {
                  lat: poi.geometry.location.lat,
                  lng: poi.geometry.location.lng,
                  placeId: poi.place_id,
                },
              })
            );
          }}
        />
      )}
    </div>
  );
}

export default App;
