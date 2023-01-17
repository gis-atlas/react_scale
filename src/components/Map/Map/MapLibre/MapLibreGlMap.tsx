import { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';

const MapLibre = ({ mapStyle }: any) => {
  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);
  const [lng] = useState(37.618423);
  const [lat] = useState(55.751244);
  const [zoom] = useState(9);

  useEffect(() => {
    if (map.current) return;
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: mapStyle,
      center: [lng, lat],
      zoom: zoom,
    });
  });

  return (
    <div className='map-wrap'>
      <div ref={mapContainer} className='map' />
    </div>
  );
};

export default MapLibre;
