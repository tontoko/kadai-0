import mapboxgl from 'mapbox-gl';
import React from 'react';
import { useRef, useState, useEffect } from 'react';
mapboxgl.accessToken =
  'pk.eyJ1IjoiaGlyYWtpdG9tb2hpa28iLCJhIjoiY2tub3B0Z2YwMTV2cjJ2cWo5dHRxaHc4aCJ9.OcjMnlzSKYanpJ7ZBv-S2A';

const MapContainer: React.FC = () => {
  const mapContainer = useRef() as React.MutableRefObject<HTMLObjectElement>;
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });
    map.on('move', () => {
      setLng(Number(map.getCenter().lng.toFixed(4)));
      setLat(Number(map.getCenter().lat.toFixed(4)));
      setZoom(Number(map.getZoom().toFixed(2)));
    });
    return () => map.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="map-container"
      ref={mapContainer}
      style={{ height: 500, width: 500 }}
    />
  );
};

export default MapContainer;
