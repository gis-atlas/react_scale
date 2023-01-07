import DeckGL from '@deck.gl/react/typed';
import { ScatterplotLayer } from '@deck.gl/layers/typed';
import testData from './testMapData.json';

const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0,
};

console.log(testData);

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

const DeckMap = () => {
  return (
    <DeckGL
      width='100%'
      height='100%'
      viewState={INITIAL_VIEW_STATE}
      layers={[scatterplotLayer]}
      controller
    />
  );
};

export default DeckMap;
