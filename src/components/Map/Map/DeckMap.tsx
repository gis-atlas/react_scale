import DeckGL from '@deck.gl/react/typed';
import { Map } from 'react-map-gl';
import { ScatterplotLayer } from '@deck.gl/layers/typed';
import testData from './testMapData.json';

const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0,
};

const REACT_MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoiamFnZXJpZCIsImEiOiJjbGNuamNmemowenhmM29xcTIxa29sczlsIn0.fRLOKtjyA2V1AaLGQj9TxQ';

const scatterplotLayer = new ScatterplotLayer({
  id: 'scatterplot-layer',
  data: testData,
  pickable: true,
  opacity: 0.8,
  stroked: true,
  filled: true,
  radiusScale: 6,
  radiusMinPixels: 1,
  radiusMaxPixels: 100,
  lineWidthMinPixels: 1,
  getPosition: (d) => d.coordinates,
  getRadius: (d) => Math.sqrt(d.exits),
  getFillColor: (d) => [255, 140, 0],
  getLineColor: (d) => [0, 0, 0],
  onHover: (d) => console.log(1),
  onClick: (d) => console.log(2),
});

interface IDeckMap {
  mapStyle?: string;
}

const DeckMap = ({ mapStyle }: IDeckMap) => {
  return (
    <DeckGL
      width='100%'
      height='100%'
      initialViewState={INITIAL_VIEW_STATE}
      layers={[scatterplotLayer]}
      controller
    >
      <Map mapboxAccessToken={REACT_MAPBOX_ACCESS_TOKEN} mapStyle={mapStyle} />
    </DeckGL>
  );
};

export default DeckMap;
