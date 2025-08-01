// src/components/MapView.jsx
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

// 🧪 MOCK GPS LOCATION (Hyderabad)
navigator.geolocation.getCurrentPosition = (success) => {
  success({
    coords: {
      latitude: 17.385044,
      longitude: 78.486671,
    },
  });
};
navigator.geolocation.watchPosition = (success) => {
  success({
    coords: {
      latitude: 17.385044,
      longitude: 78.486671,
    },
  });
};

function MapView({ onMapLoad }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const userMarkerRef = useRef(null);

  // Listen for fly-to requests
  useEffect(() => {
    const handler = (e) => {
      const { lat, lng } = e.detail;
      if (map.current) {
        map.current.flyTo({
          center: [lng, lat],
          zoom: 16,
          speed: 1.5,
          curve: 1.42,
          essential: true,
        });
      }
    };
    window.addEventListener("fly-to-poi", handler);
    return () => window.removeEventListener("fly-to-poi", handler);
  }, []);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [78.486671, 17.385044],
      zoom: 11,
      maxBounds: [
        [77.0, 15.8],
        [82.0, 19.6],
      ],
    });

    setTimeout(() => {
      if (map.current) map.current.resize();
    }, 150);

    map.current.on("load", () => {
      setMapLoaded(true);
      if (onMapLoad) onMapLoad(map.current); // Expose map instance to parent
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Handle user location marker
  useEffect(() => {
    if (!navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting location:", error);
      },
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    if (!map.current || !userLocation) return;
    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
    }
    const el = document.createElement("div");
    el.className = "pulse-location";
    userMarkerRef.current = new mapboxgl.Marker(el)
      .setLngLat([userLocation.lng, userLocation.lat])
      .addTo(map.current);
    return () => {
      if (userMarkerRef.current) userMarkerRef.current.remove();
    };
  }, [userLocation, mapLoaded]);

  const flyToUserLocation = () => {
    if (!map.current || !userLocation) {
      console.warn("User location not available");
      return;
    }
    map.current.flyTo({
      center: [userLocation.lng, userLocation.lat],
      zoom: 15,
      speed: 1.5,
      curve: 1.42,
      essential: true,
    });
    setTimeout(() => {
      map.current?.resize();
    }, 500);
  };

  return (
    <>
      <div
        ref={mapContainer}
        className="map-container absolute top-0 left-0 w-full h-full z-0"
      />
      <button
        onClick={flyToUserLocation}
        className="absolute bottom-20 left-4 z-50 bg-white bg-opacity-90 text-blue-600 p-2 rounded-full shadow-lg hover:scale-105 transition"
        title="Go to my location"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 12m-9 0a9 9 0 1118 0a9 9 0 01-18 0zm9-4v4l2 2"
          />
        </svg>
      </button>
    </>
  );
}

export default MapView;
