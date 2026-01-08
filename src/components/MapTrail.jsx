import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useEffect, useRef, useMemo } from "react";

const libraries = ["marker"]; // 🧠 keep static (solves reload warning)

export default function AromaMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDpp67Lxv0Y_xlP7BCwC5kJZA2jJpD2o1I",
    libraries, // ✅ static
  });

  const mapRef = useRef(null);
  const center = useMemo(() => ({ lat: 23.8103, lng: 90.4125 }), []);

  useEffect(() => {
    if (!isLoaded || !window.google?.maps) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 13,
      disableDefaultUI: true,
      zoomControl: true,
      mapId: "67ac66d99b859662e22e2a58", // ✅ Fix AdvancedMarker warning
    });

    const { AdvancedMarkerElement } = window.google.maps.marker || {};

    if (AdvancedMarkerElement) {
      new AdvancedMarkerElement({
        map,
        position: center,
        title: "Aromaé Studio",
      });
    } else {
      new window.google.maps.Marker({
        map,
        position: center,
        title: "Aromaé Studio",
      });
    }
  }, [isLoaded]);

  if (loadError)
    return (
      <div className="text-center text-red-400 py-10">Map failed to load</div>
    );

  if (!isLoaded)
    return (
      <div className="text-center text-white py-10 animate-pulse">
        Loading Map...
      </div>
    );

  return (
    <section className="py-20 px-6 md:px-16 bg-[#050505] text-white">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-serif text-center mb-6">
          Visit Our <span className="text-yellow-400">Studio</span>
        </h3>
        <div
          ref={mapRef}
          className="rounded-2xl overflow-hidden shadow-lg border border-white/10"
          style={{ width: "100%", height: "400px" }}
        />
      </div>
    </section>
  );
}
