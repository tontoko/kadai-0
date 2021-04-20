import mapboxgl, { Map, Marker } from 'mapbox-gl';
import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { datalist, processedDataList } from '../../recoil';
mapboxgl.accessToken =
  'pk.eyJ1IjoiaGlyYWtpdG9tb2hpa28iLCJhIjoiY2tub3B0Z2YwMTV2cjJ2cWo5dHRxaHc4aCJ9.OcjMnlzSKYanpJ7ZBv-S2A';

const MapContainer: React.FC = () => {
  const processedList = useRecoilValue(processedDataList);
  const defaultList = useRecoilValue(datalist);
  const mapContainer = useRef() as React.MutableRefObject<HTMLObjectElement>;
  const map = useRef<Map>();
  const makers = useRef<{ [key: string]: Marker }>({});
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });
    defaultList.map((data) => {
      makers.current[data.name] = new mapboxgl.Marker()
        .setLngLat(data.location)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setText(
            `${data.name}(${data.country}) ${data.start.toFormat(
              'yyyy/MM'
            )}-${data.end.toFormat('yyyy/MM')}`
          )
        )
        .addTo(map.current!);
    });
    map.current.on('move', () => {
      setLng(Number(map.current?.getCenter().lng.toFixed(4) || 0));
      setLat(Number(map.current?.getCenter().lat.toFixed(4) || 0));
      setZoom(Number(map.current?.getZoom().toFixed(2) || 0));
    });
    return () => map.current?.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const selected = processedList.find((data) => data.selected);
    if (selected) {
      Object.keys(makers.current).map(
        (name) =>
          makers.current[name].getPopup().isOpen() &&
          makers.current[name].togglePopup()
      );
      makers.current[selected.name].togglePopup();
      map.current?.flyTo({ center: selected.location, zoom: 9 });
    }
  }, [processedList]);

  return (
    <div
      className="map-container"
      ref={mapContainer}
      style={{ height: 500, width: 500 }}
    />
  );
};

export default MapContainer;
