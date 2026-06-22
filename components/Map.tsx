"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Destination } from "@/lib/api";

interface MapProps {
  destinations: Destination[];
}

export default function Map({ destinations }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (instanceRef.current || !mapRef.current) return;

    const map = L.map(mapRef.current, {
      center: [28.0, 3.0],
      zoom: 6,
      zoomControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    instanceRef.current = map;
  }, []);

  useEffect(() => {
    const map = instanceRef.current;
    if (!map) return;

    const icon = L.divIcon({
      className: "",
      html: `<div style="background:#1643a3;color:white;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;border:2px solid #d4a84b;box-shadow:0 2px 6px rgba(0,0,0,0.3);">✦</div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -16],
    });

    const markers = destinations.map((d) =>
      L.marker([d.lat, d.lng], { icon })
        .addTo(map)
        .bindPopup(
          `<strong>${d.title}</strong><br/>${d.category}<br/>★ ${d.rating}`
        )
    );

    if (destinations.length > 0) {
      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.15));
    }

    return () => {
      markers.forEach((m) => m.remove());
    };
  }, [destinations]);

  return <div ref={mapRef} className="w-full h-full" />;
}
