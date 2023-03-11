import MapControls from '../components/Map/Controls/MapControls';
import DeckMap from '../components/Map/New/DeckMap';

interface Props {}

const NewMapPage = (props: Props) => {
  return (
    <>
      <MapControls />
      <DeckMap />
    </>
  );
};

export default NewMapPage;
