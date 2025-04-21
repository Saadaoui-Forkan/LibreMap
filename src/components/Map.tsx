import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useMapStyle } from "../context/MapStyleContext";
import { lat, lng, zoom } from "../constants";
import { useCurrentPosition } from "../context/CurrentPositionContext";
import { fetchCapitalsData } from "../apiCall";

export const Map = () => {
  const { currentStyle } = useMapStyle();
  const { position } = useCurrentPosition();
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const [capitals, setCapitals] = useState<any[]>([]);

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current!,
      style: currentStyle,
      center: [lng, lat],
      zoom: zoom,
    });
  }, [currentStyle]);

  useEffect(() => {
    if (map.current) {
      map.current.setStyle(currentStyle);
    }
  }, [currentStyle]);

  useEffect(() => {
    if (map.current && position) {
      const userLng = position.coords.longitude;
      const userLat = position.coords.latitude;

      // remove old marker
      if (markerRef.current) {
        markerRef.current.remove();
      }

      // create a html element with animation
      const pulse = document.createElement("div");
      pulse.className = "animated-pulse-marker";

      // add the marker to the map
      const newMarker = new maplibregl.Marker(pulse)
        .setLngLat([userLng, userLat])
        .addTo(map.current);

      markerRef.current = newMarker;

      // center the map
      map.current.flyTo({
        center: [userLng, userLat],
        zoom: 5,
        essential: true,
      });
    }
  }, [position]);

  useEffect(() => {
    const loadCapitals = async () => {
      try {
        const data = await fetchCapitalsData();
        setCapitals(data);
      } catch (error) {
        console.error("Error fetching capitals data:", error);
      }
    };
    loadCapitals();
  }, []);

  useEffect(() => {
    if (!map.current || !capitals || capitals.length === 0) return;

    capitals.forEach((capital: any) => {
      const { lat, lon, capital: capitalName, country, language, flagUrl } = capital;
      if (lat && lon && !isNaN(lat) && !isNaN(lon)) {
        const popupContent = `
          <div style="max-width: 200px;">
            <h3 style="margin: 0; font-size: 1rem; color: #333;"> ${capitalName}</h3>
            <p style="margin: 4px 0; font-size: 0.9rem;"><strong>Country:</strong> ${country}</p>
            <p style="margin: 4px 0; font-size: 0.9rem;"><strong>Language:</strong> ${language}</p>
            <img src="${flagUrl}" alt="flag of ${country}" style="width: 40px; border-radius: 4px; margin-top: 5px;" />
          </div>
        `;

        new maplibregl.Marker({ color: "#ff5733" }) 
          .setLngLat([lon, lat])
          .setPopup(new maplibregl.Popup().setHTML(popupContent))
          .addTo(map.current!);
      }
    });
  }, [capitals]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
};