import { useEffect, useRef } from "react";

// MAIN ***********************************************************************************************************************************
export function TheContactMap({ className }: TheContactMapProps) {
  const { lat, lng, zoom } = { lat: -21.142_107, lng: 55.294_209, zoom: 17 };
  const mapRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    const load = async () => {
      await import("leaflet/dist/leaflet.css");
      const L = await import("leaflet");

      const map = L.map(mapRef.current!).setView([lat, lng], zoom);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
      L.marker([lat, lng], {
        icon: L.icon({
          iconSize: [25, 41],
          iconAnchor: [10, 41],
          popupAnchor: [2, -40],
          iconUrl: "/_build/app/public/map/icon.png",
          iconRetinaUrl: "/_build/app/public/map/icon2.png",
          shadowUrl: "/_build/app/public/map/shadow.png",
        }),
      }).addTo(map);
    };
    load();
  }, [mapRef]);

  return <figure ref={mapRef} className={className}></figure>;
}

// TYPES *********************************************************************************************************************************
export type SetMapOpts = { lat: number; lng: number; zoom: number };
export type TheContactMapProps = { className: string; options?: SetMapOpts };
