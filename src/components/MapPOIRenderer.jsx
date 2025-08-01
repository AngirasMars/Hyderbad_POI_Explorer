import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import ReactDOM from "react-dom/client";
import PinMarker from "./PinMarker";
import "./PinMarker.css";

let lastPinMarkers = [];

function getPinColor(rating = 0) {
  if (rating >= 4.5) return "#ff4d4d";
  if (rating >= 4.0) return "#ff9900";
  if (rating >= 3.0) return "#fde047";
  return "#a3a3a3";
}

export default function MapPOIRenderer({ map, pois, activePlaceId, onPinClick }) {
  useEffect(() => {
    if (!map || !map.isStyleLoaded()) {
      console.warn("Map style not yet ready. Skipping pin render.");
      return;
    }

    lastPinMarkers.forEach(marker => marker.remove());
    lastPinMarkers = [];

    pois.forEach((poi) => {
      const el = document.createElement("div");
      ReactDOM.createRoot(el).render(
        <PinMarker
          post={{ pinColor: getPinColor(poi.rating) }}
          onClick={() => onPinClick && onPinClick(poi)}
          isHighlighted={activePlaceId === poi.place_id}
        />
      );
      const marker = new mapboxgl.Marker(el)
        .setLngLat([poi.geometry.location.lng, poi.geometry.location.lat])
        .addTo(map);

      lastPinMarkers.push(marker);
    });

    return () => {
      lastPinMarkers.forEach(marker => marker.remove());
      lastPinMarkers = [];
    };
  }, [map, pois, onPinClick, activePlaceId]);

  return null;
}
