"use client";
import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "/leaflet/marker-icon.png",
  iconSize: [25, 31],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
type props = {
  position: [number, number];
  setPosition: (pos: [number, number]) => void;
};

const CheckoutMap = ({ position, setPosition }: props) => {
  if (!position) return null;

  return (
    <div className="w-full h-[350px]">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom
        className="w-full h-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={position}
          icon={markerIcon}
          draggable
          eventHandlers={{
            dragend: (e) => {
              const { lat, lng } = e.target.getLatLng();
              setPosition([lat, lng]);
            },
          }}
        />
      </MapContainer>
    </div>
  );
};

export default CheckoutMap;
