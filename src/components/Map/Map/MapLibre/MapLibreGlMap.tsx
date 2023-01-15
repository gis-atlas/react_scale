import { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';

const MapLibre = ({ mapStyle }: any) => {
  const mapContainer = useRef<any>(null);
  const [lng] = useState(139.753);
  const [lat] = useState(35.6844);
  const [zoom] = useState(14);

  useEffect(() => {
    const maplibre = new maplibregl.Map({
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
