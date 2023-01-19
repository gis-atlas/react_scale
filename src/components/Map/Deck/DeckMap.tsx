import DeckGL from '@deck.gl/react/typed';
import { createTileLayer } from '../../../utils/deck';

const INITIAL_VIEW_STATE = {
  longitude: 37.618423,
  latitude: 55.751244,
  zoom: 9,
};

const DeckMap = ({ mapStyle }: any) => {
  console.log(mapStyle);
  const layers = createTileLayer(mapStyle);
  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      layers={[layers]}
      controller
    />
  );
};

export default DeckMap;
