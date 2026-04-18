"use client";
import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet"; // Marker aur Popup hata diye agar use nahi ho rahe
import "leaflet/dist/leaflet.css";

const MapView = ({ position }: { position: [number, number] | null }) => {
  if (!position) {
    return null;
  }
  return (
    // FIX: Parent div ko specific height aur width di gayi hai
    <div className="w-full h-full"> 
      <MapContainer
        center={position as LatLngExpression}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default MapView;